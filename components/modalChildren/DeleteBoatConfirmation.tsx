import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface DeleteBoatConfirmationProps {
  onClose: () => void;
  name?: string;
  id: number;
}

const DeleteBoatConfirmation = ({
  onClose,
  name,
  id,
}: DeleteBoatConfirmationProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/boats/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success(`${name} isimli tekne başarıyla silindi.`);
        onClose();
        router.refresh();
      }
    } catch (error: any) {
      console.error("Silme işlemi sırasında hata oluştu:", error);
      toast.error(error.message || "Bir hata oluştu.");
    }
  };

  return (
    <div>
      <div>
        <span>
          {name} isimli tekle listeden kaldırılacaktır. Onaylıyor musunuz ?
        </span>
      </div>
      <div className="flex items-center justify-end mt-4 gap-4">
        <button
          onClick={onClose}
          className="bg-red-500  text-neutral px-4 py-2 rounded-xl"
        >
          Hayır
        </button>
        <button
          onClick={handleSubmit}
          className="bg-mint-500 hover:bg-mint-400 text-neutral px-4 py-2 rounded-xl"
        >
          Evet
        </button>
      </div>
    </div>
  );
};

export default DeleteBoatConfirmation;
