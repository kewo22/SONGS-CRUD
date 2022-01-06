import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {

  themeColor: string | null = 'light-theme';

  constructor() { }

  ngOnInit() {
    this.setDefaultTheme();
  }

  setDefaultTheme() {
    if (localStorage.getItem('pxTheme')) {
      this.themeColor = localStorage.getItem('pxTheme');
      const body = document.getElementsByTagName('body')[0];
      if (this.themeColor)
        body.classList.add(this.themeColor);
    }
  }

  themeSwitcher() {
    const body = document.getElementsByTagName('body')[0];
    if (this.themeColor)
      body.classList.remove(this.themeColor);
    (this.themeColor == 'light-theme') ? this.themeColor = 'dark-theme' : this.themeColor = 'light-theme';
    body.classList.add(this.themeColor);
    localStorage.setItem('pxTheme', this.themeColor);
  }

}
