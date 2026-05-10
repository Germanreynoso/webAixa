import fitz
import os

pdf_path = "MANUAL DE MARCA-1.pdf"
output_dir = "pdf_assets"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

doc = fitz.open(pdf_path)

# Extract text
text_content = ""
for i, page in enumerate(doc):
    text_content += f"--- Page {i+1} ---\n"
    text_content += page.get_text() + "\n"

with open(f"{output_dir}/extracted_text.txt", "w", encoding="utf-8") as f:
    f.write(text_content)

# Extract images
image_count = 0
for page_index in range(len(doc)):
    page = doc[page_index]
    image_list = page.get_images(full=True)
    for img_index, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        image_filename = f"{output_dir}/image_page{page_index+1}_{img_index+1}.{image_ext}"
        with open(image_filename, "wb") as f:
            f.write(image_bytes)
        image_count += 1

print(f"Extraction complete. Found {image_count} images. Text saved to {output_dir}/extracted_text.txt")
