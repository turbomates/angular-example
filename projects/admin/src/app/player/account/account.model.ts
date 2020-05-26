import { Money } from "src/app/common/models";

export interface Account {
  balance: Money;
  id: string;
}

export interface AccountState {
  accountData: Account[] | null;
  isSubmitting: boolean;
  errors: AccountFormErrors;
}

export interface AccountRequest {
  amount: number;
}

export interface AccountFormErrors {
  amount?: string;
}
