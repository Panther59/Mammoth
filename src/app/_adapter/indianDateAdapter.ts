import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class IndianDateAdapter extends NativeDateAdapter {

  getFirstDayOfWeek(): number {
    return getLocaleFirstDayOfWeek(this.locale);
  }
}
