import React, { useState } from 'react';

interface SIPOCItem {
  id: string;
  text: string;
  column: 'suppliers' | 'inputs' | 'process' | 'outputs' | 'customers';
}

const SIPOCDiagrammer: React.FC = () => {
  const [items, setItems] = useState<SIPOCItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<SIPOCItem['column']>('suppliers');

  const columns = [
    { id: 'suppliers', name: 'Suppliers', color: 'bg-red-100 border-red-300' },
    { id: 'inputs', name: 'Inputs', color: 'bg-orange-100 border-orange-300' },
    { id: 'process', name: 'Process', color: 'bg-blue-100 border-blue-300' },
    { id: 'outputs', name: 'Outputs', color: 'bg-green-100 border-green-300' },
    { id: 'customers', name: 'Customers', color: 'bg-purple-100 border-purple-300' }
  ];

  const addItem = () => {
    if (newItem.trim()) {
      setItems(prev => [...prev, {
        id: Date.now().toString(),
        text: newItem,
        column: selectedColumn
      }]);
      setNewItem('');
    }
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getItemsForColumn = (column: string) => {
    return items.filter(item => item.column === column);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">SIPOC Diagrammer</h3>
      
      <div className="mb-6 flex gap-4">
        <select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value as SIPOCItem['column'])}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {columns.map(col => (
            <option key={col.id} value={col.id}>{col.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <button
          onClick={addItem}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {columns.map(column => (
          <div key={column.id} className={`${column.color} rounded-lg p-4 min-h-64`}>
            <h4 className="font-bold text-gray-800 mb-3 text-center">{column.name}</h4>
            <div className="space-y-2">
              {getItemsForColumn(column.id).map(item => (
                <div key={item.id} className="bg-white p-2 rounded shadow-sm flex justify-between items-center">
                  <span className="text-sm">{item.text}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SIPOCDiagrammer;