import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { of, Subscription } from "rxjs";
import {
  catchError,
  startWith,
  tap,
  distinctUntilChanged,
  skip,
  debounceTime
} from "rxjs/operators";

import { ListState } from "../admin.model";
import { PaginationSearchParams } from "src/app/common/models";

import { updateCurrentPage, updatePageSize, loadList } from "./list.actions";
import {
  getLoading,
  getList,
  getError,
  getPaginationSearchParams,
  getCurrentTotal
} from "./list.selectors";

@Component({
  selector: "admin-list",
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

  ngOnInit(): void {
    this.subs.add(this.subscribeToSource());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public pageIndexChange(currentPage: number) {
    this.store.dispatch(updateCurrentPage({ currentPage }));
  }

  public pageSizeChange(pageSize: number) {
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
