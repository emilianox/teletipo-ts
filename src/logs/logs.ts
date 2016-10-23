interface TelegramFrom {
  message: Message;
}

let spreadsheetLog = new SpreadsheetUtils(CONSTANTS.logSheet, "all");

const logs = {
  logEvent: function(objToSend): void {
    let time = Utilities.formatDate(new Date(), "GMT-03", "dd/MM/yyyy HH:mm");
    let toLog = getGlobalVariable("toLog");
    let info: TelegramFrom = JSON.parse(toLog);
    let name = info.message.from.first_name !== null ? info.message.from.first_name : "unknow";
    let last_name = info.message.from.first_name !== null ? info.message.from.last_name : "unknow";
    let command = info.message.text;
    let rowsToLog = [time, name, last_name, command, toLog, JSON.stringify(objToSend)];
    spreadsheetLog.saveLog(rowsToLog);
  }
};
