import { HttpErrorResponse } from "@angular/common/http";

export interface Errors {
  [key: string]: string;
}

export interface BackendError {
  message: string;
  property: string;
  value: any;
}

export function parseErrors(errors: BackendError[]): Errors {
  return errors.reduce(
    (formErrors, error) => ({
      ...formErrors,
      [error.property]: error.message
    }),
    {}
  );
}

export interface Error {
  status: number;
  message: string;
}

export function parseError(
  error: HttpErrorResponse,
  defaultMessage: string
): Error {
  return {
    status: error.status,
    message: (error.error && error.error.error) || defaultMessage
  };
}
