import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Plus, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  room: string;
  condition: string;
  acuity: 'Critical' | 'Urgent' | 'Stable';
  vitals: { hr: number; bp: string; temp: string };
  lastChecked: string;
}

const initialPatients: Patient[] = [
  {
    id: 'P-302',
    name: 'Eleanor Vance',
    room: 'Ward 3, Room 302-A',
    condition: 'Post-op Cardiac Bypass recovery',
    acuity: 'Critical',
    vitals: { hr: 112, bp: '145/95', temp: '99.1°F' },
    lastChecked: '42m ago'
  },
  {
    id: 'P-104',
    name: 'Marcus Brody',
    room: 'Ward 1, Room 104-B',
    condition: 'Acute respiratory distress monitoring',
    acuity: 'Urgent',
    vitals: { hr: 94, bp: '130/82', temp: '101.4°F' },
    lastChecked: '15m ago'
  },
  {
    id: 'P-208',
    name: 'Clara Oswald',
    room: 'Ward 2, Room 208-A',
    condition: 'Scheduled observation post-seizure',
    acuity: 'Stable',
    vitals: { hr: 72, bp: '118/75', temp: '98.6°F' },
    lastChecked: '1h 10m ago'
  }
];

export default function HSCPlaygrounds() {
  const [activeTab, setActiveTab ] = useState<'acuity' | 'gestures' | 'timeline'>('acuity');
  
  // Tab 1 state
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [acuityFilter, setAcuityFilter] = useState<'All' | 'Critical' | 'Urgent' | 'Stable'>('All');
  
  // Tab 2 state
  const [selectedPatient, setSelectedPatient] = useState<Patient>(initialPatients[0]);
  const [newHR, setNewHR] = useState<number>(112);
  const [swipeProgress, setSwipeProgress] = useState<number>(0);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    '07:30 - Standard double-signoff completed',
    '08:15 - Eleanor Vance vital review triggered'
  ]);

  // Tab 3 state
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0);
  const timelineSteps = [
    {
      time: '07:00 AM',
      title: 'Shift Change Briefing',
      desc: 'Ward 3 handoff received. Night staff flagged Eleanor Vance (Room 302-A) due to rising heart rates and border-line tachycardia.',
      metric: '0 discrepancies logged'
    },
    {
      time: '08:12 AM',
      title: 'Vital Sign Logging',
      desc: 'Vitals taken using glove-friendly direct input interface. Fast-tracked validation bypass and immediate local storage commit.',
      metric: '42% time saved'
    },
    {
      time: '11:30 AM',
      title: 'Physician Review Sync',
      desc: 'Continuous chart export compiled programmatically. Doctor reviews heart rate trends directly on the dashboard screen.',
      metric: '<1 min review latency'
    }
  ];

  const handleAdjustVital = (amount: number) => {
    setIsLogged(false);
    setSwipeProgress(0);
    setNewHR(prev => Math.max(60, Math.min(180, prev + amount)));
  };

  const executeSwipeLog = () => {
    setSwipeProgress(100);
    setIsLogged(true);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [
      `${timeStr} - Vital logged for ${selectedPatient.name} (HR: ${newHR} bpm)`,
      ...prev
    ]);
    
    // Update local patient instance
    setPatients(prev => 
      prev.map(p => p.id === selectedPatient.id ? { ...p, vitals: { ...p.vitals, hr: newHR }, lastChecked: 'Just now' } : p)
    );
  };

  return (
    <div className="w-full bg-[#111111] border border-neutral-800/80 rounded-xl overflow-hidden shadow-2xl font-sans mt-12">
      
      {/* HUD Header */}
      <div className="border-b border-neutral-800/95 bg-neutral-950 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#E11D48] animate-pulse" />
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#999999] font-semibold">Interactive Spatial Prototyping</h3>
            <p className="text-xs text-neutral-400 font-light mt-0.5 font-mono">HEALTHY_SYNC // WARD_3_TERMINAL_EMULATION</p>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border border-neutral-800 p-1 rounded-lg bg-neutral-900 self-start sm:self-center">
          <button
            onClick={() => setActiveTab('acuity')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeTab === 'acuity' ? 'bg-[#3B6FD6] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            01 / Acuity Sorter
          </button>
          <button
            onClick={() => setActiveTab('gestures')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeTab === 'gestures' ? 'bg-[#3B6FD6] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            02 / Tactile Logs
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeTab === 'timeline' ? 'bg-[#3B6FD6] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            03 / Shift Handoff
          </button>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[460px]">
        
        {/* LEFT COLUMN: INTERACTIVE DEMO (COL-8) */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          
          {/* TAB 1: ACUITY SORTER */}
          {activeTab === 'acuity' && (
            <div className="space-y-6 w-full">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-light text-neutral-400 uppercase tracking-widest">Active Ward Roster</h4>
                  <p className="text-xs text-neutral-500 font-light">Sorted dynamically using real-time vital stress metrics</p>
                </div>
                
                {/* Filters */}
                <div className="flex gap-1.5 bg-neutral-950 p-1 border border-neutral-800 rounded-lg">
                  {['All', 'Critical', 'Urgent', 'Stable'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setAcuityFilter(filter as any)}
                      className={`px-2.5 py-1 text-[10px] rounded cursor-pointer transition-all ${
                        acuityFilter === filter ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roster Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {patients
                  .filter(p => acuityFilter === 'All' || p.acuity === acuityFilter)
                  .map(p => {
                    const isCritical = p.acuity === 'Critical';
                    const isUrgent = p.acuity === 'Urgent';
                    const borderColor = isCritical 
                      ? 'border-[#E11D48]/80 shadow-[0_0_12px_rgba(225,29,72,0.12)]' 
                      : isUrgent 
                      ? 'border-[#F59E0B]/60' 
                      : 'border-neutral-800';

                    return (
                      <motion.div
                        layout
                        key={p.id}
                        className={`bg-neutral-950 border p-4 rounded-lg flex flex-col justify-between h-[170px] transition-all relative group ${borderColor}`}
                      >
                        {/* Vital Indicator Glow Dot */}
                        <div className="absolute top-4 right-4 flex items-center gap-1.5">
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            isCritical ? 'bg-[#E11D48] animate-ping' : isUrgent ? 'bg-[#F59E0B]' : 'bg-[#10B981]'
                          }`} />
                          <span className="text-[9px] font-mono tracking-wider font-semibold uppercase text-neutral-400">
                            {p.acuity}
                          </span>
                        </div>

                        <div>
                          <div className="text-[10px] font-mono text-neutral-500 mb-1">{p.room}</div>
                          <h5 className="font-medium text-sm text-white group-hover:text-[#3B6FD6] transition-colors">{p.name}</h5>
                          <p className="text-[11px] text-neutral-400 font-light leading-normal line-clamp-2 mt-1">{p.condition}</p>
                        </div>

                        {/* Vitals HUD Footer inside Card */}
                        <div className="pt-2 border-t border-neutral-900 flex justify-between items-center text-xs font-mono">
                          <div className="flex flex-col">
                            <span className="text-[8px] text-neutral-500">PULSE</span>
                            <span className={isCritical ? 'text-[#E11D48] font-bold' : 'text-white'}>{p.vitals.hr} bpm</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[8px] text-neutral-500 block">CHECKED</span>
                            <span className="text-[10px] text-neutral-300 font-light">{p.lastChecked}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>

              {/* Simulation Helper message */}
              <div className="p-3 bg-neutral-900/65 border border-neutral-800 rounded text-[11px] text-neutral-400 font-light leading-relaxed">
                <span className="text-[#3B6FD6] font-medium">Design Insight</span>: By using visual Acuity-Driven priority states, nurses immediately spot critical fluctuations under intense fluorescent corridor glare. High-acuity patients automatically sit at the top of the interface grids.
              </div>
            </div>
          )}

          {/* TAB 2: TACTILE GESTURES */}
          {activeTab === 'gestures' && (
            <div className="space-y-6 w-full">
              <div>
                <h4 className="text-sm font-light text-neutral-400 uppercase tracking-widest">Tactile Vital Entry Panel</h4>
                <p className="text-xs text-neutral-500 font-light">Emulating double-size glove-friendly inputs to prevent error vectors</p>
              </div>

              {/* Simulator Deck */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Mobile Tablet View Simulator */}
                <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-lg space-y-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Active Patient</span>
                      <h5 className="text-sm font-medium text-white">{selectedPatient.name}</h5>
                    </div>
                    <span className="text-[10px] bg-red-950 border border-red-800/60 text-[#E11D48] px-2 py-0.5 rounded font-mono">
                      TACHYCARDIA SUSPECTED
                    </span>
                  </div>

                  {/* Gigantic Entry Box */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex flex-col items-center justify-center relative py-6">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-mono absolute top-2 left-3">HEART RATE ENTRY</span>
                    
                    <div className="flex items-center gap-6 mt-2">
                      <button
                        onClick={() => handleAdjustVital(-5)}
                        className="w-12 h-12 bg-neutral-800 hover:bg-neutral-700 active:scale-95 transition-all text-white rounded-full flex items-center justify-center text-xl font-bold cursor-pointer focus:outline-none"
                      >
                        -5
                      </button>

                      <div className="text-center">
                        <span className="text-4xl font-mono text-white font-semibold">{newHR}</span>
                        <span className="text-xs text-neutral-500 block mt-1">BPM</span>
                      </div>

                      <button
                        onClick={() => handleAdjustVital(5)}
                        className="w-12 h-12 bg-neutral-800 hover:bg-neutral-700 active:scale-95 transition-all text-white rounded-full flex items-center justify-center text-xl font-bold cursor-pointer focus:outline-none"
                      >
                        +5
                      </button>
                    </div>
                  </div>

                  {/* Tactile Log Swipe Slide Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                      <span>SLIDE TO COMMIT GESTURE</span>
                      <span>{isLogged ? '100% COMPLETE' : '0% READY'}</span>
                    </div>

                    {!isLogged ? (
                      <div className="w-full h-12 bg-neutral-950 border border-neutral-800 rounded-full relative flex items-center p-1 group overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="text-[10px] font-mono text-neutral-600 tracking-wider font-semibold animate-pulse">
                            SWIPE RIGHT TO COMMIT TO CHART
                          </span>
                        </div>
                        <motion.div
                          drag="x"
                          dragConstraints={{ left: 0, right: 200 }}
                          onDragEnd={(e, info) => {
                            if (info.offset.x > 140) {
                              executeSwipeLog();
                            } else {
                              setSwipeProgress(0);
                            }
                          }}
                          style={{ x: swipeProgress }}
                          className="w-10 h-10 bg-[#3B6FD6] hover:bg-[#3B6FD6]/90 transition-colors cursor-grab active:cursor-grabbing rounded-full flex items-center justify-center text-white"
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </div>
                    ) : (
                      <div className="w-full h-12 bg-emerald-950/60 border border-emerald-800/50 rounded-full flex items-center justify-between px-4 transition-all animate-pulse">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-[#10B981]">
                          <CheckCircle2 size={14} />
                          <span>CHART COMMITTED SECURELY</span>
                        </div>
                        <button
                          onClick={() => {
                            setIsLogged(false);
                            setSwipeProgress(0);
                          }}
                          className="text-[10px] underline font-mono text-[#10B981] hover:text-white cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Patient Context Details */}
                <div className="space-y-4">
                  <div className="border border-neutral-800 bg-neutral-950 p-4 rounded-lg text-xs leading-normal font-light text-neutral-400 space-y-2">
                    <h6 className="text-[#3B6FD6] font-mono uppercase tracking-wider text-[10px] font-bold">Why Swipe Gestures?</h6>
                    <p>
                      In high-stress emergency departments, nurses logging vitals on lagging screens are vulnerable to accidental dual-tap triggers. By engineering a custom <strong>Slide-to-Commit</strong> pattern, we completely eliminated safety discrepancies and clinical charting mistaps.
                    </p>
                    <p className="font-mono text-[10px] text-neutral-500 pt-2 border-t border-neutral-900">
                      Touch Boundary: 48px X 48px // Friction Coefficient: Dampened
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SHIFT TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-6 w-full">
              <div>
                <h4 className="text-sm font-light text-neutral-400 uppercase tracking-widest font-sans">shift timeline handoff</h4>
                <p className="text-xs text-neutral-500 font-light">Replacing clinical documentation drift with chronological overview feeds</p>
              </div>

              {/* Timeline interactive dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Steps left side (3 lines) */}
                <div className="md:col-span-4 space-y-2">
                  {timelineSteps.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTimelineStep(idx)}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                        activeTimelineStep === idx 
                          ? 'bg-neutral-950 border-[#3B6FD6] text-white shadow-md' 
                          : 'bg-[#111111] border-neutral-800 text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      <div className="text-[9px] font-mono mb-1">{step.time}</div>
                      <h5 className="text-xs font-semibold uppercase tracking-wider">{step.title}</h5>
                    </button>
                  ))}
                </div>

                {/* Step display box */}
                <div className="md:col-span-8 bg-neutral-950 border border-neutral-800 p-5 rounded-lg space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-neutral-900 pb-2">
                    <span className="text-[#3B6FD6]">STAGE // 0{activeTimelineStep + 1}</span>
                    <span className="text-emerald-400 font-medium">{timelineSteps[activeTimelineStep].metric}</span>
                  </div>

                  <p className="text-sm sm:text-base font-light leading-relaxed text-neutral-200">
                    {timelineSteps[activeTimelineStep].desc}
                  </p>

                  <div className="flex items-center gap-1.5 p-2 bg-neutral-900 rounded text-[10px] text-neutral-500 font-mono">
                    <Activity size={10} className="text-[#3B6FD6]" />
                    <span>TIMELINE ENGINE DEPLOYED AND SYNCED</span>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: TECHNICAL TELEMETRY PANEL (COL-4) */}
        <div className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l border-neutral-800/80 pt-6 lg:pt-0 lg:pl-6 font-mono text-xs text-neutral-400">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="block h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider font-sans text-neutral-400">TELEMETRY DECK</span>
            </div>

            {/* Simulated Live Chart / Stats Table */}
            <div className="bg-neutral-950 border border-neutral-800/80 p-4 rounded-lg space-y-3">
              <div className="flex justify-between text-[10px] text-neutral-500 border-b border-neutral-900 pb-1.5">
                <span>METRIC</span>
                <span className="text-right font-bold text-white">VALUE</span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Time-to-Chart</span>
                <span className="text-emerald-400 font-medium">-42%</span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Doc. Errors</span>
                <span className="text-white">0 incidents</span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Adoption Rate</span>
                <span className="text-[#3B6FD6] font-bold">94.3%</span>
              </div>

              <div className="flex justify-between border-t border-neutral-900 pt-1.5 text-[9px] text-neutral-500">
                <span>EST. SAVINGS</span>
                <span className="text-right text-neutral-300">45M MIN/SHIFT</span>
              </div>
            </div>

            {/* Live simulation logs */}
            <div className="space-y-2">
              <span className="text-[10px] text-neutral-500 uppercase font-semibold">Activity Ledger</span>
              <div className="bg-neutral-950 border border-neutral-800/80 rounded-lg p-3 h-[180px] overflow-y-auto space-y-3 font-mono text-[10px] text-neutral-400 select-none">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2 items-start leading-snug">
                    <span className="text-neutral-600 font-bold">➔</span>
                    <p>{log}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset Roster Button */}
            <button
              onClick={() => {
                setPatients(initialPatients);
                setNewHR(112);
                setIsLogged(false);
                setSwipeProgress(0);
                setLogs([
                  '07:30 - Standard double-signoff completed',
                  '08:15 - Eleanor Vance vital review triggered'
                ]);
              }}
              className="w-full py-2 border border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-neutral-400 text-[10.5px] hover:text-white uppercase transition-all rounded font-sans tracking-widest font-semibold flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
            >
              <RefreshCw size={11} className="text-[#3B6FD6]" />
              <span>Reset Simulations</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
