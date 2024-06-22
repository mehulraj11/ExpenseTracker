import { useState } from "react";
import "./transactions.css";

export default function Transactions({
  index,
  item,
  handleDeleteTransaction,
  handleEditTransaction,
}) {
  const editTransaction = {
    positon: "absolute",
  };
  const [editClick, setEditClick] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    amount: item.amount,
    description: item.description,
    type: item.type,
  });

  const handleChangeInDetailsEdit = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    handleEditTransaction(index, updatedDetails);
    setEditClick(false);
  };

  return (
    <>
      <div
        key={index}
        className="transactionBox"
        title="Click to Modify Details"
      >
        <p>{item.description}</p>
        <div className="modificationBox">
          <p>
            Rs.
            <span className={item.type}>
              {item.type === "expense" ? "-" : "+"}
              {item.amount}
            </span>
          </p>
          <div className="btnBox">
            <button onClick={() => setEditClick(true)}>Edit</button>
            <button onClick={() => handleDeleteTransaction(index)}>
              Delete
            </button>
          </div>
        </div>
        {editClick && (
          <div className={editTransaction}>
            <div className="addTransaction">
              <div className="formElement">
                <input
                  type="number"
                  placeholder="Amount"
                  value={updatedDetails.amount}
                  onChange={handleChangeInDetailsEdit}
                  name="amount"
                />
              </div>
              <div className="formElement">
                <input
                  type="text"
                  placeholder="Description"
                  value={updatedDetails.description}
                  onChange={handleChangeInDetailsEdit}
                  name="description"
                />
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="expense"
                    checked={updatedDetails.type === "expense"}
                    onChange={handleChangeInDetailsEdit}
                    name="type"
                  />
                  Expense
                </label>
                <label>
                  <input
                    type="radio"
                    value="income"
                    checked={updatedDetails.type === "income"}
                    onChange={handleChangeInDetailsEdit}
                    name="type"
                  />
                  Income
                </label>
              </div>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditClick(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
