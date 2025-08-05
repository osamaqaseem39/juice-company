import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Service, useServices, useDeleteService } from '../../services/api';
import { Modal } from '../../components/ui/modal';
import PageMeta from '../../components/common/PageMeta';

const ServiceList: React.FC = () => {
  const { data, loading, error, refetch } = useServices();
  const [deleteService] = useDeleteService();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'title' | ''>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const services = data?.services || [];

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService({ variables: { id } });
        refetch(); // Refetch the data after deletion
      } catch (err) {
        console.error('Error deleting service:', err);
      }
    }
  };

  const openModal = (img: string) => {
    setModalImg(img.replace('server/', ''));
    setModalOpen(true);
  };

  // Search and sort logic
  const filtered = services.filter((s: Service) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey] || '';
    const bVal = b[sortKey] || '';
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const handleSort = (key: 'title') => {
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
        title="Services | Nature Harvest Admin"
        description="Manage your service offerings"
      />
      <div className="w-full p-4">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold" style={{ color: '#062373' }}>Services</h1>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border rounded px-3 py-2 w-full md:w-64 text-[#062373]"
                style={{ color: '#2d2d2d' }}
              />
              <Link to="/services/add" className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition">Add Service</Link>
            </div>
          </div>
          
          {sorted.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full w-full border border-gray-200 rounded-lg text-[#2d2d2d]">
                <thead className="text-[#2d2d2d]">
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border">Image</th>
                    <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('title')}>
                      Title {sortKey === 'title' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-[#2d2d2d]">
                  {sorted.map((service: Service) => (
                    <tr key={service._id} className="border-t">
                      <td className="px-4 py-2 border">
                        {service.featuredImage && (
                          <img
                            src={service.featuredImage.replace('server/', '')}
                            alt={service.title}
                            className="w-16 h-16 object-cover rounded cursor-pointer"
                            onClick={() => openModal(service.featuredImage!)}
                          />
                        )}
                      </td>
                      <td className="px-4 py-2 border font-medium">{service.title}</td>
                      <td className="px-4 py-2 border max-w-xs truncate">{service.description}</td>
                      <td className="px-4 py-2 border">
                        <Link
                          to={`/services/${service._id}`}
                          className="px-3 py-1 rounded font-semibold bg-blue-100 text-blue-700 hover:bg-blue-200 transition mr-2"
                        >
                          View
                        </Link>
                        <Link
                          to={`/services/${service._id}/edit`}
                          className="px-3 py-1 rounded font-semibold bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition mr-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="px-3 py-1 rounded font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64" style={{ color: '#2d2d2d' }}>
              No services found.
            </div>
          )}
        </div>

        {/* Image Modal */}
        {modalOpen && modalImg && (
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <div className="p-4">
              <img
                src={modalImg}
                alt="Service image"
                className="max-w-full max-h-96 object-contain"
              />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default ServiceList; 