import React from 'react';
import { User, Briefcase, GraduationCap, Code2, Eye } from 'lucide-react';

const StepIndicator = ({ currentStep, totalSteps = 4 }) => {
  const steps = [
    { label: 'Basic Info', icon: User },
    { label: 'Experience', icon: Briefcase },
    { label: 'Education', icon: GraduationCap },
    { label: 'Preview', icon: Eye }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-8">
      {/* Wizard Track */}
      <div className="relative flex justify-between items-center w-full">
        {/* Background Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-800 rounded-full -z-10" />

        {/* Progress Line */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full -z-10 transition-all duration-500 ease-out"
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
                  w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center 
                  transition-all duration-300 border-2 z-10 shadow-lg
                  ${isCompleted 
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 text-white scale-105' 
                    : isActive 
                      ? 'bg-slate-900 border-purple-500 text-purple-400 ring-4 ring-purple-500/20 scale-110 shadow-purple-500/10' 
                      : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                  }
                `}
              >
                <StepIcon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span 
                className={`
                  mt-2 text-xs font-medium md:text-sm transition-colors duration-300 text-center hidden sm:block
                  ${isActive 
                    ? 'text-purple-400 font-semibold' 
                    : isCompleted 
                      ? 'text-indigo-300' 
                      : 'text-slate-500'
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
