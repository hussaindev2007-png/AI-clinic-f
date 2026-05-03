
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
        render: "Synchronized Successfully!", 
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
