/*!
* JSONKey
* https://github.com/georgeosddev/jsonkey
*
* Copyright (c) 2013 Takeharu.Oshida
* Licensed under the MIT license.
*/
(function(){
  "use strict";
  var util   = require("util"),
  events = require("events")
  ;

  var P = typeof Promise !== "undefined" ? Promise : require("es6-promise").Promise;

  var JSONKEY_TIMEOUT = 100,
  JSONKEY_TIMEOUT_KEY = "[jsonkey_timeout]"
  ;

  var JSONKey = function(timeout){
    this.timeout = timeout || JSONKEY_TIMEOUT;
    this._maxListeners = 0;
  };
  util.inherits(JSONKey, events.EventEmitter);

  function isObject(obj) {
    return obj instanceof Object && Object.getPrototypeOf(obj) === Object.prototype;
  }

  function isFunction(f) {
    return typeof f === "function";
  }

  function nextTick(f){
    setTimeout(f,0);
  }

  JSONKey.prototype.parse = function(jsonString){
    var self = this;
    setTimeout(function(){
      self.emit(JSONKEY_TIMEOUT_KEY);
    }, self.timeout);
    try {
      var obj = JSON.parse(jsonString);
      if (util.isArray(obj)){
        this.crawlArray(obj, "");
      } else {
        this.crawl(obj, "");
      }
    } catch (err) {
    /*noop*/}
  };

  JSONKey.prototype.key = function(k){
    var self = this;
    if (typeof k !== "string") throw new Error("key must be String!");
    var p = new P(function(resolve, reject){
      self.on(k, function(v){
        resolve(v);
      });
      self.on(JSONKEY_TIMEOUT_KEY, function(){
        reject(null);
      });
    });
    p.as = function(predicate) {
      return p.then(function(v){
        if (isFunction(predicate)){
          if (predicate(v)) {
             return P.resolve(v);
          } else {
            return P.reject(null);
          }
        } else {
          if (v === predicate){
            return P.resolve(v);
          } else {
            return P.reject(null);
          }
        }
      }, function(){
        return P.reject(null);
      });
    };
    return p;
  };

  JSONKey.prototype.crawl = function(target, prefix){
    var self = this;
    nextTick(function(){
      Object.keys(target).forEach(function(key) {
        var val = target[key];
        self.emit(prefix+key, val);
        if (util.isArray(val)){
          self.crawlArray(val, prefix+key);
        } else if (isObject(val)) {
          self.crawl(val, prefix+key+".");
        }
      });
    });
  };

  JSONKey.prototype.crawlArray = function(target, prefix){
    var self = this;
    nextTick(function(){
      target.forEach(function(val, idx){
        self.emit(prefix+"["+idx+"]", val);
        if (util.isArray(val)){
          self.crawlArray(val, prefix+"["+idx+"]");
        } else if (isObject(val)) {
          self.crawl(val, prefix+"["+idx+"].");
        }
      });
    });
  };
  module.exports = JSONKey;
})();