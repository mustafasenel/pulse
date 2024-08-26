"use client"

import React, { createContext, useContext, useState } from 'react';

interface FormContextProps {
  triggerFormSubmit: () => void;
  setContentInContext: (content: string) => void;
  setThumbnailContext: (content: string) => void;
  setSummaryContext: (content: string) => void;
  setCategoriesInContext: (categories: string[]) => void; 
  trigger: boolean;
  content: string;
  categories: string[]; 
  thumbnail: string;
  summary: string;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trigger, setTrigger] = useState(false);
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  const triggerFormSubmit = () => {
    setTrigger(prev => !prev); // Toggle to force re-render
    console.log("Form submission triggered");
  };

  const setContentInContext = (newContent: string) => {
    setContent(newContent);
  };

  const setThumbnailContext = (newThumbnail: string) => {
    setThumbnail(newThumbnail);
  }
  const setSummaryContext = (newSummary: string) => {
    setSummary(newSummary);
  }
  const setCategoriesInContext = (newCategories: string[]) => {  
    setCategories(newCategories);
  };

  return (
    <FormContext.Provider value={{ triggerFormSubmit, setContentInContext, setCategoriesInContext, setThumbnailContext, setSummaryContext, summary, thumbnail, trigger, categories, content }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
