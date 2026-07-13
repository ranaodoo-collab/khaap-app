import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  QrCode, 
  MapPin, 
  User, 
  CheckCircle, 
  TrendingUp, 
  AlertTriangle, 
  Star, 
  RefreshCw, 
  Sliders, 
  Database, 
  Smartphone, 
  Plus, 
  Trash2, 
  FileText, 
  PhoneCall, 
  Check, 
  X,
  Navigation,
  Award,
  Clock,
  DollarSign,
  Sun,
  Moon,
  Info,
  Upload,
  Paperclip,
  Eye,
  FileDown,
  ArrowRight,
  Lock,
  ExternalLink,
  ShieldAlert,
  LogOut,
  Users
} from 'lucide-react';

const INITIAL_DRIVERS = [
  {
    id: "driver-rahman",
    phone: "+880 1712-345678",
    name: "Rahman Al-Hasan",
    role: "driver",
    vehicleType: "cng",
    licensePlate: "DHAKA METRO-G-11-2233",
    nid: "19942615273849501",
    kycVerified: true,
    qrCode: "KHAAP_DRV_driver-rahman",
    rating: 4.8,
    tripsCount: 142
  },
  {
    id: "driver-iqbal",
    phone: "+880 1819-987654",
    name: "Iqbal Hossain",
    role: "driver",
    vehicleType: "bike",
    licensePlate: "DHAKA METRO-H-44-5566",
    nid: "19892615273849222",
    kycVerified: true,
    qrCode: "KHAAP_DRV_driver-iqbal",
    rating: 4.9,
    tripsCount: 389
  }
];

const INITIAL_PASSENGERS = [
  {
    id: "customer-rifat",
    phone: "+880 1515-223344",
    name: "Rifat Ahmed",
    role: "customer",
    nid: "20012615273849503",
    kycVerified: true
  },
  {
    id: "customer-orpu",
    phone: "+880 1616-778899",
    name: "Orpu Rahman",
    role: "customer",
    nid: "",
    kycVerified: false
  }
];

export default function App() {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [viewState, setViewState] = useState('landing'); // 'landing' | 'auth' | 'app'
  const [activeTab, setActiveTab] = useState('split'); // 'split' | 'passenger' | 'driver' | 'admin'
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Auth Form State
  const [authRole, setAuthRole] = useState('customer'); // 'customer' | 'driver' | 'admin'
  const [authPhone, setAuthPhone] = useState('');
  const [authOtp, setAuthOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [authName, setAuthName] = useState('');
  
  // Driver specific sign-up fields
  const [authVehicle, setAuthVehicle] = useState('cng');
  const [authPlate, setAuthPlate] = useState('');
  const [authNid, setAuthNid] = useState('');

  const [contracts, setContracts] = useState([
    {
      id: "KHP-78921",
      customerId: "customer-rifat",
      customerName: "Rifat Ahmed",
      customerPhone: "+880 1515-223344",
      driverId: "driver-rahman",
      driverName: "Rahman Al-Hasan",
      driverPlate: "DHAKA METRO-G-11-2233",
      driverPhone: "+880 1712-345678",
      startPoint: "Farmgate Intersection, Dhaka",
      endPoint: "Gulshan-2 Circle, Dhaka",
      midPoints: [
        { id: 1, text: "Drop document at Mohakhali Flyover" }
      ],
      agreedFare: 350,
      status: "completed",
      timestampStart: "2026-07-13T10:15:00Z",
      timestampEnd: "2026-07-13T10:45:00Z",
      rating: 5,
      feedback: "Driver took the exact route we locked in. Highly secure!"
    }
  ]);

  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [passengers, setPassengers] = useState(INITIAL_PASSENGERS);
  
  // Simulated Current Session States for both devices inside sandbox
  const [currentPassengerId, setCurrentPassengerId] = useState("customer-orpu");
  const [currentDriverId, setCurrentDriverId] = useState("driver-rahman");
  
  // Admin and System states
  const [kycPendingApplications, setKycPendingApplications] = useState([
    {
      id: "kyc-app-3",
      name: "Sajib Sen",
      phone: "+880 1912-778899",
      role: "driver",
      vehicleType: "cng",
      licensePlate: "DHAKA METRO-G-99-8877",
      docType: "National ID (NID)",
      nid: "19922615273849111",
      licenseUploaded: "DL-9823192-BD",
      attachment: {
        name: "nid_sajib_scanned.jpg",
        size: "342 KB",
        type: "image/jpeg",
        dataUrl: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=400"
      },
      submittedAt: "2026-07-13T14:30:00Z"
    }
  ]);

  // Activity stream logs
  const [systemLogs, setSystemLogs] = useState([
    { id: 1, text: "Digital Contract KHP-78921 successfully written to secure ledger.", type: "success", time: "10:45 AM" },
    { id: 2, text: "Driver Rahman Al-Hasan KYC successfully verified by administrator.", type: "info", time: "09:00 AM" }
  ]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const triggerNotification = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage(null);
    }, 4000);
  };

  const addLog = (text, type = "info") => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSystemLogs(prev => [{ id: Date.now(), text, type, time }, ...prev]);
  };

  const handleInitiateAuth = (role) => {
    setAuthRole(role);
    setAuthPhone('');
    setAuthOtp('');
    setOtpSent(false);
    setOtpInput('');
    setAuthName('');
    setAuthPlate('');
    setAuthNid('');
    setViewState('auth');
  };

  const sendMockOtp = () => {
    if (!authPhone.trim()) {
      triggerNotification("Please enter a valid phone number signature.");
      return;
    }
    const mockOtpCode = Math.floor(1000 + Math.random() * 9000).toString();
    setAuthOtp(mockOtpCode);
    setOtpSent(true);
    addLog(`System dispatched verification code to ${authPhone}. Mock Code generated: ${mockOtpCode}`, "info");
    triggerNotification(`Simulated SMS Sent! Your verify code is: ${mockOtpCode}`);
  };

  const verifyAndLogin = () => {
    if (otpInput !== authOtp && otpInput !== "1234") {
      triggerNotification("Invalid Verification Code. Use the generated code shown in the green notification banner.");
      return;
    }

    if (authRole === 'admin') {
      addLog("Administrator session established securely.", "success");
      setActiveTab('admin');
      setViewState('app');
      return;
    }

    // Check if user already exists
    if (authRole === 'customer') {
      const existing = passengers.find(p => p.phone === authPhone);
      if (existing) {
        setCurrentPassengerId(existing.id);
        addLog(`Verified passenger ${existing.name} logged in.`, "success");
      } else {
        // Sign-up process
        if (!authName.trim()) {
          triggerNotification("Please fill in your legal full name for KYC setup.");
          return;
        }
        const newCustomer = {
          id: `customer-${Date.now()}`,
          phone: authPhone,
          name: authName,
          role: "customer",
          nid: "",
          kycVerified: false
        };
        setPassengers(prev => [...prev, newCustomer]);
        setCurrentPassengerId(newCustomer.id);
        addLog(`Registered new customer profile for ${authName}. Initial status: KYC Required.`, "info");
      }
      setActiveTab('passenger');
    } else if (authRole === 'driver') {
      const existing = drivers.find(d => d.phone === authPhone);
      if (existing) {
        setCurrentDriverId(existing.id);
        addLog(`Verified driver ${existing.name} logged in.`, "success");
      } else {
        // Sign-up process
        if (!authName.trim() || !authPlate.trim() || !authNid.trim()) {
          triggerNotification("Please fill out your name, NID, and license plate parameters.");
          return;
        }
        const newDriver = {
          id: `driver-${Date.now()}`,
          phone: authPhone,
          name: authName,
          role: "driver",
          vehicleType: authVehicle,
          licensePlate: authPlate.toUpperCase(),
          nid: authNid,
          kycVerified: false,
          qrCode: `KHAAP_DRV_driver-${authName.toLowerCase().replace(/\s+/g, '-')}`,
          rating: 5.0,
          tripsCount: 0
        };
        setDrivers(prev => [...prev, newDriver]);
        setCurrentDriverId(newDriver.id);
        addLog(`Registered new driver profile for ${authName} with vehicle ${authPlate}. Initial status: KYC Required.`, "info");
      }
      setActiveTab('driver');
    }

    setViewState('app');
  };

  const handleInitiateContract = (passengerId, driverId, start, end, midPoints) => {
    const p = passengers.find(x => x.id === passengerId);
    const d = drivers.find(x => x.id === driverId);
    
    if (!p || !d) return null;

    if (!p.kycVerified) {
      triggerNotification("Your account lacks mandatory KYC Verification. Please upload identity documents first.");
      return null;
    }

    const newContract = {
      id: `KHP-${Math.floor(10000 + Math.random() * 90000)}`,
      customerId: p.id,
      customerName: p.name,
      customerPhone: p.phone,
      driverId: d.id,
      driverName: d.name,
      driverPlate: d.licensePlate,
      driverPhone: d.phone,
      startPoint: start,
      endPoint: end,
      midPoints: midPoints,
      agreedFare: null, 
      status: "pending",
      timestampStart: null,
      timestampEnd: null
    };

    setContracts(prev => [newContract, ...prev]);
    addLog(`New Contract draft (${newContract.id}) generated via scanned QR from ${p.name} to Driver ${d.name}.`, "info");
    return newContract.id;
  };

  const handleProposeFare = (contractId, fare) => {
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        addLog(`Driver proposed fare of ৳${fare} for contract ${contractId}.`, "info");
        return { ...c, agreedFare: Number(fare) };
      }
      return c;
    }));
  };

  const handleConfirmContract = (contractId) => {
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        addLog(`Contract ${contractId} is digitally locked & signed! Status active.`, "success");
        return { ...c, status: "active", timestampStart: new Date().toISOString() };
      }
      return c;
    }));
  };

  const handleEndTrip = (contractId) => {
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        addLog(`Trip ${contractId} marked as completed by the driver.`, "info");
        return { ...c, status: "completed", timestampEnd: new Date().toISOString() };
      }
      return c;
    }));
  };

  const handleRateTrip = (contractId, rating, feedback) => {
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        addLog(`Passenger rated trip ${contractId}: ${rating} stars. Log sealed.`, "success");
        return { ...c, rating, feedback };
      }
      return c;
    }));
  };

  const handleApproveKYC = (appId) => {
    const app = kycPendingApplications.find(x => x.id === appId);
    if (!app) return;

    if (app.role === 'driver') {
      const existingDriver = drivers.find(d => d.phone === app.phone);
      if (existingDriver) {
        setDrivers(prev => prev.map(d => d.phone === app.phone ? { ...d, kycVerified: true, nid: app.nid, licensePlate: app.licensePlate, vehicleType: app.vehicleType } : d));
      } else {
        const newDriver = {
          id: `driver-${Math.floor(1000 + Math.random() * 9000)}`,
          phone: app.phone,
          name: app.name,
          role: "driver",
          vehicleType: app.vehicleType,
          licensePlate: app.licensePlate,
          nid: app.nid,
          kycVerified: true,
          qrCode: `KHAAP_DRV_driver-${app.name.toLowerCase().replace(/\s+/g, '-')}`,
          rating: 5.0,
          tripsCount: 0
        };
        setDrivers(prev => [...prev, newDriver]);
      }
      addLog(`Approved Driver Profile: ${app.name} (${app.licensePlate})`, "success");
    } else {
      const existingPassenger = passengers.find(p => p.phone === app.phone);
      if (existingPassenger) {
        setPassengers(prev => prev.map(p => p.phone === app.phone ? { ...p, kycVerified: true, nid: app.nid } : p));
      } else {
        const newPassenger = {
          id: `customer-${Math.floor(1000 + Math.random() * 9000)}`,
          phone: app.phone,
          name: app.name,
          role: "customer",
          nid: app.nid,
          kycVerified: true
        };
        setPassengers(prev => [...prev, newPassenger]);
      }
      addLog(`Approved Passenger Profile: ${app.name}`, "success");
    }

    setKycPendingApplications(prev => prev.filter(x => x.id !== appId));
  };

  const handleRejectKYC = (appId) => {
    const app = kycPendingApplications.find(x => x.id === appId);
    setKycPendingApplications(prev => prev.filter(x => x.id !== appId));
    addLog(`Rejected KYC Application for: ${app?.name || appId}`, "error");
  };

  const wrapperClass = theme === 'dark' 
    ? "min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 font-sans" 
    : "min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 font-sans";

  const cardClass = theme === 'dark' 
    ? "bg-slate-900 border border-slate-800 transition-colors duration-300" 
    : "bg-white border border-slate-200 shadow-sm transition-colors duration-300";

  const textMutedClass = theme === 'dark' ? "text-slate-400" : "text-slate-600";
  const borderClass = theme === 'dark' ? "border-slate-800" : "border-slate-200";

  return (
    <div className={wrapperClass}>
      
      {/* Realtime Alert Overlay */}
      {errorMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce font-medium text-sm">
          <Shield className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* RENDER VIEWSTATE: LANDING PAGE */}
      {viewState === 'landing' && (
        <div className="min-h-screen flex flex-col justify-between">
          {/* Header */}
          <nav className={`border-b py-4 px-6 flex justify-between items-center ${theme === 'dark' ? 'border-slate-900 bg-slate-950' : 'border-slate-200 bg-white'}`}>
            <div className="flex items-center gap-2.5">
              <div className="bg-emerald-500 p-2 rounded-xl text-slate-950 shadow-md shadow-emerald-500/20">
                <Shield className="w-5.5 h-5.5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-black text-xl tracking-wider text-emerald-500">KHAAP</span>
                <span className="text-[9px] font-mono block tracking-widest text-slate-400 uppercase">Street Trust System</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Creator Credit Badge */}
              <a 
                href="https://www.linkedin.com/in/ranamorjal/" 
                target="_blank" 
                rel="noreferrer" 
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold bg-emerald-500/5 hover:bg-emerald-500/15 border-emerald-500/20 text-emerald-400 transition-all"
              >
                <span>Created by Rana Morjal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-lg border transition-all ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-100 border-slate-300 text-indigo-600'
                }`}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold font-mono uppercase tracking-wide">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Phase 1 Web App Live Ready</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                Formalizing <span className="text-emerald-500">Street-Hailed</span> Journeys.
              </h1>
              
              <p className={`text-md md:text-lg leading-relaxed max-w-2xl ${textMutedClass}`}>
                Un-metered street transit (CNGs, local bikes) relies entirely on verbal contracts. 
                <strong> Khaap</strong> eliminates disputes and creates safety anchors. Scan, establish mutually binding routes, lock the legal fare, and travel with trust.
              </p>

              {/* Creator Credit Mobile Badge */}
              <div className="md:hidden">
                <a 
                  href="https://www.linkedin.com/in/ranamorjal/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                >
                  <span>Created by Rana Morjal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* High-Level Features list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex gap-3 items-start">
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg mt-0.5"><Check className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-sm font-bold">Dynamic QR Generation</h4>
                    <p className={`text-xs ${textMutedClass}`}>Tied uniquely to verified vehicles & licenses.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg mt-0.5"><Check className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-sm font-bold">Immutable Audit Logs</h4>
                    <p className={`text-xs ${textMutedClass}`}>Completed contract hashes are unmodifiable.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg mt-0.5"><Check className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-sm font-bold">Manual Milestones</h4>
                    <p className={`text-xs ${textMutedClass}`}>No background GPS drains; quick checkpoints.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg mt-0.5"><Check className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-sm font-bold">Instant SMS & Web OTP</h4>
                    <p className={`text-xs ${textMutedClass}`}>Fast secure registration for emerging markets.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Portal Action Panel */}
            <div className="lg:col-span-5">
              <div className={`p-6 rounded-3xl border space-y-5 ${cardClass}`}>
                <div className="text-center pb-2 border-b border-dashed border-slate-800">
                  <h3 className="text-lg font-black tracking-wide uppercase">Interactive Portal Access</h3>
                  <p className={`text-xs ${textMutedClass}`}>Choose your session to run standard operations</p>
                </div>

                <div className="space-y-2.5">
                  <button 
                    onClick={() => handleInitiateAuth('customer')}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all hover:translate-x-1 hover:border-emerald-500/40 ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl"><User className="w-5 h-5" /></div>
                      <div>
                        <p className="text-sm font-bold">Commuter (Passenger)</p>
                        <p className="text-[10px] text-slate-500">Scan codes, set route plan, and confirm fares.</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-500" />
                  </button>

                  <button 
                    onClick={() => handleInitiateAuth('driver')}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all hover:translate-x-1 hover:border-blue-500/40 ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl"><QrCode className="w-5 h-5" /></div>
                      <div>
                        <p className="text-sm font-bold">CNG / Bike Driver</p>
                        <p className="text-[10px] text-slate-500">Configure sticker QR, propose quotes, end trips.</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-500" />
                  </button>

                  <button 
                    onClick={() => handleInitiateAuth('admin')}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all hover:translate-x-1 hover:border-rose-500/40 ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl"><Database className="w-5 h-5" /></div>
                      <div>
                        <p className="text-sm font-bold">System Administrator</p>
                        <p className="text-[10px] text-slate-500">Audit transit hashes, inspect & verify NID uploads.</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-rose-500" />
                  </button>

                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        setActiveTab('split');
                        setViewState('app');
                        addLog("Initialized developer simulation workspace side-by-side.", "success");
                      }}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/10"
                    >
                      <Sliders className="w-4 h-4" />
                      <span>Developer Simulator Sandbox</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Landing Footer */}
          <footer className={`border-t py-6 px-6 text-center text-xs transition-colors duration-300 ${
            theme === 'dark' ? 'border-slate-900 bg-slate-950 text-slate-500' : 'border-slate-200 bg-slate-100 text-slate-600'
          }`}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p>⚖️ Built to conform with regional street-hail digital agreement policies. All parameters securely sealed.</p>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-emerald-500">Creator:</span>
                <a 
                  href="https://www.linkedin.com/in/ranamorjal/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:underline flex items-center gap-1 text-slate-300 font-bold hover:text-emerald-400"
                >
                  Rana Morjal <ExternalLink className="w-3 h-3 inline" />
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* RENDER VIEWSTATE: PHONE & OTP AUTH WORKFLOW */}
      {viewState === 'auth' && (
        <div className="min-h-screen flex flex-col justify-between">
          <nav className={`border-b py-4 px-6 flex justify-between items-center ${theme === 'dark' ? 'border-slate-900 bg-slate-950' : 'border-slate-200 bg-white'}`}>
            <button 
              onClick={() => setViewState('landing')}
              className="text-xs font-bold hover:text-emerald-500 flex items-center gap-1"
            >
              ← Back to Home
            </button>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-500">Secure OTP Auth Gate</span>
            <span></span>
          </nav>

          <main className="max-w-md w-full mx-auto p-6 flex-1 flex flex-col justify-center">
            <div className={`p-6 rounded-3xl border space-y-5 ${cardClass}`}>
              <div className="text-center space-y-2">
                <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
                  authRole === 'customer' ? 'bg-emerald-500/10 text-emerald-500' :
                  authRole === 'driver' ? 'bg-blue-500/10 text-blue-500' : 'bg-rose-500/10 text-rose-500'
                }`}>
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black uppercase">
                  Verify {authRole === 'customer' ? 'Commuter' : authRole === 'driver' ? 'Driver' : 'Admin'} Identity
                </h3>
                <p className={`text-xs ${textMutedClass}`}>Enter registered phone signature. We will issue a mock system challenge code.</p>
              </div>

              {!otpSent ? (
                <div className="space-y-4">
                  {authRole === 'admin' ? (
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Access PIN Code</label>
                      <input 
                        type="password" 
                        value={authPhone}
                        onChange={(e) => setAuthPhone(e.target.value)}
                        placeholder="Enter Admin Auth PIN"
                        className={`w-full border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-rose-500 ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                      <button 
                        onClick={() => {
                          if (authPhone === "admin" || authPhone === "1234") {
                            addLog("Admin login verified via key PIN.", "success");
                            setActiveTab('admin');
                            setViewState('app');
                          } else {
                            triggerNotification("Incorrect admin credential. Try entering '1234' for simulator bypass.");
                          }
                        }}
                        className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl text-xs uppercase"
                      >
                        Verify Admin Console Key
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase font-mono text-slate-500 tracking-wider block mb-1">Phone Signature Signature</label>
                        <input 
                          type="tel" 
                          value={authPhone}
                          onChange={(e) => setAuthPhone(e.target.value)}
                          placeholder="e.g. +880 1700-112233"
                          className={`w-full border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                            theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <button 
                        onClick={sendMockOtp}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
                      >
                        Request Mobile OTP Signature
                      </button>

                      <div className={`p-3.5 rounded-xl border border-dashed text-[11px] ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-850 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}>
                        💡 <strong>Simulating Account Actions:</strong> If the phone profile is not found in database, we automatically transition you to registration signup!
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Signup inputs if user profile is new */}
                  {((authRole === 'customer' && !passengers.some(p => p.phone === authPhone)) ||
                    (authRole === 'driver' && !drivers.some(d => d.phone === authPhone))) && (
                    <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
                      <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest block">New Member Profile Setup</span>
                      
                      <div>
                        <label className="text-[9px] text-slate-400 block font-semibold mb-0.5">Legal Full Name</label>
                        <input 
                          type="text" 
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          placeholder="Enter legal name"
                          className={`w-full border rounded-lg px-2.5 py-1.5 text-xs ${
                            theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      {authRole === 'driver' && (
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] text-slate-400 block font-semibold mb-0.5">Vehicle Type</label>
                            <select 
                              value={authVehicle}
                              onChange={(e) => setAuthVehicle(e.target.value)}
                              className={`w-full border rounded-lg px-2 py-1.5 text-xs ${
                                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            >
                              <option value="cng">CNG (3W)</option>
                              <option value="bike">Motorcycle</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[9px] text-slate-400 block font-semibold mb-0.5">License Plate</label>
                            <input 
                              type="text" 
                              value={authPlate}
                              onChange={(e) => setAuthPlate(e.target.value)}
                              placeholder="DHAKA METRO-G-XX"
                              className={`w-full border rounded-lg px-2.5 py-1.5 text-xs ${
                                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="text-[9px] text-slate-400 block font-semibold mb-0.5">National ID (NID)</label>
                            <input 
                              type="text" 
                              value={authNid}
                              onChange={(e) => setAuthNid(e.target.value)}
                              placeholder="Enter NID Number"
                              className={`w-full border rounded-lg px-2.5 py-1.5 text-xs ${
                                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] uppercase font-mono text-slate-500 tracking-wider block mb-1">Enter 4-Digit Verification Code</label>
                    <input 
                      type="text" 
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="e.g. 1234"
                      maxLength={4}
                      className={`w-full border rounded-xl px-3 py-2.5 text-center tracking-widest text-lg font-bold focus:outline-none focus:border-emerald-500 ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <button 
                    onClick={verifyAndLogin}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
                  >
                    Verify & Authenticate Profile
                  </button>

                  <div className="text-center">
                    <button 
                      onClick={() => setOtpSent(false)}
                      className="text-xs text-slate-500 hover:text-emerald-500 underline"
                    >
                      Resend Challenge SMS
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>

          <footer className="py-4 text-center text-slate-500 text-xs">
            Rana Morjal Credits: <a href="https://www.linkedin.com/in/ranamorjal/" target="_blank" rel="noreferrer" className="text-emerald-500 hover:underline">LinkedIn Portal Profile</a>
          </footer>
        </div>
      )}

      {/* RENDER VIEWSTATE: ACTIVE SIMULATION WORKSPACE */}
      {viewState === 'app' && (
        <>
          {/* Top Main Navigation Header */}
          <header className={`border-b sticky top-0 z-50 px-4 py-3 backdrop-blur transition-colors duration-300 ${
            theme === 'dark' ? 'border-slate-900 bg-slate-950/85' : 'border-slate-200 bg-white/85'
          }`}>
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500 p-2 rounded-xl text-slate-950 shadow-lg shadow-emerald-500/20">
                  <Shield className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-black text-2xl tracking-wider text-emerald-500">KHAAP</span>
                  <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full uppercase font-mono border ${
                    theme === 'dark' ? 'bg-slate-900 text-slate-400 border-slate-850' : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}>
                    MVP Protocol Simulator
                  </span>
                </div>
              </div>

              {/* Controls: Theme & Mode Selectors */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Back to Home / Logout */}
                <button 
                  onClick={() => {
                    setViewState('landing');
                    addLog("Returned to home portal.");
                  }}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-1 text-xs font-bold transition-all ${
                    theme === 'dark' 
                      ? 'bg-slate-900 border-slate-800 text-rose-400 hover:bg-slate-800' 
                      : 'bg-white border-slate-300 text-rose-600 hover:bg-slate-100 shadow-sm'
                  }`}
                  title="Logout Session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit Session</span>
                </button>

                {/* Theme Toggle Button */}
                <button 
                  onClick={toggleTheme}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
                    theme === 'dark' 
                      ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                      : 'bg-white border-slate-300 text-indigo-600 hover:bg-slate-100 shadow-sm'
                  }`}
                  title={theme === 'dark' ? "Switch to Light Theme" : "Switch to Dark Theme"}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                {/* Navigation Controls for testing viewports */}
                <div className={`flex items-center gap-1 p-1 rounded-xl border ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'
                }`}>
                  <button 
                    onClick={() => setActiveTab('split')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'split' 
                        ? 'bg-emerald-500 text-slate-950 shadow-md' 
                        : (theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950')
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Split View</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('passenger')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'passenger' 
                        ? 'bg-emerald-500 text-slate-950 shadow-md' 
                        : (theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950')
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Passenger App</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('driver')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'driver' 
                        ? 'bg-emerald-500 text-slate-950 shadow-md' 
                        : (theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950')
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Driver App</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('admin')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'admin' 
                        ? 'bg-emerald-500 text-slate-950 shadow-md' 
                        : (theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950')
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Admin Desk</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Body */}
          <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-fade-in">
            
            {/* Quick Simulator Notification Helpers at top */}
            <div className={`p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border ${cardClass}`}>
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Ready to run full lifecycle testing?</p>
                  <p className={`text-xs ${textMutedClass}`}>Below is an interconnected mock environment. Select <strong>Orpu Rahman</strong> to test unverified Passenger KYC attachments!</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-mono ${textMutedClass}`}>Active Users:</span>
                <select 
                  value={currentPassengerId} 
                  onChange={(e) => {
                    setCurrentPassengerId(e.target.value);
                    const sel = passengers.find(p => p.id === e.target.value);
                    addLog(`Switched active simulator passenger session to: ${sel?.name}`);
                  }}
                  className={`border rounded-lg text-xs px-2.5 py-1.5 focus:border-emerald-500 focus:outline-none ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  {passengers.map(p => (
                    <option key={p.id} value={p.id}>
                      Passenger: {p.name} {!p.kycVerified && '⚠️ (KYC Pending)'}
                    </option>
                  ))}
                </select>
                <select 
                  value={currentDriverId} 
                  onChange={(e) => {
                    setCurrentDriverId(e.target.value);
                    const sel = drivers.find(d => d.id === e.target.value);
                    addLog(`Switched active simulator driver session to: ${sel?.name}`);
                  }}
                  className={`border rounded-lg text-xs px-2.5 py-1.5 focus:border-emerald-500 focus:outline-none ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  {drivers.map(d => <option key={d.id} value={d.id}>Driver: {d.name} {!d.kycVerified && '⚠️'}</option>)}
                </select>
              </div>
            </div>

            {/* View Grid Switcher */}
            {activeTab === 'split' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Passenger Phone Frame */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <span className={`text-xs font-mono mb-2 uppercase tracking-widest flex items-center gap-1.5 ${textMutedClass}`}>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Passenger Device
                  </span>
                  <div className={`w-full max-w-[420px] h-[780px] border-4 rounded-[40px] relative overflow-hidden flex flex-col ${
                    theme === 'dark' ? 'border-slate-800 bg-slate-950 shadow-2xl' : 'border-slate-300 bg-white shadow-2xl'
                  }`}>
                    <PassengerApp 
                      passenger={passengers.find(p => p.id === currentPassengerId)}
                      drivers={drivers}
                      contracts={contracts}
                      onInitiate={handleInitiateContract}
                      onConfirm={handleConfirmContract}
                      onRate={handleRateTrip}
                      addLog={addLog}
                      theme={theme}
                      triggerNotification={triggerNotification}
                      kycPendingApplications={kycPendingApplications}
                      setKycPendingApplications={setKycPendingApplications}
                    />
                  </div>
                </div>

                {/* Live Synchronizer Info Space / Middle Actions */}
                <div className="lg:col-span-2 space-y-4 py-8">
                  <div className={`border p-4 rounded-2xl text-center ${cardClass}`}>
                    <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest block mb-2">Sync Engine</span>
                    <div className="flex justify-center mb-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full"></div>
                        <div className={`relative w-12 h-12 rounded-full border flex items-center justify-center text-emerald-500 ${borderClass}`}>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs font-semibold">Live WebSockets</p>
                    <p className={`text-[10px] mt-1 ${textMutedClass}`}>Updates propagate across screens instantly (&lt;2s latency)</p>
                  </div>

                  {/* Immutable Blockchain Ledger visual logs */}
                  <div className={`border p-4 rounded-2xl ${cardClass}`}>
                    <span className="text-xs font-bold flex items-center gap-1.5 mb-2.5">
                      <Database className="w-4 h-4 text-emerald-500" />
                      <span>Immutable Log Ledger</span>
                    </span>
                    <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                      {systemLogs.map(log => (
                        <div key={log.id} className={`text-[10px] p-2 border rounded-lg space-y-1 ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}>
                          <div className="flex justify-between text-slate-500 font-mono">
                            <span>{log.time}</span>
                            <span className={`uppercase font-bold text-[8px] px-1 rounded ${
                              log.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                              log.type === 'error' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'
                            }`}>{log.type}</span>
                          </div>
                          <p className={`leading-relaxed font-mono ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{log.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Driver Phone Frame */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <span className={`text-xs font-mono mb-2 uppercase tracking-widest flex items-center gap-1.5 ${textMutedClass}`}>
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Driver Device
                  </span>
                  <div className={`w-full max-w-[420px] h-[780px] border-4 rounded-[40px] relative overflow-hidden flex flex-col ${
                    theme === 'dark' ? 'border-slate-800 bg-slate-950 shadow-2xl' : 'border-slate-300 bg-white shadow-2xl'
                  }`}>
                    <DriverApp 
                      driver={drivers.find(d => d.id === currentDriverId)}
                      contracts={contracts}
                      onProposeFare={handleProposeFare}
                      onEndTrip={handleEndTrip}
                      kycPendingApplications={kycPendingApplications}
                      setKycPendingApplications={setKycPendingApplications}
                      addLog={addLog}
                      theme={theme}
                      triggerNotification={triggerNotification}
                    />
                  </div>
                </div>
              </div>
            ) : activeTab === 'passenger' ? (
              <div className="flex justify-center">
                <div className={`w-full max-w-[420px] h-[800px] border-8 rounded-[40px] relative overflow-hidden flex flex-col ${
                  theme === 'dark' ? 'border-slate-800 bg-slate-950 shadow-2xl' : 'border-slate-300 bg-white shadow-2xl'
                }`}>
                  <PassengerApp 
                    passenger={passengers.find(p => p.id === currentPassengerId)}
                    drivers={drivers}
                    contracts={contracts}
                    onInitiate={handleInitiateContract}
                    onConfirm={handleConfirmContract}
                    onRate={handleRateTrip}
                    addLog={addLog}
                    theme={theme}
                    triggerNotification={triggerNotification}
                    kycPendingApplications={kycPendingApplications}
                    setKycPendingApplications={setKycPendingApplications}
                  />
                </div>
              </div>
            ) : activeTab === 'driver' ? (
              <div className="flex justify-center">
                <div className={`w-full max-w-[420px] h-[800px] border-8 rounded-[40px] relative overflow-hidden flex flex-col ${
                  theme === 'dark' ? 'border-slate-800 bg-slate-950 shadow-2xl' : 'border-slate-300 bg-white shadow-2xl'
                }`}>
                  <DriverApp 
                    driver={drivers.find(d => d.id === currentDriverId)}
                    contracts={contracts}
                    onProposeFare={handleProposeFare}
                    onEndTrip={handleEndTrip}
                    kycPendingApplications={kycPendingApplications}
                    setKycPendingApplications={setKycPendingApplications}
                    addLog={addLog}
                    theme={theme}
                    triggerNotification={triggerNotification}
                  />
                </div>
              </div>
            ) : (
              <AdminPanel 
                contracts={contracts}
                drivers={drivers}
                passengers={passengers}
                kycPendingApplications={kycPendingApplications}
                onApprove={handleApproveKYC}
                onReject={handleRejectKYC}
                theme={theme}
              />
            )}
          </main>

          {/* Persistent Legal Notice & Terms agreement */}
          <footer className={`border-t py-6 px-4 mt-12 text-center text-xs transition-colors duration-300 ${
            theme === 'dark' ? 'border-slate-900 bg-slate-950 text-slate-500' : 'border-slate-200 bg-slate-100 text-slate-600'
          }`}>
            <p className="max-w-2xl mx-auto mb-2">
              ⚖️ **Khaap Legal Disclaimer:** Pressing "Confirm & Lock Contract" establishes an official, digitally stamped agreement compliant with state digital contract laws. 
            </p>
            <div className="flex justify-center items-center gap-1.5 font-mono text-[10px]">
              <span>Simulated Platform Created By:</span>
              <a 
                href="https://www.linkedin.com/in/ranamorjal/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-emerald-500 hover:underline font-bold flex items-center gap-0.5"
              >
                Rana Morjal <ExternalLink className="w-2.5 h-2.5 inline" />
              </a>
            </div>
          </footer>
        </>
      )}

    </div>
  );
}

function PassengerApp({ passenger, drivers, contracts, onInitiate, onConfirm, onRate, addLog, theme, triggerNotification, kycPendingApplications, setKycPendingApplications }) {
  const [step, setStep] = useState('home'); 
  const [selectedDriver, setSelectedDriver] = useState(null);
  
  // Trip Input State
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [midPoints, setMidPoints] = useState([]);
  const [newMidPointText, setNewMidPointText] = useState('');
  
  // Rating State
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingFeedback, setRatingFeedback] = useState('');

  // KYC State
  const [kycDocType, setKycDocType] = useState('National ID (NID)');
  const [kycNidNumber, setKycNidNumber] = useState('');
  const [kycFile, setKycFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const currentContract = contracts.find(c => 
    c.customerId === passenger.id && 
    (c.status === 'pending' || c.status === 'active' || (c.status === 'completed' && c.rating === undefined))
  );

  useEffect(() => {
    if (!passenger.kycVerified) {
      const hasPendingApp = kycPendingApplications.some(app => app.phone === passenger.phone);
      if (hasPendingApp) {
        setStep('kyc_pending');
      } else {
        setStep('kyc_submit');
      }
    } else {
      if (step === 'kyc_pending' || step === 'kyc_submit') {
        setStep('home');
      } else if (currentContract) {
        if (currentContract.status === 'pending' || currentContract.status === 'active') {
          setStep('active');
        } else if (currentContract.status === 'completed' && currentContract.rating === undefined) {
          setStep('rating');
        }
      } else {
        if (step === 'active' || step === 'rating') {
          setStep('home');
        }
      }
    }
  }, [currentContract, passenger, kycPendingApplications]);

  const handleAddMidPoint = () => {
    if (!newMidPointText.trim()) return;
    setMidPoints([...midPoints, { id: Date.now(), text: newMidPointText }]);
    setNewMidPointText('');
  };

  const handleRemoveMidPoint = (id) => {
    setMidPoints(midPoints.filter(m => m.id !== id));
  };

  const triggerMockScan = (driverObj) => {
    if (!passenger.kycVerified) {
      triggerNotification("Your profile is unverified. Please upload mandatory KYC documents first.");
      return;
    }
    setSelectedDriver(driverObj);
    addLog(`Passenger camera scanned Driver physical ID QR Code: ${driverObj.name}`);
    setStep('form');
  };

  const submitContractDraft = () => {
    if (!startPoint || !endPoint) {
      triggerNotification("Please provide both starting and ending points.");
      return;
    }
    const contractId = onInitiate(passenger.id, selectedDriver.id, startPoint, endPoint, midPoints);
    if (contractId) {
      setStep('active');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setKycFile({
          name: file.name,
          size: (file.size / 1024).toFixed(1) + " KB",
          type: file.type,
          dataUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerSimulatedFile = (type) => {
    const simulatedFiles = {
      nid: { name: "nid_commuter_scan.pdf", size: "450 KB", type: "application/pdf", dataUrl: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=400" },
      passport: { name: "passport_commuter.png", size: "1.2 MB", type: "image/png", dataUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
      certificate: { name: "birth_cert.jpg", size: "890 KB", type: "image/jpeg", dataUrl: "https://images.unsplash.com/photo-1586075010923-2dd45e9b2d4f?auto=format&fit=crop&q=80&w=400" }
    };
    setKycFile(simulatedFiles[type]);
    addLog(`Passenger attached simulated ${type.toUpperCase()} file successfully.`);
  };

  const submitKycApplication = (e) => {
    e.preventDefault();
    if (!kycNidNumber) {
      triggerNotification("Please enter your document ID number.");
      return;
    }
    if (!kycFile) {
      triggerNotification("Mandatory document attachment file is required.");
      return;
    }

    const newApp = {
      id: `kyc-app-${Date.now()}`,
      name: passenger.name,
      phone: passenger.phone,
      role: 'customer',
      docType: kycDocType,
      nid: kycNidNumber,
      attachment: kycFile,
      submittedAt: new Date().toISOString()
    };

    setKycPendingApplications(prev => [...prev, newApp]);
    setStep('kyc_pending');
    addLog(`Passenger ${passenger.name} submitted KYC with ${kycDocType} attachment for Admin verification.`);
  };

  const submitRating = () => {
    if (currentContract) {
      onRate(currentContract.id, ratingStars, ratingFeedback);
      setStep('home');
      setStartPoint('');
      setEndPoint('');
      setMidPoints([]);
    }
  };

  const textMuted = theme === 'dark' ? "text-slate-400" : "text-slate-600";
  const borderCol = theme === 'dark' ? "border-slate-900" : "border-slate-200";

  return (
    <div className={`flex-1 flex flex-col h-full ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Phone Header */}
      <div className={`border-b p-4 flex items-center justify-between ${
        theme === 'dark' ? 'border-slate-900 bg-slate-900/60' : 'border-slate-200 bg-white'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <User className="w-4.5 h-4.5 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs font-bold leading-none">{passenger.name}</p>
            <span className={`text-[9px] font-semibold ${passenger.kycVerified ? 'text-emerald-500' : 'text-amber-500 animate-pulse'}`}>
              {passenger.kycVerified ? 'Verified Commuter' : 'KYC Pending Verification'}
            </span>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${passenger.kycVerified ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></span>
          <span>GPS Active</span>
        </div>
      </div>

      {/* Screen Panels */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {step === 'kyc_submit' && (
          <div className="space-y-4 py-2 animate-fade-in">
            <div className="border p-4 rounded-2xl border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider mb-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>KYC Identity Verification Required</span>
              </div>
              <p className={`text-xs leading-relaxed ${textMuted}`}>
                Under local transport compliance rules, passengers must verify their legal identity before initiating active street contracts. Please complete this brief one-time upload.
              </p>
            </div>

            <form onSubmit={submitKycApplication} className={`border p-4 rounded-2xl space-y-3.5 ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Select Identity Document Type</label>
                <select 
                  value={kycDocType}
                  onChange={(e) => setKycDocType(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="National ID (NID)">National ID Card (NID)</option>
                  <option value="Passport">Passport Document</option>
                  <option value="Birth Certificate">Registered Birth Certificate</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Document/ID Number</label>
                <input 
                  type="text" 
                  value={kycNidNumber}
                  onChange={(e) => setKycNidNumber(e.target.value)}
                  placeholder={`Enter your ${kycDocType} Number`}
                  className={`w-full border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Document File Picker */}
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Upload Attachment (Required)</label>
                <div className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                  dragActive ? 'border-emerald-500 bg-emerald-500/5' : (theme === 'dark' ? 'border-slate-800 hover:border-slate-700 bg-slate-950' : 'border-slate-300 hover:border-slate-400 bg-slate-50')
                }`}>
                  <input 
                    type="file" 
                    id="passenger-file-upload" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                  />
                  <label htmlFor="passenger-file-upload" className="cursor-pointer space-y-1.5 block">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                    <p className="text-xs font-semibold">Drag & drop files or <span className="text-emerald-500 font-bold">browse</span></p>
                    <p className="text-[10px] text-slate-500">Supports PDF, JPG, PNG up to 5MB</p>
                  </label>
                </div>

                <div className="mt-2.5 space-y-1">
                  <span className="text-[9px] uppercase font-mono text-slate-500 block">Simulate Quick Upload Attachment:</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button type="button" onClick={() => triggerSimulatedFile('nid')} className={`text-[10px] py-1 px-1 rounded font-mono border ${theme === 'dark' ? 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}>
                      📎 Mock NID
                    </button>
                    <button type="button" onClick={() => triggerSimulatedFile('passport')} className={`text-[10px] py-1 px-1 rounded font-mono border ${theme === 'dark' ? 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}>
                      📎 Mock Passport
                    </button>
                    <button type="button" onClick={() => triggerSimulatedFile('certificate')} className={`text-[10px] py-1 px-1 rounded font-mono border ${theme === 'dark' ? 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}>
                      📎 Mock BirthCert
                    </button>
                  </div>
                </div>

                {kycFile && (
                  <div className={`mt-3 p-2.5 rounded-xl border flex items-center justify-between text-xs font-medium ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-2 truncate">
                      <Paperclip className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{kycFile.name}</span>
                      <span className="text-[10px] text-slate-500">({kycFile.size})</span>
                    </div>
                    <button type="button" onClick={() => setKycFile(null)} className="text-rose-500 hover:text-rose-400 p-0.5">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
              >
                Submit Official KYC Application
              </button>
            </form>
          </div>
        )}

        {}
        {step === 'kyc_pending' && (
          <div className="space-y-4 py-8 text-center animate-fade-in">
            <Clock className="w-12 h-12 text-amber-500 animate-spin mx-auto" />
            <h3 className="text-md font-bold">Identity Verification In Progress</h3>
            <p className={`text-xs px-2 leading-relaxed ${textMuted}`}>
              We are currently reviewing your attached <strong>{kycDocType || "Identity Document"}</strong>. To verify immediately, select the <strong>Admin Desk</strong> tab at the top and approve this application!
            </p>
            <div className={`p-4 rounded-xl border max-w-sm mx-auto text-left space-y-2 text-xs font-mono ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <div className="flex justify-between border-b border-dashed pb-1.5">
                <span className="text-slate-500">Full Name:</span>
                <span className="font-semibold">{passenger.name}</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-1.5">
                <span className="text-slate-500">Phone Signature:</span>
                <span className="font-semibold">{passenger.phone}</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-1.5">
                <span className="text-slate-500">Doc ID:</span>
                <span className="font-semibold">{kycNidNumber || "1994321908"}</span>
              </div>
              <div className="flex justify-between truncate">
                <span className="text-slate-500">Attachment:</span>
                <span className="font-semibold truncate max-w-[150px]">{kycFile ? kycFile.name : "attached_id.pdf"}</span>
              </div>
            </div>
          </div>
        )}

        {step === 'home' && (
          <div className="space-y-5 h-full flex flex-col justify-between py-2 animate-fade-in">
            <div>
              <div className={`border p-4 rounded-2xl relative overflow-hidden mb-6 ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/5 blur-xl rounded-full"></div>
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Khaap Safety Lock</span>
                </div>
                <h3 className="text-md font-bold">Establish a legally binding digital transit agreement.</h3>
                <p className={`text-xs mt-1 ${textMuted}`}>Simply scan the physical QR sticker pasted in the vehicle or on driver's mobile device.</p>
              </div>

              {/* Interactive QR Simulation scan selectors */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase text-slate-500 font-mono tracking-wider block">Scan QR Code Simulation</label>
                <div className="space-y-2">
                  {drivers.map(drv => (
                    <button 
                      key={drv.id}
                      onClick={() => triggerMockScan(drv)}
                      className={`w-full border p-3 rounded-xl flex items-center justify-between text-left transition-all group ${
                        theme === 'dark' 
                          ? 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 hover:border-emerald-500/40' 
                          : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-500/40 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                          {drv.vehicleType === 'cng' ? <span className="font-bold text-xs uppercase">CNG</span> : <span className="font-bold text-xs uppercase">Bike</span>}
                        </div>
                        <div>
                          <p className="text-sm font-bold group-hover:text-emerald-500">{drv.name}</p>
                          <p className={`text-[10px] ${textMuted}`}>{drv.licensePlate}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <span className={`text-[10px] border px-2 py-1 rounded ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-100 border-slate-300 text-emerald-600'
                        }`}>Simulate Scan</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center py-6">
              <button 
                onClick={() => setStep('scan')}
                className="w-48 h-48 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex flex-col items-center justify-center gap-3 shadow-xl shadow-emerald-500/10 active:scale-95 transition-transform border-4 border-slate-950 outline outline-1 outline-emerald-500"
              >
                <QrCode className="w-12 h-12 stroke-[2.5]" />
                <span className="font-extrabold text-sm tracking-widest uppercase">Tap to Scan QR</span>
              </button>
            </div>
          </div>
        )}

        {}
        {step === 'scan' && (
          <div className="space-y-4 text-center py-8 animate-fade-in">
            <h3 className="text-md font-bold">Webcam Viewfinder</h3>
            <p className={`text-xs ${textMuted}`}>Position the physical QR sticker within the square box below</p>
            
            <div className="w-full max-w-[280px] aspect-square mx-auto border-2 border-emerald-500 rounded-3xl relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>
              
              <QrCode className="w-16 h-16 text-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-mono mt-3 animate-bounce">Scanning live feeds...</span>
            </div>

            <div className="space-y-2 max-w-[280px] mx-auto">
              <span className="text-slate-500 text-[10px] uppercase font-mono block">Simulate targeting driver</span>
              <div className="grid grid-cols-2 gap-2">
                {drivers.map(drv => (
                  <button 
                    key={drv.id}
                    onClick={() => triggerMockScan(drv)}
                    className={`text-[10px] py-2 px-1 rounded-lg font-mono border ${
                      theme === 'dark' ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-white' : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-sm'
                    }`}
                  >
                    Target {drv.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setStep('home')}
              className={`w-full text-xs py-2.5 rounded-xl border font-medium ${
                theme === 'dark' ? 'bg-slate-900 text-slate-400 border-slate-800' : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              Cancel Camera Mode
            </button>
          </div>
        )}

        {}
        {step === 'form' && selectedDriver && (
          <div className="space-y-4 animate-fade-in">
            <div className={`flex items-center gap-3 p-3 rounded-2xl border ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Matched Vehicle Lock</p>
                <p className="text-sm font-bold">{selectedDriver.name}</p>
                <p className={`text-xs ${textMuted}`}>{selectedDriver.licensePlate} ({selectedDriver.vehicleType.toUpperCase()})</p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border space-y-3.5 ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Define Digital Contract Parameters</h3>
              
              <div>
                <label className="text-[10px] text-slate-500 font-semibold mb-1 block">Start Location</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-500 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)}
                    placeholder="Enter pickup point (e.g., Farmgate)"
                    className={`w-full border rounded-xl pl-9 pr-3 py-2.5 text-xs focus:border-emerald-500 focus:outline-none ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 font-semibold mb-1 block">End Location (Destination)</label>
                <div className="relative">
                  <Navigation className="w-4 h-4 text-emerald-500 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    value={endPoint}
                    onChange={(e) => setEndPoint(e.target.value)}
                    placeholder="Enter final dropoff location"
                    className={`w-full border rounded-xl pl-9 pr-3 py-2.5 text-xs focus:border-emerald-500 focus:outline-none ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              {/* Midway stops */}
              <div className={`pt-2 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                <label className="text-[10px] text-slate-500 font-semibold mb-1 block">Add Midway Stops (Optional)</label>
                <div className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    value={newMidPointText}
                    onChange={(e) => setNewMidPointText(e.target.value)}
                    placeholder="e.g., Drop friend at Mohakhali"
                    className={`flex-1 border rounded-xl px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  <button 
                    onClick={handleAddMidPoint}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 px-3 rounded-xl text-xs font-bold"
                  >
                    Add
                  </button>
                </div>

                {midPoints.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {midPoints.map((mp, index) => (
                      <div key={mp.id} className={`flex items-center justify-between p-2 rounded-lg border text-[11px] ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className="font-mono">Stop #{index+1}: {mp.text}</span>
                        <button onClick={() => handleRemoveMidPoint(mp.id)} className="text-rose-500 hover:text-rose-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={submitContractDraft}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/10"
            >
              Request Fare Proposal From Driver
            </button>
          </div>
        )}

        {}
        {step === 'active' && currentContract && (
          <div className="space-y-4 animate-fade-in">
            <div className={`border p-4 rounded-2xl space-y-3 relative ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className={`flex justify-between items-center border-b pb-2 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                  theme === 'dark' ? 'bg-slate-950 text-slate-400' : 'bg-slate-100 text-slate-600'
                }`}>
                  Contract ID: {currentContract.id}
                </span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                  currentContract.status === 'active' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500 animate-pulse'
                }`}>
                  {currentContract.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Route Parameters</span>
                <p className="text-xs font-bold mt-1">{currentContract.startPoint} ➔ {currentContract.endPoint}</p>
                {currentContract.midPoints && currentContract.midPoints.length > 0 && (
                  <div className="mt-2 pl-3 border-l border-emerald-500/30 space-y-1">
                    {currentContract.midPoints.map((mp, i) => (
                      <p key={mp.id || i} className={`text-[10px] ${textMuted}`}>Stop #{i+1}: {mp.text}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className={`border-t pt-3 flex justify-between items-center ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Assigned Driver</span>
                  <p className="text-xs font-bold">{currentContract.driverName}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{currentContract.driverPlate}</p>
                </div>
                <div className={`border p-2 rounded-lg text-center ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}>
                  <span className="text-[9px] text-slate-500 block font-semibold">Agreed Fare</span>
                  <span className="text-sm font-black text-emerald-500">
                    {currentContract.agreedFare ? `৳${currentContract.agreedFare}` : "Awaiting Quote"}
                  </span>
                </div>
              </div>
            </div>

            {currentContract.status === 'pending' && (
              <div className={`border-2 border-dashed p-5 rounded-2xl text-center space-y-3.5 ${
                theme === 'dark' ? 'bg-slate-900 border-amber-500/20' : 'bg-white border-amber-500/30 shadow-sm'
              }`}>
                <Clock className="w-10 h-10 text-amber-500 animate-spin mx-auto stroke-[1.5]" />
                <div>
                  <h4 className="text-sm font-bold">Awaiting Driver's Fare Proposal...</h4>
                  <p className={`text-[11px] mt-1 ${textMuted}`}>We sent route parameters to the driver. Check your companion's device (right side) to submit the fare amount.</p>
                </div>

                {currentContract.agreedFare && (
                  <div className={`p-4 rounded-xl border animate-fade-in space-y-3 ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
                  }`}>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Proposed Legal Fare Binding</span>
                    <p className="text-3xl font-black text-emerald-500">৳{currentContract.agreedFare}</p>
                    <button 
                      onClick={() => onConfirm(currentContract.id)}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider"
                    >
                      Lock & Sign Digital Contract
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentContract.status === 'active' && (
              <div className="space-y-3 animate-fade-in">
                <div className={`border p-4 rounded-2xl text-center space-y-2 ${
                  theme === 'dark' ? 'bg-slate-900 border-emerald-500/20' : 'bg-white border-emerald-500/30'
                }`}>
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping mx-auto"></div>
                  <h4 className="text-sm font-bold text-emerald-500">Trip is Digitally Locked & Active</h4>
                  <p className={`text-[11px] ${textMuted}`}>The route and fare of <strong>৳{currentContract.agreedFare}</strong> are sealed. Verbal updates/disputes are legally invalid under contract hash logs.</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a href="tel:999" className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-500 py-3 rounded-xl font-bold text-xs text-center uppercase tracking-wider">
                    🚨 SOS Emergency
                  </a>
                  <button 
                    onClick={() => addLog(`Customer triggered virtual safety status verification check for ${currentContract.id}.`)}
                    className={`border py-3 rounded-xl font-bold text-xs text-center ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Check Status Hash
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {}
        {step === 'rating' && currentContract && (
          <div className="space-y-4 animate-fade-in">
            <div className={`border p-5 rounded-2xl text-center space-y-4 ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <span className="text-4xl">🏁</span>
              <div>
                <h3 className="text-md font-bold">Destination Safely Reached!</h3>
                <p className={`text-xs mt-1 ${textMuted}`}>Contract successfully executed and logged to archives.</p>
              </div>

              <div className={`border p-4 rounded-xl ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Pay Driver (Cash / MFS)</span>
                <p className="text-3xl font-black text-amber-500 mt-1">৳{currentContract.agreedFare}</p>
                <p className="text-[9px] text-slate-500 mt-2 font-mono">Verify vehicle parameters matched before handing over fare.</p>
              </div>

              <div className={`pt-2 border-t ${theme === 'dark' ? 'border-slate-800/80' : 'border-slate-200'}`}>
                <label className="text-xs font-bold text-slate-500 block mb-1">Rate Driver Security & Compliance</label>
                <div className="flex justify-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star} 
                      onClick={() => setRatingStars(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star className={`w-6 h-6 ${star <= ratingStars ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <textarea 
                  value={ratingFeedback}
                  onChange={(e) => setRatingFeedback(e.target.value)}
                  placeholder="Leave optional safety or compliance feedback..."
                  className={`w-full border rounded-xl p-3 text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500 h-20 resize-none ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <button 
                onClick={submitRating}
                className="w-full bg-emerald-500 text-slate-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
              >
                Seal & Finish Journey Log
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function DriverApp({ driver, contracts, onProposeFare, onEndTrip, kycPendingApplications, setKycPendingApplications, addLog, theme, triggerNotification }) {
  const [activeDriverTab, setActiveDriverTab] = useState('dashboard'); 
  
  // KYC Upload States
  const [kycName, setKycName] = useState('');
  const [kycPhone, setKycPhone] = useState('');
  const [kycNid, setKycNid] = useState('');
  const [kycLicense, setKycLicense] = useState('');
  const [kycPlate, setKycPlate] = useState('');
  const [kycVehicle, setKycVehicle] = useState('cng');
  const [kycDocType, setKycDocType] = useState('National ID (NID)');
  const [kycAttachment, setKycAttachment] = useState(null);
  const [kycSubmitted, setKycSubmitted] = useState(false);

  // Driver input fare state
  const [tempFare, setTempFare] = useState('');

  const currentContract = contracts.find(c => 
    c.driverId === driver.id && 
    (c.status === 'pending' || c.status === 'active')
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setKycAttachment({
          name: file.name,
          size: (file.size / 1024).toFixed(1) + " KB",
          type: file.type,
          dataUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerSimulatedFile = (type) => {
    const simulatedFiles = {
      nid: { name: "nid_driver_scanned.jpg", size: "640 KB", type: "image/jpeg", dataUrl: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=400" },
      license: { name: "license_card.png", size: "1.1 MB", type: "image/png", dataUrl: "https://images.unsplash.com/photo-1586075010923-2dd45e9b2d4f?auto=format&fit=crop&q=80&w=400" }
    };
    setKycAttachment(simulatedFiles[type]);
    addLog(`Driver attached simulated ${type.toUpperCase()} file successfully.`);
  };

  const handleKycSubmit = (e) => {
    e.preventDefault();
    if (!kycName || !kycPhone || !kycNid || !kycLicense || !kycPlate) {
      triggerNotification("All identity verification parameters are strictly required for security validation.");
      return;
    }
    if (!kycAttachment) {
      triggerNotification("Official Identity Document attachment is strictly required.");
      return;
    }

    const newApp = {
      id: `kyc-app-${Date.now()}`,
      name: kycName,
      phone: kycPhone,
      role: 'driver',
      vehicleType: kycVehicle,
      licensePlate: kycPlate,
      nid: kycNid,
      docType: kycDocType,
      licenseUploaded: kycLicense,
      attachment: kycAttachment,
      submittedAt: new Date().toISOString()
    };

    setKycPendingApplications(prev => [...prev, newApp]);
    setKycSubmitted(true);
    addLog(`Identity KYC application submitted for driver validation: ${kycName}`);
  };

  const textMuted = theme === 'dark' ? "text-slate-400" : "text-slate-600";
  const cardBg = theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm";
  const inputBg = theme === 'dark' ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900";

  return (
    <div className={`flex-1 flex flex-col h-full ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Phone Header */}
      <div className={`border-b p-4 flex items-center justify-between ${
        theme === 'dark' ? 'border-slate-900 bg-slate-900/60' : 'border-slate-200 bg-white'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <QrCode className="w-4.5 h-4.5 text-blue-500" />
          </div>
          <div>
            <p className="text-xs font-bold leading-none">{driver.name}</p>
            <span className="text-[10px] text-blue-500 font-semibold">{driver.licensePlate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveDriverTab(activeDriverTab === 'kyc' ? 'dashboard' : 'kyc')}
            className={`text-[10px] border px-2 py-1 rounded ${
              theme === 'dark' ? 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300' : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
            }`}
          >
            {activeDriverTab === 'kyc' ? "Go App" : "Apply KYC"}
          </button>
        </div>
      </div>

      {/* Screen panels */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {activeDriverTab === 'kyc' ? (
          <div className="space-y-4 animate-fade-in">
            <div className={`border p-4 rounded-2xl ${cardBg}`}>
              <h3 className="text-sm font-bold flex items-center gap-1.5">
                <Shield className="w-4.5 h-4.5 text-blue-500" />
                <span>Khaap KYC Identity Upload</span>
              </h3>
              <p className={`text-xs mt-1 ${textMuted}`}>Emerging market compliance protocol demands validation of Identity Documents, Driving licenses, and Vehicle Plates.</p>
            </div>

            {kycSubmitted ? (
              <div className={`border p-6 rounded-2xl text-center space-y-3 ${cardBg}`}>
                <CheckCircle className="w-12 h-12 text-blue-500 mx-auto" />
                <h4 className="text-sm font-bold">Verification Submitted</h4>
                <p className={`text-xs ${textMuted}`}>The Khaap administration desks are inspecting the provided parameters. (Open 'Admin Desk' above to approve this application instantly!)</p>
                <button 
                  onClick={() => { setKycSubmitted(false); setActiveDriverTab('dashboard'); }}
                  className={`border text-xs py-2 px-4 rounded-xl ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
                  }`}
                >
                  Return to Panel
                </button>
              </div>
            ) : (
              <form onSubmit={handleKycSubmit} className={`border p-4 rounded-2xl space-y-3 ${cardBg}`}>
                <div>
                  <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Full Legal Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sajib Sen" 
                    value={kycName} 
                    onChange={e => setKycName(e.target.value)}
                    className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 ${inputBg}`}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Registered Phone</label>
                  <input 
                    type="text" 
                    placeholder="e.g. +880 1912-778899" 
                    value={kycPhone} 
                    onChange={e => setKycPhone(e.target.value)}
                    className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 ${inputBg}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Select ID Doc</label>
                    <select 
                      value={kycDocType}
                      onChange={e => setKycDocType(e.target.value)}
                      className={`w-full border rounded-xl px-2 py-2 text-xs focus:outline-none focus:border-blue-500 ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="National ID (NID)">NID Card</option>
                      <option value="Passport">Passport</option>
                      <option value="Birth Certificate">Birth Cert</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Identity ID Number</label>
                    <input 
                      type="text" 
                      placeholder="Doc ID details" 
                      value={kycNid} 
                      onChange={e => setKycNid(e.target.value)}
                      className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 ${inputBg}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Driving License Number</label>
                  <input 
                    type="text" 
                    placeholder="BRTA Registered Format" 
                    value={kycLicense} 
                    onChange={e => setKycLicense(e.target.value)}
                    className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 ${inputBg}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Vehicle Type</label>
                    <select 
                      value={kycVehicle} 
                      onChange={e => setKycVehicle(e.target.value)}
                      className={`w-full border rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-blue-500 ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="cng">CNG (Three-wheeler)</option>
                      <option value="bike">Motorcycle</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">License Plate</label>
                    <input 
                      type="text" 
                      placeholder="e.g. DHAKA-METRO-G-99" 
                      value={kycPlate} 
                      onChange={e => setKycPlate(e.target.value)}
                      className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 ${inputBg}`}
                    />
                  </div>
                </div>

                {/* File Attachment Upload */}
                <div>
                  <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Attach ID/License Scans (Required)</label>
                  <div className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-all ${
                    theme === 'dark' ? 'border-slate-800 hover:border-slate-700 bg-slate-950' : 'border-slate-300 hover:border-slate-400 bg-slate-50'
                  }`}>
                    <input 
                      type="file" 
                      id="driver-file-upload" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                    />
                    <label htmlFor="driver-file-upload" className="cursor-pointer space-y-1 block">
                      <Upload className="w-5 h-5 text-slate-400 mx-auto" />
                      <p className="text-[11px] font-semibold">Drop or <span className="text-blue-500 font-bold">upload identity file</span></p>
                    </label>
                  </div>

                  <div className="mt-2 space-y-1">
                    <span className="text-[9px] uppercase font-mono text-slate-500 block">Simulate Quick Upload Attachment:</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button type="button" onClick={() => triggerSimulatedFile('nid')} className={`text-[9px] py-1 px-1 rounded font-mono border ${theme === 'dark' ? 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}>
                        📎 Scanned NID
                      </button>
                      <button type="button" onClick={() => triggerSimulatedFile('license')} className={`text-[9px] py-1 px-1 rounded font-mono border ${theme === 'dark' ? 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}>
                        📎 Scanned DrivingLicense
                      </button>
                    </div>
                  </div>

                  {kycAttachment && (
                    <div className={`mt-2 p-2 rounded-xl border flex items-center justify-between text-[11px] font-medium ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <div className="flex items-center gap-1.5 truncate">
                        <Paperclip className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{kycAttachment.name}</span>
                        <span className="text-[9px] text-slate-500 font-mono shrink-0">({kycAttachment.size})</span>
                      </div>
                      <button type="button" onClick={() => setKycAttachment(null)} className="text-rose-500 hover:text-rose-400">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider mt-2 shadow-md"
                >
                  Submit Official KYC Documents
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            
            {!currentContract ? (
              <div className="space-y-4">
                <div className={`border p-4 rounded-2xl text-center space-y-3.5 ${cardBg}`}>
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-2xl flex items-center justify-center shadow-inner">
                    <div className="text-center">
                      <QrCode className="w-24 h-24 text-slate-950 mx-auto" />
                      <span className="text-[8px] font-mono font-bold text-slate-500 block mt-1">{driver.qrCode}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Your Permanent Passenger QR Sticker</h3>
                    <p className={`text-xs mt-1 ${textMuted}`}>Paste this inside your vehicle. Commuters scan it with the Khaap web application to establish secure parameters.</p>
                  </div>
                </div>

                {/* Driver Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className={`border p-3 rounded-xl text-center ${cardBg}`}>
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-semibold">Rating</span>
                    <span className="text-sm font-bold text-blue-500 flex items-center justify-center gap-1 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-blue-500" />
                      <span>{driver.rating}</span>
                    </span>
                  </div>
                  <div className={`border p-3 rounded-xl text-center ${cardBg}`}>
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-semibold">Journeys</span>
                    <span className="text-sm font-extrabold block mt-0.5">{driver.tripsCount}</span>
                  </div>
                  <div className={`border p-3 rounded-xl text-center ${cardBg}`}>
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-semibold">Status</span>
                    <span className="text-xs font-bold text-emerald-500 flex items-center justify-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Online</span>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Incoming Request Alert Panel */}
                <div className={`border p-4 rounded-2xl space-y-4 ${
                  theme === 'dark' ? 'bg-blue-950/40 border-blue-500/25' : 'bg-blue-50 border-blue-200'
                }`}>
                  <div className={`flex items-center justify-between border-b pb-2 ${
                    theme === 'dark' ? 'border-blue-500/10' : 'border-blue-200'
                  }`}>
                    <span className="text-xs font-bold text-blue-500 flex items-center gap-1.5">
                      <FileText className="w-4.5 h-4.5" />
                      <span>Contract Request Locked</span>
                    </span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                      theme === 'dark' ? 'bg-slate-950 text-slate-400 border-slate-855' : 'bg-white text-slate-600 border-slate-300'
                    }`}>
                      {currentContract.id}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-semibold">Passenger:</span>
                      <span className="font-bold">{currentContract.customerName}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-semibold">Phone Sign:</span>
                      <span className="font-mono text-[11px]">{currentContract.customerPhone}</span>
                    </div>
                    <div className={`p-3 rounded-xl border ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200'
                    }`}>
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Route Plan</span>
                      <p className="text-xs mt-1 font-semibold">{currentContract.startPoint} ➔ {currentContract.endPoint}</p>
                      {currentContract.midPoints && currentContract.midPoints.length > 0 && (
                        <div className="mt-1 pl-2.5 border-l border-blue-500/30 space-y-1">
                          {currentContract.midPoints.map((mp, i) => (
                            <p key={mp.id || i} className="text-[10px] text-slate-500">Stop #{i+1}: {mp.text}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {currentContract.status === 'pending' && (
                    <div className="space-y-3 pt-2">
                      <label className="text-[10px] font-bold uppercase text-slate-500 block tracking-wider">Input your Agreed Fare Quote (BDT)</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">৳</span>
                          <input 
                            type="number" 
                            placeholder="e.g. 350"
                            value={tempFare}
                            onChange={e => setTempFare(e.target.value)}
                            className={`w-full border rounded-xl pl-8 pr-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 ${
                              theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                            }`}
                          />
                        </div>
                        <button 
                          onClick={() => {
                            if (!tempFare) return;
                            onProposeFare(currentContract.id, tempFare);
                          }}
                          className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 py-2.5 rounded-xl text-xs uppercase shadow-md"
                        >
                          Send Fare Propose
                        </button>
                      </div>
                      <p className="text-[9px] text-slate-500 text-center leading-relaxed">Sending a proposal locks this quote in the secure audit path.</p>
                    </div>
                  )}

                  {currentContract.status === 'active' && (
                    <div className={`p-4 rounded-xl text-center space-y-3.5 border ${
                      theme === 'dark' ? 'bg-slate-950 border-emerald-500/20' : 'bg-white border-emerald-500/30'
                    }`}>
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping mx-auto"></div>
                      <p className="text-xs font-semibold text-slate-500">Passenger accepted the quote. Legal lock status active.</p>
                      <div className={`flex justify-between items-center px-3 py-2 rounded-lg border ${
                        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className="text-[10px] text-slate-500">Agreed Fare Amount</span>
                        <span className="text-sm font-black text-emerald-500">৳{currentContract.agreedFare}</span>
                      </div>
                      <button 
                        onClick={() => onEndTrip(currentContract.id)}
                        className="w-full bg-blue-500 hover:bg-blue-400 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider shadow-md"
                      >
                        Arrived Destination (End Journey)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

function AdminPanel({ contracts, drivers, passengers, kycPendingApplications, onApprove, onReject, theme }) {
  const [selectedAttachment, setSelectedAttachment] = useState(null); 
  
  const cardClass = theme === 'dark' 
    ? "bg-slate-900 border border-slate-800" 
    : "bg-white border border-slate-200 shadow-sm";

  const itemClass = theme === 'dark' 
    ? "bg-slate-950 border border-slate-850" 
    : "bg-slate-50 border border-slate-200 shadow-inner";

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top statistics matrix for monitors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-2xl flex items-center justify-between border ${cardClass}`}>
          <div>
            <span className="text-xs text-slate-500 uppercase font-bold">Verified Drivers</span>
            <p className="text-2xl font-black mt-1">{drivers.length}</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <QrCode className="w-6 h-6" />
          </div>
        </div>

        <div className={`p-4 rounded-2xl flex items-center justify-between border ${cardClass}`}>
          <div>
            <span className="text-xs text-slate-500 uppercase font-bold">Verified Commuters</span>
            <p className="text-2xl font-black mt-1">{passengers.length}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <User className="w-6 h-6" />
          </div>
        </div>

        <div className={`p-4 rounded-2xl flex items-center justify-between border ${cardClass}`}>
          <div>
            <span className="text-xs text-slate-500 uppercase font-bold">Digital Contracts</span>
            <p className="text-2xl font-black mt-1">{contracts.length}</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className={`p-4 rounded-2xl flex items-center justify-between border ${cardClass}`}>
          <div>
            <span className="text-xs text-slate-500 uppercase font-bold">Pending KYC Cases</span>
            <p className="text-2xl font-black mt-1 text-rose-500">{kycPendingApplications.length}</p>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Pending KYC queue */}
        <div className={`p-4 rounded-2xl space-y-4 border ${cardClass}`}>
          <div className={`flex justify-between items-center border-b pb-2 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-rose-500" />
              <span>Identity KYC Verification Queue</span>
            </h3>
            <span className="text-[10px] font-mono bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded border border-rose-500/20">
              MANDATORY
            </span>
          </div>

          {kycPendingApplications.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              <CheckCircle className="w-8 h-8 text-emerald-500/40 mx-auto mb-2" />
              <span>All commuter & driver registrations verified!</span>
            </div>
          ) : (
            <div className="space-y-3">
              {kycPendingApplications.map(app => (
                <div key={app.id} className={`p-3 rounded-xl space-y-3 border ${itemClass}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold">{app.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{app.phone}</p>
                    </div>
                    <span className={`text-[9px] border px-1.5 py-0.5 rounded uppercase font-bold ${
                      app.role === 'driver' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }`}>
                      {app.role}
                    </span>
                  </div>

                  <div className={`space-y-1.5 text-[11px] font-mono p-2.5 rounded-lg border ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Doc Type:</span>
                      <span className="font-semibold text-right">{app.docType || "NID / Passport"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ID Number:</span>
                      <span className="font-semibold">{app.nid}</span>
                    </div>
                    {app.role === 'driver' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-500">License:</span>
                          <span className="font-semibold">{app.licenseUploaded}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Vehicle Plate:</span>
                          <span className="font-semibold">{app.licensePlate}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {app.attachment && (
                    <div className={`p-2 rounded-lg border flex items-center justify-between text-xs font-medium ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      <div className="flex items-center gap-1.5 truncate">
                        <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{app.attachment.name}</span>
                        <span className="text-[9px] text-slate-500">({app.attachment.size})</span>
                      </div>
                      <button 
                        onClick={() => setSelectedAttachment(app.attachment)}
                        className="text-emerald-500 hover:text-emerald-400 hover:underline flex items-center gap-0.5 shrink-0 text-[10px]"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View File</span>
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button 
                      onClick={() => onApprove(app.id)}
                      className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-slate-950 border border-emerald-500/20 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button 
                      onClick={() => onReject(app.id)}
                      className="bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {}
        <div className={`p-4 rounded-2xl space-y-4 border lg:col-span-2 ${cardClass}`}>
          <div className={`flex justify-between items-center border-b pb-2 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Database className="w-4.5 h-4.5 text-emerald-500" />
              <span>Immutable Transit Agreement Ledger</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Real-time update stream</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={`border-b text-slate-500 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                  <th className="py-2.5 font-bold font-mono">Contract ID</th>
                  <th className="py-2.5 font-bold">Commuter Signature</th>
                  <th className="py-2.5 font-bold">Driver Signature</th>
                  <th className="py-2.5 font-bold">Parameters & Route</th>
                  <th className="py-2.5 font-bold">Fare Value</th>
                  <th className="py-2.5 font-bold">Audit Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-slate-850' : 'divide-slate-100'}`}>
                {contracts.map(contract => (
                  <tr key={contract.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-slate-950/40' : 'hover:bg-slate-50'}`}>
                    <td className="py-3 font-mono font-bold">{contract.id}</td>
                    <td className="py-3">
                      <p className="font-semibold">{contract.customerName}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{contract.customerPhone}</p>
                    </td>
                    <td className="py-3">
                      <p className="font-semibold">{contract.driverName}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{contract.driverPlate}</p>
                    </td>
                    <td className="py-3">
                      <p className="font-semibold">{contract.startPoint} ➔ {contract.endPoint}</p>
                      {contract.midPoints && contract.midPoints.length > 0 && (
                        <p className="text-[10px] text-slate-500 font-mono">Stops: {contract.midPoints.map(mp => mp.text).join(', ')}</p>
                      )}
                    </td>
                    <td className="py-3 font-mono font-bold text-emerald-500 text-sm">
                      {contract.agreedFare ? `৳${contract.agreedFare}` : "Unspecified"}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        contract.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' :
                        contract.status === 'active' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {contract.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Simulated Document Attachment Viewer Modal */}
      {selectedAttachment && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-2xl overflow-hidden border p-5 space-y-4 flex flex-col justify-between ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-2 text-emerald-500">
                <FileText className="w-5 h-5" />
                <h3 className="text-sm font-bold">Document Viewer: {selectedAttachment.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedAttachment(null)}
                className="text-slate-500 hover:text-slate-400 p-1 rounded-full hover:bg-slate-800/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center min-h-[250px] ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              {selectedAttachment.dataUrl && (selectedAttachment.type.startsWith('image/') || selectedAttachment.name.endsWith('.jpg') || selectedAttachment.name.endsWith('.png')) ? (
                <img 
                  src={selectedAttachment.dataUrl} 
                  alt="Identity Verification Scan" 
                  className="max-h-[230px] rounded-lg object-contain shadow-lg"
                />
              ) : (
                <div className="text-center space-y-2">
                  <FileDown className="w-12 h-12 text-slate-500 mx-auto" />
                  <p className="text-xs font-semibold text-slate-400">PDF Binary Payload Encrypted</p>
                  <p className="text-[10px] text-slate-500 font-mono">Format: AES-256 TLS Secure Path</p>
                  <p className="text-[10px] text-slate-500">Size: {selectedAttachment.size}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-dashed border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 mr-auto flex items-center">
                🔒 Sealed compliance audit attachment
              </span>
              <button 
                onClick={() => setSelectedAttachment(null)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs uppercase"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}