import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ScoresListComponentComponent } from '../games/scores-list-component/scores-list-component.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, TranslateModule, MatButtonModule, MatIconModule, RouterModule, ScoresListComponentComponent]
})
export class HomepageComponent {

}
