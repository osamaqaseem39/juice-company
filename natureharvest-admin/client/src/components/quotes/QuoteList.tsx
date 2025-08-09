import React, { useState } from 'react';
import { useQuotes, useDeleteQuote, useUpdateQuote } from '../../hooks';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import Button from '../ui/button/Button';
import Badge from '../ui/badge/Badge';
import Select from '../form/Select';
import { 
  PencilIcon, 
  TrashBinIcon, 
  EyeIcon, 
  ChatIcon,
  MailIcon
} from '../../icons';

interface QuoteListProps {
  onView?: (quote: any) => void;
  onEdit?: (quote: any) => void;
}

const QuoteList: React.FC<QuoteListProps> = ({
  onView,
  onEdit
}) => {
  const { data, loading, error } = useQuotes();
  const [deleteQuote] = useDeleteQuote();
  const [updateQuote] = useUpdateQuote();
  const [statusFilter, setStatusFilter] = useState('all');

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      try {
        await deleteQuote({ variables: { id } });
      } catch (err) {
        console.error('Error deleting quote:', err);
      }
    }
  };

  const handleStatusChange = async (quoteId: string, newStatus: string) => {
    try {
      await updateQuote({
        variables: {
          id: quoteId,
          input: { status: newStatus }
        }
      });
    } catch (err) {
      console.error('Error updating quote status:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="text-center py-8">Loading quotes...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error.message}</div>;

  let quotes = data?.quotes || [];
  
  // Apply status filter
  if (statusFilter !== 'all') {
    quotes = quotes.filter((quote: any) => quote.status === statusFilter);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Customer Quotes</h2>
        <div className="flex items-center gap-4">
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'pending', label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' }
            ]}
            className="w-40"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote: any) => (
              <TableRow key={quote._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {quote.image && (
                      <img 
                        src={quote.image} 
                        alt="Customer"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium">{quote.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <MailIcon className="w-3 h-3" />
                        {quote.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <ChatIcon className="w-3 h-3" />
                      {quote.phone || 'No phone'}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="truncate" title={quote.details}>
                    {quote.details}
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={quote.status}
                    onChange={(newStatus) => handleStatusChange(quote._id, newStatus)}
                    options={[
                      { value: 'pending', label: 'Pending' },
                      { value: 'approved', label: 'Approved' },
                      { value: 'rejected', label: 'Rejected' }
                    ]}
                    className="w-32"
                  />
                </TableCell>
                <TableCell>
                  {new Date(quote.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {onView && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(quote)}
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(quote)}
                        title="Edit Quote"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(quote._id)}
                      className="text-red-600 hover:text-red-700"
                      title="Delete Quote"
                    >
                      <TrashBinIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {quotes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {statusFilter === 'all' ? 'No quotes found' : `No ${statusFilter} quotes found`}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteList; 