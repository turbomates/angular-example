import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { of, Subscription } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  skip,
  startWith,
  tap
} from "rxjs/operators";

import { PaginationSearchParams } from "src/app/common/models";

import { ListState } from "./state/list.model";
import {
  loadList,
  updatePageSize,
  updateCurrentPage
} from "./state/list.actions";
import {
  getCurrentTotal,
  getError,
  getList,
  getLoading,
  getPaginationSearchParams
} from "./state/list.selectors";

@Component({
  selector: "admin-transaction-list",
  styleUrls: ["./list.component.scss"],
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit, OnDestroy {
  private subs = new Subscription();

  public isLoading$ = this.store.select(getLoading);
  public list$ = this.store.select(getList);
  public error$ = this.store.select(getError);
  public currentTotal$ = this.store.select(getCurrentTotal);
  public paginationSearchParams$ = this.store.select(getPaginationSearchParams);

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
