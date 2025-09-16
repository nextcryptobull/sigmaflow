import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import DMAICNavigation from './DMAICNavigation';
import ProjectCharterBuilder from './ProjectCharterBuilder';
import SIPOCDiagrammer from './SIPOCDiagrammer';
import VOCTracker from './VOCTracker';
import DataCollectionForm from './DataCollectionForm';
import StatisticalAnalysis from './StatisticalAnalysis';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const [activePhase, setActivePhase] = useState('define');

  const renderPhaseContent = () => {
    switch (activePhase) {
      case 'define':
        return (
          <div className="space-y-8">
            <ProjectCharterBuilder />
            <SIPOCDiagrammer />
            <VOCTracker />
          </div>
        );
      case 'measure':
        return (
          <div className="space-y-8">
            <DataCollectionForm />
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Data Integration Hub</h3>
              <p className="text-gray-600 mb-4">Connect to external data sources for automated collection.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <h4 className="font-semibold">SQL Database</h4>
                  <p className="text-sm text-gray-600">Connect to your database</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">📈</div>
                  <h4 className="font-semibold">Google Sheets</h4>
                  <p className="text-sm text-gray-600">Import from spreadsheets</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">🔗</div>
                  <h4 className="font-semibold">API Connector</h4>
                  <p className="text-sm text-gray-600">Custom integrations</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'analyze':
        return (
          <div className="space-y-8">
            <StatisticalAnalysis />
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visual Analysis Toolkit</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Histogram', 'Pareto Chart', 'Box Plot', 'Control Chart'].map(chart => (
                  <button key={chart} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="font-semibold text-sm">{chart}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'improve':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Action Tracker (Kanban Board)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['To Do', 'In Progress', 'Completed'].map(status => (
                  <div key={status} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-4 text-center">{status}</h4>
                    <div className="space-y-3 min-h-32">
                      {status === 'To Do' && (
                        <div className="bg-white p-3 rounded shadow-sm">
                          <div className="font-medium text-sm">Implement new process</div>
                          <div className="text-xs text-gray-500 mt-1">Due: Next week</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'control':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Live Executive Dashboard</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-800">98.5%</div>
                  <div className="text-sm text-green-600">Process Efficiency</div>
                </div>
                <div className="bg-blue-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-800">2.1</div>
                  <div className="text-sm text-blue-600">Defect Rate (PPM)</div>
                </div>
                <div className="bg-purple-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-800">4.8σ</div>
                  <div className="text-sm text-purple-600">Sigma Level</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-4">Control Chart (I-MR)</h4>
                <div className="h-64 bg-white rounded border flex items-center justify-center">
                  <div className="text-gray-500">Interactive control chart would be rendered here</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a DMAIC phase to begin</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-5xl font-bold mb-4">SigmaFlow</h1>
              <p className="text-xl mb-6">The Integrated DMAIC Platform for Six Sigma Excellence</p>
              <p className="text-lg opacity-90">
                Transform your process improvement journey with our comprehensive platform that guides you 
                through Define, Measure, Analyze, Improve, and Control phases seamlessly.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/68c7b7bbdaadacbf41fba5c4_1757919313227_8f1f049a.webp" 
                alt="DMAIC Dashboard" 
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <DMAICNavigation activePhase={activePhase} onPhaseChange={setActivePhase} />
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {activePhase.charAt(0).toUpperCase() + activePhase.slice(1)} Phase
          </h2>
          <p className="text-gray-600">
            {activePhase === 'define' && 'Project setup, charter creation, and problem definition'}
            {activePhase === 'measure' && 'Data collection, form building, and measurement systems'}
            {activePhase === 'analyze' && 'Statistical analysis, root cause identification, and hypothesis testing'}
            {activePhase === 'improve' && 'Solution implementation, action tracking, and process improvement'}
            {activePhase === 'control' && 'Process monitoring, control plans, and sustainability measures'}
          </p>
        </div>

        {renderPhaseContent()}

        {/* Report Generation Section */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Generate Project Report</h3>
          <p className="mb-6">Compile all DMAIC phases into a comprehensive, professional report</p>
          <button className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Generate Final Report (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;