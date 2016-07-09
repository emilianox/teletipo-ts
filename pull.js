var config, exec, print, process;
config = require('./_js/configs/_config.js');
process = require('process');
exec = require('child_process').exec;
print = function(error, stdout, stderr) {
  return console.log(stdout);
};

console.log("#####BEGIN SCRIPT#######");

process.chdir(__dirname);

if (config.CONSTANTS.googleAppScript.project_name) {
  exec("rm -rf " + __dirname + "/" + config.CONSTANTS.googleAppScript.project_name, function(error, stdout, stderr) {
    console.log("clonning from gapps");
    return exec("gaps clone " + config.CONSTANTS.googleAppScript.id_gapps, function(error, stdout, stderr) {
      console.log(stdout);
      console.log("Compiling...");
      return exec("rm -rf " + __dirname + "/" + config.CONSTANTS.googleAppScript.project_name + "/*.js", function(error, stdout, stderr) {});
    });
  });
} else {
  console.log("Please add CONSTANTS.googleAppScript.project_name in _configs.coffee");
}
