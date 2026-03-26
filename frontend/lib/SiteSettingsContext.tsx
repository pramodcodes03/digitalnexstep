"use client";

import React, { createContext, useContext } from "react";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

interface SiteSettings {
  [key: string]: string | undefined;
}

const SiteSettingsContext = createContext<SiteSettings>({});

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data } = useApi(() => api.getSiteSettings(), {} as SiteSettings);
  return (
    <SiteSettingsContext.Provider value={data}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
