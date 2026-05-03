
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
