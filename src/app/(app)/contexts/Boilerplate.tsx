import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface ContextProps {
  state?: string;
  setState?: Dispatch<SetStateAction<string | undefined>>;
}

const defaultValues: ContextProps = {
  state: "",
  setState: () => {},
};

const Context = createContext(defaultValues);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ContextProps["state"]>();

  return <Context value={{ state, setState }}>{children}</Context>;
};

export { Context, ContextProvider };
