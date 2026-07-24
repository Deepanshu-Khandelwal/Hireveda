import React, { useState } from 'react';
import { GraduationCap, Calendar, Award, Plus, Trash2, ArrowLeft, Building } from 'lucide-react';

const EducationForm = ({ data, updateData, onNext, onPrev }) => {
  const educations = data.education || [];
  const [error, setError] = useState('');

  const handleAdd = () => {
    const newEdu = {
      institution: '',
      degree: '',
      passingYear: '',
      grade: ''
    };
    updateData({ ...data, education: [...educations, newEdu] });
    setError('');
  };

  const handleRemove = (index) => {
    const list = [...educations];
    list.splice(index, 1);
    updateData({ ...data, education: list });
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...educations];
    list[index][name] = value;
    updateData({ ...data, education: list });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (educations.length === 0) {
      setError('Please add at least one education record.');
      return;
    }

    // Validate fields inside all records are filled
    const invalid = educations.some(
      (edu) => !edu.institution?.trim() || !edu.degree?.trim() || !edu.passingYear?.trim()
    );

    if (invalid) {
      setError('Please fill out Institution, Degree, and Passing Year for all entries.');
      return;
    }

    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl animate-slide-up">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Education <span className="text-pink-500 font-bold">*</span>
          </h2>
          <p className="text-slate-400 text-sm">Add details of your schooling, college, or other degrees.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Education
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3.5 bg-pink-500/10 border border-pink-500/30 rounded-xl text-pink-500 text-sm animate-pulse-slow">
          {error}
        </div>
      )}

      {educations.length === 0 ? (
        <div className="border border-dashed border-slate-800 rounded-xl p-6 sm:p-8 text-center my-6">
          <GraduationCap className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-400 text-sm font-medium">No education records added yet.</p>
          <p className="text-slate-500 text-xs mt-1">You must provide at least one educational qualification.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg shadow cursor-pointer transition-colors w-full sm:w-auto text-center"
          >
            Add My Qualification
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6 max-h-[450px] overflow-y-auto pr-2 mb-6">
            {educations.map((edu, index) => (
              <div 
                key={index} 
                className="relative p-3.5 sm:p-5 bg-slate-950/50 border-y border-r border-l-4 border-slate-800/80 border-l-indigo-550 rounded-xl space-y-4 shadow-sm hover:shadow-[0_4px_20px_rgba(99,102,241,0.04)] transition-all animate-slide-in"
              >
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-4 right-4 p-1 text-slate-500 hover:text-pink-500 hover:bg-pink-500/10 rounded-lg transition-all cursor-pointer"
                  title="Remove Education"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                  Education Record #{index + 1}
                </div>

                {/* Institution & Degree */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-indigo-400" /> College / School Name <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={edu.institution}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="e.g. Mumbai University"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3.5 py-2 text-slate-200 placeholder-slate-600 text-sm focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> Degree / Course <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="e.g. B.E. in Computer Engineering"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3.5 py-2 text-slate-200 placeholder-slate-600 text-sm focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Passing Year & Grade */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Passing Year <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="passingYear"
                      value={edu.passingYear}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="e.g. 2024"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3.5 py-2 text-slate-200 placeholder-slate-600 text-sm focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-indigo-400" /> Grade / CGPA / %
                    </label>
                    <input
                      type="text"
                      name="grade"
                      value={edu.grade}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="e.g. 9.2 CGPA or 85%"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3.5 py-2 text-slate-200 placeholder-slate-600 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-slate-850">
            <button
              type="button"
              onClick={onPrev}
              className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-850 hover:bg-slate-950/40 text-slate-400 hover:text-slate-300 text-sm font-medium rounded-lg transition-colors cursor-pointer w-full sm:w-auto text-center"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-indigo-500/20 active:scale-98 transition-all duration-150 cursor-pointer w-full sm:w-auto text-center"
            >
              Save & Continue
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EducationForm;
