class SpreadsheetUtils {
  namespreadsheet: string;
  namesheet: string;
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
  sheet: GoogleAppsScript.Spreadsheet.Sheet
  constructor(namespreadsheet: string, namesheet: string) {
    this.namespreadsheet = namespreadsheet;
    this.namesheet = namesheet;
    this.spreadsheet = this.getOrCreateByName();
    this.sheet = this.spreadsheet.getSheetByName(namesheet);
    SpreadsheetApp.setActiveSpreadsheet(this.spreadsheet);
    SpreadsheetApp.setActiveSheet(this.sheet);
  }

  getOrCreateByName(): GoogleAppsScript.Spreadsheet.Spreadsheet {
    let files = DriveApp.getFilesByName(this.namespreadsheet);
    while (files.hasNext()) {
      let file = files.next();
      if (file.getName() === this.namespreadsheet) {
        return SpreadsheetApp.open(file);
      }
    }
    let spreadsheet = SpreadsheetApp.create(this.namespreadsheet);
    spreadsheet.insertSheet(this.namesheet, 1);
    return spreadsheet
  }

  getFirstEmptyRowByColumnArray(range: GoogleAppsScript.Spreadsheet.Range): number {
    let values = range.getValues();
    let ct = 0;
    while (values[ct] && values[ct][0] !== "") {
      ct++;
    }
    return ct + 1;
  }

  saveLog(data): void {
    this.sheet.appendRow(data);
  }
}
