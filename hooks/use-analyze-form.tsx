'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useAnalyzeForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [seniority, setSeniority] = useState('junior');
  const [jobDescription, setJobDescription] = useState('');
  // Language is strictly English now
  const language = 'en';

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      setError('Only PDF files are supported.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload your CV (PDF).');
      return;
    }
    if (!targetRole) {
      setError('Please enter a Target Role.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetRole', targetRole);
    formData.append('seniority', seniority);
    formData.append('jobDescription', jobDescription);
    formData.append('language', language);

    try {
      const response = await axios.post('/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = response.data;
      sessionStorage.setItem(
        'cvAnalysisResult',
        JSON.stringify({ ...data.data, targetRole, seniority }),
      );
      router.push('/results');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while analyzing the CV.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    setFile,
    setTargetRole,
    setSeniority,
    setJobDescription,
    handleDrop,
    handleSubmit,
    file,
    targetRole,
    seniority,
    jobDescription,
    isLoading,
    error,
  };
};
