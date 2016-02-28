"use strict";

require('module');

var LogicalPermissions = function LogicalPermissions() {

  /*-----Private properties-------*/
  var self = this;
  var types = {};
  var bypass_callback = null;
  
  /*-----------Public methods---------*/

  /**
   * Adds a permission type.
   * @param {String} name - The name of the permission type
   * @param {Function} callback - The callback that evaluates the permission type. Upon calling checkAccess() the registered callback will be passed two parameters: a permission string (such as a role) and the context object passed to checkAccess(). The permission will always be a single string even if for example multiple roles are accepted. In that case the callback will be called once for each role that is to be evaluated. The callback should return a boolean which determines whether access should be granted.
   */
  this.addType = function addType(name, callback) {
    if(name === undefined) {
      throw {name: 'MissingArgumentException', message: 'The name parameter is required.'};
    }
    if(getVariableType(name) !== 'String') {
      throw {name: 'InvalidArgumentTypeException', message: 'The name parameter must be a string.'};
    }
    if(!name) {
      throw {name: 'InvalidArgumentValueException', message: 'The name parameter cannot be empty.'};
    }
    if(getCorePermissionKeys().indexOf(name) != -1) {
      throw {name: 'InvalidArgumentValueException', message: 'The name parameter has the illegal value "' + name + '". It cannot be one of the following values: ' + getCorePermissionKeys().join()};
    }
    if(this.typeExists(name)) {
      throw {name: 'PermissionTypeAlreadyExistsException', message: 'The type "' + name + '" already exists! If you want to change the callback for an existing type, please use LogicalPermissions:setTypeCallback().'};
    }
    if(callback === undefined) {
      throw {name: 'MissingArgumentException', message: 'The callback parameter is required.'};
    }
    if(getVariableType(callback) !== 'Function') {
      throw {name: 'InvalidArgumentTypeException', message: 'The callback parameter must be a function.'};
    }
    
    var types = self.getTypes();
    types[name] = callback;
    self.setTypes(types);
  };

  /**
   * Removes a permission type.
   * @param {String} name - The name of the permission type.
   */
  this.removeType = function removeType(name) {
    if(name === undefined) {
      throw {name: 'MissingArgumentException', message: 'The name parameter is required.'};
    }
    if(getVariableType(name) !== 'String') {
      throw {name: 'InvalidArgumentTypeException', message: 'The name parameter must be a string.'};
    }
    if(!name) {
      throw {name: 'InvalidArgumentValueException', message: 'The name parameter cannot be empty.'};
    }
    if(!self.typeExists(name)) {
      throw {name: 'PermissionTypeNotRegisteredException', message: 'The permission type "' + name + '" has not been registered. Please use LogicalPermissions::addType() or LogicalPermissions::setTypes() to register permission types.'};
    }

    var types = self.getTypes();
    delete types[name];
    self.setTypes(types);
  };

  /**
   * Checks whether a permission type is registered.
   * @param {String} name - The name of the permission type.
   * @returns {Boolean} true if the type is found or false if the type isn't found.
   */
  this.typeExists = function typeExists(name) {
    if(name === undefined) {
      throw {name: 'MissingArgumentException', message: 'The name parameter is required.'};
    }
    if(getVariableType(name) !== 'String') {
      throw {name: 'InvalidArgumentTypeException', message: 'The name parameter must be a string.'};
    }
    if(!name) {
      throw {name: 'InvalidArgumentValueException', message: 'The name parameter cannot be empty.'};
    }

    var types = self.getTypes();
    return types.hasOwnProperty(name);
  };
  
  /**
  * Gets the callback for a permission type.
  * @param {String} name - The name of the permission type.
  * @returns {Function} Callback for the permission type.
  */
  this.getTypeCallback = function getTypeCallback(name) {
    if(name === undefined) {
      throw {name: 'MissingArgumentException', message: 'The name parameter is required.'};
    }
    if(getVariableType(name) !== 'String') {
      throw {name: 'InvalidArgumentTypeException', message: 'The name parameter must be a string.'};
    }
    if(!name) {
      throw {name: 'InvalidArgumentValueException', message: 'The name parameter cannot be empty.'};
    }
    if(!self.typeExists(name)) {
      throw {name: 'PermissionTypeNotRegisteredException', message: 'The permission type "' + name + '" has not been registered. Please use LogicalPermissions::addType() or LogicalPermissions::setTypes() to register permission types.'};
    }
    
    var types = self.getTypes();
    return types[name];
  };
  
  /**
  * Changes the callback for an existing permission type.
  * @param {String} name - The name of the permission type.
  * @param {Function} callback - The callback that evaluates the permission type. Upon calling checkAccess() the registered callback will be passed two parameters: a permission string (such as a role) and the context object passed to checkAccess(). The permission will always be a single string even if for example multiple roles are accepted. In that case the callback will be called once for each role that is to be evaluated. The callback should return a boolean which determines whether access should be granted.
  */
  this.setTypeCallback = function(name, callback) {
    if(name === undefined) {
      throw {name: 'MissingArgumentException', message: 'The name parameter is required.'};
    }
    if(getVariableType(name) !== 'String') {
      throw {name: 'InvalidArgumentTypeException', message: 'The name parameter must be a string.'};
    }
    if(!name) {
      throw {name: 'InvalidArgumentValueException', message: 'The name parameter cannot be empty.'};
    }
    if(!self.typeExists(name)) {
      throw {name: 'PermissionTypeNotRegisteredException', message: 'The permission type "' + name + '" has not been registered. Please use LogicalPermissions::addType() or LogicalPermissions::setTypes() to register permission types.'};
    }
    if(callback === undefined) {
      throw {name: 'MissingArgumentException', message: 'The callback parameter is required.'};
    }
    if(getVariableType(callback) !== 'Function') {
      throw {name: 'InvalidArgumentTypeException', message: 'The callback parameter must be a function.'};
    }
    
    var types = self.getTypes();
    types[name] = callback;
    self.setTypes(types);
  };

  /**
   * Gets all defined permission types.
   * @returns {Object} permission types with the structure {name: callback, name2: callback2, ...}. This object is shallow cloned.
   */
  this.getTypes = function getTypes() {
    var this_types = {};
    for(var name in types) {
      this_types[name] = types[name];
    }
    return this_types;
  };

  /**
   * Overwrites all defined permission types.
   * @param {Object} new_types - permission types with the structure {name: callback, name2: callback2, ...}. This object is shallow cloned.
   */
  this.setTypes = function setTypes(new_types) {
    if(new_types === undefined) {
      throw {name: 'MissingArgumentException', message: 'The new_types parameter is required.'};
    }
    if(getVariableType(new_types) !== 'Object') {
      throw {name: 'InvalidArgumentTypeException', message: 'The new_types parameter must be an object.'};
    }
    for(var name in new_types) {
      if(isNumeric(name) || getVariableType(name) !== 'String') {
        throw {name: 'InvalidArgumentValueException', message: 'The new_types keys must be strings.'};
      }
      if(!name) {
        throw {name: 'InvalidArgumentValueException', message: 'The name for a type cannot be empty.'};
      }
      if(getCorePermissionKeys().indexOf(name) != -1) {
        throw {name: 'InvalidArgumentValueException', message: 'The name for a type has the illegal value "' + name + '". It cannot be one of the following values: ' + getCorePermissionKeys().join()};
      }
      if(getVariableType(new_types[name]) !== 'Function') {
        throw {name: 'InvalidArgumentValueException', message: 'The type callbacks must be functions.'};
      }
    }

    types = {};
    for(var name in new_types) {
      types[name] = new_types[name];
    }
  };

  /**
   * Gets the current bypass access callback.
   * @returns {Function} callback for checking access bypass.
   */
  this.getBypassCallback = function getBypassCallback() {
    return bypass_callback;
  };

  /**
   * Sets the bypass access callback.
   * @param {Function} callback - The callback that evaluates access bypassing. Upon calling checkAccess() the registered bypass callback will be passed one parameter, which is the context object passed to checkAccess(). It should return a boolean which determines whether bypass access should be granted.
   */
  this.setBypassCallback = function setBypassCallback(callback) {
    if(callback === undefined) {
      throw {name: 'MissingArgumentException', message: 'The callback parameter is required.'};
    }
    if(getVariableType(callback) !== 'Function') {
      throw {name: 'InvalidArgumentTypeException', message: 'The callback parameter must be a function.'};
    }

    bypass_callback = callback;
  };
  
  /**
  * Gets all keys that can be part of a permission tree.
  * @returns {Array} Valid permission keys
  */
  this.getValidPermissionKeys = function() {
    return getCorePermissionKeys().concat(Object.keys(this.getTypes()));
  };

  /**
   * Checks access for a permission tree.
   * @param {Object} permissions - The permission tree to be evaluated
   * @param {Object} context - A context object that could for example contain the evaluated user and document.
   * @param {Boolean} allow_bypass (optional) - Determines whether bypassing access should be allowed. Default value is true.
   * @returns {Boolean} true if access is granted or false if access is denied.
   */
  this.checkAccess = function checkAccess(permissions, context, allow_bypass) {
    if(permissions === undefined) {
      throw {name: 'MissingArgumentException', message: 'The permissions parameter is required.'};
    }
    if(getVariableType(permissions) !== 'Object') {
      throw {name: 'InvalidArgumentTypeException', message: 'The permissions parameter must be an object.'};
    }
    if(context === undefined) {
      throw {name: 'MissingArgumentException', message: 'The context parameter is required.'};
    }
    if(getVariableType(context) !== 'Object') {
      throw {name: 'InvalidArgumentTypeException', message: 'The context parameter must be an object.'};
    }
    allow_bypass = (typeof allow_bypass === 'undefined') ? true : allow_bypass;
    if(getVariableType(allow_bypass) !== 'Boolean') {
      throw {name: 'InvalidArgumentTypeException', message: 'The allow_bypass parameter must be a boolean.'};
    }

    var access = false;
    var permissions_copy = JSON.parse(JSON.stringify(permissions));
    if(allow_bypass) {
      if(permissions_copy.hasOwnProperty('no_bypass')) {
        var variable_type = getVariableType(permissions_copy.no_bypass);
        if(variable_type === 'Boolean') {
          allow_bypass = !permissions_copy.no_bypass;
        }
        else if(variable_type === 'Object') { //Object containing permissions which act as conditions
          allow_bypass = !processOR(permissions_copy.no_bypass, undefined, context);
        }
        else {
          throw {name: 'InvalidArgumentValueException', message: 'The no_bypass value must be a boolean or an object. Current value: ' + JSON.stringify(permissions_copy.no_bypass)};
        }
        delete permissions_copy.no_bypass;
      }
    }
    if(allow_bypass && checkBypassAccess(context)) {
      access = true; 
    }
    else {
      if(objectLength(permissions_copy) > 0) {
        access = processOR(permissions_copy, undefined, context);
      }
    }
    return access;
  };
  
  /*--------Private methods--------*/
  
  var getCorePermissionKeys = function() {
    return ['no_bypass', 'AND', 'NAND', 'OR', 'NOR', 'XOR', 'NOT'];
  };
  
  var getVariableType = function getVariableType(variable) {
    return Object.prototype.toString.call(variable).match(/^\[object\s(.*)\]$/)[1];
  };
  
  var isNumeric = function isNumeric(variable) {
    return !isNaN(parseFloat(variable)) && isFinite(variable);
  };
  
  var objectLength = function objectLength(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  var checkBypassAccess = function checkBypassAccess(context) {
    var bypass_access = false;
    var bypass_callback = self.getBypassCallback();
    if(getVariableType(bypass_callback) === 'Function') {
      bypass_access = bypass_callback(context);
      if(getVariableType(bypass_access) !== 'Boolean') {
        throw {name: 'InvalidCallbackReturnTypeException', message: 'The bypass access callback must return a boolean.'};
      }
    }
    return bypass_access;
  };

  var dispatch = function dispatch(permissions, type, context) {
    var access = false;
    var variable_type = getVariableType(permissions);
    if(variable_type === 'String') {
      access = externalAccessCheck(permissions, type, context);
    }
    else if(variable_type === 'Array') {
      if(permissions.length > 0) {
        access = processOR(permissions, type, context);
      }
    }
    else if(variable_type === 'Object') {
      if(objectLength(permissions) == 1) {
        var key = '';
        for(var tmpkey in permissions) {
          key = tmpkey;
          break;
        }
        var value = permissions[key];
        if(key === 'AND') {
          access = processAND(value, type, context);
        }
        else if(key === 'NAND') {
          access = processNAND(value, type, context);
        }
        else if(key === 'OR') {
          access = processOR(value, type, context);
        }
        else if(key === 'NOR') {
          access = processNOR(value, type, context);
        }
        else if(key === 'XOR') {
          access = processXOR(value, type, context);
        }
        else if(key === 'NOT') {
          access = processNOT(value, type, context);
        }
        else {
          if(!isNumeric(key)) {
            if(type === undefined) {
              type = key;
            }
            else {
              throw {name: 'InvalidArgumentValueException', message: 'You cannot put a permission type as a descendant to another permission type. Existing type: ' + type + '. Evaluated permissions: ' + JSON.stringify(permissions)};
            }
          }
          var value_vartype = getVariableType(value);
          if(value_vartype === 'Array' || value_vartype === 'Object') {
            access = processOR(value, type, context);
          }
          else {
            access = dispatch(value, type, context);
          }       
        }
      }
      else if(objectLength(permissions) > 1) {
        access = processOR(permissions, type, context); 
      }
    }
    else {
      throw {name: 'InvalidArgumentTypeException', message: 'A permission value must either be a string, an array or an object. Evaluated permissions: ' + permissions};
    }
    return access;
  };

  var processAND = function processAND(permissions, type, context) {
    var access = false;
    var variable_type = getVariableType(permissions);
    if(variable_type === 'Array') {
      if(permissions.length < 1) {
        throw {name: 'InvalidValueForLogicGateException', message: 'The value array of an AND gate must contain a minimum of one element. Current value: ' + JSON.stringify(permissions)}; 
      }

      access = true;
      for(var i in permissions) {
        var permission = permissions[i];
        access = access && dispatch(permission, type, context);
        if(!access) {
          break; 
        }
      }
    }
    else if(variable_type === 'Object') {
      if(objectLength(permissions) < 1) {
        throw {name: 'InvalidValueForLogicGateException', message: 'The value object of an AND gate must contain a minimum of one element. Current value: ' + JSON.stringify(permissions)}; 
      }

      access = true;
      for(var key in permissions) {
        var subpermissions = {};
        subpermissions[key] = permissions[key];
        access = access && dispatch(subpermissions, type, context);
        if(!access) {
          break; 
        }
      }
    }
    else {
      throw {name: 'InvalidValueForLogicGateException', message: 'The value of an AND gate must be an array or object. Current value: ' + permissions};
    }
    return access;
  };

  var processNAND = function processNAND(permissions, type, context) {
    var variable_type = getVariableType(permissions);
    if(variable_type === 'Array') {
      if(permissions.length < 1) {
        throw {name: 'InvalidValueForLogicGateException', message: 'The value array of a NAND gate must contain a minimum of one element. Current value: ' + JSON.stringify(permissions)}; 
      }
    }
    else if(variable_type === 'Object') {
      if(objectLength(permissions) < 1) {
        throw {name: 'InvalidValueForLogicGateException', message: 'The value object of a NAND gate must contain a minimum of one element. Current value: ' + JSON.stringify(permissions)}; 
      }
    }
    else {
      throw {name: 'InvalidValueForLogicGateException', message: 'The value of a NAND gate must be an array or object. Current value: ' + permissions};
    }

    var access = !processAND(permissions, type, context);
    return access;
  };

  var processOR = function processOR(permissions, type, context) {
    var access = false;
    var variable_type = getVariableType(permissions);
    if(variable_type === 'Array') {
      if(permissions.length < 1) {
        throw {name: 'InvalidValueForLogicGateException', message: 'The value array of an OR gate must contain a minimum of one element. Current value: ' + JSON.stringify(permissions)}; 
      }

      for(var i in permissions) {
        var permission = permissions[i];
        access = access || dispatch(permission, type, context);
        if(access) {
          break;
        }
      }
    }
    else if(variable_type === 'Object') {
      if(objectLength(permissions) < 1) {
        throw {name: 'InvalidValueForLogicGateException', message: 'The value object of an OR gate must contain a minimum of one element. Current value: ' + JSON.stringify(permissions)}; 
      }

      for(var key in permissions) {
        var subpermissions = {};
        subpermissions[key] = permissions[key];
        access = access || dispatch(subpermissions, type, context);
        if(access) {
          break;
        }
      }
    }
    else {
      throw {name: 'InvalidValueForLogicGateException', message: 'The value of an OR gate must be an array or object. Current value: ' + permissions};
    }
    return access;
  };

  var processNOR = function processNOR(permissions, type, context) {
    var variable_type = getVariableType(permissions);
    if(variable_type === 'Array') {
      if(permissions.length < 1) {
        throw {name: 'InvalidValueForLogicGateException', message: 'The value array of a NOR gate must contain a minimum of one element. Current value: ' + JSON.stringify(permissions)}; 
      }
    }
    else if(variable_type === 'Object') {
      if(objectLength(permissions) < 1) {
        throw {name: 'InvalidValueForLogicGateException', message: 'The value object of a NOR gate must contain a minimum of one element. Current value: ' + JSON.stringify(permissions)}; 
      }
    }
    else {
      throw {name: 'InvalidValueForLogicGateException', message: 'The value of a NOR gate must be an array or object. Current value: ' + permissions};
    }

    var access = !processOR(permissions, type, context);
    return access;
  };

  var processXOR = function processXOR(permissions, type, context) {
    var access = false;
    var count_true = 0;
    var count_false = 0;
    var variable_type = getVariableType(permissions);
    if(variable_type === 'Array') {
      if(permissions.length < 2) {
        throw {name: 'InvalidValueForLogicGateException', message: 'The value array of an XOR gate must contain a minimum of two elements. Current value: ' + JSON.stringify(permissions)};
      }

      for(var i in permissions) {
        var permission = permissions[i];
        var this_access = dispatch(permission, type, context);
        if(this_access) {
          count_true++; 
        }
        else {
          count_false++; 
        }
        if(count_true > 0 && count_false > 0) {
          access = true;
          break; 
        }
      }
    }
    else if(variable_type === 'Object') {
      if(objectLength(permissions) < 2) {
        throw {name: 'InvalidValueForLogicGateException', message: 'The value object of an XOR gate must contain a minimum of two elements. Current value: ' + JSON.stringify(permissions)};
      }

      for(var key in permissions) {
        var subpermissions = {};
        subpermissions[key] = permissions[key];
        var this_access = dispatch(subpermissions, type, context);
        if(this_access) {
          count_true++; 
        }
        else {
          count_false++; 
        }
        if(count_true > 0 && count_false > 0) {
          access = true;
          break; 
        }
      }
    }
    else {
      throw {name: 'InvalidValueForLogicGateException', message: 'The value of an XOR gate must be an array or object. Current value: ' + permissions};
    }
    return access;
  };

  var processNOT = function processNOT(permissions, type, context) {
    var variable_type = getVariableType(permissions);
    if(variable_type === 'Object') {
      if(objectLength(permissions) != 1) {
        throw {name: 'InvalidValueForLogicGateException', message: 'A NOT permission must have exactly one child in the value object. Current value: ' + JSON.stringify(permissions)};
      }
    }
    else if(variable_type === 'String') {
      if(!permissions) {
        throw {name: 'InvalidValueForLogicGateException', message: 'A NOT permission cannot have an empty string as its value.'};
      }
    }
    else {
      throw {name: 'InvalidValueForLogicGateException', message: 'The value of a NOT gate must either be an object or a string. Current value: ' + permissions};
    }

    var access = !dispatch(permissions, type, context);
    return access;
  };

  var externalAccessCheck = function externalAccessCheck(permission, type, context) {
    if(!self.typeExists(type)) {
      throw {name: 'PermissionTypeNotRegisteredException', message: 'The permission type "' + type + '" has not been registered. Please use LogicalPermissions::addType() or LogicalPermissions::setTypes() to register permission types.'};
    }

    var access = false;
    var callback = self.getTypeCallback(type);
    if(getVariableType(callback) === 'Function') {
      access = callback(permission, context);
      if(getVariableType(access) !== 'Boolean') {
        throw {name: 'InvalidCallbackReturnTypeException', message: 'The registered callback for the permission type "' + type + '" must return a boolean.'};
      }
    }
    return access;
  };

};

module.exports = LogicalPermissions;