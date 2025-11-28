
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';
import { Zap, Users, CreditCard } from 'lucide-react';

const data = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 30 },
  { name: 'Wed', value: 20 },
  { name: 'Thu', value: 27 },
  { name: 'Fri', value: 18 },
  { name: 'Sat', value: 23 },
  { name: 'Sun', value: 34 },
];

const DashboardMockup: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-6 shadow-2xl w-full max-w-lg relative z-10 transform transition-all hover:scale-[1.01] duration-500 border-t border-white/60">
      {/* Header Dots */}
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/50 p-4 rounded-xl border border-white/60 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
              <Zap size={16} />
            </div>
            <span className="text-xs font-semibold text-slate-500">Avg. Response</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">2.4s</div>
        </div>
        <div className="bg-white/50 p-4 rounded-xl border border-white/60 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-sky-100 rounded-lg text-sky-600">
              <Users size={16} />
            </div>
            <span className="text-xs font-semibold text-slate-500">User Growth</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">+145%</div>
        </div>
      </div>

      {/* Notification Pill */}
      <div className="absolute -left-12 top-1/3 glass-panel p-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce cursor-pointer hover:bg-white transition-colors">
        <div className="p-2 bg-green-100 rounded-full text-green-600">
          <CreditCard size={20} />
        </div>
        <div>
          <div className="text-xs text-slate-500">Subscription Active</div>
          <div className="text-sm font-bold text-slate-800">Plan Renewed</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
             <Tooltip 
              cursor={{fill: 'rgba(0,0,0,0.05)'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardMockup;