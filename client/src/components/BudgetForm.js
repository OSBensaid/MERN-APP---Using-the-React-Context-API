import { useState } from "react";
import { useBudgetsContext } from "../hooks/useBudgetsContext";

function BudgetForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useBudgetsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBudget = { title, price };
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
      setTitle("");
      setPrice("");
      dispatch({ type: "CREATE_BUDGET", payload: json });
    }
  };
  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <h3>Add a New Budget</h3>
        <div>
          <label>Budget Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={emptyFields.includes("title") ? "error" : ""}
          />
        </div>
        <div>
          <label>Budget Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={emptyFields.includes("price") ? "error" : ""}
          />
        </div>
        <div></div>
        <div></div>
        <button type="submit">Add Budget</button>
        <div>{error && <div className="error">{error}</div>}</div>
      </form>
    </div>
  );
}

export default BudgetForm;
