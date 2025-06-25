export type ApplyLoanPayload = {
  loan_product_id: number;
  amount: number;
  purpose: string;
};

export type LoanProduct = {
  id: number;
  name: string;
  description: string;
  max_amount: number;
  interest_rate: number;
  duration_days: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

export type UpdateLoanData = {
  name: string;
  description: string;
  max_amount: number;
  interest_rate: number;
  duration_days: number;
};

export type RepaymentSchedule = {
  id: number;
  due_date: string;
  amount_due: string;
  status: "paid" | "pending" | "approved";
};

export type UserLoan = {
  id: number;
  user_id: number;
  loan_product_id: number;
  max_amount: number;
  amount: number;
  purpose: string;
  interest_rate: string;
  duration_days: number;
  repayment_due: string;
  status: string;
  created_at: string;
  updated_at: string;
  loan_product: LoanProduct;
  repayment_schedules?: RepaymentSchedule[];
};
