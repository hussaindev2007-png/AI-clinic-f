// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import API from '../util/api';
// // --- Toastify Imports ---
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // --- Icons ---
// import { Search, User, ChevronRight, Users, Loader2, Database, Fingerprint } from 'lucide-react';

// export default function PatientsList() {
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Common Toast Styling
//   const toastOptions = { theme: "light", position: "top-right" };

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const res = await API.get('/patients/all');
//         setPatients(res.data.data);
//       } catch (err) {
//         console.error("System Error:", err);
//         toast.error("Critical: Could not connect to clinical database.", toastOptions);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPatients();
//   }, []);

//   const filteredPatients = patients.filter(p => 
//     p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     p.phone.includes(searchTerm)
//   );

//   if (loading) return (
//     <div className="flex flex-col items-center justify-center py-40 gap-4">
//       <Loader2 className="animate-spin text-indigo-600" size={48} />
//       <p className="font-black text-indigo-600 uppercase tracking-[0.3em] text-[10px]">Syncing Archives...</p>
//     </div>
//   );

//   return (
//     <div className="max-w-5xl mx-auto p-4 lg:p-10 font-sans">
//       {/* Toastify Container */}
//       <ToastContainer theme="light" />

//       {/* Header Section */}
//       <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
//         <div>
//           <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4 italic uppercase tracking-tighter">
//             <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
//                 <Users size={28} />
//             </div>
//             Medical <span className="text-indigo-600">Archives</span>
//           </h2>
//           <p className="text-slate-400 font-bold mt-3 uppercase text-[10px] tracking-[0.2em] leading-loose">
//             Access secure patient profiles and longitudinal clinical history
//           </p>
//         </div>
//         <div className="bg-white px-6 py-2 rounded-2xl border border-slate-100 shadow-sm">
//             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global Records</p>
//             <p className="text-2xl font-black text-indigo-600 italic">{patients.length}</p>
//         </div>
//       </header>
      
//       {/* Search Interface */}
//       <div className="relative mb-10 group">
//         <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
//             <Search className="text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={22} />
//             <div className="h-4 w-[1px] bg-slate-200"></div>
//         </div>
//         <input 
//           type="text" 
//           placeholder="Search by Name, Phone, or Patient ID..." 
//           className="w-full p-7 pl-20 rounded-[2.5rem] border-2 border-transparent shadow-2xl shadow-indigo-100/40 focus:border-indigo-500 outline-none transition-all bg-white font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-medium"
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
//             <Database className="text-slate-100" size={32} />
//         </div>
//       </div>

//       {/* Results Grid */}
//       <div className="grid gap-5">
//         {filteredPatients.length > 0 ? (
//           filteredPatients.map((patient, index) => (
//             <Link 
//               key={patient._id} 
//               to={`/history/${patient._id}`}
//               className="flex items-center justify-between bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-indigo-100 transition-all border border-white hover:border-indigo-100 group animate-in fade-in slide-in-from-bottom-4"
//               style={{ animationDelay: `${index * 50}ms` }}
//             >
//               <div className="flex items-center gap-6">
//                 <div className="h-16 w-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
//                   <User size={30} />
//                 </div>
//                 <div>
//                   <h4 className="font-black text-slate-900 text-xl tracking-tight group-hover:text-indigo-700 transition-colors italic uppercase">
//                     {patient.name}
//                   </h4>
//                   <div className="flex flex-wrap items-center gap-3 mt-2">
//                     <span className="flex items-center gap-1.5 text-[9px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-black uppercase tracking-tighter border border-indigo-100">
//                       <Fingerprint size={10} /> {patient._id.slice(-8).toUpperCase()}
//                     </span>
//                     <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
//                       {patient.phone}
//                     </span>
//                     <span className="text-[10px] text-slate-300 font-bold">• {patient.gender}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 text-indigo-600 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-6 group-hover:translate-x-0">
//                 Open Dossier <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
//               </div>
//             </Link>
//           ))
//         ) : (
//           <div className="bg-white p-20 rounded-[4rem] text-center border-4 border-dashed border-slate-50">
//             <Database size={60} className="mx-auto text-slate-100 mb-6" />
//             <p className="text-slate-400 italic font-black uppercase tracking-widest text-xs">Zero Matches in Clinical Registry</p>
//           </div>
//         )}
//       </div>

//       <footer className="mt-20 text-center opacity-20 py-10">
//           <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">Authorized Medical Personnel Only</p>
//       </footer>
//     </div>
//   );
// }









// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import API from '../util/api';
// // --- Toastify Imports ---
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // --- Icons ---
// import { Search, User, ChevronRight, Users, Loader2, Database, Fingerprint } from 'lucide-react';

// export default function PatientsList() {
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   // System preference detection for Toast
//   const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const toastOptions = { theme: isDarkMode ? "dark" : "light", position: "top-right" };

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const res = await API.get('/patients/all');
//         setPatients(res.data.data);
//       } catch (err) {
//         console.error("System Error:", err);
//         toast.error("Critical: Could not connect to clinical database.", toastOptions);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPatients();
//   }, []);

//   const filteredPatients = patients.filter(p => 
//     p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     p.phone.includes(searchTerm)
//   );

//   if (loading) return (
//     <div className="flex flex-col items-center justify-center py-40 gap-4 bg-slate-50 dark:bg-[#080b14] min-h-screen transition-colors duration-300">
//       <Loader2 className="animate-spin text-indigo-600 dark:text-indigo-500" size={48} />
//       <p className="font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] text-[10px]">Syncing Archives...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] transition-colors duration-300">
//       <div className="max-w-5xl mx-auto p-4 lg:p-10 font-sans">
//         {/* Toastify Container */}
//         <ToastContainer theme={isDarkMode ? "dark" : "light"} />

//         {/* Header Section */}
//         <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
//           <div>
//             <h2 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-4 italic uppercase tracking-tighter">
//               <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 dark:shadow-none">
//                   <Users size={28} />
//               </div>
//               Medical <span className="text-indigo-600 dark:text-indigo-400">Archives</span>
//             </h2>
//             <p className="text-slate-400 dark:text-slate-500 font-bold mt-3 uppercase text-[10px] tracking-[0.2em] leading-loose">
//               Access secure patient profiles and longitudinal clinical history
//             </p>
//           </div>
//           <div className="bg-white dark:bg-[#1e293b]/50 px-6 py-2 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
//               <p className="text-[10px] font-black text-slate-300 dark:text-slate-500 uppercase tracking-widest">Global Records</p>
//               <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 italic">{patients.length}</p>
//           </div>
//         </header>
        
//         {/* Search Interface */}
//         <div className="relative mb-10 group">
//           <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
//               <Search className="text-slate-300 dark:text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={22} />
//               <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
//           </div>
//           <input 
//             type="text" 
//             placeholder="Search by Name, Phone, or Patient ID..." 
//             className="w-full p-7 pl-20 rounded-[2.5rem] border-2 border-transparent shadow-2xl shadow-indigo-100/40 dark:shadow-none focus:border-indigo-500 outline-none transition-all bg-white dark:bg-[#1e293b]/50 dark:text-white font-bold text-slate-700 placeholder:text-slate-300 dark:placeholder:text-slate-600"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
//               <Database className="text-slate-100 dark:text-slate-800" size={32} />
//           </div>
//         </div>

//         {/* Results Grid */}
//         <div className="grid gap-5">
//           {filteredPatients.length > 0 ? (
//             filteredPatients.map((patient, index) => (
//               <Link 
//                 key={patient._id} 
//                 to={`/history/${patient._id}`}
//                 className="flex items-center justify-between bg-white dark:bg-[#0f172a]/40 p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/30 dark:shadow-none hover:shadow-2xl hover:shadow-indigo-100 dark:hover:bg-[#1e293b]/60 transition-all border border-white dark:border-white/5 hover:border-indigo-100 dark:hover:border-indigo-500/50 group animate-in fade-in slide-in-from-bottom-4"
//                 style={{ animationDelay: `${index * 50}ms` }}
//               >
//                 <div className="flex items-center gap-6">
//                   <div className="h-16 w-16 bg-slate-50 dark:bg-black/20 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
//                     <User size={30} />
//                   </div>
//                   <div>
//                     <h4 className="font-black text-slate-900 dark:text-white text-xl tracking-tight group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors italic uppercase">
//                       {patient.name}
//                     </h4>
//                     <div className="flex flex-wrap items-center gap-3 mt-2">
//                       <span className="flex items-center gap-1.5 text-[9px] bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full font-black uppercase tracking-tighter border border-indigo-100 dark:border-indigo-500/20">
//                         <Fingerprint size={10} /> {patient._id.slice(-8).toUpperCase()}
//                       </span>
//                       <span className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
//                         {patient.phone}
//                       </span>
//                       <span className="text-[10px] text-slate-300 dark:text-slate-600 font-bold">• {patient.gender}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-6 group-hover:translate-x-0">
//                   Open Dossier <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <div className="bg-white dark:bg-transparent p-20 rounded-[4rem] text-center border-4 border-dashed border-slate-50 dark:border-slate-800/50">
//               <Database size={60} className="mx-auto text-slate-100 dark:text-slate-800 mb-6" />
//               <p className="text-slate-400 dark:text-slate-600 italic font-black uppercase tracking-widest text-xs">Zero Matches in Clinical Registry</p>
//             </div>
//           )}
//         </div>

//         <footer className="mt-20 text-center opacity-20 py-10">
//             <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">Authorized Medical Personnel Only</p>
//         </footer>
//       </div>
//     </div>
//   );
// }
























// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Search, User, ChevronRight, Loader2, Database, CalendarCheck, CheckCircle2 } from 'lucide-react';

// export default function MedicalHistoryList() {
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const toastOptions = { theme: isDarkMode ? "dark" : "light", position: "top-right" };

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         setLoading(true);
//         // UPDATED: Ab ye completed history mang raha hai
//         const res = await API.get('/doctor/medical-history'); 
//         setPatients(res.data.data || []);
//       } catch (err) {
//         console.error("Fetch Error:", err);
//         toast.error("Failed to load medical history.", toastOptions);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHistory();
//   }, []);

//   const filteredPatients = patients.filter(p => 
//     p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     p.phone?.includes(searchTerm) ||
//     p._id?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return (
//     <div className="flex flex-col items-center justify-center py-40 gap-4 bg-slate-50 dark:bg-[#080b14] min-h-screen">
//       <Loader2 className="animate-spin text-indigo-600 dark:text-indigo-500" size={48} />
//       <p className="font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] text-[10px]">Retrieving Clinical Records...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] transition-colors duration-300">
//       <div className="max-w-5xl mx-auto p-4 lg:p-10 font-sans">
//         <ToastContainer theme="dark" />

//         {/* Header Section */}
//         <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
//           <div>
//             <h2 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-4 italic uppercase tracking-tighter">
//               <div className="h-12 w-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
//                   <CheckCircle2 size={28} />
//               </div>
//               Medical <span className="text-emerald-600 dark:text-emerald-400">History</span>
//             </h2>
//             <p className="text-slate-400 dark:text-slate-500 font-bold mt-3 uppercase text-[10px] tracking-[0.2em] leading-loose">
//               Archive of patients successfully consulted and committed
//             </p>
//           </div>
//           <div className="bg-white dark:bg-[#1e293b]/50 px-6 py-2 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm text-right">
//               <p className="text-[10px] font-black text-slate-300 dark:text-slate-500 uppercase tracking-widest">Total Records</p>
//               <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 italic">{patients.length}</p>
//           </div>
//         </header>
        
//         {/* Search Interface */}
//         <div className="relative mb-10 group">
//           <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
//               <Search className="text-slate-300 dark:text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={22} />
//               <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
//           </div>
//           <input 
//             type="text" 
//             placeholder="Search within medical records..." 
//             className="w-full p-7 pl-20 rounded-[2.5rem] border-2 border-transparent shadow-2xl shadow-emerald-100/40 dark:shadow-none focus:border-emerald-500 outline-none transition-all bg-white dark:bg-[#1e293b]/50 dark:text-white font-bold text-slate-700 placeholder:text-slate-300 dark:placeholder:text-slate-600"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Results Grid */}
//         <div className="grid gap-5">
//           {filteredPatients.length > 0 ? (
//             filteredPatients.map((patient, index) => (
//               <Link 
//                 key={patient._id} 
//                 to={`/patient-history/${patient._id}`} // Updated link to detailed history
//                 className="flex items-center justify-between bg-white dark:bg-[#0f172a]/40 p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/30 dark:shadow-none hover:shadow-2xl hover:shadow-emerald-100 dark:hover:bg-[#1e293b]/60 transition-all border border-white dark:border-white/5 group animate-in fade-in slide-in-from-bottom-4"
//                 style={{ animationDelay: `${index * 50}ms` }}
//               >
//                 <div className="flex items-center gap-6">
//                   <div className="h-16 w-16 bg-slate-50 dark:bg-black/20 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner">
//                     <User size={30} />
//                   </div>
//                   <div>
//                     <h4 className="font-black text-slate-900 dark:text-white text-xl tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors italic uppercase">
//                       {patient.name}
//                     </h4>
//                     <div className="flex flex-wrap items-center gap-3 mt-2">
//                       <span className="flex items-center gap-1.5 text-[9px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full font-black uppercase tracking-tighter border border-emerald-100 dark:border-emerald-500/20">
//                         <span className="opacity-60">Age: </span>
//                         <span className="font-extrabold">{patient.age} Y</span>
//                         <span className="mx-0.5 text-emerald-200 dark:text-emerald-800">|</span>
//                         <span className="opacity-60">Gender:</span>
//                         <span className="font-extrabold">{patient.gender?.toUpperCase() || "N/A"}</span>
//                       </span>
//                       <span className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
//                         {patient.phone || "No Contact"}
//                       </span>
//                       <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
//                         <CheckCircle2 size={10} /> Checked Out
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-6 group-hover:translate-x-0">
//                   View Prescription <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <div className="bg-white dark:bg-transparent p-20 rounded-[4rem] text-center border-4 border-dashed border-slate-50 dark:border-slate-800/50">
//               <Database size={60} className="mx-auto text-slate-100 dark:text-slate-800 mb-6" />
//               <p className="text-slate-400 dark:text-slate-600 italic font-black uppercase tracking-widest text-xs">No Committed Records Found</p>
//             </div>
//           )}
//         </div>

//         <footer className="mt-20 text-center opacity-20 py-10">
//             <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500 italic">Secure Archive Channel — Read Only</p>
//         </footer>
//       </div>
//     </div>
//   );
// }

























import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../util/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search, User, ChevronRight, Loader2, Database, CheckCircle2 } from 'lucide-react';

export default function MedicalHistoryList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const toastOptions = { theme: isDarkMode ? "dark" : "light", position: "top-right" };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await API.get('/doctor/medical-history'); 
        setPatients(res.data.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load medical history.", toastOptions);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone?.includes(searchTerm) ||
    p._id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-4 bg-slate-50 dark:bg-[#080b14] min-h-screen">
      <Loader2 className="animate-spin text-indigo-600 dark:text-indigo-500" size={48} />
      <p className="font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] text-[10px]">Retrieving Clinical Records...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] transition-colors duration-300">
      <div className="max-w-5xl mx-auto p-4 lg:p-10 font-sans">
        <ToastContainer {...toastOptions} />

        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-4 italic uppercase tracking-tighter">
              <div className="h-12 w-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <CheckCircle2 size={28} />
              </div>
              Medical <span className="text-emerald-600 dark:text-emerald-400">History</span>
            </h2>
            <p className="text-slate-400 dark:text-slate-500 font-bold mt-3 uppercase text-[10px] tracking-[0.2em] leading-loose">
              Archive of patients successfully consulted and committed
            </p>
          </div>
          <div className="bg-white dark:bg-[#1e293b]/50 px-6 py-2 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm text-right">
              <p className="text-[10px] font-black text-slate-300 dark:text-slate-500 uppercase tracking-widest">Total Records</p>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 italic">{patients.length}</p>
          </div>
        </header>
        
        {/* Search Interface */}
        <div className="relative mb-10 group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <Search className="text-slate-300 dark:text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={22} />
              <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
          </div>
          <input 
            type="text" 
            placeholder="Search within medical records..." 
            className="w-full p-7 pl-20 rounded-[2.5rem] border-2 border-transparent shadow-2xl shadow-emerald-100/40 dark:shadow-none focus:border-emerald-500 outline-none transition-all bg-white dark:bg-[#1e293b]/50 dark:text-white font-bold text-slate-700 placeholder:text-slate-300 dark:placeholder:text-slate-600"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Results Grid */}
        <div className="grid gap-5">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient, index) => (
              <Link 
                key={patient._id} 
                to={`/patient-history/${patient._id}`} 
                className="flex items-center justify-between bg-white dark:bg-[#0f172a]/40 p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/30 dark:shadow-none hover:shadow-2xl hover:shadow-emerald-100 dark:hover:bg-[#1e293b]/60 transition-all border border-white dark:border-white/5 group animate-in fade-in slide-in-from-bottom-4 cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 bg-slate-50 dark:bg-black/20 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner cursor-pointer">
                    <User size={30} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-xl tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors italic uppercase cursor-pointer">
                      {patient.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="flex items-center gap-1.5 text-[9px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full font-black uppercase tracking-tighter border border-emerald-100 dark:border-emerald-500/20 cursor-default">
                        <span className="opacity-60">Age: </span>
                        <span className="font-extrabold">{patient.age} Y</span>
                        <span className="mx-0.5 text-emerald-200 dark:text-emerald-800">|</span>
                        <span className="opacity-60">Gender:</span>
                        <span className="font-extrabold">{patient.gender?.toUpperCase() || "N/A"}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest cursor-default">
                        {patient.phone || "No Contact"}
                      </span>
                      <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1 cursor-default">
                        <CheckCircle2 size={10} /> Checked Out
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-6 group-hover:translate-x-0 cursor-pointer">
                  View Prescription <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform cursor-pointer" />
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-white dark:bg-transparent p-20 rounded-[4rem] text-center border-4 border-dashed border-slate-50 dark:border-slate-800/50">
              <Database size={60} className="mx-auto text-slate-100 dark:text-slate-800 mb-6" />
              <p className="text-slate-400 dark:text-slate-600 italic font-black uppercase tracking-widest text-xs">No Committed Records Found</p>
            </div>
          )}
        </div>

        <footer className="mt-20 text-center opacity-20 py-10">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500 italic">Secure Archive Channel — Read Only</p>
        </footer>
      </div>
    </div>
  );
}