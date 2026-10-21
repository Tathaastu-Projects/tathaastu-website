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
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ConnectModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ConnectModalContext.Provider>
  );
};

