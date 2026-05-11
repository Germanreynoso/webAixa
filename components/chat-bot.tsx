'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Leaf, User, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy el experto en cultivos de El Grow de Aixa. ¿En qué puedo ayudarte hoy con tus plantas de cannabis?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const updatedMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    
    setInput('');
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Unexpected response format');
      }

      const assistantMessage = data.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error: any) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Lo siento, hubo un error: ${error.message || 'Intenta de nuevo más tarde.'}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <Card className="mb-4 w-[380px] sm:w-[550px] h-[750px] max-h-[85vh] shadow-2xl border-[#D20480]/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <CardHeader className="bg-[#D20480] text-white p-4 flex flex-row items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-white p-0.5 rounded-full overflow-hidden w-10 h-10 border-2 border-white/20">
                <img src="/mascot.png" alt="Mascota" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Asistente Aixa</h3>
                <p className="text-[10px] opacity-80">En línea para ayudarte</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10 h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 min-h-0 p-0 bg-gray-50/50">
            <ScrollArea className="h-full p-4" viewportRef={scrollRef}>
              <div className="flex flex-col gap-4">
                {messages.map((m, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex items-start gap-2 max-w-[85%]",
                      m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-full mt-1",
                      m.role === 'user' ? "bg-[#D20480] text-white" : "bg-white border border-gray-200"
                    )}>
                      {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3 text-[#D20480]" />}
                    </div>
                    <div className={cn(
                      "p-3 rounded-2xl text-sm shadow-sm",
                      m.role === 'user' 
                        ? "bg-[#D20480] text-white rounded-tr-none" 
                        : "bg-white text-[#D20480] border border-gray-100 rounded-tl-none"
                    )}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-2 mr-auto max-w-[85%]">
                    <div className="p-2 rounded-full mt-1 bg-white border border-gray-200">
                      <Bot className="w-3 h-3 text-[#D20480]" />
                    </div>
                    <div className="p-3 rounded-2xl text-sm shadow-sm bg-white text-[#D20480] border border-gray-100 rounded-tl-none flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#D20480]" />
                      Pensando...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
            <form 
              className="flex w-full items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <Input
                placeholder="Escribe tu consulta sobre cultivo..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 focus-visible:ring-[#D20480] text-[#D20480] placeholder:text-gray-400 disabled:opacity-50"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !input.trim()}
                className="bg-[#D20480] hover:bg-[#B1036B] shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-32 w-32 rounded-full shadow-2xl transition-all duration-300 border-4 p-0 overflow-hidden",
          isOpen 
            ? "bg-white border-[#D20480]" 
            : "bg-white border-white hover:scale-110"
        )}
      >
        {isOpen ? (
          <X className="w-16 h-16 text-[#D20480]" />
        ) : (
          <div className="w-full h-full bg-white flex items-center justify-center p-1">
            <img src="/mascot.png" alt="Mascota Chat" className="w-full h-full object-contain" />
          </div>
        )}
      </Button>
    </div>
  );
}
