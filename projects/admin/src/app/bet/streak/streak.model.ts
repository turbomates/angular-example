import { Error } from "src/app/common/models";

export interface StreakBet {
  id: string;
  stake: Money;
  profit: Money;
  orderNumber: number;
  status: StreakBetStatus;
  selectionId: number;
  selections: Selection[];
  eventId: number;
  eventName: string;
  eventStartTime: string;
  eventStage: string;
  competitionId: number;
  competitionName: number;
  categoryId: number;
  categoryName: string;
  sportId: number;
  sportName: string;
  createdAt: string;
  updatedAt: string;
}

interface Money {
  amount: number;
  currency: string;
}

interface Selection {
  id: number;
  name: string;
  metadata: {
    image_url: string;
    score: number;
  };
}

enum StreakBetStatus {
  win = "WIN",
  lose = "LOSE",
  active = "ACTIVE"
}

export interface ListState {
  list: StreakBet[];
  currentPage: number;
  pageSize: number;
  hasMore: boolean;
  loading: boolean;
  error: Error | null;
}
