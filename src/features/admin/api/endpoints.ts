export const endpoints = {
    auth: {
        login: '/auth/login/password',
        logout: '/auth/logout',
        reset_password: '/auth/reset-password',
        current_user: '/users/me/'
    },
    property: {
        list: '/properties/',
        create: '/properties',
        buildings: '/buildings/',
        comodity: '/property-features/',
        detail: (propertyId: string) => `/properties/${propertyId}/`,
        update: (propertyId: string) => `/properties/${propertyId}/`,
        delete: (propertyId: string) => `/properties/${propertyId}/`
    },
    contract: {
        list: '/contracts/',
        create: '/contracts/',
        detail: (contractId: string) => `/contracts/${contractId}`,
        update: (contractId: string) => `/contracts/${contractId}`,
        delete: (contractId: string) => `/contracts/${contractId}`
    },
    businesses: {
        list: '/businesses/',
        create: '/businesses/',
        delete: (businessId: number) => `/businesses/${businessId}/`
    },
    users: {
        list: '/users/',
        create: '/users/',
        delete: (userId: number) => `/users/${userId}/`,
        update: (userId: number) => `/users/${userId}/`,
        details: (userId: number) => `/users/${userId}/`,
        update_status: (userId: number) => `/users/${userId}/status/`
    },
    tenants: {
        list: '/tenants/',
        create: '/tenants/',
        delete: (tenantId: number) => `/tenants/${tenantId}/`,
        update: (tenantId: number) => `/tenants/${tenantId}/`,
        details: (tenantId: number) => `/tenants/${tenantId}/`
    },
    contract_types: {
        list: '/contract-types/',
        create: '/contract-types/',
        delete: (contractTypeId: number) =>
            `/contract-types/${contractTypeId}/`,
        update: (contractTypeId: number) =>
            `/contract-types/${contractTypeId}/`,
        details: (contractTypeId: number) =>
            `/contract-types/${contractTypeId}/`
    },
    roles: {
        list: '/roles/',
        create: '/roles/',
        delete: (roleId: number) => `/roles/${roleId}/`,
        update: (roleId: number) => `/roles/${roleId}/`
    },
    dashboard: '/dashboard/general/',
    countries: '/countries/',
    municipalities: '/municipalities/',
    upload: '/upload/'
};

export type ListParams = {
    page?: number;
    limit?: number;
};
