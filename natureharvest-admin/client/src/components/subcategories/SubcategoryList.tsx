import React, { useState } from 'react';
import { useSubcategories, useDeleteSubcategory } from '../../hooks';
import { useCategories } from '../../hooks';
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
import { 
  PencilIcon, 
  TrashBinIcon, 
  PlusIcon, 
  EyeIcon 
} from '../../icons';

interface SubcategoryListProps {
  onEdit?: (subcategory: any) => void;
  onView?: (subcategory: any) => void;
  onCreate?: () => void;
}

const SubcategoryList: React.FC<SubcategoryListProps> = ({
  onEdit,
  onView,
  onCreate
}) => {
  const { data, loading, error } = useSubcategories();
  const { data: categoriesData } = useCategories();
  const [deleteSubcategory] = useDeleteSubcategory();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      try {
        await deleteSubcategory({ variables: { id } });
      } catch (err) {
        console.error('Error deleting subcategory:', err);
      }
    }
  };

  const getCategoryName = (categoryId: string) => {
    if (!categoriesData?.categories) return 'Unknown';
    const category = categoriesData.categories.find((cat: any) => cat._id === categoryId);
    return category?.name || 'Unknown';
  };

  if (loading) return <div className="text-center py-8">Loading subcategories...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error.message}</div>;

  const subcategories = data?.subcategories || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Subcategories</h2>
        {onCreate && (
          <Button onClick={onCreate} className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            Add Subcategory
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Parent Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subcategories.map((subcategory: any) => (
              <TableRow key={subcategory._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    {subcategory.image && (
                      <img 
                        src={subcategory.image} 
                        alt={subcategory.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                    )}
                    {subcategory.name}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {subcategory.description}
                </TableCell>
                <TableCell>
                  <Badge variant="light">
                    {getCategoryName(subcategory.category)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={subcategory.isActive ? "solid" : "light"}>
                    {subcategory.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(subcategory.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {onView && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(subcategory)}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(subcategory)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(subcategory._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <TrashBinIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {subcategories.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No subcategories found
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcategoryList; 