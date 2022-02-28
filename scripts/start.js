#!/usr/bin/env node

const pkg = require('../package.json');
const program = require('commander');
const colors = require('colors');
const path = require('path');
const updateNotifier = require('update-notifier');
const { getSkeleton } = require('../dist');

program
  .version(pkg.version, '-v, --version')
  .option('-c, --config <s>', 'set configuration file')
  .action(function() {
    console.log(
      colors.brightGreen(`
       _____       ___   _____  __    __       _____   _   _    _____   _       _____   _____   _____   __   _  
      | ____|     /   | /  ___/ \\ \\  / /      /  ___/ | | / /  | ____| | |     | ____| |_   _| /  _  \\ |  \\ | | 
      | |__      / /| | | |___   \\ \\/ /       | |___  | |/ /   | |__   | |     | |__     | |   | | | | |   \\| | 
      |  __|    / /-| | \\___  \\   \\  /        \\___  \\ | |\\ \\   |  __|  | |     |  __|    | |   | | | | | |\\   | 
      | |___   / /--| |  ___| |   / /          ___| | | | \\ \\  | |___  | |___  | |___    | |   | |_| | | | \\  | 
      |_____| /_/   |_| /_____/  /_/          /_____/ |_|  \\_\\ |_____| |_____| |_____|   |_|   \\_____/ |_|  \\_| 
      `)
    );
  })
  .parse(process.argv);

//获取最新版本的提醒
const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000,
});
if (notifier.update) {
  console.log(
    colors.bold(
      `Current version: ${pkg.version}, Update available: ${notifier.update.latest}`
    )
  );
}

//获取文件配置
let options = {};
if (program._optionValues && program._optionValues.config) {
  //配置文件存在
  const configFile = path.resolve(program._optionValues.config);
  options = Object.assign({}, require(configFile));
  options.path = configFile;
}

getSkeleton(options);
