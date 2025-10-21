export type Feature = {
    id: number;
    name: string;
    description?: string;
    cover_url?: string;
};

export type APIResponseGetFeatures = {
    data: Feature[];
};