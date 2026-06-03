import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import {
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
} from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  getPokemonList(
    offset: number = 0,
    limit: number = 20
  ): Observable<Pokemon[]> {
    return this.http
      .get<PokemonListResponse>(
        `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`
      )
      .pipe(
        switchMap((res) => {
          const requests = res.results.map((item) =>
            this.http.get<Pokemon>(item.url)
          );
          return forkJoin(requests);
        })
      );
  }

  getPokemon(idOrName: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${idOrName}`);
  }

  getPokemonSpecies(id: number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(
      `${this.baseUrl}/pokemon-species/${id}`
    );
  }

  searchPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      `${this.baseUrl}/pokemon/${name.toLowerCase()}`
    );
  }

  getTotalCount(): Observable<number> {
    return this.http
      .get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=1`)
      .pipe(map((res) => res.count));
  }
}
