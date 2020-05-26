import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { Choice } from "src/app/common/models";
import { ImageService } from "src/app/shared/services/image.service";

import { EditFormErrors } from "../edit/edit.model";
import { AchievementResponse, AchievementType } from "../achievement.model";
import {
  AchievementCondition,
  AchievementRequest,
  FormValueModel
} from "./achievements-form.models";

@Component({
  selector: "admin-achievements-form",
  templateUrl: "./achievements-form.component.html",
  styleUrls: ["./achievements-form.component.scss"]
})
export class AchievementsFormComponent implements OnInit {
  public readonly achievementTypesChoices: Choice[] = [
    { label: "Bets", value: "bets" },
    { label: "Points", value: "points" },
    { label: "Win bets row", value: "win_bets_row" },
    { label: "Opened achievements", value: "opened_achievements" }
  ];
  public form: FormGroup;

  @Input() data: AchievementResponse;
  @Input() errors: EditFormErrors;
  @Input() isSubmitting: boolean;
  @Input() formActionType: string;
  @Output() onSubmit = new EventEmitter<AchievementRequest>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm(this.data);
  }

  submit() {
    const data = this.serializeFormValue(this.form.value);
    this.onSubmit.emit(data);
  }

  changeFormControl(type: AchievementType) {
    switch (type) {
      case "bets":
        this.form.removeControl("amount");
        this.form.addControl("count", new FormControl(1, Validators.required));
        break;

      case "points":
        this.form.removeControl("count");
        this.form.addControl("amount", new FormControl(1, Validators.required));
        break;

      case "opened_achievements":
        this.form.removeControl("amount");
        this.form.addControl("count", new FormControl(1, Validators.required));
        break;

      case "win_bets_row":
        this.form.removeControl("amount");
        this.form.addControl("count", new FormControl(1, Validators.required));
        break;
    }
  }

  private initForm(data: AchievementResponse) {
    this.form = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      rank: [data.rank, Validators.required],
      badge: [data.badge, Validators.required],
      fee: [data.fee, Validators.required],
      groupId: [data.groupId],
      enabled: [data.enabled],
      repeatable: [data.repeatable],
      type: [data.type, Validators.required],

      ...this.getCondition(data)
    });
  }

  private getCondition(data: AchievementResponse) {
    switch (data.type) {
      case "bets":
        return {
          count: [data.condition.count, Validators.required]
        };

      case "points":
        return {
          amount: [data.condition.amount, Validators.required]
        };

      case "opened_achievements":
        return { count: [data.condition.count, Validators.required] };

      case "win_bets_row":
        return { count: [data.condition.count, Validators.required] };
    }
  }

  private serializeFormValue(data: FormValueModel): AchievementRequest {
    const image = new ImageService(data.badge);
    const badgeData = image.isBase64() ? { badge: image.getData() } : {};

    return {
      title: data.title,
      description: data.description,
      groupId: data.groupId,
      rank: data.rank,
      fee: data.fee,
      enabled: data.enabled,
      repeatable: data.repeatable,
      ...badgeData,
      ...this.serializeCondition(data)
    };
  }

  private serializeCondition(value: FormValueModel): AchievementCondition {
    switch (value.type) {
      case "bets": {
        return {
          bets: {
            count: value.count
          }
        };
      }

      case "points": {
        return {
          points: {
            amount: value.amount
          }
        };
      }

      case "opened_achievements": {
        return {
          opened_achievements: {
            count: value.count
          }
        };
      }

      case "win_bets_row": {
        return {
          win_bets_row: {
            count: value.count
          }
        };
      }
    }
  }
}
