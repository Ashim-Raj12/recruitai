import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, CheckCircle, AlertCircle, X, Loader2 } from 'lucide-react';
import { resumeService } from '../services/resumeService';
import { toast } from 'react-hot-toast';

const UploadResume = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState(0);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const processingMessages = [
    "Uploading document securely...",
    "Extracting text from PDF...",
    "Running AI Agent Analysis...",
    "Generating career insights...",
    "Finalizing AI Profile..."
  ];

  useEffect(() => {
    let interval;
    if (isUploading && progress === 100) {
      interval = setInterval(() => {
        setProcessingStep((prev) => {
          if (prev < processingMessages.length - 1) return prev + 1;
          return prev;
        });
      }, 3000);
    } else {
      setProcessingStep(0);
    }
    return () => clearInterval(interval);
  }, [isUploading, progress, processingMessages.length]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile) => {
    setError(null);
    if (!selectedFile) return false;

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF or DOCX file.');
      return false;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB.');
      return false;
    }

    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);
      
      const response = await resumeService.uploadResume(file, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted);
      });

      if (response.success) {
        toast.success('Resume analyzed successfully!');
        // We will pass the resume ID in the query params to the analyzer dashboard
        navigate(`/resume/analyzer?id=${response.data.resume._id}`);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred during upload or analysis.');
      toast.error('Failed to process resume');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          AI Resume Intelligence
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Upload your resume to get deep AI-driven insights, ATS scoring, and targeted feedback to land your dream job.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-8 sm:p-12">
          
          {!file && (
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ease-in-out ${
                dragActive 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleChange}
              />
              
              <div className="mx-auto flex justify-center text-indigo-500 mb-4">
                <UploadCloud className="h-16 w-16" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Drag & drop your resume here
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Supports PDF, DOCX (Max 5MB)
              </p>
              
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Browse Files
              </button>
            </div>
          )}

          {file && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs sm:max-w-md">
                      {file.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                {!isUploading && (
                  <button
                    onClick={removeFile}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {error && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800/50">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                        {error}
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span>{progress < 100 ? 'Uploading...' : 'Analyzing with AI... (This may take a minute)'}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {!isUploading && !error && (
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleUpload}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Analyze Resume
                  </button>
                </div>
              )}
              
              {isUploading && progress === 100 && (
                <div className="flex items-center justify-center pt-4 text-indigo-600 dark:text-indigo-400">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span className="font-medium">{processingMessages[processingStep]}</span>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UploadResume;
