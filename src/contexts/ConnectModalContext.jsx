"use client";

import React, { createContext, useContext, useState } from 'react';

const ConnectModalContext = createContext(null);

export const useConnectModal = () => {
  const context = useContext(ConnectModalContext);
  if (!context) {
    throw new Error('useConnectModal must be used within ConnectModalProvider');
  }
  return context;
};

export const ConnectModalProvider = ({ children }) => {
  // Modal disabled everywhere as per requirement.
  // Any legacy triggers to openModal will safely route directly to /pricing (Packages screen).
  const openModal = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/pricing?flow=consult";
    }
  };
  const closeModal = () => {};

  return (
    <ConnectModalContext.Provider value={{ isOpen: false, openModal, closeModal }}>
      {children}
    </ConnectModalContext.Provider>
  );
};
