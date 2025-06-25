export type AdminDashboardStats = {
  total_loan_applications: number;
  total_users: number;
  total_loan_products: number;
  total_pending_loans: number;
  recent_loans: {
    id: number;
    user: { name: string; email: string };
    loan_product: { name: string };
    loan_score: { score: number };
    amount: string;
    status: string;
    created_at: string;
  }[];
};
