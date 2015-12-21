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

  describe('testAddTypeParamNameMissing', function() {
    it('should call OrdermindLogicalPermissions::addType() with no "name" parameter and catch an exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.addType();
      });
    });
  });
  describe('testAddTypeParamNameWrongType', function() {
    it('should call OrdermindLogicalPermissions::addType() with the wrong data type for the "name" parameter and catch an exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.addType(0, function(){});
      });
    });
  });
  describe('testAddTypeParamNameEmpty', function() {
    it('should call OrdermindLogicalPermissions::addType() with an empty string for "name" parameter and catch an exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.addType('', function(){});
      });
    });
  });
  describe('testAddTypeParamCallbackMissing', function() {
    it('should call OrdermindLogicalPermissions::addType() with no "callback" parameter and catch an exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.addType('test');
      });
    });
  });
  describe('testAddTypeParamCallbackWrongType', function() {
    it('should call OrdermindLogicalPermissions::addType() with the wrong data type for the "name" parameter and catch an exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.addType('test', 0);
      });
    });
  });
  describe('testAddType', function() {
    it('should call OrdermindLogicalPermissions::addType() and assert that the type was indeed added', function() {
      var lp = new OrdermindLogicalPermissions();
      lp.addType('test', function(){});
      assert(lp.typeExists('test'));
    });
  });
  
  /*-------------LogicalPermissions::removeType()--------------*/
  
  describe('testRemoveTypeParamNameMissing', function() {
    it('should call OrdermindLogicalPermissions::removeType() with no "name" parameter and catch an exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.removeType();
      });
    });
  });
  describe('testRemoveTypeParamNameWrongType', function() {
    it('should call OrdermindLogicalPermissions::removeType() with the wrong data type for the "name" parameter and catch an exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.removeType(0);
      });
    });
  });
  describe('testRemoveTypeParamNameEmpty', function() {
    it('should call OrdermindLogicalPermissions::removeType() with an empty string for "name" parameter and catch an exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.removeType('');
      });
    });
  });
  describe('testRemoveTypeParamNameDoesntExist', function() {
    it('should call OrdermindLogicalPermissions::removeType() with a "name" parameter that is not registered and catch an exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.removeType('test');
      });
    });
  });
  describe('testRemoveType', function() {
    it('should call OrdermindLogicalPermissions::removeType() and successfully remove a registered permission type', function() {
      var lp = new OrdermindLogicalPermissions();
      lp.addType('test', function(){});
      lp.removeType('test');
      assert(!lp.typeExists('test'));
    });
  });

}); 
