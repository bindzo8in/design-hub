"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import gsap from "gsap";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

type Step = "name" | "email" | "phone" | "services" | "description" | "done";

const chatFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  services: z.string().min(2, "Please specify a service (e.g. Web Design)"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "bot", text: "Hi there! I'm here to help you get in touch. What's your name?" }
  ]);
  const [currentStep, setCurrentStep] = useState<Step>("name");
  const [isTyping, setIsTyping] = useState(false);
  
  const form = useForm<z.infer<typeof chatFormSchema>>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      services: "",
      description: "",
    },
    mode: "onSubmit",
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
    if (currentStep === "done") return;

    const isValid = await form.trigger(currentStep as keyof z.infer<typeof chatFormSchema>);
    if (!isValid) return;

    const userText = form.getValues(currentStep as keyof z.infer<typeof chatFormSchema>);
    if (!userText || !userText.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: "user", text: userText.trim() }]);
    setIsTyping(true);

    // Process step
    setTimeout(() => {
      let nextStep: Step = currentStep;
      let nextBotMessage = "";

      switch (currentStep) {
        case "name":
          nextBotMessage = `Nice to meet you, ${userText.trim()}! What's your email address?`;
          nextStep = "email";
          break;
        case "email":
          nextBotMessage = "Got it. And your phone number?";
          nextStep = "phone";
          break;
        case "phone":
          nextBotMessage = "Thanks! Which service are you interested in? (e.g. Web Design, Digital Marketing)";
          nextStep = "services";
          break;
        case "services":
          nextBotMessage = "Perfect. Finally, could you provide a brief description of your project?";
          nextStep = "description";
          break;
        case "description":
          nextBotMessage = "Thank you! I'm sending your request now...";
          nextStep = "done";
          break;
      }

      setCurrentStep(nextStep);
      
      if (nextStep !== "done") {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: nextBotMessage }]);
        setIsTyping(false);
      } else {
        // Submit form
        const data = form.getValues();
        submitForm({
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: "Chatbot Inquiry",
          services: [data.services],
          description: data.description,
        });
      }
    }, 1000);
  };

  const submitForm = async (data: { name: string; email: string; phone: string; subject: string; services: string[]; description: string; }) => {
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
    } catch {
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
        <div className="flex h-[380px] flex-col gap-4 overflow-y-auto overscroll-contain p-5 scrollbar-thin scrollbar-thumb-accent/20">
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
          <Form {...form}>
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-start gap-3">
                {currentStep !== "done" ? (
                  <FormField
                    control={form.control}
                    name={currentStep as keyof z.infer<typeof chatFormSchema>}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        {currentStep === "services" ? (
                          <Select
                            disabled={isTyping}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full rounded-full border border-border/60 bg-background/50 h-[42px] px-4 text-sm text-foreground focus:ring-1 focus:ring-accent focus:border-accent data-[state=open]:ring-1 data-[state=open]:ring-accent data-[state=open]:border-accent">
                                <SelectValue placeholder="Select a service..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="z-[10000]">
                              <SelectItem value="Web Design">Web Design</SelectItem>
                              <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                              <SelectItem value="SEO">SEO</SelectItem>
                              <SelectItem value="App Development">App Development</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <FormControl>
                            <input
                              {...field}
                              ref={(e) => {
                                field.ref(e);
                                if (e) (inputRef as any).current = e;
                              }}
                              type={currentStep === "email" ? "email" : currentStep === "phone" ? "tel" : "text"}
                              disabled={isTyping}
                              placeholder="Type your answer..."
                              className="w-full rounded-full border border-border/60 bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
                            />
                          </FormControl>
                        )}
                        <FormMessage className="text-[10px] ml-4 mt-1" />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div className="flex-1">
                    <input
                      disabled
                      placeholder="Chat ended"
                      className="w-full rounded-full border border-border/60 bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  disabled={currentStep === "done" || isTyping}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors"
                >
                  <Send className="h-4 w-4 ml-0.5" />
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
