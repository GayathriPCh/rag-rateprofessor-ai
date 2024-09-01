"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSend, FiArrowLeft } from "react-icons/fi";
import { FaUser, FaRobot } from "react-icons/fa";
import { chatbotResponse } from "@/utils/pinecone-utils";
import Link from "next/link";
import vaporwaveBackground from '../vaporwave2.png'; // Importing the background image

interface Message {
  type: 'user' | 'bot';
  text: string;
}

const GradientBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-[#ff77e9] to-[#6e00ff] opacity-80" />
);

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(circle, rgba(255,0,0,0.15) 0%, rgba(0,0,0,0) 70%)",
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, Math.random() * 100 - 50],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    ))}
  </div>
);

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatbotResponse(input);
      const botMessage: Message = { type: 'bot', text: response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = { type: 'bot', text: "Sorry, I encountered an error while processing your request." };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen overflow-hidden relative">
      <GradientBackground />
      <AnimatedBackground />
      <div 
        className="relative flex flex-col min-h-screen"
        style={{ 
          backgroundImage: `url(${vaporwaveBackground.src})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat' 
        }}
      >
        <Link href="/" passHref>
          <motion.button
            className="absolute top-4 left-4 px-20 py-7 text-xl font-semibold text-black bg-gradient-to-r from-[#00fbff] to-[#3dffab] rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">Back to Home</span>
            <FiArrowLeft size={30} />
          </motion.button>
        </Link>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex-grow flex flex-col items-center justify-center px-4 py-16"
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center mb-8 flex flex-col sm:flex-row items-center justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, yoyo: Infinity, ease: "easeInOut" }}
          >
          </motion.h1>
          <Card className="w-full max-w-4xl bg-gray-800/60 backdrop-blur-md border-2 border-transparent shadow-lg rounded-2xl overflow-hidden">
  <CardHeader className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-md">
  <CardTitle className="text-2xl sm:text-3xl font-semibold text-custom-green font-panforte">
  welcome to ProfInsights - our professor review forum! If you have any questions about specific professors, feel free to ask. You can start by asking me to list all the currently available professors.
</CardTitle>

  </CardHeader>
  <CardContent className="p-4 sm:p-6">
    <motion.div
      id="chat-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="h-[50vh] sm:h-[60vh] overflow-y-auto mb-4 p-4 rounded-lg bg-gray-700/50 backdrop-blur-md scrollbar-thin scrollbar-thumb-[radial-gradient(circle, rgba(120,255,0,0.971) 23%, rgba(188,255,61,1) 91%)] scrollbar-track-gray-800"
    >
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex mb-4 ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className={`flex items-start space-x-2 ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`p-3 rounded-full ${
                message.type === 'user' ? 'bg-custom-green text-custom-text-black' : 'bg-purple-600'
              } flex items-center justify-center`}>
                {message.type === 'user' ? <FaUser size={24} /> : <FaRobot size={24} />}
              </div>
              <div className={`p-3 sm:p-4 rounded-lg ${
                message.type === 'user' ? 'bg-custom-green text-custom-text-black' : 'bg-purple-600'
              } max-w-[80%] shadow-lg text-sm sm:text-base flex items-center`}>
                {message.text}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start"
        >
          <div className="bg-gray-600 p-3 rounded-lg flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </motion.div>
      )}
    </motion.div>
  </CardContent>
  <CardFooter className="bg-gray-900/50 border-t border-gray-700">
    <div className="flex items-center space-x-4 p-4">
      <Input
       type="text"
       placeholder="Type your message..."
       value={input}
       onChange={(e) => setInput(e.target.value)}
       className="flex-1 bg-gray-800 text-white rounded-lg border-none focus:outline-none focus:ring-0 px-4 py-2"
       style={{ height: '40px', fontSize: '35px', lineHeight: '50px' }}
      />
      <Button
        onClick={handleSendMessage}
        className="bg-gradient-to-r from-[#00eeff] to-[#bcff3d] text-white rounded-full p-5"
      >
        <FiSend size={50} />
      </Button>
    </div>
  </CardFooter>
</Card>

        </motion.div>
      </div>
    </div>
  );
}
