import { useState } from 'react';
import { removeBackground } from '../services/ai.service';
import { useToast } from './useToast';
import { isValidImage } from '../utils/fileHelpers';

export const useImageProcessing = () => {
  const { showToast } = useToast();
  const [status, setStatus] = useState('idle'); // idle, processing, done
  const [originalUrl, setOriginalUrl] = useState('');
  const [processedUrl, setProcessedUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const processFile = async (file) => {
    if (!isValidImage(file)) {
      showToast('Please upload a valid image file.', 'error');
      return;
    }
    
    setStatus('processing');
    setOriginalUrl(URL.createObjectURL(file));
    setFileName(file.name);

    try {
      const url = await removeBackground(file);
      setProcessedUrl(url);
      setStatus('done');
      showToast('Background successfully removed!', 'success');
      return true; // Indicates success for scrolling
    } catch (error) {
      showToast(error.message, "error");
      setStatus('idle');
      return false;
    }
  };

  const processSample = async (url) => {
    showToast('Loading sample image...', 'info');
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      return await processFile(new File([blob], "sample.jpg", { type: blob.type }));
    } catch {
      showToast("Couldn't fetch sample.", 'error');
    }
  };

  const reset = () => setStatus('idle');

  return { status, originalUrl, processedUrl, fileName, processFile, processSample, reset };
};