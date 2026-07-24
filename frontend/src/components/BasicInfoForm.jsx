import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faPhone, faLocationDot, faBriefcase, faFileLines,
  faArrowLeft, faCode, faWandSparkles, faLanguage, faPlus, faXmark
} from '@fortawesome/free-solid-svg-icons';

const BasicInfoForm = ({ data, updateData, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');
  const [langInput, setLangInput] = useState('');

  const techSkills = data.technicalSkills || [];
  const softSkills = data.softSkills || [];
  const languages = data.languages || [];

  // Quick add items
  const quickTechSkills = ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'TypeScript', 'Tailwind'];
  const quickSoftSkills = ['Problem Solving', 'Communication', 'Teamwork', 'Leadership', 'Time Management'];
  const quickLanguages = ['English', 'Hindi', 'Spanish', 'German'];

  const validate = () => {
    const tempErrors = {};
    if (!data.fullName?.trim()) tempErrors.fullName = 'Full Name is required';
    
    if (!data.email?.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      tempErrors.email = 'Invalid email address';
    }

    if (!data.phone?.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(data.phone.replace(/\s/g, ''))) {
      tempErrors.phone = 'Invalid phone number (must be 10-15 digits)';
    }

    if (!data.title?.trim()) tempErrors.title = 'Professional Title is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const addTag = (category, value, setInput) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const list = data[category] || [];
    if (!list.includes(trimmed)) {
      updateData({ ...data, [category]: [...list, trimmed] });
    }
    setInput('');
  };

  const removeTag = (category, index) => {
    const list = [...(data[category] || [])];
    list.splice(index, 1);
    updateData({ ...data, [category]: list });
  };

  const handleKeyDown = (e, category, value, setInput) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(category, value, setInput);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-up">
      <div className="bg-[color:var(--card-bg)]/95 backdrop-blur-xl border border-[color:var(--card-border)] rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] space-y-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Basic Info
          </h2>
          <p className="text-slate-400 text-sm">Tell us about yourself and configure your key skill tags.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name & Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-indigo-400" /> Full Name <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={data.fullName || ''}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className={`w-full bg-slate-950/80 border ${errors.fullName ? 'border-pink-500' : 'border-slate-800 focus:border-indigo-500'} rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-650 focus:outline-none transition-colors duration-200`}
              />
              {errors.fullName && <p className="text-pink-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4 text-indigo-400" /> Professional Title <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={data.title || ''}
                onChange={handleChange}
                placeholder="e.g. MERN Stack Developer"
                className={`w-full bg-slate-950/80 border ${errors.title ? 'border-pink-500' : 'border-slate-800 focus:border-indigo-500'} rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-650 focus:outline-none transition-colors duration-200`}
              />
              {errors.title && <p className="text-pink-500 text-xs mt-1">{errors.title}</p>}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-indigo-400" /> Email Address <span className="text-pink-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={data.email || ''}
                onChange={handleChange}
                placeholder="e.g. rahul@example.com"
                className={`w-full bg-slate-950/80 border ${errors.email ? 'border-pink-500' : 'border-slate-800 focus:border-indigo-500'} rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-650 focus:outline-none transition-colors duration-200`}
              />
              {errors.email && <p className="text-pink-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-indigo-400" /> Phone Number <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={data.phone || ''}
                onChange={handleChange}
                placeholder="e.g. +91 9876543210"
                className={`w-full bg-slate-950/80 border ${errors.phone ? 'border-pink-500' : 'border-slate-800 focus:border-indigo-500'} rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-650 focus:outline-none transition-colors duration-200`}
              />
              {errors.phone && <p className="text-pink-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-indigo-400" /> Location
            </label>
            <input
              type="text"
              name="location"
              value={data.location || ''}
              onChange={handleChange}
              placeholder="e.g. Pune, India"
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Bio / Summary */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
              <FontAwesomeIcon icon={faFileLines} className="w-4 h-4 text-indigo-400" /> Professional Bio / Summary
            </label>
            <textarea
              name="bio"
              value={data.bio || ''}
              onChange={handleChange}
              placeholder="Write a brief professional summary about your achievements, skills, and goals..."
              rows="3"
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-650 text-sm focus:outline-none transition-colors duration-200 resize-none"
            />
          </div>

          {/* ================= SKILLS SECTION INTEGRATION ================= */}
          <div className="pt-6 border-t border-slate-850 space-y-6">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Languages
            </h3>

            {/* Technical Skills */}
            <div className="space-y-3">
              <label className="block text-slate-300 text-xs font-medium flex items-center gap-2">
                <FontAwesomeIcon icon={faCode} className="w-3.5 h-3.5 text-indigo-400" /> Technical Skills <span className="text-slate-500 font-normal">(Press Enter to add)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'technicalSkills', techInput, setTechInput)}
                  placeholder="e.g. React, Node.js, MongoDB"
                  className="flex-1 bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-lg px-3.5 py-2 text-slate-200 placeholder-slate-650 text-sm focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => addTag('technicalSkills', techInput, setTechInput)}
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                </button>
              </div>
              
              {/* Quick Add Tech */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mr-1">Quick Add:</span>
                {quickTechSkills.map((skill) => {
                  const isAdded = techSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      disabled={isAdded}
                      onClick={() => addTag('technicalSkills', skill, setTechInput)}
                      className={`text-[10px] px-2.5 py-0.5 border rounded-full font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer
                        ${isAdded 
                          ? 'bg-slate-950/40 border-slate-800 text-slate-600 cursor-not-allowed' 
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/5'}
                      `}
                    >
                      +{skill}
                    </button>
                  );
                })}
              </div>

              {/* Tag display */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {techSkills.map((skill, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-full font-medium"
                  >
                    {skill}
                    <button 
                      type="button" 
                      onClick={() => removeTag('technicalSkills', index)}
                      className="hover:text-pink-500 rounded-full transition-colors cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="space-y-3">
              <label className="block text-slate-300 text-xs font-medium flex items-center gap-2">
                <FontAwesomeIcon icon={faWandSparkles} className="w-3.5 h-3.5 text-indigo-400" /> Soft Skills <span className="text-slate-500 font-normal">(Press Enter to add)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={softInput}
                  onChange={(e) => setSoftInput(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'softSkills', softInput, setSoftInput)}
                  placeholder="e.g. Communication, Problem Solving"
                  className="flex-1 bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-lg px-3.5 py-2 text-slate-200 placeholder-slate-650 text-sm focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => addTag('softSkills', softInput, setSoftInput)}
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Add Soft */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mr-1">Quick Add:</span>
                {quickSoftSkills.map((skill) => {
                  const isAdded = softSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      disabled={isAdded}
                      onClick={() => addTag('softSkills', skill, setSoftInput)}
                      className={`text-[10px] px-2.5 py-0.5 border rounded-full font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer
                        ${isAdded 
                          ? 'bg-slate-950/40 border-slate-800 text-slate-600 cursor-not-allowed' 
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/5'}
                      `}
                    >
                      +{skill}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {softSkills.map((skill, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs rounded-full font-medium"
                  >
                    {skill}
                    <button 
                      type="button" 
                      onClick={() => removeTag('softSkills', index)}
                      className="hover:text-pink-500 rounded-full transition-colors cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-3">
              <label className="block text-slate-300 text-xs font-medium flex items-center gap-2">
                <FontAwesomeIcon icon={faLanguage} className="w-3.5 h-3.5 text-indigo-400" /> Languages <span className="text-slate-500 font-normal">(Press Enter to add)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={langInput}
                  onChange={(e) => setLangInput(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'languages', langInput, setLangInput)}
                  placeholder="e.g. English, Hindi"
                  className="flex-1 bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-lg px-3.5 py-2 text-slate-200 placeholder-slate-650 text-sm focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => addTag('languages', langInput, setLangInput)}
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Add Lang */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mr-1">Quick Add:</span>
                {quickLanguages.map((lang) => {
                  const isAdded = languages.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      disabled={isAdded}
                      onClick={() => addTag('languages', lang, setLangInput)}
                      className={`text-[10px] px-2.5 py-0.5 border rounded-full font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer
                        ${isAdded 
                          ? 'bg-slate-950/40 border-slate-800 text-slate-600 cursor-not-allowed' 
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/5'}
                      `}
                    >
                      +{lang}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {languages.map((lang, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-1.5 px-2.5 py-0.5 bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs rounded-full font-medium"
                  >
                    {lang}
                    <button 
                      type="button" 
                      onClick={() => removeTag('languages', index)}
                      className="hover:text-pink-500 rounded-full transition-colors cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Submit / Navigation */}
          <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-6 border-t border-slate-850 mt-6">
            {onPrev ? (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-850 hover:bg-slate-950/40 text-slate-400 hover:text-slate-300 text-sm font-medium rounded-lg transition-colors cursor-pointer w-full sm:w-auto text-center"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-indigo-500/20 active:scale-98 transition-all duration-150 cursor-pointer w-full sm:w-auto text-center"
                >
                  Save & Continue
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="ml-auto px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-indigo-500/20 active:scale-98 transition-all duration-150 cursor-pointer w-full sm:w-auto text-center"
              >
                Save & Continue
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicInfoForm;
