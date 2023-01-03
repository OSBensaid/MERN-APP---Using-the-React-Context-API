import React from "react";
import { useBudgetsContext } from "../hooks/useBudgetsContext";

function BudgetDetails({ budget }) {
  const { dispatch } = useBudgetsContext();
  const handleDelete = async () => {
    const response = await fetch(`/api/budgets/${budget._id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_BUDGET", payload: json });
    }
  };

  return (
    <div className="budget-details">
      <div>
        <div> {new Date(budget.createdAt).toLocaleString("en-US")}</div>
        <div>{budget.title}</div>
      </div>

      <div>${budget.price}</div>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
}

export default BudgetDetails;
