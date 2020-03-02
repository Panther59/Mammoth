﻿import { environment } from '../environments/environment';
export { }

declare global {
    interface Array<T> {
        groupBy(prop: string): Array<Group<T>>;
        max(prop: string): number;
        min(prop: string): number;
    }

    interface String {
        isNullOrEmpty(): boolean;
    }

    interface Date {
        between(startDate: Date, endDate: Date): boolean;
        monthDays(): number;
        addDays(days: number): Date;
    }
}

export function logErrorData(e: any) {
    console.error(e);
}

export function logMessageData(m: any) {
    if (!environment.production) {
        console.log(m);
    }
}

export class Group<T> {

    key: any;
    value: T[];
    constructor(_key: any, _value: T[]) {
        this.key = _key;
        this.value = _value;
    }
}

Array.prototype.min = function (prop: string) {
    return this.reduce(function (groups, item) {
        const val = item[prop]
        groups = groups || 0;
        return groups < val ? groups : val;
    }, {})
}


Array.prototype.max = function (prop: string) {
    return this.reduce(function (groups, item) {
        const val = item[prop]
        groups = groups || 0;
        return groups > val ? groups : val;
    }, {})
}

let groupByFunction = function <T>(array: Array<T>, prop: string): Array<Group<T>> {
    let result = array.reduce(function (groups, item) {
        const val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
    let output = Object.keys(result).map(key => new Group<T>(key, result[key]));

    return output;
}

Array.prototype.groupBy = function (prop: string) { return groupByFunction(this, prop) };

String.prototype.isNullOrEmpty = function () {
    if (this && this.trim() != '') {
        return false;
    }
    else {
        return true;
    }
};

Date.prototype.between = function (startDate: Date, endDate: Date) {
    if (this && this > startDate && this < endDate) {
        return true;
    }
    else {
        return false;
    }
};

Date.prototype.monthDays = function () {
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate();
}

Date.prototype.addDays = function (days: number) {
    let newDate = new Date(this);
    newDate.setDate(this.getDate() + days);

    return newDate;
}