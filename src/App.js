import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./App.css";

const engagementData = [
  { day: "Mon", score: 78 },
  { day: "Tue", score: 82 },
  { day: "Wed", score: 76 },
  { day: "Thu", score: 85 },
  { day: "Fri", score: 80 },
];

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dialog, setDialog] = useState(null);

  const handleTabClick = (tab) => setActiveTab(tab);
  const handleDialog = (type) => setDialog(type);
  const closeDialog = () => setDialog(null);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Employee HR Portal</h1>

      {/* Tabs Navigation */}
      <div className="bg-white shadow-md mb-4 flex rounded-md">
        {["dashboard", "learning", "wellness", "compensation"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium capitalize ${
              activeTab === tab ? "bg-blue-100 text-blue-700" : "text-gray-700"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dashboard Content */}
      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Engagement Score</h2>
            <p className="text-4xl font-bold text-green-600">82%</p>
            <p className="text-sm text-gray-500 mt-1">AI-generated score based on feedback and activity</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Weekly Engagement Trend</h2>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={engagementData}>
                <XAxis dataKey="day" stroke="#555" />
                <YAxis stroke="#555" />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Learning Content */}
      {activeTab === "learning" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Learning Progress</h2>
          <p className="mb-2">AI-Powered Healthcare Training</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full" style={{ width: "70%" }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">70% completed</p>
          <button 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" 
            onClick={() => handleDialog("learning")}
          >
            Continue Learning
          </button>
          <p className="mt-3 text-sm text-gray-600">Access new modules and track certifications completed this month.</p>
        </div>
      )}

      {/* Wellness Content */}
      {activeTab === "wellness" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Wellness Insight</h2>
          <p className="text-yellow-600">
            You've worked multiple night shifts. Consider scheduling a wellness day.
          </p>
          <button 
            className="mt-3 border border-gray-300 bg-white px-4 py-2 rounded hover:bg-gray-50"
            onClick={() => handleDialog("leave")}
          >
            Request Leave
          </button>
          <p className="mt-3 text-sm text-gray-600">Your sleep balance and step count have decreased this week. Personalized tips are available.</p>
        </div>
      )}

      {/* Compensation Content */}
      {activeTab === "compensation" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Compensation Overview</h2>
          <ul className="text-sm space-y-2">
            <li><span className="font-semibold">Base Salary:</span> ₹60,000/month</li>
            <li><span className="font-semibold">Performance Bonus:</span> ₹5,000</li>
            <li><span className="font-semibold">Wellness Bonus:</span> ₹2,000</li>
          </ul>
          <button 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => handleDialog("payslip")}
          >
            View Detailed Payslip
          </button>
          <p className="mt-3 text-sm text-gray-600">Bonus and perks are updated quarterly based on AI-driven performance reviews.</p>
        </div>
      )}

      {/* Dialog/Modal */}
      {dialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={closeDialog}>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">
              {dialog === "payslip" && "Payslip Details"}
              {dialog === "leave" && "Leave Request"}
              {dialog === "learning" && "Learning Modules"}
            </h3>
            
            {dialog === "payslip" && (
              <div className="space-y-2">
                <p><strong>Month:</strong> March 2025</p>
                <p><strong>Base:</strong> ₹60,000</p>
                <p><strong>Bonus:</strong> ₹7,000</p>
                <p><strong>Deductions:</strong> ₹2,000</p>
                <p><strong>Net Pay:</strong> ₹65,000</p>
              </div>
            )}
            
            {dialog === "leave" && (
              <form className="space-y-3">
                <input type="text" placeholder="Reason for leave" className="w-full border px-3 py-2 rounded-md" />
                <input type="date" className="w-full border px-3 py-2 rounded-md" />
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={(e) => { e.preventDefault(); alert("Leave Requested"); closeDialog(); }}
                >
                  Submit Request
                </button>
              </form>
            )}
            
            {dialog === "learning" && (
              <ul className="list-disc pl-5 space-y-1">
                <li>Effective Patient Communication</li>
                <li>Digital Records Management</li>
                <li>First Aid Refresher</li>
                <li>AI in Modern Healthcare</li>
              </ul>
            )}
            
            <button 
              className="mt-4 border border-gray-300 px-3 py-1 rounded text-sm"
              onClick={closeDialog}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;