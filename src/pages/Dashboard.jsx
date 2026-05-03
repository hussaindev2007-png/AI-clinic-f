
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
