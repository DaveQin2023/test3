
import { useEffect, useState } from 'react';

const ChatHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="bg-[#112B45] p-4 rounded-lg max-h-60 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-2">Chat History</h3>
      {history.length === 0 ? (
        <p className="text-sm text-gray-400">No messages yet.</p>
      ) : (
        <ul className="space-y-1 text-sm">
          {history.map((msg, idx) => (
            <li key={idx} className="text-green-200">• {msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatHistory;
