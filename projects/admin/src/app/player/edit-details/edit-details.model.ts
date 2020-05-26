import { Player } from "../player.model";

export interface EditDetailsState {
  player: Player | null;
  isSubmitting: boolean;
  errors: EditDetailsErrors;
}

export type EditDetailsErrors = {
  [K in keyof EditDetailsRequest]?: string;
};

export interface EditDetailsRequest {
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  city: string;
  gender: string;
  birthday: string;
  zip: string;
  street: string;
  house: string;
  phone: string;
  mobile: string;
}
