import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBudgetsContext } from "../hooks/useBudgetsContext";

function BudgetDetails({ budget }) {
  const { dispatch } = useBudgetsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/budgets/${budget._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_BUDGET", payload: json });
    }
  };

  return (
    <div className="budget-details ">
      <div className="budget-details-item">
        <div className="budget-details-icon">
          <span className="material-symbols-outlined" onClick={handleDelete}>
            {budget.budgetCategory === "Home" ? "home" : ""}
            {budget.budgetCategory === "Food" ? "restaurant" : ""}
            {budget.budgetCategory === "Personal Care" ? "face" : ""}
            {budget.budgetCategory === "Pet Care" ? "pets" : ""}
            {budget.budgetCategory === "Misxellaneous" ? "redeem" : ""}
            {budget.budgetCategory === "Entertainment" ? "dvr" : ""}
            {budget.budgetCategory === "Transportation" ? "directions_car" : ""}
            {budget.budgetCategory === "Health/Medical" ? "stethoscope" : ""}
            {budget.budgetCategory === "Family Expenses" ? "child_care" : ""}
          </span>
        </div>
        <div>
          <h4>{budget.budgetSubCategory}</h4>
          <p>{budget.budgetNote}</p>
        </div>
        <div>
          <h4
            className={budget.budgetType === "expenses" ? "expenses" : "income"}
          >
            {budget.budgetType === "incomes" ? "+$" : "-$"}
            {budget.budgetAmount.toFixed(2)}
          </h4>
          <p>
            {formatDistanceToNow(new Date(budget.budgetDate), {
              addSuffix: true,
            })}
          </p>
        </div>
        <span
          className="material-symbols-outlined delete-btn"
          onClick={handleDelete}
        >
          delete
        </span>
      </div>
    </div>
  );
}

export default BudgetDetails;
