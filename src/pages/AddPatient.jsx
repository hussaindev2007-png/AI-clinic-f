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

      
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-2xl w-full">
        
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
