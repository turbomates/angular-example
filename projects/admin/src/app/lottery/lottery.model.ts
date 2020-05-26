export interface Lottery {
  id: string;
  name: string;
  price?: number;
  description?: string;
  appearAt: string;
  startAt: string;
  finishAt: string;
  multiEnter?: boolean;
  minTicketsCount?: number;
  prize?: {
    amount: number;
    currency: string;
  };
  images?: string[];
  status: string;
  ticketsCount: number;
}

export interface SearchParams {
  currentPage: number;
  pageSize: number;
  type?: string;
}
