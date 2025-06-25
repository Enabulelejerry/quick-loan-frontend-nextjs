import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useApproveLoan } from "@/hooks/useApproveLoan";
import { useRejectLoan } from "@/hooks/useRejectLoans";

function AdminLoanAction({ loanId }: { loanId: string }) {
  const approveLoan = useApproveLoan(loanId);
  const rejectLoan = useRejectLoan(loanId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Decision</CardTitle>
        <CardDescription>
          Review the application and make a decision
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          className="w-full"
          onClick={() => approveLoan.mutate()}
          disabled={approveLoan.isPending}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          {approveLoan.isPending ? "Approving..." : "Approve"}
        </Button>

        <Button
          variant="destructive"
          className="w-full"
          onClick={() => rejectLoan.mutate()}
          disabled={rejectLoan.isPending}
        >
          <XCircle className="h-4 w-4 mr-2" />
          {rejectLoan.isPending ? "Rejecting..." : "Reject"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default AdminLoanAction;
