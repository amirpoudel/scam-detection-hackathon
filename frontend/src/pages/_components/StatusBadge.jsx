export default function StatusBadge({ status }) {
  const getStatusColor = () => {
    switch (status) {
      case "Safe":
        return "!bg-green-500 !text-white";

      case "Scam":
        return "!bg-red-500 text-red-800";
      default:
        return "bg-gray-100 !text-white";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-white rounded-full text-sm font-medium ${getStatusColor()}`}
    >
      {status}
    </span>
  );
}
