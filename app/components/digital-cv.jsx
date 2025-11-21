'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Code2, Cpu, Globe, Database, Layout, GitBranch, 
  Coffee, Mail, Github, Linkedin, Twitter, ChevronDown, 
  ExternalLink, Download, AlertCircle, Command, Hash
} from 'lucide-react';

// --- MOCK DATA ---

const PROFILE = {
  name: "ALEX_STREAM",
  role: "SENIOR_FULL_STACK_ENGINEER",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexStream&backgroundColor=b6e3f4",
  bio: ">> SYSTEM CHECK: OPTIMAL. Architecting scalable digital solutions. Passion for clean code detected. User-centric design protocols active.",
  location: "SAN_FRANCISCO_CA",
  status: "STATUS: ONLINE / OPEN_TO_WORK"
};

const SKILLS = [
  { name: "REACT_NEXT_JS", level: 95, icon: Layout },
  { name: "TYPESCRIPT", level: 90, icon: Code2 },
  { name: "NODE_GRAPHQL", level: 85, icon: Database },
  { name: "CLOUD_ARCH", level: 80, icon: Globe },
  { name: "SYSTEM_DESIGN", level: 85, icon: Cpu },
  { name: "DEVOPS_CICD", level: 75, icon: GitBranch },
];

const EXPERIENCE = [
  {
    id: 1,
    role: "SENIOR_ENGINEER",
    company: "TECHNOVA_SOLUTIONS",
    period: "2021.05 - PRESENT",
    log: "INITIATED FRONTEND MIGRATION TO REACT 18. CORE VITALS IMPROVED BY 40%. SUBROUTINE: MENTORING DEV SQUAD [COUNT: 5].",
    tech: ["REACT", "AWS", "TS"]
  },
  {
    id: 2,
    role: "FULL_STACK_DEV",
    company: "QUANTUM_SYSTEMS",
    period: "2018.02 - 2021.04",
    log: "DEPLOYED TRADING PLATFORM [USERS: 50K+]. OPTIMIZED DB QUERY LATENCY [-60%]. EXECUTED REAL-TIME DATA STREAMS.",
    tech: ["NODE", "POSTGRES", "REDIS"]
  },
  {
    id: 3,
    role: "WEB_DEVELOPER",
    company: "PIXEL_PERFECT",
    period: "2016.06 - 2018.01",
    log: "CONSTRUCTED RESPONSIVE INTERFACES FOR FORTUNE 500 CLIENTS. ANIMATION COMPLEXITY: HIGH.",
    tech: ["VUE", "GSAP", "SCSS"]
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "NEBULA_AI.exe",
    description: "Autonomous agent platform for data analysis using LLM protocols.",
    tags: ["OPENAI", "PYTHON", "REACT"],
    status: "RUNNING",
    color: "text-green-400"
  },
  {
    id: 2,
    title: "FLOWSTATE.app",
    description: "Productivity environment designed for maintaining developer deep work.",
    tags: ["ELECTRON", "REACT", "FIREBASE"],
    status: "STABLE",
    color: "text-cyan-400"
  },
  {
    id: 3,
    title: "CRYPTODASH_V2",
    description: "Real-time visualization dashboard with predictive analytics engine.",
    tags: ["D3.JS", "WEBSOCKETS", "NEXT"],
    status: "BETA",
    color: "text-yellow-400"
  }
];

// --- UTILITY COMPONENTS ---

const Scanline = () => (
  <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20 mix-blend-hard-light" />
);

const Typewriter = ({ text, delay = 0, speed = 30, className }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [displayedText, started, text, speed]);

  return (
    <span className={`${className} font-mono`}>
      {displayedText}
      <span className="animate-pulse bg-green-500 w-2 h-4 inline-block ml-1 align-middle" />
    </span>
  );
};

const GlitchText = ({ text }) => {
  return (
    <div className="relative group inline-block">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-green-400 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-400 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none">{text}</span>
    </div>
  );
};

const ProgressBar = ({ level }) => {
  // Create ASCII style bar: [########..]
  const total = 20;
  const filled = Math.floor((level / 100) * total);
  
  return (
    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-green-500/80">
      <span>[</span>
      <div className="flex">
        {[...Array(total)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.02 }}
            className={`${i < filled ? 'text-green-400' : 'text-gray-800'}`}
          >
            {i < filled ? '█' : '/'}
          </motion.span>
        ))}
      </div>
      <span>] {level}%</span>
    </div>
  );
};

// --- SECTIONS ---

const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a]/90 border-b border-green-900/30 backdrop-blur-sm font-mono text-xs md:text-sm">
    <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center text-green-500">
      <div className="flex items-center gap-2">
        <Terminal size={16} />
        <span>root@alex-cv:~</span>
      </div>
      <div className="flex gap-6">
        {['SYSTEM', 'LOGS', 'EXECUTABLES', 'COMMS'].map((item, i) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hidden md:block hover:text-green-300 hover:underline decoration-green-500/50 underline-offset-4 transition-all">
            ./{item}
          </a>
        ))}
        <span className="animate-pulse text-green-400">● REC</span>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  return (
    <section id="system" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 font-mono">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="order-2 md:order-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-500/60 mb-4 text-sm"
          >
            &gt; INITIALIZING USER PROFILE...
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-2 tracking-tighter">
            <GlitchText text={PROFILE.name} />
          </h1>
          
          <div className="text-xl md:text-2xl text-green-600 mb-8 border-l-2 border-green-800 pl-4">
             &gt; <span className="text-green-300">{PROFILE.role}</span>
          </div>

          <div className="bg-black/50 border border-green-900/50 p-6 rounded-sm mb-10 backdrop-blur-sm shadow-[0_0_30px_rgba(0,255,0,0.05)]">
            <div className="flex gap-2 mb-4 text-xs text-gray-500 border-b border-gray-800 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-auto">bio.txt</span>
            </div>
            <p className="text-green-300/90 leading-relaxed">
              <Typewriter text={PROFILE.bio} delay={500} speed={30} />
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-green-900/20 border border-green-500/50 text-green-400 hover:bg-green-500/20 hover:border-green-400 transition-all flex items-center gap-2 group">
              <Command size={18} />
              <span>EXECUTE_CONTACT</span>
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">&gt;_</span>
            </button>
            <button className="px-6 py-3 bg-transparent border border-gray-700 text-gray-400 hover:text-green-300 hover:border-green-500/30 transition-all flex items-center gap-2">
              <Download size={18} />
              <span>DOWNLOAD_RESUME.PDF</span>
            </button>
          </div>
        </div>

        {/* Cyber Avatar */}
        <div className="order-1 md:order-2 flex justify-center relative">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
             {/* Rotating HUD Rings */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-[-20px] rounded-full border border-dashed border-green-500/20"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="absolute inset-[-40px] rounded-full border-t border-b border-green-500/10"
             />
             
             {/* Hexagon Clip for Avatar */}
             <div className="relative w-full h-full bg-black border-2 border-green-500/50 overflow-hidden shadow-[0_0_50px_rgba(0,255,0,0.2)] group">
                <div className="absolute inset-0 bg-green-500/10 z-10 mix-blend-overlay pointer-events-none group-hover:bg-transparent transition-all"></div>
                <img 
                  src={PROFILE.avatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                />
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400"></div>
             </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
           <ChevronDown className="text-green-500/50" />
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => (
  <section className="py-24 bg-[#080808] relative border-t border-green-900/20 font-mono">
    <div className="max-w-6xl mx-auto px-6">
      <div className="mb-12 border-b border-green-900/30 pb-4 flex items-end justify-between">
        <h2 className="text-2xl text-green-400 flex items-center gap-2">
          <Hash size={20} /> SYSTEM_DIAGNOSTICS
        </h2>
        <span className="text-xs text-green-700">v2.4.0</span>
      </div>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
        {SKILLS.map((skill, idx) => (
          <div key={idx} className="group">
            <div className="flex justify-between text-sm text-green-300 mb-1 group-hover:text-white transition-colors">
              <span className="flex items-center gap-2">
                <skill.icon size={14} /> {skill.name}
              </span>
              <span className="opacity-0 group-hover:opacity-100 text-xs">&gt; CHECKING... OK</span>
            </div>
            <ProgressBar level={skill.level} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="logs" className="py-24 bg-black relative font-mono">
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-2xl text-green-400 mb-12 flex items-center gap-2 border-b border-green-900/30 pb-4">
        <Database size={20} /> /var/log/experience.log
      </h2>

      <div className="space-y-8">
        {EXPERIENCE.map((job) => (
          <div key={job.id} className="relative pl-6 border-l border-green-900/50 hover:border-green-500 transition-colors group">
            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-black border border-green-600 group-hover:bg-green-500 transition-colors" />
            
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
              <h3 className="text-lg text-green-300 font-bold group-hover:text-green-100">
                root@{job.company}:~# {job.role}
              </h3>
              <span className="text-xs text-gray-500 font-mono">[{job.period}]</span>
            </div>

            <div className="bg-[#0c0c0c] p-4 rounded border border-green-900/20 group-hover:border-green-500/30 transition-all">
              <p className="text-sm text-gray-400 leading-relaxed mb-3">
                <span className="text-green-600 mr-2">&gt;</span>
                {job.log}
              </p>
              <div className="flex gap-2 mt-3">
                {job.tech.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-1 bg-green-900/20 text-green-400 border border-green-900/30">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="executables" className="py-24 bg-[#080808] font-mono border-t border-green-900/20">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-2xl text-green-400 mb-12 flex items-center gap-2">
        <Cpu size={20} /> EXECUTABLE_MODULES
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {PROJECTS.map((proj, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-black border border-green-900/40 p-6 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(0,255,0,0.1)] transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
               <Layout className="text-green-600" size={24} />
               <div className={`text-[10px] px-2 py-0.5 border ${proj.status === 'RUNNING' ? 'border-green-500 text-green-500 animate-pulse' : 'border-gray-700 text-gray-500'}`}>
                 {proj.status}
               </div>
            </div>
            
            <h3 className={`text-xl font-bold mb-2 ${proj.color} group-hover:underline decoration-dashed underline-offset-4`}>
              ./{proj.title}
            </h3>
            
            <p className="text-xs text-gray-400 mb-6 h-10">
              {proj.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
               {proj.tags.map(tag => (
                 <span key={tag} className="text-[10px] text-gray-500">#{tag}</span>
               ))}
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-900">
              <a href="#" className="text-xs text-green-500 hover:text-white flex items-center gap-1">
                <Github size={12} /> SOURCE
              </a>
              <a href="#" className="text-xs text-green-500 hover:text-white flex items-center gap-1">
                <ExternalLink size={12} /> DEPLOY
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="comms" className="py-24 bg-black relative font-mono text-center overflow-hidden">
     {/* Grid Overlay */}
     <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

     <div className="max-w-2xl mx-auto px-6 relative z-10">
       <div className="inline-block border border-green-500/30 px-4 py-1 text-xs text-green-400 mb-6 bg-green-900/10 rounded-full">
         SIGNAL_STRENGTH: 100%
       </div>
       
       <h2 className="text-4xl font-bold text-white mb-6">
         INITIATE_HANDSHAKE<span className="animate-pulse text-green-500">_</span>
       </h2>
       
       <p className="text-gray-400 mb-10 max-w-lg mx-auto">
         Target coordinates acquired. Establishing secure connection channel for project inquiries and collaboration requests.
       </p>

       <button className="px-10 py-4 bg-green-600 text-black font-bold hover:bg-green-400 hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,255,0,0.4)] clip-path-polygon">
         SEND_TRANSMISSION
       </button>
     </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#050505] border-t border-green-900/30 py-8 text-center font-mono text-xs text-green-800/60">
    <div className="flex justify-center gap-4 mb-4">
      <Github className="hover:text-green-500 cursor-pointer transition-colors" size={16} />
      <Linkedin className="hover:text-green-500 cursor-pointer transition-colors" size={16} />
      <Twitter className="hover:text-green-500 cursor-pointer transition-colors" size={16} />
    </div>
    <p>&copy; 2024 ALEX_STREAM // TERMINAL_UI_VER_3.0</p>
    <p className="mt-2">NO_BUGS_DETECTED</p>
  </footer>
);

// --- MAIN APP ---

export default function CV() {
  return (
    <div className="bg-black min-h-screen text-gray-300 selection:bg-green-500/30 selection:text-green-200">
      <Scanline />
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}