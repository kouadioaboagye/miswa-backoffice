export type ICountryDataModel = {
    id: string,
    name: string,
    flag_url: string,
    phone_code: string,
    country_code: string
}

export type IMunicipalityDataModel = {
    id: string,
    name: string,
    id_country: string
}