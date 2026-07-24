import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faGraduationCap, faEye } from '@fortawesome/free-solid-svg-icons';

const StepIndicator = ({ currentStep, totalSteps = 4 }) => {
  const steps = [
    { label: 'Basic Info', icon: faUser },
    { label: 'Experience', icon: faBriefcase },
    { label: 'Education', icon: faGraduationCap },
    { label: 'Preview', icon: faEye }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-8">
      {/* Wizard Track */}
      <div className="relative flex justify-between items-center w-full">
        {/* Background Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-slate-900 rounded-full -z-10" />

        {/* Progress Line */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full -z-10 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(99,102,241,0.4)]"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const StepIcon = step.icon;

          return (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center 
                  transition-all duration-300 border-2 z-10 shadow-lg
                  ${isCompleted 
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-650 border-indigo-400 text-white scale-105 shadow-indigo-550/10' 
                    : isActive 
                      ? 'bg-slate-950 border-purple-500 text-purple-400 ring-4 ring-purple-500/20 scale-110 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:border-slate-700'
                  }
                `}
              >
                <FontAwesomeIcon icon={StepIcon} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <span 
                className={`
                  mt-2 text-[10px] sm:text-xs font-semibold md:text-sm transition-colors duration-300 text-center hidden sm:block
                  ${isActive 
                    ? 'text-purple-400' 
                    : isCompleted 
                      ? 'text-indigo-300/80' 
                      : 'text-slate-550'
                  }
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active step name for mobile viewports */}
      <div className="text-center mt-4 sm:hidden">
        <span className="text-xs text-slate-550 uppercase tracking-wider font-bold">Step {currentStep} of {totalSteps}: </span>
        <span className="text-xs text-purple-400 font-bold">{steps[currentStep - 1]?.label}</span>
      </div>
    </div>
  );
};

export default StepIndicator;
