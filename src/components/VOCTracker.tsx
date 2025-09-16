import React, { useState } from 'react';

interface VOCEntry {
  id: string;
  source: string;
  feedback: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
}

const VOCTracker: React.FC = () => {
  const [entries, setEntries] = useState<VOCEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    source: '',
    feedback: '',
    category: '',
    priority: 'medium' as const
  });

  const categories = ['Quality', 'Service', 'Delivery', 'Cost', 'Features', 'Support'];

  const addEntry = () => {
    if (newEntry.source && newEntry.feedback) {
      setEntries(prev => [...prev, {
        ...newEntry,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString()
      }]);
      setNewEntry({ source: '', feedback: '', category: '', priority: 'medium' });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryCount = (category: string) => {
    return entries.filter(entry => entry.category === category).length;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Voice of Customer Tracker</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-800 mb-4">Add New Feedback</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Source (Survey, Call, Email...)"
                value={newEntry.source}
                onChange={(e) => setNewEntry(prev => ({ ...prev, source: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newEntry.category}
                onChange={(e) => setNewEntry(prev => ({ ...prev, category: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Customer feedback..."
              value={newEntry.feedback}
              onChange={(e) => setNewEntry(prev => ({ ...prev, feedback: e.target.value }))}
              className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <div className="flex justify-between items-center mt-4">
              <select
                value={newEntry.priority}
                onChange={(e) => setNewEntry(prev => ({ ...prev, priority: e.target.value as any }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <button
                onClick={addEntry}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Entry
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {entries.map(entry => (
              <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-2">
                    <span className="text-sm font-semibold text-gray-600">{entry.source}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(entry.priority)}`}>
                      {entry.priority}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{entry.date}</span>
                </div>
                <p className="text-gray-800 mb-2">{entry.feedback}</p>
                {entry.category && (
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {entry.category}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Category Analysis</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">{category}</span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                  {getCategoryCount(category)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VOCTracker;