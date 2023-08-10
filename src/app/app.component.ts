import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject,
  combineLatest,
  concatMap,
  from,
  map,
  Observable,
  scan,
  Subject,
  switchMap,
  tap,
  toArray
} from "rxjs";
import {pokemonPaginator, pokemonResult} from "../model/pokemon";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  lastImg$ = new Subject<HTMLDivElement>();
  offset = 0;
  limit = 20;
  urlNext$ = new Subject<string>();
  pokemonApiList$ = new BehaviorSubject<string>(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`)
  loadMore$ = combineLatest([this.lastImg$, this.urlNext$]).pipe(
    switchMap(([img, url]: [img: HTMLDivElement, url: string]) => {

      return this.useIntersectionObserver(img).pipe(tap(() => {
        this.pokemonApiList$.next(url);
      }));
    }))
  pokemonResultList$ = this.pokemonApiList$.pipe(
    switchMap((url: string) => {
      return this.loadPokemonList(url)
    }),
    tap(res => {
      this.urlNext$.next(res.next)
    }),
    scan((acc: pokemonPaginator, value: pokemonPaginator, index: number) => {
      if (!acc) {
        acc = {...value};
      } else {
        acc.results = [...acc.results, ...value.results];
      }

      return acc
    }));
  pokemonList: pokemonResult[] = [];
  private http = inject(HttpClient);

  @ViewChild('loadMore') set loadMore(value: ElementRef<HTMLDivElement>) {
    if (value) {
      this.lastImg$.next(value.nativeElement)
    }
  }

  ngOnInit(): void {
    this.loadMore$.subscribe()
  }

  loadPokemonList(url: string): Observable<pokemonPaginator> {
    return this.http.get<pokemonPaginator>(url)
  }

  useIntersectionObserver(el: HTMLElement) {
    return new Observable<boolean>(subscriber => {
      const intersectionObserver = new IntersectionObserver(entries => {
        const {isIntersecting} = entries[0];
        if (isIntersecting) {
          subscriber.next(isIntersecting);
          subscriber.complete();
        }
      }, {threshold: 0.2})
      if (el)
        intersectionObserver.observe(el);
      return {
        unsubscribe() {
          intersectionObserver.disconnect();
        }
      }
    })
  }

}
