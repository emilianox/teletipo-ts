/**
 * Validate authorization for user
 * @param  {Object}         command Commands.
 * @param  {Array.<string>} command.roles Roles autorized for that command
 * @param  {Object}         command.fn Function to execute.
 * @param  {Object}         params Params.
 * @param  {string}         params.user Username.
 * @return {string} Result of execution.[description]
*/
var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

function auth(command, params): string {
  let commandRoles = command.roles;
  if (commandRoles === null) {
    return command.fn(params);
  } else {
    if (USERS[params.user] === null) {
      return "Unauthorized command.";
    } else {
      let userRoles = USERS[params.user].roles;
      if (userRoles[0] === "sudo") {
        return command.fn(params);
      } else {
        for (let _i = 0, _len = userRoles.length; _i < _len; _i++) {
          let userRol = userRoles[_i];
          if (__indexOf.call(commandRoles, userRol) >= 0) {
            return command.fn(params);
          }
        }
        return "Unauthorized command.";
      }
    }
  }
}


/**
 * Execute a command
 * @param  {Object}         command Commands.
 * @param  {Array.<string>} command.roles Roles autorized for that command
 * @param  {Object}         command.fn Function to execute.
 * @param  {Object}         params Params.
 * @param  {string}         params.user Username.
 * @return {string} Result of execution.[description]
*/
function execCommand(command: string, params?: {}): string {
  if (params === null) {
    params = false;
  }
  if (COMMANDLIST[command] !== null) {
    return auth(COMMANDLIST[command], params);
  } else {
    return "Command not found:  " + command;
  }
}
