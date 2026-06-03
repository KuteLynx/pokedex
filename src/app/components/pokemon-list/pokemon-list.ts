import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonCardComponent],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonListComponent implements OnInit {
  private readonly pokemonService = inject(PokemonService);

  pokemons = signal<Pokemon[]>([]);
  filteredPokemons = signal<Pokemon[]>([]);
  loading = signal(false);
  loadingMore = signal(false);
  searchTerm = signal('');
  searchError = signal('');
  offset = signal(0);
  hasMore = signal(true);
  private readonly limit = 20;

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.loading.set(true);
    this.pokemonService.getPokemonList(0, this.limit).subscribe({
      next: (pokemons) => {
        this.pokemons.set(pokemons);
        this.filteredPokemons.set(pokemons);
        this.offset.set(this.limit);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  loadMore(): void {
    if (this.loadingMore() || !this.hasMore() || this.searchTerm()) return;

    this.loadingMore.set(true);
    this.pokemonService
      .getPokemonList(this.offset(), this.limit)
      .subscribe({
        next: (newPokemons) => {
          const all = [...this.pokemons(), ...newPokemons];
          this.pokemons.set(all);
          this.filteredPokemons.set(all);
          this.offset.update((v) => v + this.limit);
          this.loadingMore.set(false);
          if (newPokemons.length < this.limit) {
            this.hasMore.set(false);
          }
        },
        error: () => this.loadingMore.set(false),
      });
  }

  onSearch(): void {
    const term = this.searchTerm().trim().toLowerCase();
    this.searchError.set('');

    if (!term) {
      this.filteredPokemons.set(this.pokemons());
      return;
    }

    // Filter from already loaded
    const local = this.pokemons().filter((p) =>
      p.name.includes(term) || p.id.toString() === term
    );

    if (local.length > 0) {
      this.filteredPokemons.set(local);
      return;
    }

    // Try API search
    this.loading.set(true);
    this.pokemonService.searchPokemon(term).subscribe({
      next: (pokemon) => {
        this.filteredPokemons.set([pokemon]);
        this.loading.set(false);
      },
      error: () => {
        this.filteredPokemons.set([]);
        this.searchError.set(`No se encontro "${this.searchTerm()}"`);
        this.loading.set(false);
      },
    });
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.searchError.set('');
    this.filteredPokemons.set(this.pokemons());
  }
}
