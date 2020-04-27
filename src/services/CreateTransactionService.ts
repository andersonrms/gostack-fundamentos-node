import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    if (transaction.type === 'outcome' && balance.total < transaction.value) {
      throw Error('Value unavailable in your account');
    }

    if (transaction.type !== 'income' && transaction.type !== 'outcome') {
      throw Error('Operation does not exist');
    }

    return transaction;
  }
}

export default CreateTransactionService;
