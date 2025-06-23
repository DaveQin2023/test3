
import { useEffect, useRef, useState } from 'react';

const ChatScrollArea = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: any) => {
      const newMessage = e.detail as string[];
      const updated = [...messages, ...newMessage];
      localStorage.setItem("chat_history", JSON.stringify(updated));
      setMessages(updated);
    };
    window.addEventListener("new_chat", handleStorageChange);
    return () => window.removeEventListener("new_chat", handleStorageChange);
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearChat = () => {
    localStorage.removeItem("chat_history");
    setMessages([]);
  };

  return (
    <div className="bg-[#1A2636] flex-1 rounded-lg p-4 overflow-y-scroll max-h-[40vh]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Conversation</h3>
        <button className="text-red-400 text-sm underline" onClick={clearChat}>Clear Chat</button>
      </div>
      {messages.length === 0 ? (
        <p className="text-sm text-gray-400">No messages yet.</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {messages.map((msg, idx) => (
            <li key={idx} className={`flex ${msg.startsWith("You:") ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-xl px-4 py-2 max-w-[70%] ${msg.startsWith("You:") ? "bg-blue-500 text-white" : "bg-[#2e2e2e] text-white"}`}>
                {msg.replace(/^You: |^AI: /, "")}
              </div>
            </li>
          ))}
          <div ref={bottomRef} />
        </ul>
      )}
    </div>
  );
};

export default ChatScrollArea;
