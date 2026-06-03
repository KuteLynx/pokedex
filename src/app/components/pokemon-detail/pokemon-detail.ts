import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import {
  Pokemon,
  PokemonSpecies,
  TYPE_COLORS,
} from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.scss',
})
export class PokemonDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pokemonService = inject(PokemonService);
  private readonly location = inject(Location);

  pokemon = signal<Pokemon | null>(null);
  species = signal<PokemonSpecies | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    forkJoin({
      pokemon: this.pokemonService.getPokemon(id),
      species: this.pokemonService.getPokemonSpecies(+id),
    }).subscribe({
      next: ({ pokemon, species }) => {
        this.pokemon.set(pokemon);
        this.species.set(species);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  get artworkUrl(): string {
    const p = this.pokemon();
    if (!p) return '';
    return (
      p.sprites.other['official-artwork'].front_default ||
      p.sprites.front_default
    );
  }

  get primaryType(): string {
    return this.pokemon()?.types[0]?.type.name || 'normal';
  }

  get bgGradient(): string {
    const primary = TYPE_COLORS[this.primaryType] || '#A8A77A';
    return `linear-gradient(180deg, ${primary}, #1a1a2e 60%)`;
  }

  get description(): string {
    const entry = this.species()?.flavor_text_entries.find(
      (e) => e.language.name === 'es'
    ) || this.species()?.flavor_text_entries.find(
      (e) => e.language.name === 'en'
    );
    return entry?.flavor_text.replace(/[\n\f]/g, ' ') || '';
  }

  get genus(): string {
    const g = this.species()?.genera.find(
      (e) => e.language.name === 'es'
    ) || this.species()?.genera.find(
      (e) => e.language.name === 'en'
    );
    return g?.genus || '';
  }

  getTypeColor(type: string): string {
    return TYPE_COLORS[type] || '#A8A77A';
  }

  formatId(id: number): string {
    return `#${id.toString().padStart(3, '0')}`;
  }

  getStatName(name: string): string {
    const map: Record<string, string> = {
      hp: 'HP',
      attack: 'ATK',
      defense: 'DEF',
      'special-attack': 'SP.ATK',
      'special-defense': 'SP.DEF',
      speed: 'SPD',
    };
    return map[name] || name.toUpperCase();
  }

  getStatPercent(value: number): number {
    return Math.min((value / 255) * 100, 100);
  }

  getStatColor(value: number): string {
    if (value < 50) return '#ff4444';
    if (value < 80) return '#ffaa00';
    if (value < 120) return '#44cc44';
    return '#22aaff';
  }

  goBack(): void {
    this.location.back();
  }

  formatHeight(h: number): string {
    return `${(h / 10).toFixed(1)} m`;
  }

  formatWeight(w: number): string {
    return `${(w / 10).toFixed(1)} kg`;
  }
}
