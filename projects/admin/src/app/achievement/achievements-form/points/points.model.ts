import { BaseForm } from "../achievements-form.models";

export interface PointsFormValueModel extends BaseForm {
  type: "points";
  amount: number;
}
