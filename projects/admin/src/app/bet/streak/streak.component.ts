import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, of } from "rxjs";
import {
  tap,
  debounceTime,
  startWith,
  distinctUntilChanged,
  catchError,
  skip
} from "rxjs/operators";
import { Store } from "@ngrx/store";

import { PaginationSearchParams } from "src/app/common/models";

import {
  getCurrentTotal,
  getError,
  getList,
  getLoading,
  getPaginationSearchParams
} from "./streak.selectors";
import { ListState } from "./streak.model";
import { loadList, updateCurrentPage, updatePageSize } from "./streak.actions";

@Component({
  selector: "admin-streak-bet-list",
  styleUrls: ["./streak.component.scss"],
  templateUrl: "./streak.component.html"
})
export class ListComponent implements OnInit, OnDestroy {
  private subs = new Subscription();

  isLoading$ = this.store.select(getLoading);
  list$ = this.store.select(getList);
  error$ = this.store.select(getError);
  currentTotal$ = this.store.select(getCurrentTotal);
  paginationSearchParams$ = this.store.select(getPaginationSearchParams);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<ListState>
  ) {}

  ngOnInit() {
    this.subs.add(this.subscribeToSource());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private subscribeToSource(): Subscription {
    return this.paginationSearchParams$
      .pipe(
        skip(2),
        startWith(this.getSearchParamsFromURL()),
        distinctUntilChanged(
          (firstSearchParams, secondSearchParams) =>
            JSON.stringify(firstSearchParams) ===
            JSON.stringify(secondSearchParams)
        ),
        debounceTime(10),
        tap(searchParams => {
          this.router.navigate([], {
            queryParams: searchParams
          });
        }),
        tap(searchParams => {
          this.store.dispatch(loadList({ params: searchParams }));
        }),
        catchError(() => of({}))
      )
      .subscribe();
  }

  pageIndexChange(currentPage: number) {
    this.store.dispatch(updateCurrentPage({ currentPage }));
  }

  pageSizeChange(pageSize: number) {
    this.store.dispatch(updatePageSize({ pageSize }));
  }

  private getSearchParamsFromURL(): PaginationSearchParams {
    const {
      currentPage = "1",
      pageSize = "20"
    } = this.route.snapshot.queryParams;

    return {
      currentPage: Number(currentPage),
      pageSize: Number(pageSize)
    };
  }
}
