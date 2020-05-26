import { BaseForm } from "../achievements-form.models";

export interface WinBetsRowFormValueModel extends BaseForm {
  type: "opened_achievements";
  count: number;
}
