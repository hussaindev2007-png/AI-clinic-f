// ye code sahi hye 




// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   Pill, 
//   Loader2, 
//   ChevronLeft, 
//   Activity, 
//   Clock, 
//   ArrowRight,
//   Zap
// } from 'lucide-react';
// import DoctorStats from '../comp/DoctorStats';

// export default function PatientHistory() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [historyData, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         // Fetching records (Prescription model recommended in backend)
//         const res = await API.get(`/doctor/patient-history/${id}`);
//         setHistory(res.data.history);
//       } catch (err) {
//         toast.error("Records fetch karne mein masla hua.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHistory();
//   }, [id]);

//   // UPDATED LOGIC: Supports both AI Raw and Doctor Edited formats
//   const cleanAiText = (text) => {
//     if (!text) return "No diagnosis recorded.";
    
//     // Check if it's the new formatted [DIAGNOSIS] style (Doctor Edited)
//     if (text.includes('[DIAGNOSIS]')) {
//       const parts = text.split(/\[RISK LEVEL\]|\[AI SUMMARY\]|\[SUGGESTED TESTS\]|\[MEDICATIONS\]|\[ADVICE\]/i);
//       let diagPart = parts[0].replace('[DIAGNOSIS]', '').trim();
//       return diagPart;
//     }
    
//     // Fallback for old AI Raw format
//     let clean = text.replace(/DIAGNOSIS AND INSIGHTS - |SUGGESTED MEDICATIONS|ADVICE - /gi, "").trim();
//     return clean.split(/SUGGESTED MEDICATIONS|ADVICE/i)[0].trim();
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-500" size={48} />
//       <p className="mt-4 text-indigo-300 font-mono text-[10px] tracking-[0.3em] uppercase">Loading Archives...</p>
//     </div>
//   );

//   return (


//     <div className="min-h-screen bg-[#080b14] text-slate-300 font-sans selection:bg-indigo-500/30">
//       <ToastContainer theme="dark" />
      
 
 

//       {/* Ambient Background Lights */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
//         <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full"></div>
//       </div>

//       <div className="max-w-4xl mx-auto p-5 md:p-10">
        
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
//           <div className="flex items-center gap-5">
//             <button 
//               onClick={() => navigate(-1)} 
//               className="h-11 w-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-all shadow-xl"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <div>
//               <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
//                 Patient <span className="text-indigo-500 not-italic">Logs</span>
//               </h1>
//               <div className="flex items-center gap-2 mt-0.5">
//                 <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
//                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Verified Timeline</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex bg-[#0f172a]/80 border border-white/5 p-1.5 rounded-xl backdrop-blur-xl">
//             <div className="px-5 py-1.5 text-center border-r border-white/5">
//               <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Visits</p>
//               <p className="text-lg font-black text-indigo-400">{historyData.length}</p>
//             </div>
//             <div className="px-5 py-1.5 text-center">
//               <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Last Visit</p>
//               <p className="text-[11px] font-black text-slate-300 mt-1 uppercase">
//                 {historyData[0] ? new Date(historyData[0].createdAt).toLocaleDateString('en-US', {month:'short', day:'numeric'}) : 'N/A'}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Timeline Content */}
//         <div className="relative space-y-10">
//           <div className="absolute left-0 md:left-[21px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500/40 via-white/5 to-transparent"></div>

//           {historyData.map((rx, index) => (
//             <div key={rx._id} className="relative pl-7 md:pl-16 group">
              
//               <div className="absolute left-[-4px] md:left-[14px] top-4 h-full flex flex-col items-center">
//                 <div className="h-4 w-4 rounded-full bg-[#080b14] border-2 border-indigo-500 group-hover:scale-110 group-hover:bg-indigo-500 transition-all duration-300 z-10 shadow-[0_0_10px_rgba(99,102,241,0.4)]"></div>
//               </div>

//               <div className="bg-[#0f172a]/40 border border-white/5 backdrop-blur-md rounded-[1.8rem] overflow-hidden hover:border-white/10 transition-all duration-300 shadow-xl">
                
//                 <div className="px-6 py-5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02]">
//                   <div className="flex items-center gap-3">
//                     <div className="h-9 w-9 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400">
//                       <Clock size={16} />
//                     </div>
//                     <div>
//                       <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Entry Date</p>
//                       <h3 className="text-[14px] font-black text-white italic">
//                         {new Date(rx.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
//                       </h3>
//                     </div>
//                   </div>
//                   <div className="bg-[#050505]/40 px-4 py-2 rounded-xl border border-white/5 inline-flex flex-col">
//                     <p className="text-[7px] font-black text-indigo-500 uppercase tracking-widest mb-0.5">Reported Symptoms</p>
//                     <p className="text-[12px] font-medium text-slate-300 italic">"{rx.symptoms}"</p>
//                   </div>
//                 </div>

//                 <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
//                   {/* Left: Diagnosis (The Edited/Cleaned Text) */}
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2">
//                       <Zap size={14} className="text-indigo-500" />
//                       <h4 className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Clinical Diagnosis</h4>
//                     </div>
                    
//                     <div className="bg-indigo-500/[0.03] p-5 rounded-2xl border border-indigo-500/10 min-h-[80px] flex items-center">
//                       <p className="text-sm text-indigo-100/80 leading-relaxed font-medium">
//                         {cleanAiText(rx.diagnosis)}
//                       </p>
//                     </div>

//                     {rx.advice && (
//                       <div className="p-4 bg-amber-500/[0.02] rounded-xl border border-amber-500/5">
//                         <div className="flex items-center gap-2 mb-2">
//                             <Activity size={14} className="text-amber-500" />
//                             <span className="text-amber-500 font-black uppercase text-[8px] tracking-widest italic">Lifestyle Advice</span>
//                         </div>
//                         <p className="text-[11px] text-slate-400 leading-relaxed italic line-clamp-3 hover:line-clamp-none transition-all">
//                           {rx.advice}
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   {/* Right: Prescriptions */}
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2">
//                       <Pill size={14} className="text-emerald-500" />
//                       <h4 className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Medication Plan</h4>
//                     </div>

//                     <div className="space-y-2.5">
//                       {rx.medicines?.length > 0 ? (
//                         rx.medicines.map((med, i) => (
//                           <div key={i} className="flex items-center justify-between p-3.5 bg-[#050505]/30 border border-white/5 rounded-xl hover:bg-white/[0.03] transition-all group/med">
//                             <div className="flex items-center gap-3">
//                               <div className="h-8 w-8 rounded-lg bg-emerald-500/5 flex items-center justify-center text-emerald-500 group-hover/med:bg-emerald-500 group-hover/med:text-white transition-all">
//                                 <ArrowRight size={12} />
//                               </div>
//                               <div>
//                                 <p className="text-[12px] font-black text-white uppercase tracking-tight">{med.name}</p>
//                                 <p className="text-[9px] font-bold text-slate-500 uppercase">{med.medType || 'Tablet'}</p>
//                               </div>
//                             </div>
//                             <div className="text-right flex flex-col items-end gap-1">
//                                 <span className="text-[9px] font-black px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md uppercase tracking-tighter">
//                                 {med.dosage}
//                                 </span>
//                                 <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">{med.duration}</p>
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="text-center py-8 border border-dashed border-white/5 rounded-2xl">
//                           <p className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">No medications prescribed</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




//ye uper wala code sahi hye 










// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   Pill, 
//   Loader2, 
//   ChevronLeft, 
//   Activity, 
//   Clock, 
//   ArrowRight,
//   Zap,
//   Users,
//   ShieldAlert,
//   Target,
//   CheckCircle,
//   AlertTriangle
// } from 'lucide-react';

// // --- DYNAMIC ANALYTICS COMPONENT ---
// const DoctorStats = ({ historyData }) => {
//   const totalVisits = historyData?.length || 0;
//   const highRisk = historyData?.filter(rx => rx.riskLevel === 'High').length || 0;
//   const lowRisk = historyData?.filter(rx => rx.riskLevel === 'Low' || rx.riskLevel === 'Stable').length || 0;
  
//   // Dynamic AI Efficiency Logic
//   const aiSuccessCount = historyData?.filter(rx => rx.diagnosis).length || 0;
//   const aiEfficiency = totalVisits > 0 
//     ? Math.round((aiSuccessCount / totalVisits) * 100) 
//     : 0;

//   const stats = [
//     { label: "Total Visits", value: totalVisits, icon: <Users size={20}/>, color: "text-indigo-400", bg: "bg-indigo-500/10" },
//     { label: "High Risk Cases", value: highRisk, icon: <AlertTriangle size={20}/>, color: "text-rose-400", bg: "bg-rose-500/10" },
//     { label: "Stable Patients", value: lowRisk, icon: <CheckCircle size={20}/>, color: "text-emerald-400", bg: "bg-emerald-500/10" },
//     { label: "AI Efficiency", value: `${aiEfficiency}%`, icon: <Activity size={20}/>, color: "text-amber-400", bg: "bg-amber-500/10" },
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
//           <p className="text-2xl font-black text-white italic">{stat.value}</p>
//           <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-tighter">{stat.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default function PatientHistory() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [historyData, setHistoryData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await API.get(`/doctor/patient-history/${id}`);
//         setHistoryData(res.data.history || []);
//       } catch (err) {
//         toast.error("Records fetch karne mein masla hua.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHistory();
//   }, [id]);

//   const cleanAiText = (text) => {
//     if (!text) return "No diagnosis recorded.";
//     if (text.includes('[DIAGNOSIS]')) {
//       const parts = text.split(/\[RISK LEVEL\]|\[AI SUMMARY\]|\[SUGGESTED TESTS\]|\[MEDICATIONS\]|\[ADVICE\]/i);
//       return parts[0].replace('[DIAGNOSIS]', '').trim();
//     }
//     let clean = text.replace(/DIAGNOSIS AND INSIGHTS - |SUGGESTED MEDICATIONS|ADVICE - /gi, "").trim();
//     return clean.split(/SUGGESTED MEDICATIONS|ADVICE/i)[0].trim();
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-500" size={48} />
//       <p className="mt-4 text-indigo-300 font-mono text-[10px] tracking-[0.3em] uppercase italic">Decrypting Archives...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#080b14] text-slate-300 font-sans selection:bg-indigo-500/30">
//       <ToastContainer theme="dark" />
      
//       {/* Ambient Background Lights */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
//         <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full"></div>
//       </div>

//       <div className="max-w-4xl mx-auto p-5 md:p-10">
        
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
//           <div className="flex items-center gap-5">
//             <button 
//               onClick={() => navigate(-1)} 
//               className="h-11 w-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-all shadow-xl"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <div>
//               <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
//                 Patient <span className="text-indigo-500 not-italic">Logs</span>
//               </h1>
//               <div className="flex items-center gap-2 mt-0.5">
//                 <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
//                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Verified Timeline</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex bg-[#0f172a]/80 border border-white/5 p-1.5 rounded-xl backdrop-blur-xl">
//             <div className="px-5 py-1.5 text-center border-r border-white/5">
//               <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Visits</p>
//               <p className="text-lg font-black text-indigo-400">{historyData.length}</p>
//             </div>
//             <div className="px-5 py-1.5 text-center">
//               <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Last Visit</p>
//               <p className="text-[11px] font-black text-slate-300 mt-1 uppercase">
//                 {historyData[0] ? new Date(historyData[0].createdAt).toLocaleDateString('en-US', {month:'short', day:'numeric'}) : 'N/A'}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Dynamic Stats Section */}
//         <DoctorStats historyData={historyData} />

//         {/* Timeline Content */}
//         <div className="relative space-y-10">
//           <div className="absolute left-0 md:left-[21px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500/40 via-white/5 to-transparent"></div>

//           {historyData.length > 0 ? historyData.map((rx) => (
//             <div key={rx._id} className="relative pl-7 md:pl-16 group">
//               <div className="absolute left-[-4px] md:left-[14px] top-4 h-full flex flex-col items-center">
//                 <div className="h-4 w-4 rounded-full bg-[#080b14] border-2 border-indigo-500 group-hover:scale-110 group-hover:bg-indigo-500 transition-all duration-300 z-10 shadow-[0_0_10px_rgba(99,102,241,0.4)]"></div>
//               </div>

//               <div className="bg-[#0f172a]/40 border border-white/5 backdrop-blur-md rounded-[1.8rem] overflow-hidden hover:border-white/10 transition-all duration-300 shadow-xl">
//                 <div className="px-6 py-5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02]">
//                   <div className="flex items-center gap-3">
//                     <div className="h-9 w-9 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400">
//                       <Clock size={16} />
//                     </div>
//                     <div>
//                       <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Entry Date</p>
//                       <h3 className="text-[14px] font-black text-white italic">
//                         {new Date(rx.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
//                       </h3>
//                     </div>
//                   </div>
//                   <div className="bg-[#050505]/40 px-4 py-2 rounded-xl border border-white/5 inline-flex flex-col">
//                     <p className="text-[7px] font-black text-indigo-500 uppercase tracking-widest mb-0.5">Reported Symptoms</p>
//                     <p className="text-[12px] font-medium text-slate-300 italic">"{rx.symptoms}"</p>
//                   </div>
//                 </div>

//                 <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2">
//                       <Zap size={14} className="text-indigo-500" />
//                       <h4 className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Clinical Diagnosis</h4>
//                     </div>
//                     <div className="bg-indigo-500/[0.03] p-5 rounded-2xl border border-indigo-500/10 min-h-[80px] flex items-center">
//                       <p className="text-sm text-indigo-100/80 leading-relaxed font-medium">{cleanAiText(rx.diagnosis)}</p>
//                     </div>
//                     {rx.advice && (
//                       <div className="p-4 bg-amber-500/[0.02] rounded-xl border border-amber-500/5">
//                         <div className="flex items-center gap-2 mb-2">
//                           <Activity size={14} className="text-amber-500" />
//                           <span className="text-amber-500 font-black uppercase text-[8px] tracking-widest italic">Lifestyle Advice</span>
//                         </div>
//                         <p className="text-[11px] text-slate-400 leading-relaxed italic">{rx.advice}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2">
//                       <Pill size={14} className="text-emerald-500" />
//                       <h4 className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Medication Plan</h4>
//                     </div>
//                     <div className="space-y-2.5">
//                       {rx.medicines?.length > 0 ? rx.medicines.map((med, i) => (
//                         <div key={i} className="flex items-center justify-between p-3.5 bg-[#050505]/30 border border-white/5 rounded-xl hover:bg-white/[0.03] transition-all group/med">
//                           <div className="flex items-center gap-3">
//                             <div className="h-8 w-8 rounded-lg bg-emerald-500/5 flex items-center justify-center text-emerald-500 group-hover/med:bg-emerald-500 group-hover/med:text-white transition-all"><ArrowRight size={12} /></div>
//                             <div>
//                               <p className="text-[12px] font-black text-white uppercase tracking-tight">{med.name}</p>
//                               <p className="text-[9px] font-bold text-slate-500 uppercase">{med.medType || 'Tablet'}</p>
//                             </div>
//                           </div>
//                           <div className="text-right flex flex-col items-end gap-1">
//                             <span className="text-[9px] font-black px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md uppercase tracking-tighter">{med.dosage}</span>
//                             <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">{med.duration}</p>
//                           </div>
//                         </div>
//                       )) : (
//                         <div className="text-center py-8 border border-dashed border-white/5 rounded-2xl">
//                           <p className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">No medications prescribed</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )) : (
//             <div className="text-center py-20 bg-[#0f172a]/20 rounded-[2.5rem] border border-dashed border-white/5">
//               <p className="text-slate-500 font-mono text-xs uppercase tracking-widest italic">No history found for this subject.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   Pill, Loader2, ChevronLeft, Activity, Clock, 
//   ArrowRight, Zap, Users, CheckCircle, AlertTriangle 
// } from 'lucide-react';

// // --- ADAPTIVE ANALYTICS COMPONENT ---
// const DoctorStats = ({ historyData }) => {
//   const totalVisits = historyData?.length || 0;
//   const highRisk = historyData?.filter(rx => rx.riskLevel === 'High').length || 0;
//   const lowRisk = historyData?.filter(rx => rx.riskLevel === 'Low' || rx.riskLevel === 'Stable').length || 0;
//   const aiSuccessCount = historyData?.filter(rx => rx.diagnosis).length || 0;
//   const aiEfficiency = totalVisits > 0 ? Math.round((aiSuccessCount / totalVisits) * 100) : 0;

//   const stats = [
//     { label: "Total Visits", value: totalVisits, icon: <Users size={20}/>, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
//     { label: "High Risk", value: highRisk, icon: <AlertTriangle size={20}/>, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10" },
//     { label: "Stable Cases", value: lowRisk, icon: <CheckCircle size={20}/>, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
//     { label: "AI Accuracy", value: `${aiEfficiency}%`, icon: <Activity size={20}/>, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
//   ];

//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
//       {stats.map((stat, i) => (
//         <div key={i} className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 p-5 rounded-3xl shadow-sm transition-all group">
//           <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
//             {stat.icon}
//           </div>
//           <p className="text-2xl font-black text-slate-900 dark:text-white italic">{stat.value}</p>
//           <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default function PatientHistory() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [historyData, setHistoryData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await API.get(`/doctor/patient-history/${id}`);
//         setHistoryData(res.data.history || []);
//       } catch (err) {
//         toast.error("Records sync failed.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHistory();
//   }, [id]);

//   const cleanAiText = (text) => {
//     if (!text) return "No diagnosis recorded.";
//     return text.replace(/\[DIAGNOSIS\]|DIAGNOSIS AND INSIGHTS - /gi, "").split(/\[RISK|SUGGESTED|ADVICE/i)[0].trim();
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex flex-col items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-600" size={48} />
//       <p className="mt-4 text-slate-400 font-black text-[10px] tracking-widest uppercase italic">Decrypting Archives...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] text-slate-900 dark:text-slate-300 font-sans transition-colors duration-500">
//       <ToastContainer theme="colored" />
      
//       {/* Background Decor */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 opacity-30 dark:opacity-100">
//         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
//       </div>

//       <div className="max-w-4xl mx-auto p-5 md:p-10">
        
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
//           <div className="flex items-center gap-5">
//             <button onClick={() => navigate(-1)} 
//               className="h-11 w-11 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm cursor-pointer">
//               <ChevronLeft size={20} />
//             </button>
//             <div>
//               <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic">
//                 Patient <span className="text-indigo-600 not-italic">Logs</span>
//               </h1>
//               <div className="flex items-center gap-2 mt-0.5">
//                 <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
//                 <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Verified Timeline</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex bg-white dark:bg-[#0f172a]/80 border border-slate-200 dark:border-white/5 p-1.5 rounded-2xl shadow-sm">
//             <div className="px-5 py-1.5 text-center border-r border-slate-100 dark:border-white/5">
//               <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Visits</p>
//               <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">{historyData.length}</p>
//             </div>
//             <div className="px-5 py-1.5 text-center">
//               <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Last Seen</p>
//               <p className="text-[11px] font-black text-slate-700 dark:text-slate-300 mt-1 uppercase">
//                 {historyData[0] ? new Date(historyData[0].createdAt).toLocaleDateString('en-US', {month:'short', day:'numeric'}) : 'N/A'}
//               </p>
//             </div>
//           </div>
//         </div>

//         <DoctorStats historyData={historyData} />

//         {/* TIMELINE */}
//         <div className="relative space-y-10">
//           <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-indigo-500/20"></div>

//           {historyData.length > 0 ? historyData.map((rx, index) => (
//             <div key={rx._id} className="relative pl-12 group animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
//               <div className="absolute left-[-2px] top-6 h-full flex flex-col items-center">
//                 <div className="h-[46px] w-[46px] rounded-2xl bg-white dark:bg-[#080b14] border-2 border-slate-200 dark:border-indigo-500 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white flex items-center justify-center transition-all duration-300 z-10 shadow-sm text-slate-400">
//                   <Clock size={18} />
//                 </div>
//               </div>

//               <div className="bg-white dark:bg-[#0f172a]/40 border border-slate-200 dark:border-white/5 backdrop-blur-md rounded-[2rem] overflow-hidden hover:border-indigo-200 dark:hover:border-white/10 transition-all shadow-sm">
//                 <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-white/[0.02]">
//                   <div>
//                     <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Entry Timestamp</p>
//                     <h3 className="text-[14px] font-black text-slate-800 dark:text-white italic uppercase">
//                       {new Date(rx.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
//                     </h3>
//                   </div>
//                   <div className="bg-indigo-50 dark:bg-[#050505]/40 px-4 py-2 rounded-xl border border-indigo-100 dark:border-white/5">
//                     <p className="text-[7px] font-black text-indigo-600 uppercase tracking-widest mb-0.5">Subject Symptoms</p>
//                     <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 italic">"{rx.symptoms}"</p>
//                   </div>
//                 </div>

//                 <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2">
//                       <Zap size={14} className="text-indigo-600 dark:text-indigo-500" />
//                       <h4 className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Clinical Diagnosis</h4>
//                     </div>
//                     <div className="bg-slate-50 dark:bg-indigo-500/[0.03] p-5 rounded-2xl border border-slate-100 dark:border-indigo-500/10">
//                       <p className="text-sm text-slate-700 dark:text-indigo-100/80 leading-relaxed font-medium">{cleanAiText(rx.diagnosis)}</p>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2">
//                       <Pill size={14} className="text-emerald-600 dark:text-emerald-500" />
//                       <h4 className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Prescribed Meds</h4>
//                     </div>
//                     <div className="space-y-2">
//                       {rx.medicines?.length > 0 ? rx.medicines.map((med, i) => (
//                         <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-[#050505]/30 border border-slate-100 dark:border-white/5 rounded-xl">
//                           <div className="flex items-center gap-3">
//                             <ArrowRight size={12} className="text-indigo-500" />
//                             <div>
//                               <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase">{med.name}</p>
//                               <p className="text-[8px] font-bold text-slate-400 uppercase">{med.medType || 'Tablet'}</p>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <span className="text-[8px] font-black px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-md uppercase">{med.dosage}</span>
//                             <p className="text-[8px] text-slate-400 mt-1 uppercase tracking-tighter">{med.duration}</p>
//                           </div>
//                         </div>
//                       )) : <p className="text-[9px] text-slate-400 italic text-center py-4 border border-dashed rounded-xl">No meds recorded</p>}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )) : (
//             <div className="text-center py-20 bg-white dark:bg-[#0f172a]/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/5">
//               <p className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Zero Records Found</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
















// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   Pill, Loader2, ChevronLeft, Activity, Clock, 
//   Zap, Users, CheckCircle, AlertTriangle, Sparkles, Stethoscope, Lightbulb
// } from 'lucide-react';

// // --- STATS COMPONENT ---
// const DoctorStats = ({ historyData }) => {
//   const totalVisits = historyData?.length || 0;
//   const highRisk = historyData?.filter(rx => rx.riskLevel === 'High').length || 0;
//   const stable = historyData?.filter(rx => rx.riskLevel !== 'High').length || 0;

//   const stats = [
//     { label: "Total Visits", value: totalVisits, icon: <Users size={18}/>, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
//     { label: "High Risk", value: highRisk, icon: <AlertTriangle size={18}/>, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-500/10" },
//     { label: "Stable Case", value: stable, icon: <CheckCircle size={18}/>, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
//     { label: "Status", value: "Verified", icon: <Activity size={18}/>, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-500/10" },
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
//       {stats.map((stat, i) => (
//         <div key={i} className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 rounded-2xl shadow-sm">
//           <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${stat.bg} ${stat.color}`}>{stat.icon}</div>
//           <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{stat.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default function PatientHistory() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [historyData, setHistoryData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const fetchHistory = async () => {
//   //     try {
//   //       const res = await API.get(`/doctor/patient-history/${id}`);
//   //       setHistoryData(res.data.history || []);
//   //     } catch (err) {
//   //       toast.error("Failed to sync records.");
//   //     } finally { setLoading(false); }
//   //   };
//   //   fetchHistory();
//   // }, [id]);









//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const role = localStorage.getItem('role')?.toLowerCase();
//         let endpoint = '';

//         // Agar patient hye toh patient dashboard se history laye
//         if (role === 'patient') {
//           endpoint = '/patients/my-dashboard';
//         } else {
//           // Agar Doctor/Admin/Receptionist hye toh doctor wale route se laye
//           endpoint = `/doctor/patient-history/${id}`;
//         }

//         const res = await API.get(endpoint);
        
//         // Data Extraction logic
//         // Kyunke patient route history 'prescriptions' key mein bhejta hye
//         const fetchedHistory = role === 'patient' 
//           ? res.data.data.prescriptions // Patient dashboard ke andar prescriptions array
//           : res.data.history;            // Doctor history endpoint ka structure

//         setHistoryData(fetchedHistory || []);

//       } catch (err) {
//         console.error("History Sync Error:", err);
//         toast.error("Failed to sync records.");
//       } finally { 
//         setLoading(false); 
//       }
//     };
    
//     if (id) fetchHistory();
//   }, [id]);
//   if (loading) return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex flex-col items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-600" size={40} />
//       <p className="mt-4 text-slate-400 font-bold text-[10px] tracking-widest uppercase italic">Decrypting Logs...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] text-slate-900 dark:text-slate-300 p-4 md:p-8">
//       <ToastContainer theme="dark" />
      
//       <div className="max-w-5xl mx-auto">
//         {/* HEADER */}
//         <div className="flex items-center gap-4 mb-8">
//           <button onClick={() => navigate(-1)} className="h-10 w-10 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
//             <ChevronLeft size={18} />
//           </button>
//           <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
//             Patient <span className="text-indigo-600 not-italic font-extrabold">Archive</span>
//           </h1>
//         </div>

//         <DoctorStats historyData={historyData} />

//         {/* TIMELINE CONTAINER */}
//         <div className="relative border-l-2 border-indigo-500/10 ml-4 md:ml-6 space-y-12 pb-10">
//           {historyData.length > 0 ? historyData.map((rx) => (
//             <div key={rx._id} className="relative pl-8 md:pl-12">
//               {/* Dot on line */}
//               <div className="absolute -left-[11px] top-6 h-5 w-5 rounded-full bg-indigo-600 border-4 border-slate-50 dark:border-[#080b14] z-10 shadow-sm"></div>

//               <div className="bg-white dark:bg-[#0f172a]/60 border border-slate-200 dark:border-white/5 rounded-[2rem] shadow-sm overflow-hidden">
//                 {/* Visit Header */}
//                 <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex flex-wrap justify-between items-center gap-3 bg-slate-50/50 dark:bg-white/[0.02]">
//                   <div>
//                     <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Date of Visit</span>
//                     <h3 className="text-sm font-bold text-slate-900 dark:text-white">{new Date(rx.createdAt).toDateString()}</h3>
//                   </div>
//                   <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${rx.riskLevel === 'High' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
//                     {rx.riskLevel || 'Low'} Risk Status
//                   </div>
//                 </div>

//                 <div className="p-6 md:p-8 space-y-10">
//                   {/* Diagnosis & Symptoms */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-3">
//                       <div className="flex items-center gap-2 text-indigo-600">
//                         <Zap size={15} />
//                         <h4 className="text-[10px] font-black uppercase tracking-widest">Medical Diagnosis</h4>
//                       </div>
//                       <div className="p-4 bg-indigo-500/[0.03] border border-indigo-500/10 rounded-2xl">
//                         <p className="text-base font-bold text-slate-800 dark:text-indigo-50 leading-tight">{rx.diagnosis}</p>
//                         <p className="text-xs text-slate-400 mt-2 italic font-medium">Recorded Symptoms: {rx.symptoms}</p>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <div className="flex items-center gap-2 text-amber-500">
//                         <Stethoscope size={15} />
//                         <h4 className="text-[10px] font-black uppercase tracking-widest">Laboratory Tests</h4>
//                       </div>
//                       <div className="flex flex-wrap gap-2">
//                         {Array.isArray(rx.suggestedTests) && rx.suggestedTests.length > 0 ? (
//                           rx.suggestedTests.map((test, i) => (
//                             <span key={i} className="px-3 py-1.5 bg-amber-500/5 border border-amber-500/10 text-amber-600 text-[10px] font-bold rounded-lg">
//                               {test}
//                             </span>
//                           ))
//                         ) : (
//                           <p className="text-[10px] text-slate-400 italic font-medium">No specialized tests required.</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Medicines Grid - Fixed Mismatch */}
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2 text-emerald-500">
//                       <Pill size={15} />
//                       <h4 className="text-[10px] font-black uppercase tracking-widest">Medication Plan</h4>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                       {rx.medicines?.map((med, i) => (
//                         <div key={i} className="flex flex-col h-full p-4 bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 rounded-2xl">
//                           <div className="flex justify-between items-start mb-2">
//                             <p className="text-xs font-bold text-slate-900 dark:text-white uppercase truncate pr-2">{med.name}</p>
//                             <span className="shrink-0 text-[8px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded font-black border border-emerald-500/20">{med.medType}</span>
//                           </div>
//                           <div className="mt-auto space-y-1">
//                             <div className="flex justify-between text-[10px]">
//                               <span className="text-slate-400">Dosage:</span>
//                               <span className="font-bold text-indigo-500 uppercase">{med.dosage}</span>
//                             </div>
//                             <div className="flex justify-between text-[10px]">
//                               <span className="text-slate-400">Duration:</span>
//                               <span className="text-slate-600 dark:text-slate-400">{med.duration}</span>
//                             </div>
//                           </div>
//                           {med.instruction && (
//                             <p className="mt-3 text-[9px] text-slate-500 italic border-t border-slate-200 dark:border-white/5 pt-2">
//                               {med.instruction}
//                             </p>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Advice & Summary - Bottom Section */}
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-white/10">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-sky-500">
//                         <Lightbulb size={14} />
//                         <h4 className="text-[10px] font-black uppercase tracking-widest">Advice</h4>
//                       </div>
//                       <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
//                         {rx.advice || "Standard medical follow-up recommended."}
//                       </p>
//                     </div>
//                     <div className="bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10">
//                       <div className="flex items-center gap-2 mb-2 text-indigo-500">
//                         <Sparkles size={14} />
//                         <h4 className="text-[10px] font-black uppercase tracking-widest italic">AI Insight</h4>
//                       </div>
//                       <p className="text-xs text-slate-600 dark:text-indigo-200/70 font-medium italic leading-snug">
//                         {rx.aiSummary ? `"${rx.aiSummary}"` : "History record verified by system."}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )) : (
//             <div className="text-center py-20">
//               <p className="text-slate-400 font-bold text-sm">No medical logs found for this patient.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




















































// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   Pill, Loader2, ChevronLeft, Activity, 
//   Zap, Users, CheckCircle, AlertTriangle, Sparkles, Stethoscope, Lightbulb
// } from 'lucide-react';

// // --- STATS COMPONENT ---
// const DoctorStats = ({ historyData }) => {
//   const totalVisits = historyData?.length || 0;
//   const highRisk = historyData?.filter(rx => rx.riskLevel === 'High').length || 0;
//   const stable = historyData?.filter(rx => rx.riskLevel !== 'High').length || 0;

//   const stats = [
//     { label: "Total Visits", value: totalVisits, icon: <Users size={18}/>, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
//     { label: "High Risk", value: highRisk, icon: <AlertTriangle size={18}/>, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-500/10" },
//     { label: "Stable Case", value: stable, icon: <CheckCircle size={18}/>, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
//     { label: "Status", value: "Verified", icon: <Activity size={18}/>, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-500/10" },
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
//       {stats.map((stat, i) => (
//         <div key={i} className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 rounded-2xl shadow-sm">
//           <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${stat.bg} ${stat.color}`}>{stat.icon}</div>
//           <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{stat.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default function PatientHistory() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [historyData, setHistoryData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         setLoading(true);
//         const role = localStorage.getItem('role')?.toLowerCase();
        
//         // 1. ENDPOINT SELECTION
//         let endpoint = (role === 'patient' || id === 'me') 
//           ? '/patients/my-dashboard' 
//           : `/doctor/patient-history/${id}`;

//         const res = await API.get(endpoint);
        
//         // 2. ROBUST DATA EXTRACTION
//         let finalHistory = [];
        
//         if (role === 'patient' || id === 'me') {
//           // Patient dashboard returns: { success: true, data: [ { prescriptions: [...] } ] }
//           const patientProfile = res.data?.data?.[0];
//           finalHistory = patientProfile?.prescriptions || [];
//         } else {
//           // Doctor history returns: { success: true, history: [...] }
//           finalHistory = res.data?.history || [];
//         }

//         // Sort by date (Newest first)
//         const sortedData = finalHistory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setHistoryData(sortedData);

//       } catch (err) {
//         console.error("History Sync Error:", err);
//         toast.error(err.response?.data?.message || "Failed to sync records.");
//       } finally { 
//         setLoading(false); 
//       }
//     };
    
//     // Check if we have an ID or if it's a patient session
//     if (id || localStorage.getItem('role')?.toLowerCase() === 'patient') {
//         fetchHistory();
//     }
//   }, [id]);

//   if (loading) return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex flex-col items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-600" size={40} />
//       <p className="mt-4 text-slate-400 font-bold text-[10px] tracking-widest uppercase italic">Decrypting Logs...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] text-slate-900 dark:text-slate-300 p-4 md:p-8">
//       <ToastContainer theme="dark" />
      
//       <div className="max-w-5xl mx-auto">
//         {/* HEADER */}
//         <div className="flex items-center gap-4 mb-8">
//           <button onClick={() => navigate(-1)} className="h-10 w-10 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
//             <ChevronLeft size={18} />
//           </button>
//           <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
//             Patient <span className="text-indigo-600 not-italic font-extrabold">Archive</span>
//           </h1>
//         </div>

//         <DoctorStats historyData={historyData} />

//         {/* TIMELINE CONTAINER */}
//         <div className="relative border-l-2 border-indigo-500/10 ml-4 md:ml-6 space-y-12 pb-10">
//           {historyData.length > 0 ? historyData.map((rx, index) => (
//             <div key={rx._id || index} className="relative pl-8 md:pl-12">
//               <div className="absolute -left-[11px] top-6 h-5 w-5 rounded-full bg-indigo-600 border-4 border-slate-50 dark:border-[#080b14] z-10 shadow-sm"></div>

//               <div className="bg-white dark:bg-[#0f172a]/60 border border-slate-200 dark:border-white/5 rounded-[2rem] shadow-sm overflow-hidden transition-all hover:border-indigo-500/30">
//                 <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex flex-wrap justify-between items-center gap-3 bg-slate-50/50 dark:bg-white/[0.02]">
//                   <div>
//                     <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Date of Visit</span>
//                     <h3 className="text-sm font-bold text-slate-900 dark:text-white">
//                         {rx.createdAt ? new Date(rx.createdAt).toDateString() : 'N/A'}
//                     </h3>
//                   </div>
//                   <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${rx.riskLevel === 'High' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
//                     {rx.riskLevel || 'Low'} Risk Status
//                   </div>
//                 </div>

//                 <div className="p-6 md:p-8 space-y-10">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-3">
//                       <div className="flex items-center gap-2 text-indigo-600">
//                         <Zap size={15} />
//                         <h4 className="text-[10px] font-black uppercase tracking-widest">Medical Diagnosis</h4>
//                       </div>
//                       <div className="p-4 bg-indigo-500/[0.03] border border-indigo-500/10 rounded-2xl">
//                         <p className="text-base font-bold text-slate-800 dark:text-indigo-50 leading-tight">{rx.diagnosis || "No Diagnosis Provided"}</p>
//                         <p className="text-xs text-slate-400 mt-2 italic font-medium">Recorded Symptoms: {rx.symptoms || "N/A"}</p>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <div className="flex items-center gap-2 text-amber-500">
//                         <Stethoscope size={15} />
//                         <h4 className="text-[10px] font-black uppercase tracking-widest">Laboratory Tests</h4>
//                       </div>
//                       <div className="flex flex-wrap gap-2">
//                         {Array.isArray(rx.suggestedTests) && rx.suggestedTests.length > 0 ? (
//                           rx.suggestedTests.map((test, i) => (
//                             <span key={i} className="px-3 py-1.5 bg-amber-500/5 border border-amber-500/10 text-amber-600 text-[10px] font-bold rounded-lg">
//                               {test}
//                             </span>
//                           ))
//                         ) : (
//                           <p className="text-[10px] text-slate-400 italic font-medium">No specialized tests required.</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2 text-emerald-500">
//                       <Pill size={15} />
//                       <h4 className="text-[10px] font-black uppercase tracking-widest">Medication Plan</h4>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                       {rx.medicines?.map((med, i) => (
//                         <div key={i} className="flex flex-col h-full p-4 bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 rounded-2xl">
//                           <div className="flex justify-between items-start mb-2">
//                             <p className="text-xs font-bold text-slate-900 dark:text-white uppercase truncate pr-2">{med.name}</p>
//                             <span className="shrink-0 text-[8px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded font-black border border-emerald-500/20">{med.medType}</span>
//                           </div>
//                           <div className="mt-auto space-y-1">
//                             <div className="flex justify-between text-[10px]">
//                               <span className="text-slate-400">Dosage:</span>
//                               <span className="font-bold text-indigo-500 uppercase">{med.dosage}</span>
//                             </div>
//                             <div className="flex justify-between text-[10px]">
//                               <span className="text-slate-400">Duration:</span>
//                               <span className="text-slate-600 dark:text-slate-400">{med.duration}</span>
//                             </div>
//                           </div>
//                           {med.instruction && (
//                             <p className="mt-3 text-[9px] text-slate-500 italic border-t border-slate-200 dark:border-white/5 pt-2">
//                               {med.instruction}
//                             </p>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-white/10">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-sky-500">
//                         <Lightbulb size={14} />
//                         <h4 className="text-[10px] font-black uppercase tracking-widest">Advice</h4>
//                       </div>
//                       <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
//                         {rx.advice || "Standard medical follow-up recommended."}
//                       </p>
//                     </div>
//                     <div className="bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10">
//                       <div className="flex items-center gap-2 mb-2 text-indigo-500">
//                         <Sparkles size={14} />
//                         <h4 className="text-[10px] font-black uppercase tracking-widest italic">AI Insight</h4>
//                       </div>
//                       <p className="text-xs text-slate-600 dark:text-indigo-200/70 font-medium italic leading-snug">
//                         {rx.aiSummary ? `"${rx.aiSummary}"` : "History record verified by system."}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )) : (
//             <div className="text-center py-20 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/5">
//               <p className="text-slate-400 font-bold text-sm uppercase tracking-widest italic">No medical logs found.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../util/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Pill, Loader2, ChevronLeft, Activity, 
  Zap, Users, CheckCircle, AlertTriangle, Sparkles, Stethoscope, Lightbulb
} from 'lucide-react';

// --- STATS COMPONENT ---
const DoctorStats = ({ historyData }) => {
  const totalVisits = historyData?.length || 0;
  const highRisk = historyData?.filter(rx => rx.riskLevel === 'High').length || 0;
  const stable = historyData?.filter(rx => rx.riskLevel !== 'High').length || 0;

  const stats = [
    { label: "Total Visits", value: totalVisits, icon: <Users size={18}/>, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
    { label: "High Risk", value: highRisk, icon: <AlertTriangle size={18}/>, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-500/10" },
    { label: "Stable Case", value: stable, icon: <CheckCircle size={18}/>, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Status", value: "Verified", icon: <Activity size={18}/>, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-500/10" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${stat.bg} ${stat.color}`}>{stat.icon}</div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default function PatientHistory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const role = localStorage.getItem('role')?.toLowerCase();
        
        let endpoint = (role === 'patient' || id === 'me') 
          ? '/patients/my-dashboard' 
          : `/doctor/patient-history/${id}`;

        const res = await API.get(endpoint);
        
        let finalHistory = [];
        
        if (role === 'patient' || id === 'me') {
          const patientProfile = res.data?.data?.[0];
          finalHistory = patientProfile?.prescriptions || [];
        } else {
          finalHistory = res.data?.history || [];
        }

        const sortedData = finalHistory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setHistoryData(sortedData);

      } catch (err) {
        console.error("History Sync Error:", err);
        toast.error(err.response?.data?.message || "Failed to sync records.");
      } finally { 
        setLoading(false); 
      }
    };
    
    if (id || localStorage.getItem('role')?.toLowerCase() === 'patient') {
        fetchHistory();
    }
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
      <p className="mt-4 text-slate-400 font-bold text-[10px] tracking-widest uppercase italic">Decrypting Logs...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] text-slate-900 dark:text-slate-300 p-4 md:p-8">
      <ToastContainer theme="dark" />
      
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="h-10 w-10 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm cursor-pointer active:scale-90"
          >
            <ChevronLeft size={18} />
          </button>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
            Patient <span className="text-indigo-600 not-italic font-extrabold">Archive</span>
          </h1>
        </div>

        <DoctorStats historyData={historyData} />

        {/* TIMELINE CONTAINER */}
        <div className="relative border-l-2 border-indigo-500/10 ml-4 md:ml-6 space-y-12 pb-10">
          {historyData.length > 0 ? historyData.map((rx, index) => (
            <div key={rx._id || index} className="relative pl-8 md:pl-12 group">
              {/* Timeline Indicator */}
              <div className="absolute -left-[11px] top-6 h-5 w-5 rounded-full bg-indigo-600 border-4 border-slate-50 dark:border-[#080b14] z-10 shadow-sm group-hover:scale-125 transition-transform"></div>

              <div className="bg-white dark:bg-[#0f172a]/60 border border-slate-200 dark:border-white/5 rounded-[2rem] shadow-sm overflow-hidden transition-all hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex flex-wrap justify-between items-center gap-3 bg-slate-50/50 dark:bg-white/[0.02]">
                  <div>
                    <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Date of Visit</span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {rx.createdAt ? new Date(rx.createdAt).toDateString() : 'N/A'}
                    </h3>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${rx.riskLevel === 'High' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                    {rx.riskLevel || 'Low'} Risk Status
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-indigo-600">
                        <Zap size={15} />
                        <h4 className="text-[10px] font-black uppercase tracking-widest">Medical Diagnosis</h4>
                      </div>
                      <div className="p-4 bg-indigo-500/[0.03] border border-indigo-500/10 rounded-2xl">
                        <p className="text-base font-bold text-slate-800 dark:text-indigo-50 leading-tight">{rx.diagnosis || "No Diagnosis Provided"}</p>
                        <p className="text-xs text-slate-400 mt-2 italic font-medium">Recorded Symptoms: {rx.symptoms || "N/A"}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-amber-500">
                        <Stethoscope size={15} />
                        <h4 className="text-[10px] font-black uppercase tracking-widest">Laboratory Tests</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(rx.suggestedTests) && rx.suggestedTests.length > 0 ? (
                          rx.suggestedTests.map((test, i) => (
                            <span key={i} className="px-3 py-1.5 bg-amber-500/5 border border-amber-500/10 text-amber-600 text-[10px] font-bold rounded-lg cursor-default">
                              {test}
                            </span>
                          ))
                        ) : (
                          <p className="text-[10px] text-slate-400 italic font-medium">No specialized tests required.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <Pill size={15} />
                      <h4 className="text-[10px] font-black uppercase tracking-widest">Medication Plan</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {rx.medicines?.map((med, i) => (
                        <div key={i} className="flex flex-col h-full p-4 bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 rounded-2xl hover:border-emerald-500/20 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-xs font-bold text-slate-900 dark:text-white uppercase truncate pr-2">{med.name}</p>
                            <span className="shrink-0 text-[8px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded font-black border border-emerald-500/20">{med.medType}</span>
                          </div>
                          <div className="mt-auto space-y-1">
                            <div className="flex justify-between text-[10px]">
                              <span className="text-slate-400">Dosage:</span>
                              <span className="font-bold text-indigo-500 uppercase">{med.dosage}</span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                              <span className="text-slate-400">Duration:</span>
                              <span className="text-slate-600 dark:text-slate-400">{med.duration}</span>
                            </div>
                          </div>
                          {med.instruction && (
                            <p className="mt-3 text-[9px] text-slate-500 italic border-t border-slate-200 dark:border-white/5 pt-2">
                              {med.instruction}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-white/10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sky-500">
                        <Lightbulb size={14} />
                        <h4 className="text-[10px] font-black uppercase tracking-widest">Advice</h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                        {rx.advice || "Standard medical follow-up recommended."}
                      </p>
                    </div>
                    <div className="bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10">
                      <div className="flex items-center gap-2 mb-2 text-indigo-500">
                        <Sparkles size={14} />
                        <h4 className="text-[10px] font-black uppercase tracking-widest italic">AI Insight</h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-indigo-200/70 font-medium italic leading-snug">
                        {rx.aiSummary ? `"${rx.aiSummary}"` : "History record verified by system."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/5">
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest italic">No medical logs found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}