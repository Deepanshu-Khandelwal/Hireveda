import React, { useState, useEffect } from 'react';
import StepIndicator from './components/StepIndicator';
import BasicInfoForm from './components/BasicInfoForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import PreviewSection from './components/PreviewSection';
import SubmissionsList from './components/SubmissionsList';
import { UserCheck, Sun, Moon } from 'lucide-react';

function App() {
  const [step, setStep] = useState(1);
  const [viewMode, setViewMode] = useState('form'); // 'form' | 'submissions'

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, viewMode]);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    title: '',
    bio: '',
    location: '',
    profileImage: '',
    experience: [],
    education: [],
    technicalSkills: [],
    softSkills: [],
    languages: []
  });

  const updateProfileData = (newData) => {
    setProfileData(newData);
  };

  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleResetForm = () => {
    setProfileData({
      fullName: '',
      email: '',
      phone: '',
      title: '',
      bio: '',
      location: '',
      profileImage: '',
      experience: [],
      education: [],
      technicalSkills: [],
      softSkills: [],
      languages: []
    });
    setStep(1);
  };

  const handleEditProfile = (profile) => {
    setProfileData({
      fullName: profile.fullName || '',
      email: profile.email || '',
      phone: profile.phone || '',
      title: profile.title || '',
      bio: profile.bio || '',
      location: profile.location || '',
      profileImage: profile.profileImage || '',
      experience: profile.experience || [],
      education: profile.education || [],
      technicalSkills: profile.technicalSkills || [],
      softSkills: profile.softSkills || [],
      languages: profile.languages || [],
      id: profile._id // MongoDB reference ID for update query
    });
    setStep(1);
    setViewMode('form');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicInfoForm 
            data={profileData} 
            updateData={updateProfileData} 
            onNext={handleNextStep} 
          />
        );
      case 2:
        return (
          <ExperienceForm 
            data={profileData} 
            updateData={updateProfileData} 
            onNext={handleNextStep} 
            onPrev={handlePrevStep} 
          />
        );
      case 3:
        return (
          <EducationForm 
            data={profileData} 
            updateData={updateProfileData} 
            onNext={handleNextStep} 
            onPrev={handlePrevStep} 
          />
        );
      case 4:
        return (
          <PreviewSection 
            data={profileData} 
            updateData={updateProfileData} 
            onPrev={handlePrevStep} 
            onReset={handleResetForm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative">
      
      {/* Dynamic colorful blobs in the background */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '-4s' }} />

      {/* Header bar */}
      <header className="w-full py-4 md:py-6 px-4 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 animate-pulse-slow">
              <UserCheck className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent tracking-tight">
              HireVeda
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className="p-1.5 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-lg cursor-pointer transition-all active:scale-95 shadow-sm mr-1 sm:mr-2 flex items-center justify-center"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500" />
              )}
            </button>

            <button
              onClick={() => setViewMode('form')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer
                ${viewMode === 'form' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20 scale-105' 
                  : 'bg-slate-900 border-slate-850 text-slate-400 hover:text-slate-200'
                }
              `}
            >
              Form
            </button>
            <button
              onClick={() => setViewMode('submissions')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer
                ${viewMode === 'submissions' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20 scale-105' 
                  : 'bg-slate-900 border-slate-850 text-slate-400 hover:text-slate-200'
                }
              `}
            >
              All Submissions
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12 z-10 flex flex-col justify-start">
        
        {viewMode === 'form' ? (
          <>
            {/* Banner text */}
            <div className="text-center mb-8 max-w-2xl mx-auto animate-fade-in">
              <h1 className="text-3xl md:text-4.5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-250 to-slate-400 bg-clip-text text-transparent">
                Create Your Professional Profile
              </h1>
              <p className="text-slate-400 mt-2 text-sm md:text-base">
                Build, edit, and export your portfolio with interactive forms and dynamic database integration.
              </p>
            </div>

            {/* Wizard Steps Timeline */}
            <StepIndicator currentStep={step} />

            {/* Form / Preview container */}
            <div className="flex-1 flex flex-col justify-start">
              {renderStep()}
            </div>
          </>
        ) : (
          <SubmissionsList 
            onEditProfile={handleEditProfile}
            onBackToForm={() => setViewMode('form')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-650">
        <div className="max-w-6xl mx-auto px-4">
          <p>© 2026 HireVeda Portfolio Builder. Powered by MERN Stack & Tailwind CSS v4.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
