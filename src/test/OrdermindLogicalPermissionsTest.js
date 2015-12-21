var OrdermindLogicalPermissions = require('../lib/OrdermindLogicalPermissions.js');
var assert = require('assert');
describe('OrdermindLogicalPermissions', function() {
  describe('creation', function () {
    it('should create a OrdermindLogicalPermissions instance', function () {
      var lp = new OrdermindLogicalPermissions();
      assert(lp instanceof OrdermindLogicalPermissions);
    });
  });

  /*-----------OrdermindLogicalPermissions::addType()-------------*/
  describe('testAddTypeParamNameWrongType', function() {
    it('should call OrdermindLogicalPermissions::addType() with the wrong data type for the "name" parameter and catch an exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.addType(0, function(){});
      });
    });
  });
}); 
