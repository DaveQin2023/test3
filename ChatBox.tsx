
import { useState } from 'react';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const userMessage = `You: ${input}`;
      const existing = localStorage.getItem("chat_history");
      const history = existing ? JSON.parse(existing) : [];
      const updated = [...history, userMessage];
      localStorage.setItem("chat_history", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("new_chat", { detail: [userMessage] }));

      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const aiReply = `AI: ${data.reply}`;
      const updatedFinal = [...updated, aiReply];
      localStorage.setItem("chat_history", JSON.stringify(updatedFinal));
      window.dispatchEvent(new CustomEvent("new_chat", { detail: [aiReply] }));
      setInput('');
    } catch (err) {
      console.error('Error fetching from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#112B45] p-4 rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <input
          className="flex-1 p-3 bg-[#0F1923] rounded-lg text-white outline-none"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="ml-4 bg-blue-600 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
