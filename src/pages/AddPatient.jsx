// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// // --- Toastify Imports ---
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // --- Icons ---
// import { UserPlus, User, Phone, Activity, ChevronLeft, Loader2, Save, Users } from 'lucide-react';

// export default function AddPatient() {
//   const [formData, setFormData] = useState({ name: '', age: '', gender: 'Male', phone: '', disease: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Common Toast Styling
//   const toastStyle = { theme: "light", position: "top-center" };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     // Initial Loading Toast
//     const loadToast = toast.loading("Registering New Patient...", { theme: "light" });

//     try {
//       await API.post('/patients/add', formData);
      
//       toast.update(loadToast, { 
//         render: "Patient Registered Successfully! 🎉", 
//         type: "success", 
//         isLoading: false, 
//         autoClose: 2000,
//         theme: "light"
//       });

//       // Smooth Redirect
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || "Registration Failed!";
//       toast.update(loadToast, { 
//         render: errorMsg, 
//         type: "error", 
//         isLoading: false, 
//         autoClose: 3000,
//         theme: "light"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 font-sans">
//       {/* Toastify Container with Light Theme */}
//       <ToastContainer />

//       <div className="max-w-2xl w-full">
//         {/* Back Button */}
//         <button 
//           onClick={() => navigate('/dashboard')} 
//           className="mb-8 flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-indigo-600 transition-colors group"
//         >
//           <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md border border-slate-100">
//             <ChevronLeft size={18} />
//           </div>
//           Return to Hub
//         </button>

//         <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-indigo-100/50 border border-white relative overflow-hidden">
//           {/* Decorative Background Icon */}
//           <Users className="absolute -top-10 -right-10 text-slate-50" size={250} />

//           <div className="relative z-10">
//             <div className="flex items-center gap-4 mb-10">
//               <div className="h-14 w-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
//                 <UserPlus size={28} />
//               </div>
//               <div>
//                 <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">New <span className="text-indigo-600">Patient</span></h2>
//                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Database Intake Module v1.0</p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Full Name */}
//               <div className="relative group">
//                 <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
//                 <input 
//                   type="text" placeholder="Patient Full Name" 
//                   className="w-full p-5 pl-14 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner" 
//                   onChange={(e) => setFormData({...formData, name: e.target.value})} required 
//                 />
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Age */}
//                 <input 
//                   type="number" placeholder="Age" 
//                   className="p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner" 
//                   onChange={(e) => setFormData({...formData, age: e.target.value})} required 
//                 />
//                 {/* Gender */}
//                 <select 
//                   className="p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner appearance-none cursor-pointer" 
//                   onChange={(e) => setFormData({...formData, gender: e.target.value})}
//                 >
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               {/* Phone */}
//               <div className="relative group">
//                 <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
//                 <input 
//                   type="text" placeholder="Contact Number" 
//                   className="w-full p-5 pl-14 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner" 
//                   onChange={(e) => setFormData({...formData, phone: e.target.value})} required 
//                 />
//               </div>
              
//               {/* Symptoms */}
//               <div className="relative group">
//                 <Activity className="absolute left-5 top-6 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
//                 <textarea 
//                   placeholder="Primary Symptoms / Case Summary" 
//                   className="w-full p-5 pl-14 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner" 
//                   rows="3"
//                   onChange={(e) => setFormData({...formData, disease: e.target.value})} required 
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-4 pt-6">
//                 <button 
//                   disabled={loading}
//                   type="submit" 
//                   className="flex-1 py-6 bg-indigo-600 text-white font-black text-lg rounded-[1.8rem] shadow-xl shadow-indigo-200 hover:bg-slate-900 transition-all active:scale-95 flex items-center justify-center gap-3"
//                 >
//                   {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
//                   {loading ? "SAVING..." : "COMMIT TO SYSTEM"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
        
//         {/* Footer info */}
//         <p className="mt-8 text-center text-slate-300 font-black text-[9px] uppercase tracking-[0.4em]">Clinic OS • Digital Record Integrity Protocol</p>
//       </div>
//     </div>
//   );
// }



















// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   UserPlus, User, Phone, Activity, ChevronLeft, 
//   Loader2, Save, ShieldAlert, Sparkles, Hash, Layers
// } from 'lucide-react';

// export default function AddPatient() {
//   const [formData, setFormData] = useState({ name: '', age: '', gender: 'Male', phone: '', disease: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const loadToast = toast.loading("Encrypting & Uploading Data...", { theme: "dark" });

//     try {
//       await API.post('/patients/add', formData);
//       toast.update(loadToast, { 
//         render: "Patient Protocol Synchronized! 🎉", 
//         type: "success", 
//         isLoading: false, 
//         autoClose: 2000,
//         theme: "dark"
//       });
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || "Protocol Interrupted!";
//       toast.update(loadToast, { 
//         render: errorMsg, 
//         type: "error", 
//         isLoading: false, 
//         autoClose: 3000,
//         theme: "dark"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
//       <ToastContainer theme="dark" />

//       {/* --- AMBIENT BACKGROUND GLOW --- */}
//       <div className="fixed inset-0 pointer-events-none -z-10">
//         <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
//         <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full"></div>
//       </div>

//       <div className="max-w-2xl w-full">
//         {/* --- BACK ACTION --- */}
//         <button 
//           onClick={() => navigate('/dashboard')} 
//           className="mb-8 flex items-center gap-3 text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] hover:text-indigo-400 transition-all group cursor-pointer"
//         >
//           <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-indigo-500/50 shadow-lg transition-all">
//             <ChevronLeft size={18} />
//           </div>
//           Abort & Return
//         </button>

//         {/* --- FORM CONTAINER --- */}
//         <div className="bg-[#050810]/80 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-white/5 relative overflow-hidden group">
          
//           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
//             <Sparkles size={80} className="text-indigo-500" />
//           </div>

//           <div className="relative z-10">
//             {/* Header */}
//             <div className="flex items-center gap-5 mb-12">
//               <div className="h-16 w-16 bg-indigo-600 rounded-[1.8rem] flex items-center justify-center text-white shadow-[0_0_30px_rgba(79,70,229,0.4)]">
//                 <UserPlus size={32} />
//               </div>
//               <div>
//                 <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">
//                   Data <span className="text-indigo-500">Intake</span>
//                 </h2>
//                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
//                    <ShieldAlert size={12} className="text-indigo-400" /> Secure Protocol v4.0.1
//                 </p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5">
              
//               {/* Field: Full Name */}
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Patient Full Identity</label>
//                 <div className="relative group/field">
//                   <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
//                   <input 
//                     type="text" placeholder="e.g. Hussain Ali" 
//                     className="w-full p-5 pl-16 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700" 
//                     onChange={(e) => setFormData({...formData, name: e.target.value})} required 
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {/* Field: Age */}
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Age</label>
//                   <div className="relative group/field">
//                     <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
//                     <input 
//                       type="text" placeholder="Years" 
//                       className="w-full p-5 pl-16 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700" 
//                       onChange={(e) => setFormData({...formData, age: e.target.value})} required 
//                     />
//                   </div>
//                 </div>

//                 {/* Field: Gender */}
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Gender</label>
//                   <div className="relative group/field">
//                     <Layers className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
//                     <select 
//                       className="w-full p-5 pl-16 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all cursor-pointer appearance-none" 
//                       onChange={(e) => setFormData({...formData, gender: e.target.value})}
//                     >
//                       <option value="Male" className="bg-[#050810]">Male</option>
//                       <option value="Female" className="bg-[#050810]">Female</option>
//                       <option value="Other" className="bg-[#050810]">Other</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Field: Phone */}
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Contact Number</label>
//                 <div className="relative group/field">
//                   <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
//                   <input 
//                     type="text" placeholder="+92 XXX XXXXXXX" 
//                     className="w-full p-5 pl-16 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700" 
//                     onChange={(e) => setFormData({...formData, phone: e.target.value})} required 
//                   />
//                 </div>
//               </div>
              
//               {/* Field: Symptoms */}
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Case Summary / Symptoms</label>
//                 <div className="relative group/field">
//                   <Activity className="absolute left-6 top-6 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
//                   <textarea 
//                     placeholder="Describe the medical condition..." 
//                     className="w-full p-6 pl-16 bg-white/[0.03] border border-white/5 rounded-[2rem] outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700 min-h-[120px] resize-none" 
//                     onChange={(e) => setFormData({...formData, disease: e.target.value})} required 
//                   />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="pt-6">
//                 <button 
//                   disabled={loading}
//                   type="submit" 
//                   className="w-full py-6 bg-indigo-600 text-white font-black text-lg rounded-[2rem] shadow-2xl shadow-indigo-900/40 hover:bg-white hover:text-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-4 cursor-pointer group/btn"
//                 >
//                   {loading ? (
//                     <Loader2 className="animate-spin" />
//                   ) : (
//                     <Save size={22} className="group-hover/btn:scale-110 transition-transform" />
//                   )}
//                   {loading ? "ENCRYPTING..." : "COMMIT TO DATABASE"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
        
//         <p className="mt-10 text-center text-slate-800 font-black text-[9px] uppercase tracking-[0.6em] italic opacity-40">
//           Clinic OS • Digital Record Integrity Protocol
//         </p>
//       </div>
//     </div>
//   );
// }





















// email










// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   UserPlus, User, Phone, Activity, ChevronLeft, 
//   Loader2, Save, ShieldAlert, Sparkles, Hash, Layers, Mail
// } from 'lucide-react';

// export default function AddPatient() {
//   // Added 'email' to formData
//   const [formData, setFormData] = useState({ 
//     name: '', 
//     email: '', 
//     age: '', 
//     gender: 'Male', 
//     phone: '', 
//     disease: '' 
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   const loadToast = toast.loading("Encrypting & Uploading Data...", { theme: "dark" });

//   try {
//     // 💡 FIX: Backend ko 'disease' ki jagah 'medicalHistory' mein array bhejien
//     // Agar aapne backend controller update kar diya hye toh ye best approach hye
//     const payload = {
//       ...formData,
//       medicalHistory: formData.disease ? [formData.disease] : []
//     };

//     // Agar aapne backend controller mein 'const { disease } = req.body' rakha hye 
//     // toh sirf 'formData' bhejien, lekin backend mein 'medicalHistory: [disease]' lazmi likhein.
//     await API.post('/receptionist/register', payload); 
    
//     toast.update(loadToast, { 
//       render: "Protocol Synchronized! Login Pass: 12345678 🎉", 
//       type: "success", 
//       isLoading: false, 
//       autoClose: 3000,
//       theme: "dark"
//     });
//     setTimeout(() => navigate('/dashboard'), 3000);
//   } catch (err) {
//     const errorMsg = err.response?.data?.message || "Protocol Interrupted!";
//     toast.update(loadToast, { 
//       render: errorMsg, 
//       type: "error", 
//       isLoading: false, 
//       autoClose: 3000,
//       theme: "dark"
//     });
//   } finally {
//     setLoading(false);
//   }
// };
//   return (
//     <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
//       <ToastContainer theme="dark" />

//       {/* --- AMBIENT BACKGROUND GLOW --- */}
//       <div className="fixed inset-0 pointer-events-none -z-10">
//         <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
//         <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full"></div>
//       </div>

//       <div className="max-w-2xl w-full">
//         <button 
//           onClick={() => navigate('/dashboard')} 
//           className="mb-8 flex items-center gap-3 text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] hover:text-indigo-400 transition-all group cursor-pointer"
//         >
//           <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-indigo-500/50 shadow-lg transition-all">
//             <ChevronLeft size={18} />
//           </div>
//           Abort & Return
//         </button>

//         <div className="bg-[#050810]/80 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-white/5 relative overflow-hidden group">
          
//           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
//             <Sparkles size={80} className="text-indigo-500" />
//           </div>

//           <div className="relative z-10">
//             <div className="flex items-center gap-5 mb-12">
//               <div className="h-16 w-16 bg-indigo-600 rounded-[1.8rem] flex items-center justify-center text-white shadow-[0_0_30px_rgba(79,70,229,0.4)]">
//                 <UserPlus size={32} />
//               </div>
//               <div>
//                 <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">
//                   Data <span className="text-indigo-500">Intake</span>
//                 </h2>
//                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
//                    <ShieldAlert size={12} className="text-indigo-400" /> Secure Protocol v4.0.1
//                 </p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5">
              
//               {/* Field: Full Name */}
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Patient Full Identity</label>
//                 <div className="relative group/field">
//                   <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
//                   <input 
//                     type="text" placeholder="e.g. Hussain Ali" 
//                     className="w-full p-5 pl-16 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700" 
//                     onChange={(e) => setFormData({...formData, name: e.target.value})} required 
//                   />
//                 </div>
//               </div>

//               {/* NEW FIELD: Email Address */}
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Email Address (For Login)</label>
//                 <div className="relative group/field">
//                   <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
//                   <input 
//                     type="email" placeholder="patient@example.com" 
//                     className="w-full p-5 pl-16 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700" 
//                     onChange={(e) => setFormData({...formData, email: e.target.value})} required 
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Age</label>
//                   <div className="relative group/field">
//                     <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
//                     <input 
//                       type="text" placeholder="Years" 
//                       className="w-full p-5 pl-16 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700" 
//                       onChange={(e) => setFormData({...formData, age: e.target.value})} required 
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Gender</label>
//                   <div className="relative group/field">
//                     <Layers className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
//                     <select 
//                       className="w-full p-5 pl-16 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all cursor-pointer appearance-none" 
//                       onChange={(e) => setFormData({...formData, gender: e.target.value})}
//                     >
//                       <option value="Male" className="bg-[#050810]">Male</option>
//                       <option value="Female" className="bg-[#050810]">Female</option>
//                       <option value="Other" className="bg-[#050810]">Other</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Contact Number</label>
//                 <div className="relative group/field">
//                   <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
//                   <input 
//                     type="text" placeholder="+92 XXX XXXXXXX" 
//                     className="w-full p-5 pl-16 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700" 
//                     onChange={(e) => setFormData({...formData, phone: e.target.value})} required 
//                   />
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Case Summary / Symptoms</label>
//                 <div className="relative group/field">
//                   <Activity className="absolute left-6 top-6 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
//                   <textarea 
//                     placeholder="Describe the medical condition..." 
//                     className="w-full p-6 pl-16 bg-white/[0.03] border border-white/5 rounded-[2rem] outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700 min-h-[120px] resize-none" 
//                     onChange={(e) => setFormData({...formData, disease: e.target.value})} required 
//                   />
//                 </div>
//               </div>

//               <div className="pt-6">
//                 <button 
//                   disabled={loading}
//                   type="submit" 
//                   className="w-full py-6 bg-indigo-600 text-white font-black text-lg rounded-[2rem] shadow-2xl shadow-indigo-900/40 hover:bg-white hover:text-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-4 cursor-pointer group/btn"
//                 >
//                   {loading ? (
//                     <Loader2 className="animate-spin" />
//                   ) : (
//                     <Save size={22} className="group-hover/btn:scale-110 transition-transform" />
//                   )}
//                   {loading ? "ENCRYPTING..." : "COMMIT TO DATABASE"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
        
//         <p className="mt-10 text-center text-slate-800 font-black text-[9px] uppercase tracking-[0.6em] italic opacity-40">
//           Clinic OS • Digital Record Integrity Protocol
//         </p>
//       </div>
//     </div>
//   );
// }























import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../util/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  UserPlus, User, Phone, Activity, ChevronLeft, 
  Loader2, Save, ShieldAlert, Sparkles, Hash, Layers, Mail
} from 'lucide-react';

export default function AddPatient() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    age: '', 
    gender: 'Male', 
    phone: '', 
    disease: '' 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadToast = toast.loading("Encrypting & Uploading Data...", { theme: "dark" });

    try {
      const payload = {
        ...formData,
        medicalHistory: formData.disease ? [formData.disease] : []
      };

      await API.post('/receptionist/register', payload); 
      
      toast.update(loadToast, { 
        render: "Protocol Synchronized! Login Pass: 12345678 🎉", 
        type: "success", 
        isLoading: false, 
        autoClose: 3000,
        theme: "dark"
      });
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Protocol Interrupted!";
      toast.update(loadToast, { 
        render: errorMsg, 
        type: "error", 
        isLoading: false, 
        autoClose: 3000,
        theme: "dark"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <ToastContainer theme="dark" />

      {/* --- AMBIENT BACKGROUND GLOW --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-2xl w-full">
        {/* Back Button with Hover Pointer */}
        <button 
          onClick={() => navigate('/dashboard')} 
          className="mb-8 flex items-center gap-3 text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] hover:text-indigo-400 transition-all group cursor-pointer active:translate-x-[-4px]"
        >
          <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-indigo-500/50 shadow-lg transition-all group-hover:bg-indigo-500/10">
            <ChevronLeft size={18} />
          </div>
          Abort & Return
        </button>

        <div className="bg-[#050810]/80 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-white/5 relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 group-hover:rotate-12 transition-all duration-700">
            <Sparkles size={80} className="text-indigo-500" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-12">
              <div className="h-16 w-16 bg-indigo-600 rounded-[1.8rem] flex items-center justify-center text-white shadow-[0_0_30px_rgba(79,70,229,0.4)] group-hover:scale-105 transition-transform">
                <UserPlus size={32} />
              </div>
              <div>
                <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">
                  Data <span className="text-indigo-500">Intake</span>
                </h2>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                   <ShieldAlert size={12} className="text-indigo-400" /> Secure Protocol v4.0.1
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name */}
              <div className="space-y-2 group/field">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4 group-focus-within/field:text-indigo-400 transition-colors">Patient Full Identity</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
                  <input 
                    type="text" placeholder="e.g. Hussain Ali" 
                    className="w-full p-5 pl-16 bg-white/[0.02] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700 cursor-text shadow-inner" 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} required 
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2 group/field">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4 group-focus-within/field:text-indigo-400 transition-colors">Email Address (For Login)</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
                  <input 
                    type="email" placeholder="patient@example.com" 
                    className="w-full p-5 pl-16 bg-white/[0.02] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700 cursor-text shadow-inner" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Age */}
                <div className="space-y-2 group/field">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4 group-focus-within/field:text-indigo-400 transition-colors">Age</label>
                  <div className="relative">
                    <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
                    <input 
                      type="text" placeholder="Years" 
                      className="w-full p-5 pl-16 bg-white/[0.02] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700 cursor-text" 
                      onChange={(e) => setFormData({...formData, age: e.target.value})} required 
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2 group/field">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4 group-focus-within/field:text-indigo-400 transition-colors">Gender</label>
                  <div className="relative">
                    <Layers className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
                    <select 
                      className="w-full p-5 pl-16 bg-white/[0.02] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all cursor-pointer appearance-none" 
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    >
                      <option value="Male" className="bg-[#050810]">Male</option>
                      <option value="Female" className="bg-[#050810]">Female</option>
                      <option value="Other" className="bg-[#050810]">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2 group/field">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4 group-focus-within/field:text-indigo-400 transition-colors">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
                  <input 
                    type="text" placeholder="+92 XXX XXXXXXX" 
                    className="w-full p-5 pl-16 bg-white/[0.02] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700 cursor-text shadow-inner" 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} required 
                  />
                </div>
              </div>
              
              {/* Symptoms */}
              <div className="space-y-2 group/field">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4 group-focus-within/field:text-indigo-400 transition-colors">Case Summary</label>
                <div className="relative">
                  <Activity className="absolute left-6 top-6 text-slate-600 group-focus-within/field:text-indigo-500 transition-colors" size={18} />
                  <textarea 
                    placeholder="Describe the medical condition..." 
                    className="w-full p-6 pl-16 bg-white/[0.02] border border-white/5 rounded-[2rem] outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] font-bold text-white transition-all placeholder:text-slate-700 min-h-[120px] resize-none cursor-text shadow-inner" 
                    onChange={(e) => setFormData({...formData, disease: e.target.value})} required 
                  />
                </div>
              </div>

              {/* Submit Button with Hover & Press Animation */}
              <div className="pt-6">
                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full py-6 bg-indigo-600 text-white font-black text-lg rounded-[2rem] shadow-2xl shadow-indigo-900/40 hover:bg-white hover:text-indigo-600 transition-all active:scale-95 active:shadow-inner flex items-center justify-center gap-4 cursor-pointer group/btn disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-indigo-400/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                  {loading ? (
                    <Loader2 className="animate-spin relative z-10" />
                  ) : (
                    <Save size={22} className="group-hover/btn:scale-110 group-hover/btn:rotate-6 transition-transform relative z-10" />
                  )}
                  <span className="relative z-10">{loading ? "ENCRYPTING..." : "COMMIT TO DATABASE"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <p className="mt-10 text-center text-slate-800 font-black text-[9px] uppercase tracking-[0.6em] italic opacity-40">
          Clinic OS • Digital Record Integrity Protocol
        </p>
      </div>
    </div>
  );
}