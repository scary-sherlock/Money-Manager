import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid'
import MoneyDetails from '../MoneyDetails';
import TransactionItem from '../TransactionItem';
import './index.css';

const transactionTypeOptions = [
    {
        optionId: 'INCOME',
        displayText: 'Income',
    },
    {
        optionId: 'EXPENSES',
        displayText: 'Expenses',
    },
];

class MoneyManager extends Component {
    state = {
        transactions: [],
        titleInput: '',
        amountInput: '',
        displayText: transactionTypeOptions[0].displayText,
    };

    addTransaction = event => {
        event.preventDefault();
        const { titleInput, amountInput, displayText } = this.state;
        const newTransaction = {
            id: uuidv4(),
            title: titleInput,
            amount: parseInt(amountInput),
            type: displayText,
        };
        this.setState(prevState => ({
            transactions: [...prevState.transactions, newTransaction],
            titleInput: '',
            amountInput: '',
            displayText: transactionTypeOptions[0].displayText,
        }));
    };

    deleteTransaction = id => {
        this.setState(prevState => ({
            transactions: prevState.transactions.filter(
                transaction => transaction.id !== id
            ),
        }));
    };

    render() {
        const { transactions, titleInput, amountInput, displayText } = this.state;
        const income = transactions
            .filter(transaction => transaction.type === 'INCOME')
            .reduce((acc, curr) => acc + curr.amount, 0);
        const expenses = transactions
            .filter(transaction => transaction.type === 'EXPENSES')
            .reduce((acc, curr) => acc + curr.amount, 0);
        const balance = income - expenses;

        return (
            <div className="money-manager">
                <div className="welcome">

                    <h1>Hi, Richard</h1>
                    <p>Welcome back to your Money Manager</p>
                </div>
                <MoneyDetails balance={balance} income={income} expenses={expenses} />
                <div className="flex">

                    <form onSubmit={this.addTransaction}>
                        <h2>Add Transaction</h2>
                        <label htmlFor="title">TITLE</label>
                        <input
                            id="title"
                            value={titleInput}
                            onChange={e => this.setState({ titleInput: e.target.value })}
                        />
                        <label htmlFor="amount">AMOUNT</label>
                        <input
                            id="amount"
                            value={amountInput}
                            onChange={e => this.setState({ amountInput: e.target.value })}
                        />
                        <label htmlFor="type">TYPE</label>
                        <select
                            id="type"
                            value={displayText}
                            onChange={e => this.setState({ displayText: e.target.value })}
                        >
                            {transactionTypeOptions.map(option => (
                                <option key={option.displayText} value={option.displayText}>
                                    {option.displayText}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Add</button>
                    </form>
                    <div className="history">
                        <h2>History</h2>
                        <ul>
                            {transactions.map(transaction => (
                                <TransactionItem
                                    key={transaction.id}
                                    transaction={transaction}
                                    deleteTransaction={this.deleteTransaction}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default MoneyManager;
