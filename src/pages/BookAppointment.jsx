
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { toast, ToastContainer } from 'react-toastify';
// import { Calendar, User, UserCheck, MessageSquare, ArrowLeft, Loader2 } from 'lucide-react';

// export default function BookAppointment() {
//     const [patients, setPatients] = useState([]);
//     const [doctors, setDoctors] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [fetching, setFetching] = useState(true);
//     const [formData, setFormData] = useState({
//         patient: '',
//         doctor: '',
//         date: '',
//         reason: ''
//     });

//     const navigate = useNavigate();

//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 setFetching(true);
//                 // 1. Patients fetch karein
//                 const patientsRes = await API.get('/patients/all');
//                 const pData = patientsRes.data?.data || patientsRes.data || [];
//                 setPatients(Array.isArray(pData) ? pData : []);

//                 // 2. Doctors fetch karein (Naya Admin Route)
//                 const doctorsRes = await API.get('/admin/doctors');
//                 const dData = doctorsRes.data?.data || doctorsRes.data || [];
//                 setDoctors(Array.isArray(dData) ? dData : []);
//             } catch (err) {
//                 console.error("Fetch Error:", err);
//                 toast.error("Failed to load patients or doctors!");
//             } finally {
//                 setFetching(false);
//             }
//         };
//         loadData();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if(!formData.patient || !formData.doctor) {
//             return toast.warn("Please select both Patient and Doctor");
//         }

//         setLoading(true);
//         try {
//             await API.post('/receptionist/book', formData);
//             toast.success("Appointment Booked Successfully!");
//             setTimeout(() => navigate('/dashboard'), 2000);
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Booking Failed!");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (fetching) {
//         return (
//             <div className="h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#020617]">
//                 <Loader2 className="animate-spin text-blue-600" size={40} />
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-6 md:p-12 font-sans">
//             <ToastContainer theme="colored" />
            
//             <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-black text-[10px] tracking-widest transition-all">
//                 <ArrowLeft size={18} /> BACK TO PORTAL
//             </button>

//             <div className="max-w-2xl mx-auto bg-white dark:bg-[#0f172a] p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-white/5">
//                 <div className="mb-10 text-center">
//                     <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic">
//                         Book <span className="text-blue-600">Appointment</span>
//                     </h2>
//                     <p className="text-slate-400 font-bold text-[10px] tracking-[0.3em] uppercase mt-2">Clinic Management System</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {/* Patient Selection */}
//                     <div className="space-y-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Select Patient</label>
//                         <div className="relative">
//                             <User className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
//                             <select 
//                                 required
//                                 value={formData.patient}
//                                 className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 dark:bg-black/20 border-none outline-none ring-1 ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-blue-500 dark:text-white appearance-none"
//                                 onChange={(e) => setFormData({...formData, patient: e.target.value})}
//                             >
//                                 <option value="">Select a registered patient...</option>
//                                 {patients.map(p => (
//                                     <option key={p._id} value={p._id} className="dark:bg-slate-900">{p.name} ({p.phone})</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Doctor Selection */}
//                     <div className="space-y-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Assign Medical Staff</label>
//                         <div className="relative">
//                             <UserCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
//                             <select 
//                                 required
//                                 value={formData.doctor}
//                                 className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 dark:bg-black/20 border-none outline-none ring-1 ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-blue-500 dark:text-white appearance-none"
//                                 onChange={(e) => setFormData({...formData, doctor: e.target.value})}
//                             >
//                                 <option value="">Assign available doctor...</option>
//                                 {doctors.map(d => (
//                                     <option key={d._id} value={d._id} className="dark:bg-slate-900">Dr. {d.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Date & Time */}
//                     <div className="space-y-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Schedule Date & Time</label>
//                         <div className="relative">
//                             <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
//                             <input 
//                                 type="datetime-local"
//                                 required
//                                 className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 dark:bg-black/20 border-none outline-none ring-1 ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-blue-500 dark:text-white"
//                                 onChange={(e) => setFormData({...formData, date: e.target.value})}
//                             />
//                         </div>
//                     </div>

//                     {/* Reason */}
//                     <div className="space-y-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Reason for Visit</label>
//                         <div className="relative">
//                             <MessageSquare className="absolute left-5 top-5 text-blue-500" size={20} />
//                             <textarea 
//                                 placeholder="Brief description of symptoms..."
//                                 required
//                                 className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 dark:bg-black/20 border-none outline-none ring-1 ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-blue-500 dark:text-white min-h-[120px]"
//                                 onChange={(e) => setFormData({...formData, reason: e.target.value})}
//                             ></textarea>
//                         </div>
//                     </div>

//                     <button 
//                         type="submit" 
//                         disabled={loading}
//                         className="w-full py-6 bg-blue-600 hover:bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50"
//                     >
//                         {loading ? <Loader2 className="animate-spin" /> : "FINALIZE APPOINTMENT"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }


// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { toast, ToastContainer } from 'react-toastify';
// import { Calendar as CalendarIcon, User, UserCheck, MessageSquare, ArrowLeft, Loader2 } from 'lucide-react';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// export default function BookAppointment() {
//     // 1. ID check karne ke liye useParams
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [patients, setPatients] = useState([]);
//     const [doctors, setDoctors] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [fetching, setFetching] = useState(true);
    
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [formData, setFormData] = useState({
//         patient: '',
//         doctor: '',
//         reason: ''
//     });

//     useEffect(() => {
//         const loadInitialData = async () => {
//             try {
//                 setFetching(true);
                
//                 // Sabse pehle dropdowns ka data load karein
//                 const [patientsRes, doctorsRes] = await Promise.all([
//                     API.get('/receptionist/all-patients'),
//                     API.get('/admin/doctors')
//                 ]);

//                 setPatients(patientsRes.data?.data || []);
//                 setDoctors(doctorsRes.data?.data || []);

//                 // 2. Agar ID hai, toh appointment ka data fetch karein (Edit Mode)
//                 if (id) {
//                     const res = await API.get(`/receptionist/appointment/${id}`);
//                     const appData = res.data?.data;
                    
//                     if (appData) {
//                         setFormData({
//                             // Agar backend se Object aa raha hai toh ID nikalen, warna direct use karein
//                             patient: appData.patient?._id || appData.patient,
//                             doctor: appData.doctor?._id || appData.doctor,
//                             reason: appData.reason || ''
//                         });
//                         if (appData.date) {
//                             setSelectedDate(new Date(appData.date));
//                         }
//                     }
//                 }
//             } catch (err) {
//                 console.error("Data Load Error:", err);
//                 toast.error("Failed to sync clinical data!");
//             } finally {
//                 setFetching(false);
//             }
//         };
//         loadInitialData();
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if(!selectedDate || !formData.patient || !formData.doctor) {
//             return toast.warn("Please complete all required fields");
//         }

//         const dataToSubmit = {
//             ...formData,
//             date: selectedDate.toISOString() 
//         };

//         setLoading(true);
//         try {
//             // 3. Conditional API Call (PUT for Edit, POST for New)
//             if (id) {
//                 await API.put(`/receptionist/appointment/${id}`, dataToSubmit);
//                 toast.success("Appointment Updated Successfully!");
//             } else {
//                 await API.post('/receptionist/book', dataToSubmit);
//                 toast.success("New Appointment Secured!");
//             }
            
//             setTimeout(() => navigate('/dashboard'), 2000);
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Operation failed!");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (fetching) {
//         return (
//             <div className="h-screen flex flex-col items-center justify-center bg-[#020617] gap-4">
//                 <Loader2 className="animate-spin text-blue-600" size={40} />
//                 <p className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase italic">Synchronizing Resources...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-6 md:p-12 font-sans transition-all duration-300">
//             <ToastContainer theme="dark" />
            
//             <button 
//                 onClick={() => navigate(-1)} 
//                 className="flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-black text-[10px] tracking-widest group transition-all"
//             >
//                 <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> BACK TO PORTAL
//             </button>

//             <div className="max-w-3xl mx-auto bg-white dark:bg-[#0f172a] p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-white/5 relative">
//                 <div className="mb-10 text-center">
//                     <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
//                         {id ? 'Modify' : 'Secure'} <span className="text-blue-600">Appointment</span>
//                     </h2>
//                     <p className="text-slate-400 font-bold text-[10px] tracking-[0.3em] uppercase mt-2 italic">
//                         {id ? `Tracking ID: ${id}` : 'Clinic Management System'}
//                     </p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Patient Selection */}
//                         <div className="space-y-2 relative">
//                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Select Patient</label>
//                             <User className="absolute left-5 top-52 text-blue-500 z-10" size={20} />
//                             <select 
//                                 required 
//                                 disabled={!!id} // Edit mode mein patient change nahi hona chahiye (logic pe depend karta hai)
//                                 value={formData.patient} 
//                                 className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 dark:bg-black/20 dark:text-white border-none outline-none ring-1 ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer disabled:opacity-50" 
//                                 onChange={(e) => setFormData({...formData, patient: e.target.value})}
//                             >
//                                 <option value="">Choose Patient...</option>
//                                 {patients.map(p => (
//                                     <option key={p._id} value={p._id} className="dark:bg-slate-900">{p.name}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Doctor Selection */}
//                         <div className="space-y-2 relative">
//                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Assign Staff</label>
//                             <UserCheck className="absolute left-5 top-52 text-blue-500 z-10" size={20} />
//                             <select 
//                                 required 
//                                 value={formData.doctor} 
//                                 className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 dark:bg-black/20 dark:text-white border-none outline-none ring-1 ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer" 
//                                 onChange={(e) => setFormData({...formData, doctor: e.target.value})}
//                             >
//                                 <option value="">Assign Doctor...</option>
//                                 {doctors.map(d => (
//                                     <option key={d._id} value={d._id} className="dark:bg-slate-900">Dr. {d.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* DatePicker */}
//                     <div className="space-y-2 relative">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Schedule Date & Time</label>
//                         <CalendarIcon className="absolute left-5 top-52px text-blue-500 z-10" size={20} />
//                         <DatePicker
//                             selected={selectedDate}
//                             onChange={(date) => setSelectedDate(date)}
//                             showTimeSelect
//                             timeFormat="HH:mm"
//                             timeIntervals={15}
//                             dateFormat="MMMM d, yyyy h:mm aa"
//                             required
//                             placeholderText="Select time slot..."
//                             className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 dark:bg-black/20 dark:text-white border-none outline-none ring-1 ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
//                             wrapperClassName="w-full"
//                         />
//                     </div>

//                     {/* Reason */}
//                     <div className="space-y-2 relative">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Reason for Visit</label>
//                         <MessageSquare className="absolute left-5 top-52px text-blue-500 z-10" size={20} />
//                         <textarea 
//                             required 
//                             value={formData.reason}
//                             className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 dark:bg-black/20 dark:text-white border-none outline-none ring-1 ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-blue-500 min-h-120px transition-all resize-none" 
//                             onChange={(e) => setFormData({...formData, reason: e.target.value})}
//                         ></textarea>
//                     </div>

//                     <button 
//                         type="submit" 
//                         disabled={loading} 
//                         className="w-full py-6 bg-blue-600 hover:bg-slate-900 dark:hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-[0.2em] italic transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50"
//                     >
//                         {loading ? <Loader2 className="animate-spin mx-auto" /> : id ? "UPDATE APPOINTMENT" : "FINALIZE BOOKING"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }





// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { toast, ToastContainer } from 'react-toastify';
// import { Calendar as CalendarIcon, User, UserCheck, MessageSquare, ArrowLeft, Loader2, ChevronDown } from 'lucide-react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// export default function BookAppointment() {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [patients, setPatients] = useState([]);
//     const [doctors, setDoctors] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [fetching, setFetching] = useState(true);
    
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [formData, setFormData] = useState({
//         patient: '',
//         doctor: '',
//         reason: ''
//     });

//     useEffect(() => {
//         const loadInitialData = async () => {
//             try {
//                 setFetching(true);
//                 const [patientsRes, doctorsRes] = await Promise.all([
//                     API.get('/receptionist/all-patients'),
//                     API.get('/admin/doctors')
//                 ]);

//                 setPatients(patientsRes.data?.data || []);
//                 setDoctors(doctorsRes.data?.data || []);

//                 if (id) {
//                     const res = await API.get(`/receptionist/appointment/${id}`);
//                     const appData = res.data?.data;
//                     if (appData) {
//                         setFormData({
//                             patient: appData.patient?._id || appData.patient,
//                             doctor: appData.doctor?._id || appData.doctor,
//                             reason: appData.reason || ''
//                         });
//                         if (appData.date) setSelectedDate(new Date(appData.date));
//                     }
//                 }
//             } catch (err) {
//                 toast.error("Failed to sync clinical data!");
//             } finally {
//                 setFetching(false);
//             }
//         };
//         loadInitialData();
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if(!selectedDate || !formData.patient || !formData.doctor) return toast.warn("Incomplete fields!");

//         const dataToSubmit = { ...formData, date: selectedDate.toISOString() };
//         setLoading(true);
//         try {
//             if (id) {
//                 await API.put(`/receptionist/appointment/${id}`, dataToSubmit);
//                 toast.success("Updated!");
//             } else {
//                 await API.post('/receptionist/book', dataToSubmit);
//                 toast.success("Booked!");
//             }
//             setTimeout(() => navigate('/dashboard'), 1500);
//         } catch (err) {
//             toast.error("Operation failed!");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // common styles
//     const inputBase = "w-full pl-14 pr-10 py-5 rounded-2xl bg-slate-50 dark:bg-black/40 dark:text-white border-none outline-none ring-1 ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer";
//     const iconBase = "absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 z-10 pointer-events-none";

//     if (fetching) return (
//         <div className="h-screen flex flex-col items-center justify-center bg-[#020617] gap-4">
//             <Loader2 className="animate-spin text-blue-600" size={40} />
//             <p className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase italic">Syncing Resources...</p>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-6 md:p-12 font-sans transition-all duration-300">
//             <ToastContainer theme="dark" />
            
//             <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-black text-[10px] tracking-widest group">
//                 <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> BACK TO PORTAL
//             </button>

//             <div className="max-w-4xl mx-auto bg-white dark:bg-[#0f172a] p-8 md:p-16 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-white/5 relative">
//                 <div className="mb-12 text-center">
//                     <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
//                         {id ? 'Modify' : 'Secure'} <span className="text-blue-600">Appointment</span>
//                     </h2>
//                     <p className="text-slate-400 font-bold text-[10px] tracking-[0.4em] uppercase mt-3 opacity-60 italic">Clinic Management System — Secure Channel</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     {/* Patient Selection */}
//                     <div className="flex flex-col gap-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Select Patient</label>
//                         <div className="relative group">
//                             <User className={iconBase} size={20} />
//                             <select 
//                                 required disabled={!!id} 
//                                 value={formData.patient} 
//                                 className={inputBase}
//                                 onChange={(e) => setFormData({...formData, patient: e.target.value})}
//                             >
//                                 <option value="">Choose Patient...</option>
//                                 {patients.map(p => <option key={p._id} value={p._id} className="dark:bg-[#0f172a]">{p.name}</option>)}
//                             </select>
//                             <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
//                         </div>
//                     </div>

//                     {/* Doctor Selection */}
//                     <div className="flex flex-col gap-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Assign Staff</label>
//                         <div className="relative group">
//                             <UserCheck className={iconBase} size={20} />
//                             <select 
//                                 required value={formData.doctor} 
//                                 className={inputBase}
//                                 onChange={(e) => setFormData({...formData, doctor: e.target.value})}
//                             >
//                                 <option value="">Assign Doctor...</option>
//                                 {doctors.map(d => <option key={d._id} value={d._id} className="dark:bg-[#0f172a]">Dr. {d.name}</option>)}
//                             </select>
//                             <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
//                         </div>
//                     </div>

//                     {/* DatePicker */}
//                     <div className="md:col-span-2 flex flex-col gap-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Schedule Date & Time</label>
//                         <div className="relative group custom-datepicker-container">
//                             <CalendarIcon className={iconBase} size={20} />
//                             <DatePicker
//                                 selected={selectedDate}
//                                 onChange={(date) => setSelectedDate(date)}
//                                 showTimeSelect
//                                 timeFormat="HH:mm"
//                                 timeIntervals={15}
//                                 dateFormat="MMMM d, yyyy h:mm aa"
//                                 required
//                                 placeholderText="Select time slot..."
//                                 className={`${inputBase} !pr-6`} // Remove fixed appearance for DP
//                                 wrapperClassName="w-full"
//                             />
//                         </div>
//                     </div>

//                     {/* Reason */}
//                     <div className="md:col-span-2 flex flex-col gap-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Reason for Visit</label>
//                         <div className="relative group">
//                             <MessageSquare className="absolute left-5 top-6 text-blue-500 pointer-events-none" size={20} />
//                             <textarea 
//                                 required value={formData.reason}
//                                 placeholder="Describe symptoms..."
//                                 className={`${inputBase} pt-5 h-40 resize-none`} 
//                                 onChange={(e) => setFormData({...formData, reason: e.target.value})}
//                             ></textarea>
//                         </div>
//                     </div>

//                     <button 
//                         type="submit" disabled={loading} 
//                         className="md:col-span-2 w-full py-6 bg-blue-600 hover:bg-slate-900 dark:hover:bg-blue-700 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] italic transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
//                     >
//                         {loading ? <Loader2 className="animate-spin mx-auto" /> : id ? "UPDATE APPOINTMENT" : "FINALIZE BOOKING"}
//                     </button>
//                 </form>
//             </div>
            
//             {/* Minimal CSS for DatePicker Dark Mode Compatibility */}
//             <style>{`
//                 .react-datepicker-wrapper { width: 100%; }
//                 .dark .react-datepicker {
//                     background-color: #0f172a;
//                     border: 1px solid rgba(255,255,255,0.1);
//                     color: white;
//                 }
//                 .dark .react-datepicker__header { background-color: #1e293b; border-bottom: none; }
//                 .dark .react-datepicker__current-month, .dark .react-datepicker__day-name, .dark .react-datepicker__day { color: white; }
//                 .dark .react-datepicker__day:hover { background-color: #3b82f6; }
//                 .dark .react-datepicker__time-container { background-color: #0f172a; border-left: 1px solid rgba(255,255,255,0.1); }
//             `}</style>
//         </div>
//     );
// }



















// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//     Calendar as CalendarIcon, User, UserCheck, MessageSquare, 
//     ArrowLeft, Loader2, ChevronDown 
// } from 'lucide-react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// export default function BookAppointment() {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [patients, setPatients] = useState([]);
//     const [doctors, setDoctors] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [fetching, setFetching] = useState(true);
    
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [formData, setFormData] = useState({
//         patient: '',
//         doctor: '',
//         reason: ''
//     });

//     useEffect(() => {
//         const loadInitialData = async () => {
//             try {
//                 setFetching(true);
//                 // Dono APIs ko parallel call kar rahe hain performance ke liye
//                 const [patientsRes, doctorsRes] = await Promise.all([
//                     API.get('/receptionist/all-patients'),
//                     API.get('/admin/doctors')
//                 ]);

//                 // Backend se data nikalne ka robust tariqa
//                 const pData = patientsRes.data?.data || patientsRes.data || [];
//                 const dData = doctorsRes.data?.data || doctorsRes.data || [];

//                 setPatients(pData);
//                 setDoctors(dData);

//                 // Agar Edit mode (id) hye toh existing appointment fetch karein
//                 if (id) {
//                     const res = await API.get(`/receptionist/appointment/${id}`);
//                     const appData = res.data?.data;
//                     if (appData) {
//                         setFormData({
//                             patient: appData.patient?._id || appData.patient,
//                             doctor: appData.doctor?._id || appData.doctor,
//                             reason: appData.reason || ''
//                         });
//                         if (appData.date) setSelectedDate(new Date(appData.date));
//                     }
//                 }
//             } catch (err) {
//                 console.error("Sync Error:", err);
//                 toast.error("Resource synchronization failed!");
//             } finally {
//                 setFetching(false);
//             }
//         };
//         loadInitialData();
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if(!selectedDate || !formData.patient || !formData.doctor) {
//             return toast.warn("Incomplete Protocol Fields!");
//         }

//         const dataToSubmit = { ...formData, date: selectedDate.toISOString() };
//         setLoading(true);
//         try {
//             if (id) {
//                 await API.put(`/receptionist/appointment/${id}`, dataToSubmit);
//                 toast.success("Appointment Log Updated!");
//             } else {
//                 await API.post('/receptionist/book', dataToSubmit);
//                 toast.success("Appointment Synchronized to DB!");
//             }
//             setTimeout(() => navigate('/dashboard'), 1500);
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Operation failed!");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Styling Constants
//     const inputBase = "w-full pl-14 pr-10 py-5 rounded-2xl bg-white dark:bg-black/40 dark:text-white border-none outline-none ring-1 ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer";
//     const iconBase = "absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 z-10 pointer-events-none";

//     if (fetching) return (
//         <div className="h-screen flex flex-col items-center justify-center bg-[#020617] gap-4">
//             <Loader2 className="animate-spin text-blue-600" size={40} />
//             <p className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase italic">Parsing Clinical Data...</p>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-6 md:p-12 font-sans selection:bg-blue-500/30">
//             <ToastContainer theme="dark" />
            
//             <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-black text-[10px] tracking-widest group transition-colors">
//                 <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> BACK TO PORTAL
//             </button>

//             <div className="max-w-4xl mx-auto bg-white dark:bg-[#0f172a] p-8 md:p-16 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-white/5 relative overflow-hidden">
//                 {/* Header Section */}
//                 <div className="mb-12 text-center relative z-10">
//                     <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
//                         {id ? 'Modify' : 'Secure'} <span className="text-blue-600">Appointment</span>
//                     </h2>
//                     <p className="text-slate-400 font-bold text-[10px] tracking-[0.4em] uppercase mt-3 opacity-60 italic">Clinic OS — Data Integrity Protocol</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    
//                     {/* Patient Selection - FIXED MAPPING */}
//                     <div className="flex flex-col gap-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Select Patient</label>
//                         <div className="relative group">
//                             <User className={iconBase} size={20} />
//                             <select 
//                                 required disabled={!!id} 
//                                 value={formData.patient} 
//                                 className={inputBase}
//                                 onChange={(e) => setFormData({...formData, patient: e.target.value})}
//                             >
//                                 <option value="">Choose Patient...</option>
//                                 {patients.map(p => (
//                                     <option key={p._id || p.id} value={p._id || p.id} className="dark:bg-[#0f172a]">
//                                         {p.name || (p.user && p.user.name) || "Unknown Identity"}
//                                     </option>
//                                 ))}
//                             </select>
//                             <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
//                         </div>
//                     </div>

//                     {/* Doctor Selection */}
//                     <div className="flex flex-col gap-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Assign Staff</label>
//                         <div className="relative group">
//                             <UserCheck className={iconBase} size={20} />
//                             <select 
//                                 required value={formData.doctor} 
//                                 className={inputBase}
//                                 onChange={(e) => setFormData({...formData, doctor: e.target.value})}
//                             >
//                                 <option value="">Assign Doctor...</option>
//                                 {doctors.map(d => (
//                                     <option key={d._id || d.id} value={d._id || d.id} className="dark:bg-[#0f172a]">
//                                         Dr. {d.name || (d.user && d.user.name)}
//                                     </option>
//                                 ))}
//                             </select>
//                             <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
//                         </div>
//                     </div>

//                     {/* DatePicker */}
//                     <div className="md:col-span-2 flex flex-col gap-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Schedule Date & Time</label>
//                         <div className="relative group custom-datepicker-container">
//                             <CalendarIcon className={iconBase} size={20} />
//                             <DatePicker
//                                 selected={selectedDate}
//                                 onChange={(date) => setSelectedDate(date)}
//                                 showTimeSelect
//                                 timeFormat="HH:mm"
//                                 timeIntervals={15}
//                                 dateFormat="MMMM d, yyyy h:mm aa"
//                                 required
//                                 placeholderText="Select time slot..."
//                                 className={`${inputBase} !pr-6`}
//                                 wrapperClassName="w-full"
//                             />
//                         </div>
//                     </div>

//                     {/* Reason */}
//                     <div className="md:col-span-2 flex flex-col gap-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Reason for Visit</label>
//                         <div className="relative group">
//                             <MessageSquare className="absolute left-5 top-6 text-blue-500 pointer-events-none" size={20} />
//                             <textarea 
//                                 required value={formData.reason}
//                                 placeholder="Describe symptoms or clinical reason..."
//                                 className={`${inputBase} pt-5 h-40 resize-none`} 
//                                 onChange={(e) => setFormData({...formData, reason: e.target.value})}
//                             ></textarea>
//                         </div>
//                     </div>

//                     {/* Action Button */}
//                     <button 
//                         type="submit" disabled={loading} 
//                         className="md:col-span-2 w-full py-6 bg-blue-600 hover:bg-slate-900 dark:hover:bg-blue-700 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] italic transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-3"
//                     >
//                         {loading ? <Loader2 className="animate-spin" /> : id ? "COMMIT UPDATE" : "FINALIZE BOOKING"}
//                     </button>
//                 </form>
//             </div>
            
//             <style>{`
//                 .react-datepicker-wrapper { width: 100%; }
//                 .dark .react-datepicker {
//                     background-color: #0f172a;
//                     border: 1px solid rgba(255,255,255,0.1);
//                     color: white;
//                     font-family: inherit;
//                 }
//                 .dark .react-datepicker__header { background-color: #1e293b; border-bottom: none; }
//                 .dark .react-datepicker__current-month, .dark .react-datepicker__day-name, .dark .react-datepicker__day { color: white; }
//                 .dark .react-datepicker__day:hover { background-color: #3b82f6; border-radius: 0.5rem; }
//                 .dark .react-datepicker__time-container { background-color: #0f172a; border-left: 1px solid rgba(255,255,255,0.1); }
//                 .dark .react-datepicker__time-box { background-color: #0f172a; }
//                 .dark .react-datepicker__time-list-item:hover { background-color: #3b82f6 !important; }
//             `}</style>
//         </div>
//     );
// }







































import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../util/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    Calendar as CalendarIcon, User, UserCheck, MessageSquare, 
    ArrowLeft, Loader2, ChevronDown 
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookAppointment() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    
    const [selectedDate, setSelectedDate] = useState(null);
    const [formData, setFormData] = useState({
        patient: '',
        doctor: '',
        reason: ''
    });

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setFetching(true);
                const [patientsRes, doctorsRes] = await Promise.all([
                    API.get('/receptionist/all-patients'),
                    API.get('/admin/doctors')
                ]);

                const pData = patientsRes.data?.data || patientsRes.data || [];
                const dData = doctorsRes.data?.data || doctorsRes.data || [];

                setPatients(pData);
                setDoctors(dData);

                if (id) {
                    const res = await API.get(`/receptionist/appointment/${id}`);
                    const appData = res.data?.data;
                    if (appData) {
                        setFormData({
                            patient: appData.patient?._id || appData.patient,
                            doctor: appData.doctor?._id || appData.doctor,
                            reason: appData.reason || ''
                        });
                        if (appData.date) setSelectedDate(new Date(appData.date));
                    }
                }
            } catch (err) {
                console.error("Sync Error:", err);
                toast.error("Resource synchronization failed!");
            } finally {
                setFetching(false);
            }
        };
        loadInitialData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!selectedDate || !formData.patient || !formData.doctor) {
            return toast.warn("Incomplete Protocol Fields!");
        }

        const dataToSubmit = { ...formData, date: selectedDate.toISOString() };
        setLoading(true);
        try {
            if (id) {
                await API.put(`/receptionist/appointment/${id}`, dataToSubmit);
                toast.success("Appointment Log Updated!");
            } else {
                await API.post('/receptionist/book', dataToSubmit);
                toast.success("Appointment Synchronized to DB!");
            }
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed!");
        } finally {
            setLoading(false);
        }
    };

    // Styling Constants with Interactive Pointers
    const inputBase = "w-full pl-14 pr-10 py-5 rounded-2xl bg-white dark:bg-black/40 dark:text-white border-none outline-none ring-1 ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all appearance-none cursor-pointer group-focus-within:ring-blue-500";
    const iconBase = "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 group-focus-within:scale-110 transition-all z-10 pointer-events-none";

    if (fetching) return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#020617] gap-4">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase italic">Parsing Clinical Data...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-6 md:p-12 font-sans selection:bg-blue-500/30">
            <ToastContainer theme="dark" />
            
            {/* BACK BUTTON WITH POINTER */}
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-black text-[10px] tracking-widest group transition-all active:scale-90 cursor-pointer"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> BACK TO PORTAL
            </button>

            <div className="max-w-4xl mx-auto bg-white dark:bg-[#0f172a] p-8 md:p-16 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-white/5 relative overflow-hidden transition-all duration-500">
                {/* Header Section */}
                <div className="mb-12 text-center relative z-10">
                    <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                        {id ? 'Modify' : 'Secure'} <span className="text-blue-600">Appointment</span>
                    </h2>
                    <p className="text-slate-400 font-bold text-[10px] tracking-[0.4em] uppercase mt-3 opacity-60 italic">Clinic OS — Data Integrity Protocol</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    
                    {/* Patient Selection */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Select Patient</label>
                        <div className="relative group">
                            <User className={iconBase} size={20} />
                            <select 
                                required disabled={!!id} 
                                value={formData.patient} 
                                className={`${inputBase} ${id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onChange={(e) => setFormData({...formData, patient: e.target.value})}
                            >
                                <option value="">Choose Patient...</option>
                                {patients.map(p => (
                                    <option key={p._id || p.id} value={p._id || p.id} className="dark:bg-[#0f172a]">
                                        {p.name || (p.user && p.user.name) || "Unknown Identity"}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:rotate-180 transition-transform pointer-events-none" size={16} />
                        </div>
                    </div>

                    {/* Doctor Selection */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Assign Staff</label>
                        <div className="relative group">
                            <UserCheck className={iconBase} size={20} />
                            <select 
                                required value={formData.doctor} 
                                className={inputBase}
                                onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                            >
                                <option value="">Assign Doctor...</option>
                                {doctors.map(d => (
                                    <option key={d._id || d.id} value={d._id || d.id} className="dark:bg-[#0f172a]">
                                        Dr. {d.name || (d.user && d.user.name)}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:rotate-180 transition-transform pointer-events-none" size={16} />
                        </div>
                    </div>

                    {/* DatePicker */}
                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Schedule Date & Time</label>
                        <div className="relative group custom-datepicker-container">
                            <CalendarIcon className={iconBase} size={20} />
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                required
                                placeholderText="Select time slot..."
                                className={`${inputBase} !pr-6 hover:border-blue-500/50`}
                                wrapperClassName="w-full"
                            />
                        </div>
                    </div>

                    {/* Reason */}
                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Reason for Visit</label>
                        <div className="relative group">
                            <MessageSquare className="absolute left-5 top-6 text-slate-400 group-focus-within:text-blue-500 transition-all pointer-events-none" size={20} />
                            <textarea 
                                required value={formData.reason}
                                placeholder="Describe symptoms or clinical reason..."
                                className={`${inputBase} pt-5 h-40 resize-none hover:shadow-lg transition-all`} 
                                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                            ></textarea>
                        </div>
                    </div>

                    {/* Action Button WITH CLICK EFFECT */}
                    <button 
                        type="submit" disabled={loading} 
                        className="md:col-span-2 w-full py-6 bg-blue-600 hover:bg-slate-900 dark:hover:bg-blue-700 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] italic transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-3 group"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <>
                                {id ? "COMMIT UPDATE" : "FINALIZE BOOKING"}
                                <ChevronDown size={20} className="-rotate-90 group-hover:translate-x-2 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
            
            <style>{`
                .react-datepicker-wrapper { width: 100%; }
                .dark .react-datepicker {
                    background-color: #0f172a;
                    border: 1px solid rgba(255,255,255,0.1);
                    color: white;
                    border-radius: 1.5rem;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .dark .react-datepicker__header { background-color: #1e293b; border-bottom: none; }
                .dark .react-datepicker__current-month, .dark .react-datepicker__day-name, .dark .react-datepicker__day { color: white; }
                .dark .react-datepicker__day:hover { background-color: #3b82f6; border-radius: 0.5rem; transform: scale(1.1); transition: all 0.2s; }
                .dark .react-datepicker__day--selected { background-color: #3b82f6 !important; border-radius: 0.5rem; }
                .dark .react-datepicker__time-container { background-color: #0f172a; border-left: 1px solid rgba(255,255,255,0.1); }
                .dark .react-datepicker__time-box { background-color: #0f172a; }
                .dark .react-datepicker__time-list-item:hover { background-color: #3b82f6 !important; transition: all 0.2s; }
            `}</style>
        </div>
    );
}