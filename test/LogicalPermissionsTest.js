var LogicalPermissions = require('../lib/LogicalPermissions.js');
var assert = require('assert');
describe('LogicalPermissions', function() {

  describe('creation', function () {
    it('should create a LogicalPermissions instance', function () {
      var lp = new LogicalPermissions();
      assert(lp instanceof LogicalPermissions);
    });
  });

  /*-----------LogicalPermissions::addType()-------------*/

  describe('testAddTypeParamNameMissing', function() {
    it('should call LogicalPermissions::addType() with no "name" parameter and catch a MissingArgumentException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.addType();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testAddTypeParamNameWrongType', function() {
    it('should call LogicalPermissions::addType() with the wrong data type for the "name" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.addType(0, function(){});
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testAddTypeParamNameEmpty', function() {
    it('should call LogicalPermissions::addType() with an empty string for "name" parameter and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.addType('', function(){});
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testAddTypeParamNameIsCoreKey', function() {
    it('should call LogicalPermissions::addType() with an illegal "name" parameter and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.addType('AND', function(){});
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testAddTypeParamNameExists', function() {
    it('should call LogicalPermissions::addType() with a "name" parameter that already exists and catch a PermissionTypeAlreadyExistsException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.addType('test', function(){});
        lp.addType('test', function(){});
      }, function(err) {return err.name === 'PermissionTypeAlreadyExistsException';});
    });
  });
  describe('testAddTypeParamCallbackMissing', function() {
    it('should call LogicalPermissions::addType() with no "callback" parameter and catch a MissingArgumentException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.addType('test');
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testAddTypeParamCallbackWrongType', function() {
    it('should call LogicalPermissions::addType() with the wrong data type for the "callback" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.addType('test', 0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testAddType', function() {
    it('should call LogicalPermissions::addType() and assert that the type was indeed added', function() {
      var lp = new LogicalPermissions();
      lp.addType('test', function(){});
      assert(lp.typeExists('test'));
    });
  });

  /*-------------LogicalPermissions::removeType()--------------*/

  describe('testRemoveTypeParamNameMissing', function() {
    it('should call LogicalPermissions::removeType() with no "name" parameter and catch a MissingArgumentException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.removeType();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testRemoveTypeParamNameWrongType', function() {
    it('should call LogicalPermissions::removeType() with the wrong data type for the "name" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.removeType(0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testRemoveTypeParamNameEmpty', function() {
    it('should call LogicalPermissions::removeType() with an empty string for "name" parameter and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.removeType('');
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testRemoveTypeParamNameDoesntExist', function() {
    it('should call LogicalPermissions::removeType() with a "name" parameter that is not registered and catch a PermissionTypeNotRegisteredException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.removeType('test');
      }, function(err) {return err.name === 'PermissionTypeNotRegisteredException';});
    });
  });
  describe('testRemoveType', function() {
    it('should call LogicalPermissions::removeType() and successfully remove a registered permission type', function() {
      var lp = new LogicalPermissions();
      lp.addType('test', function(){});
      lp.removeType('test');
      assert(!lp.typeExists('test'));
    });
  });

  /*-------------LogicalPermissions::typeExists()--------------*/

  describe('testTypeExistsParamNameMissing', function() {
    it('should call LogicalPermissions::typeExists() with no "name" parameter and catch a MissingArgumentException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.typeExists();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testTypeExistsParamNameWrongType', function() {
    it('should call LogicalPermissions::typeExists() with the wrong data type for the "name" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.typeExists(0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testTypeExistsParamNameEmpty', function() {
    it('should call LogicalPermissions::typeExists() with an empty string for "name" parameter and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.typeExists('');
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testTypeExists', function() {
    it('should call LogicalPermissions::typeExists() and assert that a created type exists', function() {
      var lp = new LogicalPermissions();
      assert(!lp.typeExists('test'));
      lp.addType('test', function(){});
      assert(lp.typeExists('test'));
    });
  });

  /*-------------LogicalPermissions::getTypeCallback()--------------*/

  describe('testGetTypeCallbackParamNameMissing', function() {
    it('should call LogicalPermissions::getTypeCallback() with no "name" parameter and catch a MissingArgumentException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.getTypeCallback();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testGetTypeCallbackParamNameWrongType', function() {
    it('should call LogicalPermissions::getTypeCallback() with the wrong data type for the "name" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.getTypeCallback(0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testGetTypeCallbackParamNameEmpty', function() {
    it('should call LogicalPermissions::getTypeCallback() with an empty string for "name" parameter and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.getTypeCallback('');
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testGetTypeCallbackParamNameDoesntExist', function() {
    it('should call LogicalPermissions::getTypeCallback() with a "name" parameter that is not registered and catch a PermissionTypeNotRegisteredException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.getTypeCallback('test');
      }, function(err) {return err.name === 'PermissionTypeNotRegisteredException';});
    });
  });
  describe('testGetTypeCallback', function() {
    it('should call LogicalPermissions::getTypeCallback() and successfully get a registered permission type callback', function() {
      var lp = new LogicalPermissions();
      var callback = function(){};
      lp.addType('test', callback);
      assert.strictEqual(lp.getTypeCallback('test'), callback);
    });
  });

  /*-------------LogicalPermissions::setTypeCallback()--------------*/

  describe('testSetTypeCallbackParamNameMissing', function() {
    it('should call LogicalPermissions::setTypeCallback() with no "name" parameter and catch a MissingArgumentException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.setTypeCallback();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testSetTypeCallbackParamNameWrongType', function() {
    it('should call LogicalPermissions::setTypeCallback() with the wrong data type for the "name" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.setTypeCallback(0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testSetTypeCallbackParamNameEmpty', function() {
    it('should call LogicalPermissions::setTypeCallback() with an empty string for "name" parameter and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.setTypeCallback('');
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testSetTypeCallbackParamNameDoesntExist', function() {
    it('should call LogicalPermissions::setTypeCallback() with a "name" parameter that is not registered and catch a PermissionTypeNotRegisteredException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.setTypeCallback('test');
      }, function(err) {return err.name === 'PermissionTypeNotRegisteredException';});
    });
  });
  describe('testSetTypeCallbackParamCallbackMissing', function() {
    it('should call LogicalPermissions::setTypeCallback() with no "callback" parameter and catch a MissingArgumentException exception', function() {
      var lp = new LogicalPermissions();
      lp.addType('test', function(){});
      assert.throws(function() {
        lp.setTypeCallback('test');
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testSetTypeCallbackParamCallbackWrongType', function() {
    it('should call LogicalPermissions::setTypeCallback() with the wrong data type for the "callback" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new LogicalPermissions();
      lp.addType('test', function(){});
      assert.throws(function() {
        lp.setTypeCallback('test', 0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testSetTypeCallback', function() {
    it('should call LogicalPermissions::setTypeCallback() and successfully set a permission type callback', function() {
      var lp = new LogicalPermissions();
      lp.addType('test', function(){});
      var callback = function(){};
      assert.notStrictEqual(lp.getTypeCallback('test'), callback);
      lp.setTypeCallback('test', callback);
      assert.strictEqual(lp.getTypeCallback('test'), callback);
    });
  });

  /*-------------LogicalPermissions::getTypes()--------------*/

  describe('testGetTypes', function() {
    it('should call LogicalPermissions::getTypes() and successfully get all registered types', function() {
      var lp = new LogicalPermissions();
      assert.deepEqual(lp.getTypes(), {});
      var callback = function(){};
      lp.addType('test', callback);
      var types = lp.getTypes();
      assert.deepEqual(types, {test: callback});
      assert.strictEqual(types.test, callback);
      types.test2 = function(){};
      assert(!lp.getTypes().hasOwnProperty('test2'));
    });
  });

  /*-------------LogicalPermissions::setTypes()--------------*/

  describe('testSetTypesParamTypesMissing', function() {
    it('should call LogicalPermissions::setTypes() with no "types" parameter and catch a MissingArgumentException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.setTypes();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testSetTypesParamTypesWrongType', function() {
    it('should call LogicalPermissions::setTypes() with the wrong data type for the "types" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.setTypes(0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testSetTypesParamTypesNameWrongType', function() {
    it('should call LogicalPermissions::setTypes() with the wrong data type for a type name key and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        var types = {0: function(){}};
        lp.setTypes(types);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testSetTypesParamTypesNameEmpty', function() {
    it('should call LogicalPermissions::setTypes() with an empty type name key and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        var types = {'': function(){}};
        lp.setTypes(types);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testSetTypesParamTypesNameIsCoreKey', function() {
    it('should call LogicalPermissions::setTypes() with an illegal name key and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        var types = {'AND': function(){}};
        lp.setTypes(types);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testSetTypesParamTypesCallbackWrongType', function() {
    it('should call LogicalPermissions::setTypes() with the wrong data type for a type callback and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        var types = {'test': 'hej'};
        lp.setTypes(types);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testSetTypes', function() {
    it('should call LogicalPermissions::setTypes() and successfully overwrite all types', function() {
      var lp = new LogicalPermissions();
      var callback = function(){};
      var types = {'test': callback};
      lp.setTypes(types);
      var existing_types = lp.getTypes();
      assert.deepEqual(existing_types, {test: callback});
      assert.strictEqual(existing_types.test, callback);
      types.test2 = function(){};
      assert(!lp.getTypes().hasOwnProperty('test2'));
    });
  });

  /*-------------LogicalPermissions::getBypassCallback()--------------*/

  describe('testGetBypassCallback', function() {
    it('should call LogicalPermissions::getBypassCallback() and check that the callback is null', function() {
      var lp = new LogicalPermissions();
      assert.equal(lp.getBypassCallback(), null);
    });
  });

  /*-------------LogicalPermissions::setBypassCallback()--------------*/

  describe('testSetBypassCallbackParamCallbackMissing', function() {
    it('should call LogicalPermissions::setBypassCallback() with no "callback" parameter and catch a MissingArgumentException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.setBypassCallback();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testSetBypassCallbackParamCallbackWrongType', function() {
    it('should call LogicalPermissions::setBypassCallback() with the wrong data type for the "callback" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.setBypassCallback(0);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testSetBypassCallback', function() {
    it('should call LogicalPermissions::setBypassCallback() and successfully register a bypass callback', function() {
      var lp = new LogicalPermissions();
      var callback = function(){};
      lp.setBypassCallback(callback);
      assert.strictEqual(lp.getBypassCallback(), callback);
    });
  });

  /*------------LogicalPermissions::getValidPermissionKeys()---------------*/

  describe('testGetValidPermissionKeys', function() {
    var lp = new LogicalPermissions();
    assert.deepEqual(lp.getValidPermissionKeys(), ['NO_BYPASS', 'AND', 'NAND', 'OR', 'NOR', 'XOR', 'NOT', 'TRUE', 'FALSE']);
    var types = {
      flag: function(flag, context) {
        var access = false;
        if(flag === 'testflag') {
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('testflag')) {
            access = !!context.user.testflag;
          }
        }
        return access;
      },
      role: function(role, context) {
        var access = false;
        if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
          access = context.user.roles.indexOf(role) > -1;
        }
        return access;
      },
      misc: function(item, context) {
        var access = false;
        if(context.hasOwnProperty('user') && context.user.hasOwnProperty(item)) {
          access = !!context.user[item];
        }
        return access;
      }
    };
    lp.setTypes(types);
    assert.deepEqual(lp.getValidPermissionKeys(), ['NO_BYPASS', 'AND', 'NAND', 'OR', 'NOR', 'XOR', 'NOT', 'TRUE', 'FALSE', 'flag', 'role', 'misc']);
  });

  /*-------------LogicalPermissions::checkAccess()--------------*/

  describe('testCheckAccessParamPermissionsMissing', function() {
    it('should call LogicalPermissions::checkAccess() with no "permissions" parameter and catch a MissingArgumentException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.checkAccess();
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testCheckAccessParamPermissionsWrongType', function() {
    it('should call LogicalPermissions::checkAccess() with the wrong data type for the "permissions" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.checkAccess(50);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testCheckAccessParamPermissionsWrongPermissionType', function() {
    it('should call LogicalPermissions::checkAccess() with an invalid permission value and catch an InvalidArgumentTypeException exception', function() {
      var lp = new LogicalPermissions();
      lp.addType('flag', function(){});
      var permissions = {
        flag: 50
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testCheckAccessParamPermissionsNestedTypes', function() {
    it('should call LogicalPermissions::checkAccess() with nested permission types and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      lp.addType('flag', function(){});

      //Directly nested
      var permissions = {
        flag: {
          flag: 'testflag'
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});

      //Indirectly nested
      var permissions = {
        flag: {
          OR: {
            flag: 'testflag'
          }
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testCheckAccessParamPermissionsUnregisteredType', function() {
    it('should call LogicalPermissions::checkAccess() with an unregistered permission type and catch a PermissionTypeNotRegisteredException exception', function() {
      var lp = new LogicalPermissions();
      var permissions = {
        flag: 'testflag'
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'PermissionTypeNotRegisteredException';});
    });
  });
  describe('testCheckAccessParamPermissionsArrayValue', function() {
    it('should call LogicalPermissions::checkAccess() with an array containing only values and catch a MissingArgumentException exception', function() {
      var lp = new LogicalPermissions();
      var permissions = [
        'test1',
        'test2'
      ];
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'MissingArgumentException';});
    });
  });
  describe('testCheckAccessParamContextWrongType', function() {
    it('should call LogicalPermissions::checkAccess() with the wrong data type for the "context" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.checkAccess(false, []);
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testCheckAccessParamAllowBypassWrongType', function() {
    it('should call LogicalPermissions::checkAccess() with the wrong data type for the "allow_bypass" parameter and catch an InvalidArgumentTypeException exception', function() {
      var lp = new LogicalPermissions();
      assert.throws(function() {
        lp.checkAccess(false, {}, 'test');
      }, function(err) {return err.name === 'InvalidArgumentTypeException';});
    });
  });
  describe('testCheckAccessEmptyObjectAllow', function() {
    it('should call LogicalPermissions::checkAccess() with an empty permissions object and allow access', function() {
      var lp = new LogicalPermissions();
      assert(lp.checkAccess({}));
    });
  });
  describe('testCheckAccessBypassAccessCheckContextPassing', function() {
    it('should call LogicalPermissions::checkAccess() and check that the context parameter is passed to the bypass access callback', function() {
      var lp = new LogicalPermissions();
      var user = {
        id: 1
      };
      var bypass_callback = function(context) {
        assert(context.hasOwnProperty('user'));
        assert.equal(context.user, user);
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      lp.checkAccess(false, {user: user});
    });
  });
  describe('testCheckAccessBypassAccessWrongReturnType', function() {
    it('should call LogicalPermissions::checkAccess() and return an invalid data type from the bypass access callback and catch an InvalidCallbackReturnTypeException exception', function() {
      var lp = new LogicalPermissions();
      var bypass_callback = function(context) {
        return 1;
      };
      lp.setBypassCallback(bypass_callback);
      assert.throws(function() {
        lp.checkAccess(false);
      }, function(err) {return err.name === 'InvalidCallbackReturnTypeException';});
    });
  });
  describe('testCheckAccessBypassAccessIllegalDescendant', function() {
    it('should call LogicalPermissions::checkAccess() with no_bypass in a nether part of a permissions tree and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      var permissions = {
        'OR': {
          'no_bypass': true
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testCheckAccessBypassAccessAllow', function() {
    it('should call LogicalPermissions::checkAccess() and allow access due to bypassing access', function() {
      var lp = new LogicalPermissions();
      var bypass_callback = function(context) {
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      assert(lp.checkAccess(false));
    });
  });
  describe('testCheckAccessBypassAccessDeny', function() {
    it('should call LogicalPermissions::checkAccess() and deny access due to no bypassing access and no regular access', function() {
      var lp = new LogicalPermissions();
      var bypass_callback = function(context) {
        return false;
      };
      lp.setBypassCallback(bypass_callback);
      assert(!lp.checkAccess(false));
    });
  });
  describe('testCheckAccessBypassAccessDeny2', function() {
    it('should call LogicalPermissions::checkAccess() and deny access due to overriding allow_bypass parameter', function() {
      var lp = new LogicalPermissions();
      var bypass_callback = function(context) {
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      assert(!lp.checkAccess(false, {}, false));
    });
  });
  describe('testCheckAccessNoBypassWrongType', function() {
    it('should call LogicalPermissions::checkAccess() with an invalid no_bypass value type and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      var bypass_callback = function(context) {
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      assert.throws(function() {
        lp.checkAccess({no_bypass: 'test'}, {});
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testCheckAccessNoBypassEmptyPermissionsAllow', function() {
    it('should call LogicalPermissions::checkAccess() with only a no_bypass key and allow access', function() {
      var lp = new LogicalPermissions();
      assert(lp.checkAccess({no_bypass: true}));
    });
  });
  describe('testCheckAccessNoBypassAccessBooleanAllow', function() {
    it('should call LogicalPermissions::checkAccess() with no_bypass set to false and allow access due to bypassing access', function() {
      var lp = new LogicalPermissions();
      var bypass_callback = function(context) {
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      var permissions = {
        no_bypass: false
      };
      assert(lp.checkAccess(permissions));
      //Test that permission object is not changed
      assert(permissions.hasOwnProperty('no_bypass'));
    });
  });
  describe('testCheckAccessNoBypassAccessBooleanDeny', function() {
    it('should call LogicalPermissions::checkAccess() with no_bypass set to true and deny access due to forbidden access bypass and no regular access', function() {
      var lp = new LogicalPermissions();
      var bypass_callback = function(context) {
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      assert(!lp.checkAccess({no_bypass: true, 0: false}, {}));
    });
  });
  describe('testCheckAccessNoBypassAccessStringAllow', function() {
    it('should call LogicalPermissions::checkAccess() with no_bypass set to string "False" and allow bypass access',
    function() {
      var lp = new LogicalPermissions();
      var bypass_callback = function(context) {
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      var permissions = {
        no_bypass: 'False'
      };
      assert(lp.checkAccess(permissions));
      //Test that permission object is not changed
      assert(permissions.hasOwnProperty('no_bypass'));
    });
  });

  describe('testCheckAccessNoBypassAccessStringDeny', function() {
    it('should call LogicalPermissions::checkAccess() with no_bypass set to string "True" and deny bypass access and regular access',
    function() {
      var lp = new LogicalPermissions();
      var bypass_callback = function(context) {
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      assert(!lp.checkAccess({no_bypass: 'True', 0: false}, {}));
    });
  });
  describe('testCheckAccessNoBypassAccessObjectAllow', function() {
    it('should call LogicalPermissions::checkAccess() with no_bypass set to an object and allow access due to bypassing access', function() {
      var lp = new LogicalPermissions();
      var types = {
        flag: function(flag, context) {
          var access = false;
          if(flag === 'never_bypass') {
            if(context.hasOwnProperty('user') && context.user.hasOwnProperty('never_bypass')) {
              access = !!context.user.never_bypass;
            }
          }
          return access;
        }
      };
      lp.setTypes(types);
      var bypass_callback = function(context) {
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      var permissions = {
        no_bypass: {
          flag: 'never_bypass'
        }
      };
      var user = {
        id: 1,
        never_bypass: false
      };
      assert(lp.checkAccess(permissions, {user: user}));
    });
  });
  describe('testCheckAccessNoBypassAccessObjectDeny', function() {
    it('should call LogicalPermissions::checkAccess() with no_bypass set to an object and deny access due to forbidden access bypass and no regular access', function() {
      var lp = new LogicalPermissions();
      var types = {
        flag: function(flag, context) {
          var access = false;
          if(flag === 'never_bypass') {
            if(context.hasOwnProperty('user') && context.user.hasOwnProperty('never_bypass')) {
              access = !!context.user.never_bypass;
            }
          }
          return access;
        }
      };
      lp.setTypes(types);
      var bypass_callback = function(context) {
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      var permissions = {
        no_bypass: {
          flag: 'never_bypass'
        },
        0: false
      };
      var user = {
        id: 1,
        never_bypass: true
      };
      assert(!lp.checkAccess(permissions, {user: user}));
    });
  });
  describe('testCheckAccessWrongPermissionCallbackReturnType', function() {
    it('should call LogicalPermissions::checkAccess() and return an invalid data type from the registered permission type callback and catch an InvalidCallbackReturnTypeException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        flag: function(flag, context) {
          var access = false;
          if(flag === 'testflag') {
            if(context.hasOwnProperty('user') && context.user.hasOwnProperty('testflag')) {
              access = !!context.user.testflag;
            }
          }
          return 0;
        }
      };
      lp.setTypes(types);
      var permissions = {
        no_bypass: {
          flag: 'never_bypass'
        },
        flag: 'testflag'
      };
      var user = {
        id: 1,
        testflag: true
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidCallbackReturnTypeException';});
    });
  });
  describe('testCheckAccessSingleItemAllow', function() {
    it('should call LogicalPermissions::checkAccess() with single flag and allow access', function() {
      var lp = new LogicalPermissions();
      var types = {
        flag: function(flag, context) {
          var access = false;
          if(flag === 'testflag') {
            if(context.hasOwnProperty('user') && context.user.hasOwnProperty('testflag')) {
              access = !!context.user.testflag;
            }
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        no_bypass: {
          flag: 'never_bypass'
        },
        flag: 'testflag'
      };
      var user = {
        id: 1,
        testflag: true
      };
      assert(lp.checkAccess(permissions, {user: user}));
    });
  });
  describe('testCheckAccessSingleItemDeny', function() {
    it('should call LogicalPermissions::checkAccess() with single flag and deny access', function() {
      var lp = new LogicalPermissions();
      var types = {
        flag: function(flag, context) {
          var access = false;
          if(flag === 'testflag') {
            if(context.hasOwnProperty('user') && context.user.hasOwnProperty('testflag')) {
              access = !!context.user.testflag;
            }
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        flag: 'testflag'
      };
      var user = {
        id: 1
      };
      assert(!lp.checkAccess(permissions, {user: user}));
    });
  });
  describe('testCheckAccessMultipleTypesShorthandOR', function() {
    it('should call LogicalPermissions::checkAccess() with multiple permission types (shorthand OR)', function() {
      var lp = new LogicalPermissions();
      var types = {
        flag: function(flag, context) {
          var access = false;
          if(flag === 'testflag') {
            if(context.hasOwnProperty('user') && context.user.hasOwnProperty('testflag')) {
              access = !!context.user.testflag;
            }
          }
          return access;
        },
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        },
        misc: function(item, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty(item)) {
            access = !!context.user[item];
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        no_bypass: {
          flag: 'never_bypass'
        },
        flag: 'testflag',
        role: 'admin',
        misc: 'test'
      };
      var user = {
        id: 1
      };
      //OR truth table
      //0 0 0
      assert(!lp.checkAccess(permissions, {user: user}));
      //0 0 1
      user.test = true;
      assert(lp.checkAccess(permissions, {user: user}));
      //0 1 0
      user.test = false;
      user.roles = ['admin'];
      assert(lp.checkAccess(permissions, {user: user}));
      //0 1 1
      user.test = true;
      assert(lp.checkAccess(permissions, {user: user}));
      //1 0 0
      user = {
        id: 1,
        testflag: true
      };
      assert(lp.checkAccess(permissions, {user: user}));
      //1 0 1
      user.test = true;
      assert(lp.checkAccess(permissions, {user: user}));
      //1 1 0
      user.test = false;
      user.roles = ['admin'];
      assert(lp.checkAccess(permissions, {user: user}));
      //1 1 1
      user.test = true;
      assert(lp.checkAccess(permissions, {user: user}));
    });
  });
  describe('testCheckAccessMultipleItemsShorthandOR', function() {
    it('should call LogicalPermissions::checkAccess() with multiple permission type items (shorthand OR)', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        role: ['admin', 'editor']
      };
      var user = {id: 1};
      //OR truth table
      //0 0
      assert(!lp.checkAccess(permissions, {user: user}));
      user.roles = [];
      assert(!lp.checkAccess(permissions, {user: user}));
      //0 1
      user.roles = ['editor'];
      assert(lp.checkAccess(permissions, {user: user}));
      //1 0
      user.roles = ['admin'];
      assert(lp.checkAccess(permissions, {user: user}));
      //1 1
      user.roles = ['editor', 'admin'];
      assert(lp.checkAccess(permissions, {user: user}));
    });
  });
  describe('testCheckAccessANDWrongValueType', function() {
    it('should call LogicalPermissions::checkAccess() with an illegal AND value type and catch an InvalidValueForLogicGateException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        role: {
          AND: 'admin'
        }
      };
      var user = {
        id: 1,
        roles: ['admin']
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});
    });
  });
  describe('testCheckAccessANDTooFewElements', function() {
    it('should call LogicalPermissions::checkAccess() with too few elements in AND value and catch an InvalidValueForLogicGateException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var user = {
        id: 1,
        roles: ['admin']
      };
      var permissions = {
        role: {
          AND: []
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});

      permissions = {
        role: {
          AND: {}
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});
    });
  });
  describe('testCheckAccessMultipleItemsAND', function() {
    it('should call LogicalPermissions::checkAccess() with multiple AND values', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var runTruthTable = function runTruthTable(permissions) {
        var user = {id: 1};
        //AND truth table
        //0 0 0
        assert(!lp.checkAccess(permissions, {user: user}));
        user.roles = [];
        assert(!lp.checkAccess(permissions, {user: user}));
        //0 0 1
        user.roles = ['writer'];
        assert(!lp.checkAccess(permissions, {user: user}));
        //0 1 0
        user.roles = ['editor'];
        assert(!lp.checkAccess(permissions, {user: user}));
        //0 1 1
        user.roles = ['editor', 'writer'];
        assert(!lp.checkAccess(permissions, {user: user}));
        //1 0 0
        user.roles = ['admin'];
        assert(!lp.checkAccess(permissions, {user: user}));
        //1 0 1
        user.roles = ['admin', 'writer'];
        assert(!lp.checkAccess(permissions, {user: user}));
        //1 1 0
        user.roles = ['admin', 'editor'];
        assert(!lp.checkAccess(permissions, {user: user}));
        //1 1 1
        user.roles = ['admin', 'editor', 'writer'];
        assert(lp.checkAccess(permissions, {user: user}));
      };

      //Test array values
      var permissions = {
        role: {
          AND: [
            'admin',
            'editor',
            'writer'
          ]
        }
      };
      runTruthTable(permissions);

      //Test object values
      permissions = {
        role: {
          AND: {
            0: 'admin',
            1: 'editor',
            2: 'writer'
          }
        }
      };
      runTruthTable(permissions);

      //Test array/object mixes
      permissions = {
        role: {
          AND: [
            ['admin'],
            {0: 'editor'},
            'writer'
          ]
        }
      };
      runTruthTable(permissions);
      permissions = {
        role: {
          AND: {
            0: ['admin'],
            1: {0: 'editor'},
            2: 'writer'
          }
        }
      };
      runTruthTable(permissions);
    });
  });
  describe('testCheckAccessNANDWrongValueType', function() {
    it('should call LogicalPermissions::checkAccess() with an illegal NAND value type and catch an InvalidValueForLogicGateException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        role: {
          NAND: 'admin'
        }
      };
      var user = {
        id: 1,
        roles: ['admin']
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});
    });
  });
  describe('testCheckAccessNANDTooFewElements', function() {
    it('should call LogicalPermissions::checkAccess() with too few elements in NAND value and catch an InvalidValueForLogicGateException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var user = {
        id: 1,
        roles: ['admin']
      };
      var permissions = {
        role: {
          NAND: []
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});

      permissions = {
        role: {
          NAND: {}
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});
    });
  });
  describe('testCheckAccessMultipleItemsNAND', function() {
    it('should call LogicalPermissions::checkAccess() with multiple NAND values', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var runTruthTable = function runTruthTable(permissions) {
        var user = {id: 1};
        //NAND truth table
        //0 0 0
        assert(lp.checkAccess(permissions, {user: user}));
        user.roles = [];
        assert(lp.checkAccess(permissions, {user: user}));
        //0 0 1
        user.roles = ['writer'];
        assert(lp.checkAccess(permissions, {user: user}));
        //0 1 0
        user.roles = ['editor'];
        assert(lp.checkAccess(permissions, {user: user}));
        //0 1 1
        user.roles = ['editor', 'writer'];
        assert(lp.checkAccess(permissions, {user: user}));
        //1 0 0
        user.roles = ['admin'];
        assert(lp.checkAccess(permissions, {user: user}));
        //1 0 1
        user.roles = ['admin', 'writer'];
        assert(lp.checkAccess(permissions, {user: user}));
        //1 1 0
        user.roles = ['admin', 'editor'];
        assert(lp.checkAccess(permissions, {user: user}));
        //1 1 1
        user.roles = ['admin', 'editor', 'writer'];
        assert(!lp.checkAccess(permissions, {user: user}));
      };

      //Test array values
      var permissions = {
        role: {
          NAND: [
            'admin',
            'editor',
            'writer'
          ]
        }
      };
      runTruthTable(permissions);

      //Test object values
      permissions = {
        role: {
          NAND: {
            0: 'admin',
            1: 'editor',
            2: 'writer'
          }
        }
      };
      runTruthTable(permissions);

      //Test array/object mixes
      permissions = {
        role: {
          NAND: [
            ['admin'],
            {0: 'editor'},
            'writer'
          ]
        }
      };
      runTruthTable(permissions);
      permissions = {
        role: {
          NAND: {
            0: ['admin'],
            1: {0: 'editor'},
            2: 'writer'
          }
        }
      };
      runTruthTable(permissions);
    });
  });
  describe('testCheckAccessORWrongValueType', function() {
    it('should call LogicalPermissions::checkAccess() with an illegal OR value type and catch an InvalidValueForLogicGateException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        role: {
          OR: 'admin'
        }
      };
      var user = {
        id: 1,
        roles: ['admin']
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});
    });
  });
  describe('testCheckAccessORTooFewElements', function() {
    it('should call LogicalPermissions::checkAccess() with too few elements in OR value and catch an InvalidValueForLogicGateException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var user = {
        id: 1,
        roles: ['admin']
      };
      var permissions = {
        role: {
          OR: []
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});

      permissions = {
        role: {
          OR: {}
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});
    });
  });
  describe('testCheckAccessMultipleItemsOR', function() {
    it('should call LogicalPermissions::checkAccess() with multiple OR values', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var runTruthTable = function runTruthTable(permissions) {
        var user = {id: 1};
        //OR truth table
        //0 0 0
        assert(!lp.checkAccess(permissions, {user: user}));
        user.roles = [];
        assert(!lp.checkAccess(permissions, {user: user}));
        //0 0 1
        user.roles = ['writer'];
        assert(lp.checkAccess(permissions, {user: user}));
        //0 1 0
        user.roles = ['editor'];
        assert(lp.checkAccess(permissions, {user: user}));
        //0 1 1
        user.roles = ['editor', 'writer'];
        assert(lp.checkAccess(permissions, {user: user}));
        //1 0 0
        user.roles = ['admin'];
        assert(lp.checkAccess(permissions, {user: user}));
        //1 0 1
        user.roles = ['admin', 'writer'];
        assert(lp.checkAccess(permissions, {user: user}));
        //1 1 0
        user.roles = ['admin', 'editor'];
        assert(lp.checkAccess(permissions, {user: user}));
        //1 1 1
        user.roles = ['admin', 'editor', 'writer'];
        assert(lp.checkAccess(permissions, {user: user}));
      };

      //Test array values
      var permissions = {
        role: {
          OR: [
            'admin',
            'editor',
            'writer'
          ]
        }
      };
      runTruthTable(permissions);

      //Test object values
      permissions = {
        role: {
          OR: {
            0: 'admin',
            1: 'editor',
            2: 'writer'
          }
        }
      };
      runTruthTable(permissions);

      //Test array/object mixes
      permissions = {
        role: {
          OR: [
            ['admin'],
            {0: 'editor'},
            'writer'
          ]
        }
      };
      runTruthTable(permissions);
      permissions = {
        role: {
          OR: {
            0: ['admin'],
            1: {0: 'editor'},
            2: 'writer'
          }
        }
      };
      runTruthTable(permissions);
    });
  });
  describe('testCheckAccessNORWrongValueType', function() {
    it('should call LogicalPermissions::checkAccess() with an illegal NOR value type and catch an InvalidValueForLogicGateException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        role: {
          NOR: 'admin'
        }
      };
      var user = {
        id: 1,
        roles: ['admin']
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});
    });
  });
  describe('testCheckAccessNORTooFewElements', function() {
    it('should call LogicalPermissions::checkAccess() with too few elements in NOR value and catch an InvalidValueForLogicGateException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var user = {
        id: 1,
        roles: ['admin']
      };
      var permissions = {
        role: {
          NOR: []
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});

      permissions = {
        role: {
          NOR: {}
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});
    });
  });
  describe('testCheckAccessMultipleItemsNOR', function() {
    it('should call LogicalPermissions::checkAccess() with multiple NOR values', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var runTruthTable = function runTruthTable(permissions) {
        var user = {id: 1};
        //OR truth table
        //0 0 0
        assert(lp.checkAccess(permissions, {user: user}));
        user.roles = [];
        assert(lp.checkAccess(permissions, {user: user}));
        //0 0 1
        user.roles = ['writer'];
        assert(!lp.checkAccess(permissions, {user: user}));
        //0 1 0
        user.roles = ['editor'];
        assert(!lp.checkAccess(permissions, {user: user}));
        //0 1 1
        user.roles = ['editor', 'writer'];
        assert(!lp.checkAccess(permissions, {user: user}));
        //1 0 0
        user.roles = ['admin'];
        assert(!lp.checkAccess(permissions, {user: user}));
        //1 0 1
        user.roles = ['admin', 'writer'];
        assert(!lp.checkAccess(permissions, {user: user}));
        //1 1 0
        user.roles = ['admin', 'editor'];
        assert(!lp.checkAccess(permissions, {user: user}));
        //1 1 1
        user.roles = ['admin', 'editor', 'writer'];
        assert(!lp.checkAccess(permissions, {user: user}));
      };

      //Test array values
      var permissions = {
        role: {
          NOR: [
            'admin',
            'editor',
            'writer'
          ]
        }
      };
      runTruthTable(permissions);

      //Test object values
      permissions = {
        role: {
          NOR: {
            0: 'admin',
            1: 'editor',
            2: 'writer'
          }
        }
      };
      runTruthTable(permissions);

      //Test array/object mixes
      permissions = {
        role: {
          NOR: [
            ['admin'],
            {0: 'editor'},
            'writer'
          ]
        }
      };
      runTruthTable(permissions);
      permissions = {
        role: {
          NOR: {
            0: ['admin'],
            1: {0: 'editor'},
            2: 'writer'
          }
        }
      };
      runTruthTable(permissions);
    });
  });
  describe('testCheckAccessXORWrongValueType', function() {
    it('should call LogicalPermissions::checkAccess() with an illegal XOR value type and catch an InvalidValueForLogicGateException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        role: {
          XOR: 'admin'
        }
      };
      var user = {
        id: 1,
        roles: ['admin']
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});
    });
  });
  describe('testCheckAccessXORTooFewElements', function() {
    it('should call LogicalPermissions::checkAccess() with too few elements in XOR value and catch an InvalidValueForLogicGateException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var user = {
        id: 1,
        roles: ['admin']
      };
      var permissions = {
        role: {
          XOR: ['admin']
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});

      permissions = {
        role: {
          XOR: {0: 'admin'}
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});
    });
  });
  describe('testCheckAccessMultipleItemsXOR', function() {
    it('should call LogicalPermissions::checkAccess() with multiple XOR values', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var runTruthTable = function runTruthTable(permissions) {
        var user = {id: 1};
        //OR truth table
        //0 0 0
        assert(!lp.checkAccess(permissions, {user: user}));
        user.roles = [];
        assert(!lp.checkAccess(permissions, {user: user}));
        //0 0 1
        user.roles = ['writer'];
        assert(lp.checkAccess(permissions, {user: user}));
        //0 1 0
        user.roles = ['editor'];
        assert(lp.checkAccess(permissions, {user: user}));
        //0 1 1
        user.roles = ['editor', 'writer'];
        assert(lp.checkAccess(permissions, {user: user}));
        //1 0 0
        user.roles = ['admin'];
        assert(lp.checkAccess(permissions, {user: user}));
        //1 0 1
        user.roles = ['admin', 'writer'];
        assert(lp.checkAccess(permissions, {user: user}));
        //1 1 0
        user.roles = ['admin', 'editor'];
        assert(lp.checkAccess(permissions, {user: user}));
        //1 1 1
        user.roles = ['admin', 'editor', 'writer'];
        assert(!lp.checkAccess(permissions, {user: user}));
      };

      //Test array values
      var permissions = {
        role: {
          XOR: [
            'admin',
            'editor',
            'writer'
          ]
        }
      };
      runTruthTable(permissions);

      //Test object values
      permissions = {
        role: {
          XOR: {
            0: 'admin',
            1: 'editor',
            2: 'writer'
          }
        }
      };
      runTruthTable(permissions);

      //Test array/object mixes
      permissions = {
        role: {
          XOR: [
            ['admin'],
            {0: 'editor'},
            'writer'
          ]
        }
      };
      runTruthTable(permissions);
      permissions = {
        role: {
          XOR: {
            0: ['admin'],
            1: {0: 'editor'},
            2: 'writer'
          }
        }
      };
      runTruthTable(permissions);
    });
  });
  describe('testCheckAccessNOTWrongValueType', function() {
    it('should call LogicalPermissions::checkAccess() with an illegal NOT value type and catch an InvalidValueForLogicGateException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        role: {
          NOT: true
        }
      };
      var user = {
        id: 1,
        roles: ['admin']
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});
    });
  });
  describe('testCheckAccessNOTTooFewElements', function() {
    it('should call LogicalPermissions::checkAccess() with too few elements in NOT value and catch an InvalidValueForLogicGateException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var user = {
        id: 1,
        roles: ['admin']
      };
      var permissions = {
        role: {
          NOT: ''
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});

      permissions = {
        role: {
          NOT: {}
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions, {user: user});
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});
    });
  });
  describe('testCheckAccessMultipleItemsNOT', function() {
    it('should call LogicalPermissions::checkAccess() with multiple NOT values and catch an InvalidValueForLogicGateException exception', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        role: {
          NOT: {
            0: 'admin',
            1: 'editor',
            2: 'writer'
          }
        }
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidValueForLogicGateException';});
    });
  });
  describe('testCheckAccessSingleItemNOTString', function() {
    it('should call LogicalPermissions::checkAccess() with single NOT string', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        role: {
          NOT: 'admin'
        }
      };
      var user = {
        id: 1,
        roles: ['admin', 'editor']
      };
      assert(!lp.checkAccess(permissions, {user: user}));
      delete user.roles;
      assert(lp.checkAccess(permissions, {user: user}));
      user.roles = ['editor'];
      assert(lp.checkAccess(permissions, {user: user}));
    });
  });
  describe('testCheckAccessSingleItemNOTObject', function() {
    it('should call LogicalPermissions::checkAccess() with single NOT object', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        role: {
          NOT: {5: 'admin'}
        }
      };
      var user = {
        id: 1,
        roles: ['admin', 'editor']
      };
      assert(!lp.checkAccess(permissions, {user: user}));
      delete user.roles;
      assert(lp.checkAccess(permissions, {user: user}));
      user.roles = ['editor'];
      assert(lp.checkAccess(permissions, {user: user}));
    });
  });
  describe('testCheckAccessBoolTRUEIllegalDescendant', function() {
    it('should call LogicalPermissions::checkAccess() with a boolean TRUE permission as a descendant to a permission key and catch an InvalidArgumentValueException', function() {
      var lp = new LogicalPermissions();
      lp.addType('role', function(){});
      var permissions = {
        'role': [true]
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testCheckAccessBoolTRUE', function() {
    it('should call LogicalPermissions::checkAccess() with a boolean TRUE permission', function() {
      var lp = new LogicalPermissions();
      var permissions = true;
      assert(lp.checkAccess(permissions));
    });
  });
  describe('testCheckAccessBoolTRUEArray', function() {
    it('should call LogicalPermissions::checkAccess() with a boolean TRUE permission encapsulated within an array', function() {
      var lp = new LogicalPermissions();
      var permissions = [
        true
      ];
      assert(lp.checkAccess(permissions));
    });
  });
  describe('testCheckAccessBoolFALSEIllegalDescendant', function() {
    it('should call LogicalPermissions::checkAccess() with a boolean FALSE permission as a descendant to a permission key and catch an InvalidArgumentValueException', function() {
      var lp = new LogicalPermissions();
      lp.addType('role', function(){});
      var permissions = {
        'role': [false]
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testCheckAccessBoolFALSE', function() {
    it('should call LogicalPermissions::checkAccess() with a boolean FALSE permission', function() {
      var lp = new LogicalPermissions();
      var permissions = false;
      assert(!lp.checkAccess(permissions));
    });
  });
  describe('testCheckAccessBoolFALSEArray', function() {
    it('should call LogicalPermissions::checkAccess() with a boolean FALSE permission encapsulated within an array', function() {
      var lp = new LogicalPermissions();
      var permissions = [
        false
      ];
      assert(!lp.checkAccess(permissions));
    });
  });
  describe('testCheckAccessBoolFALSEBypass', function() {
    it('should call LogicalPermissions::checkAccess() with a boolean FALSE permission and check that bypassing access still works', function() {
      var lp = new LogicalPermissions();
      var bypass_callback = function(context) {
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      var permissions = [
        false
      ];
      assert(lp.checkAccess(permissions));
    });
  });
  describe('testCheckAccessBoolFALSENoBypass', function() {
    it('should call LogicalPermissions::checkAccess() with a boolean FALSE permission and check that it is possible to restrict access to everyone by using no_bypass in conjuction with FALSE', function() {
      var lp = new LogicalPermissions();
      var bypass_callback = function(context) {
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      var permissions = {
        0: false,
        'no_bypass': true
      };
      assert(!lp.checkAccess(permissions));
    });
  });
  describe('testCheckAccessStringTRUEIllegalChildren', function() {
    it('should call LogicalPermissions::checkAccess() with a string TRUE permission used as key with children and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      var permissions = {
        'TRUE': false
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
      permissions = {
        'TRUE': []
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
      permissions = {
        'TRUE': {}
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testCheckAccessStringTRUEIllegalDescendant', function() {
    it('should call LogicalPermissions::checkAccess() with a string TRUE permission as a descendant to a permission key and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      lp.addType('role', function(){});
      var permissions = {
        'role': ['TRUE']
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testCheckAccessStringTRUE', function() {
    it('should call LogicalPermissions::checkAccess() with a string TRUE permission', function() {
      var lp = new LogicalPermissions();
      var permissions = 'TRUE';
      assert(lp.checkAccess(permissions));
    });
  });
  describe('testCheckAccessStringTRUEArray', function() {
    it('should call LogicalPermissions::checkAccess() with a string TRUE permission encapsulated within an array', function() {
      var lp = new LogicalPermissions();
      var permissions = ['TRUE'];
      assert(lp.checkAccess(permissions));
    });
  });
  describe('testCheckAccessStringFALSEIllegalChildren', function() {
    it('should call LogicalPermissions::checkAccess() with a string FALSE permission used as key with children and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      var permissions = {
        'FALSE': false
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
      permissions = {
        'FALSE': []
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
      permissions = {
        'FALSE': {}
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testCheckAccessStringFALSEIllegalDescendant', function() {
    it('should call LogicalPermissions::checkAccess() with a string FALSE permission as a descendant to a permission key and catch an InvalidArgumentValueException exception', function() {
      var lp = new LogicalPermissions();
      lp.addType('role', function(){});
      var permissions = {
        'role': ['FALSE']
      };
      assert.throws(function() {
        lp.checkAccess(permissions);
      }, function(err) {return err.name === 'InvalidArgumentValueException';});
    });
  });
  describe('testCheckAccessStringFALSE', function() {
    it('should call LogicalPermissions::checkAccess() with a string FALSE permission', function() {
      var lp = new LogicalPermissions();
      var permissions = 'FALSE';
      assert(!lp.checkAccess(permissions));
    });
  });
  describe('testCheckAccessStringFALSEArray', function() {
    it('should call LogicalPermissions::checkAccess() with a string FALSE permission encapsulated within an array', function() {
      var lp = new LogicalPermissions();
      var permissions = ['FALSE'];
      assert(!lp.checkAccess(permissions));
    });
  });
  describe('testCheckAccessStringFALSEBypass', function() {
    it('should call LogicalPermissions::checkAccess() with a string FALSE permission and check that bypassing access still works', function() {
      var lp = new LogicalPermissions();
      var bypass_callback = function(context) {
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      var permissions = [
        'FALSE'
      ];
      assert(lp.checkAccess(permissions));
    });
  });
  describe('testCheckAccessStringFALSENoBypass', function() {
    it('should call LogicalPermissions::checkAccess() with a string FALSE permission and check that it is possible to restrict access to everyone by using no_bypass in conjuction with FALSE', function() {
      var lp = new LogicalPermissions();
      var bypass_callback = function(context) {
        return true;
      };
      lp.setBypassCallback(bypass_callback);
      var permissions = {
        0: 'FALSE',
        'no_bypass': true
      };
      assert(!lp.checkAccess(permissions));
    });
  });
  describe('testCheckAccessNestedLogic', function() {
    it('should call LogicalPermissions::checkAccess() with nested logic', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        'role': {
          'OR': {
            'NOT': {
              'AND': [
                'admin',
                'editor',
              ]
            }
          }
        },
        0: false,
        1: 'FALSE'
      };
      var user = {
        id: 1,
        roles: ['admin', 'editor']
      };
      assert(!lp.checkAccess(permissions, {user: user}));
      delete user.roles;
      assert(lp.checkAccess(permissions, {user: user}));
      user.roles = ['editor'];
      assert(lp.checkAccess(permissions, {user: user}));
    });
  });
  describe('testCheckAccessLogicGateFirst', function() {
    it('should call LogicalPermissions::checkAccess() with nested logic and a logic gate as first element', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        AND: {
          'role': {
            'OR': {
              'NOT': {
                'AND': [
                  'admin',
                  'editor',
                ]
              }
            }
          },
          0: true,
          1: 'TRUE'
        }
      };
      var user = {
        id: 1,
        roles: ['admin', 'editor']
      };
      assert(!lp.checkAccess(permissions, {user: user}));
      delete user.roles;
      assert(lp.checkAccess(permissions, {user: user}));
      user.roles = ['editor'];
      assert(lp.checkAccess(permissions, {user: user}));
    });
  });
  describe('testCheckAccessShorthandORMixedObjectsArrays', function() {
    it('should call LogicalPermissions::checkAccess() with shorthand OR and mixed objects and arrays', function() {
      var lp = new LogicalPermissions();
      var types = {
        role: function(role, context) {
          var access = false;
          if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
            access = context.user.roles.indexOf(role) > -1;
          }
          return access;
        }
      };
      lp.setTypes(types);
      var permissions = {
        'role': [
          'admin',
          {
            'AND': [
              'editor',
              'writer',
              {
                'OR': [
                  'role1',
                  'role2'
                ]
              }
            ]
          }
        ]
      };
      var user = {
        id: 1,
        roles: ['admin']
      };
      assert(lp.checkAccess(permissions, {user: user}));
      delete user.roles;
      assert(!lp.checkAccess(permissions, {user: user}));
      user.roles = ['editor'];
      assert(!lp.checkAccess(permissions, {user: user}));
      user.roles = ['editor', 'writer'];
      assert(!lp.checkAccess(permissions, {user: user}));
      user.roles = ['editor', 'writer', 'role1'];
      assert(lp.checkAccess(permissions, {user: user}));
      user.roles = ['editor', 'writer', 'role2'];
      assert(lp.checkAccess(permissions, {user: user}));
      user.roles = ['admin', 'writer'];
      assert(lp.checkAccess(permissions, {user: user}));
    });
  });
});
