export type IPropertyDataModel = {
    id: string;
    name: string;
    description?: string;
    cover_url?: string;
    is_busy: boolean;
    business?: {
        name: string;
    };
    images?: string[];
    created_at: string;
    updated_at: string;
}

export type IBuildingDataModel = {
  id: string;
  name: string;
  description: string;
  cover_url: string;
  street: string;
  address: string;
  longitude: number;
  latitude: number;
  photos: string[];
  is_public: boolean;
  id_business: number;
  id_municipality: number;
  created_at: string;
  ville: string
};
