import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faSun, faMoon, faFileLines, faDatabase } from '@fortawesome/free-solid-svg-icons';
import StepIndicator from './components/StepIndicator';
import BasicInfoForm from './components/BasicInfoForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import PreviewSection from './components/PreviewSection';
import SubmissionsList from './components/SubmissionsList';

function App() {
  const [step, setStep] = useState(1);
  const [viewMode, setViewMode] = useState('form'); // 'form' | 'submissions'

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

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
   <div>
      
      {/* Dynamic colorful blobs in the background */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '-4s' }} />

      {/* Header bar */}
      <header className="navbar-header">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4">
          <div className="logo-container" onClick={() => setViewMode('form')}>
            <div className="logo-badge">
              <FontAwesomeIcon icon={faUserCheck} className="w-5 h-5 text-white" />
            </div>
            <span className="logo-text">
              HireVeda
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <nav className="nav-pills">
              <button
                onClick={() => setViewMode('form')}
                className={`nav-pill ${viewMode === 'form' ? 'nav-pill-active' : ''}`}
              >
                <FontAwesomeIcon icon={faFileLines} className="w-4 h-4" />
                <span className="hidden xs:inline">Form</span>
              </button>
              <button
                onClick={() => setViewMode('submissions')}
                className={`nav-pill ${viewMode === 'submissions' ? 'nav-pill-active' : ''}`}
              >
                <FontAwesomeIcon icon={faDatabase} className="w-4 h-4" />
                <span className="hidden xs:inline">All Submissions</span>
              </button>
            </nav>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className="theme-btn"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <FontAwesomeIcon icon={faSun} className="w-4 h-4 text-amber-400" />
              ) : (
                <FontAwesomeIcon icon={faMoon} className="w-4 h-4 text-indigo-500" />
              )}
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
      <footer className="w-full py-6 border-t border-[color:var(--card-border)] bg-[color:var(--bg-color)] text-center text-xs text-[color:var(--text-secondary)]">
        <div className="max-w-6xl mx-auto px-4">
          <p>© 2026 HireVeda Portfolio Builder. Powered by MERN Stack & Tailwind CSS v4.</p>
        </div>
      </footer>
      </div>
  );
}

export default App;
