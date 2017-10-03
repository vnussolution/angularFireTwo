
export interface ICompany {

    $key: string;
    name: string;
    phone: string;
}

export interface IContact {

    $key: string;
    name: string;
    phone: string;
    contactCompanies: { [key: string]: { name: string } };
    imageUrl?: string;
}

