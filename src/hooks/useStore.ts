import { useContext } from "react";
import { StoreContext } from "../main";

export const useStore = () => {
  return useContext(StoreContext);
};
