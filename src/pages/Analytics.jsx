import { useState, useEffect } from 'react';
import API from '../util/api';
import { Users, UserRound, Activity, Loader2, TrendingUp, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, YAxis } from 'recharts';
import { toast, ToastContainer } from 'react-toastify';

export default function Analytics() {
  const [stats, setStats] = useState({ doctors: 0, patients: 0, staff: 0, trends: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/admin/stats');
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error("Frontend Fetch Error:", err);
        toast.error("Data load nahi ho saka.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#020617]">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={50} />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Syncing Systems...</p>
    </div>
  );

  const statCards = [
    { label: 'Doctors', value: stats.doctors, icon: <UserRound />, color: 'bg-blue-600', shadow: 'shadow-blue-500/10' },
    { label: 'Patients', value: stats.patients, icon: <Users />, color: 'bg-emerald-600', shadow: 'shadow-emerald-500/10' },
    { label: 'Staff', value: stats.staff, icon: <Activity />, color: 'bg-amber-600', shadow: 'shadow-amber-500/10' },
  ];

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-50 dark:bg-[#020617] selection:bg-blue-500/30">
      <ToastContainer theme="dark" />
      
     
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter">
            System <span className="text-blue-600">Analytics</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">Real-time Data Stream</p>
        </div>
        <div className="hidden md:flex gap-2">
           <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></div>
           <div className="h-2 w-2 rounded-full bg-blue-600/40"></div>
        </div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCards.map((card, i) => (
          <div 
            key={i} 
            className={`group bg-white dark:bg-[#0f172a] p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${card.shadow} cursor-pointer active:scale-95`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`h-14 w-14 ${card.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                {card.icon}
              </div>
              <ChevronRight className="text-slate-800 dark:text-slate-600 group-hover:translate-x-1 transition-transform" size={18} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{card.label}</p>
            <h3 className="text-6xl font-black dark:text-white italic tracking-tighter group-hover:text-blue-500 transition-colors">
              {card.value.toLocaleString()}
            </h3>
          </div>
        ))}
      </div>

     
      <div className="bg-white dark:bg-[#0f172a] p-8 md:p-12 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
       
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10 group-hover:bg-blue-600/10 transition-all"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <h4 className="text-xl font-black dark:text-white uppercase italic flex items-center gap-3">
            <TrendingUp className="text-blue-600 animate-bounce" /> 
            Patient Flow Trends
          </h4>
          <div className="flex gap-2">
            <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-black uppercase text-slate-500 tracking-widest">Last 7 Days</span>
          </div>
        </div>
        
        <div className="h-[350px] w-full cursor-crosshair">
          {stats.trends.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.trends}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={1} />
                    <stop offset="100%" stopColor="#1e40af" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 10, fontWeight: 'bold'}} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#ffffff05', radius: 10}}
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '20px',
                    padding: '15px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                  }}
                  itemStyle={{ color: '#fff', fontWeight: '900', textTransform: 'uppercase', fontSize: '12px' }}
                />
                <Bar 
                  dataKey="patients" 
                  fill="url(#barGradient)" 
                  radius={[10, 10, 0, 0]} 
                  barSize={50} 
                  className="transition-all duration-500 hover:opacity-80"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[2rem] bg-slate-50/50 dark:bg-white/[0.01]">
              <Activity size={40} className="text-slate-300 dark:text-white/5 mb-4" />
              <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] text-center">
                Insufficient Data Clusters <br/> 
                <span className="text-blue-500 italic opacity-80 mt-2 block">Awaiting system input...</span>
              </p>
            </div>
          )}
        </div>
      </div>
      
     
      <div className="mt-8 text-center">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.5em] opacity-40 italic">
          Neural Analytics Engine v3.0 — Secure Link Established
        </p>
      </div>
    </div>
  );
}
