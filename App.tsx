
import React from "react";
import { Calendar, CheckSquare, Sparkles, Send, Briefcase, Layers, Mail, CalendarClock, Share2, FileText, Search } from "lucide-react";

const App = () => {
  return (
    <div className="flex min-h-screen bg-[#0B1D2D] text-white font-sans text-sm">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0E2940] p-5 space-y-6 text-white border-r border-[#1C3A52]">
        <div className="flex items-center gap-3 text-xl font-medium">
          <span className="text-lg font-medium">J.P.Morgan AI Assistant</span>
        </div>
        <nav className="space-y-4 text-base mt-4">
          <div className="flex items-center gap-2 hover:text-blue-300"><Briefcase size={18} /> Opportunities</div>
          <div className="flex items-center gap-2 hover:text-blue-300"><Layers size={18} /> Portfolio</div>
          <div className="flex items-center gap-2 hover:text-blue-300"><Mail size={18} /> Email</div>
          <div className="flex items-center gap-2 hover:text-blue-300"><CalendarClock size={18} /> Meeting</div>
          <div className="flex items-center gap-2 hover:text-blue-300"><Share2 size={18} /> Interactions</div>
          <div className="flex items-center gap-2 hover:text-blue-300"><FileText size={18} /> Document</div>
          <div className="flex items-center gap-2 hover:text-blue-300"><Search size={18} /> Research</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-semibold mb-6">Welcome, John</h1>
        <div className="bg-[#0F2C44] rounded-xl p-6 border border-[#1E3D55] shadow-md">
          <h2 className="text-xl font-bold mb-4">How can I assist you today</h2>
          <div className="relative">
            <input
              className="w-full p-3 pr-10 rounded-lg bg-[#12283C] text-white border border-[#2B4C66] focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Type your message here..."
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-200">
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="w-80 bg-[#0E2940] p-6 space-y-6 border-l border-[#1C3A52]">
        <div>
          <h3 className="text-md font-semibold mb-2 flex items-center gap-1"><Calendar size={16} /> Today's Calendar</h3>
          <ul className="text-sm space-y-1 text-[#D9E3EA]">
            <li>10:00 AM - Client A QBR</li>
            <li>1:00 PM - Internal Loan Review</li>
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2 flex items-center gap-1"><CheckSquare size={16} /> To-Do List</h3>
          <ul className="text-sm space-y-1 text-[#D9E3EA]">
            <li><input type="checkbox" defaultChecked className="mr-2" /> Call Client B about renewal</li>
            <li><input type="checkbox" className="mr-2" /> Email Client A treasury in</li>
            <li><input type="checkbox" className="mr-2" /> Follow up on loan terms</li>
            <li><input type="checkbox" className="mr-2" /> Schedule treasury pitch for next week</li>
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2 flex items-center gap-1"><Sparkles size={16} /> Smart Recommendations</h3>
          <ul className="text-sm space-y-1 text-[#D9E3EA]">
            <li>Product: Recommend LOC to Client C</li>
            <li>Meetings: Invite Client B next week</li>
            <li>Content: Share ESG case study</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default App;
