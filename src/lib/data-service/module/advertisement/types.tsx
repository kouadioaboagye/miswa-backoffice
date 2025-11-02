export type IAdvertisementDataModel = {
  id: string;
  owner: {
    id: string;
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
  building_reference: string;
  posting_date: string;
  visit_count: number;
  status: string;
};