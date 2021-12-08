import React, { useContext, useState } from "react";

export const GWBContext = React.createContext<{ gwb?: any; setGWB?: (gwb: any) => void }>({});

export const GWBProvider = ({ children }) => {
  // TODO: Create gwb type.
  const [gwb, setGWB] = useState<any>();

  return (
    <GWBContext.Provider
      value={{
        gwb,
        setGWB,
      }}
    >
      {children}
    </GWBContext.Provider>
  );
};

export const useGWBSelection = () => {
  const { gwb } = useContext(GWBContext);

  return gwb;
};

export const useGWBContext = () => {
  return useContext(GWBContext);
};
