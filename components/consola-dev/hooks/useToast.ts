import { useState } from 'react';
import { ToastState } from '../types';

/**
 * Hook para manejar notificaciones tipo toast
 * @returns Estado y funciones para mostrar/ocultar notificaciones
 */
export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    show: false
  });

  /**
   * Muestra una notificación
   * @param message Mensaje a mostrar
   * @param type Tipo de notificación ('success' o 'error')
   */
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({
      message,
      type,
      show: true
    });
  };

  /**
   * Oculta la notificación actual
   */
  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      show: false
    }));
  };

  /**
   * Muestra un mensaje de error
   * @param message Mensaje de error
   */
  const showError = (message: string) => {
    showToast(message, 'error');
  };

  /**
   * Muestra un mensaje de éxito
   * @param message Mensaje de éxito
   */
  const showSuccess = (message: string) => {
    showToast(message, 'success');
  };

  return {
    toast,
    showToast,
    hideToast,
    showError,
    showSuccess
  };
};
