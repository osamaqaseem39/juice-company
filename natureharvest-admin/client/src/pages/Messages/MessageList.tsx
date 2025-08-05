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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Message Requests | Nature Harvest Admin"
        description="Manage customer message requests and their status."
      />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Message Requests</h1>
        
        {messages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Details</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((q: Quote) => (
                  <tr key={q._id} className="border-t">
                    <td className="px-4 py-2 border font-medium">{q.name}</td>
                    <td className="px-4 py-2 border">{q.email}</td>
                    <td className="px-4 py-2 border">{q.phone}</td>
                    <td className="px-4 py-2 border max-w-xs truncate" title={q.details}>{q.details}</td>
                    <td className="px-4 py-2 border">
                      {q.image ? (
                        <a href={q.image} target="_blank" rel="noopener noreferrer">
                          <img src={q.image} alt="Message" className="w-16 h-16 object-cover rounded shadow" />
                        </a>
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      <select
                        value={q.status}
                        onChange={e => handleStatusChange(q._id, e.target.value)}
                        className="px-2 py-1 rounded border text-xs font-semibold"
                        disabled={updatingId === q._id}
                      >
                        {statusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2 border text-xs text-gray-500">{new Date(q.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">No message requests found.</div>
          </div>
        )}
      </div>
    </>
  );
};

export default MessageList; 