"use strict";

require('module');

var OrdermindLogicalPermissions = function OrdermindLogicalPermissions(){

  /*-----Private properties-------*/
  
  var types = {};
  var bypass_callback = null;
  
  /*-----------Public methods---------*/

  /**
   * Add a permission type.
   * @param {String} name - The name of the permission type
   * @param {Function} callback - The callback that evaluates the permission type
   */
  this.addType = function addType(name, callback) {
    var self = this;
    if(name === undefined) {
      throw {name: 'MissingArgumentException', message: 'The name parameter is required.'};
    }
    if(getVariableType(name) !== 'String') {
      throw {name: 'InvalidArgumentTypeException', message: 'The name parameter must be a string.'};
    }
    if(!name) {
      throw {name: 'InvalidArgumentValueException', message: 'The name parameter cannot be empty.'};
    }
    if(callback === undefined) {
      throw {name: 'MissingArgumentException', message: 'The callback parameter is required.'};
    }
    if(getVariableType(callback) !== 'Function') {
      throw {name: 'InvalidArgumentTypeException', message: 'The callback parameter must be a function.'};
    }

    types[name] = callback;
  };

  /**
   * Remove a permission type.
   * @param {String} name - The name of the permission type.
   */
  this.removeType = function removeType(name) {
    var self = this;
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
      throw {name: 'PermissionTypeNotRegisteredException', message: 'The permission type "' + name + '" has not been registered. Please use OrdermindLogicalPermissions::addType() or OrdermindLogicalPermissions::setTypes() to register permission types.'};
    }

    delete types[name];
  };

  /**
   * Checks whether a permission type is registered.
   * @param {String} name - The name of the permission type.
   * @returns {Boolean} TRUE if the type is found or FALSE if the type isn't found.
   */
  this.typeExists = function typeExists(name) {
    var self = this;
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
  * Get the callback for a permission type.
  * @param {String} name - The name of the permission type.
  * @returns {Function} Callback for the permission type.
  */
  this.getTypeCallback = function getTypeCallback(name) {
    var self = this;
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
      throw {name: 'PermissionTypeNotRegisteredException', message: 'The permission type "' + name + '" has not been registered. Please use OrdermindLogicalPermissions::addType() or OrdermindLogicalPermissions::setTypes() to register permission types.'};
    }
    
    var types = self.getTypes();
    return types[name];
  };

  /**
   * Get all defined permission types.
   * @returns {Object} permission types with the structure {name: callback, name2: callback2, ...}. This object is shallow cloned.
   */
  this.getTypes = function getTypes() {
    var self = this;
    var this_types = {};
    for(var name in types) {
      this_types[name] = types[name];
    }
    return this_types;
  };

  /**
   * Overwrite all defined permission types.
   * @param {Object} new_types - permission types with the structure {name: callback, name2: callback2, ...}. This object is shallow cloned.
   */
  this.setTypes = function setTypes(new_types) {
    var self = this;
    if(new_types === undefined) {
      throw {name: 'MissingArgumentException', message: 'The new_types parameter is required.'};
    }
    if(getVariableType(new_types) !== 'Object') {
      throw {name: 'InvalidArgumentTypeException', message: 'The new_types parameter must be an object.'};
    }
    types = {};
    for(var name in new_types) {
      if(isNumeric(name) || getVariableType(name) !== 'String') {
        throw {name: 'InvalidArgumentValueException', message: 'The new_types keys must be strings.'};
      }
      if(!name) {
        throw {name: 'InvalidArgumentValueException', message: 'The name for a type cannot be empty.'};
      }
      if(getVariableType(new_types[name]) !== 'Function') {
        throw {name: 'InvalidArgumentValueException', message: 'The type callbacks must be functions.'};
      }
      types[name] = new_types[name]; 
    }
  };

  /**
   * Get the current bypass access callback.
   * @returns {Function} callback for checking access bypass.
   */
  this.getBypassCallback = function getBypassCallback() {
    var self = this;
    return bypass_callback;
  };

  /**
   * Set the bypass access callback.
   * @param {Function} callback for checking access bypass.
   */
  this.setBypassCallback = function setBypassCallback(callback) {
    var self = this;
    if(callback === undefined) {
      throw {name: 'MissingArgumentException', message: 'The callback parameter is required.'};
    }
    if(getVariableType(callback) !== 'Function') {
      throw {name: 'InvalidArgumentTypeException', message: 'The callback parameter must be a function.'};
    }

    bypass_callback = callback;
  };

  /**
   * Check access for a permission tree. Realm: Anywhere.
   * @param {Object} permissions - The permission tree to be evaluated
   * @param {Object} context - A context array that could for example contain the evaluated user and document.
   * @returns {Boolean} access
   */
  this.checkAccess = function checkAccess(permissions, context) {
    var self = this;
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

    var access = false;
    var allow_bypass = true;
    var permissions_copy = JSON.parse(JSON.stringify(permissions));
    if(permissions_copy.hasOwnProperty('no_bypass')) {
      var variable_type = getVariableType(permissions_copy.no_bypass);
      if(variable_type === 'Boolean') {
        allow_bypass = !permissions_copy.no_bypass;
      }
      else if(variable_type === 'Object') { //Object containing permissions which act as conditions
        allow_bypass = !dispatch(permissions_copy.no_bypass, undefined, context);
      }
      delete permissions_copy.no_bypass;
    }
    if(allow_bypass && checkBypassAccess(context)) {
      access = true; 
    }
    else {
      access = processOR(permissions_copy, undefined, context);
    }
    return access;
  };
  
  /*--------Private methods--------*/
  
  var getVariableType = function getVariableType(variable) {
    var self = this;
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
    var self = this;
    var bypass_access = false;
    var bypass_callback = self.getBypassCallback();
    if(getVariableType(bypass_callback) === 'Function') {
      bypass_access = bypass_callback(context);
    }
    return bypass_access;
  };

  var dispatch = function dispatch(permissions, type, context) {
    var self = this;
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
              throw {name: 'InvalidArgumentValueException', message: 'You cannot put a permission type as a descendant to another permission type. Existing type: ' + type + '. Evaluated permissions: ' + value};
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
      throw {name: 'InvalidArgumentTypeException', message: 'A permission must either be a string or an array. Evaluated permissions: ' + permissions};
    }
    return access;
  };

  var processAND = function processAND(permissions, type, context) {
    var self = this;
    var access = false;
    var variable_type = getVariableType(permissions);
    if(variable_type === 'Array') {
      if(permissions.length < 1) {
        throw {name: 'InvalidValueForLogicGate', message: 'The value array of an AND gate must contain a minimum of one element. Current value: ' + permissions}; 
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
        throw {name: 'InvalidValueForLogicGate', message: 'The value object of an AND gate must contain a minimum of one element. Current value: ' + permissions}; 
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
      throw {name: 'InvalidValueForLogicGate', message: 'The value of an AND gate must be an array or object. Current value: ' + permissions};
    }
    return access;
  };

  var processNAND = function processNAND(permissions, type, context) {
    var self = this;
    var variable_type = getVariableType(permissions);
    if(variable_type === 'Array') {
      if(permissions.length < 1) {
        throw {name: 'InvalidValueForLogicGate', message: 'The value array of a NAND gate must contain a minimum of one element. Current value: ' + permissions}; 
      }
    }
    else if(variable_type === 'Object') {
      if(objectLength(permissions) < 1) {
        throw {name: 'InvalidValueForLogicGate', message: 'The value object of a NAND gate must contain a minimum of one element. Current value: ' + permissions}; 
      }
    }
    else {
      throw {name: 'InvalidValueForLogicGate', message: 'The value of a NAND gate must be an array or object. Current value: ' + permissions};
    }

    var access = !processAND(permissions, type, context);
    return access;
  };

  var processOR = function processOR(permissions, type, context) {
    var self = this;
    var access = false;
    var variable_type = getVariableType(permissions);
    if(variable_type === 'Array') {
      if(permissions.length < 1) {
        throw {name: 'InvalidValueForLogicGate', message: 'The value array of an OR gate must contain a minimum of one element. Current value: ' + permissions}; 
      }

      for(var i in permissions) {
        var permission = permissions[i];
        access = access && dispatch(permission, type, context);
        if(access) {
          break; 
        }
      }
    }
    else if(variable_type === 'Object') {
      if(objectLength(permissions) < 1) {
        throw {name: 'InvalidValueForLogicGate', message: 'The value object of an OR gate must contain a minimum of one element. Current value: ' + permissions}; 
      }

      for(var key in permissions) {
        var subpermissions = {};
        subpermissions[key] = permissions[key];
        access = access && dispatch(subpermissions, type, context);
        if(access) {
          break; 
        }
      }
    }
    else {
      throw {name: 'InvalidValueForLogicGate', message: 'The value of an OR gate must be an array or object. Current value: ' + permissions};
    }
    return access;
  };

  var processNOR = function processNOR(permissions, type, context) {
    var self = this;
    var variable_type = getVariableType(permissions);
    if(variable_type === 'Array') {
      if(permissions.length < 1) {
        throw {name: 'InvalidValueForLogicGate', message: 'The value array of a NOR gate must contain a minimum of one element. Current value: ' + permissions}; 
      }
    }
    else if(variable_type === 'Object') {
      if(objectLength(permissions) < 1) {
        throw {name: 'InvalidValueForLogicGate', message: 'The value object of a NOR gate must contain a minimum of one element. Current value: ' + permissions}; 
      }
    }
    else {
      throw {name: 'InvalidValueForLogicGate', message: 'The value of a NOR gate must be an array or object. Current value: ' + permissions};
    }

    var access = !processOR(permissions, type, context);
    return access;
  };

  var processXOR = function processXOR(permissions, type, context) {
    var self = this;
    var access = false;
    var count_true = 0;
    var count_false = 0;
    var variable_type = self.getVariableType(permissions);
    if(variable_type === 'Array') {
      if(permissions.length < 2) {
        throw {name: 'InvalidValueForLogicGate', message: 'The value array of an XOR gate must contain a minimum of two elements. Current value: ' + permissions};
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
      if(objectLength(permission) < 2) {
        throw {name: 'InvalidValueForLogicGate', message: 'The value object of an XOR gate must contain a minimum of two elements. Current value: ' + permissions};
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
      throw {name: 'InvalidValueForLogicGate', message: 'The value of an XOR gate must be an array or object. Current value: ' + permissions};
    }
    return access;
  };

  var processNOT = function processNOT(permissions) {
    var self = this;
    var access = false;
    var variable_type = self.getVariableType(permissions);
    if(variable_type === 'String') {
      access = !self.callMethod(permissions, arguments);
    }
    else if(variable_type === 'Object') {
      access = !self.dispatch(permissions, arguments);
    }
    return access;
  };

  var externalAccessCheck = function externalAccessCheck(permission, type, context) {
    var self = this;
    var access = false;
    var types = self.getTypes();
    if(types.hasOwnProperty(type)) {
      var func = types[type];
      access = func.apply(self, arguments);
    }
    return access;
  };

};

module.exports = OrdermindLogicalPermissions;