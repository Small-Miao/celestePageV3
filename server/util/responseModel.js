const SUCCESSCODE  = 200;
let ERRORCODE = 201;

/**
 * 成功的返回
 * @param obj
 * @param message
 * @returns {{code: number, message: string}}
 */
let success = function(obj,message){
  if(!message){
    message = "SUCCESS";
  }
  let result = {
    code:SUCCESSCODE,
    message:message,
  };
  if(obj){
    result = {
      code:SUCCESSCODE,
      message:message,
      data:obj,
    }
  }
  return result;
}
/**
 * 错误的返回
 * @param obj
 * @param message
 * @returns {{code: number, message: string}}
 */
let error = function(obj,message){
  if(!message){
    message = "ERROR";
  }
  let result = {
    code:ERRORCODE,
    message:message,
  };
  if(obj){
    result = {
      code:ERRORCODE,
      message:message,
      data:obj,
    }
  }
  return result;
}
/**
 * 暴漏出这个方法
 * @type {function(): string}
 */
module.exports = {success,error}
