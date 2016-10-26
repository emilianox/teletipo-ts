/// <reference path="../definitions/node-telegram-bot-api.d.ts"/>

interface AppScriptConfigsSeccion {
  user: {
    nextFn: Function,
  };
}

interface Utils {
  spreadsheet: {};
}


let utils: Utils = { spreadsheet: {} };


interface PostData {
  postData: {
  contents: string;
  }
}

/**
 * doPost is the method for recieving info for external sources
 * in this proyect is used for receive the telegram data and process
 * @param  {object} e google apps events
 * @return {null}
*/
function doPost(e: PostData): void {
  let rawData: string;
  if (typeof e !== "undefined") {
    rawData = e.postData.contents;
  }
  if (e.postData.contents === null) {
    rawData = JSON.stringify({
      message: {
        text: "Warning - Not Send by telegram",
        chat: {
          id: CONSTANTS.supervacaID
        }
      }
    });
  }
  setGlobalVariable("toLog", rawData);
  return processPost(rawData);
}

/**
 * Identify is next function and execute action
*/
function processPost(rawData: string): void {
  let parsedData: Update = JSON.parse(rawData);
  let user = parsedData.message.from.username;
  // if (getGlobalVariable("session").[user]?.nextFn?) {
  let session: AppScriptConfigsSeccion = JSON.parse(getGlobalVariable("session"));

  if (session && session.user && session.user.nextFn) {
    return session.user.nextFn(parsedData);
  } else {
    let command = parsedData.message.text;
    let chat_id = parsedData.message.chat.id;
    if (command === CONSTANTS.commmandInfo) {
      return telegramPost(chat_id, rawData);
    } else {
      return telegramPost(chat_id, execCommand(command, {
        user: user,
        allData: parsedData
      }));
    }
  }
}

function getKeyboard(): string[][] {
  if (getGlobalVariable("keyboard") !== null || getGlobalVariable("keyboard") !== "null") {
    setGlobalVariable("keyboard", CONSTANTS.keyboard);
    return CONSTANTS.keyboard;
  } else {
    return JSON.parse(getGlobalVariable("keyboard"));
  }
}


/**
 * send data to telegram
 * @param  {number} chat_id           chat telegram id to send
 * @param  {string} text              text to send
 * @param  {[type]} otheroptions={} [description]
 * @return {[type]}                   [description]
*/
function telegramPost(chat_id: number, text: string, otheroptions?: {}): any {
  if (text === null) {
    return false;
  }
  let keyboard = getKeyboard();
  let objToSend = {
    text: text,
    chat_id: chat_id,
    parse_mode: "Markdown",
    reply_markup: {
      keyboard: keyboard,
      resize_keyboard: false,
      muteHttpExceptions: false
    } as IReplyKeyboardMarkup
  } as ISendMessageOptions;
  if (otheroptions !== null) {
    mergeObj(otheroptions, objToSend);
  }
  objToSend.reply_markup = JSON.stringify(objToSend.reply_markup);
  let options = {
    method: "POST",
    payload: objToSend
  };
  let url = "https://api.telegram.org/bot" + CONSTANTS.secret + "/sendMessage";
  Logger.log("objToSend");
  UrlFetchApp.fetch(url, options);
  return logs.logEvent(objToSend);
}

function setTelegram(): void {
  let secretTelegram = CONSTANTS.secret;
  let driveUrl = (ScriptApp.getService() as any).getUrl();
  let URL = "https://api.telegram.org/bot" + secretTelegram + "/setWebhook?url=" + driveUrl;
  let response = UrlFetchApp.fetch(URL);
  let result = JSON.parse(response.getContentText());
  if (result.ok && result.result) {
    Logger.log("Telegram URL Updated");
  }
  response.getContentText();
}
