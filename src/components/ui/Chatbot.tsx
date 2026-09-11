"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "What projects has Abhijit built?",
  "What is his tech stack?",
  "Is he open to work?",
  "How can I contact him?",
];

function MarkdownMessage({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-1.5 text-sm leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />;

        if (/^[\*\-]\s+/.test(trimmed)) {
          const text = trimmed.replace(/^[\*\-]\s+/, "");
          return (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-signal-orange mt-0.5 shrink-0">▸</span>
              <span>{renderInline(text)}</span>
            </div>
          );
        }

        if (/^#+\s/.test(trimmed)) {
          const text = trimmed.replace(/^#+\s/, "");
          return (
            <p key={i} className="font-semibold text-paper mt-2">
              {renderInline(text)}
            </p>
          );
        }

        return <p key={i}>{renderInline(trimmed)}</p>;
      })}
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <strong key={i} className="text-paper font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (/^\*[^*]+\*$/.test(part)) {
      return (
        <em key={i} className="text-paper-dim">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Abhijit's portfolio assistant 👋 Ask me anything about his skills, projects, experience, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            data.error ||
            "Something went wrong. Please try again.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const showSuggestions = messages.length === 1;

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        data-cursor="link"
        aria-label={open ? "Close chat" : "Ask me anything"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-signal-orange text-ink flex items-center justify-center shadow-lg shadow-signal-orange/30"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[99] w-[360px] max-w-[calc(100vw-24px)] rounded-xl border border-surface-border bg-ink shadow-2xl flex flex-col overflow-hidden"
            style={{ height: "500px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-border bg-ink-raised shrink-0">
              <div className="w-8 h-8 rounded-full bg-signal-orange/20 border border-signal-orange/40 flex items-center justify-center">
                <Bot size={16} className="text-signal-orange" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-paper leading-none">
                  Ask about Abhijit
                </p>
                <p className="font-mono-stack text-[10px] text-signal-green mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-green inline-block" />
                  online
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                data-cursor="link"
                className="ml-auto text-paper-dim hover:text-paper transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2.5 ${
                      msg.role === "user"
                        ? "bg-signal-orange text-ink font-medium text-sm"
                        : "bg-surface border border-surface-border text-paper-dim"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <MarkdownMessage content={msg.content} />
                    ) : (
                      <p className="text-sm">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {showSuggestions && (
                <div className="space-y-2 pt-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      data-cursor="link"
                      className="w-full text-left text-xs px-3 py-2 rounded-lg border border-surface-border text-paper-dim hover:border-signal-orange hover:text-signal-orange transition-colors bg-ink-raised"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface border border-surface-border rounded-lg px-3 py-2 flex items-center gap-2">
                    <Loader2
                      size={13}
                      className="animate-spin text-signal-orange"
                    />
                    <span className="text-xs text-paper-dim">Typing...</span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="shrink-0 flex items-center gap-2 px-3 py-3 border-t border-surface-border bg-ink-raised"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something about Abhijit..."
                disabled={loading}
                className="flex-1 bg-surface border border-surface-border rounded-md px-3 py-2 text-sm text-paper placeholder:text-paper-dim/50 outline-none focus:border-signal-orange transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                data-cursor="link"
                className="w-9 h-9 rounded-md bg-signal-orange text-ink flex items-center justify-center hover:bg-signal-orange/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}