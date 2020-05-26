export interface Player {
  avatar: string | null;
  birthday: string;
  city: string;
  country: string;
  currency: string;
  email: string;
  firstName: string;
  gender: Gender;
  house: string;
  id: string;
  lastName: string;
  locale: string;
  mobileNumber: string;
  oddFormat: string;
  phoneNumber: string;
  state: string;
  street: string;
  username: string;
  zip: string;
}

enum Gender {
  male = "MALE",
  female = "FEMALE"
}
