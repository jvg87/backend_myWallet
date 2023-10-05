export interface UpdateServiceProps {
  value?: number;
  category_id?: string;
  description?: string;
  date?: string;
  user_id: string;
  id: string;
}

export interface IUpdateTransactionService {
  execute: (props: UpdateServiceProps) => Promise<void>;
}
