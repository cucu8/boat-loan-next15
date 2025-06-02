export interface IdParams {
  params: {
    id: string;
  };
}

export interface BoatCardModel {
  id: number;
  name: string;
  description: string;
  pricePerHour: number;
  capacity: number;
  isAvailable: boolean;
  ownerName: string;
  districtName: string;
  imageUrls: string[];
  ownerPhoneNumber?: string;
}

export interface AddBoatFormData {
  name: string;
  description: string;
  pricePerHour: number | null;
  capacity: number | null;
  isAvailable: boolean;
  districtId: number | null;
  imagesUrls: string[];
  ownerId: number;
}

export interface LoginSuccessResponse {
  token: string;
  user: { id: number; email: string; userType: number; name: string };
}
