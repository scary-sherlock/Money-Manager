import React from 'react';
import './index.css';

const TransactionItem = ({ transaction, deleteTransaction }) => (
    <li className="transaction-item">
        <p>{transaction.title}</p>
        <p>Rs {transaction.amount}</p>
        <p>{transaction.type}</p>
        <button
            type="button"
            onClick={() => deleteTransaction(transaction.id)}
            data-testid="delete"
        >
            <img src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png" alt="delete" />
        </button>
    </li>
);

export default TransactionItem;
