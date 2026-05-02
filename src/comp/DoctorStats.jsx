import { Users, Activity, AlertTriangle, CheckCircle, ShieldAlert, Target } from 'lucide-react';

// // Isse apne Dashboard component ke header ke niche dalo
//  const DoctorStats = ({ historyData }) => {
//   // Logic to calculate stats from history
//   const totalPatients = historyData.length;
//   const highRisk = historyData.filter(h => h.riskLevel === 'High').length;
//   const lowRisk = historyData.filter(h => h.riskLevel === 'Low').length;

//   const stats = [
//     { label: "Total Encounters", value: totalPatients, icon: <Users size={20}/>, color: "text-indigo-400", bg: "bg-indigo-500/10" },
//     { label: "High Risk Cases", value: highRisk, icon: <AlertTriangle size={20}/>, color: "text-rose-400", bg: "bg-rose-500/10" },
//     { label: "Stable Patients", value: lowRisk, icon: <CheckCircle size={20}/>, color: "text-emerald-400", bg: "bg-emerald-500/10" },
//     { label: "AI Efficiency", value: "98%", icon: <Activity size={20}/>, color: "text-amber-400", bg: "bg-amber-500/10" },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//       {stats.map((stat, i) => (
//         <div key={i} className="bg-[#0f172a]/40 border border-white/5 backdrop-blur-md p-6 rounded-[1.8rem] hover:border-indigo-500/30 transition-all group">
//           <div className="flex items-center justify-between mb-4">
//             <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
//               {stat.icon}
//             </div>
//             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Sync</span>
//           </div>
//           <p className="text-2xl font-black text-white">{stat.value}</p>
//           <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-tighter">{stat.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// };







const DoctorStats = ({ historyData }) => {
    const totalVisits = historyData?.length || 0;
    const highRisk = historyData?.filter(rx => rx.riskLevel === 'High').length || 0;
    const lowRisk = historyData?.filter(rx => rx.riskLevel === 'Low').length || 0;
    
    const aiSuccessCount = historyData?.filter(rx => rx.aiSummary || rx.diagnosis).length || 0;
  const aiEfficiency = totalVisits > 0 
    ? Math.round((aiSuccessCount / totalVisits) * 100) 
    : 0;

    const stats = [
    { 
        label: "Total Visits", 
        value: totalVisits, 
      icon: <Users size={18}/>, 
      color: "text-indigo-400", 
      bg: "bg-indigo-500/10" 
    },
    { 
        label: "Critical Cases", 
        value: highRisk, 
        icon: <ShieldAlert size={18}/>, 
        color: "text-rose-400", 
        bg: "bg-rose-500/10" 
    },
    { 
      label: "Stable Patients", 
      value: lowRisk, 
      icon: <CheckCircle size={18}/>, 
      color: "text-emerald-400", 
      bg: "bg-emerald-500/10" 
    },
    { 
      label: "AI Efficiency", 
      value: `${aiEfficiency}%`, // <--- Ab yeh dynamic ho gaya!
      icon: <Target size={18}/>, 
      color: "text-amber-400", 
      bg: "bg-amber-500/10" 
    },
];

return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {stats.map((s, i) => (
        <div key={i} className="bg-[#0f172a]/40 border border-white/5 p-5 rounded-[1.8rem] backdrop-blur-md hover:border-white/10 transition-all group">
          <div className={`${s.bg} ${s.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
            {s.icon}
          </div>
          <p className="text-xl font-black text-white italic">{s.value}</p>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
        </div>
      ))}
    </div>
  );
};
  export default DoctorStats