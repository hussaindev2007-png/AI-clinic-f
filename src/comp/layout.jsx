// import { useState, useEffect } from 'react';
// import { Link, Outlet, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, UserRound, Users, Calendar, 
//   History, Menu, X, LogOut, Activity 
// } from 'lucide-react';

// const Layout = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();
//   const userRole = localStorage.getItem('role')?.toLowerCase() || 'staff';
  
//   // System Theme Check for visual consistency
//   const [isDark, setIsDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

//   useEffect(() => {
//     const matcher = window.matchMedia('(prefers-color-scheme: dark)');
//     const onChange = (e) => setIsDark(e.matches);
//     matcher.addEventListener('change', onChange);
//     return () => matcher.removeEventListener('change', onChange);
//   }, []);

//   // const menuItems = {
//   //   admin: [
//   //     { name: 'System Dashboard', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
//   //     { name: 'Medical Staff', icon: <UserRound size={22} />, path: '/doctors' },
//   //     { name: 'Registration', icon: <Users size={22} />, path: '/add-patient' },
//   //   ],
//   //   doctor: [
//   //     { name: 'Appointments', icon: <Calendar size={22} />, path: '/dashboard' },
//   //     { name: 'Medical History', icon: <History size={22} />, path: '/patients-list' },
//   //   ],
//   //   receptionist: [
//   //     { name: 'Reception Dash', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
//   //     { name: 'Registration', icon: <Users size={22} />, path: '/add-patient' },
//   //   ]
//   // };
// const menuItems = {
//     admin: [
//       { name: 'System Dashboard', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
//       { name: 'Medical Staff', icon: <UserRound size={22} />, path: '/doctors' },
//       { name: 'Registration', icon: <Users size={22} />, path: '/add-patient' },
//       // Admin ke liye bhi add kar sakte hain agar zaroorat ho
//       { name: 'Book Appointment', icon: <Calendar size={22} />, path: '/book-appointment' }, 
//     ],
//     doctor: [
//       { name: 'Appointments', icon: <Calendar size={22} />, path: '/dashboard' },
//       { name: 'Medical History', icon: <History size={22} />, path: '/patients-list' },
//     ],
// //     receptionist: [
// //       { name: 'Reception Dash', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
// //       { name: 'Registration', icon: <Users size={22} />, path: '/add-patient' },
// //       // YAHAN ADD KIYA GAYA HAI:
// //       { name: 'Book Appointment', icon: <Calendar size={22} />, path: '/book-appointment' },
// //     ]

// receptionist: [
//   { name: 'Reception Dash', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
//   { name: 'Registration', icon: <Users size={22} />, path: '/add-patient' },
//   { name: 'Book Appointment', icon: <Calendar size={22} />, path: '/book-appointment' },
//   { name: 'Daily Schedule', icon: <Activity size={22} />, path: '/appointments-list' }, 
// ]
//   };

//   const currentMenu = menuItems[userRole] || [];

//   return (
//     <div className="flex h-screen bg-slate-50 dark:bg-[#020617] overflow-hidden font-sans transition-colors duration-500">
      
//       {/* --- SIDEBAR --- */}
//       <aside 
//         className={`bg-[#0f172a] dark:bg-[#050810] text-white flex flex-col shadow-2xl z-50 transition-all duration-300 ease-in-out shrink-0 
//         ${isOpen ? 'w-72' : 'w-24'}`}
//       >
        
//         {/* Header Section */}
//         <div className="h-24 flex items-center justify-center relative border-b border-slate-800/50 dark:border-white/5 shrink-0">
//           {isOpen && (
//             <div className="flex items-center gap-3 absolute left-6 animate-in fade-in duration-500">
//                <div className="text-xl font-black text-blue-400 italic tracking-tighter">
//                  CLINIC<span className="text-white">OS</span>
//               </div>
//             </div>
//           )}
          
//           <button 
//             onClick={() => setIsOpen(!isOpen)}
//             className={`p-3 rounded-2xl bg-slate-800/50 dark:bg-white/5 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300
//               ${isOpen ? 'absolute right-4' : 'mx-auto'}`}
//           >
//             {isOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>
        
//         {/* Navigation */}
//         <nav className="flex-1 px-4 space-y-4 mt-8 overflow-y-auto no-scrollbar overflow-x-hidden">
//           {currentMenu.map((item, index) => {
//             const isActive = location.pathname === item.path;
//             return (
//               <Link 
//                 key={index} 
//                 to={item.path} 
//                 className={`flex items-center transition-all duration-300 group relative
//                   ${isOpen ? 'px-5 py-4 rounded-2xl w-full' : 'justify-center w-14 h-14 mx-auto rounded-2xl'} 
//                   ${isActive ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' : 'hover:bg-slate-800/50 dark:hover:bg-white/5 text-slate-400'}`}
//               >
//                 <div className={`shrink-0 flex items-center justify-center transition-transform duration-300
//                   ${isActive ? 'text-white' : 'text-blue-400 group-hover:scale-110'}`}>
//                   {item.icon}
//                 </div>
                
//                 {isOpen && (
//                   <span className="ml-4 font-bold text-[11px] uppercase tracking-[0.15em] whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-2 flex-1">
//                     {item.name}
//                   </span>
//                 )}

//                 {!isOpen && (
//                   <div className="absolute left-20 bg-slate-800 dark:bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 shadow-2xl border border-slate-700 dark:border-none whitespace-nowrap">
//                     {item.name}
//                   </div>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>
// {isOpen && (
//              <div className="mx-4 mb-4 p-4 bg-slate-800/30 rounded-2xl border border-white/5">
//                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
//                  <div className="flex items-center gap-2">
//                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
//                      <p className="text-xs font-bold text-blue-400 uppercase truncate">{userRole}</p>
//                  </div>
//              </div>
//          )}
//         {/* Logout */}
//         <div className="p-4 border-t border-slate-800/50 dark:border-white/5 shrink-0">
//           <button 
//             onClick={() => { localStorage.clear(); window.location.replace("/"); }}
//             className={`flex items-center justify-center bg-red-600/10 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all font-black text-[10px] uppercase tracking-[0.2em]
//               ${isOpen ? 'p-5 w-full gap-3' : 'w-14 h-14 mx-auto'}`}
//           >
//             <LogOut size={22} className="shrink-0" />
//             {isOpen && <span className="whitespace-nowrap">Sign Out</span>}
//           </button>
//         </div>
//       </aside>

//       {/* --- CONTENT AREA --- */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="h-20 bg-white dark:bg-[#050810] border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-10 shadow-sm z-40 shrink-0 transition-colors">
//           <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
//              <div className="h-2.5 w-2.5 bg-blue-600 rounded-full animate-pulse"></div>
//              Node Status: <span className="text-blue-600 dark:text-blue-400">{userRole}</span>
//           </div>
          
//           <div className="text-slate-500 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest bg-slate-50 dark:bg-white/5 px-5 py-2.5 rounded-2xl border border-slate-100 dark:border-white/5 transition-colors">
//             {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
//           </div>
//         </header>
        
//         <main className="flex-1 overflow-y-auto p-10 bg-[#f8fafc] dark:bg-[#020617] no-scrollbar transition-colors">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };


// export default Layout;



















































// import { useState, useEffect } from 'react';
// import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import { 
//   LayoutDashboard, UserRound, Users, Calendar, 
//   History, Menu, X, LogOut, Activity, BarChart3, Settings, ShieldCheck 
// } from 'lucide-react';

// const Layout = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const userRole = localStorage.getItem('role')?.toLowerCase() || 'staff';
//   const menuItems = {
//     admin: [
//       { name: 'System Dash', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
//       { name: 'Medical Staff', icon: <UserRound size={22} />, path: '/doctors' },
//       { name: 'Analytics', icon: <BarChart3 size={22} />, path: '/analytics' },
//       ],
//     doctor: [
//       { name: 'Appointments', icon: <Calendar size={22} />, path: '/dashboard' },
//       { name: 'Medical History', icon: <History size={22} />, path: '/medical-history' },
//     ],
//     receptionist: [
//       { name: 'Reception Dash', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
//       { name: 'Registration', icon: <Users size={22} />, path: '/add-patient' },
//       { name: 'Book Appointment', icon: <Calendar size={22} />, path: '/book-appointment' },
//       { name: 'Daily Schedule', icon: <Activity size={22} />, path: '/appointments-list' }, 
//     ],
//    patient: [
//     { 
//       name: 'My Portal', 
//       icon: <LayoutDashboard size={22} />, 
//       path: '/dashboard' 
//     },
//     { 
//       name: 'My History', 
//       icon: <History size={22} />, 
     
//       path: '/history/me' 
//     },
    
//   ],
 
//   };

//   const currentMenu = menuItems[userRole] || [];

 

//   const handleLogout = () => {
//   localStorage.clear();
//   window.location.href = "/"; // Ye poore page ko reload karke login par le jayega
// };

//   return (
//     <div className="flex h-screen bg-slate-50 dark:bg-[#020617] overflow-hidden transition-colors duration-500">
      
//       {/* --- SIDEBAR --- */}
//       <aside className={`bg-[#0f172a] dark:bg-[#050810] text-white flex flex-col shadow-2xl z-50 transition-all duration-300 ${isOpen ? 'w-72' : 'w-24'}`}>
        
//         {/* Logo Section */}
//         <div className="h-24 flex items-center justify-center relative border-b border-slate-800/50">
//           {isOpen && (
//             <div className="flex items-center gap-3 absolute left-6 animate-in fade-in">
//                <div className="text-xl font-black text-blue-400 italic tracking-tighter">
//                  CLINIC<span className="text-white">OS</span>
//               </div>
//             </div>
//           )}
//           <button onClick={() => setIsOpen(!isOpen)} className={`p-3 rounded-2xl bg-white/5 text-blue-400 hover:bg-blue-600 hover:text-white transition-all ${isOpen ? 'absolute right-4' : 'mx-auto'}`}>
//             {isOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>
        
//         {/* Dynamic Navigation */}
//         <nav className="flex-1 px-4 space-y-4 mt-8 overflow-y-auto no-scrollbar">
//           {currentMenu.map((item, index) => {
//             const isActive = location.pathname === item.path;
//             return (
//               <Link 
//                 key={index} 
//                 to={item.path} 
//                 className={`flex items-center transition-all duration-300 group relative
//                   ${isOpen ? 'px-5 py-4 rounded-2xl w-full' : 'justify-center w-14 h-14 mx-auto rounded-2xl'} 
//                   ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'hover:bg-white/5 text-slate-400'}`}
//               >
//                 <div className={`${isActive ? 'text-white' : 'text-blue-400 group-hover:scale-110'} transition-transform`}>
//                   {item.icon}
//                 </div>
                
//                 {isOpen && (
//                   <span className="ml-4 font-bold text-[11px] uppercase tracking-widest whitespace-nowrap overflow-hidden">
//                     {item.name}
//                   </span>
//                 )}

//                 {/* Tooltip for Closed Sidebar */}
//                 {!isOpen && (
//                   <div className="absolute left-20 bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 whitespace-nowrap">
//                     {item.name}
//                   </div>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* User Role Badge */}
//         {isOpen && (
//              <div className="mx-4 mb-4 p-4 bg-blue-500/5 rounded-2xl border border-white/5">
//                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Authenticated As</p>
//                  <div className="flex items-center gap-2">
//                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
//                      <p className="text-xs font-bold text-blue-400 uppercase">{userRole}</p>
//                  </div>
//              </div>
//          )}

//         {/* Logout Button */}
//         <div className="p-4 border-t border-white/5">
//           <button onClick={handleLogout} className={`flex items-center justify-center bg-red-600/10 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all font-black text-[10px] uppercase tracking-[0.2em] ${isOpen ? 'p-5 w-full gap-3' : 'w-14 h-14 mx-auto'}`}>
//             <LogOut size={22} />
//             {isOpen && <span>Sign Out</span>}
//           </button>
//         </div>
//       </aside>

//       {/* --- CONTENT AREA --- */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="h-20 bg-white dark:bg-[#050810] border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-10 z-40 shrink-0">
//           <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">
//              <div className="h-2.5 w-2.5 bg-blue-600 rounded-full"></div>
//              Security Level: <span className="text-blue-600 dark:text-blue-400">{userRole}</span>
//           </div>
          
//           <div className="text-slate-500 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest bg-slate-50 dark:bg-white/5 px-5 py-2.5 rounded-2xl border border-slate-100 dark:border-white/5">
//             {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
//           </div>
//         </header>
        
//         <main className="flex-1 overflow-y-auto p-10 bg-[#f8fafc] dark:bg-[#020617] no-scrollbar">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;



























import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, UserRound, Users, Calendar, 
  History, Menu, X, LogOut, Activity, BarChart3, Settings, ShieldCheck 
} from 'lucide-react';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role')?.toLowerCase() || 'staff';
  
  const menuItems = {
    admin: [
      { name: 'System Dash', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
      { name: 'Medical Staff', icon: <UserRound size={22} />, path: '/doctors' },
      { name: 'Analytics', icon: <BarChart3 size={22} />, path: '/analytics' },
    ],
    doctor: [
      { name: 'Appointments', icon: <Calendar size={22} />, path: '/dashboard' },
      { name: 'Medical History', icon: <History size={22} />, path: '/medical-history' },
    ],
    receptionist: [
      { name: 'Reception Dash', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
      { name: 'Registration', icon: <Users size={22} />, path: '/add-patient' },
      { name: 'Book Appointment', icon: <Calendar size={22} />, path: '/book-appointment' },
      { name: 'Daily Schedule', icon: <Activity size={22} />, path: '/appointments-list' }, 
    ],
    patient: [
      { name: 'My Portal', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
      { name: 'My History', icon: <History size={22} />, path: '/history/me' },
    ],
  };

  const currentMenu = menuItems[userRole] || [];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#020617] overflow-hidden transition-colors duration-500 font-sans selection:bg-blue-500/30">
      
      {/* --- SIDEBAR --- */}
      <aside className={`bg-[#0f172a] dark:bg-[#050810] text-white flex flex-col shadow-2xl z-50 transition-all duration-500 ease-in-out relative ${isOpen ? 'w-72' : 'w-24'}`}>
        
        {/* Decorative Line (Pointer) */}
        <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>

        {/* Logo Section */}
        <div className="h-24 flex items-center justify-center relative border-b border-slate-800/50">
          {isOpen && (
            <div className="flex items-center gap-3 absolute left-8 animate-in slide-in-from-left duration-500">
               <div className="text-xl font-black text-blue-400 italic tracking-tighter group cursor-default">
                  CLINIC<span className="text-white group-hover:text-blue-400 transition-colors">OS</span>
              </div>
            </div>
          )}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`p-3 rounded-2xl bg-white/5 text-blue-400 hover:bg-blue-600 hover:text-white transition-all active:scale-90 cursor-pointer shadow-lg ${isOpen ? 'absolute right-4' : 'mx-auto'}`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Dynamic Navigation */}
        <nav className="flex-1 px-4 space-y-3 mt-8 overflow-y-auto no-scrollbar">
          {currentMenu.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={index} 
                to={item.path} 
                className={`flex items-center transition-all duration-300 group relative
                  ${isOpen ? 'px-6 py-4 rounded-[1.2rem] w-full' : 'justify-center w-14 h-14 mx-auto rounded-2xl'} 
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-[0_10px_25px_rgba(37,99,235,0.4)] ring-1 ring-blue-400/20' 
                    : 'hover:bg-white/[0.03] text-slate-400 hover:text-white cursor-pointer active:scale-95'}`}
              >
                {/* Active Indicator Line */}
                {isActive && isOpen && (
                  <div className="absolute left-0 w-1 h-6 bg-white rounded-full animate-pulse"></div>
                )}

                <div className={`${isActive ? 'text-white scale-110' : 'text-blue-500/70 group-hover:text-blue-400 group-hover:scale-110'} transition-all duration-300`}>
                  {item.icon}
                </div>
                
                {isOpen && (
                  <span className={`ml-4 font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                    {item.name}
                  </span>
                )}

                {/* Tooltip for Closed Sidebar */}
                {!isOpen && (
                  <div className="absolute left-20 bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 whitespace-nowrap shadow-xl">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Role Badge */}
        {isOpen && (
             <div className="mx-6 mb-4 p-4 bg-blue-500/5 rounded-2xl border border-white/5 group hover:bg-blue-500/10 transition-colors cursor-default">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-slate-400 transition-colors">Access Level</p>
                 <div className="flex items-center gap-2">
                     <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                     <p className="text-xs font-black text-blue-400 uppercase italic tracking-tighter">{userRole}</p>
                 </div>
             </div>
         )}

        {/* Logout Button */}
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout} 
            className={`flex items-center justify-center bg-red-600/10 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all active:scale-95 cursor-pointer font-black text-[10px] uppercase tracking-[0.2em] shadow-lg group/logout ${isOpen ? 'p-5 w-full gap-3' : 'w-14 h-14 mx-auto'}`}
          >
            <LogOut size={22} className="group-hover/logout:-translate-x-1 transition-transform" />
            {isOpen && <span>Sign Out System</span>}
          </button>
        </div>
      </aside>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white dark:bg-[#050810] border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-10 z-40 shrink-0 shadow-sm relative">
          
          <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 cursor-default group">
             <div className="h-2.5 w-2.5 bg-blue-600 rounded-full group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
             Security: <span className="text-blue-600 dark:text-blue-400">{userRole} Node</span>
          </div>
          
          <div className="text-slate-500 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest bg-slate-50 dark:bg-white/5 px-6 py-3 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-blue-500/30 transition-all cursor-default shadow-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#f8fafc] dark:bg-[#020617] no-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;