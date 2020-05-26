import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, of } from "rxjs";
import {
  tap,
  debounceTime,
  skip,
  startWith,
  distinctUntilChanged,
  catchError
} from "rxjs/operators";
import { Store } from "@ngrx/store";

import { PaginationSearchParams } from "src/app/common/models";

import {
  loadList,
  updateCurrentPage,
  updatePageSize
} from "./state/list.actions";
import {
  getCurrentTotal,
  getError,
  getList,
  getLoading,
  getPaginationSearchParams
} from "./state/list.selectors";
import { ListState } from "./list.model";

@Component({
  selector: "admin-super-agent-list",
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit, OnDestroy {
  isLoading$ = this.store.select(getLoading);
  list$ = this.store.select(getList);
  error$ = this.store.select(getError);
  currentTotal$ = this.store.select(getCurrentTotal);
  paginationSearchParams$ = this.store.select(getPaginationSearchParams);

  private subs = new Subscription();

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

  pageIndexChange(currentPage: number) {
    this.store.dispatch(updateCurrentPage({ currentPage }));
  }

  pageSizeChange(pageSize: number) {
    this.store.dispatch(updatePageSize({ pageSize }));
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
