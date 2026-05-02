// import { useState, useEffect, Activity } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { toast, ToastContainer } from 'react-toastify';
// import { 
//   Search, Calendar, Clock, User, 
//   Edit, Trash2, CheckCircle, Loader2, ArrowLeft 
// } from 'lucide-react';

// export default function AppointmentsList() {
//     const [appointments, setAppointments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchAppointments();
//     }, []);

//     const fetchAppointments = async () => {
//         try {
//             setLoading(true);
//             const res = await API.get('/receptionist/schedule'); // Check your endpoint
//             setAppointments(res.data?.data || res.data || []);
//         } catch (err) {
//             toast.error("Failed to load appointments");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
//         try {
//             await API.delete(`/receptionist/appointment/${id}`);
//             toast.success("Appointment Cancelled");
//             setAppointments(appointments.filter(app => app._id !== id));
//         } catch (err) {
//             toast.error("Delete failed");
//         }
//     };

//     const filteredAppointments = appointments.filter(app => 
//         app.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         app.patient?.phone?.includes(searchTerm)
//     );

//     if (loading) return (
//         <div className="h-screen flex items-center justify-center bg-[#020617]">
//             <Loader2 className="animate-spin text-blue-600" size={40} />
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-6 md:p-10 font-sans">
//             <ToastContainer theme="colored" />
            
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
//                     <div>
//                         <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic">
//                             Daily <span className="text-blue-600">Schedule</span>
//                         </h2>
//                         <p className="text-slate-400 font-bold text-[10px] tracking-widest mt-1 uppercase">Manage all clinical bookings</p>
//                     </div>

//                     {/* Search Bar */}
//                     <div className="relative group">
//                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
//                         <input 
//                             type="text" 
//                             placeholder="Search by name or phone..."
//                             className="pl-12 pr-6 py-4 w-full md:w-80 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-white/5 outline-none ring-2 ring-transparent focus:ring-blue-500/20 dark:text-white transition-all shadow-sm"
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 {/* Table Container */}
//                 <div className="bg-white dark:bg-[#0f172a] rounded-[2rem] shadow-xl border border-slate-100 dark:border-white/5 overflow-hidden">
//                     <div className="overflow-x-auto">
//                         <table className="w-full text-left border-collapse">
//                             <thead>
//                                 <tr className="bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
//                                     <th className="px-8 py-6">Patient Details</th>
//                                     <th className="px-8 py-6">Doctor</th>
//                                     <th className="px-8 py-6">Date & Time</th>
//                                     <th className="px-8 py-6 text-center">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-slate-100 dark:divide-white/5">
//                                 {filteredAppointments.map((app) => (
//                                     <tr key={app._id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group">
//                                         <td className="px-8 py-6">
//                                             <div className="flex items-center gap-3">
//                                                 <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold">
//                                                     {app.patient?.name?.charAt(0)}
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-bold text-slate-900 dark:text-white">{app.patient?.name}</p>
//                                                     <p className="text-xs text-slate-400">{app.patient?.phone}</p>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className="px-8 py-6 font-semibold text-slate-600 dark:text-slate-300">
//                                             Dr. {app.doctor?.name}
//                                         </td>
//                                         <td className="px-8 py-6">
//                                             <div className="flex flex-col gap-1">
//                                                 <span className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 uppercase">
//                                                     <Calendar size={14} className="text-blue-500" />
//                                                     {new Date(app.date).toLocaleDateString()}
//                                                 </span>
//                                                 <span className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
//                                                     <Clock size={14} />
//                                                     {new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                                 </span>
//                                             </div>
//                                         </td>
//                                         <td className="px-8 py-6">
//                                             <div className="flex items-center justify-center gap-2">
//                                                 <button 
//                                                     onClick={() => navigate(`/edit-patient/${app.patient?._id}`)}
//                                                     className="p-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
//                                                     title="Edit Patient"
//                                                 >
//                                                     <Edit size={18} />
//                                                 </button>
//                                                 <button 
//                                                     onClick={() => handleDelete(app._id)}
//                                                     className="p-3 bg-red-100 dark:bg-red-500/10 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
//                                                     title="Cancel Appointment"
//                                                 >
//                                                     <Trash2 size={18} />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
                        
//                         {filteredAppointments.length === 0 && (
//                             <div className="py-20 text-center">
//                                 <Activity size={48} className="mx-auto text-slate-200 dark:text-white/10 mb-4" />
//                                 <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No appointments found</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }




















// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../util/api';
// import { toast, ToastContainer } from 'react-toastify';
// import { 
//   Search, Calendar, Clock, 
//   Edit, Trash2, Loader2, Activity 
// } from 'lucide-react';

// export default function AppointmentsList() {
//     const [appointments, setAppointments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchAppointments();
//     }, []);

//     const fetchAppointments = async () => {
//         try {
//             setLoading(true);
//             const res = await API.get('/receptionist/schedule');
//             setAppointments(res.data?.data || res.data || []);
//         } catch (err) {
//             toast.error("Failed to load appointments");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
//         try {
//             await API.delete(`/receptionist/appointment/${id}`);
//             toast.success("Appointment Cancelled");
//             setAppointments(prev => prev.filter(app => app._id !== id));
//         } catch (err) {
//             toast.error("Delete failed");
//         }
//     };

//     const filteredAppointments = appointments.filter(app => 
//         app.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         app.patient?.phone?.includes(searchTerm)
//     );

//     if (loading) return (
//         <div className="h-screen flex items-center justify-center bg-[#020617]">
//             <Loader2 className="animate-spin text-blue-600" size={40} />
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#020617] text-white font-sans flex overflow-hidden">
//             {/* Sidebar spacing handle karne ke liye flex-1 aur overflow-y-auto use kiya hai */}
//             <div className="flex-1 h-screen overflow-y-auto p-4 md:p-10 custom-scrollbar">
//                 <ToastContainer theme="dark" />
                
//                 <div className="max-w-7xl mx-auto">
//                     {/* Header */}
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
//                         <div>
//                             <h2 className="text-3xl font-black uppercase italic tracking-tighter">
//                                 Daily <span className="text-blue-500">Schedule</span>
//                             </h2>
//                             <p className="text-slate-500 font-bold text-[10px] tracking-[0.3em] uppercase mt-1">
//                                 Node Status: Receptionist
//                             </p>
//                         </div>

//                         <div className="relative group w-full md:w-80">
//                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
//                             <input 
//                                 type="text" 
//                                 placeholder="Search by name..."
//                                 className="w-full pl-12 pr-6 py-4 rounded-2xl bg-[#0f172a]/50 border border-white/5 outline-none focus:border-blue-500/50 transition-all shadow-2xl placeholder:text-slate-600"
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     {/* Table Container */}
//                     <div className="bg-[#0f172a]/30 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden">
//                         <div className="overflow-x-auto">
//                             <table className="w-full text-left min-w-[800px] border-separate border-spacing-y-2 px-4">
//                                 <thead>
//                                     <tr className="text-[10px] font-black uppercase tracking-widest text-slate-500">
//                                         <th className="px-6 py-6 text-blue-500/50">Patient Details</th>
//                                         <th className="px-6 py-6 text-center md:text-left">Assigned Doctor</th>
//                                         <th className="px-6 py-6">Time Slot</th>
//                                         <th className="px-6 py-6 text-center text-blue-500/50">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-white/5">
//                                     {filteredAppointments.map((app) => (
//                                         <tr key={app._id} className="group hover:bg-white/[0.02] transition-all">
//                                             <td className="px-6 py-6">
//                                                 <div className="flex items-center gap-4">
//                                                     <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-black border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
//                                                         {app.patient?.name?.charAt(0)}
//                                                     </div>
//                                                     <div>
//                                                         <p className="font-bold text-slate-200 uppercase tracking-tight">{app.patient?.name}</p>
//                                                         <p className="text-[10px] text-slate-500 font-mono tracking-tighter">{app.patient?.phone}</p>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-6">
//                                                 <p className="font-bold text-slate-400">Dr. {app.doctor?.name}</p>
//                                             </td>
//                                             <td className="px-6 py-6">
//                                                 <div className="flex flex-col gap-1">
//                                                     <span className="flex items-center gap-2 text-[11px] font-black text-blue-400 italic tracking-widest uppercase">
//                                                         <Clock size={14} />
//                                                         {new Date(app.date).toLocaleTimeString('en-US', { 
//                                                             hour: '2-digit', 
//                                                             minute: '2-digit', 
//                                                             hour12: true 
//                                                         })}
//                                                     </span>
//                                                     <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
//                                                         <Calendar size={12} />
//                                                         {new Date(app.date).toLocaleDateString()}
//                                                     </span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-6">
//                                                 <div className="flex items-center justify-center gap-3">
                                                   
// <button 
//     onClick={() => navigate(`/book-appointment/${app._id}`)} 
//     className="p-3 bg-white/5 rounded-xl hover:bg-blue-600 ..."
// >
//     <Edit size={18} />
// </button>
//                                                     <button 
//                                                         onClick={() => handleDelete(app._id)}
//                                                         className="p-3 bg-red-500/10 rounded-xl hover:bg-red-600 transition-all text-red-500 hover:text-white group-hover:scale-105"
//                                                         title="Delete"
//                                                     >
//                                                         <Trash2 size={18} />
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
                            
//                             {filteredAppointments.length === 0 && (
//                                 <div className="py-24 flex flex-col items-center justify-center">
//                                     <Activity size={48} className="text-white/5 animate-pulse mb-4" />
//                                     <p className="text-slate-600 font-black uppercase tracking-[0.3em] text-[10px]">No Appointments Found</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


















import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../util/api';
import { toast, ToastContainer } from 'react-toastify';
import { 
  Search, Calendar, Clock, 
  Edit, Trash2, Loader2, Activity 
} from 'lucide-react';

export default function AppointmentsList() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const res = await API.get('/receptionist/schedule');
            setAppointments(res.data?.data || res.data || []);
        } catch (err) {
            toast.error("Failed to load appointments");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
        try {
            await API.delete(`/receptionist/appointment/${id}`);
            toast.success("Appointment Cancelled");
            setAppointments(prev => prev.filter(app => app._id !== id));
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    const filteredAppointments = appointments.filter(app => 
        app.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.patient?.phone?.includes(searchTerm)
    );

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-[#020617]">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans flex overflow-hidden selection:bg-blue-500/30">
            <div className="flex-1 h-screen overflow-y-auto p-4 md:p-10 custom-scrollbar">
                <ToastContainer theme="dark" />
                
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                                Daily <span className="text-blue-500">Schedule</span>
                            </h2>
                            <p className="text-slate-500 font-bold text-[10px] tracking-[0.3em] uppercase mt-1">
                                Node Status: Receptionist
                            </p>
                        </div>

                        {/* Search Bar with Pointer Logic */}
                        <div className="relative group w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 group-focus-within:scale-110 transition-all" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by name..."
                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-[#0f172a]/50 border border-white/5 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-2xl placeholder:text-slate-600 cursor-text"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-[#0f172a]/30 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[800px] border-separate border-spacing-y-2 px-4">
                                <thead>
                                    <tr className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        <th className="px-6 py-6 text-blue-500/50">Patient Details</th>
                                        <th className="px-6 py-6 text-center md:text-left">Assigned Doctor</th>
                                        <th className="px-6 py-6">Time Slot</th>
                                        <th className="px-6 py-6 text-center text-blue-500/50">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredAppointments.map((app) => (
                                        <tr key={app._id} className="group hover:bg-white/[0.03] transition-all cursor-default">
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-black border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:scale-110 transition-transform">
                                                        {app.patient?.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-200 uppercase tracking-tight group-hover:text-white transition-colors">{app.patient?.name}</p>
                                                        <p className="text-[10px] text-slate-500 font-mono tracking-tighter">{app.patient?.phone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <p className="font-bold text-slate-400 group-hover:text-slate-200 transition-colors">Dr. {app.doctor?.name}</p>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex flex-col gap-1">
                                                    <span className="flex items-center gap-2 text-[11px] font-black text-blue-400 italic tracking-widest uppercase">
                                                        <Clock size={14} />
                                                        {new Date(app.date).toLocaleTimeString('en-US', { 
                                                            hour: '2-digit', 
                                                            minute: '2-digit', 
                                                            hour12: true 
                                                        })}
                                                    </span>
                                                    <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                                                        <Calendar size={12} />
                                                        {new Date(app.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center justify-center gap-3">
                                                    {/* EDIT BUTTON */}
                                                    <button 
                                                        onClick={() => navigate(`/book-appointment/${app._id}`)} 
                                                        className="p-3 bg-white/5 rounded-xl hover:bg-blue-600 transition-all text-slate-400 hover:text-white active:scale-90 cursor-pointer shadow-lg hover:shadow-blue-500/20"
                                                        title="Modify Record"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    
                                                    {/* DELETE BUTTON */}
                                                    <button 
                                                        onClick={() => handleDelete(app._id)}
                                                        className="p-3 bg-red-500/10 rounded-xl hover:bg-red-600 transition-all text-red-500 hover:text-white active:scale-90 cursor-pointer shadow-lg hover:shadow-red-500/20"
                                                        title="Terminate Entry"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            {filteredAppointments.length === 0 && (
                                <div className="py-24 flex flex-col items-center justify-center">
                                    <Activity size={48} className="text-white/5 animate-pulse mb-4" />
                                    <p className="text-slate-600 font-black uppercase tracking-[0.3em] text-[10px]">No Appointments Found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.3); }
            `}</style>
        </div>
    );
}