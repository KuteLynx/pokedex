import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/pokemon-list/pokemon-list').then(
        (m) => m.PokemonListComponent
      ),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('./components/pokemon-detail/pokemon-detail').then(
        (m) => m.PokemonDetailComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
