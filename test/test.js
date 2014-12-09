// For command line test
if (typeof module !== "undefined" && module.exports) {
  /*jshint -W079 */
  var chai  = require("chai");
  var expect  = chai.expect;
  var chaiAsPromised = require("chai-as-promised");
  chai.use(chaiAsPromised);

  var Promise = require("es6-promise").Promise;

  var JSONKey   = require("../index.js");
  /*jshint +W079 */
}

(function () {
  "use strict";

  function setUp(ctx){
    ctx.parser = new JSONKey();
    ctx.promiseForKeyA             = ctx.parser.key("a");
    ctx.promiseForKeyA2            = ctx.parser.key("a");
    ctx.promiseForKeyB             = ctx.parser.key("b");
    ctx.promiseForKeyObj           = ctx.parser.key("obj");
    ctx.promiseForKeyObjDot        = ctx.parser.key("obj.key1");
    ctx.promiseForKeyObjDotDot     = ctx.parser.key("obj.key1.key11");
    ctx.promiseForKeyObjDotIndex   = ctx.parser.key("obj.key2[2]");
    ctx.promiseForKeyArr           = ctx.parser.key("arr");
    ctx.promiseForKeyArrIndex      = ctx.parser.key("arr[0]");
    ctx.promiseForKeyArrIndexIndex = ctx.parser.key("arr[0][1]");
    ctx.promiseForKeyArrIndexDot   = ctx.parser.key("arr[1].key1");
    ctx.promiseForIndex            = ctx.parser.key("[0]");
    ctx.promiseForIndexIndex       = ctx.parser.key("[0][1]");
    ctx.promiseForIndexDot         = ctx.parser.key("[1].key1");
  }



  describe("Test for JSONKEY:", function(){
    this.timeout(3000);

    describe("`key` function provide promise:", function(){

      context("Given jsonString is invalid, Nothing will be happen: ", function(){
        before(function(done){
          setUp(this);
          this.targetJSON = "INVALID{}";
          this.parser.parse(this.targetJSON);
          done();
        });

        it("promiseForKeyA will be rejected", function(){
          return expect(this.promiseForKeyA).to.be.eventually.rejected;
        });
        it("promiseForKeyB will be rejected", function(){
          return expect(this.promiseForKeyB).to.be.eventually.rejected;
        });
        it("promiseForKeyObj will be rejected", function(){
          return expect(this.promiseForKeyObj).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDot will be rejected", function(){
          return expect(this.promiseForKeyObjDot).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDotDot will be rejected", function(){
          return expect(this.promiseForKeyObjDotDot).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDotIndex will be rejected", function(){
          return expect(this.promiseForKeyObjDotIndex).to.be.eventually.rejected;
        });
        it("promiseForKeyArr will be rejected", function(){
          return expect(this.promiseForKeyArr).to.be.eventually.rejected;
        });
        it("promiseForKeyArrIndex will be rejected", function(){
          return expect(this.promiseForKeyArrIndex).to.be.eventually.rejected;
        });
        it("promiseForKeyArrIndexIndex will be rejected", function(){
          return expect(this.promiseForKeyArrIndexIndex).to.be.eventually.rejected;
        });
        it("promiseForKeyArrIndexDot will be rejected", function(){
          return expect(this.promiseForKeyArrIndexDot).to.be.eventually.rejected;
        });
        it("promiseForIndex will be rejected", function(){
          return expect(this.promiseForIndex).to.be.eventually.rejected;
        });
        it("promiseForIndexIndex will be rejected", function(){
          return expect(this.promiseForIndexIndex).to.be.eventually.rejected;
        });
        it("promiseForIndexDot will be rejected", function(){
          return expect(this.promiseForIndexDot).to.be.eventually.rejected;
        });
      });

      context("Given jsonString is valid as " +
        JSON.stringify({
          a:1,
          b:true,
          c:"this is c",
        }) +" ", function(){

        before(function(){
          setUp(this);
          this.targetJSON = JSON.stringify({
            a:1,
            b:true,
            c:"this is c"
          });
          this.parser.parse(this.targetJSON);
        });
        it("promiseForKeyA will be resolved with value corresoinding to key 'a'", function(){
          return expect(this.promiseForKeyA).to.eventually.be.equal(1);
        });
        it("promiseForKeyBwill be resolved with value corresoinding to key 'b'", function(){
          return expect(this.promiseForKeyB).to.eventually.be.equal(true);
        });
        it("promiseForKeyObj will be rejected", function(){
          return expect(this.promiseForKeyObj).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDot will be rejected", function(){
          return expect(this.promiseForKeyObjDot).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDotDot will be rejected", function(){
          return expect(this.promiseForKeyObjDotDot).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDotIndex will be rejected", function(){
          return expect(this.promiseForKeyObjDotIndex).to.be.eventually.rejected;
        });
        it("promiseForKeyArr will be rejected", function(){
          return expect(this.promiseForKeyArr).to.be.eventually.rejected;
        });
        it("promiseForKeyArrIndex will be rejected", function(){
          return expect(this.promiseForKeyArrIndex).to.be.eventually.rejected;
        });
        it("promiseForKeyArrIndexIndex will be rejected", function(){
          return expect(this.promiseForKeyArrIndexIndex).to.be.eventually.rejected;
        });
        it("promiseForKeyArrIndexDot will be rejected", function(){
          return expect(this.promiseForKeyArrIndexDot).to.be.eventually.rejected;
        });
        it("promiseForIndex will be rejected", function(){
          return expect(this.promiseForIndex).to.be.eventually.rejected;
        });
        it("promiseForIndexIndex will be rejected", function(){
          return expect(this.promiseForIndexIndex).to.be.eventually.rejected;
        });
        it("promiseForIndexDot will be rejected", function(){
          return expect(this.promiseForIndexDot).to.be.eventually.rejected;
        });
      });

      context("Given jsonString is valid as `" +
        JSON.stringify({
          obj:{
            key1:{
              key11:"obj-key1-key11",
              key12:"obj-key1-key12",
            },
            key2:["obj-key2-0","obj-key2-1","obj-key2-2"]
          }
        }) +"`: ", function(){

        before(function(){
          setUp(this);
          this.targetJSON = JSON.stringify({
            obj:{
              key1:{
                key11:"obj-key1-key11",
                key12:"obj-key1-key12",
              },
              key2:["obj-key2-0","obj-key2-1","obj-key2-2"]
            }
          });
          this.parser.parse(this.targetJSON);
        });
        it("promiseForKeyA will be rejected", function(){
          return expect(this.promiseForKeyA).to.be.eventually.rejected;
        });
        it("promiseForKeyB will be rejected", function(){
          return expect(this.promiseForKeyB).to.be.eventually.rejected;
        });
        it("promiseForKeyObj will be resolved with value corresoinding to key 'obj'", function(){
          return expect(this.promiseForKeyObj).to.eventually
          .deep.equal({
            key1:{
              key11:"obj-key1-key11",
              key12:"obj-key1-key12",
            },
            key2:["obj-key2-0","obj-key2-1","obj-key2-2"]
          });
        });
        it("promiseForKeyObjDot will be resolved with value corresoinding to key 'obj.key1'", function(){
          return expect(this.promiseForKeyObjDot).to.eventually
                  .deep.equal({
                    key11:"obj-key1-key11",
                    key12:"obj-key1-key12"
                  });
        });
        it("promiseForKeyObjDotDot will be resolved with value corresoinding to key 'obj.key1.key11' ", function(){
          return expect(this.promiseForKeyObjDotDot).to.be.eventually.equal("obj-key1-key11");
        });
        it("promiseForKeyObjDotIndex will be resolved with value corresoinding to key 'obj.key2[2]'  ", function(){
          return expect(this.promiseForKeyObjDotIndex).to.be.eventually.equal("obj-key2-2");
        });
        it("promiseForKeyArr will be rejected", function(){
          return expect(this.promiseForKeyArr).to.be.eventually.rejected;
        });
        it("promiseForKeyArrIndex will be rejected", function(){
          return expect(this.promiseForKeyArrIndex).to.be.eventually.rejected;
        });
        it("promiseForKeyArrIndexIndex will be rejected", function(){
          return expect(this.promiseForKeyArrIndexIndex).to.be.eventually.rejected;
        });
        it("promiseForKeyArrIndexDot will be rejected", function(){
          return expect(this.promiseForKeyArrIndexDot).to.be.eventually.rejected;
        });
        it("promiseForIndex will be rejected", function(){
          return expect(this.promiseForIndex).to.be.eventually.rejected;
        });
        it("promiseForIndexIndex will be rejected", function(){
          return expect(this.promiseForIndexIndex).to.be.eventually.rejected;
        });
        it("promiseForIndexDot will be rejected", function(){
          return expect(this.promiseForIndexDot).to.be.eventually.rejected;
        });
      });

      context("Given jsonString is valid as `" +
      JSON.stringify({
        arr:[
          ["arr-0-0","arr-0-1","arr-0-2"],
          {key1:"arr-1-key1",key2:"arr-1-key2"}
        ]
      }) +"`: ", function(){

        before(function(){
          setUp(this);
          this.targetJSON = JSON.stringify({
            arr:[
              ["arr-0-0","arr-0-1","arr-0-2"],
              {key1:"arr-1-key1",key2:"arr-1-key2"}
            ]
          });
          this.parser.parse(this.targetJSON);
        });
        it("promiseForKeyA will be rejected", function(){
          return expect(this.promiseForKeyA).to.be.eventually.rejected;
        });
        it("promiseForKeyB will be rejected", function(){
          return expect(this.promiseForKeyB).to.be.eventually.rejected;
        });
        it("promiseForKeyObj will be rejected", function(){
          return expect(this.promiseForKeyObj).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDot will be rejected", function(){
          return expect(this.promiseForKeyObjDot).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDotDot will be rejected", function(){
          return expect(this.promiseForKeyObjDotDot).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDotIndex will be rejected", function(){
          return expect(this.promiseForKeyObjDotIndex).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDotDot will be rejected", function(){
          return expect(this.promiseForKeyObjDotDot).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDotIndex will be rejected", function(){
          return expect(this.promiseForKeyObjDotIndex).to.be.eventually.rejected;
        });
        it("promiseForKeyArr will be resolved with value corresoinding to key 'arr", function(){
          return expect(this.promiseForKeyArr).to.be.eventually.deep.equal(
            [
              ["arr-0-0","arr-0-1","arr-0-2"],
              {key1:"arr-1-key1",key2:"arr-1-key2"}
            ]
          );
        });
        it("promiseForKeyArrIndex will be resolved with value corresoinding to key 'arr[0]", function(){
          return expect(this.promiseForKeyArrIndex).to.be.eventually.deep.equal(
            ["arr-0-0","arr-0-1","arr-0-2"]
          );
        });
        it("promiseForKeyArrIndexIndex will be resolved with value corresoinding to key 'arr[0][1]", function(){
          return expect(this.promiseForKeyArrIndexIndex).to.be.eventually.equal("arr-0-1");
        });
        it("promiseForKeyArrIndexDot will be resolved with value corresoinding to key 'arr[1].key1", function(){
          return expect(this.promiseForKeyArrIndexDot).to.be.eventually.equal("arr-1-key1");
        });
        it("promiseForIndex will be rejected", function(){
          return expect(this.promiseForIndex).to.be.eventually.rejected;
        });
        it("promiseForIndexIndex will be rejected", function(){
          return expect(this.promiseForIndexIndex).to.be.eventually.rejected;
        });
        it("promiseForIndexDot will be rejected", function(){
          return expect(this.promiseForIndexDot).to.be.eventually.rejected;
        });
      });

      context("Given jsonString is valid as `" +
        JSON.stringify([
          ["arr-0-0","arr-0-1","arr-0-2"],
          {key1:"arr-1-key1",key2:"arr-1-key2"}
        ]) +"`: ", function(){

        before(function(){
          setUp(this);
          this.targetJSON = JSON.stringify([
            ["arr-0-0","arr-0-1","arr-0-2"],
            {key1:"arr-1-key1",key2:"arr-1-key2"}
          ]);
          this.parser.parse(this.targetJSON);
        });
        it("promiseForKeyA will be rejected", function(){
          return expect(this.promiseForKeyA).to.be.eventually.rejected;
        });
        it("promiseForKeyB will be rejected", function(){
          return expect(this.promiseForKeyB).to.be.eventually.rejected;
        });
        it("promiseForKeyObj will be rejected", function(){
          return expect(this.promiseForKeyObj).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDot will be rejected", function(){
          return expect(this.promiseForKeyObjDot).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDotDot will be rejected", function(){
          return expect(this.promiseForKeyObjDotDot).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDotIndex will be rejected", function(){
          return expect(this.promiseForKeyObjDotIndex).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDotDot will be rejected", function(){
          return expect(this.promiseForKeyObjDotDot).to.be.eventually.rejected;
        });
        it("promiseForKeyObjDotIndex will be rejected", function(){
          return expect(this.promiseForKeyObjDotIndex).to.be.eventually.rejected;
        });
        it("promiseForKeyArr will be rejected", function(){
          return expect(this.promiseForKeyArr).to.be.eventually.deep.rejected;
        });
        it("promiseForKeyArrIndex will be rejected", function(){
          return expect(this.promiseForKeyArrIndex).to.be.eventually.deep.rejected;
        });
        it("promiseForKeyArrIndexIndex will be rejected", function(){
          return expect(this.promiseForKeyArrIndexIndex).to.be.eventually.rejected;
        });
        it("promiseForKeyArrIndexDot will be rejected", function(){
          return expect(this.promiseForKeyArrIndexDot).to.be.eventually.rejected;
        });
        it("promiseForIndex will be resolved with value corresoinding to key '[0]", function(){
          return expect(this.promiseForIndex).to.be.eventually.deep.equal(
            ["arr-0-0","arr-0-1","arr-0-2"]
          );
        });
        it("promiseForIndexIndex will be resolved with value corresoinding to key 'arr[0][1]", function(){
          return expect(this.promiseForIndexIndex).to.be.eventually.equal("arr-0-1");
        });
        it("promiseForIndexDot will be resolved with value corresoinding to key 'arr[1].key1", function(){
          return expect(this.promiseForIndexDot).to.be.eventually.equal("arr-1-key1");
        });
      });
    });
    describe("`as` function receive predicator and filter value:", function(){
      before(function(){
        this.targetJSON = JSON.stringify({
          a:"aaa",
          b:"bbb",
          n:100
        });
        this.parser = new JSONKey();
        this.promiseAAsAAA = this.parser.key("a").as("aaa");
        this.promiseBAsCCC = this.parser.key("b").as("ccc");
        this.promiseNAsGT99 = this.parser.key("n").as(function(v){return v > 99;});
        this.promiseNAsGT100 = this.parser.key("n").as(function(v){return v > 100;});
        this.parser.parse(this.targetJSON);
      });
      it("promiseAAsAAA will be resolved with value corresoinding to key 'a'", function(){
        return expect(this.promiseAAsAAA).to.eventually.be.equal("aaa");
      });
      it("promiseBAsCCC will not be resolved", function(){
        return expect(this.promiseBAsCCC).to.eventually.be.rejected;
      });
      it("promiseNAsGT99 will be resolved with value corresoinding to key 'n'", function(){
        return expect(this.promiseNAsGT99).to.eventually.be.equal(100);
      });
      it("promiseNAsGT100 will not be resolved", function(){
        return expect(this.promiseNAsGT100).to.eventually.be.rejected;
      });
    });
  });
})();
