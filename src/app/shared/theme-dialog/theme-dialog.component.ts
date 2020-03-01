import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/_models/theme';

@Component({
  selector: 'app-theme-dialog',
  templateUrl: './theme-dialog.component.html',
  styleUrls: ['./theme-dialog.component.scss']
})
export class ThemeDialogComponent implements OnInit {

  themes: Array<Theme> = [];
  selectedTheme: string;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ThemeDialogComponent>) {
    this.loadData();
  }

  async loadData() {
    this.themes = await this.getThemes().toPromise();
  }

  getThemes(): Observable<Array<Theme>> {
    return this.http.get<Array<Theme>>('assets/themes.json');
  }

  getThemeClassForCard(input: Theme) {
    let themes = 'themeCard ';
    if (input && input.isDark) {
      themes = themes + 'dark';
    } else {
      themes = themes + 'light';
    }
    return themes;
  }

  getThemeClassForButton(input: string) {
    let themes = 'themeColorButton ';
    themes = themes + input;
    return themes;
  }

  ngOnInit() {
  }

  apply(input: Theme) {
    this.selectedTheme = input.styleName;
    this.closePopup();
  }

  closePopup() {
    this.dialogRef.close(this.selectedTheme);
  }

}
