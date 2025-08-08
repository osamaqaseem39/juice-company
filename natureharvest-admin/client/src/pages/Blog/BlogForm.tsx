import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateBlog, useUpdateBlog, useBlog } from '../../services/apiService';
import { FormLayout } from '../../components/forms/FormLayout';
import { uploadImage } from '../../utils/formUtils';

interface BlogFormProps {
  mode: 'add' | 'edit';
}

const BlogForm: React.FC<BlogFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [createBlog] = useCreateBlog();
  const [updateBlog] = useUpdateBlog();
  const { data: blogData, loading: blogLoading } = useBlog(id || '');
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [previewFeatured, setPreviewFeatured] = useState<string | null>(null);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-');
  };
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
    featuredImage: ''
  });







  const formatText = (text: string) => {
    // Replace headings
    text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');

    // Replace bold and italic
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.+?)__/g, '<em>$1</em>');

    // Replace lists
    text = text.replace(/^- (.+)$/gm, '<li>$1</li>').replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
    text = text.replace(/^\d+\. (.+)$/gm, '<li>$1</li>').replace(/((?:<li>.*<\/li>\n?)+)/g, '<ol>$1</ol>');

    // Replace code
    text = text.replace(/`(.+?)`/g, '<code>$1</code>');

    // Replace blockquotes
    text = text.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

    // Replace horizontal lines
    text = text.replace(/^---$/gm, '<hr>');

    // Replace links and images
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
    text = text.replace(/!img\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1">');

    // Replace alignment tags
    text = text.replace(/<center>(.+?)<\/center>/g, '<div style="text-align: center">$1</div>');
    text = text.replace(/<right>(.+?)<\/right>/g, '<div style="text-align: right">$1</div>');
    text = text.replace(/<left>(.+?)<\/left>/g, '<div style="text-align: left">$1</div>');

    // Replace newlines with <br>
    text = text.replace(/\n/g, '<br>');

    return text;
  };

  useEffect(() => {
    setPreview(formatText(formData.content));
  }, [formData.content]);

  useEffect(() => {
    if (mode === 'edit' && blogData?.blog) {
      const blog = blogData.blog;
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        status: blog.status || 'draft',
        featuredImage: blog.featuredImage || ''
      });
      setPreviewFeatured(blog.featuredImage || null);
    }
  }, [mode, blogData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let featuredImageUrl = formData.featuredImage;
      if (featuredImageFile instanceof File) {
        featuredImageUrl = await uploadImage(featuredImageFile);
      }
      
      // Generate slug from title
      const slug = generateSlug(formData.title);
      
      const payload = {
        ...formData,
        slug,
        featuredImage: featuredImageUrl || '',
      };

      if (mode === 'add') {
        await createBlog({
          variables: {
            input: payload
          }
        });
        navigate('/blog');
      } else if (mode === 'edit' && id) {
        await updateBlog({
          variables: {
            id,
            input: payload
          }
        });
        navigate(`/blog`);
      }
    } catch (err: any) {
      setError(`Failed to ${mode} blog post. Please try again.`);
      console.error(`Error ${mode}ing blog:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const insertFormatting = (format: string) => {
    const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    let insertion = '';

    switch(format) {
      case 'bold':
        insertion = '**' + (start === end ? 'text' : selectedText) + '**';
        break;
      case 'italic':
        insertion = '__' + (start === end ? 'text' : selectedText) + '__';
        break;
      case 'h1':
        insertion = '# ' + (start === end ? 'Heading 1' : selectedText);
        break;
      case 'h2':
        insertion = '## ' + (start === end ? 'Heading 2' : selectedText);
        break;
      case 'h3':
        insertion = '### ' + (start === end ? 'Heading 3' : selectedText);
        break;
      case 'ul':
        insertion = '- ' + (start === end ? 'List item' : selectedText);
        break;
      case 'ol':
        insertion = '1. ' + (start === end ? 'List item' : selectedText);
        break;
      case 'code':
        insertion = '`' + (start === end ? 'code' : selectedText) + '`';
        break;
      case 'quote':
        insertion = '> ' + (start === end ? 'Quote' : selectedText);
        break;
      case 'hr':
        insertion = '---';
        break;
      case 'link':
        insertion = '[' + (start === end ? 'link text' : selectedText) + '](url)';
        break;
      case 'image':
        insertion = '!img[alt text](image-url)';
        break;
      case 'center':
        insertion = '<center>' + (start === end ? 'centered text' : selectedText) + '</center>';
        break;
      case 'right':
        insertion = '<right>' + (start === end ? 'right-aligned text' : selectedText) + '</right>';
        break;
      case 'left':
        insertion = '<left>' + (start === end ? 'left-aligned text' : selectedText) + '</left>';
        break;
    }

    const newText = text.substring(0, start) + insertion + text.substring(end);
    setFormData(prev => ({ ...prev, content: newText }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <FormLayout
      title={mode === 'add' ? 'Create New Blog Post' : 'Edit Blog Post'}
      description={`${mode === 'add' ? 'Create' : 'Edit'} a new blog post`}
      backPath="/blog"
      backText="Back to Blog"
      error={error || undefined}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logo-red focus:ring-logo-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logo-red focus:ring-logo-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              if (e.target.files && e.target.files[0]) {
                const url = await uploadImage(e.target.files[0]);
                setFeaturedImageFile(null);
                setPreviewFeatured(url);
                setFormData(prev => ({ ...prev, featuredImage: url }));
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-logo-red/10 file:text-logo-red hover:file:bg-logo-red/20 transition"
          />
          {previewFeatured && (
            <div className="relative inline-block mt-2">
              <img src={previewFeatured} alt="Preview" className="h-32 w-32 object-cover rounded border" />
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
                onClick={() => {
                  setPreviewFeatured('');
                  setFormData(prev => ({ ...prev, featuredImage: '' }));
                }}
                title="Remove image"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <div className="mt-1 flex flex-wrap gap-2 mb-2">
            <div className="flex gap-2 border-r pr-2 mr-2">
              <button
                type="button"
                onClick={() => insertFormatting('bold')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Bold"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('italic')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Italic"
              >
                I
              </button>
            </div>
            <div className="flex gap-2 border-r pr-2 mr-2">
              <button
                type="button"
                onClick={() => insertFormatting('h1')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Heading 1"
              >
                H1
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('h2')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Heading 2"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('h3')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Heading 3"
              >
                H3
              </button>
            </div>
            <div className="flex gap-2 border-r pr-2 mr-2">
              <button
                type="button"
                onClick={() => insertFormatting('ul')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Bullet List"
              >
                •
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('ol')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Numbered List"
              >
                1.
              </button>
            </div>
            <div className="flex gap-2 border-r pr-2 mr-2">
              <button
                type="button"
                onClick={() => insertFormatting('code')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Code"
              >
                {'</>'}
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('quote')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Quote"
              >
                "
              </button>
            </div>
            <div className="flex gap-2 border-r pr-2 mr-2">
              <button
                type="button"
                onClick={() => insertFormatting('link')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Link"
              >
                🔗
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('image')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Image"
              >
                🖼️
              </button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => insertFormatting('center')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Center Align"
              >
                ≡
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('right')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Right Align"
              >
                ≫
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('left')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Left Align"
              >
                ≪
              </button>
            </div>
          </div>
          <textarea
            id="content-textarea"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={10}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logo-red focus:ring-logo-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preview
          </label>
          <div
            className="mt-1 p-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-logo-red border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-logo-red disabled:opacity-50"
          >
            {loading ? 'Saving...' : mode === 'add' ? 'Create Post' : 'Update Post'}
          </button>
        </div>
      </form>
    </FormLayout>
  );
};

export default BlogForm; 