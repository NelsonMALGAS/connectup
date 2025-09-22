import { toast } from "sonner";
import { ReactNode } from "react";

type ToastOptions = {
  description?: string;
  icon?: ReactNode;
};

// Green styled success toast
export const showSuccessToast = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    description: options?.description,
    icon: options?.icon,
    className: "bg-green-100 text-green-800 border border-green-800",
  });
};

// Red styled error toast
export const showErrorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    description: options?.description,
    icon: options?.icon,
    className: "bg-red-100 text-red-800 border border-red-800",
  });
};
