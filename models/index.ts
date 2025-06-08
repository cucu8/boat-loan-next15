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
  ownerPhoneNumber: string;
  cityId: number;
  cityName: string;
  countryId: number;
  countryName: string;
  districtId: number;
  districtName: string;
  images: { id: number; base64Image: string }[];
}

export interface AddBoatFormData {
  name: string;
  description: string;
  pricePerHour: number | null;
  capacity: number | null;
  isAvailable: boolean;
  districtId: number | null;
  images: File[];
  ownerId: number;
}

export interface LoginSuccessResponse {
  token: string;
  user: { id: number; email: string; userType: number; name: string };
}
