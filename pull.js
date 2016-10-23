
var process = require('process')
var path = require('path')
var exec = require('child_process').exec

var srcFolder = path.join(__dirname, 'src')
var configTsFile = path.join(srcFolder, 'configs', '_config.ts')

exec('tsc ' + configTsFile + ' --outDir .', function (error, stdout, stderr) {
  if (error) {
    console.log('_config.ts compilation failed')
  }
  var config = require(path.join(__dirname, '_config.js'))

  if (config.CONSTANTS.googleAppScript.project_name) {
    console.info('#####BEGIN SCRIPT#######')
    // Folders
    var projectFolder = path.join(__dirname, config.CONSTANTS.googleAppScript.project_name)
    var jsInProjectFolder = path.join(projectFolder, '*.js')
    // Commands
    var removeProjectFolder = 'rm -rf ' + projectFolder
    var cloneGaps = 'gaps clone ' + config.CONSTANTS.googleAppScript.id_gapps
    var removeAllJsInProjectFolder = 'rm -rf ' + jsInProjectFolder
    var removeConfig = 'rm ' + path.join(__dirname, '_config.js')
    // Move to project
    process.chdir(__dirname)
    // Remove old files
    exec(removeProjectFolder, function (error, stdout, stderr) {
      if (error) {
        console.error('remove files failed')
        return false
      }
      console.info('Clonning from gapps')
      // Get info from gaps
      exec(cloneGaps, function (error, stdout, stderr) {
        if (error) {
          console.error('gaps clone failed')
          return false
        }
        console.info(stdout)
        // Remove Config
        exec(removeConfig, function (error, stdout, stderr) {
          if (error) {
            console.error('remove _config.js failed')
            return false
          }
        })
        // Remove all js Files(keep manifest.json)
        exec(removeAllJsInProjectFolder, function (error, stdout, stderr) {
          if (error) {
            console.error('remove all js compiled failed')
            return false
          }
        })
      })
    })
  } else {
    console.error('Please add CONSTANTS.googleAppScript.project_name in _configs.coffee')
    return false
  }
})
