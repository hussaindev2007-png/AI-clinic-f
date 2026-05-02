import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// --- Toastify Imports ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ------------------------
import { LogIn, Loader2, ShieldCheck, Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const BACKEND_URL = 'http://localhost:5000/api/auth/login';
  // Localhost ki jagah live URL use karein jab deploy ho
const BACKEND_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/auth/login` 
  : 'http://localhost:5000/api/auth/login'; 

  // --- Common Toast Config ---

  console.log(BACKEND_URL);
  
  const toastConfig = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light", // <--- Ye "light" karne se background white ho jayega
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
    
  //   const loginToastId = toast.loading("Verifying Identity...", { ...toastConfig });

  //   try {
  //     const res = await axios.post(BACKEND_URL, { email, password });
  //     const userData = res.data.user || res.data; 
  //     const token = res.data.token;
  //     const role = userData.role;

  //     if (token && role) {
  //       localStorage.setItem('token', token);
  //       localStorage.setItem('role', role);
  //       localStorage.setItem('userName', userData.name || 'User');
        
  //       toast.update(loginToastId, { 
  //         render: `Welcome, ${userData.name}! Access Granted.`, 
  //         type: "success", 
  //         isLoading: false, 
  //         autoClose: 2000,
  //         theme: "light" 
  //       });

  //       setTimeout(() => { window.location.href = '/dashboard'; }, 1500);
  //     }
  //   } catch (err) {
  //     let msg = err.response?.data?.message || "Login Failed!";
  //     if (err.code === "ERR_NETWORK") msg = "Server Connection Error!";

  //     toast.update(loginToastId, { 
  //       render: msg, 
  //       type: "error", 
  //       isLoading: false, 
  //       autoClose: 3000,
  //       theme: "light"
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   // ... baaki imports same rahenge
// const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     const loginToastId = toast.loading("Verifying Identity...", { ...toastConfig });

//     try {
//       const res = await axios.post(BACKEND_URL, { email, password });
      
//       // Backend response handle karein
//       const userData = res.data.user; 
//       const token = res.data.token;

//       if (token && userData) {
//         // --- YE CHARO CHEEZEIN SAVE KARNA ZAROORI HAIN ---
//         localStorage.setItem('token', token);
//         localStorage.setItem('role', userData.role);
//         localStorage.setItem('userName', userData.name);
        
//         // Backend se 'id' aa rahi hai, hum use 'userId' key mein save karenge
//         localStorage.setItem('userId', userData.id); 
        
//         toast.update(loginToastId, { 
//           render: `Welcome, ${userData.name}! Access Granted.`, 
//           type: "success", 
//           isLoading: false, 
//           autoClose: 2000,
//           theme: "light" 
//         });

//         // Dashboard par bhej dein
//         setTimeout(() => { window.location.href = '/dashboard'; }, 1500);
//       }
//     } catch (err) {
//       // ... error handling same rahegi
//     } finally {
//       setLoading(false);
//     }
// };
const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Toast start karein
    const loginToastId = toast.loading("Verifying Identity...", { ...toastConfig });

    try {
        const res = await axios.post(BACKEND_URL, { email, password });
        
        // Safety check: Backend se data mil raha hai ya nahi
        const { user, token } = res.data;

        if (token && user) {
            // --- DATA STORAGE ---
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);
            localStorage.setItem('userName', user.name);
            
            // MongoDB mein aksar '_id' hoti hai, isliye fallback rakha hai
            const idToSave = user.id || user._id;
            localStorage.setItem('userId', idToSave); 
            
            toast.update(loginToastId, { 
                render: `Welcome back, ${user.name}! Access Granted.`, 
                type: "success", 
                isLoading: false, 
                autoClose: 2000,
                theme: "light" 
            });

            // Redirect logic - window.location page refresh kar deta hai jo states clean karne ke liye acha hai
            setTimeout(() => { 
                window.location.href = '/dashboard'; 
            }, 1500);
        }
    } catch (err) {
        // Error handling improve ki hai
        let errorMsg = "Login Failed! Please check credentials.";
        
        if (err.code === "ERR_NETWORK") {
            errorMsg = "Server Connection Error! Is the backend running?";
        } else if (err.response?.data?.message) {
            errorMsg = err.response.data.message;
        }

        toast.update(loginToastId, { 
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

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50 font-sans">
      
      {/* Toastify Container with White Theme */}
      <ToastContainer />

      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-12 rounded-[3rem] shadow-2xl shadow-indigo-100 border border-white">
        
        <div className="text-center mb-10">
          <div className="h-20 w-20 bg-indigo-600 rounded-4xl flex items-center justify-center text-white shadow-xl shadow-indigo-200 mx-auto mb-6">
             <ShieldCheck size={40} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">
            Clinic<span className="text-indigo-600">OS</span>
          </h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] mt-3">Auth System v4.0</p>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full p-5 pl-14 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="password" 
              placeholder="Security Key" 
              className="w-full p-5 pl-14 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={` cursor-pointer w-full py-6 rounded-[1.8rem] font-black text-lg uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3
              ${loading ? 'bg-slate-200 text-slate-400' : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-indigo-100'}`}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Verify & Enter"}
          </button>
        </div>

        <p className="mt-10 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
          Unauthorized? <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
        </p>

      </form>
    </div>
  );
}




