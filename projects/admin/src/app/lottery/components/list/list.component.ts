import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  skip,
  startWith,
  tap
} from "rxjs/operators";
import { of, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import {
  getCurrentTotal,
  getData,
  getError,
  getLoading,
  getSearchParams
} from "../../state/list/list.selectors";
import { ListState } from "../../state/list/list.reducer";
import {
  loadList,
  updateScope,
  updateCurrentPage,
  updatePageSize
} from "../../state/list/list.actions";
import { SearchParams } from "../../lottery.model";
import { ScopeComponent } from "./scope/scope.component";

@Component({
  selector: "admin-lottery-list",
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild(ScopeComponent, { static: true })
  scope: ScopeComponent;

  isLoading$ = this.store.select(getLoading);
  list$ = this.store.select(getData);
  error$ = this.store.select(getError);
  currentTotal$ = this.store.select(getCurrentTotal);
  searchParams$ = this.store.select(getSearchParams);

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<ListState>
  ) {}

  ngOnInit() {
    this.subs.add(this.subscribeToScopeSource()).add(this.subscribeToSource());
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
    return this.searchParams$
      .pipe(
        skip(3),
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

  private subscribeToScopeSource(): Subscription {
    return this.scope.onSelect$
      .pipe(
        distinctUntilChanged(),
        tap(type => {
          return this.store.dispatch(updateScope({ scopeType: type }));
        })
      )
      .subscribe();
  }

  private getSearchParamsFromURL(): SearchParams {
    const {
      currentPage = 1,
      pageSize = 20,
      type = null
    } = this.route.snapshot.queryParams;

    return {
      currentPage: Number(currentPage),
      pageSize: Number(pageSize),
      type
    };
  }
}
