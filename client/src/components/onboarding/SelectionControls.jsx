import React from 'react';

export const MultiSelect = ({ options, selected, onChange }) => {
  const toggle = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isSelected 
                ? 'bg-primary text-primary-foreground border-transparent' 
                : 'bg-muted/30 text-muted-foreground border border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export const SingleSelect = ({ options, selected, onChange }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`p-4 rounded-xl text-sm font-medium transition-all duration-200 border text-center ${
              isSelected 
                ? 'bg-primary/10 border-primary text-primary shadow-sm' 
                : 'bg-card border-border text-muted-foreground hover:border-primary/50'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export const SalarySlider = ({ value, onChange, min = 30000, max = 300000, step = 5000 }) => {
  return (
    <div className="w-full space-y-4 mt-6">
      <div className="flex justify-between items-center text-primary font-bold text-2xl">
        ${value.toLocaleString()}
      </div>
      <input 
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>${min.toLocaleString()}</span>
        <span>${max.toLocaleString()}+</span>
      </div>
    </div>
  );
};
