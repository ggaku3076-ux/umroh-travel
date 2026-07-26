"use client";

import { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, X, Send, Bot, User, Mic, MicOff, RefreshCw, 
  BadgeCheck, ExternalLink, Sparkles, ChevronDown, Loader2, Star
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/types/chatbot";
import { generateAIResponse } from "@/services/aiChatService";
import { createSupabaseChatSession, saveSupabaseMessage, fetchSupabaseChatHistory } from "@/lib/supabase";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Chatbot Session & Supabase Sync
  useEffect(() => {
    let existingSession = localStorage.getItem("soraya_chat_session_id");
    if (!existingSession) {
      existingSession = `session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      localStorage.setItem("soraya_chat_session_id", existingSession);
    }
    setSessionId(existingSession);

    // Initial greeting if messages list is empty
    const welcomeMsg: ChatMessage = {
      id: "msg_welcome",
      role: "assistant",
      content: "Assalamu'alaikum! Saya **Soraya AI Assistant** 🕋. Selamat datang di **Soraya Tour** (Travel Haji & Umroh VIP Bintang 5).\n\nAda yang bisa saya bantu jelaskan mengenai Paket Umroh Reguler, Umroh Plus Turki, Perjalanan Haji Khusus Furoda, atau jadwal pendaftaran hari ini?",
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      quickActions: [
        { label: "🕋 Umroh Bintang 5", action: "Berapa biaya paket Umroh Bintang 5?" },
        { label: "✈️ Umroh Plus Turki", action: "Info paket Umroh Plus Turki" },
        { label: "📋 Cara Pendaftaran", action: "Bagaimana cara pendaftaran Umroh?" },
      ],
    };

    // Try fetching history from Supabase if available
    fetchSupabaseChatHistory(existingSession).then((history) => {
      if (history && history.length > 0) {
        setMessages(history);
      } else {
        setMessages([welcomeMsg]);
      }
    });

    createSupabaseChatSession(existingSession);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Voice Input Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = "id-ID";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Fitur pengenal suara tidak didukung di browser ini.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery("");
    setIsTyping(true);

    saveSupabaseMessage(sessionId, userMsg);

    try {
      const response = await generateAIResponse(query, messages);
      
      const assistantMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: response.text,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        quickActions: response.quickActions,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      saveSupabaseMessage(sessionId, assistantMsg);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        role: "assistant",
        content: "Maaf, terjadi masalah koneksi. Silakan hubungi CS WhatsApp kami di **0812-3456-789** untuk bantuan langsung.",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (actionText: string) => {
    handleSendMessage(actionText);
  };

  const handleDirectWhatsApp = () => {
    window.open("https://wa.me/628123456789?text=Halo%20Soraya%20Tour,%20saya%20ingin%20konsultasi%20Paket%20Umroh", "_blank");
  };

  const handleResetChat = () => {
    const newSession = `session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    localStorage.setItem("soraya_chat_session_id", newSession);
    setSessionId(newSession);

    const welcomeMsg: ChatMessage = {
      id: "msg_welcome_reset",
      role: "assistant",
      content: "Percakapan telah direset. Ada yang bisa **Soraya AI** bantu kembali?",
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      quickActions: [
        { label: "🕋 Umroh Bintang 5", action: "Berapa biaya paket Umroh Bintang 5?" },
        { label: "✈️ Umroh Plus Turki", action: "Info paket Umroh Plus Turki" },
        { label: "📋 Cara Pendaftaran", action: "Bagaimana cara pendaftaran Umroh?" },
      ],
    };

    setMessages([welcomeMsg]);
    createSupabaseChatSession(newSession);
  };

  return (
    <>
      {/* FLOATING CHAT TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-[900]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-stone-950 shadow-xl shadow-amber-500/25 border border-amber-300 font-extrabold text-sm overflow-hidden"
          aria-label="Tanya Soraya AI Assistant"
        >
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-950 opacity-20" />
            <Bot className="h-5 w-5 text-stone-950" />
          </div>
          <span>Tanya Soraya AI 🕋</span>
        </motion.button>
      </div>

      {/* CHAT MODAL WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-[950] w-[calc(100vw-2rem)] sm:w-[420px] max-h-[600px] h-[80vh] rounded-3xl bg-[#12100E] border border-amber-500/30 shadow-2xl shadow-black/80 flex flex-col overflow-hidden text-white"
          >
            {/* CHAT HEADER */}
            <div className="bg-gradient-to-r from-[#1A1815] via-[#24201B] to-[#1A1815] px-5 py-4 border-b border-amber-500/20 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#12100E]" />
                </div>
                <div>
                  <h3 className="font-nunito font-bold text-sm leading-none text-white">Soraya AI Assistant 🕋</h3>
                  <span className="text-[11px] text-amber-300/80 font-light mt-0.5 block">Asisten Pintar Soraya Tour</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetChat}
                  title="Reset Chat"
                  className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Tutup Chat"
                  className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* CHAT MESSAGES BODY */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#12100E] to-[#0A0908]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-medium rounded-tr-none shadow-md"
                        : "bg-white/10 border border-amber-500/20 text-stone-100 rounded-tl-none"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    <div className={`mt-2 text-[9px] text-right font-light ${msg.role === "user" ? "text-stone-900/60" : "text-stone-400"}`}>
                      {msg.timestamp}
                    </div>
                  </div>

                  {/* QUICK ACTIONS OPTIONS */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pl-1">
                      {msg.quickActions.map((qa, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(qa.action)}
                          className="px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] font-medium border border-amber-500/30 transition-all duration-200"
                        >
                          {qa.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-stone-400 text-xs pl-2 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                  <span>Soraya AI sedang mengetik...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* CHAT INPUT FORM */}
            <div className="p-3 bg-[#1A1815] border-t border-amber-500/20 flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-2 bg-[#0D0C0A] border border-amber-500/30 rounded-2xl px-3 py-1.5 focus-within:border-amber-400 transition-all">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Tanya paket Umroh, harga, syarat..."
                  className="w-full bg-transparent text-xs text-white placeholder-stone-400 focus:outline-none py-1.5"
                />

                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`p-1.5 rounded-full transition-colors ${
                    isListening ? "bg-rose-500 text-white animate-pulse" : "text-stone-400 hover:text-amber-400"
                  }`}
                  title="Voice Input"
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputQuery.trim() || isTyping}
                  className="p-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold disabled:opacity-40 hover:brightness-110 transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-between px-1 text-[10px] text-stone-400">
                <button
                  onClick={handleDirectWhatsApp}
                  className="flex items-center gap-1 text-amber-400 hover:underline font-semibold"
                >
                  <span>Chat CS WhatsApp Langsung</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
                <span>Resmi Kemenag RI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
