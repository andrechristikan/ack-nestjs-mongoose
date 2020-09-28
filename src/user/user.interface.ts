export interface IUserStore {
    country: string;
    email: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    password: string;
}

export interface IUserUpdate {
    firstName: string;
    lastName: string;
}

export interface IUserSearch {
    email?: string;
    firstName?: string;
    lastName?: string;
    mobileNumber?: string;
    countryCode?: string;
    mobileNumberCode?: string;
    limit?: number;
    page?: number;
}

export interface IUserSearchCollection {
    email?: {
        $regex: string;
        $options: string;
    };
    firstName?: {
        $regex: string;
        $options: string;
    };
    lastName?: {
        $regex: string;
        $options: string;
    };
    mobileNumber?: string;
    country?: {
        countryCode?: string;
        mobileNumberCode?: string;
    };
}
