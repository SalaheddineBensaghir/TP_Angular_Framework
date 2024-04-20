import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {app} from "../../../server";

@Component({
  selector: 'app-app-errors',
  templateUrl: './app-errors.component.html',
  styleUrl: './app-errors.component.css'
})
export class AppErrorsComponent {

  constructor(public  appState: AppStateService) {
  }


}
