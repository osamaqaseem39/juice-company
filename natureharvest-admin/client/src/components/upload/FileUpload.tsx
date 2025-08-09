import React, { useState, useRef } from 'react';
import { useFileUpload } from '../../hooks';
import Button from '../ui/button/Button';
import Badge from '../ui/badge/Badge';
import { 
  DownloadIcon,
  FileIcon,
  VideoIcon,
  PageIcon,
  CheckCircleIcon,
  AlertIcon,
  CloseIcon,
  UploadIcon
} from '../../icons';

interface FileUploadProps {
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  onUploadComplete?: (files: string[]) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  multiple = false,
  accept = '*/*',
  maxSize = 10, // 10MB default
  onUploadComplete,
  className = ''
}) => {
  const { uploadFile, uploadMultipleFiles, loading, error, uploadedFiles, clearError, clearFiles } = useFileUpload();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`);
        return false;
      }
      return true;
    });

    if (multiple) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
    } else {
      setSelectedFiles(validFiles);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      if (multiple) {
        await uploadMultipleFiles(selectedFiles);
      } else {
        await uploadFile(selectedFiles[0]);
      }
      
      setSelectedFiles([]);
      onUploadComplete?.(uploadedFiles);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <FileIcon className="w-5 h-5" />;
    if (file.type.startsWith('video/')) return <VideoIcon className="w-5 h-5" />;
    if (file.type.startsWith('text/')) return <PageIcon className="w-5 h-5" />;
    return <FileIcon className="w-5 h-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drag & Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Drop files here or click to browse
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {multiple ? 'You can select multiple files' : 'Select a single file'} • 
          Max size: {maxSize}MB
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          Choose Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertIcon className="w-5 h-5 text-red-500" />
          <span className="text-red-700">{error}</span>
          <Button variant="ghost" size="sm" onClick={clearError}>
            <CloseIcon className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-900">Selected Files</h3>
            <Button variant="ghost" size="sm" onClick={() => setSelectedFiles([])}>
              Clear All
            </Button>
          </div>
          
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getFileIcon(file)}
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <CloseIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button
            onClick={handleUpload}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Uploading...' : `Upload ${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''}`}
          </Button>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-900">Uploaded Files</h3>
            <Button variant="ghost" size="sm" onClick={clearFiles}>
              Clear History
            </Button>
          </div>
          
          <div className="space-y-2">
            {uploadedFiles.map((fileUrl, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">File uploaded successfully</p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">{fileUrl}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(fileUrl)}
                >
                  <DownloadIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload; 