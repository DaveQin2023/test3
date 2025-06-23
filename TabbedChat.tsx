
// src/components/TabbedChat.tsx
import { useState } from "react";

interface ChatTab {
  id: number;
  name: string;
  messages: string[];
}

export default function TabbedChat() {
  const [tabs, setTabs] = useState<ChatTab[]>([
    { id: 1, name: "New Chat", messages: [] },
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [input, setInput] = useState("");

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  const sendMessage = () => {
    if (!input.trim()) return;
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId
          ? { ...tab, messages: [...tab.messages, `You: ${input}`] }
          : tab
      )
    );
    setInput("");
  };

  const addNewTab = () => {
    const newId = Math.max(...tabs.map((t) => t.id)) + 1;
    setTabs([...tabs, { id: newId, name: `Chat ${newId}`, messages: [] }]);
    setActiveTabId(newId);
  };

  const closeTab = (id: number) => {
    const filteredTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(filteredTabs);
    if (activeTabId === id && filteredTabs.length > 0) {
      setActiveTabId(filteredTabs[0].id);
    }
  };

  return (
    <div className="p-4 w-full max-w-4xl mx-auto">
      {/* Tab Bar */}
      <div className="flex space-x-2 border-b pb-2 mb-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`px-3 py-1 rounded-t cursor-pointer ${
              activeTabId === tab.id ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.name}
            <button
              className="ml-2 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={addNewTab}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          +
        </button>
      </div>

      {/* Messages */}
      <div className="border p-4 rounded h-60 overflow-y-auto bg-white">
        {activeTab?.messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            {msg}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="mt-4 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
