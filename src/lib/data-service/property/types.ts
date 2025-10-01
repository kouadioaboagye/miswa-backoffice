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