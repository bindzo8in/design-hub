"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import gsap from "gsap";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

type Step = "name" | "email" | "phone" | "services" | "description" | "done";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "bot", text: "Hi there! I'm here to help you get in touch. What's your name?" }
  ]);
  const [currentStep, setCurrentStep] = useState<Step>("name");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Chatbot Inquiry",
    services: [] as string[],
    description: "",
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // GSAP animation for open/close
  useEffect(() => {
    if (chatContainerRef.current) {
      if (isOpen) {
        gsap.fromTo(
          chatContainerRef.current,
          { autoAlpha: 0, y: 20, scale: 0.95 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)", display: "flex" }
        );
      } else {
        gsap.to(chatContainerRef.current, {
          autoAlpha: 0,
          y: 20,
          scale: 0.95,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(chatContainerRef.current, { display: "none" });
          }
        });
      }
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when bot finishes typing
  useEffect(() => {
    if (!isTyping && isOpen && currentStep !== "done") {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isTyping, isOpen, currentStep]);

  const handleSend = async () => {
    if (!inputValue.trim() || currentStep === "done") return;

    const userText = inputValue.trim();
    setInputValue("");
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: "user", text: userText }]);
    setIsTyping(true);

    // Process step
    setTimeout(() => {
      let nextStep: Step = currentStep;
      let nextBotMessage = "";
      
      const newFormData = { ...formData };

      switch (currentStep) {
        case "name":
          newFormData.name = userText;
          nextBotMessage = `Nice to meet you, ${userText}! What's your email address?`;
          nextStep = "email";
          break;
        case "email":
          newFormData.email = userText;
          nextBotMessage = "Got it. And your phone number?";
          nextStep = "phone";
          break;
        case "phone":
          newFormData.phone = userText;
          nextBotMessage = "Thanks! Which service are you interested in? (e.g. Web Design, Digital Marketing)";
          nextStep = "services";
          break;
        case "services":
          newFormData.services = [userText];
          nextBotMessage = "Perfect. Finally, could you provide a brief description of your project?";
          nextStep = "description";
          break;
        case "description":
          newFormData.description = userText;
          nextBotMessage = "Thank you! I'm sending your request now...";
          nextStep = "done";
          break;
      }

      setFormData(newFormData);
      setCurrentStep(nextStep);
      
      if (nextStep !== "done") {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: nextBotMessage }]);
        setIsTyping(false);
      } else {
        // Submit form
        submitForm(newFormData);
      }
    }, 1000);
  };

  const submitForm = async (data: typeof formData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send");
      
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        sender: "bot", 
        text: "Request sent successfully! Our team will contact you within 24 hours." 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        sender: "bot", 
        text: "Oops, something went wrong while sending. Please try again later or use the contact page." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9998] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      <div
        ref={chatContainerRef}
        className="fixed bottom-24 right-6 z-[9998] hidden w-[90vw] max-w-[350px] flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-accent/10 px-5 py-4 border-b border-border/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground font-[family-name:var(--font-orbitron)] tracking-wider">Hub Assistant</h3>
            <p className="text-[10px] text-accent font-medium uppercase tracking-widest mt-0.5">Online</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex h-[380px] flex-col gap-4 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-accent/20">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-accent text-accent-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex w-full justify-start">
              <div className="flex gap-1.5 max-w-[85%] rounded-2xl bg-muted px-4 py-4 rounded-bl-sm items-center h-[44px]">
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: "0ms" }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: "150ms" }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border/50 p-4 bg-background/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              ref={inputRef}
              type={currentStep === "email" ? "email" : currentStep === "phone" ? "tel" : "text"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={currentStep === "done" || isTyping}
              placeholder={currentStep === "done" ? "Chat ended" : "Type your answer..."}
              className="flex-1 rounded-full border border-border/60 bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || currentStep === "done" || isTyping}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors"
            >
              <Send className="h-4 w-4 ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
