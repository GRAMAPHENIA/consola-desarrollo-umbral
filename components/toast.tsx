"use client";

import { useEffect, useState } from "react";
import { X, AlertCircle, CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose?: () => void;
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); // Espera a que termine la animación
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 flex items-center p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === "success" 
          ? "bg-green-50 border border-green-200 text-green-800" 
          : "bg-red-50 border border-red-200 text-red-800"
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <div className="flex items-center">
        {type === "success" ? (
          <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
        ) : (
          <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
