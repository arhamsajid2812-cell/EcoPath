"use client";

import { useState, useRef, useEffect } from "react";
import { useEcoStore } from "@/store/ecoStore";
import { motion } from "framer-motion";
import { Bot, Send, UploadCloud, TrendingUp, TrendingDown } from "lucide-react";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
}

export function WeeklyAnalysisWidget() {
  const aiInsights = useEcoStore(state => state.aiInsights);
  
  if (!aiInsights) {
    return <p className="text-muted-foreground text-sm">No analysis data available. Please generate your baseline profile.</p>;
  }

  return (
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
  );
}

export function EcoCoachChatWidget() {
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

  const generateMockEcoResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.match(/\b(hi|hello|hey|greetings)\b/)) {
      return "Hello there! I'm ready to help you reduce your carbon footprint. How can I assist you today?";
    }
    if (lowerInput.match(/\b(challenge|quests|habit)\b/)) {
      return "Challenges are a great way to build habits! I highly recommend trying a 'Meatless Weekend' or 'Public Transit Pioneer'. Both can significantly reduce your impact.";
    }
    if (lowerInput.match(/\b(transport|car|drive|flight|fly)\b/)) {
      return "Transportation is a major emission source. Did you know that switching just 20% of your car commutes to public transit can cut your yearly footprint by nearly 500kg?";
    }
    if (lowerInput.match(/\b(food|diet|meat|vegan|vegetarian)\b/)) {
      return "Diet plays a huge role. A plant-based diet can cut your food-related emissions by up to 70%. Even just one meatless day a week makes a noticeable difference!";
    }
    if (lowerInput.match(/\b(electricity|power|energy|kwh)\b/)) {
      return "To lower your electricity footprint, try unplugging idle devices, switching to LED bulbs, and turning down your thermostat by just 1 degree in winter.";
    }
    if (lowerInput.match(/\b(1\+1|math|calculate|joke)\b/)) {
      return "I'm specifically trained to help you with environmental sustainability! I might not be a math genius, but I can definitely help you calculate your carbon footprint.";
    }
    if (lowerInput.match(/\b(thank|thanks)\b/)) {
      return "You're very welcome! Every little step counts towards a greener planet. Let me know if you need anything else.";
    }
    
    const fallbacks = [
      "That's a great point. Small daily choices really add up when it comes to sustainability. Have you checked your 'Insights' tab today?",
      "Interesting! If you want to dive deeper into that, you can log it as an activity to see its exact carbon impact.",
      "I'm here to help you live more sustainably. Could you provide a bit more detail about your daily habits related to that?",
      "That's an interesting question. Based on your profile, I'd say focusing on local produce over imported goods is a great next step."
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), sender: "user", text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: generateMockEcoResponse(newUserMsg.text)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <>
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

      <div className="p-4 bg-background border-t border-border">
        <form onSubmit={handleSendMessage} className="relative flex items-center">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask your Eco Coach..." 
            className="w-full pl-4 pr-12 py-3 rounded-full border border-input bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-background transition-colors text-sm" 
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
}
