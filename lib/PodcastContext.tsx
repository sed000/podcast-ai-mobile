import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PodcastContextType {
  isGenerating: boolean;
  generatingPrompt: string;
  setGenerating: (isGenerating: boolean, prompt?: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const PodcastContext = createContext<PodcastContextType | undefined>(undefined);

export const PodcastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingPrompt, setGeneratingPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);

  const setGenerating = (isGenerating: boolean, prompt?: string) => {
    setIsGenerating(isGenerating);
    if (prompt) {
      setGeneratingPrompt(prompt);
    }
    if (!isGenerating) {
      setGeneratingPrompt('');
    }
  };

  return (
    <PodcastContext.Provider value={{
      isGenerating,
      generatingPrompt,
      setGenerating,
      error,
      setError
    }}>
      {children}
    </PodcastContext.Provider>
  );
};

export const usePodcast = () => {
  const context = useContext(PodcastContext);
  if (context === undefined) {
    throw new Error('Provider error');
  }
  return context;
}; 