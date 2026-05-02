// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../util/api';
// // --- Toastify Imports ---
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // --- Icons ---
// import { User, Save, XCircle, Loader2, Phone, Activity, ChevronLeft, ShieldCheck } from 'lucide-react';

// export default function EditPatient() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [formData, setFormData] = useState({ name: '', age: '', gender: 'Male', phone: '', disease: '' });

//   // Common Toast Styling
//   const toastOptions = { theme: "light", position: "top-right" };

//   useEffect(() => {
//     const fetchPatient = async () => {
//       try {
//         const res = await API.get(`/patients/${id}`);
//         // API response structure handle karein (res.data.data)
//         const patientData = res.data.data || res.data;
//         setFormData({
//           name: patientData.name || '',
//           age: patientData.age || '',
//           gender: patientData.gender || 'Male',
//           phone: patientData.phone || '',
//           disease: patientData.disease || ''
//         });
//       } catch (err) {
//         toast.error("Critical: Clinical data retrieval failed.", toastOptions);
//         setTimeout(() => navigate('/dashboard'), 2000);
//       } finally { 
//         setLoading(false); 
//       }
//     };
//     fetchPatient();
//   }, [id, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     const updateToast = toast.loading("Updating Clinical Record...", { theme: "light" });

//     try {
//       await API.put(`/patients/update/${id}`, formData);
//       toast.update(updateToast, { 
//         render: "Profile Synchronized Successfully! ✅", 
//         type: "success", 
//         isLoading: false, 
//         autoClose: 2000,
//         theme: "light"
//       });
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } catch (err) {
//       toast.update(updateToast, { 
//         render: "Update Denied: System Integrity Error.", 
//         type: "error", 
//         isLoading: false, 
//         autoClose: 3000,
//         theme: "light"
//       });
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
//         <Loader2 className="animate-spin text-indigo-600" size={48} />
//         <p className="font-black text-slate-400 uppercase tracking-[0.4em] text-[10px]">Accessing Record #{id?.slice(-6)}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f8fafc] p-6 flex flex-col items-center justify-center font-sans">
//       <ToastContainer theme="light" />

//       <div className="max-w-2xl w-full">
//         {/* Navigation Header */}
//         <button 
//           onClick={() => navigate(-1)} 
//           className="mb-8 flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-indigo-600 transition-all group"
//         >
//           <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:shadow-md">
//             <ChevronLeft size={18} />
//           </div>
//           Cancel Modification
//         </button>

//         <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-indigo-100/50 border border-white relative overflow-hidden">
//           {/* Decorative Security Icon */}
//           <ShieldCheck className="absolute -top-10 -right-10 text-slate-50" size={250} />

//           <div className="relative z-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="h-14 w-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200 transform -rotate-3">
//                 <User size={28} />
//               </div>
//               <div>
//                 <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">Update <span className="text-indigo-600">Dossier</span></h2>
//                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Modifying Secure Patient Metadata</p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Name Input */}
//               <div className="relative group">
//                 <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
//                 <input 
//                   type="text" 
//                   className="w-full p-5 pl-14 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner" 
//                   value={formData.name} 
//                   onChange={(e) => setFormData({...formData, name: e.target.value})} 
//                   placeholder="Patient Full Name" 
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 {/* Age Input */}
//                 <input 
//                   type="number" 
//                   className="p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner" 
//                   value={formData.age} 
//                   onChange={(e) => setFormData({...formData, age: e.target.value})} 
//                   placeholder="Age" 
//                   required
//                 />
//                 {/* Gender Select */}
//                 <select 
//                   className="p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-600 transition-all shadow-inner cursor-pointer appearance-none" 
//                   value={formData.gender} 
//                   onChange={(e) => setFormData({...formData, gender: e.target.value})}
//                 >
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               {/* Phone Input */}
//               <div className="relative group">
//                 <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
//                 <input 
//                   type="text" 
//                   className="w-full p-5 pl-14 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner" 
//                   value={formData.phone} 
//                   onChange={(e) => setFormData({...formData, phone: e.target.value})} 
//                   placeholder="Contact Number" 
//                   required
//                 />
//               </div>

//               {/* Diagnosis/Disease Input */}
//               <div className="relative group">
//                 <Activity className="absolute left-5 top-6 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
//                 <textarea 
//                   className="w-full p-5 pl-14 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner h-32" 
//                   value={formData.disease} 
//                   onChange={(e) => setFormData({...formData, disease: e.target.value})} 
//                   placeholder="Primary Diagnosis / Active Condition" 
//                   required
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-4 pt-6">
//                 <button 
//                   disabled={updating}
//                   type="submit" 
//                   className="flex-[2] py-6 bg-indigo-600 text-white rounded-[1.8rem] font-black text-lg uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-95 flex items-center justify-center gap-3"
//                 >
//                   {updating ? <Loader2 className="animate-spin" /> : <Save size={20} />}
//                   {updating ? "Syncing..." : "Commit Changes"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
        
//         <p className="mt-8 text-center text-slate-300 font-black text-[9px] uppercase tracking-[0.4em]">Clinic OS • Secure Modification Protocol</p>
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
//   User, Save, Loader2, Phone, Activity, ChevronLeft, 
//   ShieldCheck, Hash, Layers, Sparkles 
// } from 'lucide-react';

// export default function EditPatient() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [formData, setFormData] = useState({ name: '', age: '', gender: 'Male', phone: '', disease: '' });
  
//   // System theme check for Toastify
//   const [isDark, setIsDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

//   useEffect(() => {
//     // Listen for system theme changes
//     const matcher = window.matchMedia('(prefers-color-scheme: dark)');
//     const onChange = (e) => setIsDark(e.matches);
//     matcher.addEventListener('change', onChange);
    
//     const fetchPatient = async () => {
//       try {
//         const res = await API.get(`/patients/${id}`);
//         const patientData = res.data.data || res.data;
//         setFormData({
//           name: patientData.name || '',
//           age: patientData.age || '',
//           gender: patientData.gender || 'Male',
//           phone: patientData.phone || '',
//           disease: patientData.disease || ''
//         });
//       } catch (err) {
//         toast.error("Critical: Data retrieval failed.", { theme: isDark ? "dark" : "light" });
//         setTimeout(() => navigate('/dashboard'), 2000);
//       } finally { 
//         setLoading(false); 
//       }
//     };
//     fetchPatient();
//     return () => matcher.removeEventListener('change', onChange);
//   }, [id, navigate, isDark]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     const updateToast = toast.loading("Updating Record...", { theme: isDark ? "dark" : "light" });

//     try {
//       await API.put(`/patients/update/${id}`, formData);
//       toast.update(updateToast, { 
//         render: "Synchronized Successfully! ✅", 
//         type: "success", 
//         isLoading: false, 
//         autoClose: 2000,
//         theme: isDark ? "dark" : "light"
//       });
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } catch (err) {
//       toast.update(updateToast, { 
//         render: "Update Denied: System Error.", 
//         type: "error", 
//         isLoading: false, 
//         autoClose: 3000,
//         theme: isDark ? "dark" : "light"
//       });
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#020617] gap-6 transition-colors duration-500">
//         <Loader2 className="animate-spin text-indigo-500" size={60} />
//         <p className="font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em] text-[10px]">Decrypting Record</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] flex flex-col items-center justify-center p-6 font-sans transition-colors duration-500">
//       <ToastContainer theme={isDark ? "dark" : "light"} />

//       {/* Background Glows (Hidden in Light, subtle in Dark) */}
//       <div className="fixed inset-0 pointer-events-none -z-10">
//         <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/5 dark:bg-indigo-600/10 blur-[120px] rounded-full"></div>
//         <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 blur-[150px] rounded-full"></div>
//       </div>

//       <div className="max-w-2xl w-full">
//         <button 
//           onClick={() => navigate(-1)} 
//           className="mb-8 flex items-center gap-3 text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] hover:text-indigo-500 transition-all group"
//         >
//           <div className="h-10 w-10 bg-white dark:bg-white/5 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/5 shadow-sm group-hover:border-indigo-500/50 transition-all">
//             <ChevronLeft size={18} />
//           </div>
//           Cancel Modification
//         </button>

//         <div className="bg-white dark:bg-[#050810]/80 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 relative overflow-hidden group transition-all">
          
//           <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 group-hover:opacity-20 transition-opacity">
//             <Sparkles size={80} className="text-indigo-500" />
//           </div>

//           <div className="relative z-10">
//             <div className="flex items-center gap-5 mb-12">
//               <div className="h-16 w-16 bg-indigo-600 rounded-[1.8rem] flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
//                 <User size={32} />
//               </div>
//               <div>
//                 <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter italic uppercase leading-none">
//                   Edit <span className="text-indigo-500">Dossier</span>
//                 </h2>
//                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 mt-2">
//                    <ShieldCheck size={12} className="text-indigo-400" /> ID: {id?.slice(-8).toUpperCase()}
//                 </p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Full Identity</label>
//                 <div className="relative">
//                   <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
//                   <input 
//                     type="text" value={formData.name}
//                     className="w-full p-5 pl-16 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-white/[0.05] font-bold text-slate-700 dark:text-white transition-all shadow-inner" 
//                     onChange={(e) => setFormData({...formData, name: e.target.value})} required 
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Age</label>
//                   <div className="relative">
//                     <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
//                     <input 
//                       type="text" value={formData.age}
//                       className="w-full p-5 pl-16 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 dark:text-white transition-all shadow-inner" 
//                       onChange={(e) => setFormData({...formData, age: e.target.value.replace(/\D/g, "")})} required 
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Gender</label>
//                   <div className="relative">
//                     <Layers className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
//                     <select 
//                       className="w-full p-5 pl-16 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 dark:text-white transition-all cursor-pointer appearance-none shadow-inner" 
//                       value={formData.gender}
//                       onChange={(e) => setFormData({...formData, gender: e.target.value})}
//                     >
//                       <option value="Male" className="bg-white dark:bg-[#050810]">Male</option>
//                       <option value="Female" className="bg-white dark:bg-[#050810]">Female</option>
//                       <option value="Other" className="bg-white dark:bg-[#050810]">Other</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Contact String</label>
//                 <div className="relative">
//                   <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
//                   <input 
//                     type="text" value={formData.phone}
//                     className="w-full p-5 pl-16 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 dark:text-white transition-all shadow-inner" 
//                     onChange={(e) => setFormData({...formData, phone: e.target.value})} required 
//                   />
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Active Condition</label>
//                 <div className="relative">
//                   <Activity className="absolute left-6 top-6 text-slate-300 dark:text-slate-600" size={18} />
//                   <textarea 
//                     value={formData.disease}
//                     className="w-full p-6 pl-16 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-[2rem] outline-none focus:border-indigo-500 font-bold text-slate-700 dark:text-white transition-all min-h-[120px] resize-none shadow-inner" 
//                     onChange={(e) => setFormData({...formData, disease: e.target.value})} required 
//                   />
//                 </div>
//               </div>

//               <div className="pt-6">
//                 <button 
//                   disabled={updating}
//                   type="submit" 
//                   className="w-full py-6 bg-indigo-600 text-white font-black text-lg rounded-[2rem] shadow-xl shadow-indigo-500/20 hover:bg-slate-900 dark:hover:bg-white dark:hover:text-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-4 group/btn"
//                 >
//                   {updating ? <Loader2 className="animate-spin" /> : <Save size={22} />}
//                   {updating ? "SYNCHRONIZING..." : "COMMIT MODIFICATIONS"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
        
//         <p className="mt-10 text-center text-slate-400 dark:text-slate-800 font-black text-[9px] uppercase tracking-[0.6em] italic">
//           Clinic OS • Secure Modification Protocol
//         </p>
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
//   User, Save, Loader2, Phone, Activity, ChevronLeft, 
//   ShieldCheck, Hash, Layers, Sparkles 
// } from 'lucide-react';

// export default function EditPatient() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [formData, setFormData] = useState({ name: '', age: '', gender: 'Male', phone: '', disease: '' });
  
//   const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

//   useEffect(() => {
//     const fetchPatient = async () => {
//       try {
//         const res = await API.get(`/patients/${id}`);
//         const patientData = res.data?.data || res.data;
        
//         if (!patientData) {
//           toast.error("Patient Record Not Found!");
//           return navigate('/dashboard');
//         }

//         setFormData({
//           name: patientData.name || '',
//           age: patientData.age || '',
//           gender: patientData.gender || 'Male',
//           phone: patientData.phone || '',
//           disease: patientData.disease || ''
//         });
//       } catch (err) {
//         toast.error("Critical: Data retrieval failed.");
//         setTimeout(() => navigate('/dashboard'), 2000);
//       } finally { 
//         setLoading(false); 
//       }
//     };
//     fetchPatient();
//   }, [id, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     const updateToast = toast.loading("Updating Record...");

//     try {
//       // API call to update patient
//       await API.put(`/receptionist/update/${id}`, formData); 
      
//       toast.update(updateToast, { 
//         render: "Synchronized Successfully! ✅", 
//         type: "success", 
//         isLoading: false, 
//         autoClose: 2000 
//       });
      
//       setTimeout(() => navigate('/dashboard'), 1500);
//     } catch (err) {
//       console.error(err);
//       toast.update(updateToast, { 
//         render: "Update Failed: Check Console", 
//         type: "error", 
//         isLoading: false, 
//         autoClose: 3000 
//       });
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#020617] gap-6 transition-all">
//         <Loader2 className="animate-spin text-indigo-500" size={60} />
//         <p className="font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em] text-[10px]">Decrypting Record</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] flex flex-col items-center justify-center p-6 font-sans transition-all">
//       <ToastContainer theme={isDark ? "dark" : "light"} />

//       <div className="max-w-2xl w-full">
//         {/* BACK BUTTON */}
//         <button 
//           onClick={() => navigate(-1)} 
//           className="mb-8 flex items-center gap-3 text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] hover:text-indigo-500 transition-all group cursor-pointer"
//         >
//           <div className="h-10 w-10 bg-white dark:bg-white/5 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/5 shadow-sm group-hover:border-indigo-500/50 transition-all">
//             <ChevronLeft size={18} />
//           </div>
//           Cancel Modification
//         </button>

//         <div className="bg-white dark:bg-[#050810]/80 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 relative overflow-hidden group">
          
//           <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 group-hover:opacity-20 transition-opacity">
//             <Sparkles size={80} className="text-indigo-500" />
//           </div>

//           <div className="relative z-10">
//             <div className="flex items-center gap-5 mb-12">
//               <div className="h-16 w-16 bg-indigo-600 rounded-[1.8rem] flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
//                 <User size={32} />
//               </div>
//               <div>
//                 <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter italic uppercase leading-none">
//                   Edit <span className="text-indigo-500">Dossier</span>
//                 </h2>
//                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 mt-2">
//                    <ShieldCheck size={12} className="text-indigo-400" /> ID: {id?.slice(-8).toUpperCase()}
//                 </p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* NAME INPUT */}
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Full Identity</label>
//                 <div className="relative">
//                   <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
//                   <input 
//                     type="text" value={formData.name}
//                     className="w-full p-5 pl-16 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-white/[0.05] font-bold text-slate-700 dark:text-white transition-all" 
//                     onChange={(e) => setFormData({...formData, name: e.target.value})} required 
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {/* AGE INPUT */}
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Age</label>
//                   <div className="relative">
//                     <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
//                     <input 
//                       type="number" value={formData.age}
//                       className="w-full p-5 pl-16 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 dark:text-white transition-all" 
//                       onChange={(e) => setFormData({...formData, age: e.target.value})} required 
//                     />
//                   </div>
//                 </div>

//                 {/* GENDER SELECT */}
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Gender</label>
//                   <div className="relative">
//                     <Layers className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 pointer-events-none" size={18} />
//                     <select 
//                       className="w-full p-5 pl-16 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 dark:text-white transition-all appearance-none cursor-pointer" 
//                       value={formData.gender}
//                       onChange={(e) => setFormData({...formData, gender: e.target.value})}
//                     >
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* PHONE INPUT */}
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Contact Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
//                   <input 
//                     type="text" value={formData.phone}
//                     className="w-full p-5 pl-16 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 dark:text-white transition-all" 
//                     onChange={(e) => setFormData({...formData, phone: e.target.value})} required 
//                   />
//                 </div>
//               </div>
              
//               {/* MEDICAL CONDITION TEXTAREA */}
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Medical Condition</label>
//                 <div className="relative">
//                   <Activity className="absolute left-6 top-6 text-slate-300 dark:text-slate-600" size={18} />
//                   <textarea 
//                     value={formData.disease}
//                     className="w-full p-6 pl-16 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-[2rem] outline-none focus:border-indigo-500 font-bold text-slate-700 dark:text-white transition-all min-h-[120px] resize-none" 
//                     onChange={(e) => setFormData({...formData, disease: e.target.value})} required 
//                   />
//                 </div>
//               </div>

//               {/* SUBMIT BUTTON */}
//               <div className="pt-6">
//                 <button 
//                   disabled={updating}
//                   type="submit" 
//                   className="w-full py-6 bg-indigo-600 text-white font-black text-lg rounded-[2rem] shadow-xl shadow-indigo-500/20 hover:bg-slate-900 dark:hover:bg-white dark:hover:text-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-4 cursor-pointer disabled:cursor-not-allowed"
//                 >
//                   {updating ? <Loader2 className="animate-spin" /> : <Save size={22} />}
//                   {updating ? "SYNCHRONIZING..." : "COMMIT MODIFICATIONS"}
//                 </button>
//               </div>
//             </form>
//           </div>
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
  User, Save, Loader2, Phone, Activity, ChevronLeft, 
  ShieldCheck, Hash, Layers, Sparkles 
} from 'lucide-react';

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({ name: '', age: '', gender: 'Male', phone: '', disease: '' });
  
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await API.get(`/patients/${id}`);
        const patientData = res.data?.data || res.data;
        
        if (!patientData) {
          toast.error("Patient Record Not Found!");
          return navigate('/dashboard');
        }

        setFormData({
          name: patientData.name || '',
          age: patientData.age || '',
          gender: patientData.gender || 'Male',
          phone: patientData.phone || '',
          disease: patientData.disease || ''
        });
      } catch (err) {
        toast.error("Critical: Data retrieval failed.");
        setTimeout(() => navigate('/dashboard'), 2000);
      } finally { 
        setLoading(false); 
      }
    };
    fetchPatient();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const updateToast = toast.loading("Updating Record...");

    try {
      await API.put(`/receptionist/update/${id}`, formData); 
      
      toast.update(updateToast, { 
        render: "Synchronized Successfully! ✅", 
        type: "success", 
        isLoading: false, 
        autoClose: 2000 
      });
      
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      toast.update(updateToast, { 
        render: "Update Failed: Check Console", 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#020617] gap-6 transition-all">
        <div className="relative">
            <Loader2 className="animate-spin text-indigo-500 relative z-10" size={60} />
            <div className="absolute inset-0 bg-indigo-500/20 blur-2xl animate-pulse"></div>
        </div>
        <p className="font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em] text-[10px]">Decrypting Record</p>
      </div>
    );
  }

  // Common Input Pointer Styles
  const inputBaseStyle = "w-full p-5 pl-16 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-white/[0.05] focus:ring-4 focus:ring-indigo-500/10 font-bold text-slate-700 dark:text-white transition-all duration-300";

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] flex flex-col items-center justify-center p-6 font-sans transition-all">
      <ToastContainer theme={isDark ? "dark" : "light"} />

      <div className="max-w-2xl w-full">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 flex items-center gap-3 text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] hover:text-indigo-500 transition-all group cursor-pointer"
        >
          <div className="h-10 w-10 bg-white dark:bg-white/5 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/5 shadow-sm group-hover:border-indigo-500/50 group-hover:bg-indigo-50 transition-all">
            <ChevronLeft size={18} />
          </div>
          Cancel Modification
        </button>

        <div className="bg-white dark:bg-[#050810]/80 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 relative overflow-hidden group">
          
          {/* Visual Pointer: Background Sparkle */}
          <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700">
            <Sparkles size={120} className="text-indigo-500" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-12">
              <div className="h-16 w-16 bg-indigo-600 rounded-[1.8rem] flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:rotate-6 transition-transform">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter italic uppercase leading-none">
                  Edit <span className="text-indigo-500">Dossier</span>
                </h2>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 mt-2">
                   <ShieldCheck size={12} className="text-indigo-400 animate-pulse" /> ID: {id?.slice(-8).toUpperCase()}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Full Identity</label>
                <div className="relative group/field">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
                  <input 
                    type="text" value={formData.name}
                    className={inputBaseStyle}
                    onChange={(e) => setFormData({...formData, name: e.target.value})} required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Age</label>
                  <div className="relative group/field">
                    <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
                    <input 
                      type="number" value={formData.age}
                      className={inputBaseStyle}
                      onChange={(e) => setFormData({...formData, age: e.target.value})} required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Gender</label>
                  <div className="relative group/field">
                    <Layers className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 pointer-events-none group-focus-within/field:text-indigo-500 transition-colors" size={18} />
                    <select 
                      className={`${inputBaseStyle} appearance-none cursor-pointer`}
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Contact Number</label>
                <div className="relative group/field">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
                  <input 
                    type="text" value={formData.phone}
                    className={inputBaseStyle}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-4">Medical Condition</label>
                <div className="relative group/field">
                  <Activity className="absolute left-6 top-6 text-slate-300 dark:text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
                  <textarea 
                    value={formData.disease}
                    className={`${inputBaseStyle} pl-16 min-h-[120px] resize-none pt-6`}
                    onChange={(e) => setFormData({...formData, disease: e.target.value})} required 
                  />
                </div>
              </div>

              <div className="pt-6">
                <button 
                  disabled={updating}
                  type="submit" 
                  className={`w-full py-6 font-black text-lg rounded-[2rem] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-4 cursor-pointer disabled:cursor-not-allowed
                    ${updating 
                      ? 'bg-slate-200 text-slate-400 dark:bg-white/5' 
                      : 'bg-indigo-600 text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-indigo-600 shadow-indigo-500/20'}`}
                >
                  {updating ? <Loader2 className="animate-spin" /> : <Save size={22} />}
                  {updating ? "SYNCHRONIZING..." : "COMMIT MODIFICATIONS"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}