import { useState } from "react";
import "./transactions.css";
export default function Transactions({
  item,
  index,
  description,
  amount,
  type,
}) {
  const [btnBox, setBtnBox] = useState(false);
  const [editClick, setEditClick] = useState(false);
  const editDialouge = {
    position: "absolute",
    backgroundColor: "white",
  };
  const handleModificationBoxClick = () => {
    setBtnBox(!btnBox);
  };
  const handleEditClick = () => {
    setEditClick(true);
  };
  const handleDelete = () => {
    item.filter((item, Filterindex) => Filterindex !== index);
  };
  return (
    <div
      key={index}
      className="transactionBox"
      title="Click to Modify Details"
      onClick={handleModificationBoxClick}
    >
      <p>{description}</p>
      <div className="modificationBox">
        <p>
          Rs.
          <span className={type}>
            {type === "expense" ? "-" : "+"}
            {amount}
          </span>
        </p>
        {btnBox && (
          <div className="btnBox">
            <button onClick={handleEditClick}>edit</button>
            <button onClick={handleDelete}>delete</button>
          </div>
        )}
      </div>
      {editClick && (
        <div style={editDialouge}>
          <div className="addTransaction">
            <div className="formElement">
              <input
                type="number"
                placeholder="Amount"
                //   value={details.amount}
                //   onChange={handleChangeInDetails}
                name="amount"
              />
            </div>
            <div className="formElement">
              <input
                type="text"
                placeholder="Description"
                //   value={details.description}
                //   onChange={handleChangeInDetails}
                name="description"
              />
            </div>
            <div className="">
              <label>
                <input
                  type="radio"
                  // value="expense"
                  // checked={details.type === "expense"}
                  // onChange={handleTransactionTypeChange}
                />
                Expense
              </label>
              <label>
                <input
                  type="radio"
                  // value="income"
                  // checked={details.type === "income"}
                  // onChange={handleTransactionTypeChange}
                />
                Income
              </label>
            </div>
            <button>Save</button>
            <button onClick={() => setEditClick(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
