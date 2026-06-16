# -*- coding: utf-8 -*-
"""
Genera lib/products.ts a partir de "EL GROW DE AIXA - LISTA DE PRECIOS.xls".

Por que Python + Excel COM:
  - El .xls es BIFF binario antiguo (OLE2); openpyxl solo lee .xlsx.
  - xlrd ya no esta instalado y dejo de soportar .xls moderno.
  - pywin32 (win32com) esta disponible y Excel esta instalado en la maquina.

Fallback si no hay pywin32/Excel:
  1. Abrir el .xls en Excel y "Guardar como" .xlsx.
  2. pip install openpyxl
  3. Reemplazar read_rows() por una lectura con openpyxl.

Uso:
  python scripts/generate-products.py

NO forma parte del build. Emite un archivo estatico commiteado (lib/products.ts)
y un resumen + reporte de filas a revisar por consola.
"""

import os
import re
import sys
import json
import unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
XLS = os.path.join(ROOT, "EL GROW DE AIXA - LISTA DE PRECIOS.xls")
OUT = os.path.join(ROOT, "lib", "products.ts")
PRODUCTS_DIR = os.path.join(ROOT, "public", "products")
IMG_EXTS = (".jpg", ".jpeg", ".webp", ".png", ".avif")

# ---------------------------------------------------------------------------
# Metadata de categorias (orden = orden de render en el catalogo).
# ---------------------------------------------------------------------------
CATEGORIES = [
    {
        "id": "sustratos",
        "label": "Sustratos y Enmiendas",
        "shortLabel": "Sustratos",
        "icon": "Sprout",
        "fallbackEmoji": "\U0001F331",  # seedling
        "blurb": "Tierras, sustratos y enmiendas organicas para todas tus plantas.",
    },
    {
        "id": "fertilizantes",
        "label": "Fertilizantes",
        "shortLabel": "Fertilizantes",
        "icon": "FlaskConical",
        "fallbackEmoji": "\U0001F9EA",  # test tube
        "blurb": "Nutrientes y fertilizantes para jardin y cultivo de cannabis.",
    },
    {
        "id": "control-plagas",
        "label": "Control de Plagas",
        "shortLabel": "Control de Plagas",
        "icon": "Bug",
        "fallbackEmoji": "\U0001F41B",  # bug
        "blurb": "Insecticidas y fungicidas organicos para proteger tu cultivo.",
    },
    {
        "id": "macetas",
        "label": "Macetas",
        "shortLabel": "Macetas",
        "icon": "Container",
        "fallbackEmoji": "\U0001FAB4",  # potted plant
        "blurb": "Macetas y contenedores para cada etapa de crecimiento.",
    },
    {
        "id": "accesorios",
        "label": "Accesorios",
        "shortLabel": "Accesorios",
        "icon": "Wrench",
        "fallbackEmoji": "\U0001F9F0",  # toolbox
        "blurb": "Bandejas germinadoras, pulverizadores y mas.",
    },
]

# ---------------------------------------------------------------------------
# Mapeo de headers de la planilla -> contexto completo (category, subcategory, brand).
# Cada header REINICIA el contexto por completo (sin herencia), por eso es robusto
# frente a la jerarquia mezclada (marcas dentro de banners de categoria).
# La clave se compara contra normalize_header() de la celda A.
# ---------------------------------------------------------------------------
HEADER_MAP = {
    # Banner superior / lineas sin productos directos
    "PRODUCTOS": None,  # ignorar
    "COMPOSTUC": ("sustratos", None, "Compostuc"),
    # Sustratos / enmiendas (linea propia Compostuc)
    "ENMIENDAS ORGANICAS": ("sustratos", "Enmiendas Organicas", "Compostuc"),
    "SUSTRATOS CANNABIS - INDOOR/OUTDOOR -": ("sustratos", "Sustratos Cannabis", "Compostuc"),
    # Banners de categoria (los refina el header siguiente)
    "FERTILIZANTES": ("fertilizantes", None, None),
    "SUSTRATOS": ("sustratos", None, None),
    "MACETAS": ("macetas", None, None),
    # Fertilizantes
    "LINEA JARDIN": ("fertilizantes", "Linea Jardin", None),
    "LINEA CANNABIS": ("fertilizantes", "Linea Cannabis", None),
    "WEED BREEDERS": ("fertilizantes", "Linea Cannabis", "Weed Breeders"),
    "NAMASTE": ("fertilizantes", None, "Namaste"),
    "TOP CROP": ("fertilizantes", None, "Top Crop"),
    "VAMP": ("fertilizantes", None, "Vamp"),
    "MACA BREW": ("fertilizantes", None, "Maca Brew"),
    # Control de plagas
    "CONTROL DE PLAGAS": ("control-plagas", "Control de Plagas", None),
    # Sustratos comerciales
    "GROWMIX": ("sustratos", None, "GrowMix"),
    "CULTIVATE": ("sustratos", None, "Cultivate"),
    "VITAFLOR": ("sustratos", None, "VitaFlor"),
    # Macetas y accesorios
    "MAD ROCKET": ("macetas", None, "Mad Rocket"),
    "ROOTS HOUSE": ("macetas", None, "Roots House"),
    "NEGRAS SOPLADAS": ("macetas", "Negras Sopladas", None),
    "BANDEJAS GERMINADORAS": ("accesorios", "Bandejas Germinadoras", None),
    "PULVERIZADORES CALPLOT": ("accesorios", "Pulverizadores", "Calplot"),
}


def normalize_header(s):
    """UPPER, sin acentos, espacios colapsados, sin punto final."""
    s = strip_accents(s).upper().strip()
    s = re.sub(r"\s+", " ", s)
    s = s.rstrip(".")
    return s


def strip_accents(s):
    return "".join(
        c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn"
    )


def slugify(name, used):
    s = strip_accents(name).lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    s = re.sub(r"-+", "-", s)
    if not s:
        s = "producto"
    base = s
    i = 2
    while s in used:
        s = "%s-%d" % (base, i)
        i += 1
    used.add(s)
    return s


def parse_price(raw):
    """Devuelve (value:int|None, in_stock:bool, needs_review:bool, note:str|None)."""
    if raw is None:
        return (None, True, False, None)
    s = str(raw).strip()
    flat = s.upper().replace(" ", "")
    if "SINSTOCK" in flat:
        return (None, False, False, None)
    t = s.lstrip("$").strip()
    if t == "":
        return (None, True, False, None)  # precio a consultar
    # Miles correctos: 3.000 / 12.000 / 1.234.567
    if re.match(r"^\d{1,3}(\.\d{3})+$", t):
        return (int(t.replace(".", "")), True, False, None)
    # Typo: falta un cero -> "10.00" = 10.000
    if re.match(r"^\d+\.\d{2}$", t):
        val = int(t.split(".")[0]) * 1000
        return (val, True, True, "raw=%r -> %d (asumido x1000)" % (s, val))
    # Entero plano: 100 / 200 / 500
    if re.match(r"^\d+$", t):
        return (int(t), True, False, None)
    # Cualquier otra cosa: no se pudo parsear
    return (None, True, True, "precio no parseable raw=%r" % (s,))


def has_value(cell):
    return cell is not None and str(cell).strip() != ""


def find_image(slug):
    for ext in IMG_EXTS:
        if os.path.exists(os.path.join(PRODUCTS_DIR, slug + ext)):
            return "/products/" + slug + ext
    return None


def read_rows():
    """Lee Hoja1 del .xls via Excel COM. Devuelve lista de filas (tuplas de 4 celdas)."""
    import win32com.client as win32

    excel = win32.gencache.EnsureDispatch("Excel.Application")
    excel.Visible = False
    excel.DisplayAlerts = False
    try:
        wb = excel.Workbooks.Open(XLS, ReadOnly=True)
        sh = wb.Sheets(1)
        used = sh.UsedRange
        values = used.Value or ()
        rows = []
        for row in values:
            # normalizar a 4 columnas
            cells = list(row) if isinstance(row, (list, tuple)) else [row]
            cells = (cells + [None, None, None, None])[:4]
            rows.append(tuple(cells))
        wb.Close(False)
        return rows
    finally:
        excel.Quit()


def ts_obj(d):
    """Serializa un dict de producto a una linea de objeto TS, omitiendo opcionales vacios."""
    parts = []
    parts.append("id: %s" % json.dumps(d["id"], ensure_ascii=False))
    parts.append("name: %s" % json.dumps(d["name"], ensure_ascii=False))
    parts.append("category: %s" % json.dumps(d["category"], ensure_ascii=False))
    if d.get("subcategory"):
        parts.append("subcategory: %s" % json.dumps(d["subcategory"], ensure_ascii=False))
    if d.get("brand"):
        parts.append("brand: %s" % json.dumps(d["brand"], ensure_ascii=False))
    parts.append("price: %s" % ("null" if d["price"] is None else str(d["price"])))
    if d.get("salePrice") is not None:
        parts.append("salePrice: %s" % str(d["salePrice"]))
    parts.append("onSale: %s" % ("true" if d["onSale"] else "false"))
    parts.append("inStock: %s" % ("true" if d["inStock"] else "false"))
    if d.get("image"):
        parts.append("image: %s" % json.dumps(d["image"], ensure_ascii=False))
    if d.get("needsReview"):
        parts.append("needsReview: true")
    return "  { " + ", ".join(parts) + " }"


def ts_category(c):
    parts = [
        "id: %s" % json.dumps(c["id"], ensure_ascii=False),
        "label: %s" % json.dumps(c["label"], ensure_ascii=False),
        "shortLabel: %s" % json.dumps(c["shortLabel"], ensure_ascii=False),
        "icon: %s" % json.dumps(c["icon"], ensure_ascii=False),
        "fallbackEmoji: %s" % json.dumps(c["fallbackEmoji"], ensure_ascii=False),
        "blurb: %s" % json.dumps(c["blurb"], ensure_ascii=False),
    ]
    return "  { " + ", ".join(parts) + " }"


HEADER_TEMPLATE = '''// AUTO-GENERATED by scripts/generate-products.py - NO EDITAR A MANO.
// Fuente: "EL GROW DE AIXA - LISTA DE PRECIOS.xls"
// Regenerar: python scripts/generate-products.py

export type CategoryId =
  | "sustratos"
  | "fertilizantes"
  | "control-plagas"
  | "macetas"
  | "accesorios"

export interface Product {
  id: string
  name: string
  category: CategoryId
  subcategory?: string
  brand?: string
  price: number | null
  salePrice?: number | null
  onSale: boolean
  inStock: boolean
  image?: string
  needsReview?: boolean
}

export interface CategoryMeta {
  id: CategoryId
  label: string
  shortLabel: string
  icon: string
  fallbackEmoji: string
  blurb: string
}

export const CATEGORIES: CategoryMeta[] = [
%(categories)s,
]

export const PRODUCTS: Product[] = [
%(products)s,
]

export function getCategory(id: CategoryId): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === id)
}

export function getProductsByCategory(id: CategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === id)
}

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .toLowerCase()
}

export function searchProducts(
  query: string,
  products: Product[] = PRODUCTS,
): Product[] {
  const q = normalize(query.trim())
  if (!q) return products
  return products.filter((p) =>
    normalize([p.name, p.brand ?? "", p.subcategory ?? ""].join(" ")).includes(q),
  )
}
'''


def main():
    if not os.path.exists(XLS):
        print("ERROR: no existe %s" % XLS)
        sys.exit(1)
    os.makedirs(PRODUCTS_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)

    rows = read_rows()

    products = []
    used_slugs = set()
    review = []
    warnings = []
    cur = (None, None, None)  # (category, subcategory, brand)

    for idx, (a, b, c, d) in enumerate(rows, start=1):
        name = ("" if a is None else str(a)).strip()
        if not name:
            continue
        key = normalize_header(name)
        if key in HEADER_MAP:
            ctx = HEADER_MAP[key]
            if ctx is None:
                cur = (None, None, None)  # banner PRODUCTOS
            else:
                cur = ctx
            continue
        # No es header -> es producto si la columna B tiene algo
        if not has_value(b):
            # fila rara (col A con texto pero sin precio y no es header conocido)
            warnings.append("fila %d ignorada (no header, sin precio): %r" % (idx, name))
            continue
        category, subcategory, brand = cur
        if category is None:
            warnings.append("fila %d sin categoria, asignada a 'accesorios': %r" % (idx, name))
            category = "accesorios"
        value, in_stock, needs_review, note = parse_price(b)
        on_sale = has_value(c) and strip_accents(str(c)).strip().upper() == "OFERTA"
        sale_price = None
        if on_sale and has_value(d):
            sp, _, sp_review, sp_note = parse_price(d)
            sale_price = sp
            if sp_review:
                needs_review = True
                note = (note + " | " if note else "") + "sale " + (sp_note or "")
        slug = slugify(name, used_slugs)
        image = find_image(slug)
        prod = {
            "id": slug,
            "name": name,
            "category": category,
            "subcategory": subcategory,
            "brand": brand,
            "price": value,
            "salePrice": sale_price,
            "onSale": on_sale,
            "inStock": in_stock,
            "image": image,
            "needsReview": needs_review,
        }
        products.append(prod)
        if needs_review:
            review.append((name, note))

    # Ordenar por orden de categorias y mantener orden de aparicion dentro de cada una.
    cat_order = {c["id"]: i for i, c in enumerate(CATEGORIES)}
    products.sort(key=lambda p: cat_order.get(p["category"], 99))

    ts_products = ",\n".join(ts_obj(p) for p in products)
    ts_categories = ",\n".join(ts_category(c) for c in CATEGORIES)
    content = HEADER_TEMPLATE % {"categories": ts_categories, "products": ts_products}

    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)

    # ---- Resumen ----
    print("OK -> %s" % os.path.relpath(OUT, ROOT))
    print("Total productos: %d" % len(products))
    for c in CATEGORIES:
        n = sum(1 for p in products if p["category"] == c["id"])
        print("  - %-16s %d" % (c["id"], n))
    print("Sin stock: %d" % sum(1 for p in products if not p["inStock"]))
    print("Precio a consultar (null): %d" % sum(1 for p in products if p["price"] is None))
    print("En oferta: %d" % sum(1 for p in products if p["onSale"]))
    with_img = sum(1 for p in products if p["image"])
    print("Con imagen oficial: %d / %d" % (with_img, len(products)))
    if review:
        print("\n*** FILAS A REVISAR (%d) ***" % len(review))
        for name, note in review:
            print("  - %s  [%s]" % (name, note))
    if warnings:
        print("\n*** ADVERTENCIAS (%d) ***" % len(warnings))
        for w in warnings:
            print("  - %s" % w)


if __name__ == "__main__":
    main()
