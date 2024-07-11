import React, { createContext, useContext } from 'react';
import { useToast as useRadixToast } from "@/components/ui/use-toast";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const { toast } = useRadixToast();
    return (
        <ToastContext.Provider value={toast}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};
