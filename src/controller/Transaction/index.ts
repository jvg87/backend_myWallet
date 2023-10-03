import { TransactionRepository } from "../../repository/Transaction/TransactionRepository";
import { CreateTransactionService } from "../../services/Transaction/CreateTransaction/CreateTransactionService";
import { CreateTransactionController } from "./CreateTransaction/CreateTransactionController";

const transactionRepository = new TransactionRepository();

const createTransactionService = new CreateTransactionService(
  transactionRepository
);
const creteTransactionController = new CreateTransactionController(
  createTransactionService
);

export { creteTransactionController };
