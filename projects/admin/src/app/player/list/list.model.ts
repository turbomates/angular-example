import { Error } from "src/app/common/models";

import { Player } from "../player.model";

export interface ListState {
  list: Player[];
  currentPage: number;
  pageSize: number;
  hasMore: boolean;
  loading: boolean;
  error: Error | null;
}
