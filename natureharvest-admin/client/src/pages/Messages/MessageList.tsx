import React, { useState } from 'react';
import { Quote, useQuotes, useUpdateQuote } from '../../services/api';
import PageMeta from "../../components/common/PageMeta";

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'rejected', label: 'Rejected' },
];

const MessageList: React.FC = () => {
  const { data, loading, error, refetch } = useQuotes();
  const [updateQuote] = useUpdateQuote();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'email' | ''>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const messages = data?.quotes || [];

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await updateQuote({ variables: { id, status } });
      refetch(); // Refetch the data after update
    } catch (err) {
      console.error('Error updating quote:', err);
      alert('Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  // Search and sort logic
  const filtered = messages.filter((q: Quote) =>
    q.name.toLowerCase().includes(search.toLowerCase()) ||
    q.email.toLowerCase().includes(search.toLowerCase()) ||
    q.details.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a: Quote, b: Quote) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey] || '';
    const bVal = b[sortKey] || '';
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const handleSort = (key: 'name' | 'email') => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logo-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-logo-red">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Message Requests | Nature Harvest Admin"
        description="Manage customer message requests and their status."
      />
      <div className="w-full">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Message Requests</h1>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border rounded px-3 py-2 w-full md:w-64 text-gray-700 focus:ring-2 focus:ring-logo-red focus:border-logo-red"
              />
            </div>
          </div>

          {sorted.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleSort('name')}>
                      Name {sortKey === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleSort('email')}>
                      Email {sortKey === 'email' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Phone</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Details</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Image</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((q: Quote) => (
                    <tr key={q._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 border">
                        <div className="font-medium text-gray-900">{q.name}</div>
                      </td>
                      <td className="px-4 py-2 border text-sm text-gray-700">
                        {q.email}
                      </td>
                      <td className="px-4 py-2 border text-sm text-gray-700">
                        {q.phone}
                      </td>
                      <td className="px-4 py-2 border text-sm text-gray-700">
                        <div className="truncate max-w-xs" title={q.details}>{q.details}</div>
                      </td>
                      <td className="px-4 py-2 border">
                        {q.image ? (
                          <a href={q.image} target="_blank" rel="noopener noreferrer">
                            <img 
                              src={q.image} 
                              alt="Message" 
                              className="w-12 h-12 object-cover rounded"
                            />
                          </a>
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Image</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        <select
                          value={q.status}
                          onChange={e => handleStatusChange(q._id, e.target.value)}
                          className={`px-2 py-1 rounded border text-xs font-semibold ${
                            q.status === 'completed' ? 'bg-green-100 text-green-800' :
                            q.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                            q.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                          disabled={updatingId === q._id}
                        >
                          {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2 border text-sm text-gray-700">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64 text-gray-500">
              No message requests found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageList; 