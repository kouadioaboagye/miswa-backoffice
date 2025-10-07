import { Apartment } from "@/features/admin/module/property/components/forms/tables/building/details/columns";

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
  ville: string;
  type: string;
  buildingYear: string;
  landSurface: number;
  elevator: boolean;
  internet: boolean
  water: boolean;
  parking: {
    available: boolean,
    amount: number,
  },
  security: {
    available: boolean,
    amount: number,
  },
  commonSpaces: {
    available: boolean,
    amount: number
  },
};

export type IBuildingDetailsModel = {
  batiment: IBuildingDataModel;
  proprietes: Apartment[];
  nombre_total_etages: number;
  nombre_proprietes_occupees: number;
  nombre_total_proprietes: number;
  nombre_proprietes_disponibles: number;
  taux_occupation: number;
}
