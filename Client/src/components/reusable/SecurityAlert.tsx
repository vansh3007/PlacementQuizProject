import React from "react";
import { X } from "lucide-react";

interface SecurityAlertProps {
  message: string;
  setSecurity: (show: boolean) => void;
}

const SecurityAlert: React.FC<SecurityAlertProps> = ({
  message,
  setSecurity,
}) => {
  const handleClose = () => setSecurity(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white max-w-md w-full rounded-xl shadow-lg p-6 text-center">
        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-red-600 mb-4">
          Security Notice
        </h2>
        <p className="text-gray-800 mb-6">{message}</p>

        <button
          onClick={handleClose}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SecurityAlert;
