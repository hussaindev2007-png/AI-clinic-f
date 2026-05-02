// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/login';
// import Dashboard from './pages/Dashboard';
// import AddPatient from './pages/AddPatient';
// import EditPatient from './pages/EditPatient'; 
// import Prescription from './pages/Prescription';
// import PatientHistory from './pages/PatientHistory';
// import PatientsList from './pages/PatientsList'; 
// import Register from './pages/Register';
// import Layout from './comp/layout';
// import BookAppointment from './pages/BookAppointment';


// import AppointmentsList from './pages/AppointmentsList'; // Import zaroor karein

// // Routes list ke andar:
// function App() {
//   const token = localStorage.getItem('token');
//   const userRole = localStorage.getItem('role') || 'doctor';
//   const isAuthenticated = token !== null && token !== undefined && token !== "";

//   return (
//     <div className="App">
//       <Routes>
//         <Route 
//           path="/" 
//           element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
//         />
//         <Route 
//           path="/register" 
//           element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} 
//         />

//         {isAuthenticated ? (
//            <Route element={<Layout userRole={userRole} />}>
            
        
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/add-patient" element={<AddPatient />} />
//             <Route path="/patients-list" element={<PatientsList />} /> 
//             <Route path="/edit-patient/:id" element={<EditPatient />} /> 
//             <Route path="/prescribe/:id" element={<Prescription />} />
//             <Route path="/history/:id" element={<PatientHistory />} />
//             <Route path="/book-appointment" element={<BookAppointment />} /> 
//             <Route path="/appointments-list" element={<AppointmentsList />} />
            
//             <Route path="*" element={<Navigate to="/dashboard" replace />} />
//           </Route>
//         ) : (
//           <Route path="*" element={<Navigate to="/" replace />} />
//         )}
//       </Routes>
//     </div>
//   );
// }

// export default App;





// ... baqi imports same hain

// function App() {
//   const token = localStorage.getItem('token');
//   const userRole = localStorage.getItem('role') || 'doctor';
//   const isAuthenticated = token !== null && token !== undefined && token !== "";

//   return (
//     <div className="App">
//       <Routes>
//         <Route 
//           path="/" 
//            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
          
//         />
//         <Route 
//           path="/register" 
//           element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} 
//         />

//         {isAuthenticated ? (
//            <Route element={<Layout userRole={userRole} />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/add-patient" element={<AddPatient />} />
//             <Route path="/patients-list" element={<PatientsList />} /> 
//             <Route path="/edit-patient/:id" element={<EditPatient />} /> 
//             <Route path="/prescribe/:id" element={<Prescription />} />
//             <Route path="/history/:id" element={<PatientHistory />} />
            
//             {/* Yahan focus karein: ':id?' ka matlab hai optional parameter.
//                Ye route New Booking aur Edit Appointment dono ke liye kaam karega.
//             */}
//             <Route path="/book-appointment/:id?" element={<BookAppointment />} /> 
            
//             <Route path="/appointments-list" element={<AppointmentsList />} />
            
//             <Route path="*" element={<Navigate to="/dashboard" replace />} />
//           </Route>
//         ) : (
//           <Route path="*" element={<Navigate to="/" replace />} />
//         )}
//       </Routes>
//     </div>
//   );
// }

// export default App;














// ... existing imports

// function App() {
//   const token = localStorage.getItem('token');
//   const userRole = localStorage.getItem('role') || 'doctor';
//   const isAuthenticated = token !== null && token !== undefined && token !== "";

//   return (
//     <div className="App">
//       <Routes>
//         <Route 
//           path="/" 
//            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
//         />
//         <Route 
//           path="/register" 
//           element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} 
//         />

//         {isAuthenticated ? (
//            <Route element={<Layout userRole={userRole} />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/add-patient" element={<AddPatient />} />
            
//             {/* FIX 1: Sidebar wala path yahan add kiya taake Medical History page khule */}
//             <Route path="/medical-history" element={<PatientsList />} /> 
            
//             {/* Purana patients-list agar use ho raha hai toh rehne dein */}
//             <Route path="/patients-list" element={<PatientsList />} /> 
            
//             <Route path="/edit-patient/:id" element={<EditPatient />} /> 
//             <Route path="/prescribe/:id" element={<Prescription />} />
            
//             {/* FIX 2: Is path ko match karein jo humne MedicalHistory component ke Link mein likha hai */}
//             <Route path="/patient-history/:id" element={<PatientHistory />} />
            
//             {/* Backup ke liye purana history path */}
//             <Route path="/history/:id" element={<PatientHistory />} />
            
//             <Route path="/book-appointment/:id?" element={<BookAppointment />} /> 
//             <Route path="/appointments-list" element={<AppointmentsList />} />
            
//             <Route path="*" element={<Navigate to="/dashboard" replace />} />
//           </Route>
//         ) : (
//           <Route path="*" element={<Navigate to="/" replace />} />
//         )}
//       </Routes>
//     </div>
//   );
// }

// export default App;














import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './comp/layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import Register from './pages/Register';
import AddPatient from './pages/AddPatient';
import PatientsList from './pages/PatientsList';
import EditPatient from './pages/EditPatient';
import Prescription from './pages/Prescription';
import PatientHistory from './pages/PatientHistory';
import BookAppointment from './pages/BookAppointment';
import AppointmentsList from './pages/AppointmentsList';
import MedicalStaff from './pages/MedicalStaff';
import Analytics from './pages/Analytics'; // ✅ Naya Import add kiya

function App() {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role')?.toLowerCase() || 'doctor';
  const isAuthenticated = token !== null && token !== undefined && token !== "";

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />

        {isAuthenticated ? (
           <Route element={<Layout userRole={userRole} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* --- ADMIN ONLY ROUTES --- */}
            {userRole === 'admin' && (
              <>
                <Route path="/doctors" element={<MedicalStaff />} />
                {/* ✅ Dashboard ki jagah Analytics component lagaya */}
                <Route path="/analytics" element={<Analytics />} /> 
              </>
            )}

            {/* --- RECEPTIONIST & DOCTOR ROUTES --- */}
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/medical-history" element={<PatientsList />} /> 
            <Route path="/patients-list" element={<PatientsList />} /> 
            <Route path="/edit-patient/:id" element={<EditPatient />} /> 
            <Route path="/prescribe/:id" element={<Prescription />} />
            <Route path="/patient-history/:id" element={<PatientHistory />} />
            <Route path="/history/:id" element={<PatientHistory />} />
            <Route path="/book-appointment/:id?" element={<BookAppointment />} /> 
            <Route path="/appointments-list" element={<AppointmentsList />} />
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </div>
  );
}

export default App;