import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context state
interface AccountContextType {
  account: string | null;
  setAccount: (account: string | null) => void;
  contract: any;
  setContract: (contract: any) => void;
}

// Create context with an initial undefined state
const AccountContext = createContext<AccountContextType | undefined>(undefined);

// Provider component
export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);

  return (
    <AccountContext.Provider value={{ account, setAccount, contract, setContract }}>
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook to use the AccountContext
export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
