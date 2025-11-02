export type ITenantDataModel = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    birthdate: string;
    birth_place: string,
    marital_status: string,
    property: {
        id: string;
        name: string;
        cover_url: string
    },
    identity_card_type: string,
    identity_card_number: string,
    identity_card_expiry_date: string,
    phonenumber: string;
    address: string,
    municipality: string,
    street: string,
    country: string,
    profession: string,
    company_name: string,
    campany_address: string,
    contract_type: string,
    contract_start_date: string,
    cover_url: string;
    garant_name: string;
    garant_phonenumber: string
}