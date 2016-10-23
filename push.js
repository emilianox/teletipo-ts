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
    // Commands
    var compileTs = 'tsc --sourceMap --sourceRoot ' + srcFolder + ' --outDir ' + projectFolder
    var pushGaps = 'gaps push'
    var removeConfig = 'rm ' + path.join(__dirname, '_config.js')
    // Compile ts files
    exec(compileTs, function (error, stdout, stderr) {
      if (error) {
        console.error('compile failed')
        console.error(error, stdout, stderr)
        return false
      }
      console.info('Pushing to gapps')
      // Move to project
      process.chdir(projectFolder)
      // Push script to gaps
      exec(pushGaps, function (error, stdout, stderr) {
        if (error) {
          console.error('gaps push failed')
          console.error(error, stdout, stderr)
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
      })
    })
  } else {
    console.error('Please add CONSTANTS.googleAppScript.project_name in _configs.coffee')
    return false
  }
})
