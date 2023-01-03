import React, { useEffect } from "react";
import BudgetDetails from "../components/BudgetDetails";
import BudgetForm from "../components/BudgetForm";
import { useBudgetsContext } from "../hooks/useBudgetsContext";

function Home() {
  const { dispatch, budgetsData } = useBudgetsContext();

  useEffect(() => {
    const fetchBudgets = async () => {
      const response = await fetch("/api/budgets");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_BUDGETS", payload: json });
      }
    };
    fetchBudgets();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="budgets">
        {budgetsData &&
          budgetsData.map((budget) => (
            <BudgetDetails key={budget._id} budget={budget} />
          ))}
      </div>
      <BudgetForm />
    </div>
  );
}

export default Home;
