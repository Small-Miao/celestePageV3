const moment = require('moment')
function printLog(Level,module,api,apiModule,msg){
    if(api == undefined)
        console.log(`[${Level}][${module}][${moment().format()}] => ${msg}`);
    else
        console.log(`[${Level}][${module}][${apiModule} ${api}][${moment().format()}] => ${msg}`);

}

function info(module,api,apiModule,msg){
  printLog('INFO',module,api,apiModule,msg)
}

function debug(module,api,apiModule,msg){
  printLog('DEBUG',module,api,apiModule,msg)
}

function error(module,api,apiModule,msg){
  printLog('ERROR',module,api,apiModule,msg)
}

module.exports = {printLog,info,debug,error};
