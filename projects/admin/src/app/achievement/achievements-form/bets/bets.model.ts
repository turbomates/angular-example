import { BaseForm } from "../achievements-form.models";

export interface BetsFormValueModel extends BaseForm {
  type: "bets";
  count: number;
}
