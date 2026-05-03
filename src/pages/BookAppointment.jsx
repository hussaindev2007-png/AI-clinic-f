
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
            
            
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-black text-[10px] tracking-widest group transition-all active:scale-90 cursor-pointer"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> BACK TO PORTAL
            </button>

            <div className="max-w-4xl mx-auto bg-white dark:bg-[#0f172a] p-8 md:p-16 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-white/5 relative overflow-hidden transition-all duration-500">
                
                <div className="mb-12 text-center relative z-10">
                    <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                        {id ? 'Modify' : 'Secure'} <span className="text-blue-600">Appointment</span>
                    </h2>
                    <p className="text-slate-400 font-bold text-[10px] tracking-[0.4em] uppercase mt-3 opacity-60 italic">Clinic OS — Data Integrity Protocol</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    
                    
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
