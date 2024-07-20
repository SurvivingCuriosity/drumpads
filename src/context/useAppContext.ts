import { useContext } from "react";
import { AppContext } from "./AppContext.tsx";

export const useAppContext = () => useContext(AppContext);