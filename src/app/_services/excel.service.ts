import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = 'xlsx';

@Injectable()
export class ExcelService {

    constructor() { }

    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'Report': worksheet }, SheetNames: ['Report'] };
        this.exportWorkbookAsExcelFile(workbook, excelFileName);
    }

    public exportWorkbookAsExcelFile(workbook: XLSX.WorkBook, excelFileName: string): void {
        const wbout: any = XLSX.write(workbook, { bookType: EXCEL_EXTENSION, bookSST: true, type: 'binary', cellStyles: true });
        let buf = new ArrayBuffer(wbout.length);
        let view = new Uint8Array(buf);
        for (var i = 0; i != wbout.length; ++i) view[i] = wbout.charCodeAt(i) & 0xFF;

        this.saveAsExcelFile(buf, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(new Blob([buffer], { type: EXCEL_TYPE }), fileName + "." + EXCEL_EXTENSION);
    }

}