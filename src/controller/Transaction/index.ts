import { TransactionRepository } from "../../repository/Transaction/TransactionRepository";
import { CreateTransactionService } from "../../services/Transaction/CreateTransaction/CreateTransactionService";
import { DeleteTransactionService } from "../../services/Transaction/DeleteTransaction/DeleteTransactionService";
import { GetTransactionsService } from "../../services/Transaction/GetTransactions/GetTransactionsService";
import { CreateTransactionController } from "./CreateTransaction/CreateTransactionController";
import { DeleteTransactionController } from "./DeleteTransaction/DeleteTransactionController";
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

const deleteTransactionService = new DeleteTransactionService(
  transactionRepository
);
const deleteTransactionController = new DeleteTransactionController(
  deleteTransactionService
);

export {
  creteTransactionController,
  deleteTransactionController,
  getTransactionsController,
};
