export default function StatusBadge({ status }) {
  const getStatusColor = () => {
    switch (status) {
      case "Safe":
        return "bg-green-100 text-green-800";
      case "Suspicious":
        return "bg-yellow-100 text-yellow-800";
      case "Scam":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
    >
      {status}
    </span>
  );
}
