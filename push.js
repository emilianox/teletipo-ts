var config, exec, print, process;

config = require('./_js/configs/_config.js');

process = require('process');

exec = require('child_process').exec;

print = function(error, stdout, stderr) {
  return console.log(stdout);
};

console.log("#####BEGIN SCRIPT#######");

process.chdir(__dirname + "/" + config.CONSTANTS.googleAppScript.project_name);

exec("tsc --sourceRoot ../src --outDir .", function(error, stdout, stderr) {
  return exec("gaps push", print);
});
