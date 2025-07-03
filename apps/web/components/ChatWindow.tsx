'use client'
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! How can I help with your vanity address generation?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
// For switching between generator and chat on mobile
const [showChat, setShowChat] = useState(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      
      if (!res.ok) throw new Error('Failed to get response');
      
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[500px] flex flex-col border border-cyan-400 rounded-lg bg-gray-800 overflow-hidden">
      <div className="p-4 border-b border-cyan-400">
        <h2 className="text-xl font-bold text-cyan-300">Support Chat</h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, idx) => (
          <div 
            key={idx} 
            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div className={`inline-block px-4 py-2 rounded-lg ${message.role === 'user' 
              ? 'bg-cyan-600 text-white' 
              : 'bg-gray-700 text-gray-200'}`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-left mb-4">
            <div className="inline-block px-4 py-2 rounded-lg bg-gray-700 text-gray-200">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-cyan-400">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-900 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}