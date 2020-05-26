import { Error } from "src/app/common/models";

import { SuperAgent } from "../super-agent.models";

export interface ListState {
  list: SuperAgent[];
  currentPage: number;
  pageSize: number;
  hasMore: boolean;
  loading: boolean;
  error: Error | null;
}
