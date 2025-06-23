
import { useState } from 'react';

const StatsPanel = () => {
  const [showFollowups, setShowFollowups] = useState(false);

  return (
    <>
      <ul className='text-lg space-y-2 text-white'>
        <li>
          • <button
              onClick={() => setShowFollowups(true)}
              className="text-white hover:text-blue-400 transition-colors duration-200"
            >
            You have 3 follow-ups due today
          </button>
        </li>
        <li>• 2 unread client replies.</li>
        <li>• 1 deal needs attention.</li>
        <li>• Latest campaign open rate: 42%.</li>
      </ul>

      {showFollowups && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#1f2937] rounded-2xl shadow-xl p-6 max-w-sm w-full animate-slide-in text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">🔔 Follow-ups Due</h2>
              <button onClick={() => setShowFollowups(false)} className="text-gray-300 hover:text-white text-xl">×</button>
            </div>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Need to call customer A</li>
              <li>Need to contact customer B</li>
              <li>Need to email to loan officer</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default StatsPanel;
