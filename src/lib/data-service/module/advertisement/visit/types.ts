// lib/data-service/module/visit/types.ts
export interface IVisitDataModel {
    id: string;
    visitor: {
        firstname: string;
        lastname: string;
        cover_url: string;
        email?: string;
    };
    property: {
        id: string;
        name: string;
        cover_url: string;
    };
    ad_reference: string;
    visit_datetime: string;
    status: string;
}