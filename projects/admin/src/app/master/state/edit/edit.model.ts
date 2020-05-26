export interface EditFormRequest {
  email: string;
  firstName: string;
  lastName: string;
}

export type EditFormErrors = {
  [K in keyof EditFormRequest]?: string;
};
