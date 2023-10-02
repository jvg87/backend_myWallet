export interface SumResponse {
  tag: string;
  saldo: number;
}

export interface BalanceResponse {
  sumRevenues: SumResponse;
  sumExpenses: SumResponse;
  balance: SumResponse;
}

export interface BalanceProps {
  user_id: string;
  date?: string;
  month?: string;
  year?: string;
}

export interface IBalanceUserService {
  execute: (props: BalanceProps) => Promise<BalanceResponse[]>;
}
