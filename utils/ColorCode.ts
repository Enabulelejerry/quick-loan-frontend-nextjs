export const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-50 text-green-700";
    case "approved":
      return "bg-green-50 text-green-700";
    case "due":
      return "bg-red-50 text-red-700";
    case "rejected":
      return "bg-red-50 text-red-700";
    case "upcoming":
      return "bg-gray-50 text-gray-700";
    case "pending":
      return "bg-yellow-50 text-yellow-700";
    case "active":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

export const getColor = (status: string) => {
  switch (status) {
    case "pending":
      return "secondary";
    case "approved":
      return "default";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
};
