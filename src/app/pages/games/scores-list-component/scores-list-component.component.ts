import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-scores-list-component',
  templateUrl: './scores-list-component.component.html',
  styleUrls: ['./scores-list-component.component.scss'],
  standalone: true,
  imports: [TranslateModule, MatIconModule, RouterModule],
})
export class ScoresListComponentComponent {
  @Input() nbGamesToDisplay: number = 20
}
