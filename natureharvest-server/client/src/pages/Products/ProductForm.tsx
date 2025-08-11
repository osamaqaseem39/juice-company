import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { productApi, Product, brandApi, Brand, categoryApi, Category, subcategoryApi, SubCategory, Flavor, Size, flavorApi, sizeApi } from '../../services/api';



// Product-specific image upload
async function uploadProductImage(file: File): Promise<string> {
  const formData = new FormData();
  const ext = file.name.split('.').pop();
  const uniqueName = `${Date.now()}-product-${Math.random().toString(36).substring(2, 8)}.${ext}`;
  formData.append('file', file, uniqueName);
  const response = await fetch('https://natureharvest.osamaqaseem.online/upload.php', {
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
  const [product, setProduct] = useState<Partial<Product>>({ 
    title: '', 
    description: '', 
    featuredImage: '', 
    gallery: [],
    flavors: [],
    sizes: []
  });
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [previewFeatured, setPreviewFeatured] = useState<string | null>(null);
  const [previewGallery, setPreviewGallery] = useState<string[]>([]);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [availableFlavors, setAvailableFlavors] = useState<Flavor[]>([]);
  const [availableSizes, setAvailableSizes] = useState<Size[]>([]);

  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [descriptionPreview, setDescriptionPreview] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      productApi.getById(id)
        .then(res => {
          setProduct(res.data);
          setPreviewFeatured(res.data.featuredImage ? res.data.featuredImage : null);
          setExistingGallery(res.data.gallery ? res.data.gallery : []);
          setPreviewGallery(res.data.gallery ? res.data.gallery : []);
        })
        .finally(() => setLoading(false));
    } else {
      setProduct({ 
        title: '', 
        description: '', 
        featuredImage: '', 
        gallery: [],
        flavors: [],
        sizes: []
      });
      setFeaturedImageFile(null);
      setGalleryFiles([]);
      setPreviewFeatured(null);
      setPreviewGallery([]);
      setExistingGallery([]);
    }
  }, [id]);

  useEffect(() => {
    brandApi.getAll().then(res => setBrands(res.data)).catch(() => setBrands([]));
    categoryApi.getAll().then(res => setCategories(res.data)).catch(() => setCategories([]));
    productApi.getAll().then(res => setAllProducts(res.data)).catch(() => setAllProducts([]));
    subcategoryApi.getAll().then(res => setSubcategories(res.data)).catch(() => setSubcategories([]));
    flavorApi.getAll().then(res => setAvailableFlavors(res.data)).catch(() => setAvailableFlavors([]));
    sizeApi.getAll().then(res => setAvailableSizes(res.data)).catch(() => setAvailableSizes([]));
  }, []);

  useEffect(() => {
    setDescriptionPreview(formatText(product.description || ''));
  }, [product.description]);

  function insertFormatting(format: string) {
    const textarea = descriptionTextareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    let insertion = '';
    switch(format) {
      case 'bold': insertion = '**' + (start === end ? 'text' : selectedText) + '**'; break;
      case 'italic': insertion = '__' + (start === end ? 'text' : selectedText) + '__'; break;
      case 'h1': insertion = '# ' + (start === end ? 'Heading 1' : selectedText); break;
      case 'h2': insertion = '## ' + (start === end ? 'Heading 2' : selectedText); break;
      case 'h3': insertion = '### ' + (start === end ? 'Heading 3' : selectedText); break;
      case 'ul': insertion = '- ' + (start === end ? 'List item' : selectedText); break;
      case 'ol': insertion = '1. ' + (start === end ? 'List item' : selectedText); break;
      case 'code': insertion = '`' + (start === end ? 'code' : selectedText) + '`'; break;
      case 'quote': insertion = '> ' + (start === end ? 'Quote' : selectedText); break;
      case 'hr': insertion = '---'; break;
      case 'link': insertion = '[' + (start === end ? 'link text' : selectedText) + '](url)'; break;
      case 'image': insertion = '!img[alt text](image-url)'; break;
      case 'center': insertion = '<center>' + (start === end ? 'centered text' : selectedText) + '</center>'; break;
      case 'right': insertion = '<right>' + (start === end ? 'right-aligned text' : selectedText) + '</right>'; break;
      case 'left': insertion = '<left>' + (start === end ? 'left-aligned text' : selectedText) + '</left>'; break;
    }
    const newText = text.substring(0, start) + insertion + text.substring(end);
    setProduct(prev => ({ ...prev, description: newText }));
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + insertion.length;
      }
    }, 0);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setProduct(prev => ({
        ...prev,
        category: value,
        subCategory: '', // Reset subcategory when category changes
      }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let featuredImageUrl = product.featuredImage;
      if (featuredImageFile) {
        featuredImageUrl = await uploadProductImage(featuredImageFile);
      }
      let galleryUrls: string[] = [];
      if (galleryFiles.length > 0) {
        for (const file of galleryFiles) {
          const url = await uploadProductImage(file);
          galleryUrls.push(url);
        }
      } else if (existingGallery.length > 0) {
        galleryUrls = existingGallery;
      }
      // Always set featuredImage and gallery, even if empty
      const payload = {
        ...product,
        featuredImage: featuredImageUrl || '',
        gallery: galleryUrls.length > 0 ? galleryUrls : [],
        subCategory: product.subCategory || '',
        flavors: product.flavors || [],
        sizes: product.sizes || []
      };
      // Debug log
      console.log('Submitting product:', payload);
      if (id) {
        await productApi.update(id, payload as any);
      } else {
        await productApi.create(payload as any);
        setProduct({ 
          title: '', 
          description: '', 
          featuredImage: '', 
          gallery: [],
          flavors: [],
          sizes: []
        });
        setFeaturedImageFile(null);
        setGalleryFiles([]);
        setPreviewFeatured(null);
        setPreviewGallery([]);
        setExistingGallery([]);
      }
      navigate('/products');
    } catch (err) {
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  // Flavor management functions
  const addFlavor = () => {
    const newFlavor: Flavor = {
      _id: '',
      name: '',
      description: '',
      image: ''
    };
    setProduct(prev => ({
      ...prev,
      flavors: [...(prev.flavors || []), newFlavor]
    }));
  };

  const updateFlavor = (index: number, field: keyof Flavor, value: string) => {
    setProduct(prev => ({
      ...prev,
      flavors: prev.flavors?.map((flavor, i) => 
        i === index ? { ...flavor, [field]: value } : flavor
      ) || []
    }));
  };

  const removeFlavor = (index: number) => {
    setProduct(prev => ({
      ...prev,
      flavors: prev.flavors?.filter((_, i) => i !== index) || []
    }));
  };

  const handleFlavorImageUpload = async (index: number, file: File) => {
    try {
      const url = await uploadProductImage(file);
      updateFlavor(index, 'image', url);
    } catch (error) {
      alert('Error uploading flavor image');
    }
  };

  // Size management functions
  const addSize = () => {
    const newSize: Size = {
      _id: '',
      name: '',
      description: '',
      image: ''
    };
    setProduct(prev => ({
      ...prev,
      sizes: [...(prev.sizes || []), newSize]
    }));
  };

  const updateSize = (index: number, field: keyof Size, value: string) => {
    setProduct(prev => ({
      ...prev,
      sizes: prev.sizes?.map((size, i) => 
        i === index ? { ...size, [field]: value } : size
      ) || []
    }));
  };

  const removeSize = (index: number) => {
    setProduct(prev => ({
      ...prev,
      sizes: prev.sizes?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSizeImageUpload = async (index: number, file: File) => {
    try {
      const url = await uploadProductImage(file);
      updateSize(index, 'image', url);
    } catch (error) {
      alert('Error uploading size image');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 border border-gray-200 dark:border-gray-800">
        <Link to="/products" className="inline-block mb-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition">← Back</Link>
        <h1 className="text-3xl font-extrabold mb-6 text-center text-brand-700 dark:text-brand-400">{id ? 'Edit Product' : 'Add Product'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input type="text" name="title" value={product.title as string} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <div className="mt-1 flex flex-wrap gap-2 mb-2">
              <div className="flex gap-2 border-r pr-2 mr-2">
                <button type="button" onClick={() => insertFormatting('bold')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Bold">B</button>
                <button type="button" onClick={() => insertFormatting('italic')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Italic">I</button>
              </div>
              <div className="flex gap-2 border-r pr-2 mr-2">
                <button type="button" onClick={() => insertFormatting('h1')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Heading 1">H1</button>
                <button type="button" onClick={() => insertFormatting('h2')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Heading 2">H2</button>
                <button type="button" onClick={() => insertFormatting('h3')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Heading 3">H3</button>
              </div>
              <div className="flex gap-2 border-r pr-2 mr-2">
                <button type="button" onClick={() => insertFormatting('ul')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Bullet List">•</button>
                <button type="button" onClick={() => insertFormatting('ol')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Numbered List">1.</button>
              </div>
              <div className="flex gap-2 border-r pr-2 mr-2">
                <button type="button" onClick={() => insertFormatting('code')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Code">{'</>'}</button>
                <button type="button" onClick={() => insertFormatting('quote')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Quote">"</button>
              </div>
              <div className="flex gap-2 border-r pr-2 mr-2">
                <button type="button" onClick={() => insertFormatting('link')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Link">🔗</button>
                <button type="button" onClick={() => insertFormatting('image')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Image">🖼️</button>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => insertFormatting('center')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Center Align">≡</button>
                <button type="button" onClick={() => insertFormatting('right')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Right Align">≫</button>
                <button type="button" onClick={() => insertFormatting('left')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Left Align">≪</button>
              </div>
            </div>
            <textarea
              ref={descriptionTextareaRef}
              name="description"
              value={product.description as string}
              onChange={handleChange}
              required
              rows={8}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 mt-4">Preview</label>
            <div
              className="mt-1 p-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              dangerouslySetInnerHTML={{ __html: descriptionPreview }}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Brand</label>
            <select name="brand" value={product.brand || ''} onChange={handleSelectChange} className="w-full border px-3 py-2 rounded" required>
              <option value="">Select a brand</option>
              {brands.map(b => (
                <option key={b._id} value={b._id}>{b.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select name="category" value={product.category || ''} onChange={handleSelectChange} className="w-full border px-3 py-2 rounded" required>
              <option value="">Select a category</option>
              {categories.filter(c => !c.parent).map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          {product.category && (
            <div>
              <label className="block font-semibold mb-1">Subcategory</label>
              <select name="subCategory" value={product.subCategory || ''} onChange={handleSelectChange} className="w-full border px-3 py-2 rounded">
                <option value="">Select a subcategory</option>
                {subcategories.filter(sc => {
                  if (!sc.parent) return false;
                  if (typeof sc.parent === 'string') return sc.parent === product.category;
                  if (typeof sc.parent === 'object' && sc.parent._id) return sc.parent._id === product.category;
                  return false;
                }).map(sc => (
                  <option key={sc._id} value={sc._id}>{sc.name}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block font-semibold mb-1">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  const url = await uploadProductImage(e.target.files[0]);
                  setFeaturedImageFile(null);
                  setPreviewFeatured(url);
                  setProduct(prev => ({ ...prev, featuredImage: url }));
                }
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 transition"
            />
            {previewFeatured && (
              <div className="relative inline-block mt-2">
                <img src={previewFeatured} alt="Preview" className="h-32 w-32 object-cover rounded border" />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
                  onClick={() => {
                    setPreviewFeatured('');
                    setProduct(prev => ({ ...prev, featuredImage: '' }));
                  }}
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">Gallery Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={async (e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const urls: string[] = [];
                  for (let i = 0; i < e.target.files.length; i++) {
                    const url = await uploadProductImage(e.target.files[i]);
                    urls.push(url);
                  }
                  setPreviewGallery(urls);
                  setProduct(prev => ({ ...prev, gallery: urls }));
                }
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 transition"
            />
            {previewGallery && previewGallery.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {previewGallery.map((img, idx) => (
                  <div key={idx} className="relative inline-block">
                    <img src={img} alt={`Gallery ${idx}`} className="h-20 w-20 object-cover rounded border" />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
                      onClick={() => {
                        const newGallery = previewGallery.filter((_, i) => i !== idx);
                        setPreviewGallery(newGallery);
                        setProduct(prev => ({ ...prev, gallery: newGallery }));
                      }}
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <div className="mt-1 flex flex-wrap gap-2 mb-2">
              <div className="flex gap-2 border-r pr-2 mr-2">
                <button type="button" onClick={() => insertFormatting('bold')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Bold">B</button>
                <button type="button" onClick={() => insertFormatting('italic')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Italic">I</button>
              </div>
              <div className="flex gap-2 border-r pr-2 mr-2">
                <button type="button" onClick={() => insertFormatting('h1')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Heading 1">H1</button>
                <button type="button" onClick={() => insertFormatting('h2')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Heading 2">H2</button>
                <button type="button" onClick={() => insertFormatting('h3')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Heading 3">H3</button>
              </div>
              <div className="flex gap-2 border-r pr-2 mr-2">
                <button type="button" onClick={() => insertFormatting('ul')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Bullet List">•</button>
                <button type="button" onClick={() => insertFormatting('ol')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Numbered List">1.</button>
              </div>
              <div className="flex gap-2 border-r pr-2 mr-2">
                <button type="button" onClick={() => insertFormatting('code')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Code">{'</>'}</button>
                <button type="button" onClick={() => insertFormatting('quote')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Quote">"</button>
              </div>
              <div className="flex gap-2 border-r pr-2 mr-2">
                <button type="button" onClick={() => insertFormatting('link')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Link">🔗</button>
                <button type="button" onClick={() => insertFormatting('image')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Image">🖼️</button>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => insertFormatting('center')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Center Align">≡</button>
                <button type="button" onClick={() => insertFormatting('right')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Right Align">≫</button>
                <button type="button" onClick={() => insertFormatting('left')} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600" title="Left Align">≪</button>
              </div>
            </div>
            <textarea
              ref={descriptionTextareaRef}
              name="description"
              value={product.description as string}
              onChange={handleChange}
              required
              rows={8}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 mt-4">Preview</label>
            <div
              className="mt-1 p-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              dangerouslySetInnerHTML={{ __html: descriptionPreview }}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Brand</label>
            <select name="brand" value={product.brand || ''} onChange={handleSelectChange} className="w-full border px-3 py-2 rounded" required>
              <option value="">Select a brand</option>
              {brands.map(b => (
                <option key={b._id} value={b._id}>{b.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select name="category" value={product.category || ''} onChange={handleSelectChange} className="w-full border px-3 py-2 rounded" required>
              <option value="">Select a category</option>
              {categories.filter(c => !c.parent).map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          {product.category && (
            <div>
              <label className="block font-semibold mb-1">Subcategory</label>
              <select name="subCategory" value={product.subCategory || ''} onChange={handleSelectChange} className="w-full border px-3 py-2 rounded">
                <option value="">Select a subcategory</option>
                {subcategories.filter(sc => {
                  if (!sc.parent) return false;
                  if (typeof sc.parent === 'string') return sc.parent === product.category;
                  if (typeof sc.parent === 'object' && sc.parent._id) return sc.parent._id === product.category;
                  return false;
                }).map(sc => (
                  <option key={sc._id} value={sc._id}>{sc.name}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block font-semibold mb-1">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  const url = await uploadProductImage(e.target.files[0]);
                  setFeaturedImageFile(null);
                  setPreviewFeatured(url);
                  setProduct(prev => ({ ...prev, featuredImage: url }));
                }
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 transition"
            />
            {previewFeatured && (
              <div className="relative inline-block mt-2">
                <img src={previewFeatured} alt="Preview" className="h-32 w-32 object-cover rounded border" />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
                  onClick={() => {
                    setPreviewFeatured('');
                    setProduct(prev => ({ ...prev, featuredImage: '' }));
                  }}
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">Gallery Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={async (e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const urls: string[] = [];
                  for (let i = 0; i < e.target.files.length; i++) {
                    const url = await uploadProductImage(e.target.files[i]);
                    urls.push(url);
                  }
                  setPreviewGallery(urls);
                  setProduct(prev => ({ ...prev, gallery: urls }));
                }
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 transition"
            />
            {previewGallery && previewGallery.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {previewGallery.map((img, idx) => (
                  <div key={idx} className="relative inline-block">
                    <img src={img} alt={`Gallery ${idx}`} className="h-20 w-20 object-cover rounded border" />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
                      onClick={() => {
                        const newGallery = previewGallery.filter((_, i) => i !== idx);
                        setPreviewGallery(newGallery);
                        setProduct(prev => ({ ...prev, gallery: newGallery }));
                      }}
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Flavors Section */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Flavors</h2>
              <div className="flex gap-2">
                <Link
                  to="/flavors"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Manage Flavors
                </Link>
                <button
                  type="button"
                  onClick={addFlavor}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Add Flavor
                </button>
              </div>
            </div>
            {product.flavors && product.flavors.length > 0 ? (
              <div className="space-y-4">
                {product.flavors.map((flavor, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">Flavor {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeFlavor(index)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Flavor</label>
                        <select
                          value={flavor._id || ''}
                          onChange={(e) => {
                            const selectedFlavor = availableFlavors.find(f => f._id === e.target.value);
                            if (selectedFlavor) {
                              updateFlavor(index, '_id', selectedFlavor._id!);
                              updateFlavor(index, 'name', selectedFlavor.name);
                              updateFlavor(index, 'description', selectedFlavor.description);
                              updateFlavor(index, 'image', selectedFlavor.image || '');
                            }
                          }}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
                          required
                        >
                          <option value="">Select a flavor</option>
                          {availableFlavors.map(f => (
                            <option key={f._id} value={f._id}>{f.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preview</label>
                        {flavor.image && (
                          <div className="mt-2">
                            <img src={flavor.image.replace('server/', '')} alt="Flavor preview" className="h-20 w-20 object-cover rounded border" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                      <textarea
                        value={flavor.description}
                        onChange={(e) => updateFlavor(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
                        required
                        readOnly
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No flavors added yet. Click "Add Flavor" to get started.</p>
            )}
          </div>

          {/* Sizes Section */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sizes</h2>
              <div className="flex gap-2">
                <Link
                  to="/sizes"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Manage Sizes
                </Link>
                <button
                  type="button"
                  onClick={addSize}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add Size
                </button>
              </div>
            </div>
            {product.sizes && product.sizes.length > 0 ? (
              <div className="space-y-4">
                {product.sizes.map((size, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">Size {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeSize(index)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Size</label>
                        <select
                          value={size._id || ''}
                          onChange={(e) => {
                            const selectedSize = availableSizes.find(s => s._id === e.target.value);
                            if (selectedSize) {
                              updateSize(index, '_id', selectedSize._id!);
                              updateSize(index, 'name', selectedSize.name);
                              updateSize(index, 'description', selectedSize.description);
                              updateSize(index, 'image', selectedSize.image || '');
                            }
                          }}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
                          required
                        >
                          <option value="">Select a size</option>
                          {availableSizes.map(s => (
                            <option key={s._id} value={s._id}>{s.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preview</label>
                        {size.image && (
                          <div className="mt-2">
                            <img src={size.image.replace('server/', '')} alt="Size preview" className="h-20 w-20 object-cover rounded border" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                      <textarea
                        value={size.description}
                        onChange={(e) => updateSize(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
                        required
                        readOnly
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No sizes added yet. Click "Add Size" to get started.</p>
            )}
          </div>

          <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg font-bold text-lg shadow transition disabled:opacity-60 disabled:cursor-not-allowed" disabled={loading}>{loading ? (id ? 'Updating...' : 'Saving...') : (id ? 'Update Product' : 'Save Product')}</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm; 