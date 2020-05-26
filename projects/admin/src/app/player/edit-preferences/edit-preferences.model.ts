import { Player } from "../player.model";

export interface EditPreferencesState {
  playerPreference: Player | null;
  isSubmitting: boolean;
  errors: EditPreferencesErrors;
}

export type EditPreferencesErrors = {
  [K in keyof EditPreferencesRequest]?: string;
};

export interface EditPreferencesRequest {
  locale: string;
  currency: string;
  oddFormat: string;
}
