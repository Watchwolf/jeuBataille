import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ScoresListComponentComponent } from '../scores-list-component/scores-list-component.component';

@Component({
  selector: 'app-scores-list',
  templateUrl: './scores-list.component.html',
  styleUrls: ['./scores-list.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, TranslateModule, MatButtonModule, MatIconModule, RouterModule, ScoresListComponentComponent],
})
export class ScoresListComponent {

}
