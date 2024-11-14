import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'jeuBataille';

  constructor(
    private translate: TranslateService) {

    var userLangNavigator = navigator.language.toLowerCase().split('-')[0]
    this.translate.use(userLangNavigator); //'fr' or 'en'
  }
}
