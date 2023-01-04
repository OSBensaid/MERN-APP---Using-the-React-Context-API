import { useEffect, useState } from "react";
import { useBudgetsContext } from "../hooks/useBudgetsContext";
import { Expenses, Incomes } from "../lib/data/Categories";

function BudgetForm() {
  const [budgetType, setBudgetType] = useState("expenses");
  const [budgetCategory, setBudgetCategory] = useState("");
  const [budgetSubCategory, setBudgetSubCategory] = useState("");
  const [budgetNote, setBudgetNote] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetDate, setBudgetDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useBudgetsContext();

  useEffect(() => {
    setBudgetCategory("");
    setBudgetSubCategory("");
  }, [budgetType]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBudget = {
      budgetNote,
      budgetAmount: parseFloat(budgetAmount),
      budgetDate: new Date(budgetDate)
        .toISOString()
        .replace("00:00:00.000Z", new Date().toISOString().split("T")[1]),
      budgetType,
      budgetCategory,
      budgetSubCategory,
    };

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
      setBudgetCategory("");
      setBudgetSubCategory("");
      setBudgetNote("");
      setBudgetAmount("");
      setBudgetDate(new Date().toISOString().split("T")[0]);

      dispatch({ type: "CREATE_BUDGET", payload: json });
    }
  };

  const subCategory = (budgetType === "expenses" ? Expenses : Incomes).find(
    (item) => item.name === budgetCategory
  );

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
                value="expenses"
                onChange={(e) => setBudgetType(e.target.value)}
                checked={budgetType === "expenses"}
              />
              <label>Expense</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                value="incomes"
                onChange={(e) => setBudgetType(e.target.value)}
                checked={budgetType === "incomes"}
              />
              <label>Income</label>
            </div>
          </div>
        </div>
        <div>
          <label>Budget Category:</label>
          <select
            onChange={(e) => setBudgetCategory(e.target.value)}
            value={budgetCategory}
          >
            <option value="" disabled>
              Select budget category
            </option>
            {(budgetType === "expenses" ? Expenses : Incomes).map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {budgetType === "expenses" && (
          <div>
            <label>Budget Sub-Category:</label>
            <select
              onChange={(e) => setBudgetSubCategory(e.target.value)}
              value={budgetSubCategory}
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
            value={budgetNote}
            onChange={(e) => setBudgetNote(e.target.value)}
            className={emptyFields.includes("budgetNote") ? "error" : ""}
          />
        </div>
        <div>
          <label>Budget Amount:</label>
          <input
            type="text"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            className={emptyFields.includes("budgetAmount") ? "error" : ""}
          />
        </div>
        <div>
          <label>Budget Date:</label>
          <input
            type="date"
            value={budgetDate}
            onChange={(e) => setBudgetDate(e.target.value)}
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
