

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // useSearchParams add kiya
import API from '../util/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserPlus, Mail, Lock, UserCheck, Loader2, Shield, LockKeyhole } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'defalt' });
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(true); // Page lock state
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // --- Secret Key Configuration ---
  // Ye wahi key honi chahiye jo aapne backend .env mein rakhi hai
  const ADMIN_SECRET_KEY = "786"; 

  useEffect(() => {
    const secret = searchParams.get("secret");
    if (secret === ADMIN_SECRET_KEY) {
      setIsLocked(false);
    }
  }, [searchParams]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Backend ko secret key query mein bhej rahe hain
    const regToastId = toast.loading("Verifying Admin Secret...", { theme: "light" });

    try {
      // URL mein query parameter attach kar diya
      await API.post(`/auth/register?secret=${ADMIN_SECRET_KEY}`, formData);
      
      toast.update(regToastId, { 
        render: "Admin Access Granted! Account Created.", 
        type: "success", 
        isLoading: false, 
        autoClose: 2000,
        theme: "light"
      });

      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration Failed!";
      toast.update(regToastId, { 
        render: errorMsg, 
        type: "error", 
        isLoading: false, 
        autoClose: 3000,
        theme: "light"
      });
    } finally {
      setLoading(false);
    }
  };

  // Agar Secret Key galat hai to ye screen nazar aayegi
  if (isLocked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <div className="h-24 w-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <LockKeyhole size={48} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">Access <span className="text-red-600">Denied</span></h1>
        <p className="text-slate-500 font-bold max-w-sm mt-4 uppercase text-[10px] tracking-[0.2em]">
          This registration portal is encrypted. Only authorized administrators with a secure link can access this page.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all cursor-pointer"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 font-sans animate-in fade-in duration-700">
      <ToastContainer theme="light" />

      <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-indigo-100/50 w-full max-w-md border border-white relative overflow-hidden">
        
        {/* Decorative Shield Icon */}
        <div className="absolute -top-6 -right-6 text-indigo-50 opacity-50">
           <Shield size={150} />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full mb-6 border border-indigo-100">
              <Shield size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Admin Authorized Page</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Join <span className="text-indigo-600">ClinicOS</span></h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Create secure staff credentials</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name */}
            <div className="relative group">
              <UserCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
              <input 
                type="text" placeholder="Full Name" 
                className="w-full p-5 pl-14 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner"
                onChange={(e) => setFormData({...formData, name: e.target.value})} required 
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
              <input 
                type="email" placeholder="Email Address" 
                className="w-full p-5 pl-14 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner"
                onChange={(e) => setFormData({...formData, email: e.target.value})} required 
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
              <input 
                type="password" placeholder="Secure Password" 
                className="w-full p-5 pl-14 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner"
                onChange={(e) => setFormData({...formData, password: e.target.value})} required 
              />
            </div>

            {/* Role Selection */}
            <div className="relative group">
              <Shield className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
              <select 
                className="w-full p-5 pl-14 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-600 transition-all shadow-inner appearance-none cursor-pointer"
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                value={formData.role}
              >
                <option  className="cursor-pointer">Defalt</option>
                <option value="admin" className="cursor-pointer">Admin</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-6 rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer
                ${loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-indigo-100'}`}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Verify & Authorize"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
            Back to portal? <span className="text-indigo-600 cursor-pointer hover:underline" onClick={() => navigate('/')}>Login Here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;




