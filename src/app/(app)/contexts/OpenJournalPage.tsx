import react, { createContext, ReactNode, useState } from "react";

// This is a context used for checking whether
// the Journal Page content is hidden

interface ContextProps {
  openPage?: string;
  setOpenPage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const defaultValues: ContextProps = {
  openPage: undefined,
  setOpenPage: () => {},
};

const OpenJournalPageCTX = createContext<typeof defaultValues>(defaultValues);

interface ProviderProps {
  children: ReactNode;
}

const OpenJournalPageProvider = ({ children }: ProviderProps) => {
  const [openPage, setOpenPage] = useState<string | undefined>();

  return (
    <OpenJournalPageCTX.Provider value={{ openPage, setOpenPage }}>
      {children}
    </OpenJournalPageCTX.Provider>
  );
};

export { OpenJournalPageCTX, OpenJournalPageProvider };
