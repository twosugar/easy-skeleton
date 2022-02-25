#!/usr/bin/env node

const pkg = require('../package.json');
const program = require('commander');
const colors = require('colors');
const path = require('path');
const { getSkeleton } = require('../dist')

program
    .version(pkg.version, '-v, --version')
    .option('-c, --config <s>', 'set configuration file')
    .action(function() {
      console.log(colors.brightGreen(`
       _____       ___   _____  __    __       _____   _   _    _____   _       _____   _____   _____   __   _  
      | ____|     /   | /  ___/ \\ \\  / /      /  ___/ | | / /  | ____| | |     | ____| |_   _| /  _  \\ |  \\ | | 
      | |__      / /| | | |___   \\ \\/ /       | |___  | |/ /   | |__   | |     | |__     | |   | | | | |   \\| | 
      |  __|    / /-| | \\___  \\   \\  /        \\___  \\ | |\\ \\   |  __|  | |     |  __|    | |   | | | | | |\\   | 
      | |___   / /--| |  ___| |   / /          ___| | | | \\ \\  | |___  | |___  | |___    | |   | |_| | | | \\  | 
      |_____| /_/   |_| /_____/  /_/          /_____/ |_|  \\_\\ |_____| |_____| |_____|   |_|   \\_____/ |_|  \\_| 
      `))
  })
  .parse(process.argv);

let options = {}
if (program._optionValues && program._optionValues.config) { //配置文件存在
    const configFile = path.resolve(program._optionValues.config)
    console.log(colors.green('options config path: ', configFile))
    options = Object.assign({}, require(configFile));
    options.path = configFile
}

getSkeleton(options)