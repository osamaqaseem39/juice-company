import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Product, 
  Brand, 
  Category, 
  SubCategory, 
  useCreateProduct, 
  useUpdateProduct, 
  useBrands, 
  useCategories, 
  useSubcategories 
} from '../../services/api';
import PageMeta from '../../components/common/PageMeta';

// Product-specific image upload
async function uploadProductImage(file: File): Promise<string> {
  const formData = new FormData();
  const ext = file.name.split('.').pop();
  const uniqueName = `${Date.now()}-product-${Math.random().toString(36).substring(2, 8)}.${ext}`;
  formData.append('file', file, uniqueName);
  const response = await fetch('https://osamaqaseem.online/upload.php', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  if (data.url) {
    return data.url;
  } else {
    throw new Error(data.error || 'Upload failed');
  }
}

// Add formatText and insertFormatting helpers (adapted from BlogForm)
function formatText(text: string) {
  text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.+?)__/g, '<em>$1</em>');
  text = text.replace(/^- (.+)$/gm, '<li>$1</li>').replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
  text = text.replace(/^\d+\. (.+)$/gm, '<li>$1</li>').replace(/((?:<li>.*<\/li>\n?)+)/g, '<ol>$1</ol>');
  text = text.replace(/`(.+?)`/g, '<code>$1</code>');
  text = text.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  text = text.replace(/^---$/gm, '<hr>');
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
  text = text.replace(/!img\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1">');
  text = text.replace(/<center>(.+?)<\/center>/g, '<div style="text-align: center">$1</div>');
  text = text.replace(/<right>(.+?)<\/right>/g, '<div style="text-align: right">$1</div>');
  text = text.replace(/<left>(.+?)<\/left>/g, '<div style="text-align: left">$1</div>');
  text = text.replace(/\n/g, '<br>');
  return text;
}

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Partial<Product>>({ name: '', description: '', images: [] });
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [previewFeatured, setPreviewFeatured] = useState<string | null>(null);
  const [previewGallery, setPreviewGallery] = useState<string[]>([]);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [createProduct] = useCreateProduct();
  const [updateProduct] = useUpdateProduct();
  const { data: brandsData } = useBrands();
  const { data: categoriesData } = useCategories();
  const { data: subcategoriesData } = useSubcategories();

  const brands = brandsData?.brands || [];
  const categories = categoriesData?.categories || [];
  const subcategories = subcategoriesData?.subcategories || [];

  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [descriptionPreview, setDescriptionPreview] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      // For now, we'll need to implement a getProductById hook
      // For now, we'll set loading to false and handle this later
      setLoading(false);
    } else {
      setProduct({ name: '', description: '', images: [] });
      setFeaturedImageFile(null);
      setGalleryFiles([]);
      setPreviewFeatured(null);
      setPreviewGallery([]);
      setExistingGallery([]);
    }
  }, [id]);

  useEffect(() => {
    setDescriptionPreview(formatText(product.description || ''));
  }, [product.description]);

  function insertFormatting(format: string) {
    const textarea = descriptionTextareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let replacement = '';

    switch (format) {
      case 'bold':
        replacement = `**${selectedText}**`;
        break;
      case 'italic':
        replacement = `__${selectedText}__`;
        break;
      case 'code':
        replacement = `\`${selectedText}\``;
        break;
      case 'link':
        replacement = `[${selectedText}](url)`;
        break;
      case 'image':
        replacement = `!img[${selectedText}](image-url)`;
        break;
      case 'h1':
        replacement = `# ${selectedText}`;
        break;
      case 'h2':
        replacement = `## ${selectedText}`;
        break;
      case 'h3':
        replacement = `### ${selectedText}`;
        break;
      case 'ul':
        replacement = `- ${selectedText}`;
        break;
      case 'ol':
        replacement = `1. ${selectedText}`;
        break;
      case 'quote':
        replacement = `> ${selectedText}`;
        break;
      case 'center':
        replacement = `<center>${selectedText}</center>`;
        break;
      case 'right':
        replacement = `<right>${selectedText}</right>`;
        break;
      case 'left':
        replacement = `<left>${selectedText}</left>`;
        break;
      case 'hr':
        replacement = `---`;
        break;
    }

    const newValue = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    setProduct(prev => ({ ...prev, description: newValue }));
    
    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 0);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let images = product.images || [];
      if (featuredImageFile) {
        const imageUrl = await uploadProductImage(featuredImageFile);
        images = [imageUrl];
      }

      const productData = {
        ...product,
        images,
      };

      if (id) {
        await updateProduct({ variables: { id, ...productData } });
      } else {
        await createProduct({ variables: productData });
      }

      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewFeatured(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewGallery(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewGallery(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = (index: number) => {
    setExistingGallery(prev => prev.filter((_, i) => i !== index));
    setPreviewGallery(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={`${id ? 'Edit' : 'Add'} Product | Nature Harvest Admin`}
        description={`${id ? 'Edit' : 'Add'} a new product to your catalog`}
      />
      <div className="w-full p-4">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold" style={{ color: '#062373' }}>
              {id ? 'Edit Product' : 'Add New Product'}
            </h1>
            <Link to="/products" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
              Back to Products
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Title *</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <select
                  name="brand"
                  value={product.brand}
                  onChange={handleSelectChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand: Brand) => (
                    <option key={brand._id} value={brand._id}>{brand.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleSelectChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((category: Category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                <select
                  name="subCategory"
                  value={product.subCategory}
                  onChange={handleSelectChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcategory: SubCategory) => (
                    <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <div className="mb-2">
                <div className="flex flex-wrap gap-2">
                  {['bold', 'italic', 'code', 'link', 'image', 'h1', 'h2', 'h3', 'ul', 'ol', 'quote', 'center', 'right', 'left', 'hr'].map(format => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => insertFormatting(format)}
                      className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                ref={descriptionTextareaRef}
                name="description"
                value={product.description}
                onChange={handleChange}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product description..."
              />
              {product.description && (
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: descriptionPreview }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFeaturedImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {previewFeatured && (
                <div className="mt-2">
                  <img src={previewFeatured} alt="Preview" className="w-32 h-32 object-cover rounded" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {(previewGallery.length > 0 || existingGallery.length > 0) && (
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {existingGallery.map((url, index) => (
                    <div key={`existing-${index}`} className="relative">
                      <img src={url} alt={`Gallery ${index}`} className="w-32 h-32 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeExistingGalleryImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {previewGallery.map((url, index) => (
                    <div key={`new-${index}`} className="relative">
                      <img src={url} alt={`Gallery ${index}`} className="w-32 h-32 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                to="/products"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Saving...' : (id ? 'Update Product' : 'Create Product')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductForm; 