import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCalendarDays, faFileLines, faPlus, faTrash, faArrowLeft, faBuilding, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const ExperienceForm = ({ data, updateData, onNext, onPrev }) => {
  const [error, setError] = useState('');
  const experiences = data.experience || [];

  const handleAdd = () => {
    const newExp = {
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    updateData({ ...data, experience: [...experiences, newExp] });
  };

  const handleRemove = (index) => {
    const list = [...experiences];
    list.splice(index, 1);
    updateData({ ...data, experience: list });
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...experiences];
    list[index][name] = value;
    updateData({ ...data, experience: list });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[color:var(--card-bg)]/95 backdrop-blur-xl border border-[color:var(--card-border)] rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] animate-slide-up">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Work Experience <span className="text-slate-500 font-normal text-sm">(Optional)</span>
          </h2>
          <p className="text-slate-400 text-sm">Add details of your previous roles. Leave blank if you are a fresher.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" /> Add Job
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3.5 bg-pink-500/10 border border-pink-500/30 rounded-xl text-pink-500 text-xs flex items-center gap-1.5 animate-pulse-slow">
          <FontAwesomeIcon icon={faCircleExclamation} className="w-4 h-4 text-slate-400" /> {error}
        </div>
      )}

      {experiences.length === 0 ? (
        <div className="border border-dashed border-slate-800 rounded-xl p-6 sm:p-8 text-center my-6">
          <FontAwesomeIcon icon={faBriefcase} className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-400 text-sm font-medium">No experience added yet.</p>
          <p className="text-slate-500 text-xs mt-1">If you are a fresher or have no corporate experience, you can skip this step.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg shadow cursor-pointer transition-colors w-full sm:w-auto text-center"
          >
            Add My First Job
          </button>
        </div>
      ) : (
        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 mb-6">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="relative p-3.5 sm:p-5 bg-slate-950/50 border-y border-r border-l-4 border-slate-800/80 border-l-indigo-550 rounded-xl space-y-4 shadow-sm hover:shadow-[0_4px_20px_rgba(99,102,241,0.04)] transition-all animate-slide-in"
            >
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-4 right-4 p-1 text-slate-500 hover:text-pink-500 hover:bg-pink-500/10 rounded-lg transition-all cursor-pointer"
                title="Remove Job"
              >
                <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
              </button>

              <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                Position #{index + 1}
              </div>

              {/* Company & Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faBuilding} className="w-3.5 h-3.5 text-indigo-400" /> Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. Google India"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3.5 py-2 text-slate-200 placeholder-slate-600 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faBriefcase} className="w-3.5 h-3.5 text-indigo-400" /> Role / Title
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={exp.role}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. Software Engineer Intern"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3.5 py-2 text-slate-200 placeholder-slate-600 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faCalendarDays} className="w-3.5 h-3.5 text-indigo-400" /> Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={exp.startDate ? exp.startDate.substring(0, 10) : ''}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3.5 py-2 text-slate-200 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-slate-400 text-xs font-medium flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faCalendarDays} className="w-3.5 h-3.5 text-indigo-400" /> End Date
                    </label>
                    <label className="inline-flex items-center gap-1.5 text-xs text-indigo-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={exp.endDate === 'Present'}
                        onChange={(e) => {
                          const list = [...experiences];
                          list[index].endDate = e.target.checked ? 'Present' : '';
                          updateData({ ...data, experience: list });
                        }}
                        className="rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                      />
                      <span>Currently Working</span>
                    </label>
                  </div>
                  {exp.endDate === 'Present' ? (
                    <input
                      type="text"
                      disabled
                      value="Present"
                      className="w-full bg-slate-900 border border-slate-850 rounded-lg px-3.5 py-2 text-slate-500 text-sm focus:outline-none cursor-not-allowed"
                    />
                  ) : (
                    <input
                      type="date"
                      name="endDate"
                      value={exp.endDate && exp.endDate !== 'Present' ? exp.endDate.substring(0, 10) : ''}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3.5 py-2 text-slate-200 text-sm focus:outline-none transition-colors"
                    />
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faFileLines} className="w-3.5 h-3.5 text-indigo-400" /> Key Responsibilities / Description
                </label>
                <textarea
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Describe your role, projects built, and technologies used..."
                  rows="3"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3.5 py-2 text-slate-200 placeholder-slate-600 text-sm focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-slate-850">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-850 hover:bg-slate-950/40 text-slate-400 hover:text-slate-300 text-sm font-medium rounded-lg transition-colors cursor-pointer w-full sm:w-auto text-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          onClick={() => {
            if (experiences.length > 0) {
              const invalid = experiences.some(
                (exp) => !exp.company?.trim() || !exp.role?.trim() || !exp.startDate?.trim()
              );
              if (invalid) {
                setError('Please fill out Company, Role, and Start Date for all experience entries, or delete empty rows.');
                return;
              }
            }
            onNext();
          }}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-indigo-500/20 active:scale-98 transition-all duration-150 cursor-pointer w-full sm:w-auto text-center"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;
