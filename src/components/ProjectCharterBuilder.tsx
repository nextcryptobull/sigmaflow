import React, { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  permission: 'contributor' | 'stakeholder';
}

const ProjectCharterBuilder: React.FC = () => {
  const [charter, setCharter] = useState({
    problemStatement: '',
    goalStatement: '',
    businessCase: '',
    scope: '',
    inScope: '',
    outScope: '',
    timeline: '',
    teamMembers: [] as TeamMember[]
  });

  const [newMember, setNewMember] = useState({ name: '', role: '', permission: 'contributor' as const });

  const addTeamMember = () => {
    if (newMember.name && newMember.role) {
      setCharter(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { ...newMember, id: Date.now().toString() }]
      }));
      setNewMember({ name: '', role: '', permission: 'contributor' });
    }
  };

  const removeMember = (id: string) => {
    setCharter(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(member => member.id !== id)
    }));
  };

  const generatePDF = () => {
    alert('PDF generation would be implemented with a library like jsPDF');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Project Charter Builder</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Problem Statement</label>
          <textarea
            value={charter.problemStatement}
            onChange={(e) => setCharter(prev => ({ ...prev, problemStatement: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Describe the problem to be solved..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Goal Statement</label>
          <textarea
            value={charter.goalStatement}
            onChange={(e) => setCharter(prev => ({ ...prev, goalStatement: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Define the project goal..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Business Case</label>
          <textarea
            value={charter.businessCase}
            onChange={(e) => setCharter(prev => ({ ...prev, businessCase: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Justify the business value..."
          />
        </div>
      </div>

      <button
        onClick={generatePDF}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Generate PDF Charter
      </button>
    </div>
  );
};

export default ProjectCharterBuilder;