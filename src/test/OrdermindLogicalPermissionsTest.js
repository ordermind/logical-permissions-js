var OrdermindLogicalPermissions = require('../lib/OrdermindLogicalPermissions.js').OrdermindLogicalPermissions;
var assert = require('assert');
describe('OrdermindLogicalPermissions', function() {
  describe('creation', function () {
    it('should create a OrdermindLogicalPermissions instance', function () {
      var lp = new OrdermindLogicalPermissions();
      assert(lp instanceof OrdermindLogicalPermissions);
    });
  });
}); 
