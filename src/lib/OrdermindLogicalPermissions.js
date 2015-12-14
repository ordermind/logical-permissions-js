"use strict";

OrdermindLogicalPermissions = {
  types: {},
  bypass_callback: null
};

/**
 * Add a permission type.
 * @param {Object} name - The name of the permission type
 * @param {Object} callback - The callback that evaluates the permission type
 */
OrdermindLogicalPermissions.addType = function(name, callback) {
  var self = this;
  self.types[name] = callback;
};

/**
 * Remove a permission type.
 * @param {Object} name - The name of the permission type
 */
OrdermindLogicalPermissions.removeType = function(name) {
  var self = this;
  delete self.types[name];
};

/**
 * Get all defined permission types.
 * @returns {Object} permission types with the structure {name: callback, name2: callback2, ...}. This object is shallow cloned.
 */
OrdermindLogicalPermissions.getTypes = function() {
  var self = this;
  var types = {};
  for(var type in self.types) {
    types[type] = self.types[type]; 
  }
  return types;
};

/**
 * Overwrite all defined permission types.
 * @param {Object} types - permission types with the structure {name: callback, name2: callback2, ...}. This object is shallow cloned.
 */
OrdermindLogicalPermissions.setTypes = function(types) {
  var self = this;
  self.types = {};
  for(var type in types) {
    self.types[type] = types[type]; 
  }
};

/**
 * Get the current bypass access callback.
 * @returns {Function} callback for checking access bypass.
 */
OrdermindLogicalPermissions.getBypassCallback = function() {
  var self = this;
  return self.bypass_callback;
};

/**
 * Set the bypass access callback.
 * @param {Function} callback for checking access bypass.
 */
OrdermindLogicalPermissions.setBypassCallback = function(callback) {
  var self = this;
  self.bypass_callback = callback;
};

/**
 * Check access for a permission tree. Realm: Anywhere.
 * @param {Object} permissions - The permission tree to be evaluated
 * @param [free params]
 * @returns {Boolean} access
 */
OrdermindLogicalPermissions.checkAccess = function(permissions) {
  var self = this;
  var access = false;
  var allow_bypass = true;
  var permissions_copy = JSON.parse(JSON.stringify(permissions));
  if(permissions_copy.hasOwnProperty('no_bypass')) {
    var variable_type = self.getVariableType(permissions_copy.no_bypass);
    if(variable_type === 'Boolean') {
      allow_bypass = !permissions_copy.no_bypass;
    }
    else if(variable_type === 'Object') { //Object containing permissions which act as conditions
      allow_bypass = !self.dispatch(permissions_copy.no_bypass, arguments);
    }
    delete permissions_copy.no_bypass;
  }
  if(allow_bypass && self.checkBypassAccess(arguments)) {
    access = true; 
  }
  else {
    access = self.dispatch(permissions_copy, arguments);
  }
  return access;
};

OrdermindLogicalPermissions.getVariableType = function(variable) {
  var self = this;
  return Object.prototype.toString.call(variable).match(/^\[object\s(.*)\]$/)[1];
};

OrdermindLogicalPermissions.checkBypassAccess = function() {
  var self = this;
  var bypass_access = false;
  var bypass_callback = self.getBypassCallback();
  if(bypass_callback) {
    bypass_access = bypass_callback.apply(arguments);
  }
  return bypass_access;
};

OrdermindLogicalPermissions.dispatch = function(permissions) {
  var self = this;
  var access = false;
  var key = '';
  var variable_type = self.getVariableType(permissions);
  if(variable_type === 'String') {
    access = self.callMethod(permissions, arguments);
  }
  else if(variable_type === 'Array') {
    access = self.processOR(permissions, arguments);
  }
  else if(variable_type === 'Object') {
    for(var tmpkey in permissions) {
      key = tmpkey;
      break;
    }
    var value = permissions[key];
    if(key === 'AND') {
      access = self.processAND(value, arguments);
    }
    else if(key === 'NAND') {
      access = self.processNAND(value, arguments);
    }
    else if(key === 'OR') {
      access = self.processOR(value, arguments);
    }
    else if(key === 'NOR') {
      access = self.processNOR(value, arguments);
    }
    else if(key === 'XOR') {
      access = self.processXOR(value, arguments);
    }
    else if(key === 'NOT') {
      access = self.processNOT(value, arguments);
    }
    else {
      type = key; 
      access = self.dispatch(value, arguments);
    }
  }
  return access;
};

OrdermindLogicalPermissions.processAND = function(permissions) {
  var self = this;
  var access = true;
  var variable_type = self.getVariableType(permissions);
  if(variable_type === 'Array') {
    for(var i in permissions) {
      var permission = permissions[i];
      access = access && self.callMethod(permission, arguments);
      if(!access) {
        break; 
      }
    }
  }
  else if(variable_type === 'Object') {
    for(var key in permissions) {
      var subpermissions = {};
      subpermissions[key] = permissions[key];
      access = access && self.dispatch(subpermissions, arguments);
      if(!access) {
        break; 
      }
    }
  }
  else {
    access = false; 
  }
  return access;
};

OrdermindLogicalPermissions.processNAND = function(permissions) {
  var self = this;
  var access = self.processAND(permissions, arguments);
  return !access;
};

OrdermindLogicalPermissions.processOR = function(permissions) {
  var self = this;
  var access = false;
  var variable_type = self.getVariableType(permissions);
  if(variable_type === 'Array') {
    for(var i in permissions) {
      var permission = permissions[i];
      access = access || self.callMethod(permission, arguments);
      if(access) {
        break; 
      }
    }
  }
  else if(variable_type === 'Object') {
    for(var key in permissions) {
      var subpermissions = {};
      subpermissions[key] = permissions[key];
      access = access || self.dispatch(subpermissions, arguments);
      if(access) {
        break; 
      }
    }
  }
  return access;
};

OrdermindLogicalPermissions.processNOR = function(permissions) {
  var self = this;
  var access = self.processOR(permissions, arguments);
  return !access;
};

OrdermindLogicalPermissions.processXOR = function(permissions) {
  var self = this;
  var access = false;
  var count_true = 0;
  var count_false = 0;
  var variable_type = self.getVariableType(permissions);
  if(variable_type === 'Array') {
    for(var i in permissions) {
      var permission = permissions[i];
      var this_access = self.callMethod(permission, arguments);
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
    for(var key in permissions) {
      var subpermissions = {};
      subpermissions[key] = permissions[key];
      var this_access = self.dispatch(subpermissions, arguments);
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
  return access;
};

OrdermindLogicalPermissions.processNOT = function(permissions) {
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

OrdermindLogicalPermissions.callMethod = function(permission) {
  var self = this;
  var access = false;
  var types = self.getTypes();
  if(types.hasOwnProperty(type)) {
    var func = types[type];
    access = func.apply(self, arguments);
  }
  return access;
};