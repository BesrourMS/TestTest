import { Component,OnInit } from '@angular/core';
import { TranslateService } from './translate';

@Component({
   selector: 'dashboard-cmp',
   template: `
    
   <div class="btn-group">
        <button *ngFor="let lang of supportedLangs" (click)="selectLang(lang.value)" class="btn btn-default" [class.btn-primary]="isCurrentLang(lang.value)">
            {{ lang.display }}
        </button>
    </div>
   <nav>
		<a routerLink="/login" routerLinkActive="active">Login</a>
		<a routerLink="/signup" routerLinkActive="active">Sign Up</a>
	</nav>
  <router-outlet></router-outlet>
   
             `
})
export class DashboardComponent { 
	public translatedText: string;
		public supportedLangs: any[];

    constructor(private _translate: TranslateService) { }

    ngOnInit() {
        // standing data
         this.supportedLangs = [
        { display: 'English', value: 'en' },
        { display: 'Français', value: 'fr' },
        ];

        // set current langage
        this.selectLang('en');
    } 

     isCurrentLang(lang: string) {
        // check if the selected lang is current lang
        return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
        // set current lang;
        this._translate.use(lang);
        this.refreshText();
    } 

     refreshText() {
        // refresh translation when language change
        this.translatedText = this._translate.instant('Create');
    } 
} 
