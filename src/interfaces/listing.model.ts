export type SearchType = {[key in keyof IListing]?: string;}
export type CustomReturnType = Array<keyof IListing>
export type LisitingType = 'GetAllListings'

export interface IListingPostBody {
  apikey: string;
  type: LisitingType;
  limit?: number; // between 1 and 500
  sort?: string; // Sort can be any of but not limited to the following: [’id’, ’title’, ’location’, ’price’, ’bedrooms’, ’bath- rooms’, ’parking spaces’]
  order?: 'ASC' | 'DESC';
  fuzzy?: boolean;
  search?: SearchType;
  return: CustomReturnType
}

export interface IListingResponseObject {
  status: "success",
  timestamp: string;
  data: IListing[];
}

export interface IListing {
  id: number;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  url: string;
  parking_spaces: number;
  amenities: string;
  description: string;
  type: 'sale' | 'rent';
  images: string[];
}

// PA2 examples
