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
}
