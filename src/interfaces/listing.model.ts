export interface IListingPostBody {
  apikey: string;
  type: 'GetAllListings';
  limit?: number; // between 1 and 500
  sort?: string; // Sort can be any of but not limited to the following: [’id’, ’title’, ’location’, ’price’, ’bedrooms’, ’bath- rooms’, ’parking spaces’]
  order?: 'ASC' | 'DESC';
  fuzzy?: boolean;
  search?: {
      [key in keyof IListing]?: string;
  };
  return: '*' | string[]; 
}

// {
//   "type": "GetAllLisitngs",
//   "apikey": "5c331d9c15d564d3d0de0f1f2937b92e",
//   "limit": 2,
//   "return": [
//           "id", "price", "location", "images"
//           ],
//   "search": {
//           "location": "Hatfield",
//           "type": "sale" // rent or sale
//   },
//   "fuzzy": true
// }

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