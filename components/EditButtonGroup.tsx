"use client";
import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
interface EditButtonGroupProps {
  id: number;
}
const EditButtonGroup = ({ id }: EditButtonGroupProps) => {
  console.log(id);
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXTAUTH_SECRET}boats/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Silme işlemi başarılı");
      }
    } catch (error) {
      console.error("Silme işlemi sırasında hata oluştu:", error);
    }
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
    </div>
  );
};

export default EditButtonGroup;
