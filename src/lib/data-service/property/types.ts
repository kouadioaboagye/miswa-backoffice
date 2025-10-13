export type IPropertyDataModel = {
    id: string | number;
    name: string;
    description?: string;
    cover_url?: string;
    reference?: string;
    street?: string;
    address?: string;
    google_plus_code?: string;
    latitude?: number;
    longitude?: number;
    rooms_count?: number;
    likes_count?: number;
    views_count?: number;
    building_steps_level?: number | null;
    built_year?: number;
    area_m2?: number;
    monthly_rent_amount?: number;
    is_busy: boolean;
    is_public?: boolean;
    busy_until?: string | null;
    is_active?: boolean;
    is_banned?: boolean;
    photos?: string[];
    videos?: string[];
    official_documents?: string[];
    id_building?: number;
    id_business?: number;
    id_municipality?: number;
    business?: {
        name: string;
        description?: string | null;
        cover_url?: string | null;
        is_default?: boolean;
        id: number;
    };
    images?: string[];
    created_at: string;
    updated_at: string;
}

export type IBuildingDataModel = {
  id: number;
  name: string;
  description?: string;
  cover_url?: string;
  street?: string;
  address?: string;
  longitude?: number;
  latitude?: number;
  photos?: string[];
  is_public?: boolean;
  id_business?: number;
  id_municipality?: number;
  business?: {
    name: string;
    description?: string | null;
    cover_url?: string | null;
    is_default: boolean;
    id: number;
    owner?: {
      legal_form: string;
      legal_name: string;
      birth_date?: string;
      birth_place?: string;
      marital_status?: string;
      identity_card_type?: string;
      identity_card_number?: string;
      identity_card_issue_date?: string;
      identity_card_issue_place?: string;
      identity_card_expiry_date?: string;
      phonenumber?: string;
      is_whatsapp?: boolean;
      email?: string;
      zip_code?: string;
      municipality?: string;
      address?: string;
      street?: string;
      profession?: string;
      company_name?: string;
      avg_monthly_income?: number;
      payment_mode?: string;
      id: number;
    };
  };
  municipality?: {
    name: string;
    id: number;
    id_country: number;
    country?: {
      name: string;
      flag_url?: string;
      phone_code?: string;
      country_code?: string;
      id: number;
    };
  };
};
