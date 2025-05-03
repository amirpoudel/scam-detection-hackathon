export const COOKIE_OPTIONS = {
    
    path: '/',
    httpOnly: true,
    secure: false, // Change this to false for local development
    sameSite: 'none'as 'none' | 'lax' | 'strict' | undefined,
};

export const USER_OFFICE = {
    CENTRAL: 'central',
    KOSHI: 'koshi',
    MADHESH: 'madhesh',
    BAGMATI: 'bagmati',
    GANDAKI: 'gandaki',
    LUMBINI: 'lumbini',
    KARNALI: 'karnali',
    SUDURPASCHIM: 'sudurpaschim',
}

const  SupportType =  {
    free:'FREE',
    subsidized:'SUBSIDIZED',
    FULL_PAYMENT:'FULL'
}

export const MODULES = {
    users:{
        actions:['create','read','update','delete']
    },
    farmers:{
        actions:['create','read','update','delete']
    },
    products:{
        actions:['create','read','update','delete']
    },
    productions:{
        actions:['create','read','update','delete']
    },
    enquiries:{
        actions:['create','read','update','delete']
    },

}

export const DOWNLOAD_REPORTS_PATH = './storage/reports';
export const RESPONSE_REPORTS_PATH = 'storage/reports';


export const OTP_EXPIRY = 1000 * 60 * 60