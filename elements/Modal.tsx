"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-white bg-black/50 flex items-center justify-center z-50">
      <div className="bg-navy text-navy dark:bg-navy dark:text-neutral p-6 rounded-2xl shadow-2xl max-w-md w-full relative">
        {children}
      </div>
    </div>
  );
};

export default Modal;
