export interface IDeleteTransactionService {
  execute: (user_id: string, id: string) => Promise<void>;
}
