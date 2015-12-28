//Simple example for checking user roles

var LogicalPermissions = require("logical-permissions");
var lp = new LogicalPermissions();

var roleCallback = function(role, context) {
  var access = false;
  if(context.hasOwnProperty('user') && context.user.hasOwnProperty('roles')) {
    access = context.user.roles.indexOf(role) > -1; 
  }
  return access;
};
lp.addType('role', roleCallback);

var permissions = {
  role: ['editor', 'writer']
};

var user = {
  id: 1,
  roles: ['writer']
};

var access = lp.checkAccess(permissions, {user: user});
console.log('Access granted: ' + access);
