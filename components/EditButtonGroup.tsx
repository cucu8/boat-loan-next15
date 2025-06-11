"use client";
import React from "react";
import { Delete, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "@/elements/Modal";
import DeleteBoatConfirmation from "./modalChildren/DeleteBoatConfirmation";
import { useRouter } from "next/navigation";
interface EditButtonGroupProps {
  id: number;
  name: string;
}
const EditButtonGroup = ({ id, name }: EditButtonGroupProps) => {
  const router = useRouter();
  const [isOpenDeleteModal, setIsDeleteModal] = React.useState(false);

  const handleDelete = () => {
    setIsDeleteModal(true);
  };

  const handleEdit = () => {
    router.push(`/edit-boat/${id}`);
  };

  return (
    <div className="flex items-center gap-4 p-4 w-full">
      <button
        onClick={handleEdit}
        className="flex flex-row rounded-xl p-2 w-full justify-between bg-navy text-neutral items-center hover:bg-navy-600"
      >
        <span>Düzenle</span>
        <Pencil className="text-yellow-500 w-5 h-5" />
      </button>
      <button
        onClick={handleDelete}
        className="flex flex-row rounded-xl p-2 w-full justify-between bg-navy text-neutral items-center hover:bg-navy-600"
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
