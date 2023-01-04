import { useEffect, useState } from "react";
import { useBudgetsContext } from "../hooks/useBudgetsContext";
import { Expenses, Incomes } from "../lib/data/Categories";

function BudgetForm() {
  const [formState, setFormState] = useState({
    budgetType: "expenses",
    budgetCategory: "",
    budgetSubCategory: "",
    budgetNote: "",
    budgetAmount: "",
    budgetDate: new Date().toISOString().split("T")[0],
  });

  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useBudgetsContext();

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      budgetCategory: "",
      budgetSubCategory: "",
    }));
  }, [formState.budgetType]);

  const handleChage = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBudget = formState;
    newBudget.budgetAmount = parseFloat(formState.budgetAmount);
    newBudget.budgetDate = new Date(formState.budgetDate)
      .toISOString()
      .replace("00:00:00.000Z", new Date().toISOString().split("T")[1]);

    const response = await fetch("/api/budgets", {
      method: "POST",
      body: JSON.stringify(newBudget),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setFormState((prevState) => ({
        ...prevState,
        budgetCategory: "",
        budgetSubCategory: "",
        budgetNote: "",
        budgetAmount: "",
        budgetDate: new Date().toISOString().split("T")[0],
      }));
      dispatch({ type: "CREATE_BUDGET", payload: json });
    }
  };

  const subCategory = (
    formState.budgetType === "expenses" ? Expenses : Incomes
  ).find((item) => item.name === formState.budgetCategory);

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <h3>Add a New Budget</h3>
        <div>
          <label>Budget Type:</label>
          <div style={{ display: "flex" }}>
            <div className="radio">
              <input
                type="radio"
                name="budgetType"
                value="expenses"
                onChange={handleChage}
                checked={formState.budgetType === "expenses"}
              />
              <label>Expense</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                name="budgetType"
                value="incomes"
                onChange={handleChage}
                checked={formState.budgetType === "incomes"}
              />
              <label>Income</label>
            </div>
          </div>
        </div>
        <div>
          <label>Budget Category:</label>
          <select
            onChange={handleChage}
            value={formState.budgetCategory}
            name="budgetCategory"
          >
            <option value="" disabled>
              Select budget category
            </option>
            {(formState.budgetType === "expenses" ? Expenses : Incomes).map(
              (item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              )
            )}
          </select>
        </div>
        {formState.budgetType === "expenses" && (
          <div>
            <label>Budget Sub-Category:</label>
            <select
              onChange={handleChage}
              value={formState.budgetSubCategory}
              name="budgetSubCategory"
            >
              <option value="" disabled>
                Select budget subcategory
              </option>
              {subCategory &&
                subCategory["category"].map((subItem, idx) => (
                  <option key={idx} value={subItem}>
                    {subItem}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div>
          <label>Budget Note:</label>
          <input
            type="text"
            name="budgetNote"
            value={formState.budgetNote}
            onChange={handleChage}
            className={emptyFields.includes("budgetNote") ? "error" : ""}
          />
        </div>
        <div>
          <label>Budget Amount:</label>
          <input
            type="text"
            name="budgetAmount"
            value={formState.budgetAmount}
            onChange={handleChage}
            className={emptyFields.includes("budgetAmount") ? "error" : ""}
          />
        </div>
        <div>
          <label>Budget Date:</label>
          <input
            type="date"
            name="budgetDate"
            value={formState.budgetDate}
            onChange={handleChage}
            className={emptyFields.includes("budgetDate") ? "error" : ""}
          />
        </div>
        <button type="submit">Add Budget</button>
        <div>{error && <div className="error">{error}</div>}</div>
      </form>
    </div>
  );
}

export default BudgetForm;
