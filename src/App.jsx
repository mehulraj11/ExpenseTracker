import { useState } from "react";
import "./App.css";
import Transactions from "./Transactions";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default function App() {
  const [add, setAdd] = useState(false);
  const [details, setDetails] = useState({
    amount: "",
    description: "",
    type: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

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

  const handleDeleteTransaction = (index) => {
    const transaction = transactions[index];
    const amount = parseFloat(transaction.amount);
    if (transaction.type === "expense") {
      setBalance((prevBalance) => prevBalance + amount);
      setExpense((prevExpense) => prevExpense - amount);
    } else if (transaction.type === "income") {
      setBalance((prevBalance) => prevBalance - amount);
      setIncome((prevIncome) => prevIncome - amount);
    }
    setTransactions(
      transactions.filter((_, filterIndex) => filterIndex !== index)
    );
  };

  const handleEditTransaction = (index, updatedTransaction) => {
    const newTransactions = [...transactions];
    const amountDifference =
      parseFloat(updatedTransaction.amount) -
      parseFloat(newTransactions[index].amount);

    if (
      updatedTransaction.type === "income" &&
      newTransactions[index].type === "income"
    ) {
      setIncome((prevState) => prevState + amountDifference);
      setBalance((prevState) => prevState + amountDifference);
    } else if (
      updatedTransaction.type === "expense" &&
      newTransactions[index].type === "income"
    ) {
      setIncome(
        (prevState) => prevState - parseFloat(updatedTransaction.amount)
      );
      setBalance(
        (prevState) => prevState - parseFloat(updatedTransaction.amount * 2)
      );
      setExpense(
        (prevState) => prevState - parseFloat(updatedTransaction.amount)
      );
    } else if (
      updatedTransaction.type === "expense" &&
      newTransactions[index].type === "expense"
    ) {
      setExpense((prevState) => prevState + amountDifference);
      setBalance((prevState) => prevState - amountDifference);
    } else if (
      updatedTransaction.type === "income" &&
      newTransactions[index].type === "expense"
    ) {
      setBalance(
        (prevState) => prevState + parseFloat(updatedTransaction.amount * 2)
      );
      setIncome(
        (prevState) => prevState + parseFloat(updatedTransaction.amount)
      );
      setExpense(
        (prevState) => prevState - parseFloat(updatedTransaction.amount)
      );
    }
    newTransactions[index] = updatedTransaction;
    setTransactions(newTransactions);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Filter and sort transactions based on selected option
  const filteredTransactions = transactions
    .filter((transaction) => {
      if (selectedOption === "expense") return transaction.type === "expense";
      if (selectedOption === "income") return transaction.type === "income";
      return true;
    })
    .sort((a, b) => {
      if (selectedOption === "highestAmount") {
        return b.amount - a.amount;
      }
    });
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction List", 20, 10);
    const tableColumn = ["Description", "Amount", "Type"];
    const tableRows = [];

    filteredTransactions.forEach((transaction) => {
      const transactionData = [
        transaction.description,
        transaction.amount,
        transaction.type,
      ];
      tableRows.push(transactionData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("transactions.pdf");
  };
  console.log(filteredTransactions);
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
          <div>
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
        <div className="sortOnType">
          <select
            name="options"
            id="options"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="">All</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="highestAmount">Highest Amount</option>
          </select>
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
        {filteredTransactions.map((item, index) => (
          <Transactions
            key={index}
            index={index}
            item={item}
            handleDeleteTransaction={handleDeleteTransaction}
            handleEditTransaction={handleEditTransaction}
          />
        ))}
      </div>
      <button onClick={generatePDF}>Download as PDF</button>
    </div>
  );
}
