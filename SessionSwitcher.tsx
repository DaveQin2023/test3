
import { useEffect, useState } from 'react';

const SessionSwitcher = ({ onSessionChange }: { onSessionChange: (sessionId: string) => void }) => {
  const [sessions, setSessions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("session_ids");
    const ids = stored ? JSON.parse(stored) : [];
    setSessions(ids);
    if (ids.length > 0) {
      setSelected(ids[0]);
      onSessionChange(ids[0]);
    }
  }, []);

  const createSession = () => {
    const newId = `session-${Date.now()}`;
    const updated = [newId, ...sessions];
    localStorage.setItem("session_ids", JSON.stringify(updated));
    localStorage.setItem(`chat_history_${newId}`, JSON.stringify([]));
    setSessions(updated);
    setSelected(newId);
    onSessionChange(newId);
  };

  const handleSelect = (id: string) => {
    setSelected(id);
    onSessionChange(id);
  };

  return (
    <div className="space-y-2 text-sm text-white p-2">
      <div className="flex justify-between items-center">
        <span className="font-bold">Sessions</span>
        <button onClick={createSession} className="text-blue-400 underline">+ New</button>
      </div>
      <ul>
        {sessions.map(id => (
          <li key={id}>
            <button
              className={\`w-full text-left px-2 py-1 rounded \${selected === id ? 'bg-blue-600' : 'hover:bg-gray-700'}\`}
              onClick={() => handleSelect(id)}
            >
              {id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionSwitcher;
