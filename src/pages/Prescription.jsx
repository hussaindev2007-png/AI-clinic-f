
// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../util/api'; 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import jsPDF from 'jspdf';
// import { 
//   Sparkles, 
//   Loader2, 
//   User, 
//   ChevronLeft, 
//   Database, 
//   Save, 
//   FileText, 
//   Activity,
//   ShieldCheck,
//   Download 
// } from 'lucide-react'; 

// export default function Prescription() {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [clinicalReport, setClinicalReport] = useState('');
//   const [symptoms, setSymptoms] = useState('');
//   const [aiLoading, setAiLoading] = useState(false);
//   const [editableData, setEditableData] = useState({
//     diagnosis: '', medicines: [], suggestedTests: [], advice: '', aiSummary: '', riskLevel: 'Low'
//   });

//   // Dynamic toast theme based on system preference
//   const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const toastStyle = { theme: isDarkMode ? "dark" : "light", position: "top-right" };

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const res = await API.get(`/patients/${id}`);
//         setPatient(res.data.data);
//         if (res.data.data.disease) setSymptoms(res.data.data.disease);
//       } catch (err) {
//         toast.error("Failed to load patient data!", toastStyle);
//         navigate('/dashboard');
//       } finally { setLoading(false); }
//     };
//     fetchPatientData();
//   }, [id, navigate]);

//   const downloadPDF = () => {
//     if (!clinicalReport) return;
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pageWidth = pdf.internal.pageSize.getWidth();
    
//     pdf.setFillColor(79, 70, 229); 
//     pdf.rect(0, 0, pageWidth, 40, 'F');
//     pdf.setTextColor(255, 255, 255);
//     pdf.setFontSize(22);
//     pdf.setFont("helvetica", "bold");
//     pdf.text("CLINIC OS - MEDICAL REPORT", 20, 25);
    
//     pdf.setTextColor(40, 40, 40);
//     pdf.setFontSize(12);
//     pdf.text("PATIENT RECORD", 20, 55);
//     pdf.setFont("helvetica", "normal");
//     pdf.setFontSize(10);
//     pdf.text(`Name: ${patient?.name}`, 20, 65);
//     pdf.text(`Age/Gender: ${patient?.age}Y / ${patient?.gender}`, 20, 72);
//     pdf.text(`Status: Verified Record`, 20, 79);
//     pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 60, 65);

//     pdf.setDrawColor(200, 200, 200);
//     pdf.line(20, 85, pageWidth - 20, 85);

//     pdf.setFont("helvetica", "bold");
//     pdf.setFontSize(12);
//     pdf.text("DIAGNOSIS & CLINICAL FINDINGS:", 20, 100);
//     pdf.setFont("helvetica", "normal");
//     pdf.setFontSize(10);
//     const splitText = pdf.splitTextToSize(clinicalReport, pageWidth - 40);
//     pdf.text(splitText, 20, 110);

//     pdf.setFontSize(8);
//     pdf.setTextColor(150, 150, 150);
//     pdf.text("This is an electronically generated report from Clinic OS Neural Link.", 20, pdf.internal.pageSize.getHeight() - 10);

//     pdf.save(`Prescription_${patient?.name.replace(/\s+/g, '_')}.pdf`);
//     toast.success("Professional PDF Generated!", toastStyle);
//   };

//   const typeText = (text, data) => {
//     let index = 0;
//     setClinicalReport('');
//     const interval = setInterval(() => {
//       if (index < text.length) {
//         setClinicalReport(prev => prev + text.charAt(index));
//         index++;
//       } else {
//         clearInterval(interval);
//         setAiLoading(false);
//         setEditableData(data);
//         toast.info("AI Analysis Complete. Review enabled.", toastStyle);
//       }
//     }, 5);
//   };

//   const handleAIAnalyze = async () => {
//     if (!symptoms) return toast.warning("Please enter symptoms first!", toastStyle);
//     setAiLoading(true);
//     const aiToastId = toast.loading("AI Engine analyzing core data...", { theme: isDarkMode ? "dark" : "light" });
//     try {
//       const res = await API.post('/ai/analyze', { 
//         patientId: id, symptoms, age: patient?.age, gender: patient?.gender 
//       });
//       const aiData = res.data?.data; 
//       const medsSection = aiData.medicines?.map((m, i) => (
//         `${i + 1}. ${m.name} ${m.dosage} - ${m.duration}\n   Note: ${m.instruction}`
//       )).join('\n\n') || "No medications.";

//       const formattedText = 
//         `DIAGNOSIS\n${aiData.diagnosis}\n\n` +
//         `RISK LEVEL: ${aiData.riskLevel}\n\n` +
//         `AI SUMMARY\n${aiData.aiSummary}\n\n` +
//         `SUGGESTED TESTS\n${aiData.suggestedTests?.join(', ') || "None"}\n\n` +
//         `MEDICATIONS\n${medsSection}\n\n` + 
//         `ADVICE\n${aiData.advice}`;

//       toast.dismiss(aiToastId); 
//       typeText(formattedText, aiData); 
//     } catch (err) {
//       setAiLoading(false);
//       toast.error("AI Core Linkage Failed!", toastStyle);
//     }
//   };

//   const handlePrescribe = async (e) => {
//     e.preventDefault();
//     if (!clinicalReport) return toast.error("Report cannot be empty!", toastStyle);

//     const saveToast = toast.loading("Syncing with Secure Records...");
//     try {
//       await API.post('/doctor/add', { 
//         patientId: id, 
//         symptoms: symptoms,
//         diagnosis: clinicalReport,
//         medicines: editableData.medicines, 
//         suggestedTests: editableData.suggestedTests,
//         advice: editableData.advice,
//         aiSummary: editableData.aiSummary,
//         riskLevel: editableData.riskLevel
//       });

//       toast.update(saveToast, { render: "Record Committed! 🚀", type: "success", isLoading: false, autoClose: 2000 });
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } catch (err) {
//       toast.update(saveToast, { render: "Database Error!", type: "error", isLoading: false, autoClose: 3000 });
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex flex-col items-center justify-center transition-colors duration-300">
//       <Loader2 className="animate-spin text-indigo-500" size={48} />
//       <p className="mt-4 text-indigo-600 dark:text-indigo-300 font-mono text-[10px] tracking-[0.3em] uppercase">Loading Neural Link...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] text-slate-700 dark:text-slate-300 p-4 lg:p-10 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
//       <ToastContainer theme={isDarkMode ? "dark" : "light"} />
      
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 dark:bg-indigo-600/10 blur-[120px] rounded-full"></div>
//         <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/5 blur-[100px] rounded-full"></div>
//       </div>

//       <div className="max-w-5xl mx-auto space-y-8">
        
//         {/* Header */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//           <div className="flex items-center gap-5">
//             <button 
//               onClick={() => navigate(-1)} 
//               className="h-11 w-11 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm dark:shadow-xl cursor-pointer"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <div>
//               <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
//                 Clinical <span className="text-indigo-500 not-italic">Report</span>
//               </h1>
//               <div className="flex items-center gap-2 mt-0.5">
//                 <ShieldCheck size={12} className="text-emerald-500" />
//                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Auth: Medical Officer</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex bg-white dark:bg-[#0f172a]/80 border border-slate-200 dark:border-white/5 p-1.5 rounded-xl backdrop-blur-xl shadow-sm">
//             <div className="h-10 w-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
//               <User size={20} />
//             </div>
//             <div className="px-4 py-0.5">
//               <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">{patient?.name}</p>
//               <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{patient?.age}Y • {patient?.gender}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-[#0f172a]/40 border border-slate-200 dark:border-white/5 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-xl dark:shadow-2xl transition-colors">
//           <div className="p-8 md:p-12 space-y-10">
            
//             {/* Symptom Module */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Activity size={14} className="text-indigo-500 dark:text-indigo-400" />
//                 <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.2em]">Symptoms Analysis Input</label>
//               </div>
//               <div className="relative group">
//                 <div className="relative flex flex-col md:flex-row gap-3">
//                   <div className="relative flex-1">
//                     <input 
//                       className="w-full p-5 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-indigo-500/50 text-slate-900 dark:text-white font-bold transition-all pl-12" 
//                       value={symptoms} 
//                       onChange={(e) => setSymptoms(e.target.value)} 
//                       placeholder="Identify patient symptoms..." 
//                     />
//                     <Database className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600" size={18} />
//                   </div>
//                   <button 
//                     onClick={handleAIAnalyze} 
//                     disabled={aiLoading}
//                     className="px-8 py-4 bg-indigo-600 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 dark:hover:bg-indigo-500 dark:hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg"
//                   >
//                     {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} 
//                     Analyze
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* AI Log Area */}
//             <div className="space-y-4">
//               <div className="flex items-center justify-between px-2">
//                 <div className="flex items-center gap-2">
//                   <FileText size={14} className="text-indigo-500 dark:text-indigo-400" />
//                   <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.2em]">Medical Log Editor</label>
//                 </div>
//               </div>
              
//               <div className="relative group">
//                 <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-md"></div>
//                 <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30 rounded-br-md"></div>
                
//                 <textarea 
//                   className="w-full p-8 bg-slate-50 dark:bg-[#050505]/60 text-slate-800 dark:text-indigo-100 border border-slate-200 dark:border-white/5 rounded-[2rem] outline-none h-[400px] font-mono text-sm leading-relaxed shadow-inner focus:border-indigo-500/40 transition-all custom-scrollbar" 
//                   value={clinicalReport} 
//                   onChange={(e) => setClinicalReport(e.target.value)} 
//                   placeholder="Awaiting AI analysis..."
//                 />
//               </div>
//             </div>

//             {/* Action Bar */}
//             <div className="flex items-stretch gap-4">
//                 <button 
//                   onClick={handlePrescribe}
//                   className="flex-1 py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-2xl shadow-lg dark:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 group relative overflow-hidden cursor-pointer"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                   <Save size={18} />
//                   <span className="uppercase tracking-[0.3em] italic hidden md:block">Commit to Secure Records</span>
//                   <span className="uppercase tracking-[0.3em] italic md:hidden">Commit</span>
//                 </button>

//                 <button 
//                   onClick={downloadPDF}
//                   disabled={!clinicalReport}
//                   title="Download Medical PDF"
//                   className="px-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-indigo-500/50 text-slate-600 dark:text-white rounded-2xl transition-all flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed group shadow-md dark:shadow-xl cursor-pointer"
//                 >
//                   <Download size={20} className="text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
//                 </button>
//             </div>
//           </div>
//         </div>

//         <footer className="text-center space-y-2">
//           <p className="text-[8px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">
//             End-to-End Encrypted Medical Archive • Neural Link v3.0.4
//           </p>
//         </footer>
//       </div>
//     </div>
//   );
// }












// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../util/api'; 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import jsPDF from 'jspdf';
// import { 
//   Sparkles, Loader2, User, ChevronLeft, Database, 
//   Save, FileText, Activity, ShieldCheck, Download 
// } from 'lucide-react'; 

// export default function Prescription() {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [symptoms, setSymptoms] = useState('');
//   const [aiLoading, setAiLoading] = useState(false);
  
//   // --- NAYA STATE STRUCTURE ---
//   const [clinicalData, setClinicalData] = useState({
//     diagnosis: '',
//     riskLevel: 'Low',
//     aiSummary: '',
//     suggestedTests: [],
//     medicines: [],
//     advice: ''
//   });

//   // Display ke liye text (Typing effect ke liye)
//   const [displayText, setDisplayText] = useState('');

//   const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const toastStyle = { theme: isDarkMode ? "dark" : "light", position: "top-right" };

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const res = await API.get(`/patients/${id}`);
//         setPatient(res.data.data);
//         if (res.data.data.disease) setSymptoms(res.data.data.disease);
//       } catch (err) {
//         toast.error("Failed to load patient data!", toastStyle);
//         navigate('/dashboard');
//       } finally { setLoading(false); }
//     };
//     fetchPatientData();
//   }, [id, navigate]);

//   // --- PDF GENERATION (Ab structured data use karega) ---
//   const downloadPDF = () => {
//     if (!clinicalData.diagnosis) return;
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pageWidth = pdf.internal.pageSize.getWidth();
    
//     pdf.setFillColor(79, 70, 229); 
//     pdf.rect(0, 0, pageWidth, 40, 'F');
//     pdf.setTextColor(255, 255, 255);
//     pdf.setFontSize(22);
//     pdf.setFont("helvetica", "bold");
//     pdf.text("CLINIC OS - MEDICAL REPORT", 20, 25);
    
//     pdf.setTextColor(40, 40, 40);
//     pdf.setFontSize(10);
//     pdf.text(`Patient: ${patient?.name}`, 20, 50);
//     pdf.text(`Diagnosis: ${clinicalData.diagnosis}`, 20, 57);
//     pdf.text(`Risk: ${clinicalData.riskLevel}`, 20, 64);

//     pdf.line(20, 70, pageWidth - 20, 70);

//     pdf.setFont("helvetica", "bold");
//     pdf.text("MEDICATIONS:", 20, 80);
//     pdf.setFont("helvetica", "normal");
    
//     let yPos = 90;
//     clinicalData.medicines.forEach((m, i) => {
//       pdf.text(`${i+1}. ${m.name} (${m.dosage}) - ${m.duration}`, 25, yPos);
//       yPos += 7;
//     });

//     pdf.save(`Report_${patient?.name}.pdf`);
//   };

//   const typeText = (fullText) => {
//     let index = 0;
//     setDisplayText('');
//     const interval = setInterval(() => {
//       if (index < fullText.length) {
//         setDisplayText(prev => prev + fullText.charAt(index));
//         index++;
//       } else {
//         clearInterval(interval);
//         setAiLoading(false);
//       }
//     }, 5);
//   };

//   const handleAIAnalyze = async () => {
//     if (!symptoms) return toast.warning("Please enter symptoms first!", toastStyle);
//     setAiLoading(true);
//     try {
//       const res = await API.post('/ai/analyze', { 
//         patientId: id, symptoms, age: patient?.age, gender: patient?.gender 
//       });
      
//       const data = res.data?.data;
//       setClinicalData(data); // Pura object save kar liya

//       // Typing effect ke liye string bana li
//       const summaryString = ` DIAGNOSIS: ${data.diagnosis}\n\nRISK: ${data.riskLevel}\n\nSUMMARY: ${data.aiSummary}\n\nADVICE: ${data.advice}`;
//       typeText(summaryString);
      
//       toast.success("AI Analysis Complete!", toastStyle);
//     } catch (err) {
//       setAiLoading(false);
//       toast.error("AI Analysis Failed!", toastStyle);
//     }
//   };

//   const handlePrescribe = async (e) => {
//     e.preventDefault();
//     if (!clinicalData.diagnosis) return toast.error("No diagnosis to save!", toastStyle);

//     const saveToast = toast.loading("Syncing with Records...");
//     try {
//       // --- AB HUM STRUCTURED DATA BHEJ RAHE HAIN ---
//       await API.post('/doctor/add', { 
//         patientId: id, 
//         symptoms: symptoms,
//         diagnosis: clinicalData.diagnosis, // Ab ye sirf diagnosis hai, puri khichdi nahi
//         medicines: clinicalData.medicines, 
//         suggestedTests: clinicalData.suggestedTests,
//         advice: clinicalData.advice,
//         aiSummary: clinicalData.aiSummary,
//         riskLevel: clinicalData.riskLevel
//       });

//       toast.update(saveToast, { render: "Record Saved Successfully!", type: "success", isLoading: false, autoClose: 2000 });
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } catch (err) {
//       toast.update(saveToast, { render: "Save Failed!", type: "error", isLoading: false, autoClose: 3000 });
//     }
//   };

//   if (loading) return <div className="flex h-screen items-center justify-center bg-[#080b14]"><Loader2 className="animate-spin text-indigo-500" size={48} /></div>;

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] p-4 lg:p-10 font-sans transition-all">
//       <ToastContainer theme={isDarkMode ? "dark" : "light"} />
      
//       <div className="max-w-5xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <button onClick={() => navigate(-1)} className="p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-indigo-600 hover:text-white transition-all">
//               <ChevronLeft size={20} />
//             </button>
//             <h1 className="text-2xl font-black uppercase italic dark:text-white tracking-tight">Prescription <span className="text-indigo-500">Portal</span></h1>
//           </div>
//           <div className="p-3 bg-white dark:bg-[#0f172a] rounded-xl border border-indigo-500/20 flex items-center gap-3">
//              <div className="h-8 w-8 bg-indigo-500/10 rounded flex items-center justify-center text-indigo-500"><User size={16}/></div>
//              <p className="text-[10px] font-black uppercase dark:text-white">{patient?.name} <span className="text-slate-500 ml-2">{patient?.age}Y</span></p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-6">
//           {/* Input Box */}
//           <div className="bg-white dark:bg-[#0f172a]/40 p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl">
//             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block">Patient Symptoms</label>
//             <div className="flex gap-3">
//               <input 
//                 className="flex-1 p-4 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-indigo-500 text-sm font-bold dark:text-white"
//                 value={symptoms} 
//                 onChange={(e) => setSymptoms(e.target.value)} 
//                 placeholder="Enter symptoms (e.g. Fever, Cough)..."
//               />
//               <button 
//                 onClick={handleAIAnalyze} 
//                 disabled={aiLoading}
//                 className="px-6 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase hover:bg-indigo-700 transition-all flex items-center gap-2"
//               >
//                 {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Analyze
//               </button>
//             </div>
//           </div>

//           {/* AI Result Preview */}
//           <div className="bg-white dark:bg-[#0f172a]/40 p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl min-h-[300px] relative">
//             <div className="flex justify-between items-center mb-6">
//                <label className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Clinical Log Preview</label>
//                {clinicalData.diagnosis && (
//                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${clinicalData.riskLevel === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
//                    {clinicalData.riskLevel} Risk
//                  </span>
//                )}
//             </div>
            
//             <textarea 
//               className="w-full bg-transparent border-none outline-none text-sm font-mono leading-relaxed h-64 dark:text-indigo-100 resize-none custom-scrollbar"
//               value={displayText}
//               readOnly
//               placeholder="Waiting for AI core analysis..."
//             />

//             <div className="mt-8 flex gap-4">
//                <button onClick={handlePrescribe} className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
//                  <Save size={16}/> Save Record
//                </button>
//                <button onClick={downloadPDF} disabled={!clinicalData.diagnosis} className="px-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center disabled:opacity-30">
//                  <Download size={20} className="text-indigo-500" />
//                </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }










// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../util/api'; 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import jsPDF from 'jspdf';
// import { 
//   Sparkles, Loader2, User, ChevronLeft, Database, 
//   Save, FileText, Activity, ShieldCheck, Download 
// } from 'lucide-react'; 

// export default function Prescription() {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [symptoms, setSymptoms] = useState('');
//   const [aiLoading, setAiLoading] = useState(false);
  
//   // Structured State for Backend & PDF
//   const [clinicalData, setClinicalData] = useState({
//     diagnosis: '',
//     riskLevel: 'Low',
//     aiSummary: '',
//     suggestedTests: [],
//     medicines: [],
//     advice: ''
//   });

//   const [displayText, setDisplayText] = useState('');

//   const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const toastStyle = { theme: isDarkMode ? "dark" : "light", position: "top-right" };

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const res = await API.get(`/patients/${id}`);
//         setPatient(res.data.data);
//         if (res.data.data.disease) setSymptoms(res.data.data.disease);
//       } catch (err) {
//         toast.error("Failed to load patient data!", toastStyle);
//         navigate('/dashboard');
//       } finally { setLoading(false); }
//     };
//     fetchPatientData();
//   }, [id, navigate]);

//   // --- COMPLETE DETAILED PDF LOGIC ---
//   const downloadPDF = () => {
//     if (!clinicalData.diagnosis) return;
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const margin = 20;
//     const contentWidth = pageWidth - (margin * 2);
//     let yPos = 50;

//     // Header Branding
//     pdf.setFillColor(79, 70, 229); 
//     pdf.rect(0, 0, pageWidth, 40, 'F');
//     pdf.setTextColor(255, 255, 255);
//     pdf.setFontSize(22);
//     pdf.setFont("helvetica", "bold");
//     pdf.text("CLINIC OS - MEDICAL REPORT", margin, 25);
    
//     // Patient & Date Info
//     pdf.setTextColor(40, 40, 40);
//     pdf.setFontSize(10);
//     pdf.text(`Patient Name: ${patient?.name}`, margin, 50);
//     pdf.text(`Age/Gender: ${patient?.age}Y / ${patient?.gender}`, margin, 57);
//     pdf.text(`Report Date: ${new Date().toLocaleDateString()}`, pageWidth - 70, 50);
    
//     pdf.setDrawColor(230, 230, 230);
//     pdf.line(margin, 65, pageWidth - margin, 65);
//     yPos = 75;

//     // Section 1: Diagnosis
//     pdf.setFont("helvetica", "bold");
//     pdf.setTextColor(79, 70, 229);
//     pdf.text("CLINICAL DIAGNOSIS:", margin, yPos);
//     pdf.setFont("helvetica", "normal");
//     pdf.setTextColor(40, 40, 40);
//     pdf.text(`${clinicalData.diagnosis.toUpperCase()} (${clinicalData.riskLevel} RISK)`, margin + 45, yPos);
//     yPos += 12;

//     // Section 2: Symptoms
//     pdf.setFont("helvetica", "bold");
//     pdf.text("SYMPTOMS RECORDED:", margin, yPos);
//     pdf.setFont("helvetica", "normal");
//     pdf.text(symptoms || "None reported", margin + 45, yPos);
//     yPos += 15;

//     // Section 3: Medications Table Style
//     pdf.setFont("helvetica", "bold");
//     pdf.setFillColor(248, 250, 252);
//     pdf.rect(margin, yPos - 5, contentWidth, 8, 'F');
//     pdf.text("PRESCRIBED MEDICATIONS", margin + 2, yPos);
//     yPos += 10;
//     pdf.setFont("helvetica", "normal");
//     pdf.setFontSize(9);
    
//     clinicalData.medicines.forEach((m, i) => {
//       pdf.setFont("helvetica", "bold");
//       pdf.text(`${i + 1}. ${m.name} (${m.dosage})`, margin + 5, yPos);
//       pdf.setFont("helvetica", "normal");
//       pdf.text(`Duration: ${m.duration}`, margin + 120, yPos);
//       yPos += 5;
//       if (m.instruction) {
//         pdf.setFontSize(8);
//         pdf.setTextColor(100, 100, 100);
//         pdf.text(`Instruction: ${m.instruction}`, margin + 10, yPos);
//         pdf.setTextColor(40, 40, 40);
//         pdf.setFontSize(9);
//         yPos += 6;
//       }
//     });
//     yPos += 10;

//     // Section 4: Tests
//     if (clinicalData.suggestedTests?.length > 0) {
//       pdf.setFontSize(10);
//       pdf.setFont("helvetica", "bold");
//       pdf.text("SUGGESTED INVESTIGATIONS:", margin, yPos);
//       yPos += 6;
//       pdf.setFont("helvetica", "normal");
//       pdf.text(clinicalData.suggestedTests.join(", "), margin + 5, yPos);
//       yPos += 12;
//     }

//     // Section 5: Advice (With Auto-Wrap)
//     pdf.setFontSize(10);
//     pdf.setFont("helvetica", "bold");
//     pdf.text("MEDICAL ADVICE & LIFESTYLE:", margin, yPos);
//     yPos += 6;
//     pdf.setFont("helvetica", "normal");
//     const splitAdvice = pdf.splitTextToSize(clinicalData.advice || "No specific advice provided.", contentWidth);
//     pdf.text(splitAdvice, margin + 5, yPos);

//     // Footer
//     pdf.setFontSize(8);
//     pdf.setTextColor(180, 180, 180);
//     pdf.text("This is an AI-assisted clinical record generated via Clinic OS Neural Link.", margin, 285);

//     pdf.save(`Prescription_${patient?.name.replace(/\s+/g, '_')}.pdf`);
//     toast.success("Professional Report Downloaded!", toastStyle);
//   };

//   const typeText = (fullText) => {
//     let index = 0;
//     setDisplayText('');
//     const interval = setInterval(() => {
//       if (index < fullText.length) {
//         setDisplayText(prev => prev + fullText.charAt(index));
//         index++;
//       } else {
//         clearInterval(interval);
//         setAiLoading(false);
//       }
//     }, 5);
//   };

//   const handleAIAnalyze = async () => {
//     if (!symptoms) return toast.warning("Please enter symptoms first!", toastStyle);
//     setAiLoading(true);
//     const aiToastId = toast.loading("AI Engine analyzing core data...");
    
//     try {
//       const res = await API.post('/ai/analyze', { 
//         patientId: id, symptoms, age: patient?.age, gender: patient?.gender 
//       });
      
//       const data = res.data?.data;
//       setClinicalData(data);

//       const medsSection = data.medicines?.map((m, i) => (
//         `${i + 1}. ${m.name} ${m.dosage} - ${m.duration}\n   Note: ${m.instruction}`
//       )).join('\n\n') || "No medications.";

//       const formattedText = 
//         ` DIAGNOSIS:\n${data.diagnosis}\n\n` +
//         `RISK LEVEL: ${data.riskLevel}\n\n` +
//         `AI SUMMARY:\n${data.aiSummary}\n\n` +
//         `SUGGESTED TESTS:\n${data.suggestedTests?.join(', ') || "None"}\n\n` +
//         `MEDICATIONS:\n${medsSection}\n\n` + 
//         `ADVICE:\n${data.advice}`;

//       toast.dismiss(aiToastId);
//       typeText(formattedText);
//       toast.success("AI Analysis Complete!", toastStyle);
//     } catch (err) {
//       setAiLoading(false);
//       toast.dismiss(aiToastId);
//       toast.error("AI Analysis Failed!", toastStyle);
//     }
//   };

//   const handlePrescribe = async (e) => {
//     e.preventDefault();
//     if (!clinicalData.diagnosis) return toast.error("No diagnosis to save!", toastStyle);

//     const saveToast = toast.loading("Syncing with Secure Records...");
//     try {
//       await API.post('/doctor/add', { 
//         patientId: id, 
//         symptoms: symptoms,
//         diagnosis: clinicalData.diagnosis,
//         medicines: clinicalData.medicines, 
//         suggestedTests: clinicalData.suggestedTests,
//         advice: clinicalData.advice,
//         aiSummary: clinicalData.aiSummary,
//         riskLevel: clinicalData.riskLevel
//       });

//       toast.update(saveToast, { render: "Record Committed! 🚀", type: "success", isLoading: false, autoClose: 2000 });
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } catch (err) {
//       toast.update(saveToast, { render: "Database Error!", type: "error", isLoading: false, autoClose: 3000 });
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-500" size={48} />
//       <p className="mt-4 text-indigo-300 font-mono text-[10px] tracking-[0.3em] uppercase">Loading Neural Link...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] text-slate-700 dark:text-slate-300 p-4 lg:p-10 font-sans selection:bg-indigo-500/30 transition-all duration-300">
//       <ToastContainer theme={isDarkMode ? "dark" : "light"} />
      
//       {/* Glow Effects */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
//         <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full"></div>
//       </div>

//       <div className="max-w-5xl mx-auto space-y-8">
        
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//           <div className="flex items-center gap-5">
//             <button 
//               onClick={() => navigate(-1)} 
//               className="h-11 w-11 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm cursor-pointer"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <div>
//               <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
//                 Prescription <span className="text-indigo-500 not-italic">Portal</span>
//               </h1>
//               <div className="flex items-center gap-2 mt-0.5">
//                 <ShieldCheck size={12} className="text-emerald-500" />
//                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Auth: Medical Officer</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex bg-white dark:bg-[#0f172a]/80 border border-slate-200 dark:border-white/5 p-1.5 rounded-xl backdrop-blur-xl shadow-sm">
//             <div className="h-10 w-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
//               <User size={20} />
//             </div>
//             <div className="px-4 py-0.5">
//               <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">{patient?.name}</p>
//               <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{patient?.age}Y • {patient?.gender}</p>
//             </div>
//           </div>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white dark:bg-[#0f172a]/40 border border-slate-200 dark:border-white/5 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-xl dark:shadow-2xl">
//           <div className="p-8 md:p-12 space-y-10">
            
//             {/* Symptom Input Module */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Activity size={14} className="text-indigo-500" />
//                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Symptoms Analysis Input</label>
//               </div>
//               <div className="relative flex flex-col md:flex-row gap-3">
//                 <div className="relative flex-1">
//                   <input 
//                     className="w-full p-5 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-indigo-500 text-slate-900 dark:text-white font-bold pl-12 transition-all" 
//                     value={symptoms} 
//                     onChange={(e) => setSymptoms(e.target.value)} 
//                     placeholder="Enter patient symptoms..." 
//                   />
//                   <Database className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//                 </div>
//                 <button 
//                   onClick={handleAIAnalyze} 
//                   disabled={aiLoading}
//                   className="px-8 py-4 bg-indigo-600 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 dark:hover:bg-indigo-500 dark:hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg cursor-pointer"
//                 >
//                   {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} 
//                   Analyze
//                 </button>
//               </div>
//             </div>

//             {/* AI Log Preview Area */}
//             <div className="space-y-4">
//               <div className="flex items-center justify-between px-2">
//                 <div className="flex items-center gap-2">
//                   <FileText size={14} className="text-indigo-500" />
//                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Clinical Log Preview</label>
//                 </div>
//                 {clinicalData.diagnosis && (
//                   <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${clinicalData.riskLevel === 'High' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
//                     {clinicalData.riskLevel} Risk
//                   </span>
//                 )}
//               </div>
              
//               <div className="relative group">
//                 <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-md"></div>
//                 <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30 rounded-br-md"></div>
//                 <textarea 
//                   className="w-full p-8 bg-slate-50 dark:bg-[#050505]/60 text-slate-800 dark:text-indigo-100 border border-slate-200 dark:border-white/5 rounded-[2rem] outline-none h-[400px] font-mono text-sm leading-relaxed shadow-inner focus:border-indigo-500/40 transition-all custom-scrollbar resize-none" 
//                   value={displayText} 
//                   readOnly
//                   placeholder="Awaiting AI core analysis..."
//                 />
//               </div>
//             </div>

//             {/* Action Bar */}
//             <div className="flex items-stretch gap-4">
//               <button 
//                 onClick={handlePrescribe}
//                 disabled={!clinicalData.diagnosis}
//                 className="flex-1 py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-2xl shadow-lg dark:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden disabled:opacity-30 cursor-pointer"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
//                 <Save size={18} />
//                 <span className="uppercase tracking-[0.3em] italic">Commit to Secure Records</span>
//               </button>

//               <button 
//                 onClick={downloadPDF}
//                 disabled={!clinicalData.diagnosis}
//                 title="Download Detailed Report"
//                 className="px-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-600 dark:text-white rounded-2xl transition-all flex items-center justify-center disabled:opacity-20 shadow-md cursor-pointer group"
//               >
//                 <Download size={20} className="text-indigo-500 group-hover:scale-110 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <footer className="text-center pb-10">
//           <p className="text-[8px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">
//             End-to-End Encrypted Medical Archive • Neural Link v3.0.4
//           </p>
//         </footer>
//       </div>
//     </div>
//   );
// }






// // ... (imports same rahenge)

// export default function Prescription() {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [symptoms, setSymptoms] = useState('');
//   const [aiLoading, setAiLoading] = useState(false);
  
//   // ... (clinicalData aur baki states same rahengi)

//   const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const toastStyle = { theme: isDarkMode ? "dark" : "light", position: "top-right" };

//   // --- UPDATED FETCH LOGIC ---
//   useEffect(() => {
//     const fetchFullConsultationData = async () => {
//       try {
//         // 1. Patient ki basic profile fetch karein
//         const patientRes = await API.get(`/patients/${id}`);
//         setPatient(patientRes.data.data);

//         // 2. Naya Route: Latest appointment ka reason fetch karein
//         // Note: Route path aapke backend se match hona chahiye (e.g., /receptionist/latest-reason/:id)
//         const reasonRes = await API.get(`/receptionist/latest-reason/${id}`);
        
//         if (reasonRes.data.success && reasonRes.data.data.reason) {
//           // Booking ke waqt likha gaya reason symptoms box mein set karein
//           setSymptoms(reasonRes.data.data.reason);
//         } else {
//           setSymptoms(''); // Agar koi reason na mile
//         }

//       } catch (err) {
//         console.error("Fetch Error:", err);
//         toast.error("Error syncing medical records!", toastStyle);
//         // navigate('/dashboard'); // Optional: Error par wapas bhejne ke liye
//       } finally { 
//         setLoading(false); 
//       }
//     };

//     fetchFullConsultationData();
//   }, [id]);

//   // --- Baki Functions (downloadPDF, handleAIAnalyze, handlePrescribe) Same Rahenge ---

//   if (loading) return (
//     <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-500" size={48} />
//       <p className="mt-4 text-indigo-300 font-mono text-[10px] tracking-[0.3em] uppercase">Syncing Neural Records...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] ...">
//       <ToastContainer theme={isDarkMode ? "dark" : "light"} />
      
//       {/* Glow Effects */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
//       </div>

//       <div className="max-w-5xl mx-auto space-y-8">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//           <div className="flex items-center gap-5">
//             <button onClick={() => navigate(-1)} className="...">
//               <ChevronLeft size={20} />
//             </button>
//             <div>
//               <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
//                 Prescription <span className="text-indigo-500 not-italic">Portal</span>
//               </h1>
//               <div className="flex items-center gap-2 mt-0.5">
//                 <ShieldCheck size={12} className="text-emerald-500" />
//                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Live Session: Secure</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex bg-white dark:bg-[#0f172a]/80 border border-slate-200 dark:border-white/5 p-1.5 rounded-xl backdrop-blur-xl shadow-sm">
//             <div className="h-10 w-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
//               <User size={20} />
//             </div>
//             <div className="px-4 py-0.5">
//               <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">{patient?.name}</p>
//               <div className="flex items-center gap-2">
//                 <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{patient?.age}Y • {patient?.gender}</p>
//                 {/* Medical History Badge (Purani Registeration wali 'disease') */}
//                 {patient?.disease && (
//                   <span className="text-[7px] bg-rose-500/10 text-rose-500 px-1.5 py-0.5 rounded border border-rose-500/20 font-black uppercase">
//                     Hx: {patient.disease}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white dark:bg-[#0f172a]/40 border border-slate-200 dark:border-white/5 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-xl dark:shadow-2xl">
//           <div className="p-8 md:p-12 space-y-10">
            
//             {/* Symptom Input Module */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Activity size={14} className="text-indigo-500" />
//                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Complaint / Visit Reason</label>
//               </div>
//               <div className="relative flex flex-col md:flex-row gap-3">
//                 <div className="relative flex-1">
//                   <input 
//                     className="w-full p-5 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-indigo-500 text-slate-900 dark:text-white font-bold pl-12 transition-all shadow-inner" 
//                     value={symptoms} 
//                     onChange={(e) => setSymptoms(e.target.value)} 
//                     placeholder="Auto-loaded from appointment booking..." 
//                   />
//                   <Database className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//                 </div>
//                 {/* ... (Analyze button same rahega) */}
//               </div>
//             </div>

//             {/* ... (AI Log Area aur Action Bar same rahenge) */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


































// export default function Prescription() {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [symptoms, setSymptoms] = useState('');
//   const [aiLoading, setAiLoading] = useState(false);
  
//   const [clinicalData, setClinicalData] = useState({
//     diagnosis: '',
//     riskLevel: 'Low',
//     aiSummary: '',
//     suggestedTests: [],
//     medicines: [],
//     advice: ''
//   });

//   const [displayText, setDisplayText] = useState('');

//   const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const toastStyle = { theme: isDarkMode ? "dark" : "light", position: "top-right" };

//   // --- 1. BACKEND SYNC LOGIC ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       if (!id) return;
//       try {
//         setLoading(true);
//         // Step A: Get Patient Bio
//         const patientRes = await API.get(`/patients/${id}`);
//         setPatient(patientRes.data.data);

//         // Step B: Get Latest Booking Reason (The New Backend Route)
//         const reasonRes = await API.get(`/receptionist/latest-reason/${id}`);
//         if (reasonRes.data.success && reasonRes.data.data?.reason) {
//           setSymptoms(reasonRes.data.data.reason); // Auto-fill AI input
//         }
//       } catch (err) {
//         toast.error("Failed to sync clinical context", toastStyle);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, [id]);

//   // --- 2. AI ANALYSIS LOGIC ---
//   const handleAIAnalyze = async () => {
//     if (!symptoms) return toast.warning("Provide symptoms for AI analysis!", toastStyle);
    
//     setAiLoading(true);
//     const aiToastId = toast.loading("Neural Engine processing symptoms...");
    
//     try {
//       const res = await API.post('/ai/analyze', { 
//         patientId: id, 
//         symptoms, 
//         age: patient?.age, 
//         gender: patient?.gender 
//       });
      
//       const data = res.data?.data;
//       setClinicalData(data);

//       const medsSection = data.medicines?.map((m, i) => (
//         `${i + 1}. ${m.name} [${m.dosage}] - ${m.duration}\n   Instruction: ${m.instruction}`
//       )).join('\n\n') || "No specific medications.";

//       const formattedText = 
//         `>>>  DIAGNOSIS:\n${data.diagnosis.toUpperCase()}\n\n` +
//         `>>> RISK ASSESSMENT: ${data.riskLevel}\n\n` +
//         `>>> PATHOLOGY SUGGESTIONS:\n${data.suggestedTests?.join(', ') || "None"}\n\n` +
//         `>>> PRESCRIBED REGIMEN:\n${medsSection}\n\n` + 
//         `>>> MEDICAL ADVICE:\n${data.advice}\n\n` +
//         `>>> AI SUMMARY:\n${data.aiSummary}`;

//       toast.dismiss(aiToastId);
//       typeText(formattedText); // Starts the typewriter effect
//       toast.success("AI Generation Successful!", toastStyle);
//     } catch (err) {
//       setAiLoading(false);
//       toast.dismiss(aiToastId);
//       toast.error("AI Service Unavailable", toastStyle);
//     }
//   };

//   // Typewriter effect for AI display
//   const typeText = (fullText) => {
//     let index = 0;
//     setDisplayText('');
//     const interval = setInterval(() => {
//       if (index < fullText.length) {
//         setDisplayText(prev => prev + fullText.charAt(index));
//         index++;
//       } else {
//         clearInterval(interval);
//         setAiLoading(false);
//       }
//     }, 5);
//   };

//   // --- 3. FINAL PRESCRIPTION SAVE ---
//   const handlePrescribe = async (e) => {
//     e.preventDefault();
//     if (!clinicalData.diagnosis) return toast.error("Complete AI analysis first!", toastStyle);

//     const saveToast = toast.loading("Committing to secure database...");
//     try {
//       await API.post('/doctor/add', { 
//         patientId: id, 
//         symptoms: symptoms,
//         diagnosis: clinicalData.diagnosis,
//         medicines: clinicalData.medicines, 
//         suggestedTests: clinicalData.suggestedTests,
//         advice: clinicalData.advice,
//         aiSummary: clinicalData.aiSummary,
//         riskLevel: clinicalData.riskLevel
//       });

//       toast.update(saveToast, { render: "Prescription Recorded! 🚀", type: "success", isLoading: false, autoClose: 2000 });
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } catch (err) {
//       toast.update(saveToast, { render: "Critical Database Error!", type: "error", isLoading: false, autoClose: 3000 });
//     }
//   };

//   // --- 4. PDF GENERATION ---
//   const downloadPDF = () => {
//     if (!clinicalData.diagnosis) return;
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const margin = 20;
//     const contentWidth = pageWidth - (margin * 2);
//     let yPos = 50;

//     // Header Branding
//     pdf.setFillColor(79, 70, 229); 
//     pdf.rect(0, 0, pageWidth, 40, 'F');
//     pdf.setTextColor(255, 255, 255);
//     pdf.setFontSize(22);
//     pdf.setFont("helvetica", "bold");
//     pdf.text("CLINIC OS - MEDICAL REPORT", margin, 25);
    
//     // Bio
//     pdf.setTextColor(40, 40, 40);
//     pdf.setFontSize(10);
//     pdf.text(`Patient: ${patient?.name}`, margin, 50);
//     pdf.text(`Age/Sex: ${patient?.age}Y / ${patient?.gender}`, margin, 57);
//     pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 70, 50);
    
//     pdf.setDrawColor(230, 230, 230);
//     pdf.line(margin, 65, pageWidth - margin, 65);
//     yPos = 75;

//     // Diagnosis Section
//     pdf.setFont("helvetica", "bold");
//     pdf.setTextColor(79, 70, 229);
//     pdf.text("DIAGNOSIS:", margin, yPos);
//     pdf.setFont("helvetica", "normal");
//     pdf.setTextColor(40, 40, 40);
//     pdf.text(`${clinicalData.diagnosis.toUpperCase()} (${clinicalData.riskLevel} RISK)`, margin + 45, yPos);
    
//     yPos += 15;
//     pdf.setFont("helvetica", "bold");
//     pdf.text("MEDICATIONS:", margin, yPos);
//     yPos += 10;
//     pdf.setFont("helvetica", "normal");
//     clinicalData.medicines.forEach((m, i) => {
//         pdf.text(`${i + 1}. ${m.name} (${m.dosage}) - ${m.duration}`, margin + 5, yPos);
//         yPos += 7;
//     });

//     pdf.save(`RX_${patient?.name}.pdf`);
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-500" size={48} />
//       <p className="mt-4 text-indigo-300 font-mono text-[10px] uppercase tracking-widest">Initialising Neural Link...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] text-slate-700 dark:text-slate-300 p-4 lg:p-10 font-sans selection:bg-indigo-500/30 transition-all duration-300">
//       <ToastContainer theme={isDarkMode ? "dark" : "light"} />
      
//       <div className="max-w-5xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <button onClick={() => navigate(-1)} className="h-10 w-10 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
//               <ChevronLeft size={20} />
//             </button>
//             <h1 className="text-2xl font-black uppercase italic text-slate-900 dark:text-white">
//               AI Prescription <span className="text-indigo-500">Engine</span>
//             </h1>
//           </div>
          
//           <div className="bg-white dark:bg-white/5 p-2 rounded-2xl flex items-center gap-3 border border-slate-200 dark:border-white/10">
//             <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white"><User size={16}/></div>
//             <div className="pr-4 text-[10px] font-bold uppercase tracking-tighter">
//                 <p>{patient?.name}</p>
//                 <p className="opacity-50">{patient?.age}Y • {patient?.gender}</p>
//             </div>
//           </div>
//         </div>

//         {/* AI Input Section */}
//         <div className="bg-white dark:bg-[#0f172a]/40 p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 space-y-6">
//           <div className="space-y-4">
//             <label className="text-[10px] font-black uppercase text-indigo-500 tracking-widest flex items-center gap-2">
//               <Activity size={14}/> Symptoms Input
//             </label>
//             <div className="flex gap-3">
//               <div className="relative flex-1">
//                 <input 
//                   className="w-full p-4 bg-slate-100 dark:bg-black/30 border border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-bold pl-12"
//                   value={symptoms}
//                   onChange={(e) => setSymptoms(e.target.value)}
//                   placeholder="Patient current symptoms..."
//                 />
//                 <Database className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
//               </div>
//               <button 
//                 onClick={handleAIAnalyze}
//                 disabled={aiLoading}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
//               >
//                 {aiLoading ? <Loader2 className="animate-spin"/> : <Sparkles size={16}/>} Analyze
//               </button>
//             </div>
//           </div>

//           {/* AI Output Console */}
//           <div className="space-y-3">
//             <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Prescription Console</label>
//             <textarea 
//               className="w-full h-[350px] p-6 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/5 rounded-3xl font-mono text-sm leading-relaxed outline-none resize-none custom-scrollbar"
//               value={displayText}
//               readOnly
//               placeholder="Awaiting AI data processing..."
//             />
//           </div>

//           {/* Actions */}
//           <div className="flex gap-4">
//             <button 
//               onClick={handlePrescribe}
//               disabled={!clinicalData.diagnosis}
//               className="flex-1 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl transition-all disabled:opacity-30 uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2"
//             >
//               <Save size={18}/> Commit Prescription
//             </button>
//             <button 
//               onClick={downloadPDF}
//               disabled={!clinicalData.diagnosis}
//               className="px-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center text-indigo-500 hover:bg-slate-50 disabled:opacity-20"
//             >
//               <Download size={20}/>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../util/api'; 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import jsPDF from 'jspdf';
// import { 
//   Sparkles, Loader2, User, ChevronLeft, Database, 
//   Save, FileText, Activity, ShieldCheck, Download 
// } from 'lucide-react'; 

// export default function Prescription() {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [symptoms, setSymptoms] = useState('');
//   const [aiLoading, setAiLoading] = useState(false);
//   const [displayText, setDisplayText] = useState('');

//   // AI Generated Data State
//   const [clinicalData, setClinicalData] = useState({
//     diagnosis: '',
//     riskLevel: 'Low',
//     aiSummary: '',
//     suggestedTests: [],
//     medicines: [],
//     advice: ''
//   });

//   const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const toastStyle = { theme: isDarkMode ? "dark" : "light", position: "top-right" };

//   // --- 1. INITIAL DATA FETCH (Patient + Latest Appointment Reason) ---
//   useEffect(() => {
//     const fetchContext = async () => {
//       if (!id) return;
//       try {
//         setLoading(true);
//         // Patient Profile
//         const pRes = await API.get(`/patients/${id}`);
//         setPatient(pRes.data.data);

//         // Fetch Reason from latest appointment (Receptionist/Booking logic)
//         const rRes = await API.get(`/receptionist/latest-reason/${id}`);
//         if (rRes.data.success && rRes.data.data?.reason) {
//           setSymptoms(rRes.data.data.reason);
//         }
//       } catch (err) {
//         toast.error("Error syncing medical context", toastStyle);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchContext();
//   }, [id]);

//   // --- 2. AI ANALYSIS LOGIC ---
//   const handleAIAnalyze = async () => {
//     if (!symptoms) return toast.warning("Please enter symptoms first!", toastStyle);
//     setAiLoading(true);
//     const aiToastId = toast.loading("AI Engine analyzing clinical data...");
    
//     try {
//       const res = await API.post('/ai/analyze', { 
//         patientId: id, symptoms, age: patient?.age, gender: patient?.gender 
//       });
      
//       const data = res.data?.data;
//       setClinicalData(data); // State for Backend & PDF

//       // Formatting text for the UI Console
//       const medsText = data.medicines?.map((m, i) => 
//         `${i + 1}. ${m.name} (${m.dosage}) - ${m.duration}\n   Note: ${m.instruction}`
//       ).join('\n\n') || "No medications suggested.";

//       const fullReport = 
//         ` >>> DIAGNOSIS:\n${data.diagnosis.toUpperCase()}\n\n` +
//         `>>> RISK LEVEL: ${data.riskLevel}\n\n` +
//         `>>> AI SUMMARY:\n${data.aiSummary}\n\n` +
//         `>>> PRESCRIBED MEDICATIONS:\n${medsText}\n\n` + 
//         `>>> SUGGESTED TESTS: ${data.suggestedTests?.join(', ') || "None"}\n\n` +
//         `>>> DOCTOR ADVICE:\n${data.advice}`;

        

//       toast.dismiss(aiToastId);
//       startTypewriter(fullReport);
//       toast.success("AI Analysis Complete!", toastStyle);
//     } catch (err) {
//       setAiLoading(false);
//       toast.dismiss(aiToastId);
//       toast.error("AI Analysis Failed!", toastStyle);
//     }
//   };

//   const startTypewriter = (text) => {
//     let i = 0;
//     setDisplayText('');
//     const timer = setInterval(() => {
//       if (i < text.length) {
//         setDisplayText(prev => prev + text.charAt(i));
//         i++;
//       } else {
//         clearInterval(timer);
//         setAiLoading(false);
//       }
//     }, 5);
//   };

//   // --- 3. PDF GENERATION (Everything AI generated goes here) ---
//   const downloadPDF = () => {
//     if (!clinicalData.diagnosis) return;
    
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const margin = 20;
//     const contentWidth = pageWidth - (margin * 2);
//     let y = 50;

//     // Header Styling
//     pdf.setFillColor(79, 70, 229); 
//     pdf.rect(0, 0, pageWidth, 40, 'F');
//     pdf.setTextColor(255, 255, 255);
//     pdf.setFontSize(20);
//     pdf.setFont("helvetica", "bold");
//     pdf.text("MEDICAL PRESCRIPTION", margin, 25);
    
//     // Patient Info
//     pdf.setTextColor(60, 60, 60);
//     pdf.setFontSize(10);
//     pdf.text(`Patient: ${patient?.name}`, margin, 50);
//     pdf.text(`Age/Sex: ${patient?.age}Y / ${patient?.gender}`, margin, 56);
//     pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 60, 50);
    
//     pdf.setDrawColor(230, 230, 230);
//     pdf.line(margin, 62, pageWidth - margin, 62);
//     y = 72;

//     // Diagnosis Section
//     pdf.setFont("helvetica", "bold");
//     pdf.setTextColor(79, 70, 229);
//     pdf.text("DIAGNOSIS & SYMPTOMS:", margin, y);
//     y += 7;
//     pdf.setFont("helvetica", "normal");
//     pdf.setTextColor(40, 40, 40);
//     pdf.text(`Dx: ${clinicalData.diagnosis} (${clinicalData.riskLevel} Risk)`, margin + 5, y);
//     y += 12;

//     // Medicines Table
//     pdf.setFont("helvetica", "bold");
//     pdf.text("PRESCRIBED REGIMEN:", margin, y);
//     y += 8;
//     clinicalData.medicines.forEach((m, i) => {
//       pdf.setFont("helvetica", "bold");
//       pdf.text(`${i + 1}. ${m.name} - ${m.dosage}`, margin + 5, y);
//       pdf.setFont("helvetica", "normal");
//       pdf.text(m.duration, pageWidth - 60, y);
//       y += 5;
//       pdf.setFontSize(9);
//       pdf.setTextColor(100, 100, 100);
//       pdf.text(`Inst: ${m.instruction}`, margin + 10, y);
//       pdf.setTextColor(40, 40, 40);
//       pdf.setFontSize(10);
//       y += 8;
//     });

//     // Advice Section
//     if (clinicalData.advice) {
//       y += 5;
//       pdf.setFont("helvetica", "bold");
//       pdf.text("MEDICAL ADVICE:", margin, y);
//       y += 7;
//       pdf.setFont("helvetica", "normal");
//       const splitAdvice = pdf.splitTextToSize(clinicalData.advice, contentWidth);
//       pdf.text(splitAdvice, margin + 5, y);
//     }

//     // Footer
//     pdf.setFontSize(8);
//     pdf.setTextColor(180, 180, 180);
//     pdf.text("Digitally generated via Clinic OS Neural Link.", margin, 285);

//     pdf.save(`Prescription_${patient?.name.replace(/\s+/g, '_')}.pdf`);
//     toast.success("Professional PDF Ready!", toastStyle);
//   };

//   // --- 4. SAVE TO DATABASE ---
//   const handlePrescribe = async (e) => {
//     e.preventDefault();
//     if (!clinicalData.diagnosis) return toast.error("No analysis to commit!", toastStyle);

//     const saveToast = toast.loading("Syncing with Cloud Records...");
//     try {
//       await API.post('/add', { 
//         patientId: id, symptoms, ...clinicalData
//       });
//       toast.update(saveToast, { render: "Record Committed! 🚀", type: "success", isLoading: false, autoClose: 2000 });
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } catch (err) {
//       toast.update(saveToast, { render: "Database Sync Failed!", type: "error", isLoading: false, autoClose: 3000 });
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-500" size={48} />
//       <p className="mt-4 text-indigo-300 font-mono text-[10px] tracking-widest uppercase">Fetching Records...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] text-slate-700 dark:text-slate-300 p-4 lg:p-10 transition-all duration-300">
//       <ToastContainer theme={isDarkMode ? "dark" : "light"} />
      
//       <div className="max-w-5xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="flex items-center gap-5">
//             <button onClick={() => navigate(-1)} className="h-11 w-11 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
//               <ChevronLeft size={20} />
//             </button>
//             <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
//               AI Prescription <span className="text-indigo-500 not-italic">Engine</span>
//             </h1>
//           </div>
          
//           <div className="flex bg-white dark:bg-[#0f172a]/80 border border-slate-200 dark:border-white/5 p-1.5 rounded-xl backdrop-blur-xl shadow-sm">
//             <div className="h-10 w-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
//               <User size={20} />
//             </div>
//             <div className="px-4 py-0.5">
//               <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">{patient?.name}</p>
//               <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{patient?.age}Y • {patient?.gender}</p>
//             </div>
//           </div>
//         </div>

//         {/* Main Interface */}
//         <div className="bg-white dark:bg-[#0f172a]/40 border border-slate-200 dark:border-white/5 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-xl">
//           <div className="p-8 md:p-12 space-y-10">
            
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Activity size={14} className="text-indigo-500" />
//                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Clinical Input (Symptoms)</label>
//               </div>
//               <div className="flex gap-3">
//                 <div className="relative flex-1">
//                   <input 
//                     className="w-full p-5 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-indigo-500 text-slate-900 dark:text-white font-bold pl-12 transition-all" 
//                     value={symptoms} 
//                     onChange={(e) => setSymptoms(e.target.value)} 
//                     placeholder="Enter or verify symptoms..." 
//                   />
//                   <Database className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//                 </div>
//                 <button 
//                   onClick={handleAIAnalyze} 
//                   disabled={aiLoading}
//                   className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg"
//                 >
//                   {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Analyze
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center justify-between px-2">
//                 <div className="flex items-center gap-2">
//                   <FileText size={14} className="text-indigo-500" />
//                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">AI Generated Prescription</label>
//                 </div>
//               </div>
//               <textarea 
//                 className="w-full p-8 bg-slate-50 dark:bg-[#050505]/60 text-slate-800 dark:text-indigo-100 border border-slate-200 dark:border-white/5 rounded-[2rem] outline-none h-[350px] font-mono text-sm leading-relaxed shadow-inner custom-scrollbar resize-none" 
//                 value={displayText} 
//                 readOnly
//                 placeholder="Awaiting Neural Analysis..."
//               />
//             </div>

//             <div className="flex items-stretch gap-4">
//               <button 
//                 onClick={handlePrescribe}
//                 disabled={!clinicalData.diagnosis}
//                 className="flex-1 py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-30 uppercase tracking-[0.2em]"
//               >
//                 <Save size={18} /> Commit & Sync Record
//               </button>

//               <button 
//                 onClick={downloadPDF}
//                 disabled={!clinicalData.diagnosis}
//                 className="px-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 text-slate-600 dark:text-white rounded-2xl transition-all disabled:opacity-20 shadow-md group"
//               >
//                 <Download size={20} className="text-indigo-500 group-hover:scale-110 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <footer className="text-center pb-10 opacity-40">
//           <p className="text-[8px] font-bold uppercase tracking-[0.4em]">Clinic OS Neural Link v3.0.4 • End-to-End Encrypted</p>
//         </footer>
//       </div>
//     </div>
//   );
// }





















































// import { useEffect, useState } from 'react';
// import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import jsPDF from 'jspdf';
// import { 
//   ChevronLeft, User, Activity, Database, 
//   Sparkles, FileText, Save, Download, Loader2 
// } from 'lucide-react';

// export default function Prescription() {
//   const { id } = useParams(); // Patient ID
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
  
//   // LOGIC: Dashboard se bheja gaya appointmentId yahan capture kar rahe hain
//   const appointmentId = searchParams.get('appointmentId');

//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [symptoms, setSymptoms] = useState('');
//   const [aiLoading, setAiLoading] = useState(false);
//   const [displayText, setDisplayText] = useState('');

//   const [clinicalData, setClinicalData] = useState({
//     diagnosis: '',
//     riskLevel: 'Low',
//     aiSummary: '',
//     suggestedTests: [],
//     medicines: [],
//     advice: ''
//   });

//   const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const toastStyle = { theme: isDarkMode ? "dark" : "light", position: "top-right" };

//   useEffect(() => {
//     const fetchContext = async () => {
//       if (!id) return;
//       try {
//         setLoading(true);
//         // 1. Patient ki details fetch karein
//         const pRes = await API.get(`/receptionist/patient/${id}`); 
//         setPatient(pRes.data.data);

//         // 2. Dashboard se agar symptoms nahi mile toh backend se fetch karein (Optional check)
//         if (!symptoms) {
//            const rRes = await API.get(`/receptionist/latest-reason/${id}`);
//            if (rRes.data.success && rRes.data.data?.reason) {
//              setSymptoms(rRes.data.data.reason);
//            }
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Error syncing medical context", toastStyle);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchContext();
//   }, [id]);

//   const handleAIAnalyze = async () => {
//     if (!symptoms) return toast.warning("Please enter symptoms first!", toastStyle);
//     setAiLoading(true);
//     const aiToastId = toast.loading("AI Engine analyzing clinical data...");
    
//     try {
//       const res = await API.post('/ai/analyze', { 
//         patientId: id, symptoms, age: patient?.age, gender: patient?.gender 
//       });
      
//       const data = res.data?.data;
//       setClinicalData(data);

//       const medsText = data.medicines?.map((m, i) => 
//         `${i + 1}. ${m.name} (${m.dosage}) - ${m.duration}\n   Note: ${m.instruction}`
//       ).join('\n\n') || "No medications suggested.";

//       const fullReport = 
//         ` >>> DIAGNOSIS:\n${data.diagnosis.toUpperCase()}\n\n` +
//         `>>> RISK LEVEL: ${data.riskLevel}\n\n` +
//         `>>> AI SUMMARY:\n${data.aiSummary}\n\n` +
//         `>>> PRESCRIBED MEDICATIONS:\n${medsText}\n\n` + 
//         `>>> SUGGESTED TESTS: ${data.suggestedTests?.join(', ') || "None"}\n\n` +
//         `>>> DOCTOR ADVICE:\n${data.advice}`;

//       toast.dismiss(aiToastId);
//       startTypewriter(fullReport);
//       toast.success("AI Analysis Complete!", toastStyle);
//     } catch (err) {
//       setAiLoading(false);
//       toast.dismiss(aiToastId);
//       toast.error("AI Analysis Failed!", toastStyle);
//     }
//   };

//   const startTypewriter = (text) => {
//     let i = 0;
//     setDisplayText('');
//     const timer = setInterval(() => {
//       if (i < text.length) {
//         setDisplayText(prev => prev + text.charAt(i));
//         i++;
//       } else {
//         clearInterval(timer);
//         setAiLoading(false);
//       }
//     }, 5);
//   };

//   const downloadPDF = () => {
//     if (!clinicalData.diagnosis) return;
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     // PDF generation logic remains the same...
//     pdf.text("MEDICAL PRESCRIPTION", 20, 25);
//     pdf.text(`Patient: ${patient?.name}`, 20, 50);
//     pdf.save(`Prescription_${patient?.name}.pdf`);
//   };

//   // --- UPDATED SAVE LOGIC ---
//   const handlePrescribe = async (e) => {
//     e.preventDefault();
    
//     // Safety Checks
//     if (!clinicalData.diagnosis) return toast.error("No analysis to commit!", toastStyle);
//     if (!appointmentId) return toast.error("Critical Error: Appointment ID missing!", toastStyle);

//     const saveToast = toast.loading("Syncing with Cloud Records...");
//     try {
//       // Backend route is /doctor/add as per your router setup
//       await API.post('/doctor/add', { 
//         patientId: id, 
//         appointmentId: appointmentId, // This will close the queue item
//         symptoms, 
//         ...clinicalData
//       });

//       toast.update(saveToast, { render: "Record Committed! 🚀", type: "success", isLoading: false, autoClose: 2000 });
      
//       // Dashboard par wapas bhejo
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Database Sync Failed!";
//       toast.update(saveToast, { render: msg, type: "error", isLoading: false, autoClose: 3000 });
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-[#080b14] flex flex-col items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-500" size={48} />
//       <p className="mt-4 text-indigo-300 font-mono text-[10px] tracking-widest uppercase">Fetching Records...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] text-slate-700 dark:text-slate-300 p-4 lg:p-10">
//       <ToastContainer {...toastStyle} />
      
//       <div className="max-w-5xl mx-auto space-y-8">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="flex items-center gap-5">
//             <button onClick={() => navigate(-1)} className="h-11 w-11 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
//               <ChevronLeft size={20} />
//             </button>
//             <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
//               AI Prescription <span className="text-indigo-500 not-italic">Engine</span>
//             </h1>
//           </div>
          
//           <div className="flex bg-white dark:bg-[#0f172a]/80 border border-slate-200 dark:border-white/5 p-1.5 rounded-xl backdrop-blur-xl">
//             <div className="h-10 w-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-600">
//               <User size={20} />
//             </div>
//             <div className="px-4 py-0.5">
//               <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">{patient?.name}</p>
//               <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{patient?.age}Y • {patient?.gender}</p>
//             </div>
//           </div>
//         </div>

//         {/* Console Interface */}
//         <div className="bg-white dark:bg-[#0f172a]/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-xl">
//           <div className="p-8 md:p-12 space-y-10">
            
//             {/* Input Area */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Activity size={14} className="text-indigo-500" />
//                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Clinical Input (Symptoms)</label>
//               </div>
//               <div className="flex gap-3">
//                 <div className="relative flex-1">
//                   <input 
//                     className="w-full p-5 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-indigo-500 text-slate-900 dark:text-white font-bold pl-12 transition-all" 
//                     value={symptoms} 
//                     onChange={(e) => setSymptoms(e.target.value)} 
//                     placeholder="Enter or verify symptoms..." 
//                   />
//                   <Database className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//                 </div>
//                 <button 
//                   onClick={handleAIAnalyze} 
//                   disabled={aiLoading}
//                   className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50"
//                 >
//                   {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Analyze
//                 </button>
//               </div>
//             </div>

//             {/* Output Screen */}
//             <div className="space-y-4">
//                <textarea 
//                 className="w-full p-8 bg-slate-50 dark:bg-[#050505]/60 text-slate-800 dark:text-indigo-100 border border-slate-200 dark:border-white/5 rounded-[2rem] outline-none h-[350px] font-mono text-sm leading-relaxed shadow-inner resize-none" 
//                 value={displayText} 
//                 readOnly
//                 placeholder="Awaiting Neural Analysis..."
//               />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-stretch gap-4">
//               <button 
//                 onClick={handlePrescribe}
//                 disabled={!clinicalData.diagnosis || aiLoading}
//                 className="flex-1 py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-30 uppercase tracking-[0.2em]"
//               >
//                 <Save size={18} /> Commit & Sync Record
//               </button>

//               <button 
//                 onClick={downloadPDF}
//                 disabled={!clinicalData.diagnosis}
//                 className="px-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white rounded-2xl transition-all disabled:opacity-20 shadow-md"
//               >
//                 <Download size={20} className="text-indigo-500" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }













// import { useEffect, useState, useCallback } from 'react';
// import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import jsPDF from 'jspdf';
// import { 
//   ChevronLeft, User, Activity, Database, 
//   Sparkles, Save, Download, Loader2 
// } from 'lucide-react';

// export default function Prescription() {
//   const { id } = useParams(); 
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const appointmentId = searchParams.get('appointmentId');

//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [symptoms, setSymptoms] = useState('');
//   const [aiLoading, setAiLoading] = useState(false);
//   const [displayText, setDisplayText] = useState('');

//   const [clinicalData, setClinicalData] = useState({
//     diagnosis: '',
//     riskLevel: 'Low',
//     aiSummary: '',
//     suggestedTests: [],
//     medicines: [],
//     advice: ''
//   });

//   const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const toastStyle = { theme: isDarkMode ? "dark" : "light", position: "top-right" };

//   // --- Typewriter Effect Function ---
//   const startTypewriter = useCallback((text) => {
//     let i = 0;
//     setDisplayText('');
//     const timer = setInterval(() => {
//       if (i < text.length) {
//         setDisplayText(prev => prev + text.charAt(i));
//         i++;
//       } else {
//         clearInterval(timer);
//         setAiLoading(false);
//       }
//     }, 5);
//   }, []);

//   useEffect(() => {
//     const fetchContext = async () => {
//       if (!id) return;
//       try {
//         setLoading(true);
//         // FIX: MVC ke mutabiq route /api/patients/:id hai
//         const pRes = await API.get(`/patients/${id}`); 
        
//         if (pRes.data.success) {
//           setPatient(pRes.data.data);
//         }

//         // Optional: Pre-fill symptoms if appointment has a reason
//         // Isay wrap kiya hai taake agar ye fail ho toh poora page crash na ho
//         try {
//            const rRes = await API.get(`/doctor/my-patients`);
//            const currentAppt = rRes.data.data?.find(a => a.appointmentId === appointmentId);
//            if (currentAppt?.reason) setSymptoms(currentAppt.reason);
//         } catch (e) { console.log("Silent Reason Fetch Failed"); }

//       } catch (err) {
//         console.error("Fetch Error:", err);
//         toast.error("Patient context sync failed (404/500)", toastStyle);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchContext();
//   }, [id, appointmentId]);

//   // --- AI Analyze Function ---
//   const handleAIAnalyze = async () => {
//     if (!symptoms) return toast.warning("Please enter symptoms first!", toastStyle);
//     setAiLoading(true);
//     setDisplayText('');
//     const aiToastId = toast.loading("AI Engine analyzing clinical data...");
    
//     try {
//       // FIX: Ensure route is /ai/analyze
//       const res = await API.post('/ai/analyze', { 
//         patientId: id, 
//         symptoms, 
//         age: patient?.age, 
//         gender: patient?.gender 
//       });
      
//       const data = res.data?.data;
//       setClinicalData(data);

//       const medsText = data.medicines?.map((m, i) => 
//         `${i + 1}. ${m.name} (${m.dosage}) - ${m.duration}\n   Note: ${m.instruction}`
//       ).join('\n\n') || "No medications suggested.";

//       const fullReport = 
//         ` >>> DIAGNOSIS:\n${data.diagnosis.toUpperCase()}\n\n` +
//         `>>> RISK LEVEL: ${data.riskLevel}\n\n` +
//         `>>> AI SUMMARY:\n${data.aiSummary}\n\n` +
//         `>>> PRESCRIBED MEDICATIONS:\n${medsText}\n\n` + 
//         `>>> SUGGESTED TESTS: ${data.suggestedTests?.join(', ') || "None"}\n\n` +
//         `>>> DOCTOR ADVICE:\n${data.advice}`;

//       toast.dismiss(aiToastId);
//       startTypewriter(fullReport);
//       toast.success("AI Analysis Complete!", toastStyle);
//     } catch (err) {
//       setAiLoading(false);
//       toast.dismiss(aiToastId);
//       const errorMsg = err.response?.data?.message || "AI Connection Failed";
//       toast.error(errorMsg, toastStyle);
//     }
//   };

//   // --- Save to DB Function ---
//   const handlePrescribe = async (e) => {
//     e.preventDefault();
//     if (!clinicalData.diagnosis) return toast.error("No analysis to save!", toastStyle);
//     if (!appointmentId) return toast.error("Appointment ID missing!", toastStyle);

//     const saveToast = toast.loading("Saving to Cloud Records...");
//     try {
//       // FIX: MVC route prefix /api/doctor/add
//       await API.post('/doctor/add', { 
//         patientId: id, 
//         appointmentId: appointmentId, 
//         symptoms, 
//         ...clinicalData
//       });

//       toast.update(saveToast, { render: "Record Committed! 🚀", type: "success", isLoading: false, autoClose: 2000 });
//       setTimeout(() => navigate('/doctor-dashboard'), 2000);
//     } catch (err) {
//       toast.update(saveToast, { render: "Save Failed!", type: "error", isLoading: false, autoClose: 3000 });
//     }
//   };

//   // const downloadPDF = () => {
//   //   if (!clinicalData.diagnosis) return;
//   //   const pdf = new jsPDF('p', 'mm', 'a4');
//   //   pdf.setFontSize(18);
//   //   pdf.text("MEDICAL PRESCRIPTION", 20, 25);
//   //   pdf.setFontSize(12);
//   //   pdf.text(`Patient: ${patient?.name}`, 20, 40);
//   //   pdf.text(`Diagnosis: ${clinicalData.diagnosis}`, 20, 50);
//   //   pdf.save(`Prescription_${patient?.name}.pdf`);
//   // };

//    const downloadPDF = () => {
//     if (!clinicalData) return;
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pageWidth = pdf.internal.pageSize.getWidth();
    
//     pdf.setFillColor(79, 70, 229); 
//     pdf.rect(0, 0, pageWidth, 40, 'F');
//     pdf.setTextColor(255, 255, 255);
//     pdf.setFontSize(22);
//     pdf.setFont("helvetica", "bold");
//     pdf.text("CLINIC OS - MEDICAL REPORT", 20, 25);
    
//     pdf.setTextColor(40, 40, 40);
//     pdf.setFontSize(12);
//     pdf.text("PATIENT RECORD", 20, 55);
//     pdf.setFont("helvetica", "normal");
//     pdf.setFontSize(10);
//     pdf.text(`Name: ${patient?.name}`, 20, 65);
//     pdf.text(`Age/Gender: ${patient?.age}Y / ${patient?.gender}`, 20, 72);
//     pdf.text(`Status: Verified Record`, 20, 79);
//     pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 60, 65);

//     pdf.setDrawColor(200, 200, 200);
//     pdf.line(20, 85, pageWidth - 20, 85);

//     pdf.setFont("helvetica", "bold");
//     pdf.setFontSize(12);
//     pdf.text("DIAGNOSIS & CLINICAL FINDINGS:", 20, 100);
//     pdf.setFont("helvetica", "normal");
//     pdf.setFontSize(10);
//     const splitText = pdf.splitTextToSize(clinicalData, pageWidth - 40);
//     pdf.text(splitText, 20, 110);

//     pdf.setFontSize(8);
//     pdf.setTextColor(150, 150, 150);
//     pdf.text("This is an electronically generated report from Clinic OS Neural Link.", 20, pdf.internal.pageSize.getHeight() - 10);

//     pdf.save(`Prescription_${patient?.name.replace(/\s+/g, '_')}.pdf`);
//     toast.success("Professional PDF Generated!", toastStyle);
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-[#080b14] flex flex-col items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-500" size={48} />
//       <p className="mt-4 text-indigo-300 font-mono text-xs tracking-widest uppercase">Fetching Records...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] text-slate-700 dark:text-slate-300 p-4 lg:p-10">
//       <ToastContainer {...toastStyle} />
//       <div className="max-w-5xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="flex items-center gap-5">
//             <button onClick={() => navigate(-1)} className="h-11 w-11 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
//               <ChevronLeft size={20} />
//             </button>
//             <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
//               AI Prescription <span className="text-indigo-500 not-italic">Engine</span>
//             </h1>
//           </div>
//           <div className="flex bg-white dark:bg-[#0f172a]/80 border border-slate-200 dark:border-white/5 p-1.5 rounded-xl backdrop-blur-xl">
//             <div className="h-10 w-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-600"><User size={20} /></div>
//             <div className="px-4 py-0.5">
//               <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">{patient?.name}</p>
//               <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{patient?.age}Y • {patient?.gender}</p>
//             </div>
//           </div>
//         </div>

//         {/* Console */}
//         <div className="bg-white dark:bg-[#0f172a]/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-xl">
//           <div className="p-8 md:p-12 space-y-10">
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Activity size={14} className="text-indigo-500" />
//                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Clinical Input (Symptoms)</label>
//               </div>
//               <div className="flex gap-3">
//                 <div className="relative flex-1">
//                   <input 
//                     className="w-full p-5 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-indigo-500 text-slate-900 dark:text-white font-bold pl-12" 
//                     value={symptoms} 
//                     onChange={(e) => setSymptoms(e.target.value)} 
//                     placeholder="Enter symptoms..." 
//                   />
//                   <Database className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//                 </div>
//                 <button onClick={handleAIAnalyze} disabled={aiLoading} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2">
//                   {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Analyze
//                 </button>
//               </div>
//             </div>

//             <textarea 
//               className="w-full p-8 bg-slate-50 dark:bg-[#050505]/60 text-slate-800 dark:text-indigo-100 border border-slate-200 dark:border-white/5 rounded-[2rem] outline-none h-[350px] font-mono text-sm leading-relaxed shadow-inner resize-none" 
//               value={displayText} 
//               readOnly 
//               placeholder="Awaiting Neural Analysis..."
//             />

//             <div className="flex items-stretch gap-4">
//               <button onClick={handlePrescribe} disabled={!clinicalData.diagnosis || aiLoading} className="flex-1 py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-30 uppercase tracking-[0.2em]">
//                 <Save size={18} /> Commit & Sync Record
//               </button>
//               <button onClick={downloadPDF} disabled={!clinicalData.diagnosis} className="px-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white rounded-2xl"><Download size={20} className="text-indigo-500" /></button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }















// import { useEffect, useState, useCallback } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom'; // useLocation add kiya
// import API from '../util/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import jsPDF from 'jspdf';
// import { 
//   ChevronLeft, User, Activity, Database, 
//   Sparkles, Save, Download, Loader2 
// } from 'lucide-react';

// export default function Prescription() {
//   const { id } = useParams(); // Ye Patient ID hye (...f75)
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Dashboard se jo state pass ki thi wahan se appointmentId uthayenge
//   const appointmentId = location.state?.patient?.appointmentId;

//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [symptoms, setSymptoms] = useState(location.state?.patient?.reason || '');
//   const [aiLoading, setAiLoading] = useState(false);
//   const [displayText, setDisplayText] = useState('');

//   const [clinicalData, setClinicalData] = useState({
//     diagnosis: '',
//     riskLevel: 'Low',
//     aiSummary: '',
//     suggestedTests: [],
//     medicines: [],
//     advice: ''
//   });

//   const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const toastStyle = { theme: isDarkMode ? "dark" : "light", position: "top-right" };

//   // --- Typewriter Effect ---
//   const startTypewriter = useCallback((text) => {
//     let i = 0;
//     setDisplayText('');
//     const timer = setInterval(() => {
//       if (i < text.length) {
//         setDisplayText(prev => prev + text.charAt(i));
//         i++;
//       } else {
//         clearInterval(timer);
//         setAiLoading(false);
//       }
//     }, 5);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     const fetchContext = async () => {
//       // ID check: Agar ID 'undefined' string hye toh error handle karein
//       if (!id || id === 'undefined') {
//         toast.error("Invalid Patient ID Path", toastStyle);
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         console.log("Fetching context for Patient ID:", id);
        
//         // Backend MVC route fix
//         const pRes = await API.get(`/patients/${id}`); 
        
//         if (pRes.data.success) {
//           setPatient(pRes.data.data);
//         }
//       } catch (err) {
//         console.error("Fetch Context Error:", err.response || err);
//         toast.error(err.response?.data?.message || "Patient context sync failed", toastStyle);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchContext();
//   }, [id]);

//   // --- AI Analyze ---
//   const handleAIAnalyze = async () => {
//     if (!symptoms) return toast.warning("Please enter symptoms first!", toastStyle);
//     setAiLoading(true);
//     setDisplayText('');
//     const aiToastId = toast.loading("AI Engine analyzing clinical data...");
    
//     try {
//       // Ensure age/gender default values are sent if missing
//       const res = await API.post('/ai/analyze', { 
//         patientId: id, 
//         symptoms, 
//         age: patient?.age || 20, 
//         gender: patient?.gender || 'Not Specified'
//       });
      
//       const data = res.data?.data;
//       setClinicalData(data);

//       const medsText = data.medicines?.map((m, i) => 
//         `${i + 1}. ${m.name} (${m.dosage}) - ${m.duration}\n   Note: ${m.instruction}`
//       ).join('\n\n') || "No medications suggested.";

//       const fullReport = 
//         ` >>> DIAGNOSIS:\n${data.diagnosis.toUpperCase()}\n\n` +
//         `>>> RISK LEVEL: ${data.riskLevel}\n\n` +
//         `>>> AI SUMMARY:\n${data.aiSummary}\n\n` +
//         `>>> PRESCRIBED MEDICATIONS:\n${medsText}\n\n` + 
//         `>>> SUGGESTED TESTS: ${data.suggestedTests?.join(', ') || "None"}\n\n` +
//         `>>> DOCTOR ADVICE:\n${data.advice}`;

//       toast.dismiss(aiToastId);
//       startTypewriter(fullReport);
//       toast.success("AI Analysis Complete!", toastStyle);
//     } catch (err) {
//       setAiLoading(false);
//       toast.dismiss(aiToastId);
//       toast.error(err.response?.data?.message || "AI Connection Failed", toastStyle);
//     }
//   };

//   // --- Save to DB ---
//   const handlePrescribe = async (e) => {
//     e.preventDefault();
//     if (!clinicalData.diagnosis) return toast.error("No analysis to save!", toastStyle);
    
//     // Appointment ID check
//     const currentApptId = appointmentId || location.state?.patient?.appointmentId;
//     if (!currentApptId) return toast.error("Appointment ID not found in session!", toastStyle);

//     const saveToast = toast.loading("Saving to Cloud Records...");
//     try {
//       await API.post('/doctor/add', { 
//         patientId: id, 
//         appointmentId: currentApptId, 
//         symptoms, 
//         ...clinicalData
//       });

//       toast.update(saveToast, { render: "Record Committed! 🚀", type: "success", isLoading: false, autoClose: 2000 });
//       setTimeout(() => navigate('/dashboard'), 2000); // dashboard ka path confirm karein
//     } catch (err) {
//       console.error("Save Error:", err.response);
//       toast.update(saveToast, { render: err.response?.data?.message || "Save Failed!", type: "error", isLoading: false, autoClose: 3000 });
//     }
//   };

//   const downloadPDF = () => {
//     if (!clinicalData.diagnosis) return;
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pageWidth = pdf.internal.pageSize.getWidth();
    
//     pdf.setFillColor(79, 70, 229); 
//     pdf.rect(0, 0, pageWidth, 40, 'F');
//     pdf.setTextColor(255, 255, 255);
//     pdf.setFontSize(22);
//     pdf.setFont("helvetica", "bold");
//     pdf.text("CLINIC OS - MEDICAL REPORT", 20, 25);
    
//     pdf.setTextColor(40, 40, 40);
//     pdf.setFontSize(12);
//     pdf.text("PATIENT RECORD", 20, 55);
//     pdf.setFontSize(10);
//     pdf.text(`Name: ${patient?.name || 'Guest'}`, 20, 65);
//     pdf.text(`Age/Gender: ${patient?.age || 'N/A'}Y / ${patient?.gender || 'N/A'}`, 20, 72);
//     pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 60, 65);

//     pdf.line(20, 85, pageWidth - 20, 85);
//     pdf.setFontSize(12);
//     pdf.text("DIAGNOSIS:", 20, 100);
//     pdf.setFont("helvetica", "normal");
//     pdf.setFontSize(10);
//     const splitText = pdf.splitTextToSize(displayText, pageWidth - 40);
//     pdf.text(splitText, 20, 110);

//     pdf.save(`Prescription_${patient?.name || 'Patient'}.pdf`);
//     toast.success("Professional PDF Generated!", toastStyle);
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-[#080b14] flex flex-col items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-500" size={48} />
//       <p className="mt-4 text-indigo-300 font-mono text-xs tracking-widest uppercase tracking-tighter">Syncing Records...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] text-slate-700 dark:text-slate-300 p-4 lg:p-10">
//       <ToastContainer {...toastStyle} />
//       <div className="max-w-5xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="flex items-center gap-5">
//             <button onClick={() => navigate(-1)} className="h-11 w-11 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
//               <ChevronLeft size={20} />
//             </button>
//             <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
//               AI Prescription <span className="text-indigo-500 not-italic">Engine</span>
//             </h1>
//           </div>
//           <div className="flex bg-white dark:bg-[#0f172a]/80 border border-slate-200 dark:border-white/5 p-1.5 rounded-xl backdrop-blur-xl shadow-lg">
//             <div className="h-10 w-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-600"><User size={20} /></div>
//             <div className="px-4 py-0.5">
//               <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">{patient?.name || 'Loading...'}</p>
//               <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{patient?.age}Y • {patient?.gender}</p>
//             </div>
//           </div>
//         </div>

//         {/* Clinical Console */}
//         <div className="bg-white dark:bg-[#0f172a]/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all">
//           <div className="p-8 md:p-12 space-y-10">
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Activity size={14} className="text-indigo-500" />
//                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Clinical Input (Symptoms)</label>
//               </div>
//               <div className="flex gap-3">
//                 <div className="relative flex-1 group">
//                   <input 
//                     className="w-full p-5 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-indigo-500 text-slate-900 dark:text-white font-bold pl-12 transition-all" 
//                     value={symptoms} 
//                     onChange={(e) => setSymptoms(e.target.value)} 
//                     placeholder="Enter patient symptoms..." 
//                   />
//                   <Database className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
//                 </div>
//                 <button onClick={handleAIAnalyze} disabled={aiLoading} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all">
//                   {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Analyze
//                 </button>
//               </div>
//             </div>

//             <textarea 
//               className="w-full p-8 bg-slate-50 dark:bg-[#050505]/60 text-slate-800 dark:text-indigo-100 border border-slate-200 dark:border-white/5 rounded-[2rem] outline-none h-[350px] font-mono text-sm leading-relaxed shadow-inner resize-none scrollbar-hide" 
//               value={displayText} 
//               readOnly 
//               placeholder="Awaiting Neural Analysis... Check console if it hangs."
//             />

//             <div className="flex flex-col sm:flex-row items-stretch gap-4">
//               <button 
//                 onClick={handlePrescribe} 
//                 disabled={!clinicalData.diagnosis || aiLoading} 
//                 className="flex-1 py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-30 uppercase tracking-[0.2em] active:scale-[0.98]"
//               >
//                 <Save size={18} /> Commit & Sync Record
//               </button>
//               <button 
//                 onClick={downloadPDF} 
//                 disabled={!clinicalData.diagnosis} 
//                 className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-md"
//               >
//                 <Download size={20} className="text-indigo-500" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





































import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import API from '../util/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import { 
  ChevronLeft, User, Activity, Database, 
  Sparkles, Save, Download, Loader2 
} from 'lucide-react';

export default function Prescription() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  
  const appointmentId = location.state?.patient?.appointmentId;

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [symptoms, setSymptoms] = useState(location.state?.patient?.reason || '');
  const [aiLoading, setAiLoading] = useState(false);
  const [displayText, setDisplayText] = useState('');

  const [clinicalData, setClinicalData] = useState({
    diagnosis: '',
    riskLevel: 'Low',
    aiSummary: '',
    suggestedTests: [],
    medicines: [],
    advice: ''
  });

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const toastStyle = { theme: isDarkMode ? "dark" : "light", position: "top-right" };

  const startTypewriter = useCallback((text) => {
    let i = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        setAiLoading(false);
      }
    }, 5);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchContext = async () => {
      if (!id || id === 'undefined') {
        toast.error("Invalid Patient ID Path", toastStyle);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const pRes = await API.get(`/patients/${id}`); 
        
        if (pRes.data.success) {
          setPatient(pRes.data.data);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Patient context sync failed", toastStyle);
      } finally {
        setLoading(false);
      }
    };
    fetchContext();
  }, [id]);

  const handleAIAnalyze = async () => {
    if (!symptoms) return toast.warning("Please enter symptoms first!", toastStyle);
    setAiLoading(true);
    setDisplayText('');
    const aiToastId = toast.loading("AI Engine analyzing clinical data...");
    
    try {
      const res = await API.post('/ai/analyze', { 
        patientId: id, 
        symptoms, 
        age: patient?.age || 20, 
        gender: patient?.gender || 'Not Specified'
      });
      
      const data = res.data?.data;
      setClinicalData(data);

      const medsText = data.medicines?.map((m, i) => 
        `${i + 1}. ${m.name} (${m.dosage}) - ${m.duration}\n   Note: ${m.instruction}`
      ).join('\n\n') || "No medications suggested.";

      const fullReport = 
        ` >>> DIAGNOSIS:\n${data.diagnosis.toUpperCase()}\n\n` +
        `>>> RISK LEVEL: ${data.riskLevel}\n\n` +
        `>>> AI SUMMARY:\n${data.aiSummary}\n\n` +
        `>>> PRESCRIBED MEDICATIONS:\n${medsText}\n\n` + 
        `>>> SUGGESTED TESTS: ${data.suggestedTests?.join(', ') || "None"}\n\n` +
        `>>> DOCTOR ADVICE:\n${data.advice}`;

      toast.dismiss(aiToastId);
      startTypewriter(fullReport);
      toast.success("AI Analysis Complete!", toastStyle);
    } catch (err) {
      setAiLoading(false);
      toast.dismiss(aiToastId);
      toast.error(err.response?.data?.message || "AI Connection Failed", toastStyle);
    }
  };

  const handlePrescribe = async (e) => {
    e.preventDefault();
    if (!clinicalData.diagnosis) return toast.error("No analysis to save!", toastStyle);
    
    const currentApptId = appointmentId || location.state?.patient?.appointmentId;
    if (!currentApptId) return toast.error("Appointment ID not found in session!", toastStyle);

    const saveToast = toast.loading("Saving to Cloud Records...");
    try {
      await API.post('/doctor/add', { 
        patientId: id, 
        appointmentId: currentApptId, 
        symptoms, 
        ...clinicalData
      });

      toast.update(saveToast, { render: "Record Committed! 🚀", type: "success", isLoading: false, autoClose: 2000 });
      setTimeout(() => navigate('/dashboard'), 2000); 
    } catch (err) {
      toast.update(saveToast, { render: err.response?.data?.message || "Save Failed!", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const downloadPDF = () => {
    if (!clinicalData.diagnosis) return;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    pdf.setFillColor(79, 70, 229); 
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.setFont("helvetica", "bold");
    pdf.text("CLINIC OS - MEDICAL REPORT", 20, 25);
    
    pdf.setTextColor(40, 40, 40);
    pdf.setFontSize(12);
    pdf.text("PATIENT RECORD", 20, 55);
    pdf.setFontSize(10);
    pdf.text(`Name: ${patient?.name || 'Guest'}`, 20, 65);
    pdf.text(`Age/Gender: ${patient?.age || 'N/A'}Y / ${patient?.gender || 'N/A'}`, 20, 72);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 60, 65);

    pdf.line(20, 85, pageWidth - 20, 85);
    pdf.setFontSize(12);
    pdf.text("DIAGNOSIS:", 20, 100);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    const splitText = pdf.splitTextToSize(displayText, pageWidth - 40);
    pdf.text(splitText, 20, 110);

    pdf.save(`Prescription_${patient?.name || 'Patient'}.pdf`);
    toast.success("Professional PDF Generated!", toastStyle);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#080b14] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-indigo-500" size={48} />
      <p className="mt-4 text-indigo-300 font-mono text-xs tracking-widest uppercase">Syncing Records...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080b14] text-slate-700 dark:text-slate-300 p-4 lg:p-10">
      <ToastContainer {...toastStyle} />
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <button onClick={() => navigate(-1)} className="h-11 w-11 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm cursor-pointer">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
              AI Prescription <span className="text-indigo-500 not-italic">Engine</span>
            </h1>
          </div>
          <div className="flex bg-white dark:bg-[#0f172a]/80 border border-slate-200 dark:border-white/5 p-1.5 rounded-xl backdrop-blur-xl shadow-lg">
            <div className="h-10 w-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-600"><User size={20} /></div>
            <div className="px-4 py-0.5">
              <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">{patient?.name || 'Loading...'}</p>
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{patient?.age}Y • {patient?.gender}</p>
            </div>
          </div>
        </div>

        {/* Clinical Console */}
        <div className="bg-white dark:bg-[#0f172a]/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all">
          <div className="p-8 md:p-12 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-indigo-500" />
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Clinical Input (Symptoms)</label>
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1 group">
                  <input 
                    className="w-full p-5 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-indigo-500 text-slate-900 dark:text-white font-bold pl-12 transition-all" 
                    value={symptoms} 
                    onChange={(e) => setSymptoms(e.target.value)} 
                    placeholder="Enter patient symptoms..." 
                  />
                  <Database className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                </div>
                <button onClick={handleAIAnalyze} disabled={aiLoading} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer">
                  {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Analyze
                </button>
              </div>
            </div>

            <textarea 
              className="w-full p-8 bg-slate-50 dark:bg-[#050505]/60 text-slate-800 dark:text-indigo-100 border border-slate-200 dark:border-white/5 rounded-[2rem] outline-none h-[350px] font-mono text-sm leading-relaxed shadow-inner resize-none scrollbar-hide" 
              value={displayText} 
              readOnly 
              placeholder="Awaiting Neural Analysis..."
            />

            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <button 
                onClick={handlePrescribe} 
                disabled={!clinicalData.diagnosis || aiLoading} 
                className={`flex-1 py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] active:scale-[0.98] 
                  ${(!clinicalData.diagnosis || aiLoading) ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <Save size={18} /> Commit & Sync Record
              </button>
              <button 
                onClick={downloadPDF} 
                disabled={!clinicalData.diagnosis} 
                className={`px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-md
                  ${!clinicalData.diagnosis ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <Download size={20} className="text-indigo-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}