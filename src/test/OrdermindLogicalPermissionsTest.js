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
    it('should call OrdermindLogicalPermissions::addType() with no "name" parameter and catch a MissingArgumentException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.addType();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testAddTypeParamNameWrongType', function() {
    it('should call OrdermindLogicalPermissions::addType() with the wrong data type for the "name" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.addType(0, function(){});
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testAddTypeParamNameEmpty', function() {
    it('should call OrdermindLogicalPermissions::addType() with an empty string for "name" parameter and catch an InvalidArgumentValueException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.addType('', function(){});
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testAddTypeParamCallbackMissing', function() {
    it('should call OrdermindLogicalPermissions::addType() with no "callback" parameter and catch a MissingArgumentException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.addType('test');
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testAddTypeParamCallbackWrongType', function() {
    it('should call OrdermindLogicalPermissions::addType() with the wrong data type for the "name" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.addType('test', 0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testAddType', function() {
    it('should call OrdermindLogicalPermissions::addType() and assert that the type was indeed added', function() {
      var lp = new OrdermindLogicalPermissions();
      lp.addType('test', function(){});
      assert(lp.typeExists('test'));
    });
  });
  
  /*-------------OrdermindLogicalPermissions::removeType()--------------*/
  
  describe('testRemoveTypeParamNameMissing', function() {
    it('should call OrdermindLogicalPermissions::removeType() with no "name" parameter and catch a MissingArgumentException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.removeType();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testRemoveTypeParamNameWrongType', function() {
    it('should call OrdermindLogicalPermissions::removeType() with the wrong data type for the "name" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.removeType(0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testRemoveTypeParamNameEmpty', function() {
    it('should call OrdermindLogicalPermissions::removeType() with an empty string for "name" parameter and catch an InvalidArgumentValueException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.removeType('');
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testRemoveTypeParamNameDoesntExist', function() {
    it('should call OrdermindLogicalPermissions::removeType() with a "name" parameter that is not registered and catch a PermissionTypeNotRegisteredException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.removeType('test');
      }, function(err) {return err.name === 'PermissionTypeNotRegisteredException';});
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
  
  /*-------------OrdermindLogicalPermissions::typeExists()--------------*/
  
  describe('testTypeExistsParamNameMissing', function() {
    it('should call OrdermindLogicalPermissions::typeExists() with no "name" parameter and catch a MissingArgumentException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.typeExists();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testTypeExistsParamNameWrongType', function() {
    it('should call OrdermindLogicalPermissions::typeExists() with the wrong data type for the "name" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.typeExists(0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testTypeExistsParamNameEmpty', function() {
    it('should call OrdermindLogicalPermissions::typeExists() with an empty string for "name" parameter and catch an InvalidArgumentValueException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.typeExists('');
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testTypeExists', function() {
    it('should call OrdermindLogicalPermissions::typeExists() and assert that a created type exists', function() {
      var lp = new OrdermindLogicalPermissions();
      assert(!lp.typeExists('test'));
      lp.addType('test', function(){});
      assert(lp.typeExists('test'));
    });
  });
  
  /*-------------OrdermindLogicalPermissions::getTypeCallback()--------------*/
  
  describe('testGetTypeCallbackParamNameMissing', function() {
    it('should call OrdermindLogicalPermissions::getTypeCallback() with no "name" parameter and catch a MissingArgumentException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.getTypeCallback();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testGetTypeCallbackParamNameWrongType', function() {
    it('should call OrdermindLogicalPermissions::getTypeCallback() with the wrong data type for the "name" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.getTypeCallback(0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testGetTypeCallbackParamNameEmpty', function() {
    it('should call OrdermindLogicalPermissions::getTypeCallback() with an empty string for "name" parameter and catch an InvalidArgumentValueException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.getTypeCallback('');
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testGetTypeCallbackParamNameDoesntExist', function() {
    it('should call OrdermindLogicalPermissions::getTypeCallback() with a "name" parameter that is not registered and catch a PermissionTypeNotRegisteredException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.getTypeCallback('test');
      }, function(err) {return err.name === 'PermissionTypeNotRegisteredException';});
    });
  });
  describe('testGetTypeCallback', function() {
    it('should call OrdermindLogicalPermissions::getTypeCallback() and successfully get a registered permission type callback', function() {
      var lp = new OrdermindLogicalPermissions();
      var callback = function(){};
      lp.addType('test', callback);
      assert.strictEqual(lp.getTypeCallback('test'), callback);
    });
  });
  
  /*-------------OrdermindLogicalPermissions::getTypes()--------------*/
  
  describe('testGetTypes', function() {
    it('should call OrdermindLogicalPermissions::getTypes() and successfully get all registered types', function() {
      var lp = new OrdermindLogicalPermissions();
      var callback = function(){};
      lp.addType('test', callback);
      var types = lp.getTypes();
      for(var name in types) {
        assert.equal(name, 'test');
        assert.strictEqual(types[name], callback);
      }
      types.test2 = function(){};
      assert(!lp.getTypes().hasOwnProperty('test2'));
    });
  });
  
  /*-------------OrdermindLogicalPermissions::setTypes()--------------*/

  describe('testSetTypesParamTypesMissing', function() {
    it('should call OrdermindLogicalPermissions::setTypes() with no "types" parameter and catch a MissingArgumentException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.setTypes();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testSetTypesParamTypesWrongType', function() {
    it('should call OrdermindLogicalPermissions::setTypes() with the wrong data type for the "types" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.setTypes(0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testSetTypesParamTypesNameWrongType', function() {
    it('should call OrdermindLogicalPermissions::setTypes() with the wrong data type for a type name key and catch an InvalidArgumentValueException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        var types = {0: function(){}};
        lp.setTypes(types);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testSetTypesParamTypesNameEmpty', function() {
    it('should call OrdermindLogicalPermissions::setTypes() with an empty type name key and catch an InvalidArgumentValueException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        var types = {'': function(){}};
        lp.setTypes(types);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testSetTypesParamTypesCallbackWrongType', function() {
    it('should call OrdermindLogicalPermissions::setTypes() with the wrong data type for a type callback and catch an InvalidArgumentValueException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        var types = {'test': 'hej'};
        lp.setTypes(types);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testSetTypes', function() {
    it('should call OrdermindLogicalPermissions::setTypes() and successfully overwrite all types', function() {
      var lp = new OrdermindLogicalPermissions();
      var callback = function(){};
      var types = {'test': callback};
      lp.setTypes(types);
      var existing_types = lp.getTypes();
      for(var name in existing_types) {
        assert.equal(name, 'test');
        assert.strictEqual(types[name], callback);
      }
    });
  });

  /*-------------OrdermindLogicalPermissions::getBypassCallback()--------------*/
  
  describe('testGetBypassCallback', function() {
    it('should call OrdermindLogicalPermissions::getBypassCallback() and check that the callback is null', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.equal(lp.getBypassCallback(), null);
    });
  });
  
  /*-------------OrdermindLogicalPermissions::setBypassCallback()--------------*/
  
  describe('testSetBypassCallbackParamCallbackMissing', function() {
    it('should call OrdermindLogicalPermissions::setBypassCallback() with no "callback" parameter and catch a MissingArgumentException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.setBypassCallback();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testSetBypassCallbackParamCallbackWrongType', function() {
    it('should call OrdermindLogicalPermissions::setBypassCallback() with the wrong data type for the "callback" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new OrdermindLogicalPermissions();
      assert.throws(function() {
        lp.setBypassCallback(0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testSetBypassCallback', function() {
    it('should call OrdermindLogicalPermissions::setBypassCallback() and successfully register a bypass callback', function() {
      var lp = new OrdermindLogicalPermissions();
      var callback = function(){};
      lp.setBypassCallback(callback);
      assert.strictEqual(lp.getBypassCallback(), callback);
    });
  });
 
  /*-------------OrdermindLogicalPermissions::checkAccess()--------------*/
  
  

}); 
