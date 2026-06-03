import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pokemon, TYPE_COLORS } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss',
})
export class PokemonCardComponent {
  @Input({ required: true }) pokemon!: Pokemon;

  get artworkUrl(): string {
    return (
      this.pokemon.sprites.other['official-artwork'].front_default ||
      this.pokemon.sprites.front_default
    );
  }

  get primaryType(): string {
    return this.pokemon.types[0]?.type.name || 'normal';
  }

  get cardGradient(): string {
    const primary = TYPE_COLORS[this.primaryType] || '#A8A77A';
    const secondary =
      this.pokemon.types[1]?.type.name
        ? TYPE_COLORS[this.pokemon.types[1].type.name] || primary
        : primary;
    return `linear-gradient(135deg, ${primary}, ${secondary})`;
  }

  getTypeColor(type: string): string {
    return TYPE_COLORS[type] || '#A8A77A';
  }

  formatId(id: number): string {
    return `#${id.toString().padStart(3, '0')}`;
  }
}
