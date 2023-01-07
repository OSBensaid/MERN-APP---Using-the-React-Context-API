import React, { useEffect } from "react";
import BudgetDetails from "../components/BudgetDetails";
import BudgetForm from "../components/BudgetForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBudgetsContext } from "../hooks/useBudgetsContext";

function Home() {
  const { dispatch, budgetsData } = useBudgetsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBudgets = async () => {
      const response = await fetch("/api/budgets", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_BUDGETS", payload: json });
      }
    };
    if (user) {
      fetchBudgets();
    }
  }, [dispatch, user]);

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
