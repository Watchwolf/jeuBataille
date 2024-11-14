import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/homepage/homepage.component').then((m) => m.HomepageComponent),
  },
  {
    path: 'games/scores-list',
    loadComponent: () => import('./pages/games/scores-list/scores-list.component').then((m) => m.ScoresListComponent),
  },
  {
    path: 'games/game',
    loadComponent: () => import('./pages/games/game/game.component').then((m) => m.GameComponent),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
