import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code2, 
  Sparkles, Languages, Edit, Send, ArrowLeft, CheckCircle2, 
  XCircle, AlertCircle, Plus, Trash2, Calendar, Building, Building2, FileText, Info
} from 'lucide-react';
import Modal from './Modal';
// no confetti import

const PreviewSection = ({ data, updateData, onPrev, onReset }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [tempData, setTempData] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [responseMessage, setResponseMessage] = useState('');
  const [submittedId, setSubmittedId] = useState('');
  // no loadingStage hook

  const [validationError, setValidationError] = useState('');
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');
  const [langInput, setLangInput] = useState('');

  // Opens the edit modal and creates a deep copy of current data
  const openEditModal = (type) => {
    setTempData(JSON.parse(JSON.stringify(data)));
    setActiveModal(type);
    setValidationError('');
  };

  const handleModalClose = () => {
    setActiveModal(null);
    setValidationError('');
  };

  const handleModalSave = (e) => {
    e.preventDefault();
    
    // Modal validations
    if (activeModal === 'basic') {
      if (!tempData.fullName?.trim() || !tempData.email?.trim() || !tempData.phone?.trim() || !tempData.title?.trim()) {
        setValidationError('Full Name, Email, Phone, and Title are required.');
        return;
      }
    } else if (activeModal === 'education') {
      if (!tempData.education || tempData.education.length === 0) {
        setValidationError('At least one education record is required.');
        return;
      }
      const invalid = tempData.education.some(
        (edu) => !edu.institution?.trim() || !edu.degree?.trim() || !edu.passingYear?.trim()
      );
      if (invalid) {
        setValidationError('Please fill out Institution, Degree, and Passing Year for all education entries.');
        return;
      }
    }

    updateData(tempData);
    setActiveModal(null);
  };

// no triggerConfetti definition

  // Submit profile to MongoDB
  const submitToMongoDB = async () => {
    setSubmitStatus('loading');
    setResponseMessage('');

    try {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: submittedId || data.id || undefined, // Update existing profile if ID exists
          ...data
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setResponseMessage(result.message || 'Profile saved successfully!');
        if (result.data && result.data._id) {
          setSubmittedId(result.data._id);
        }
      } else {
        setSubmitStatus('error');
        setResponseMessage(result.message || 'Server returned an error.');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setResponseMessage('Unable to connect to the backend server. Make sure it is running.');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="w-full max-w-xl mx-auto bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 text-center shadow-2xl animate-slide-up space-y-6">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
          <div className="relative w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 animate-slide-in">
            <CheckCircle2 className="w-10 h-10" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-3.5xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent tracking-tight">
            Form Submitted
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Your professional portfolio details have been successfully written to MongoDB Atlas.
          </p>
        </div>


        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 border-t border-slate-850/60">
          <button
            onClick={() => setSubmitStatus('idle')}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Review Profile
          </button>
          {onReset && (
            <button
              onClick={() => {
                setSubmittedId('');
                setSubmitStatus('idle');
                setResponseMessage('');
                onReset();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold rounded-lg shadow-lg hover:shadow-indigo-500/25 active:scale-98 transition-all cursor-pointer"
            >
              Create New Response
            </button>
          )}
        </div>
      </div>
    );
  }

  if (submitStatus === 'error') {
    return (
      <div className="w-full max-w-xl mx-auto bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 text-center shadow-2xl animate-slide-up space-y-6">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 bg-pink-500/20 rounded-full animate-ping" />
          <div className="relative w-20 h-20 bg-pink-500/10 border border-pink-500/30 rounded-full flex items-center justify-center text-pink-400">
            <XCircle className="w-10 h-10" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-3.5xl font-extrabold bg-gradient-to-r from-pink-450 to-red-400 bg-clip-text text-transparent tracking-tight">
            Submission Failed
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            {responseMessage}
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-4 border-t border-slate-850/60">
          <button
            onClick={() => setSubmitStatus('idle')}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-650 text-white text-xs font-semibold rounded-lg shadow-lg active:scale-98 cursor-pointer transition-colors"
          >
            Review & Edit Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-slide-up">
      {/* Loading Overlay */}
      {submitStatus === 'loading' && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-fade-in submit-overlay">
          <div className="text-center space-y-6 max-w-sm mx-auto">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-indigo-500/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-purple-500 rounded-full animate-spin" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-200">Submitting Profile Data...</h3>
            </div>
          </div>
        </div>
      )}

      {/* Main Resume Sheet */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/85 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        {/* Header Block */}
        <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-indigo-950/40 to-slate-900/20 border-b border-slate-800/60 relative group">
          <button
            onClick={() => openEditModal('basic')}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-slate-850 hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 text-slate-400 hover:text-white rounded-lg transition-all shadow-md cursor-pointer"
            title="Edit Header Section"
          >
            <Edit className="w-4 h-4" />
          </button>

          <div className="w-full space-y-3.5 text-left">
            <div>
              <h1 className="text-2xl md:text-3.5xl font-bold text-slate-100 tracking-tight">
                {data.fullName || 'Full Name'}
              </h1>
              <p className="text-indigo-400 font-semibold text-sm md:text-base mt-1">
                {data.title || 'Professional Title'}
              </p>
            </div>

            {/* Contacts info row */}
            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-400 w-full min-w-0">
              <span className="flex items-center gap-1.5 min-w-0 break-all">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" /> {data.email || 'email@example.com'}
              </span>
              <span className="flex items-center gap-1.5 min-w-0 break-all">
                <Phone className="w-4 h-4 text-indigo-500 shrink-0" /> {data.phone || '+91 99999 99999'}
              </span>
              {data.location && (
                <span className="flex items-center gap-1.5 min-w-0 break-all">
                  <MapPin className="w-4 h-4 text-indigo-500 shrink-0" /> {data.location}
                </span>
              )}
            </div>

            {/* Bio summary */}
            {data.bio && (
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-3xl pt-2.5 border-t border-slate-800/40">
                {data.bio}
              </p>
            )}
          </div>
        </div>

        {/* Dynamic content grid */}
        <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Education & Experience (2 cols) */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Experience Block */}
            <div className="relative group">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800/60">
                <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-400" /> Professional Experience
                </h2>
                <button
                  onClick={() => openEditModal('experience')}
                  className="p-1.5 bg-slate-950/40 hover:bg-indigo-600 text-slate-500 hover:text-white border border-slate-850 hover:border-indigo-500 rounded-md transition-all cursor-pointer"
                  title="Edit Experience"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
              </div>

              {(!data.experience || data.experience.length === 0) ? (
                <p className="text-slate-500 text-sm italic">Fresher / No prior experience listed.</p>
              ) : (
                <div className="space-y-4">
                  {data.experience.map((exp, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <h3 className="font-semibold text-slate-300 text-sm md:text-base">
                          {exp.role} <span className="text-indigo-400">@ {exp.company}</span>
                        </h3>
                        <span className="text-xs text-slate-500 font-medium">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed whitespace-pre-line pl-1.5 border-l border-slate-800">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Education Block */}
            <div className="relative group">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800/60">
                <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-400" /> Education
                </h2>
                <button
                  onClick={() => openEditModal('education')}
                  className="p-1.5 bg-slate-950/40 hover:bg-indigo-600 text-slate-500 hover:text-white border border-slate-850 hover:border-indigo-500 rounded-md transition-all cursor-pointer"
                  title="Edit Education"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
              </div>

              {(!data.education || data.education.length === 0) ? (
                <p className="text-slate-500 text-sm italic">No education details listed.</p>
              ) : (
                <div className="space-y-4">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <h3 className="font-semibold text-slate-300 text-sm">
                          {edu.degree}
                        </h3>
                        <span className="text-xs text-slate-500 font-medium">{edu.passingYear}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-400">
                        <span>{edu.institution}</span>
                        {edu.grade && (
                          <span className="bg-indigo-500/10 px-2 py-0.5 rounded text-indigo-400">
                            Grade: {edu.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Skills & Languages (1 col) */}
          <div className="space-y-6">
            <div className="relative group p-4 bg-slate-950/40 border border-slate-850 rounded-xl space-y-6">
              
              <button
                onClick={() => openEditModal('basic')}
                className="absolute top-4 right-4 p-1.5 bg-slate-950/40 hover:bg-indigo-600 text-slate-500 hover:text-white border border-slate-850 hover:border-indigo-500 rounded-md transition-all cursor-pointer"
                title="Edit Skills & Languages"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>

              {/* Technical Skills */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" /> Technical Skills
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.technicalSkills && data.technicalSkills.length > 0 ? (
                    data.technicalSkills.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded font-semibold">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-600 text-xs italic">None listed</span>
                  )}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Soft Skills
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.softSkills && data.softSkills.length > 0 ? (
                    data.softSkills.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs rounded font-semibold">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-600 text-xs italic">None listed</span>
                  )}
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-indigo-400" /> Languages
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.languages && data.languages.length > 0 ? (
                    data.languages.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs rounded font-semibold">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-600 text-xs italic">None listed</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-slate-850 mt-8">
        <button
          onClick={onPrev}
          type="button"
          className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-850 hover:bg-slate-950/40 text-slate-400 hover:text-slate-300 text-sm font-medium rounded-lg transition-colors cursor-pointer w-full sm:w-auto text-center"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Education
        </button>

        <button
          onClick={submitToMongoDB}
          disabled={submitStatus === 'loading'}
          className={`
            flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-150 active:scale-98 shadow-xl cursor-pointer w-full sm:w-auto
            ${submitStatus === 'loading' 
              ? 'bg-slate-800 border border-slate-700 text-slate-400 cursor-not-allowed shadow-none' 
              : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 shadow-indigo-500/10 hover:shadow-purple-500/20'
            }
          `}
        >
          {submitStatus === 'loading' ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving to database...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Submit
            </>
          )}
        </button>
      </div>

      {/* ================= EDIT POP-UP MODALS ================= */}

      {/* 1. BASIC INFORMATION EDIT MODAL */}
      <Modal isOpen={activeModal === 'basic'} onClose={handleModalClose} title="Edit Basic Information">
        <form onSubmit={handleModalSave} className="space-y-5">
          {validationError && (
            <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-500 text-xs flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {validationError}
            </div>
          )}

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  value={tempData.fullName || ''}
                  onChange={(e) => setTempData({ ...tempData, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1">Professional Title *</label>
                <input
                  type="text"
                  value={tempData.title || ''}
                  onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  value={tempData.email || ''}
                  onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1">Phone Number *</label>
                <input
                  type="text"
                  value={tempData.phone || ''}
                  onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1">Location</label>
              <input
                type="text"
                value={tempData.location || ''}
                onChange={(e) => setTempData({ ...tempData, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1">Bio / Summary</label>
              <textarea
                value={tempData.bio || ''}
                onChange={(e) => setTempData({ ...tempData, bio: e.target.value })}
                rows="3"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Skills & Languages Editing Integration */}
            <div className="pt-4 border-t border-slate-850 space-y-4">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Skills & Languages</h4>

              {/* Technical Skills */}
              <div className="space-y-2">
                <label className="block text-slate-400 text-xs font-semibold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" /> Technical Skills
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = techInput.trim();
                        if (val) {
                          const list = tempData.technicalSkills || [];
                          if (!list.includes(val)) {
                            setTempData({ ...tempData, technicalSkills: [...list, val] });
                          }
                          setTechInput('');
                        }
                      }
                    }}
                    placeholder="Type and press Enter or Add"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const val = techInput.trim();
                      if (val) {
                        const list = tempData.technicalSkills || [];
                        if (!list.includes(val)) {
                          setTempData({ ...tempData, technicalSkills: [...list, val] });
                        }
                        setTechInput('');
                      }
                    }}
                    className="p-1.5 bg-indigo-650 text-white rounded text-xs px-3 font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(tempData.technicalSkills || []).map((skill, idx) => (
                    <span key={idx} className="flex items-center gap-1 px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded">
                      {skill}
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...tempData.technicalSkills];
                          list.splice(idx, 1);
                          setTempData({ ...tempData, technicalSkills: list });
                        }}
                        className="hover:text-pink-500 ml-1 text-[10px] cursor-pointer"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="space-y-2">
                <label className="block text-slate-400 text-xs font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Soft Skills
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={softInput}
                    onChange={(e) => setSoftInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = softInput.trim();
                        if (val) {
                          const list = tempData.softSkills || [];
                          if (!list.includes(val)) {
                            setTempData({ ...tempData, softSkills: [...list, val] });
                          }
                          setSoftInput('');
                        }
                      }
                    }}
                    placeholder="Type and press Enter or Add"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const val = softInput.trim();
                      if (val) {
                        const list = tempData.softSkills || [];
                        if (!list.includes(val)) {
                          setTempData({ ...tempData, softSkills: [...list, val] });
                        }
                        setSoftInput('');
                      }
                    }}
                    className="p-1.5 bg-indigo-650 text-white rounded text-xs px-3 font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(tempData.softSkills || []).map((skill, idx) => (
                    <span key={idx} className="flex items-center gap-1 px-2.5 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs rounded">
                      {skill}
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...tempData.softSkills];
                          list.splice(idx, 1);
                          setTempData({ ...tempData, softSkills: list });
                        }}
                        className="hover:text-pink-500 ml-1 text-[10px] cursor-pointer"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <label className="block text-slate-400 text-xs font-semibold flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-indigo-400" /> Languages
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={langInput}
                    onChange={(e) => setLangInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = langInput.trim();
                        if (val) {
                          const list = tempData.languages || [];
                          if (!list.includes(val)) {
                            setTempData({ ...tempData, languages: [...list, val] });
                          }
                          setLangInput('');
                        }
                      }
                    }}
                    placeholder="Type and press Enter or Add"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const val = langInput.trim();
                      if (val) {
                        const list = tempData.languages || [];
                        if (!list.includes(val)) {
                          setTempData({ ...tempData, languages: [...list, val] });
                        }
                        setLangInput('');
                      }
                    }}
                    className="p-1.5 bg-indigo-650 text-white rounded text-xs px-3 font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(tempData.languages || []).map((lang, idx) => (
                    <span key={idx} className="flex items-center gap-1 px-2.5 py-0.5 bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs rounded">
                      {lang}
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...tempData.languages];
                          list.splice(idx, 1);
                          setTempData({ ...tempData, languages: list });
                        }}
                        className="hover:text-pink-500 ml-1 text-[10px] cursor-pointer"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-slate-300 text-xs font-semibold rounded-lg cursor-pointer w-full sm:w-auto text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg cursor-pointer w-full sm:w-auto text-center"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* 2. EXPERIENCE EDIT MODAL */}
      <Modal isOpen={activeModal === 'experience'} onClose={handleModalClose} title="Edit Professional Experience">
        <form onSubmit={handleModalSave} className="space-y-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                const list = tempData.experience || [];
                setTempData({
                  ...tempData,
                  experience: [...list, { company: '', role: '', startDate: '', endDate: '', description: '' }]
                });
              }}
              className="flex items-center gap-1 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs rounded-md"
            >
              <Plus className="w-3 h-3" /> Add Job
            </button>
          </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {(!tempData.experience || tempData.experience.length === 0) ? (
              <p className="text-slate-500 text-xs text-center py-4">No jobs listed. Add one or save.</p>
            ) : (
              tempData.experience.map((exp, idx) => (
                <div key={idx} className="relative p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      const list = [...tempData.experience];
                      list.splice(idx, 1);
                      setTempData({ ...tempData, experience: list });
                    }}
                    className="absolute top-2 right-2 text-slate-500 hover:text-pink-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-500 text-[10px] uppercase font-semibold mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company || ''}
                        onChange={(e) => {
                          const list = [...tempData.experience];
                          list[idx].company = e.target.value;
                          setTempData({ ...tempData, experience: list });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px] uppercase font-semibold mb-1">Role</label>
                      <input
                        type="text"
                        value={exp.role || ''}
                        onChange={(e) => {
                          const list = [...tempData.experience];
                          list[idx].role = e.target.value;
                          setTempData({ ...tempData, experience: list });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-500 text-[10px] uppercase font-semibold mb-1">Start Date</label>
                      <input
                        type="date"
                        value={exp.startDate ? exp.startDate.substring(0, 10) : ''}
                        onChange={(e) => {
                          const list = [...tempData.experience];
                          list[idx].startDate = e.target.value;
                          setTempData({ ...tempData, experience: list });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-slate-500 text-[10px] uppercase font-semibold">End Date</label>
                        <label className="inline-flex items-center gap-1.5 text-[10px] text-indigo-400 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={exp.endDate === 'Present'}
                            onChange={(e) => {
                              const list = [...tempData.experience];
                              list[idx].endDate = e.target.checked ? 'Present' : '';
                              setTempData({ ...tempData, experience: list });
                            }}
                            className="rounded border-slate-850 bg-slate-900 text-indigo-600 focus:ring-indigo-500 w-3 h-3"
                          />
                          <span>Present</span>
                        </label>
                      </div>
                      {exp.endDate === 'Present' ? (
                        <input
                          type="text"
                          disabled
                          value="Present"
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-500 text-xs cursor-not-allowed"
                        />
                      ) : (
                        <input
                          type="date"
                          value={exp.endDate && exp.endDate !== 'Present' ? exp.endDate.substring(0, 10) : ''}
                          onChange={(e) => {
                            const list = [...tempData.experience];
                            list[idx].endDate = e.target.value;
                            setTempData({ ...tempData, experience: list });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[10px] uppercase font-semibold mb-1">Description</label>
                    <textarea
                      value={exp.description || ''}
                      onChange={(e) => {
                        const list = [...tempData.experience];
                        list[idx].description = e.target.value;
                        setTempData({ ...tempData, experience: list });
                      }}
                      rows="2"
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-slate-300 text-xs font-semibold rounded-lg cursor-pointer w-full sm:w-auto text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg cursor-pointer w-full sm:w-auto text-center"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* 3. EDUCATION EDIT MODAL */}
      <Modal isOpen={activeModal === 'education'} onClose={handleModalClose} title="Edit Education Info">
        <form onSubmit={handleModalSave} className="space-y-4">
          {validationError && (
            <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-500 text-xs flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {validationError}
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                const list = tempData.education || [];
                setTempData({
                  ...tempData,
                  education: [...list, { institution: '', degree: '', passingYear: '', grade: '' }]
                });
                setValidationError('');
              }}
              className="flex items-center gap-1 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs rounded-md"
            >
              <Plus className="w-3 h-3" /> Add Education
            </button>
          </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {(!tempData.education || tempData.education.length === 0) ? (
              <p className="text-slate-500 text-xs text-center py-4">No records. Add at least one record.</p>
            ) : (
              tempData.education.map((edu, idx) => (
                <div key={idx} className="relative p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      const list = [...tempData.education];
                      list.splice(idx, 1);
                      setTempData({ ...tempData, education: list });
                    }}
                    className="absolute top-2 right-2 text-slate-500 hover:text-pink-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-500 text-[10px] uppercase font-semibold mb-1">College/School *</label>
                      <input
                        type="text"
                        value={edu.institution || ''}
                        onChange={(e) => {
                          const list = [...tempData.education];
                          list[idx].institution = e.target.value;
                          setTempData({ ...tempData, education: list });
                          setValidationError('');
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px] uppercase font-semibold mb-1">Degree *</label>
                      <input
                        type="text"
                        value={edu.degree || ''}
                        onChange={(e) => {
                          const list = [...tempData.education];
                          list[idx].degree = e.target.value;
                          setTempData({ ...tempData, education: list });
                          setValidationError('');
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-500 text-[10px] uppercase font-semibold mb-1">Passing Year *</label>
                      <input
                        type="text"
                        value={edu.passingYear || ''}
                        onChange={(e) => {
                          const list = [...tempData.education];
                          list[idx].passingYear = e.target.value;
                          setTempData({ ...tempData, education: list });
                          setValidationError('');
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px] uppercase font-semibold mb-1">Grade / CGPA</label>
                      <input
                        type="text"
                        value={edu.grade || ''}
                        onChange={(e) => {
                          const list = [...tempData.education];
                          list[idx].grade = e.target.value;
                          setTempData({ ...tempData, education: list });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-slate-300 text-xs font-semibold rounded-lg cursor-pointer w-full sm:w-auto text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg cursor-pointer w-full sm:w-auto text-center"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PreviewSection;
