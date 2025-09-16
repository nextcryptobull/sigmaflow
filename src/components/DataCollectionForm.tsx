import React, { useState } from 'react';

interface FormField {
  id: string;
  type: 'text' | 'number' | 'dropdown' | 'date' | 'textarea';
  label: string;
  required: boolean;
  options?: string[];
}

interface DataEntry {
  id: string;
  timestamp: string;
  data: Record<string, any>;
}

const DataCollectionForm: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [entries, setEntries] = useState<DataEntry[]>([]);
  const [newField, setNewField] = useState({
    type: 'text' as const,
    label: '',
    required: false,
    options: ''
  });
  const [formData, setFormData] = useState<Record<string, any>>({});

  const addField = () => {
    if (newField.label) {
      const field: FormField = {
        id: Date.now().toString(),
        type: newField.type,
        label: newField.label,
        required: newField.required,
        options: newField.type === 'dropdown' ? newField.options.split(',').map(s => s.trim()) : undefined
      };
      setFields(prev => [...prev, field]);
      setNewField({ type: 'text', label: '', required: false, options: '' });
    }
  };

  const submitData = () => {
    const entry: DataEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      data: { ...formData }
    };
    setEntries(prev => [...prev, entry]);
    setFormData({});
  };

  const calculateStats = () => {
    if (entries.length === 0) return null;
    
    const numericFields = fields.filter(f => f.type === 'number');
    const stats: Record<string, { mean: number; count: number; std: number }> = {};
    
    numericFields.forEach(field => {
      const values = entries.map(e => parseFloat(e.data[field.id])).filter(v => !isNaN(v));
      if (values.length > 0) {
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
        stats[field.label] = {
          mean: Math.round(mean * 100) / 100,
          count: values.length,
          std: Math.round(Math.sqrt(variance) * 100) / 100
        };
      }
    });
    
    return stats;
  };

  const stats = calculateStats();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Data Collection Form Builder</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Form Builder</h4>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <select
                value={newField.type}
                onChange={(e) => setNewField(prev => ({ ...prev, type: e.target.value as any }))}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="dropdown">Dropdown</option>
                <option value="date">Date</option>
                <option value="textarea">Textarea</option>
              </select>
              <input
                type="text"
                placeholder="Field Label"
                value={newField.label}
                onChange={(e) => setNewField(prev => ({ ...prev, label: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            {newField.type === 'dropdown' && (
              <input
                type="text"
                placeholder="Options (comma separated)"
                value={newField.options}
                onChange={(e) => setNewField(prev => ({ ...prev, options: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
              />
            )}
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newField.required}
                  onChange={(e) => setNewField(prev => ({ ...prev, required: e.target.checked }))}
                  className="mr-2"
                />
                Required
              </label>
              <button
                onClick={addField}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add Field
              </button>
            </div>
          </div>

          {fields.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold mb-4">Data Entry Form</h5>
              <div className="space-y-4">
                {fields.map(field => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'dropdown' ? (
                      <select
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select...</option>
                        {field.options?.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={3}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={submitData}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Submit Data
              </button>
            </div>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Live Data Summary</h4>
          
          {stats && Object.keys(stats).length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h5 className="font-semibold text-blue-800 mb-3">Statistical Summary</h5>
              {Object.entries(stats).map(([field, stat]) => (
                <div key={field} className="mb-2">
                  <div className="text-sm font-medium text-blue-700">{field}</div>
                  <div className="text-xs text-blue-600">
                    Count: {stat.count} | Mean: {stat.mean} | Std Dev: {stat.std}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <div className="text-lg font-semibold text-gray-700">
              Total Entries: {entries.length}
            </div>
            
            {entries.slice(-5).map(entry => (
              <div key={entry.id} className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
                <div className="text-sm">
                  {Object.entries(entry.data).map(([key, value]) => {
                    const field = fields.find(f => f.id === key);
                    return field ? (
                      <div key={key}>
                        <span className="font-medium">{field.label}:</span> {value}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCollectionForm;