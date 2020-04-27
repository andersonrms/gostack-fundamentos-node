import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransictionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;
    const income = transactions.reduce((acumulator, transiction) => {
      return transiction.type === 'income'
        ? acumulator + transiction.value
        : acumulator;
    }, 0);

    const outcome = transactions.reduce((acumulator, transiction) => {
      return transiction.type === 'outcome'
        ? acumulator + transiction.value
        : acumulator;
    }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransictionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
