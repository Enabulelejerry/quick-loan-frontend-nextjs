export type User = {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin"; // adjust as needed
  created_at?: string;
  updated_at?: string;
};
