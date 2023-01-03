import { useContext } from "react";
import { BudgetsContext } from "../context/BudgetsContext";

export const useBudgetsContext = () => {
  const context = useContext(BudgetsContext);
  if (!context) {
    throw Error(
      "useBudgetsContext must be used inside an BudgetsContextProvider"
    );
  }
  return context;
};
