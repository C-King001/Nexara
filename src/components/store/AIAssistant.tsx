import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import type { Product } from '@/data/products';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  products?: Product[];
}

const suggestions = [
  'Best phone under $500',
  'Compare iPhone vs Samsung',
  'Best phone for photography',
  'What earbuds should I get?',
];

function generateResponse(query: string): { text: string; products?: Product[] } {
  const q = query.toLowerCase();

  if (q.includes('photo') || q.includes('camera')) {
    const recs = products.filter((p) => p.category === 'smartphone' && (p.id.includes('pixel') || p.id.includes('xiaomi') || p.id.includes('s24-ultra')));
    return {
      text: "For photography, I'd recommend these top camera phones. The Pixel 8 Pro leads with Google's computational photography magic, while the Galaxy S24 Ultra and Xiaomi 14 Pro offer Hasselblad and 200MP systems respectively.",
      products: recs.slice(0, 3),
    };
  }

  if (q.includes('under 500') || q.includes('budget') || q.includes('cheap')) {
    const recs = products.filter((p) => p.category === 'smartphone' && p.price <= 500);
    return {
      text: `Here are my top picks under $500. The Galaxy A55 offers great value with IP67, AMOLED display, and 4-year update promise — hard to beat at this price point.`,
      products: recs.slice(0, 3),
    };
  }

  if (q.includes('iphone') || q.includes('apple')) {
    const recs = products.filter((p) => p.brand === 'Apple' && p.category === 'smartphone');
    return {
      text: "Apple's iPhone 15 lineup is exceptional this year. The Pro Max brings titanium, 5× zoom, and the A17 Pro chip. If size matters, the standard Pro is equally powerful in a smaller package.",
      products: recs,
    };
  }

  if (q.includes('samsung') || q.includes('galaxy')) {
    const recs = products.filter((p) => p.brand === 'Samsung' && p.category === 'smartphone');
    return {
      text: "Samsung's Galaxy S24 lineup leads Android this year. The S24 Ultra is the pinnacle with its S Pen and 200MP camera. For most users, the S24+ hits the sweet spot of performance and value.",
      products: recs.slice(0, 3),
    };
  }

  if (q.includes('earbuds') || q.includes('airpods') || q.includes('buds')) {
    const recs = products.filter((p) => p.category === 'earbuds');
    return {
      text: "For earbuds in 2024: AirPods Pro 2 remain the best all-rounder for iPhone users. Sony WF-1000XM5 wins on ANC and audio quality. Galaxy Buds3 Pro is best for Samsung users.",
      products: recs,
    };
  }

  if (q.includes('headphones')) {
    const recs = products.filter((p) => p.category === 'headphones');
    return {
      text: "The Sony WH-1000XM5 is the undisputed king of noise-cancelling headphones — 30-hour battery, class-leading ANC. AirPods Max are Apple's premium pick with spatial audio. Both are outstanding.",
      products: recs,
    };
  }

  if (q.includes('compare') || q.includes('vs') || q.includes('versus')) {
    return {
      text: "Great idea! Use our compare tool to put phones head-to-head on specs like camera, battery, display, and price. You can compare up to 3 devices at once. Want me to suggest some popular comparisons?",
    };
  }

  if (q.includes('charger') || q.includes('charging') || q.includes('fast charge')) {
    const recs = products.filter((p) => p.category === 'charger');
    return {
      text: "For fast charging, the Anker 65W GaN charger is my top pick — it charges phones AND laptops from a compact single brick. Apple's MagSafe is best for iPhone 12 and up.",
      products: recs,
    };
  }

  if (q.includes('watch') || q.includes('smartwatch')) {
    const recs = products.filter((p) => p.category === 'watch');
    return {
      text: "Apple Watch Series 9 is the best smartwatch for iPhone users — Double Tap gesture, ECG, and best-in-class health tracking. Galaxy Watch6 Classic wins on design and Android compatibility.",
      products: recs,
    };
  }

  // Default
  const featured = products.filter((p) => p.isFeatured).slice(0, 3);
  return {
    text: `I can help you find the perfect phone or accessory! Tell me your budget, preferred brand, or what features matter most to you — camera quality, battery life, design, performance. Here are some of our most popular picks right now:`,
    products: featured,
  };
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: "Hi! I'm SDK's AI Shopping Assistant. Tell me what you're looking for — budget, features, or brand — and I'll find the perfect device for you. 🤖",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: q };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 700 + Math.random() * 400));

    const { text: reply, products: recs } = generateResponse(q);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: reply,
      products: recs,
    };
    setMessages((m) => [...m, aiMsg]);
    setLoading(false);
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full btn-lime shadow-lg flex items-center justify-center glow-lime"
        aria-label="Open AI assistant"
      >
        <Sparkles size={22} />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] max-w-sm h-[520px] bg-[#0f0f13] border border-white/[0.09] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] bg-lime/5">
              <div className="w-8 h-8 rounded-lg bg-lime flex items-center justify-center">
                <Bot size={16} className="text-black" />
              </div>
              <div className="flex-1">
                <div className="font-display font-700 text-white text-sm">AI Assistant</div>
                <div className="text-[10px] text-lime font-code">● Online · Always here to help</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg text-white/40 hover:text-white flex items-center justify-center"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-lime/15 border border-lime/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={11} className="text-lime" />
                    </div>
                  )}
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-lime/15 text-white' : 'kure-card text-white/85'} rounded-2xl px-3 py-2.5 text-sm font-ui leading-relaxed`}>
                    {msg.text}
                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.products.map((p) => (
                          <Link
                            key={p.id}
                            to={`/product/${p.id}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-8 h-8 rounded-md object-contain bg-white/[0.05]"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-ui font-600 text-white truncate">{p.name}</div>
                              <div className="text-[10px] font-code text-lime">${p.price}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-lime/15 border border-lime/25 flex items-center justify-center shrink-0">
                    <Bot size={11} className="text-lime" />
                  </div>
                  <div className="kure-card rounded-2xl px-4 py-3 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-lime/50"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="px-2.5 py-1 rounded-full kure-surface text-[11px] font-ui text-white/50 hover:text-lime hover:border-lime/30 transition-colors border border-white/[0.07]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3">
              <form
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex gap-2 items-center kure-surface rounded-xl px-3 py-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything…"
                  className="flex-1 bg-transparent text-sm font-ui text-white placeholder-white/25 outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg btn-lime flex items-center justify-center disabled:opacity-40"
                >
                  <Send size={13} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
