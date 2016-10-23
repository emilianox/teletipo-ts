
function testDoPostCommand_(command: string, user?): void {
  let e, tosend;
  if (!user) {
    user = CONSTANTS.testUser;
  }
  e = {
    postData: {}
  };
  tosend = {
    update_id: 685769691,
    message: {
      message_id: 321,
      from: {
        id: CONSTANTS.testUser.id,
        first_name: "test",
        last_name: "ing",
        username: user.username
      },
      chat: {
        id: user.id,
        first_name: "testing",
        last_name: "in gas",
        username: user.username,
        type: "private"
      },
      date: 1448655088,
      text: command,
      parse_mode: "Markdown"
    }
  };
  e.postData.contents = JSON.stringify(tosend);
  return doPost(e);
};

function testSendCommand_(command) {
  let allData, otheroptions;
  setGlobalVariable("session", {});
  allData = {
    message: {
      chat: {
        id: CONSTANTS.testUser.id,
        username: CONSTANTS.testUser.username
      }
    }
  };
  otheroptions = {
    user: CONSTANTS.testUser.username,
    allData: allData
  };
  return telegramPost(CONSTANTS.testUser.id, execCommand(command, otheroptions));
};
