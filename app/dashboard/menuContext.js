'use client';

import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

export default function MenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  );
}
