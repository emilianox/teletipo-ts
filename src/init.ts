interface TelegramMessage {
  message: {
    text: string,
    chat: {
      id: number,
      username: string,
    }
  }
}

interface AppScriptConfigsSeccion {
  user: {
    nextFn: Function,
  }
}

interface utils {
  spreadsheet: {}
}


let utils = { spreadsheet: {} };

/**
 * doPost is the method for recieving info for external sources
 * in this proyect is used for receive the telegram data and process
 * @param  {object} e google apps events
 * @return {null}
*/
function doPost(e): void {
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
  setGlobalVariable('toLog', rawData);
  return processPost(rawData);
}

/**
 * identify is next function and exectute action
 * @param  {[type]} rawData    [description]
 * @return {[type]}            [description]
*/
function processPost(rawData: string): void {
  let parsedData: TelegramMessage = JSON.parse(rawData);
  let user = parsedData.message.chat.username;
  //if (getGlobalVariable("session").[user]?.nextFn?) {
  let session: AppScriptConfigsSeccion = getGlobalVariable("session");

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

function getKeyboard(): {} {
  if (getGlobalVariable('keyboard') !== null) {
    setGlobalVariable('keyboard', CONSTANTS.keyboard);
    return CONSTANTS.keyboard;
  } else {
    return getGlobalVariable('keyboard');
  }
}


/**
 * send data to telegram
 * @param  {number} chat_id           chat telegram id to send
 * @param  {string} text              text to send
 * @param  {[type]} otheroptions=null [description]
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
      reply_keyboard: keyboard,
      resize_keyboard: false
    } as any
  };
  if (otheroptions !== null) {
    mergeObj(otheroptions, objToSend);
  }
  objToSend.reply_markup = JSON.stringify(objToSend.reply_markup);
  let options = {
    method: "POST",
    payload: objToSend
  };
  let url = "https://api.telegram.org/bot" + CONSTANTS.secret + "/sendMessage";
  UrlFetchApp.fetch(url, options);
  return logs.logEvent(objToSend);
}

function setTelegram(): void {
  let secretTelegram = CONSTANTS.secret;
  let driveUrl = (ScriptApp.getService() as any).getUrl();
  let URL = 'https://api.telegram.org/bot' + secretTelegram + '/setWebhook?url=' + driveUrl;
  let response = UrlFetchApp.fetch(URL);
  let result = JSON.parse(response.getContentText());
  if (result.ok && result.result) {
    Logger.log('Telegram URL Updated');
  }
  response.getContentText();
}