import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState('All');

  return (
    <SearchContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </SearchContext.Provider>
  );
};
