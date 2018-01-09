export interface RegistrationVisit {
    name: String;
    surname: String;
    pesel: Number;
    dateOfBirth: Date;
    email: String;
    number: Number;
}

export interface Registrations {
    _id?: String;
    registration: RegistrationVisit[];
}
