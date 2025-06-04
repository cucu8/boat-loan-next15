"use client";
import React from "react";
import { Delete, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "@/elements/Modal";
import DeleteBoatConfirmation from "./modalChildren/DeleteBoatConfirmation";
interface EditButtonGroupProps {
  id: number;
  name: string;
}
const EditButtonGroup = ({ id, name }: EditButtonGroupProps) => {
  const [isOpenDeleteModal, setIsDeleteModal] = React.useState(false);
  console.log(id);
  const handleDelete = () => {
    setIsDeleteModal(true);
  };

  return (
    <div className="flex items-center gap-4 p-4 w-full">
      <button className="flex flex-row rounded-xl p-2 w-full justify-between bg-navy text-neutral">
        <span>Düzenle</span>
        <Pencil className="text-yellow-500 w-5 h-5" />
      </button>
      <button
        onClick={handleDelete}
        className="flex flex-row rounded-xl p-2 w-full justify-between bg-navy text-neutral"
      >
        <span>Sil</span>
        <Trash2 className="text-red-400 w-5 h-5" />
      </button>

      <Modal
        isOpen={isOpenDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        children={
          <DeleteBoatConfirmation
            name={name}
            onClose={() => setIsDeleteModal(false)}
            id={id}
          />
        }
      />
    </div>
  );
};

export default EditButtonGroup;
