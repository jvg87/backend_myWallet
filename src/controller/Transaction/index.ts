import { TransactionRepository } from "../../repository/Transaction/TransactionRepository";
import { CreateTransactionService } from "../../services/Transaction/CreateTransaction/CreateTransactionService";
import { GetTransactionsService } from "../../services/Transaction/GetTransactions/GetTransactionsService";
import { CreateTransactionController } from "./CreateTransaction/CreateTransactionController";
import { GetTransactionsController } from "./GetTransactions/GetTransactionsController";

const transactionRepository = new TransactionRepository();

const createTransactionService = new CreateTransactionService(
  transactionRepository
);
const creteTransactionController = new CreateTransactionController(
  createTransactionService
);

const getTransactionsService = new GetTransactionsService(
  transactionRepository
);
const getTransactionsController = new GetTransactionsController(
  getTransactionsService
);

export { creteTransactionController, getTransactionsController };
