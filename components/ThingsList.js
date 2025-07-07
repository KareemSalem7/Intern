import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';
import AddThingForm from './AddThingForm';

export default function ThingsList() {
  const [things, setThings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchThings = async () => {
    try {
      const data = await apiClient.getThings();
      setThings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThings();
  }, []);

  const handleThingAdded = (newThing) => {
    setThings(prev => [newThing, ...prev]);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading things...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-xl text-red-600 mb-2">Error loading things</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Things</h1>
          <p className="text-gray-600 mb-4">Manage your things collection</p>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {showForm ? 'Cancel' : 'Add New Thing'}
          </button>
        </div>

        {showForm && (
          <AddThingForm onThingAdded={handleThingAdded} />
        )}

        {things.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No things found</h3>
            <p className="text-gray-500">Get started by adding your first thing!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {things.map((thing) => (
              <div
                key={thing.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {thing.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ID: {thing.id}
                    </span>
                  </div>
                  
                  {thing.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {thing.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    {thing.createdAt && (
                      <span>Created: {new Date(thing.createdAt).toLocaleDateString()}</span>
                    )}
                    {thing.updatedAt && (
                      <span>Updated: {new Date(thing.updatedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 