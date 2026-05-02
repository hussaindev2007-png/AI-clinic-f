// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// // --- Toastify Imports ---
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // --- Icons ---
// import { Edit3, Trash2, User, Search, Plus, Activity, Loader2, History } from 'lucide-react';

// export default function Dashboard() {
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role')?.toLowerCase();

//   const toastOptions = { theme: "light", position: "top-right", autoClose: 3000 };

//   const fetchPatients = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get('/patients/all');
//       const data = res.data?.data || res.data;
//       setPatients(Array.isArray(data) ? data : []);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         toast.error("Session Expired. Please Login Again.", toastOptions);
//         navigate('/');
//       } else {
//         toast.error("Database Synchronization Failed!", toastOptions);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchPatients(); }, [navigate]);

//   const handleDelete = async (id) => {
//     if (window.confirm("CRITICAL: Permanently delete this clinical record?")) {
//       const loadingToast = toast.loading("Processing Deletion...", { theme: "light" });
//       try {
//         await API.delete(`/patients/delete/${id}`);
//         setPatients(patients.filter(p => p._id !== id));
//         toast.update(loadingToast, {
//           render: "Record Permanently Deleted!",
//           type: "success", isLoading: false, autoClose: 3000, theme: "light"
//         });
//       } catch (err) {
//         toast.update(loadingToast, {
//           render: "Denied: Only Admins can delete records.",
//           type: "error", isLoading: false, autoClose: 3000, theme: "light"
//         });
//       }
//     }
//   };

//   const filteredPatients = patients.filter(p =>
//     p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone?.includes(searchTerm)
//   );

//   return (
//     <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans">
//       <ToastContainer theme="light" />

//       {/* --- PREMIUM NAVBAR --- */}
//       <div className="bg-white shadow-sm p-5 flex justify-between items-center px-6 md:px-14 border-b sticky top-0 z-20">
//         <div className="flex items-center gap-3">
//           <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-100">
//             <Activity size={24} />
//           </div>
//           <h1 className="text-2xl font-black text-slate-800 italic tracking-tighter uppercase">CLINIC <span className="text-blue-600">OS</span></h1>
//         </div>
//         <div className="flex items-center gap-6">
//           <span className="bg-indigo-50 text-indigo-600 px-5 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] border border-indigo-100 shadow-sm">
//             {role || 'Staff'}
//           </span>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-6 md:p-12">
//         {/* --- HEADER SECTION --- */}
//         <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-8">
//           <div>
//             <h2 className="text-5xl font-black text-slate-900 tracking-tight italic uppercase">
//               Patient <span className="text-blue-600 underline decoration-blue-100 underline-offset-8">Records</span>
//             </h2>
//             <div className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-4 flex items-center gap-2">
//               <div className="h-1 w-6 bg-blue-600 rounded-full"></div> Total Archives: {patients.length}
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
//             <div className="relative group">
//               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
//               <input
//                 type="text" placeholder="Search Database..."
//                 className="pl-14 pr-6 py-5 rounded-[1.8rem] border-2 border-slate-100 outline-none focus:border-blue-500 w-full md:w-96 shadow-xl shadow-slate-200/40 bg-white font-bold text-slate-700 transition-all"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             {(role === 'admin' || role === 'receptionist') && (
//               <button onClick={() => navigate('/add-patient')} className="bg-blue-600 text-white px-10 py-5 rounded-[1.8rem] font-black shadow-2xl shadow-blue-200 hover:bg-slate-900 flex items-center justify-center gap-3 transition-all active:scale-95 group">
//                 <Plus size={22} className="group-hover:rotate-90 transition-transform" /> REGISTER NEW
//               </button>
//             )}
//           </div>
//         </div>

//         {/* --- MAIN CONTENT AREA --- */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-40 gap-6">
//             <Loader2 className="animate-spin text-blue-600" size={50} />
//             <p className="font-black text-slate-300 uppercase tracking-[0.5em] text-[10px]">Synchronizing Secure Nodes</p>
//           </div>
//         ) : (
//           <div className="grid gap-5">
//             {filteredPatients.length > 0 ? filteredPatients.map((p, index) => (

//               /* --- REFINED SINGLE LINE CARD --- */
//               <div key={p._id}
//                 className="bg-white p-5 md:p-7 rounded-[3rem] shadow-sm border border-slate-50 flex flex-col md:flex-row items-center justify-between hover:shadow-2xl hover:shadow-blue-100/50 hover:border-blue-100 transition-all group animate-in fade-in slide-in-from-bottom-4"
//                 style={{ animationDelay: `${index * 50}ms` }}
//               >

//                 {/* Left: Info Section */}
//                 <div className="flex items-center gap-6 flex-1 min-w-0 mb-4 md:mb-0">
//                   <div className="h-16 w-16 md:h-20 md:w-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner shrink-0 border border-slate-100">
//                     <User size={32} />
//                   </div>

//                   <div className="min-w-0 pr-8 md:pr-12">
//                     <h3 className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-tighter italic truncate">
//                       {p.name}
//                     </h3>
//                     <div className="flex flex-wrap items-center gap-4 mt-2">
//                       <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest shrink-0 italic">
//                         {p.age} YEAR • {p.gender}
//                       </span>
//                       <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest bg-blue-50/50 px-3 py-1 rounded-lg border border-blue-50 shrink-0 shadow-sm">
//                         {p.phone}
//                       </span>
//                     </div>
//                     <div className="mt-3 text-[#00a37e] text-[10px] font-black bg-[#f0fdf9] w-fit px-4 py-2 rounded-xl uppercase tracking-[0.15em] border border-[#ccfbf1] flex items-center gap-2 shadow-sm">
//                       <div className="h-2 w-2 bg-[#00c897] rounded-full animate-pulse"></div>
//                       {p.disease || "No Active Case"}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right: Actions Section (Clear Gap & Alignment) */}
//                 <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0">
//                   {role === 'doctor' && (
//                     <button
//                       onClick={() => navigate(`/prescribe/${p._id}`)}
//                       className="bg-[#00c897] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.1em] hover:bg-slate-900 shadow-xl shadow-emerald-100 transition-all active:scale-95 whitespace-nowrap"
//                     >
//                       WRITE RX
//                     </button>
//                   )}

//                   <div className="flex items-center gap-2">
//                     {(role === 'doctor' || role === 'admin') && (
//                       <button onClick={() => navigate(`/edit-patient/${p._id}`)}
//                         className="p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100">
//                         <Edit3 size={18} />
//                       </button>
//                     )}

//                     {role === 'admin' && (
//                       <button onClick={() => handleDelete(p._id)}
//                         className="p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100">
//                         <Trash2 size={18} />
//                       </button>
//                     )}
//                   </div>

//                   <button
//                     onClick={() => navigate(`/history/${p._id}`)}
//                     className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl whitespace-nowrap"
//                   >
//                     HISTORY
//                   </button>
//                 </div>
//               </div>
//               /* --- END OF CARD --- */

//             )) : (
//               <div className="text-center py-24 bg-white rounded-[4rem] border-4 border-dashed border-slate-50">
//                 <Activity size={60} className="mx-auto text-slate-100 mb-6" />
//                 <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-xs italic">Zero Clinical Matches Found</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <footer className="mt-10 text-center opacity-30 py-10">
//         <p className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-400 italic">Clinic OS • Clinical Intelligence Interface</p>
//       </footer>
//     </div>
//   );
// }



























// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   Edit3, Trash2, User, Search, Plus, Activity, 
//   Loader2, ArrowRight, Sun, Moon, X 
// } from 'lucide-react';

// export default function Dashboard() {
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role')?.toLowerCase();

//   // --- Theme Management ---
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   const fetchPatients = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get('/patients/all');
//       const data = res.data?.data || res.data;
//       setPatients(Array.isArray(data) ? data : []);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         toast.error("Session Expired.", { theme: darkMode ? "dark" : "light" });
//         navigate('/');
//       } else {
//         toast.error("Sync Failed!", { theme: darkMode ? "dark" : "light" });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchPatients(); }, [navigate]);

//   const handleDelete = async (id) => {
//     if (window.confirm("Permanently delete this record?")) {
//       try {
//         await API.delete(`/patients/delete/${id}`);
//         setPatients(patients.filter(p => p._id !== id));
//         toast.success("Record Deleted!", { theme: darkMode ? "dark" : "light" });
//       } catch (err) {
//         toast.error("Delete Failed!", { theme: darkMode ? "dark" : "light" });
//       }
//     }
//   };

//   const filteredPatients = patients.filter(p =>
//     p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone?.includes(searchTerm)
//   );

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pb-20 font-sans transition-colors duration-500 overflow-x-hidden">
//       <ToastContainer theme={darkMode ? "dark" : "light"} />

//       {/* --- STICKY NAVBAR --- */}
//       <nav className="h-24 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-between px-6 md:px-14 border-b dark:border-white/5 sticky top-0 z-50">
//         <div className="flex items-center gap-4">
//           <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-xl shadow-blue-500/30">
//             <Activity size={28} strokeWidth={2.5} />
//           </div>
//           <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase">
//             CLINIC <span className="text-blue-600">OS</span>
//           </h1>
//         </div>

//         <div className="flex items-center gap-5">
//           <button 
//             onClick={() => setDarkMode(!darkMode)}
//             className="p-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-yellow-400 rounded-2xl hover:scale-110 transition-all"
//           >
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//           <div className="hidden sm:block px-6 py-2 bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl text-[12px] font-black uppercase tracking-widest border border-blue-500/20">
//             {role || 'User'}
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-[1400px] mx-auto p-6 md:p-12 lg:p-16">
        
//         {/* --- HERO & SEARCH SECTION --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
//           <div className="space-y-4">
//             <h2 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-[0.85]">
//               PATIENT <br />
//               <span className="text-blue-600 underline decoration-blue-500/10 underline-offset-[12px]">DATABASE</span>
//             </h2>
//             <div className="h-1.5 w-32 bg-blue-600 rounded-full mb-4"></div>
//             <p className="text-slate-400 dark:text-slate-500 font-bold text-sm uppercase tracking-[0.4em]">
//               {filteredPatients.length} ACTIVE RECORDS MATCHED
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 w-full">
//             {/* --- REFINED SEARCH BAR --- */}
//             <div className="relative group flex-1">
//               <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
//                 <Search size={24} strokeWidth={2.5} />
//               </div>
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search by name, ID or phone..."
//                 className="w-full pl-16 pr-14 py-6 rounded-[2rem] border-none bg-white dark:bg-[#0f172a] text-slate-800 dark:text-white text-lg font-bold outline-none ring-1 ring-slate-100 dark:ring-white/5 focus:ring-4 focus:ring-blue-500/20 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
//               />
//               {searchTerm && (
//                 <button 
//                   onClick={() => setSearchTerm('')}
//                   className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors"
//                 >
//                   <X size={20} />
//                 </button>
//               )}
//             </div>

//             {(role === 'admin' || role === 'receptionist') && (
//               <button onClick={() => navigate('/add-patient')} className="bg-blue-600 text-white px-10 py-6 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-slate-900 dark:hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/30 active:scale-95 whitespace-nowrap">
//                 <Plus size={24} strokeWidth={3} /> REGISTER
//               </button>
//             )}
//           </div>
//         </div>

//         {/* --- CONTENT AREA --- */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-40 gap-6">
//             <div className="relative">
//               <Loader2 className="animate-spin text-blue-600" size={64} strokeWidth={1.5} />
//               <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600/30" size={24} />
//             </div>
//             <span className="text-[12px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] animate-pulse">Accessing Secure Database</span>
//           </div>
//         ) : (
//           <div className="grid gap-6">
//             {filteredPatients.length > 0 ? filteredPatients.map((p) => (
              
//               <div key={p._id} className="group bg-white dark:bg-[#0f172a]/40 p-5 md:p-8 rounded-[3rem] border border-slate-100 dark:border-white/5 flex flex-col xl:flex-row items-center justify-between hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-blue-500/5 hover:border-blue-400/50 dark:hover:border-blue-500/30 transition-all duration-500 group">
                
//                 {/* User Info */}
//                 <div className="flex items-center gap-8 w-full flex-1">
//                   <div className="h-20 w-20 md:h-24 md:w-24 bg-slate-50 dark:bg-black/40 rounded-[2rem] flex items-center justify-center text-slate-300 dark:text-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 border border-slate-100 dark:border-white/5 shrink-0 shadow-inner">
//                     <User size={40} strokeWidth={1.5} />
//                   </div>
//                   <div className="min-w-0">
//                     <h3 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter truncate leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                       {p.name}
//                     </h3>
//                     <div className="flex flex-wrap items-center gap-4 mt-2">
//                       <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest">{p.age} YRS • {p.gender}</span>
//                       <span className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.15em] px-4 py-1.5 bg-blue-50 dark:bg-blue-500/10 rounded-full border border-blue-100 dark:border-blue-500/20">
//                         {p.phone}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Actions Cluster */}
//                 <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto mt-8 xl:mt-0 pt-8 xl:pt-0 border-t xl:border-t-0 border-slate-100 dark:border-white/5">
//                   {role === 'doctor' && (
//                     <button onClick={() => navigate(`/prescribe/${p._id}`)} className="flex-1 sm:flex-none bg-[#00c897] text-white px-8 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-[#00c897]/30 active:scale-95 transition-all">
//                       WRITE RX
//                     </button>
//                   )}

//                   <div className="flex items-center gap-3">
//                     {(role === 'admin' || role === 'receptionist' || role === 'doctor') && (
//                       <button onClick={() => navigate(`/edit-patient/${p._id}`)} className="p-5 bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-2xl transition-all border border-transparent hover:border-blue-200">
//                         <Edit3 size={22} />
//                       </button>
//                     )}
//                     {role === 'admin' && (
//                       <button onClick={() => handleDelete(p._id)} className="p-5 bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-200">
//                         <Trash2 size={22} />
//                       </button>
//                     )}
//                   </div>

//                   <button onClick={() => navigate(`/history/${p._id}`)} className="flex-1 sm:flex-none bg-slate-900 dark:bg-white text-white dark:text-black px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all active:scale-95 shadow-lg shadow-slate-900/10">
//                     HISTORY <ArrowRight size={18} strokeWidth={3} />
//                   </button>
//                 </div>
//               </div>

//             )) : (
//               <div className="text-center py-40 bg-white dark:bg-[#0f172a]/10 rounded-[4rem] border-4 border-dashed border-slate-100 dark:border-white/5">
//                 <div className="bg-slate-50 dark:bg-white/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
//                    <Search size={48} className="text-slate-200 dark:text-slate-800" />
//                 </div>
//                 <p className="text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.5em] text-xs">Zero Matches Found In Archive</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <footer className="mt-20 py-10 text-center border-t border-slate-100 dark:border-white/5">
//         <p className="text-[10px] font-black uppercase tracking-[1.2em] text-slate-400 italic">Clinic OS v2.0 • Secure Interface • {new Date().getFullYear()}</p>
//       </footer>
//     </div>
//   );
// }































// import { useEffect, useState } from 'react';

// import { useNavigate } from 'react-router-dom';

// import API from '../util/api';

// import { ToastContainer, toast } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';

// import {

//   Edit3, Trash2, User, Search, Plus, Activity,

//   Loader2, ArrowRight, Sun, Moon, X, Calendar, Users

// } from 'lucide-react';



// export default function Dashboard() {

//   const [patients, setPatients] = useState([]);

//   const [appointments, setAppointments] = useState([]);

//   const [activeTab, setActiveTab] = useState('appointments'); // Default Tab 'appointments' rakha hai

//   const [searchTerm, setSearchTerm] = useState('');

//   const [loading, setLoading] = useState(true);

//   const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

//   const navigate = useNavigate();

//   const role = localStorage.getItem('role')?.toLowerCase();



//   // --- Theme Management ---

//   useEffect(() => {

//     if (darkMode) {

//       document.documentElement.classList.add('dark');

//       localStorage.setItem('theme', 'dark');

//     } else {

//       document.documentElement.classList.remove('dark');

//       localStorage.setItem('theme', 'light');

//     }

//   }, [darkMode]);



//   // --- Fetch All Data ---

//   const fetchData = async () => {

//     try {

//       setLoading(true);

//       // Dono API calls ek saath

//       const [patientsRes, scheduleRes] = await Promise.all([

//         API.get('/patients/all'),

//         API.get('/receptionist/schedule')

//       ]);



//       setPatients(patientsRes.data?.data || patientsRes.data || []);

//       setAppointments(scheduleRes.data || []);

//     } catch (err) {

//       if (err.response?.status === 401) {

//         navigate('/');

//       } else {

//         toast.error("Data Sync Failed!");

//       }

//     } finally {

//       setLoading(false);

//     }

//   };



//   useEffect(() => { fetchData(); }, [navigate]);



//   // Search Filter

//   const filteredData = activeTab === 'patients'

//     ? patients.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone?.includes(searchTerm))

//     : appointments.filter(a => a.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()));



//   return (

//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pb-20 font-sans transition-colors duration-500 overflow-x-hidden">

//       <ToastContainer theme={darkMode ? "dark" : "light"} />



//       {/* --- NAVBAR --- */}

//       <nav className="h-24 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-between px-6 md:px-14 border-b dark:border-white/5 sticky top-0 z-50">

//         <div className="flex items-center gap-4">

//           <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-xl shadow-blue-500/30">

//             <Activity size={28} strokeWidth={2.5} />

//           </div>

//           <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase">

//             CLINIC <span className="text-blue-600">OS</span>

//           </h1>

//         </div>



//         <div className="flex items-center gap-5">

//           <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-yellow-400 rounded-2xl hover:scale-110 transition-all">

//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}

//           </button>

//           <div className="hidden sm:block px-6 py-2 bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl text-[12px] font-black uppercase tracking-widest border border-blue-500/20">

//             {role}

//           </div>

//         </div>

//       </nav>



//       <div className="max-w-[1400px] mx-auto p-6 md:p-12">

       

//         {/* --- TABS SYSTEM --- */}

//         <div className="flex gap-4 mb-12">

//           <button

//             onClick={() => setActiveTab('appointments')}

//             className={`px-8 py-4 rounded-2xl font-black text-xs tracking-widest transition-all flex items-center gap-3 ${activeTab === 'appointments' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-white/5 text-slate-400'}`}

//           >

//             <Calendar size={18} /> TODAY'S SCHEDULE

//           </button>

//           <button

//             onClick={() => setActiveTab('patients')}

//             className={`px-8 py-4 rounded-2xl font-black text-xs tracking-widest transition-all flex items-center gap-3 ${activeTab === 'patients' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-white/5 text-slate-400'}`}

//           >

//             <Users size={18} /> PATIENT DIRECTORY

//           </button>

//         </div>



//         {/* --- SEARCH & ACTIONS --- */}

//         <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center">

//             <div className="relative flex-1 w-full">

//               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />

//               <input

//                 type="text"

//                 placeholder={`Search ${activeTab}...`}

//                 className="w-full pl-16 pr-6 py-6 rounded-[2rem] bg-white dark:bg-[#0f172a] dark:text-white outline-none ring-1 ring-slate-100 dark:ring-white/5 focus:ring-4 focus:ring-blue-500/20 font-bold"

//                 onChange={(e) => setSearchTerm(e.target.value)}

//               />

//             </div>

           

//             {(role === 'receptionist' || role === 'admin') && (

//               <div className="flex gap-4 w-full lg:w-auto">

//                 <button onClick={() => navigate('/add-patient')} className="flex-1 bg-slate-900 dark:bg-white dark:text-black text-white px-8 py-6 rounded-[2rem] font-black text-xs tracking-widest hover:bg-blue-600 transition-all">

//                   + REGISTER

//                 </button>

//                 <button onClick={() => navigate('/book-appointment')} className="flex-1 bg-blue-600 text-white px-8 py-6 rounded-[2rem] font-black text-xs tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">

//                   + BOOK APPOINTMENT

//                 </button>

//               </div>

//             )}

//         </div>



//         {/* --- CONTENT AREA --- */}

//         {loading ? (

//           <div className="py-40 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={48} /></div>

//         ) : (

//           <div className="grid gap-6">

//             {activeTab === 'appointments' ? (

//               // APPOINTMENTS RENDER

//               filteredData.length > 0 ? filteredData.map((apt) => (

//                 <div key={apt._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[3rem] border border-blue-500/10 flex items-center justify-between group hover:border-blue-500 transition-all">

//                   <div className="flex items-center gap-6">

//                     <div className="h-16 w-16 bg-blue-600 text-white rounded-2xl flex flex-col items-center justify-center font-black">

//                       <span className="text-[10px] uppercase">Time</span>

//                       {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

//                     </div>

//                     <div>

//                       <h3 className="text-2xl font-black dark:text-white italic uppercase">{apt.patient?.name}</h3>

//                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Doctor: {apt.doctor?.name} | {apt.reason}</p>

//                     </div>

//                   </div>

//                   <div className="px-6 py-2 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest">

//                     {apt.status}

//                   </div>

//                 </div>

//               )) : <div className="text-center py-20 text-slate-500 font-bold">No appointments scheduled for today.</div>

//             ) : (

//               // PATIENTS RENDER (Purana wala logic)

//               filteredData.map((p) => (

//                 <div key={p._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[3rem] border border-slate-100 dark:border-white/5 flex items-center justify-between">

//                   <div className="flex items-center gap-6">

//                     <div className="h-16 w-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400"><User /></div>

//                     <div>

//                       <h3 className="text-2xl font-black dark:text-white uppercase italic">{p.name}</h3>

//                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{p.phone} • {p.age} YRS</p>

//                     </div>

//                   </div>

//                   <button onClick={() => navigate(`/history/${p._id}`)} className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-[10px] tracking-widest flex items-center gap-2">

//                     HISTORY <ArrowRight size={14} />

//                   </button>

//                 </div>

//               ))

//             )}

//           </div>

//         )}

//       </div>

//     </div>

//   );

// }

































// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   Edit3, Trash2, User, Search, Plus, Activity,
//   Loader2, ArrowRight, Sun, Moon, X, Calendar, Users
// } from 'lucide-react';

// export default function Dashboard() {
//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [activeTab, setActiveTab] = useState('appointments');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role')?.toLowerCase();
//   // Login ke waqt save ki gayi ID uthayen
//   const currentUserId = localStorage.getItem('userId'); 

//   // --- Theme Management ---
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   // --- Fetch & Filter Data ---
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [patientsRes, scheduleRes] = await Promise.all([
//         API.get('/patients/all'),
//         API.get('/receptionist/schedule')
//       ]);

//       const allPatients = patientsRes.data?.data || patientsRes.data || [];
//       const allAppointments = scheduleRes.data || [];

//       // Logic: Sirf wahi appointments jo is logged-in receptionist ne book kiye hain
//       // Note: 'bookedBy' field ko apne backend key (e.g., 'createdBy' ya 'receptionistId') se match karein
//       const myAppointments = allAppointments.filter(apt => 
//         apt.bookedBy === currentUserId || apt.receptionist === currentUserId
//       );

//       setPatients(allPatients);
//       setAppointments(myAppointments);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         navigate('/');
//       } else {
//         toast.error("Data Sync Failed!");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { 
//     fetchData(); 
//   }, [navigate]);

//   // Search Filter (Jo already filtered appointments hain unme se search karega)
//   const filteredData = activeTab === 'patients'
//     ? patients.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone?.includes(searchTerm))
//     : appointments.filter(a => a.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pb-20 font-sans transition-colors duration-500 overflow-x-hidden">
//       <ToastContainer theme={darkMode ? "dark" : "light"} />

//       {/* --- NAVBAR --- */}
//       <nav className="h-24 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-between px-6 md:px-14 border-b dark:border-white/5 sticky top-0 z-50">
//         <div className="flex items-center gap-4">
//           <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-xl shadow-blue-500/30">
//             <Activity size={28} strokeWidth={2.5} />
//           </div>
//           <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase">
//             CLINIC <span className="text-blue-600">OS</span>
//           </h1>
//         </div>

//         <div className="flex items-center gap-5">
//           <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-yellow-400 rounded-2xl hover:scale-110 transition-all">
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//           <div className="hidden sm:block px-6 py-2 bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl text-[12px] font-black uppercase tracking-widest border border-blue-500/20">
//             {role}
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-[1400px] mx-auto p-6 md:p-12">
        
//         {/* --- TABS SYSTEM --- */}
//         <div className="flex gap-4 mb-12">
//           <button
//             onClick={() => setActiveTab('appointments')}
//             className={`px-8 py-4 rounded-2xl font-black text-xs tracking-widest transition-all flex items-center gap-3 ${activeTab === 'appointments' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-white/5 text-slate-400'}`}
//           >
//             <Calendar size={18} /> MY BOOKINGS
//           </button>
//           <button
//             onClick={() => setActiveTab('patients')}
//             className={`px-8 py-4 rounded-2xl font-black text-xs tracking-widest transition-all flex items-center gap-3 ${activeTab === 'patients' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-white/5 text-slate-400'}`}
//           >
//             <Users size={18} /> PATIENT DIRECTORY
//           </button>
//         </div>

//         {/* --- SEARCH & ACTIONS --- */}
//         <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center">
//             <div className="relative flex-1 w-full">
//               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder={`Search ${activeTab}...`}
//                 className="w-full pl-16 pr-6 py-6 rounded-[2rem] bg-white dark:bg-[#0f172a] dark:text-white outline-none ring-1 ring-slate-100 dark:ring-white/5 focus:ring-4 focus:ring-blue-500/20 font-bold"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             {(role === 'receptionist' || role === 'admin') && (
//               <div className="flex gap-4 w-full lg:w-auto">
//                 <button onClick={() => navigate('/add-patient')} className="flex-1 bg-slate-900 dark:bg-white dark:text-black text-white px-8 py-6 rounded-[2rem] font-black text-xs tracking-widest hover:bg-blue-600 transition-all">
//                   + REGISTER
//                 </button>
//                 <button onClick={() => navigate('/book-appointment')} className="flex-1 bg-blue-600 text-white px-8 py-6 rounded-[2rem] font-black text-xs tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">
//                   + BOOK APPOINTMENT
//                 </button>
//               </div>
//             )}
//         </div>

//         {/* --- CONTENT AREA --- */}
//         {loading ? (
//           <div className="py-40 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={48} /></div>
//         ) : (
//           <div className="grid gap-6">
//             {activeTab === 'appointments' ? (
//               filteredData.length > 0 ? filteredData.map((apt) => (
//                 <div key={apt._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[3rem] border border-blue-500/10 flex items-center justify-between group hover:border-blue-500 transition-all">
//                   <div className="flex items-center gap-6">
//                     <div className="h-16 w-16 bg-blue-600 text-white rounded-2xl flex flex-col items-center justify-center font-black">
//                       <span className="text-[10px] uppercase">Time</span>
//                       {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-black dark:text-white italic uppercase">{apt.patient?.name}</h3>
//                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Doctor: {apt.doctor?.name} | {apt.reason}</p>
//                     </div>
//                   </div>
//                   <div className="px-6 py-2 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest">
//                     {apt.status}
//                   </div>
//                 </div>
//               )) : <div className="text-center py-20 text-slate-500 font-bold">No appointments found for your ID.</div>
//             ) : (
//               filteredData.map((p) => (
//                 <div key={p._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[3rem] border border-slate-100 dark:border-white/5 flex items-center justify-between">
//                   <div className="flex items-center gap-6">
//                     <div className="h-16 w-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400"><User /></div>
//                     <div>
//                       <h3 className="text-2xl font-black dark:text-white uppercase italic">{p.name}</h3>
//                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{p.phone} • {p.age} YRS</p>
//                     </div>
//                   </div>
//                   <button onClick={() => navigate(`/history/${p._id}`)} className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-[10px] tracking-widest flex items-center gap-2">
//                     HISTORY <ArrowRight size={14} />
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

















































// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   User, Search, Activity, Loader2, ArrowRight, Sun, Moon, Calendar, Users
// } from 'lucide-react';

// export default function Dashboard() {
//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [activeTab, setActiveTab] = useState('appointments');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role')?.toLowerCase();
//   const currentUserId = localStorage.getItem('userId'); 

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [patientsRes, scheduleRes] = await Promise.all([
//         API.get('/patients/all'),
//         API.get('/receptionist/schedule')
//       ]);

//       const allPatients = patientsRes.data?.data || patientsRes.data || [];
//       const allAppointments = scheduleRes.data || [];

//       // DEBUG: Console mein check karein ke appointments mein ID kya aa rahi hai
//       console.log("Logged In User ID:", currentUserId);
//       console.log("First Appointment Data:", allAppointments[0]);

//       // Filter Logic:
//       // Hum check kar rahe hain ke logged-in user ki ID kisi bhi common field se match kare
//       const myBookings = allAppointments.filter(apt => {
//         const creatorId = apt.bookedBy || apt.receptionist?._id || apt.receptionist || apt.userId;
        
//         // Agar aap chahte hain ke Admin ko sab dikhe:
//         if (role === 'admin') return true;
        
//         // Receptionist ko sirf apna dikhe
//         return String(creatorId) === String(currentUserId);
//       });

//       setPatients(allPatients);
//       setAppointments(myBookings);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         navigate('/');
//       } else {
//         toast.error("Data Sync Failed!");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { 
//     fetchData(); 
//   }, [navigate]);

//   const filteredData = activeTab === 'patients'
//     ? patients.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone?.includes(searchTerm))
//     : appointments.filter(a => a.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pb-20 font-sans transition-colors duration-500">
//       <ToastContainer theme={darkMode ? "dark" : "light"} />

//       {/* --- NAVBAR --- */}
//       <nav className="h-24 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-between px-6 md:px-14 border-b dark:border-white/5 sticky top-0 z-50">
//         <div className="flex items-center gap-4">
//           <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-xl shadow-blue-500/30">
//             <Activity size={28} strokeWidth={2.5} />
//           </div>
//           <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase">
//             CLINIC <span className="text-blue-600">OS</span>
//           </h1>
//         </div>

//         <div className="flex items-center gap-5">
//           <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-yellow-400 rounded-2xl hover:scale-110 transition-all">
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//           <div className="px-6 py-2 bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl text-[12px] font-black uppercase tracking-widest border border-blue-500/20">
//             {role}
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-[1400px] mx-auto p-6 md:p-12">
        
//         {/* --- TABS --- */}
//         <div className="flex gap-4 mb-12">
//           <button
//             onClick={() => setActiveTab('appointments')}
//             className={`px-8 py-4 rounded-2xl font-black text-xs tracking-widest transition-all flex items-center gap-3 ${activeTab === 'appointments' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-white/5 text-slate-400'}`}
//           >
//             <Calendar size={18} /> {role === 'admin' ? "ALL SCHEDULE" : "MY BOOKINGS"}
//           </button>
//           <button
//             onClick={() => setActiveTab('patients')}
//             className={`px-8 py-4 rounded-2xl font-black text-xs tracking-widest transition-all flex items-center gap-3 ${activeTab === 'patients' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-white/5 text-slate-400'}`}
//           >
//             <Users size={18} /> PATIENTS
//           </button>
//         </div>

//         {/* --- SEARCH --- */}
//         <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center">
//             <div className="relative flex-1 w-full">
//               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder={`Search ${activeTab}...`}
//                 className="w-full pl-16 pr-6 py-6 rounded-[2rem] bg-white dark:bg-[#0f172a] dark:text-white outline-none border dark:border-white/5 focus:ring-4 focus:ring-blue-500/20 font-bold"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="flex gap-4 w-full lg:w-auto">
//               <button onClick={() => navigate('/add-patient')} className="flex-1 bg-slate-900 dark:bg-white dark:text-black text-white px-8 py-6 rounded-[2rem] font-black text-xs hover:bg-blue-600 transition-all">
//                 + REGISTER
//               </button>
//               <button onClick={() => navigate('/book-appointment')} className="flex-1 bg-blue-600 text-white px-8 py-6 rounded-[2rem] font-black text-xs hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">
//                 + BOOK APPOINTMENT
//               </button>
//             </div>
//         </div>

//         {/* --- LIST --- */}
//         {loading ? (
//           <div className="py-40 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={48} /></div>
//         ) : (
//           <div className="grid gap-6">
//             {activeTab === 'appointments' ? (
//               filteredData.length > 0 ? filteredData.map((apt) => (
//                 <div key={apt._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[3rem] border border-blue-500/10 flex items-center justify-between group hover:border-blue-500 transition-all">
//                   <div className="flex items-center gap-6">
//                     <div className="h-16 w-16 bg-blue-600 text-white rounded-2xl flex flex-col items-center justify-center font-black">
//                       <span className="text-[10px] uppercase">Time</span>
//                       {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-black dark:text-white italic uppercase">{apt.patient?.name}</h3>
//                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Doctor: {apt.doctor?.name || 'Not Assigned'} | {apt.reason}</p>
//                     </div>
//                   </div>
//                   <div className="px-6 py-2 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest">
//                     {apt.status}
//                   </div>
//                 </div>
//               )) : (
//                 <div className="text-center py-20 bg-white dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/10">
//                    <p className="text-slate-500 font-bold italic">No appointments found for your ID.</p>
//                 </div>
//               )
//             ) : (
//               // Patients render
//               filteredData.map((p) => (
//                 <div key={p._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[3rem] border border-slate-100 dark:border-white/5 flex items-center justify-between">
//                   <div className="flex items-center gap-6">
//                     <div className="h-16 w-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400"><User /></div>
//                     <div>
//                       <h3 className="text-2xl font-black dark:text-white uppercase italic">{p.name}</h3>
//                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{p.phone} • {p.age} YRS</p>
//                     </div>
//                   </div>
//                   <button onClick={() => navigate(`/history/${p._id}`)} className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-[10px] tracking-widest flex items-center gap-2">
//                     HISTORY <ArrowRight size={14} />
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }























// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   User, Search, Activity, Loader2, ArrowRight, Sun, Moon, Calendar, Users
// } from 'lucide-react';

// export default function Dashboard() {
//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [activeTab, setActiveTab] = useState('appointments');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role')?.toLowerCase();
//   const currentUserId = localStorage.getItem('userId'); 

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
      
//       // Dynamic URL: Doctor ke liye filter, baki sab ke liye All Data
//       let scheduleUrl = `/receptionist/schedule`;
//       if (role === 'doctor') {
//         scheduleUrl = `/receptionist/schedule?role=doctor&doctorId=${currentUserId}`;
//       }

//       const [patientsRes, scheduleRes] = await Promise.all([
//         API.get('/patients/all'),
//         API.get(scheduleUrl)
//       ]);

//       const allPatients = patientsRes.data?.data || patientsRes.data || [];
//       const allAppointments = scheduleRes.data || [];

//       // Logic: Receptionist aur Admin ko Filter nahi dikhana (SAB DATA)
//       const visibleBookings = allAppointments.filter(apt => {
//         if (role === 'admin' || role === 'receptionist') {
//           return true; // Sab nazar aayega
//         }
//         if (role === 'doctor') {
//           const doctorId = apt.doctor?._id || apt.doctor;
//           return String(doctorId) === String(currentUserId);
//         }
//         return false;
//       });

//       setPatients(allPatients);
//       setAppointments(visibleBookings);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       if (err.response?.status === 401) {
//         navigate('/');
//       } else {
//         toast.error("Data Sync Failed!");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { 
//     fetchData(); 
//   }, [navigate]);

//   const filteredData = activeTab === 'patients'
//     ? patients.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone?.includes(searchTerm))
//     : appointments.filter(a => a.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pb-20 font-sans transition-colors duration-500">
//       <ToastContainer theme={darkMode ? "dark" : "light"} />

//       <nav className="h-24 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-between px-6 md:px-14 border-b dark:border-white/5 sticky top-0 z-50">
//         <div className="flex items-center gap-4">
//           <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-xl shadow-blue-500/30">
//             <Activity size={28} strokeWidth={2.5} />
//           </div>
//           <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase">
//             CLINIC <span className="text-blue-600">OS</span>
//           </h1>
//         </div>

//         <div className="flex items-center gap-5">
//           <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-yellow-400 rounded-2xl hover:scale-110 transition-all">
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//           <div className="px-6 py-2 bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl text-[12px] font-black uppercase tracking-widest border border-blue-500/20">
//             {role}
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-[1400px] mx-auto p-6 md:p-12">
//         <div className="flex gap-4 mb-12">
//           <button
//             onClick={() => setActiveTab('appointments')}
//             className={`px-8 py-4 rounded-2xl font-black text-xs tracking-widest transition-all flex items-center gap-3 ${activeTab === 'appointments' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-white/5 text-slate-400'}`}
//           >
//             <Calendar size={18} /> {role === 'doctor' ? "MY APPOINTMENTS" : "ALL SCHEDULE"}
//           </button>
//           <button
//             onClick={() => setActiveTab('patients')}
//             className={`px-8 py-4 rounded-2xl font-black text-xs tracking-widest transition-all flex items-center gap-3 ${activeTab === 'patients' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-white/5 text-slate-400'}`}
//           >
//             <Users size={18} /> ALL PATIENTS
//           </button>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center">
//             <div className="relative flex-1 w-full">
//               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder={`Search ${activeTab}...`}
//                 className="w-full pl-16 pr-6 py-6 rounded-[2rem] bg-white dark:bg-[#0f172a] dark:text-white outline-none border dark:border-white/5 focus:ring-4 focus:ring-blue-500/20 font-bold"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="flex gap-4 w-full lg:w-auto">
//               <button onClick={() => navigate('/add-patient')} className="flex-1 bg-slate-900 dark:bg-white dark:text-black text-white px-8 py-6 rounded-[2rem] font-black text-xs hover:bg-blue-600 transition-all min-w-[120px]">
//                 + REGISTER
//               </button>
//               <button onClick={() => navigate('/book-appointment')} className="flex-1 bg-blue-600 text-white px-8 py-6 rounded-[2rem] font-black text-xs hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20 min-w-[180px]">
//                 + BOOK APPOINTMENT
//               </button>
//             </div>
//         </div>

//         {loading ? (
//           <div className="py-40 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={48} /></div>
//         ) : (
//           <div className="grid gap-6">
//             {activeTab === 'appointments' ? (
//               filteredData.length > 0 ? filteredData.map((apt) => (
//                 <div key={apt._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[3rem] border border-blue-500/10 flex items-center justify-between group hover:border-blue-500 transition-all">
//                   <div className="flex items-center gap-6">
//                     <div className="h-16 w-16 bg-blue-600 text-white rounded-2xl flex flex-col items-center justify-center font-black text-center px-1">
//                       <span className="text-[10px] uppercase">Time</span>
//                       <span className="text-sm">{new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-black dark:text-white italic uppercase">{apt.patient?.name}</h3>
//                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
//                         Doctor: {apt.doctor?.name || 'Not Assigned'} | {apt.reason}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="px-6 py-2 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest">
//                     {apt.status}
//                   </div>
//                 </div>
//               )) : (
//                 <div className="text-center py-20 bg-white dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/10">
//                    <p className="text-slate-500 font-bold italic">No appointments scheduled for today.</p>
//                 </div>
//               )
//             ) : (
//               filteredData.map((p) => (
//                 <div key={p._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[3rem] border border-slate-100 dark:border-white/5 flex items-center justify-between">
//                   <div className="flex items-center gap-6">
//                     <div className="h-16 w-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400"><User /></div>
//                     <div>
//                       <h3 className="text-2xl font-black dark:text-white uppercase italic">{p.name}</h3>
//                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{p.phone} • {p.age} YRS</p>
//                     </div>
//                   </div>
//                   <button onClick={() => navigate(`/history/${p._id}`)} className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-[10px] tracking-widest flex items-center gap-2">
//                     HISTORY <ArrowRight size={14} />
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










































































// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   User, Search, Activity, Loader2, ArrowRight, Sun, Moon, Calendar, Users
// } from 'lucide-react';

// export default function Dashboard() {
//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [activeTab, setActiveTab] = useState('appointments');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role')?.toLowerCase();
//   const currentUserId = localStorage.getItem('userId'); 

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
      
//       // Dynamic URL for Appointments
//       let scheduleUrl = `/receptionist/schedule`;
//       if (role === 'doctor') {
//         scheduleUrl = `/receptionist/schedule?role=doctor&doctorId=${currentUserId}`;
//       }

//       const [patientsRes, scheduleRes] = await Promise.all([
//         API.get('/patients/all'),
//         API.get(scheduleUrl)
//       ]);

//       const allPatientsDB = patientsRes.data?.data || patientsRes.data || [];
//       const fetchedAppointments = scheduleRes.data || [];

//       // Logic for Appointments Tab
//       const visibleAppointments = fetchedAppointments.filter(apt => {
//         if (role === 'admin' || role === 'receptionist') return true;
//         if (role === 'doctor') {
//           const docId = apt.doctor?._id || apt.doctor;
//           return String(docId) === String(currentUserId);
//         }
//         return false;
//       });

//       // Logic for Patients Tab: Doctor ko sirf uske aaj ke mareez dikhao
//       let visiblePatients = [];
//       if (role === 'receptionist' || role === 'admin') {
//         visiblePatients = allPatientsDB;
//       } else if (role === 'doctor') {
//         visiblePatients = allPatientsDB.filter(p => 
//           visibleAppointments.some(apt => String(apt.patient?._id || apt.patient) === String(p._id))
//         );
//       }

//       setPatients(visiblePatients);
//       setAppointments(visibleAppointments);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       if (err.response?.status === 401) navigate('/');
//       else toast.error("Data Sync Failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchData(); }, [navigate]);

//   const filteredData = activeTab === 'patients'
//     ? patients.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone?.includes(searchTerm))
//     : appointments.filter(a => a.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pb-20 font-sans transition-colors duration-500">
//       <ToastContainer theme={darkMode ? "dark" : "light"} />

//       {/* Navbar */}
//       <nav className="h-24 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-between px-6 md:px-14 border-b dark:border-white/5 sticky top-0 z-50">
//         <div className="flex items-center gap-4">
//           <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-xl shadow-blue-500/30">
//             <Activity size={28} strokeWidth={2.5} />
//           </div>
//           <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase">
//             CLINIC <span className="text-blue-600">OS</span>
//           </h1>
//         </div>

//         <div className="flex items-center gap-5">
//           <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-yellow-400 rounded-2xl">
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//           <div className="px-6 py-2 bg-blue-600/10 text-blue-600 rounded-xl text-[12px] font-black uppercase border border-blue-500/20">
//             {role}
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-[1400px] mx-auto p-6 md:p-12">
//         {/* Tab Selection */}
//         <div className="flex gap-4 mb-12">
//           <button
//             onClick={() => setActiveTab('appointments')}
//             className={`px-8 py-4 rounded-2xl font-black text-xs tracking-widest transition-all flex items-center gap-3 ${activeTab === 'appointments' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-white/5 text-slate-400'}`}
//           >
//             <Calendar size={18} /> {role === 'doctor' ? "MY CLINIC" : "ALL SCHEDULE"}
//           </button>
//           <button
//             onClick={() => setActiveTab('patients')}
//             className={`px-8 py-4 rounded-2xl font-black text-xs tracking-widest transition-all flex items-center gap-3 ${activeTab === 'patients' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-white/5 text-slate-400'}`}
//           >
//             <Users size={18} /> {role === 'doctor' ? "TODAY'S PATIENTS" : "ALL PATIENTS"}
//           </button>
//         </div>

//         {/* Search & Actions */}
//         <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center">
//             <div className="relative flex-1 w-full">
//               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder={`Search ${activeTab}...`}
//                 className="w-full pl-16 pr-6 py-6 rounded-[2rem] bg-white dark:bg-[#0f172a] dark:text-white outline-none border dark:border-white/5 font-bold"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             {/* Action Buttons: SIRF Receptionist/Admin ko dikhen gye */}
//             {(role === 'receptionist' || role === 'admin') && (
//               <div className="flex gap-4 w-full lg:w-auto">
//                 <button onClick={() => navigate('/add-patient')} className="flex-1 bg-slate-900 dark:bg-white dark:text-black text-white px-8 py-6 rounded-[2rem] font-black text-xs hover:bg-blue-600 transition-all min-w-[120px]">
//                   + REGISTER
//                 </button>
//                 <button onClick={() => navigate('/book-appointment')} className="flex-1 bg-blue-600 text-white px-8 py-6 rounded-[2rem] font-black text-xs hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20 min-w-[180px]">
//                   + BOOK APPOINTMENT
//                 </button>
//               </div>
//             )}
//         </div>

//         {/* Content Area */}
//         {loading ? (
//           <div className="py-40 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={48} /></div>
//         ) : (
//           <div className="grid gap-6">
//             {activeTab === 'appointments' ? (
//               filteredData.length > 0 ? filteredData.map((apt) => (
//                 <div key={apt._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[3rem] border border-blue-500/10 flex items-center justify-between group hover:border-blue-500 transition-all">
//                   <div className="flex items-center gap-6">
//                     <div className="h-16 w-16 bg-blue-600 text-white rounded-2xl flex flex-col items-center justify-center font-black text-center px-1">
//                       <span className="text-[10px] uppercase">Time</span>
//                       <span className="text-sm">{new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-black dark:text-white italic uppercase">{apt.patient?.name}</h3>
//                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
//                         {role === 'doctor' ? `Reason: ${apt.reason}` : `Doctor: ${apt.doctor?.name || 'Not Assigned'} | ${apt.reason}`}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <div className="px-6 py-2 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest">
//                         {apt.status}
//                     </div>
//                     {/* Doctor ke liye Checkup button dikha sakte hain yahan */}
//                     {role === 'doctor' && (
//                         <button onClick={() => navigate(`/prescribe/${p._id}`)} className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-slate-900 transition-all">
//                            <ArrowRight size={20} />
//                         </button>
//                     )}

//                     {role === 'doctor' && (
//                     <button onClick={() => navigate(`/prescribe/${p._id}`)} className="flex-1 sm:flex-none bg-[#00c897] text-white px-8 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-[#00c897]/30 active:scale-95 transition-all">
//                       WRITE RX
//                     </button>
//                   )}
//                   </div>
//                 </div>
//               )) : (
//                 <div className="text-center py-20 bg-white dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-slate-200">
//                    <p className="text-slate-500 font-bold italic">No appointments found.</p>
//                 </div>
//               )
//             ) : (
//               // Patients Tab
//               filteredData.map((p) => (
//                 <div key={p._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[3rem] border border-slate-100 dark:border-white/5 flex items-center justify-between">
//                   <div className="flex items-center gap-6">
//                     <div className="h-16 w-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400"><User /></div>
//                     <div>
//                       <h3 className="text-2xl font-black dark:text-white uppercase italic">{p.name}</h3>
//                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{p.phone} • {p.age} YRS</p>
//                     </div>
//                   </div>
//                   <button onClick={() => navigate(`/history/${p._id}`)} className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-[10px] tracking-widest flex items-center gap-2">
//                     {role === 'doctor' ? 'MEDICAL RECORD' : 'HISTORY'} <ArrowRight size={14} />
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
















































// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   Edit3, Trash2, User, Search, Activity, 
//   Loader2, Sun, Moon, FileText 
// } from 'lucide-react';

// export default function Dashboard() {
//   const [data, setData] = useState([]); 
//   const [activeTab, setActiveTab] = useState('appointments');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role')?.toLowerCase();
//   const currentUserId = localStorage.getItem('userId');

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', darkMode);
//     localStorage.setItem('theme', darkMode ? 'dark' : 'light');
//   }, [darkMode]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       let endpoint = '';
      
//       if (role === 'doctor') {
//         endpoint = `/receptionist/schedule?role=doctor&doctorId=${currentUserId}`;
//       } else {
//         endpoint = activeTab === 'appointments' 
//           ? '/receptionist/schedule' 
//           : '/receptionist/all-patients'; 
//       }

//       const res = await API.get(endpoint);
//       const fetchedData = res.data?.data || res.data || [];
//       setData(Array.isArray(fetchedData) ? fetchedData : []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Data Sync Failed!");
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { 
//     fetchData(); 
//   }, [activeTab]);

//   const handleDelete = async (id) => {
//     if (role !== 'admin') {
//       toast.error("Bhai, aapke paas delete karne ki permission nahi hai!");
//       return;
//     }

//     if (window.confirm("Admin Alert: Are you sure you want to PERMANENTLY delete this?")) {
//       try {
//         await API.delete(`/receptionist/delete-patient/${id}`, {
//             data: { userRole: role } 
//         }); 
//         setData(data.filter(p => p._id !== id));
//         toast.success("Record Purged by Admin!");
//       } catch (err) {
//         toast.error(err.response?.data?.message || "Delete Failed!");
//       }
//     }
//   };

//   const filteredData = data.filter(item => {
//     const name = item.patient?.name || item.name || '';
//     return name.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pb-20 font-sans transition-all duration-300">
//       <ToastContainer theme={darkMode ? "dark" : "light"} />

//       {/* --- NAVBAR --- */}
//       <nav className="h-24 bg-white dark:bg-[#0f172a] flex items-center justify-between px-6 md:px-14 border-b dark:border-white/5 sticky top-0 z-50">
//         <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
//           <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-500/30"><Activity size={28} /></div>
//           <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">CLINIC <span className="text-blue-600">OS</span></h1>
//         </div>
//         <div className="flex items-center gap-5">
//           <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl transition-all hover:scale-110 cursor-pointer">
//             {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
//           </button>
//           <div className="px-5 py-2 bg-blue-600/10 text-blue-600 dark:bg-blue-600 dark:text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic select-none">
//             {role} 
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-[1400px] mx-auto p-6 md:p-12">
        
//         {/* --- HEADER & ACTIONS --- */}
//         <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
//           <div className="flex gap-4 w-full lg:w-auto">
//             {role !== 'doctor' ? (
//               <div className="flex bg-slate-200/50 dark:bg-white/5 p-1.5 rounded-[2.2rem] backdrop-blur-md">
//                 <button 
//                   onClick={() => setActiveTab('appointments')} 
//                   className={`px-8 py-4 rounded-[1.8rem] font-black text-xs transition-all cursor-pointer ${activeTab === 'appointments' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
//                 >
//                   SCHEDULE
//                 </button>
//                 <button 
//                   onClick={() => setActiveTab('patients')} 
//                   className={`px-8 py-4 rounded-[1.8rem] font-black text-xs transition-all cursor-pointer ${activeTab === 'patients' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
//                 >
//                   DATABASE
//                 </button>
//               </div>
//             ) : (
//               <h2 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter">PATIENT <span className="text-blue-600">QUEUE</span></h2>
//             )}
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 w-full lg:flex-1 lg:max-w-3xl">
//             <div className="relative flex-1 group">
//               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
//               <input 
//                 type="text" 
//                 placeholder={`Search ${activeTab}...`} 
//                 className="w-full pl-16 pr-6 py-5 rounded-[2.2rem] bg-white dark:bg-[#0f172a] dark:text-white outline-none border border-slate-200 dark:border-white/5 font-bold focus:ring-4 focus:ring-blue-600/10 transition-all shadow-sm"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             {(role === 'receptionist' || role === 'admin') && (
//               <div className="flex gap-3">
//                 <button onClick={() => navigate('/add-patient')} className="bg-slate-900 dark:bg-white dark:text-black text-white px-7 py-5 rounded-[1.8rem] font-black text-[10px] tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all shadow-lg cursor-pointer">+ New Patient</button>
//                 <button onClick={() => navigate('/book-appointment')} className="bg-blue-600 text-white px-7 py-5 rounded-[1.8rem] font-black text-[10px] tracking-widest uppercase shadow-lg shadow-blue-500/30 hover:bg-slate-900 transition-all cursor-pointer">+ Book</button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* --- LIST AREA --- */}
//         {loading ? (
//           <div className="py-40 text-center">
//             <Loader2 className="animate-spin mx-auto text-blue-600 mb-4" size={50} />
//             <p className="text-slate-400 font-black text-[10px] tracking-[0.3em] uppercase italic">Fetching Secure Data</p>
//           </div>
//         ) : (
//           <div className="grid gap-5">
//             {filteredData.length > 0 ? filteredData.map((item) => {
//               const isAppt = activeTab === 'appointments' || role === 'doctor';
//               const pId = isAppt ? item.patient?._id : item._id;
//               const pName = isAppt ? item.patient?.name : item.name;

//               return (
//                 <div key={item._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[2.8rem] border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all group">
                  
//                   <div className="flex items-center gap-6 w-full">
//                     <div className="h-16 w-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
//                       <User size={30} />
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-black dark:text-white italic uppercase tracking-tight leading-tight">{pName || 'Missing Name'}</h3>
//                       <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mt-1.5 flex items-center gap-2">
//                         {isAppt ? (
//                           <>
//                             <span className="text-blue-500">🕒 {new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
//                             <span className="opacity-30">|</span>
//                             <span>Reason: {item.reason}</span>
//                           </>
//                         ) : (
//                           <>
//                             <span className="text-blue-500">📞 {item.phone || 'No Phone'}</span>
//                             <span className="opacity-30">|</span>
//                             <span>Age: {item.age || '??'} Yrs</span>
//                             <span className="opacity-30">|</span>
//                             <span>{item.gender}</span>
//                           </>
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 mt-6 md:mt-0 w-full md:w-auto justify-end">
//                     {role === 'doctor' && (
//                       <button onClick={() => navigate(`/prescribe/${pId}`)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] flex items-center gap-2 hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20 cursor-pointer">
//                         <FileText size={16} /> WRITE RX
//                       </button>
//                     )}
                    
//                     {(role === 'receptionist' || role === 'admin') && (
//                       <div className="flex gap-2">
//                         <button 
//                           onClick={() => navigate(`/edit-patient/${pId}`)} 
//                           className="p-4 bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all cursor-pointer"
//                           title="Edit Patient"
//                         >
//                           <Edit3 size={18} />
//                         </button>
//                         {role === 'admin' && (
//                           <button 
//                             onClick={() => handleDelete(item._id)} 
//                             className="p-4 bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-red-500 rounded-xl transition-all cursor-pointer"
//                             title="Delete"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         )}
//                       </div>
//                     )}
                    
//                     <button 
//                       onClick={() => navigate(`/history/${pId}`)} 
//                       className="bg-slate-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all cursor-pointer"
//                     >
//                       History
//                     </button>
//                   </div>
//                 </div>
//               );
//             }) : (
//               <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem] opacity-50">
//                 <p className="font-black text-xs uppercase tracking-widest text-slate-400 italic">No Data synchronized for {activeTab}</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








// update in 1 sec



// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   Edit3, Trash2, User, Search, Activity, 
//   Loader2, Sun, Moon, FileText 
// } from 'lucide-react';

// export default function Dashboard() {
//   const [data, setData] = useState([]); 
//   const [activeTab, setActiveTab] = useState('appointments');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role')?.toLowerCase();

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', darkMode);
//     localStorage.setItem('theme', darkMode ? 'dark' : 'light');
//   }, [darkMode]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       let endpoint = '';
      
//       if (role === 'doctor') {
//         endpoint = '/doctor/my-patients'; // Humara naya optimized route
//       } else {
//         endpoint = activeTab === 'appointments' 
//           ? '/receptionist/schedule' 
//           : '/receptionist/all-patients'; 
//       }

//       const res = await API.get(endpoint);
//       const fetchedData = res.data?.data || res.data || [];
//       setData(Array.isArray(fetchedData) ? fetchedData : []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Data Sync Failed!");
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { 
//     fetchData(); 
//   }, [activeTab]);

//   const handleDelete = async (id) => {
//     if (role !== 'admin') {
//       toast.error("Bhai, aapke paas delete karne ki permission nahi hai!");
//       return;
//     }

//     if (window.confirm("Admin Alert: Are you sure?")) {
//       try {
//         await API.delete(`/receptionist/delete-patient/${id}`, {
//             data: { userRole: role } 
//         }); 
//         setData(data.filter(p => p._id !== id));
//         toast.success("Record Purged!");
//       } catch (err) {
//         toast.error("Delete Failed!");
//       }
//     }
//   };

//   const filteredData = data.filter(item => {
//     // Backend se ab item.name ya item.patient.name dono aa sakte hain
//     const name = item.name || item.patient?.name || '';
//     return name.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pb-20 font-sans transition-all duration-300">
//       <ToastContainer theme={darkMode ? "dark" : "light"} />

//       {/* --- NAVBAR --- */}
//       <nav className="h-24 bg-white dark:bg-[#0f172a] flex items-center justify-between px-6 md:px-14 border-b dark:border-white/5 sticky top-0 z-50">
//         <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
//           <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-500/30"><Activity size={28} /></div>
//           <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">CLINIC <span className="text-blue-600">OS</span></h1>
//         </div>
//         <div className="flex items-center gap-5">
//           <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl transition-all hover:scale-110 cursor-pointer">
//             {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
//           </button>
//           <div className="px-5 py-2 bg-blue-600/10 text-blue-600 dark:bg-blue-600 dark:text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic select-none">
//             {role} 
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-[1400px] mx-auto p-6 md:p-12">
        
//         {/* --- HEADER --- */}
//         <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
//           <div className="flex gap-4 w-full lg:w-auto">
//             {role !== 'doctor' ? (
//               <div className="flex bg-slate-200/50 dark:bg-white/5 p-1.5 rounded-[2.2rem] backdrop-blur-md">
//                 <button onClick={() => setActiveTab('appointments')} className={`px-8 py-4 rounded-[1.8rem] font-black text-xs transition-all ${activeTab === 'appointments' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>SCHEDULE</button>
//                 <button onClick={() => setActiveTab('patients')} className={`px-8 py-4 rounded-[1.8rem] font-black text-xs transition-all ${activeTab === 'patients' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>DATABASE</button>
//               </div>
//             ) : (
//               <h2 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter">WAITING <span className="text-blue-600">LIST</span></h2>
//             )}
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 w-full lg:flex-1 lg:max-w-3xl">
//             <div className="relative flex-1 group">
//               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
//               <input 
//                 type="text" 
//                 placeholder={`Search ${activeTab}...`} 
//                 className="w-full pl-16 pr-6 py-5 rounded-[2.2rem] bg-white dark:bg-[#0f172a] dark:text-white outline-none border border-slate-200 dark:border-white/5 font-bold focus:ring-4 focus:ring-blue-600/10 transition-all shadow-sm"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* --- LIST AREA --- */}
//         {loading ? (
//           <div className="py-40 text-center">
//             <Loader2 className="animate-spin mx-auto text-blue-600 mb-4" size={50} />
//             <p className="text-slate-400 font-black text-[10px] tracking-[0.3em] uppercase italic">Fetching Secure Data</p>
//           </div>
//         ) : (
//           <div className="grid gap-5">
//             {filteredData.length > 0 ? filteredData.map((item) => {
//               // LOGIC: Doctor ke liye item.appointmentId lazmi pass karna hai
//               const pId = role === 'doctor' ? item._id : (item.patient?._id || item._id);
//               const apptId = role === 'doctor' ? item.appointmentId : item._id;
//               const pName = item.name || item.patient?.name || 'Unknown Patient';

//               return (
//                 <div key={item._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[2.8rem] border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between hover:border-blue-500/50 hover:shadow-2xl transition-all group">
//                   <div className="flex items-center gap-6 w-full">
//                     <div className="h-16 w-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
//                       <User size={30} />
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-black dark:text-white italic uppercase tracking-tight leading-tight">{pName}</h3>
//                       <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mt-1.5 flex items-center gap-2">
//                         <span className="text-blue-500">🕒 {item.date ? new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Anytime'}</span>
//                         <span className="opacity-30">|</span>
//                         <span>{item.reason || 'Checkup'}</span>
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 mt-6 md:mt-0 w-full md:w-auto justify-end">
//                     {role === 'doctor' && (
//                       <button 
//                         // IMPORTANT: Hum ab appointmentId bhej rahe hain URL mein
//                         onClick={() => navigate(`/prescribe/${pId}?appointmentId=${apptId}`)} 
//                         className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] flex items-center gap-2 hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20 cursor-pointer"
//                       >
//                         <FileText size={16} /> WRITE RX
//                       </button>
//                     )}
                    
//                     {(role === 'receptionist' || role === 'admin') && (
//                       <button onClick={() => navigate(`/edit-patient/${pId}`)} className="p-4 bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-blue-600 rounded-xl transition-all">
//                         <Edit3 size={18} />
//                       </button>
//                     )}
                    
//                     <button onClick={() => navigate(`/history/${pId}`)} className="bg-slate-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
//                       History
//                     </button>
//                   </div>
//                 </div>
//               );
//             }) : (
//               <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem] opacity-50">
//                 <p className="font-black text-xs uppercase tracking-widest text-slate-400 italic">No patients in queue</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








































// admin



// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   Edit3, Trash2, User, Search, Activity, 
//   Loader2, Sun, Moon, FileText, UserRound, Users, ShieldCheck, BarChart3
// } from 'lucide-react';

// export default function Dashboard() {
//   const [data, setData] = useState([]); 
//   const [stats, setStats] = useState({ doctors: 0, patients: 0, staff: 0 }); // Admin Stats State
//   const [activeTab, setActiveTab] = useState('appointments');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role')?.toLowerCase();

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', darkMode);
//     localStorage.setItem('theme', darkMode ? 'dark' : 'light');
//   }, [darkMode]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
      
//       // ADMIN LOGIC
//       if (role === 'admin') {
//         const res = await API.get('/admin/stats');
//         if (res.data.success) {
//           setStats(res.data.data);
//         }
//         setLoading(false);
//         return;
//       }

//       // DOCTOR & RECEPTIONIST LOGIC
//       let endpoint = '';
//       if (role === 'doctor') {
//         endpoint = '/doctor/my-patients';
//       } else {
//         endpoint = activeTab === 'appointments' ? '/receptionist/schedule' : '/receptionist/all-patients'; 
//       }

//       const res = await API.get(endpoint);
//       const fetchedData = res.data?.data || res.data || [];
//       setData(Array.isArray(fetchedData) ? fetchedData : []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Data Sync Failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { 
//     fetchData(); 
//   }, [activeTab]);

//   // Admin Stats Cards Data
//   const adminCards = [
//     { name: 'Total Doctors', value: stats.doctors, icon: <UserRound size={28} />, color: 'blue' },
//     { name: 'Total Patients', value: stats.patients, icon: <Users size={28} />, color: 'emerald' },
//     { name: 'Reception Staff', value: stats.staff, icon: <Activity size={28} />, color: 'purple' },
//   ];

//   const filteredData = data.filter(item => {
//     const name = item.name || item.patient?.name || '';
//     return name.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pb-20 font-sans transition-all duration-300">
//       <ToastContainer theme={darkMode ? "dark" : "light"} />

//       {/* --- NAVBAR --- */}
//       <nav className="h-24 bg-white dark:bg-[#0f172a] flex items-center justify-between px-6 md:px-14 border-b dark:border-white/5 sticky top-0 z-50">
//         <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
//           <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-500/30"><Activity size={28} /></div>
//           <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">CLINIC <span className="text-blue-600">OS</span></h1>
//         </div>
//         <div className="flex items-center gap-5">
//           <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl transition-all hover:scale-110">
//             {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
//           </button>
//           <div className="px-5 py-2 bg-blue-600/10 text-blue-600 dark:bg-blue-600 dark:text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic">
//             {role} 
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-[1400px] mx-auto p-6 md:p-12">
        
//         {/* --- ROLE BASED HEADER --- */}
//         <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
//           <div className="flex gap-4 w-full lg:w-auto">
//             {role === 'admin' ? (
//               <h2 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter">SYSTEM <span className="text-blue-600">OVERVIEW</span></h2>
//             ) : role === 'doctor' ? (
//               <h2 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter">WAITING <span className="text-blue-600">LIST</span></h2>
//             ) : (
//               <div className="flex bg-slate-200/50 dark:bg-white/5 p-1.5 rounded-[2.2rem] backdrop-blur-md">
//                 <button onClick={() => setActiveTab('appointments')} className={`px-8 py-4 rounded-[1.8rem] font-black text-xs transition-all ${activeTab === 'appointments' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>SCHEDULE</button>
//                 <button onClick={() => setActiveTab('patients')} className={`px-8 py-4 rounded-[1.8rem] font-black text-xs transition-all ${activeTab === 'patients' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>DATABASE</button>
//               </div>
//             )}
//           </div>

//           {role !== 'admin' && (
//             <div className="flex flex-col sm:flex-row gap-4 w-full lg:flex-1 lg:max-w-3xl">
//               <div className="relative flex-1 group">
//                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
//                 <input 
//                   type="text" 
//                   placeholder={`Search ${activeTab}...`} 
//                   className="w-full pl-16 pr-6 py-5 rounded-[2.2rem] bg-white dark:bg-[#0f172a] dark:text-white outline-none border border-slate-200 dark:border-white/5 font-bold focus:ring-4 focus:ring-blue-600/10 transition-all shadow-sm"
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* --- CONTENT AREA --- */}
//         {loading ? (
//           <div className="py-40 text-center">
//             <Loader2 className="animate-spin mx-auto text-blue-600 mb-4" size={50} />
//             <p className="text-slate-400 font-black text-[10px] tracking-[0.3em] uppercase italic">Fetching Secure Data</p>
//           </div>
//         ) : role === 'admin' ? (
//           /* --- ADMIN DASHBOARD VIEW --- */
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {adminCards.map((card, idx) => (
//               <div key={idx} className="bg-white dark:bg-[#0f172a]/40 p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-xl hover:scale-[1.02] transition-all group">
//                 <div className="h-16 w-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
//                   {card.icon}
//                 </div>
//                 <h3 className="text-slate-400 font-black text-xs uppercase tracking-widest">{card.name}</h3>
//                 <p className="text-5xl font-black text-slate-900 dark:text-white mt-2 tracking-tighter">{card.value}</p>
//                 <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest italic">
//                    View Details <BarChart3 size={14} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           /* --- DOCTOR & RECEPTIONIST LIST VIEW --- */
//           <div className="grid gap-5">
//             {filteredData.length > 0 ? filteredData.map((item) => {
//               const pId = role === 'doctor' ? item._id : (item.patient?._id || item._id);
//               const apptId = role === 'doctor' ? item.appointmentId : item._id;
//               const pName = item.name || item.patient?.name || 'Unknown Patient';

//               return (
//                 <div key={item._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[2.8rem] border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between hover:border-blue-500/50 hover:shadow-2xl transition-all group">
//                   <div className="flex items-center gap-6 w-full">
//                     <div className="h-16 w-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
//                       <User size={30} />
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-black dark:text-white italic uppercase tracking-tight leading-tight">{pName}</h3>
//                       <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mt-1.5 flex items-center gap-2">
//                         <span className="text-blue-500">🕒 {item.date ? new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Anytime'}</span>
//                         <span className="opacity-30">|</span>
//                         <span>{item.reason || 'Checkup'}</span>
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 mt-6 md:mt-0 w-full md:w-auto justify-end">
//                     {role === 'doctor' && (
//                       <button onClick={() => navigate(`/prescribe/${pId}?appointmentId=${apptId}`)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] flex items-center gap-2 hover:bg-slate-900 transition-all">
//                         <FileText size={16} /> WRITE RX
//                       </button>
//                     )}
//                     <button onClick={() => navigate(`/history/${pId}`)} className="bg-slate-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
//                       History
//                     </button>
//                   </div>
//                 </div>
//               );
//             }) : (
//               <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem] opacity-50">
//                 <p className="font-black text-xs uppercase tracking-widest text-slate-400 italic">No patients in queue</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










// patient




// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   User, Search, Activity, 
//   Loader2, Sun, Moon, FileText, UserRound, Users, BarChart3
// } from 'lucide-react';

// export default function Dashboard() {
//   const [data, setData] = useState([]); 
//   const [stats, setStats] = useState({ doctors: 0, patients: 0, staff: 0 });
//   const [activeTab, setActiveTab] = useState('appointments');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role')?.toLowerCase();

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', darkMode);
//     localStorage.setItem('theme', darkMode ? 'dark' : 'light');
//   }, [darkMode]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
      
//       // 1. ADMIN LOGIC
//       if (role === 'admin') {
//         const res = await API.get('/admin/stats');
//         if (res.data.success) setStats(res.data.data);
//         setLoading(false);
//         return;
//       }

//       // 2. ENDPOINT SELECTION
//       let endpoint = '';
//       if (role === 'doctor') {
//         endpoint = '/doctor/my-patients';
//       } else if (role === 'receptionist') {
//         endpoint = activeTab === 'appointments' ? '/receptionist/schedule' : '/receptionist/all-patients'; 
//       } else if (role === 'patient') {
//         // ✅ Patient Dashboard Endpoint
//         endpoint = '/patients/my-dashboard'; 
//       }

//       const res = await API.get(endpoint);
//       const fetchedData = res.data?.data || res.data || [];
      
//       // Patient ka data aksar single object hota hai, isliye array check zaroori hai
//       setData(Array.isArray(fetchedData) ? fetchedData : [fetchedData]);

//     } catch (err) {
//       console.error("Dashboard Error:", err);
//       // 500 ya 404 error par crash na ho, isliye empty array
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { 
//     if(role) fetchData(); 
//   }, [activeTab, role]);

//   const filteredData = data.filter(item => {
//     if(!item) return false;
//     const name = item.name || item.patient?.name || 'My Record';
//     return name.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   const adminCards = [
//     { name: 'Total Doctors', value: stats.doctors, icon: <UserRound size={28} /> },
//     { name: 'Total Patients', value: stats.patients, icon: <Users size={28} /> },
//     { name: 'Reception Staff', value: stats.staff, icon: <Activity size={28} /> },
//   ];

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pb-20 font-sans transition-all duration-300">
//       <ToastContainer theme={darkMode ? "dark" : "light"} />

//       {/* --- NAVBAR --- */}
//       <nav className="h-24 bg-white dark:bg-[#0f172a] flex items-center justify-between px-6 md:px-14 border-b dark:border-white/5 sticky top-0 z-50">
//         <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
//           <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-500/30"><Activity size={28} /></div>
//           <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">CLINIC <span className="text-blue-600">OS</span></h1>
//         </div>
//         <div className="flex items-center gap-5">
//           <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl transition-all">
//             {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
//           </button>
//           <div className="px-5 py-2 bg-blue-600/10 text-blue-600 dark:bg-blue-600 dark:text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic">
//             {role} 
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-[1400px] mx-auto p-6 md:p-12">
        
//         {/* --- ROLE BASED HEADER --- */}
//         <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
//           <div className="flex gap-4 w-full lg:w-auto">
//             {role === 'admin' ? (
//               <h2 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter">SYSTEM <span className="text-blue-600">OVERVIEW</span></h2>
//             ) : role === 'patient' ? (
//               <h2 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter">MY <span className="text-blue-600">HEALTH RECORD</span></h2>
//             ) : (
//               <div className="flex bg-slate-200/50 dark:bg-white/5 p-1.5 rounded-[2.2rem] backdrop-blur-md">
//                 <button onClick={() => setActiveTab('appointments')} className={`px-8 py-4 rounded-[1.8rem] font-black text-xs transition-all ${activeTab === 'appointments' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>SCHEDULE</button>
//                 <button onClick={() => setActiveTab('patients')} className={`px-8 py-4 rounded-[1.8rem] font-black text-xs transition-all ${activeTab === 'patients' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>DATABASE</button>
//               </div>
//             )}
//           </div>

//           {role !== 'admin' && (
//             <div className="relative flex-1 max-w-2xl w-full group">
//               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
//               <input 
//                 type="text" 
//                 placeholder="Search history..." 
//                 className="w-full pl-16 pr-6 py-5 rounded-[2.2rem] bg-white dark:bg-[#0f172a] dark:text-white outline-none border border-slate-200 dark:border-white/5 font-bold focus:ring-4 focus:ring-blue-600/10 transition-all shadow-sm"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           )}
//         </div>

//         {/* --- CONTENT AREA --- */}
//         {loading ? (
//           <div className="py-40 text-center">
//             <Loader2 className="animate-spin mx-auto text-blue-600 mb-4" size={50} />
//             <p className="text-slate-400 font-black text-[10px] tracking-widest uppercase italic">Loading Records</p>
//           </div>
//         ) : role === 'admin' ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {adminCards.map((card, idx) => (
//               <div key={idx} className="bg-white dark:bg-[#0f172a]/40 p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-xl group">
//                 <div className="h-16 w-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
//                   {card.icon}
//                 </div>
//                 <h3 className="text-slate-400 font-black text-xs uppercase tracking-widest">{card.name}</h3>
//                 <p className="text-5xl font-black text-slate-900 dark:text-white mt-2 tracking-tighter">{card.value}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid gap-5">
//             {filteredData.length > 0 ? filteredData.map((item) => (
//               <div key={item._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[2.8rem] border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between hover:border-blue-500/50 transition-all group">
//                 <div className="flex items-center gap-6 w-full">
//                   <div className="h-16 w-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
//                     {role === 'patient' ? <BarChart3 size={30} /> : <User size={30} />}
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-black dark:text-white italic uppercase tracking-tight">
//                       {role === 'patient' ? "Medical File" : (item.name || item.patient?.name || 'Unknown')}
//                     </h3>
//                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-2">
//                       {role === 'patient' ? `Profile ID: ${item._id?.slice(-6)}` : `Reason: ${item.reason || 'Checkup'}`}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 mt-6 md:mt-0 w-full md:w-auto justify-end">
//                   {role === 'doctor' && (
//                     <button onClick={() => navigate(`/prescribe/${item._id}`)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] flex items-center gap-2">
//                       <FileText size={16} /> WRITE RX
//                     </button>
//                   )}
//                   <button 
//                     onClick={() => navigate(`/history/${role === 'patient' ? 'me' : item._id}`)} 
//                     className="bg-slate-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-black/10 transition-all"
//                   >
//                     {role === 'patient' ? 'View My Report' : 'History'}
//                   </button>
//                 </div>
//               </div>
//             )) : (
//               <div className="text-center py-24 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem] opacity-50">
//                 <p className="font-black text-xs uppercase tracking-widest text-slate-400 italic text-center">No Records Found</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
















// // doctor
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   User, Search, Activity, 
//   Loader2, Sun, Moon, FileText, UserRound, Users, BarChart3
// } from 'lucide-react';

// export default function Dashboard() {
//   const [data, setData] = useState([]); 
//   const [stats, setStats] = useState({ doctors: 0, patients: 0, staff: 0 });
//   const [activeTab, setActiveTab] = useState('appointments');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role')?.toLowerCase();

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', darkMode);
//     localStorage.setItem('theme', darkMode ? 'dark' : 'light');
//   }, [darkMode]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
      
//       // 1. ADMIN STATS
//       if (role === 'admin') {
//         const res = await API.get('/admin/stats');
//         if (res.data.success) setStats(res.data.data);
//         setLoading(false);
//         return;
//       }

//       // 2. ENDPOINT SELECTION (Matched with Backend)
//       let endpoint = '';
//       if (role === 'doctor') {
//         endpoint = activeTab === 'appointments' ? '/doctor/my-patients' : '/doctor/medical-history';
//       } else if (role === 'receptionist') {
//         endpoint = activeTab === 'appointments' ? '/receptionist/schedule' : '/receptionist/all-patients'; 
//       } else if (role === 'patient') {
//         endpoint = '/patients/my-dashboard'; 
//       }

//       if (!endpoint) return;

//       const res = await API.get(endpoint);
//       const fetchedData = res.data?.data || [];
      
//       setData(Array.isArray(fetchedData) ? fetchedData : [fetchedData]);

//     } catch (err) {
//       console.error("Dashboard Sync Error:", err);
//       toast.error(err.response?.data?.message || "Data Synchronization Failed");
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { 
//     if(role) fetchData(); 
//   }, [activeTab, role]);

//   const filteredData = data.filter(item => {
//     if(!item) return false;
//     // Robust name detection logic
//     const patientName = 
//       item.name || 
//       item.userId?.name || 
//       item.patient?.name || 
//       item.patient?.userId?.name || 
//       'Unknown Patient';
//     return patientName.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   const adminCards = [
//     { name: 'Total Doctors', value: stats.doctors, icon: <UserRound size={28} /> },
//     { name: 'Total Patients', value: stats.patients, icon: <Users size={28} /> },
//     { name: 'Reception Staff', value: stats.staff, icon: <Activity size={28} /> },
//   ];

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pb-20 font-sans transition-all duration-300">
//       <ToastContainer theme={darkMode ? "dark" : "light"} />

//       {/* --- NAVIGATION BAR --- */}
//       <nav className="h-24 bg-white dark:bg-[#0f172a] flex items-center justify-between px-6 md:px-14 border-b dark:border-white/5 sticky top-0 z-50 shadow-sm">
//         <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
//           <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-500/30"><Activity size={28} /></div>
//           <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">CLINIC <span className="text-blue-600">OS</span></h1>
//         </div>
//         <div className="flex items-center gap-5">
//           <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl transition-all hover:scale-105 active:scale-95">
//             {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
//           </button>
//           <div className="px-5 py-2 bg-blue-600/10 text-blue-600 dark:bg-blue-600 dark:text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-sm">
//             SECURED AS: {role} 
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-[1400px] mx-auto p-6 md:p-12">
        
//         {/* --- DYNAMIC HEADER & CONTROLS --- */}
//         <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
//           <div className="flex gap-4 w-full lg:w-auto">
//             {role === 'admin' ? (
//               <h2 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter">SYSTEM <span className="text-blue-600">ANALYTICS</span></h2>
//             ) : role === 'patient' ? (
//               <h2 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter">PERSONAL <span className="text-blue-600">HEALTH VAULT</span></h2>
//             ) : (
//               <div className="flex bg-slate-200/50 dark:bg-white/5 p-1.5 rounded-[2.2rem] backdrop-blur-md border border-white/5">
//                 <button onClick={() => setActiveTab('appointments')} className={`px-8 py-4 rounded-[1.8rem] font-black text-xs transition-all ${activeTab === 'appointments' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200'}`}>
//                   {role === 'doctor' ? 'PENDING QUEUE' : 'DAILY SCHEDULE'}
//                 </button>
//                 <button onClick={() => setActiveTab('patients')} className={`px-8 py-4 rounded-[1.8rem] font-black text-xs transition-all ${activeTab === 'patients' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200'}`}>
//                   {role === 'doctor' ? 'MEDICAL ARCHIVE' : 'PATIENT DATABASE'}
//                 </button>
//               </div>
//             )}
//           </div>

//           {role !== 'admin' && (
//             <div className="relative flex-1 max-w-2xl w-full group">
//               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
//               <input 
//                 type="text" 
//                 placeholder="Search encrypted records by name..." 
//                 className="w-full pl-16 pr-6 py-5 rounded-[2.2rem] bg-white dark:bg-[#0f172a] dark:text-white outline-none border border-slate-200 dark:border-white/5 font-bold focus:ring-4 focus:ring-blue-600/10 transition-all shadow-sm"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           )}
//         </div>

//         {/* --- DYNAMIC CONTENT RENDERER --- */}
//         {loading ? (
//           <div className="py-40 text-center">
//             <Loader2 className="animate-spin mx-auto text-blue-600 mb-4" size={50} />
//             <p className="text-slate-400 font-black text-[10px] tracking-widest uppercase italic animate-pulse">Syncing Cloud Resources...</p>
//           </div>
//         ) : role === 'admin' ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {adminCards.map((card, idx) => (
//               <div key={idx} className="bg-white dark:bg-[#0f172a]/40 p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-xl group hover:border-blue-500/30 transition-all">
//                 <div className="h-16 w-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
//                   {card.icon}
//                 </div>
//                 <h3 className="text-slate-400 font-black text-xs uppercase tracking-widest">{card.name}</h3>
//                 <p className="text-5xl font-black text-slate-900 dark:text-white mt-2 tracking-tighter">{card.value}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid gap-5">
//             {filteredData.length > 0 ? filteredData.map((item) => (
//               <div key={item.appointmentId || item._id} className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[2.8rem] border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between hover:border-blue-500/50 transition-all group shadow-sm hover:shadow-xl">
//                 <div className="flex items-center gap-6 w-full">
//                   <div className="h-16 w-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
//                     {role === 'patient' ? <BarChart3 size={30} /> : <User size={30} />}
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-black dark:text-white italic uppercase tracking-tight">
//                       {item.userId?.name || item.name || item.patient?.name || item.patient?.userId?.name || "Unknown Identity"}
//                     </h3>
//                     <div className="flex flex-wrap gap-3 mt-1.5">
//                       <span className="text-[10px] font-black px-4 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-500 rounded-full uppercase tracking-widest border border-black/5 dark:border-white/5">
//                          LOG: {item.reason || "Routine Diagnostic"}
//                       </span>
//                       {item.date && (
//                          <span className="text-[10px] font-black px-4 py-1.5 bg-blue-600/5 text-blue-600 rounded-full uppercase tracking-widest border border-blue-600/10">
//                             SCHEDULED: {new Date(item.date).toLocaleDateString()}
//                          </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 mt-6 md:mt-0 w-full md:w-auto justify-end">
//                   {/* Action: Prescription (Doctor Only) */}
//                   {role === 'doctor' && activeTab === 'appointments' && (
//                     <button 
//                       onClick={() => navigate(`/prescribe/${item._id || item.patient?._id}`, { state: { patient: item } })} 
//                       className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
//                     >
//                       <FileText size={16} /> INITIALIZE RX
//                     </button>
//                   )}
                  
//                   {/* Action: History Tracking */}
//                   <button 
//                      onClick={() => navigate(`/history/${role === 'patient' ? 'me' : (item.patient?._id || item._id)}`)} 
                   
//                     className="bg-slate-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-blue-600 hover:text-white transition-all active:scale-95"
//                   >
//                     {role === 'patient' ? 'OPEN HEALTH FILE' : 'VIEW HISTORY'}
//                   </button>
//                 </div>
//               </div>
//             )) : (
//               <div className="text-center py-24 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem] opacity-40">
//                 <p className="font-black text-xs uppercase tracking-widest text-slate-400 italic">No Encrypted Records Located</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



























import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../util/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  User, Search, Activity, 
  Loader2, Sun, Moon, FileText, UserRound, Users, BarChart3, ChevronRight
} from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState([]); 
  const [stats, setStats] = useState({ doctors: 0, patients: 0, staff: 0 });
  const [activeTab, setActiveTab] = useState('appointments');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  
  const navigate = useNavigate();
  const role = localStorage.getItem('role')?.toLowerCase();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (role === 'admin') {
        const res = await API.get('/admin/stats');
        if (res.data.success) setStats(res.data.data);
        return;
      }

      let endpoint = '';
      if (role === 'doctor') {
        endpoint = activeTab === 'appointments' ? '/doctor/my-patients' : '/doctor/medical-history';
      } else if (role === 'receptionist') {
        endpoint = activeTab === 'appointments' ? '/receptionist/schedule' : '/receptionist/all-patients'; 
      } else if (role === 'patient') {
        endpoint = '/patients/my-dashboard'; 
      }

      if (!endpoint) return;
      const res = await API.get(endpoint);
      const fetchedData = res.data?.data || [];
      setData(Array.isArray(fetchedData) ? fetchedData : [fetchedData]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Data Synchronization Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if(role) fetchData(); }, [activeTab, role]);

  const filteredData = data.filter(item => {
    if(!item) return false;
    const patientName = item.name || item.userId?.name || item.patient?.name || item.patient?.userId?.name || 'Unknown Patient';
    return patientName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const adminCards = [
    { name: 'Total Doctors', value: stats.doctors, icon: <UserRound size={28} /> },
    { name: 'Total Patients', value: stats.patients, icon: <Users size={28} /> },
    { name: 'Reception Staff', value: stats.staff, icon: <Activity size={28} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pb-20 font-sans transition-all duration-500">
      <ToastContainer theme={darkMode ? "dark" : "light"} />

      {/* --- NAVIGATION BAR --- */}
      <nav className="h-24 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-14 border-b dark:border-white/5 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform duration-300">
            <Activity size={28} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">
            CLINIC <span className="text-blue-600 group-hover:pl-1 transition-all">OS</span>
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl transition-all hover:bg-blue-600/10 group">
            {darkMode ? <Sun size={20} className="text-yellow-400 group-hover:rotate-90 transition-transform" /> : <Moon size={20} className="text-slate-600" />}
          </button>
          <div className="hidden md:flex px-5 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] italic shadow-lg shadow-blue-600/20">
            SECURED: {role} 
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto p-6 md:p-12">
        
        {/* --- DYNAMIC HEADER & TAB POINTER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-8">
          <div className="flex gap-4 w-full lg:w-auto">
            {role === 'admin' ? (
              <h2 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter">SYSTEM <span className="text-blue-600">ANALYTICS</span></h2>
            ) : role === 'patient' ? (
              <h2 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter">HEALTH <span className="text-blue-600">VAULT</span></h2>
            ) : (
              <div className="flex bg-slate-200/50 dark:bg-white/5 p-1.5 rounded-[2.2rem] backdrop-blur-md border border-slate-200/50 dark:border-white/10 shadow-inner">
                {['appointments', 'patients'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)} 
                    className={`px-8 py-4 rounded-[1.8rem] font-black text-[11px] uppercase tracking-widest transition-all duration-300 
                      ${activeTab === tab 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 scale-105 cursor-poinier' 
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/5 cursor-poinier'}`}
                  >
                    {tab === 'appointments' ? (role === 'doctor' ? 'Queue' : 'Schedule') : (role === 'doctor' ? 'Archive' : 'Database')}
                  </button>
                ))}
              </div>
            )}
          </div>

          {role !== 'admin' && (
            <div className="relative flex-1 max-w-2xl w-full group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 group-focus-within:scale-110 transition-all" size={20} />
              <input 
                type="text" 
                placeholder="Search encrypted records..." 
                className="w-full pl-16 pr-6 py-5 rounded-[2.2rem] bg-white dark:bg-[#0f172a] dark:text-white outline-none border-2 border-transparent focus:border-blue-600/20 font-bold focus:ring-8 focus:ring-blue-600/5 transition-all shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* --- DYNAMIC CONTENT --- */}
        {loading ? (
          <div className="py-40 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="relative inline-block">
                <Loader2 className="animate-spin text-blue-600 relative z-10" size={60} />
                <div className="absolute inset-0 bg-blue-600/20 blur-2xl animate-pulse"></div>
            </div>
            <p className="text-slate-400 font-black text-[10px] tracking-[0.5em] uppercase italic mt-6">Decrypting Resources...</p>
          </div>
        ) : role === 'admin' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adminCards.map((card, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a]/40 p-10 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-xl group hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-500">
                <div className="h-16 w-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                  {card.icon}
                </div>
                <h3 className="text-slate-400 font-black text-[11px] uppercase tracking-widest">{card.name}</h3>
                <p className="text-6xl font-black text-slate-900 dark:text-white mt-2 tracking-tighter italic">{card.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredData.length > 0 ? filteredData.map((item) => (
              <div key={item.appointmentId || item._id} className="bg-white dark:bg-[#0f172a]/40 p-7 rounded-[3rem] border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between hover:border-blue-500/50 transition-all duration-300 group shadow-sm hover:shadow-2xl hover:scale-[1.01]">
                <div className="flex items-center gap-7 w-full">
                  <div className="h-20 w-20 bg-slate-50 dark:bg-white/5 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-3 transition-all shadow-inner">
                    {role === 'patient' ? <BarChart3 size={35} /> : <User size={35} />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black dark:text-white italic uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {item.userId?.name || item.name || item.patient?.name || item.patient?.userId?.name || "Unknown Identity"}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <span className="text-[10px] font-black px-4 py-2 bg-slate-100 dark:bg-white/5 text-slate-500 rounded-full uppercase tracking-widest">
                        LOG: {item.reason || "General Checkup"}
                      </span>
                      {item.date && (
                        <span className="text-[10px] font-black px-4 py-2 bg-blue-600/5 text-blue-600 rounded-full uppercase tracking-widest border border-blue-600/10">
                          {new Date(item.date).toLocaleDateString('en-GB')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8 md:mt-0 w-full md:w-auto justify-end">
                  {role === 'doctor' && activeTab === 'appointments' && (
                    <button 
                      onClick={() => navigate(`/prescribe/${item._id || item.patient?._id}`, { state: { patient: item } })} 
                      className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] flex items-center gap-3 hover:bg-slate-900 transition-all shadow-lg shadow-blue-500/20 active:scale-95 uppercase tracking-widest cursor-pointer"
                    >
                      <FileText size={16} /> Prescribe
                    </button>
                  )}
                  <button 
                    onClick={() => navigate(`/history/${role === 'patient' ? 'me' : (item.patient?._id || item._id)}`)} 
                    className="group/btn bg-slate-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    {role === 'patient' ? 'Access File' : 'Records'}
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )) : (
              <div className="text-center py-32 border-4 border-dashed border-slate-100 dark:border-white/5 rounded-[4rem] animate-pulse">
                <p className="font-black text-xs uppercase tracking-[0.5em] text-slate-400 italic">Empty Vault Segment</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}