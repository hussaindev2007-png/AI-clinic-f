
import { useState, useEffect } from 'react';
import API from '../util/api';
import { UserPlus, UserRound, Mail, Loader2, ShieldCheck, Users, Trash2, Edit3, X } from 'lucide-react';
import { toast } from 'react-toastify';

export default function MedicalStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('doctor'); 
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [editId, setEditId] = useState(null);

  // 1. Fetch Staff Data
  const fetchStaff = async () => {
    try {
      setLoading(true);
      const endpoint = activeTab === 'doctor' ? '/admin/doctors' : '/admin/receptionists';
      const res = await API.get(endpoint);
      if (res.data.success) {
        setStaff(res.data.data);
      }
    } catch (err) {
      toast.error(`Bahi, ${activeTab}s load nahi ho sakay!`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
    resetForm(); 
  }, [activeTab]);

  const resetForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({ name: '', email: '', password: '' });
  };

  // 2. Add or Update Staff
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await API.put(`/admin/staff/${editId}`, formData);
        if (res.data.success) toast.success("Profile Updated Successfully!");
      } else {
        if (formData.password.length < 6) {
          return toast.warning("Password kam se kam 6 characters ka hona chahiye!");
        }
        const res = await API.post('/admin/add-staff', { ...formData, role: activeTab });
        if (res.data.success) toast.success(`${activeTab.toUpperCase()} successfully registered!`);
      }
      resetForm();
      fetchStaff();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation fail hogayi!");
    }
  };

  const handleEditClick = (member) => {
    setEditId(member._id);
    setFormData({ name: member.name, email: member.email, password: '' });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Delete Logic
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to terminate this account?");
    if (!confirmDelete) return;

    const toastId = toast.loading("Processing request...");
    try {
      const res = await API.delete(`/admin/staff/${id}`);
      if (res.data.success) {
        toast.update(toastId, { render: "Account Terminated", type: "success", isLoading: false, autoClose: 3000 });
        fetchStaff();
      }
    } catch (err) {
      toast.update(toastId, { render: "Action Denied", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  return (
    <div className="p-4 md:p-6 animate-in fade-in duration-500">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter">
            Medical <span className="text-blue-600">Staff</span>
          </h2>
          <div className="flex gap-6 mt-4">
            {['doctor', 'receptionist'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer text-[11px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
              >
                {tab}s
              </button>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => { editId ? resetForm() : setShowForm(!showForm) }}
          className={`${showForm ? 'bg-slate-800' : 'bg-blue-600'} text-white px-8 py-4 rounded-2xl font-black text-[10px] flex items-center gap-3 hover:scale-105 transition-all shadow-xl active:scale-95 cursor-pointer`}
        >
          {showForm ? <X size={14}/> : <UserPlus size={14}/>}
          {showForm ? "CANCEL" : `REGISTER ${activeTab.toUpperCase()}`}
        </button>
      </div>

      {/* --- FORM SECTION --- */}
      {showForm && (
        <div className="bg-white dark:bg-[#0f172a] p-8 rounded-[2.5rem] mb-12 border-2 border-blue-600/20 shadow-2xl animate-in zoom-in-95 duration-300">
          <h3 className="text-xl font-black uppercase italic text-blue-600 mb-8">
            {editId ? `Edit ${activeTab} Profile` : `New ${activeTab} Registration`}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Display Name', type: 'text', key: 'name', ph: 'e.g. Dr. Hussain Ali' },
              { label: 'Email Access', type: 'email', key: 'email', ph: 'hussain@clinic.com' },
              { label: editId ? "New Password (Optional)" : "Portal Password", type: 'password', key: 'password', ph: 'Min. 6 chars' }
            ].map((input) => (
              <div key={input.key} className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">{input.label}</label>
                <input 
                  type={input.type}
                  className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-white/5 dark:text-white outline-none border border-slate-100 dark:border-white/10 font-bold focus:ring-2 ring-blue-600/20 transition-all"
                  placeholder={input.ph}
                  value={formData[input.key]}
                  onChange={(e) => setFormData({...formData, [input.key]: e.target.value})}
                  required={input.key !== 'password' || !editId}
                />
              </div>
            ))}
            <button type="submit" className="md:col-span-3 bg-blue-600 text-white p-6 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 cursor-pointer active:scale-95">
              {editId ? "Save Changes" : `Confirm ${activeTab} Registration`}
            </button>
          </form>
        </div>
      )}

      {/* --- STAFF GRID --- */}
      {loading ? (
        <div className="flex flex-col items-center py-40">
          <Loader2 className="animate-spin text-blue-600 mb-6" size={40} />
          <p className="text-xs font-bold tracking-[0.5em] text-slate-400 uppercase animate-pulse">Syncing Database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {staff.length > 0 ? staff.map((member) => (
            <div key={member._id} className="group relative bg-white dark:bg-[#0f172a] p-1 border border-slate-200 dark:border-white/5 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="p-8 h-full bg-slate-50/50 dark:bg-white/2 rounded-[2.3rem] flex flex-col">
                
                <div className="flex justify-end gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <button onClick={() => handleEditClick(member)} className="p-3 bg-white dark:bg-white/10 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm cursor-pointer">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => handleDelete(member._id)} className="p-3 bg-white dark:bg-white/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 bg-gradient-to-tr from-blue-700 to-blue-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:rotate-6 transition-transform">
                    {activeTab === 'doctor' ? <UserRound size={35} /> : <Users size={35} />}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none uppercase italic">{member.name}</h4>
                    <p className="text-[11px] font-bold text-slate-400 mt-2 flex items-center gap-1 uppercase truncate max-w-[150px]">
                      <Mail size={12} className="text-blue-500" /> {member.email}
                    </p>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/5 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Account</span>
                   </div>
                   <ShieldCheck size={20} className="text-blue-600 opacity-20" />
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem]">
               <p className="font-black text-xs uppercase tracking-widest text-slate-400 italic">No {activeTab}s Found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



















// import { useState, useEffect } from 'react';
// import API from '../util/api';
// import { 
//   UserPlus, UserRound, Mail, Loader2, ShieldCheck, 
//   Users, Trash2, Edit3, X, CheckCircle2, AlertCircle 
// } from 'lucide-react';
// import { toast } from 'react-toastify';

// export default function MedicalStaff() {
//   const [staff, setStaff] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editMode, setEditMode] = useState(null); // ID store karega jab edit hoga
//   const [activeTab, setActiveTab] = useState('doctor'); 
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });

//   const fetchStaff = async () => {
//     try {
//       setLoading(true);
//       const endpoint = activeTab === 'doctor' ? '/admin/doctors' : '/admin/receptionists';
//       const res = await API.get(endpoint);
//       if (res.data.success) setStaff(res.data.data);
//     } catch (err) {
//       toast.error("Database access failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchStaff(); }, [activeTab]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editMode) {
//         // Professional Edit Request
//         const res = await API.put(`/admin/staff/${editMode}`, formData);
//         if (res.data.success) toast.success("Credential Updated");
//       } else {
//         // Add New Staff
//         const res = await API.post('/admin/add-staff', { ...formData, role: activeTab });
//         if (res.data.success) toast.success("Member Onboarded");
//       }
//       closePanel();
//       fetchStaff();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Operation failed");
//     }
//   };

//   const openEdit = (member) => {
//     setEditMode(member._id);
//     setFormData({ name: member.name, email: member.email, password: '' });
//     setShowForm(true);
//   };

//   const closePanel = () => {
//     setShowForm(false);
//     setEditMode(null);
//     setFormData({ name: '', email: '', password: '' });
//   };

//   const handleDelete = async (id) => {
//     toast.warn(
//       <div className="flex flex-col gap-2">
//         <p className="font-bold text-sm">Confirm Deletion?</p>
//         <button 
//           onClick={async () => {
//             try {
//               await API.delete(`/admin/staff/${id}`);
//               toast.success("Account Terminated");
//               fetchStaff();
//             } catch (err) { toast.error("Action denied"); }
//           }}
//           className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold"
//         >
//           YES, DELETE
//         </button>
//       </div>,
//       { autoClose: 5000, closeOnClick: true }
//     );
//   };

//   return (
//     <div className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen">
      
//       {/* --- ELITE HEADER --- */}
//       <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
//         <div>
//           <span className="text-blue-600 font-bold tracking-[0.4em] text-[10px] uppercase">Management Console</span>
//           <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mt-2">
//             MEDICAL <span className="text-blue-600 underline decoration-4 underline-offset-8">STAFF</span>
//           </h1>
          
//           <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl mt-8 w-fit">
//             {['doctor', 'receptionist'].map((tab) => (
//               <button 
//                 key={tab}
//                 onClick={() => { setActiveTab(tab); closePanel(); }}
//                 className={`px-8 py-2.5 rounded-lg text-xs font-black uppercase transition-all ${activeTab === tab ? 'bg-white dark:bg-blue-600 shadow-md text-blue-600 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
//               >
//                 {tab}s
//               </button>
//             ))}
//           </div>
//         </div>

//         <button 
//           onClick={() => setShowForm(true)}
//           className="bg-slate-900 dark:bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xs tracking-widest flex items-center gap-3 hover:shadow-2xl hover:shadow-blue-500/40 transition-all active:scale-95"
//         >
//           <UserPlus size={16} /> INITIALIZE REGISTRATION
//         </button>
//       </div>

//       {/* --- PROFESSIONAL SIDE-MODAL / PANEL --- */}
//       {showForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-sm p-4">
//           <div className="bg-white dark:bg-[#0f172a] w-full max-w-md h-full rounded-[2rem] shadow-2xl p-10 flex flex-col animate-in slide-in-from-right duration-500 border-l border-white/10">
//             <div className="flex justify-between items-center mb-10">
//               <h3 className="text-2xl font-black italic tracking-tight">{editMode ? 'EDIT ACCOUNT' : 'NEW REGISTRATION'}</h3>
//               <button onClick={closePanel} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full"><X /></button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-8">
//               <div className="space-y-1">
//                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
//                 <input 
//                   className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 py-3 text-lg font-bold outline-none focus:border-blue-600 transition-all"
//                   placeholder="Enter Name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Identity</label>
//                 <input 
//                   className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 py-3 text-lg font-bold outline-none focus:border-blue-600 transition-all"
//                   placeholder="name@clinic.com"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{editMode ? 'Change Password (Optional)' : 'Access Password'}</label>
//                 <input 
//                   className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 py-3 text-lg font-bold outline-none focus:border-blue-600 transition-all"
//                   placeholder="••••••••"
//                   type="password"
//                   value={formData.password}
//                   onChange={(e) => setFormData({...formData, password: e.target.value})}
//                   required={!editMode}
//                 />
//               </div>

//               <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-tighter text-sm hover:bg-blue-700 shadow-xl shadow-blue-600/20">
//                 {editMode ? 'UPDATE CREDENTIALS' : 'SAVE TO DATABASE'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- ELITE STAFF GRID --- */}
//       {loading ? (
//         <div className="flex flex-col items-center py-40">
//           <Loader2 className="animate-spin text-blue-600 mb-6" size={40} />
//           <p className="text-xs font-bold tracking-[0.5em] text-slate-400 uppercase animate-pulse">Synchronizing Data...</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
//           {staff.map((member) => (
//             <div key={member._id} className="group relative bg-white dark:bg-[#0f172a] p-1 border border-slate-200 dark:border-white/5 rounded-[2.5rem] hover:shadow-3xl transition-all duration-500 overflow-hidden">
//               <div className="p-8 h-full bg-slate-50/50 dark:bg-white/2 rounded-[2.3rem] flex flex-col">
                
//                 {/* Actions Bar */}
//                 <div className="flex justify-end gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
//                   <button onClick={() => openEdit(member)} className="p-3 bg-white dark:bg-white/10 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
//                     <Edit3 size={16} />
//                   </button>
//                   <button onClick={() => handleDelete(member._id)} className="p-3 bg-white dark:bg-white/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
//                     <Trash2 size={16} />
//                   </button>
//                 </div>

//                 <div className="flex items-center gap-6">
//                   <div className="h-20 w-20 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
//                     <UserRound size={35} />
//                   </div>
//                   <div>
//                     <h4 className="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none uppercase italic">{member.name}</h4>
//                     <p className="text-[11px] font-bold text-slate-400 mt-2 flex items-center gap-1 uppercase tracking-wider">
//                       <Mail size={12} /> {member.email}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/5 flex justify-between items-center">
//                    <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
//                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active License</span>
//                    </div>
//                    <ShieldCheck size={20} className="text-blue-600 opacity-20" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
