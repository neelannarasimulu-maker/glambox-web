"use client";

import { useEffect } from "react";

export type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
};

const Toast = ({ message, onClose, duration = 2400 }: ToastProps) => {
  useEffect(() => {
    const timer = window.setTimeout(() => onClose(), duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-white/20 bg-black/80 px-4 py-3 text-sm text-white shadow-xl">
      {message}
    </div>
  );
};

export default Toast;
