import { BaseForm } from "../achievements-form.models";

export interface OpenedAchievementsFormValueModel extends BaseForm {
  type: "win_bets_row";
  count: number;
}
