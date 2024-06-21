import { useState } from "react";
import "./App.css";
import Transactions from "./Transactions";

export default function App() {
  const [add, setAdd] = useState(true);
  const [details, setDetails] = useState({
    amount: "",
    description: "",
    type: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const handleAddClick = () => {
    setAdd(!add);
  };

  const handleChangeInDetails = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleTransactionTypeChange = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      type: e.target.value,
    }));
  };

  const addValue = () => {
    const amount = parseFloat(details.amount);
    if (details.type === "expense") {
      setBalance((prevBalance) => prevBalance - amount);
      setExpense((prevExpense) => prevExpense + amount);
    } else if (details.type === "income") {
      setBalance((prevBalance) => prevBalance + amount);
      setIncome((prevIncome) => prevIncome + amount);
    }
    setTransactions((prevTransactions) => [...prevTransactions, details]);
    setDetails({
      amount: "",
      description: "",
      type: "",
    });
  };

  const renderTransaction = transactions.map((item, index) => {
    return (
      <Transactions
        item={item}
        key={index}
        index={index}
        description={item.description}
        amount={item.amount}
        type={item.type}
      />
    );
  });
  return (
    <div className="app">
      <div className="heading">
        <h4>EXPENSE TRACKER</h4>
      </div>
      <div className="balance">
        <div>
          <p>
            Balance Rs.<span style={{ color: "green" }}>{balance}</span>
          </p>
        </div>
        <div>
          <button className="add" onClick={handleAddClick}>
            {add ? "Cancel" : "Add"}
          </button>
        </div>
      </div>
      {add && (
        <div className="addTransaction">
          <div className="formElement">
            <input
              type="number"
              placeholder="Amount"
              value={details.amount}
              onChange={handleChangeInDetails}
              name="amount"
            />
          </div>
          <div className="formElement">
            <input
              type="text"
              placeholder="Description"
              value={details.description}
              onChange={handleChangeInDetails}
              name="description"
            />
          </div>
          <div className="">
            <label>
              <input
                type="radio"
                value="expense"
                checked={details.type === "expense"}
                onChange={handleTransactionTypeChange}
              />
              Expense
            </label>
            <label>
              <input
                type="radio"
                value="income"
                checked={details.type === "income"}
                onChange={handleTransactionTypeChange}
              />
              Income
            </label>
          </div>
          <button onClick={addValue}>Add Transaction</button>
        </div>
      )}

      <div className="display">
        <div className="expense">
          <div className="displayExpense">Expense</div>
          <div className="displayMoney">
            Rs.<span style={{ color: "red" }}>{-expense}</span>
          </div>
        </div>
        <div className="income">
          <div className="displayExpense">Income</div>
          <div className="displayMoney">
            Rs.<span style={{ color: "green" }}>{income}</span>
          </div>
        </div>
      </div>
      <div className="transactions">
        <h4>Transactions</h4>
        {renderTransaction}
      </div>
    </div>
  );
}
