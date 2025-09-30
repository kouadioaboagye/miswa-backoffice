export type menu = {
    label: string,
    icon: any,
    href: string,
    items: {
        label: string,
        icon: any,
        href: string
    }[]
}

export type module = {
    label: string,
    icon: any,
    defaultHref: string,
    value: string
}