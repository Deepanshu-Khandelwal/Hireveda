import React, { useState } from 'react';
import { Code2, Sparkles, Languages, Plus, X, ArrowLeft } from 'lucide-react';

const SkillsForm = ({ data, updateData, onNext, onPrev }) => {
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');
  const [langInput, setLangInput] = useState('');

  const techSkills = data.technicalSkills || [];
  const softSkills = data.softSkills || [];
  const languages = data.languages || [];

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

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl animate-slide-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Skills & Languages
        </h2>
        <p className="text-slate-400 text-sm">Add technical tools, soft skills, and languages you speak. Press Enter or click + to add.</p>
      </div>

      <div className="space-y-6">
        {/* Technical Skills */}
        <div className="space-y-3">
          <label className="block text-slate-300 text-sm font-medium flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" /> Technical Skills
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'technicalSkills', techInput, setTechInput)}
              placeholder="e.g. React, Node.js, MongoDB, Express"
              className="flex-1 bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-650 text-sm focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => addTag('technicalSkills', techInput, setTechInput)}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1.5">
            {techSkills.map((skill, index) => (
              <span 
                key={index}
                className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-full font-medium"
              >
                {skill}
                <button 
                  type="button" 
                  onClick={() => removeTag('technicalSkills', index)}
                  className="hover:text-pink-500 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {techSkills.length === 0 && <span className="text-slate-600 text-xs italic">No technical skills added yet.</span>}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="space-y-3">
          <label className="block text-slate-300 text-sm font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Soft Skills
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={softInput}
              onChange={(e) => setSoftInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'softSkills', softInput, setSoftInput)}
              placeholder="e.g. Communication, Leadership, Problem Solving"
              className="flex-1 bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-650 text-sm focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => addTag('softSkills', softInput, setSoftInput)}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1.5">
            {softSkills.map((skill, index) => (
              <span 
                key={index}
                className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs rounded-full font-medium"
              >
                {skill}
                <button 
                  type="button" 
                  onClick={() => removeTag('softSkills', index)}
                  className="hover:text-pink-500 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {softSkills.length === 0 && <span className="text-slate-600 text-xs italic">No soft skills added yet.</span>}
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-3">
          <label className="block text-slate-300 text-sm font-medium flex items-center gap-2">
            <Languages className="w-4 h-4 text-indigo-400" /> Languages
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={langInput}
              onChange={(e) => setLangInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'languages', langInput, setLangInput)}
              placeholder="e.g. English, Hindi"
              className="flex-1 bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-650 text-sm focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => addTag('languages', langInput, setLangInput)}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1.5">
            {languages.map((lang, index) => (
              <span 
                key={index}
                className="flex items-center gap-1.5 px-3 py-1 bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs rounded-full font-medium"
              >
                {lang}
                <button 
                  type="button" 
                  onClick={() => removeTag('languages', index)}
                  className="hover:text-pink-500 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {languages.length === 0 && <span className="text-slate-600 text-xs italic">No languages added yet.</span>}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className={`flex ${onPrev ? 'justify-between' : 'justify-end'} items-center pt-6 border-t border-slate-850 mt-8`}>
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-850 hover:bg-slate-950/40 text-slate-400 hover:text-slate-300 text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-indigo-500/20 active:scale-98 transition-all duration-150 cursor-pointer"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;
