import { createContext, useReducer } from "react";

export const BudgetsContext = createContext();

export const BudgetsReducer = (state, action) => {
  switch (action.type) {
    case "SET_BUDGETS":
      return {
        budgetsData: action.payload,
      };
    case "CREATE_BUDGET":
      return { budgetsData: [action.payload, ...state.budgetsData] };
    case "DELETE_BUDGET":
      return {
        budgetsData: state.budgetsData.filter(
          (budget) => budget._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const BudgetsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BudgetsReducer, {
    budgetsData: null,
  });
  return (
    <BudgetsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BudgetsContext.Provider>
  );
};
