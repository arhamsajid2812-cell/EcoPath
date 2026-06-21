"use client";

import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useEcoStore } from "@/store/ecoStore";
import { motion } from "framer-motion";
import { Bot, Send, UploadCloud, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

import { generateMockEcoResponse } from "@/services/ai/mockEcoResponse";
import Link from "next/link";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
}

export default function InsightsPage() {
  const { aiInsights } = useEcoStore();
  
  // Chatbot State
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: "Hi! I'm your AI Eco Coach. Ask me anything about reducing your footprint." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), sender: "user", text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Mock AI Response Delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: generateMockEcoResponse(newUserMsg.text)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5s and 2.5s for realism
  };

  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
        <p className="text-muted-foreground mt-1">Deep dive into your environmental impact.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Data & Tools */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Weekly Analysis */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Bot size={120} />
            </div>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-2 rounded-lg"><TrendingUp size={20} /></span>
              Weekly Analysis
            </h2>
            
            {aiInsights ? (
              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-background border border-border p-4 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Biggest Emission Source</p>
                    <p className="text-lg font-bold text-foreground">{aiInsights.biggestEmissionSource}</p>
                    <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                      <TrendingUp size={14} /> Requires attention
                    </p>
                  </div>
                  <div className="bg-background border border-border p-4 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Most Improved</p>
                    <p className="text-lg font-bold text-foreground">{aiInsights.mostImprovedCategory}</p>
                    <p className="text-sm text-primary mt-2 flex items-center gap-1">
                      <TrendingDown size={14} /> Great progress!
                    </p>
                  </div>
                </div>

                <div className="bg-secondary/10 border border-secondary/20 p-5 rounded-xl">
                  <h3 className="font-semibold text-secondary-foreground mb-2 flex items-center gap-2">
                    Quick Win Opportunity
                  </h3>
                  <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                    "{aiInsights.quickWinOpportunity}"
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No analysis data available. Please generate your baseline profile.</p>
            )}
          </div>
          
          {/* Scan Receipt Link Card */}
          <Link href="/dashboard/vision">
            <div className="bg-card rounded-2xl p-8 shadow-sm border-2 border-border border-dashed transition-colors hover:bg-muted/50 hover:border-primary/50 group cursor-pointer block">
              <div className="flex flex-col items-center text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">Have a new grocery receipt?</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Head over to the Vision AI Scanner to log your latest purchases and update your insights.
                </p>
                <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
                  Go to Vision AI Scanner <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Column: AI Eco Coach Chatbot */}
        <div className="bg-card rounded-2xl shadow-sm border border-border flex flex-col h-[700px] lg:col-span-1 overflow-hidden relative">
          {/* Header */}
          <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center relative">
                <Bot className="text-primary w-6 h-6" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Eco Coach</h3>
                <p className="text-xs text-muted-foreground">Online | Powered by Gemini</p>
              </div>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-background to-muted/20">
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                      : 'bg-background border border-border text-foreground rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-background border border-border rounded-2xl rounded-tl-sm p-4 shadow-sm flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-background border-t border-border">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask your Eco Coach..." 
                className="w-full pl-4 pr-12 py-3 rounded-full border border-input bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-background transition-colors text-sm" 
                aria-label="Chat input for Eco Coach"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
