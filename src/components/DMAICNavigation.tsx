import React from 'react';

interface DMAICNavigationProps {
  activePhase: string;
  onPhaseChange: (phase: string) => void;
}

const phases = [
  { id: 'define', name: 'Define', icon: 'https://d64gsuwffb70l.cloudfront.net/68c7b7bbdaadacbf41fba5c4_1757919316905_ad1b81af.webp', color: 'bg-blue-600' },
  { id: 'measure', name: 'Measure', icon: 'https://d64gsuwffb70l.cloudfront.net/68c7b7bbdaadacbf41fba5c4_1757919318635_4d719fce.webp', color: 'bg-indigo-600' },
  { id: 'analyze', name: 'Analyze', icon: 'https://d64gsuwffb70l.cloudfront.net/68c7b7bbdaadacbf41fba5c4_1757919320501_2f3fcd21.webp', color: 'bg-purple-600' },
  { id: 'improve', name: 'Improve', icon: 'https://d64gsuwffb70l.cloudfront.net/68c7b7bbdaadacbf41fba5c4_1757919322834_067e1d5f.webp', color: 'bg-green-600' },
  { id: 'control', name: 'Control', icon: 'https://d64gsuwffb70l.cloudfront.net/68c7b7bbdaadacbf41fba5c4_1757919324850_afc8d2a6.webp', color: 'bg-red-600' }
];

const DMAICNavigation: React.FC<DMAICNavigationProps> = ({ activePhase, onPhaseChange }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">DMAIC Process Flow</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {phases.map((phase, index) => (
          <div key={phase.id} className="flex items-center">
            <button
              onClick={() => onPhaseChange(phase.id)}
              className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${
                activePhase === phase.id
                  ? `${phase.color} text-white shadow-lg transform scale-105`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <img src={phase.icon} alt={phase.name} className="w-12 h-12 mb-2 rounded-full" />
              <span className="font-semibold text-sm">{phase.name}</span>
            </button>
            {index < phases.length - 1 && (
              <div className="hidden md:block w-8 h-0.5 bg-gray-300 mx-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DMAICNavigation;