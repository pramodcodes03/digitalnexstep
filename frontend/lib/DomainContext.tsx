"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type DomainType = "main" | "ditrpindia" | "ditrppro";

interface DomainContextValue {
  domain: DomainType;
  isPartnerDomain: boolean;
}

const DomainContext = createContext<DomainContextValue>({
  domain: "main",
  isPartnerDomain: false,
});

export const DomainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [domain, setDomain] = useState<DomainType>("main");

  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname.includes("ditrpindia.com")) {
      setDomain("ditrpindia");
    } else if (hostname.includes("ditrppro.com")) {
      setDomain("ditrppro");
    } else {
      setDomain("main");
    }
  }, []);

  const isPartnerDomain = domain === "ditrpindia" || domain === "ditrppro";

  return (
    <DomainContext.Provider value={{ domain, isPartnerDomain }}>
      {children}
    </DomainContext.Provider>
  );
};

export const useDomain = () => useContext(DomainContext);
