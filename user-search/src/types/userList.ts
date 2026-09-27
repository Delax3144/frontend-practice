export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    website: string;
    address: Address
}

interface Address {
    street: string,
    suite: string,
    city: string,
    zipcode: string
}

export type SortOrder = "default" | "asc" | "desc";