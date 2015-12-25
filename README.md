# logical-permissions

## Ultra flexible object-based permissions

This is a generic library that provides support for object-based permissions with logic gates such as AND and OR. You can register any kind of permission types such as roles and flags. The idea with this library is to be an ultra-flexible foundation that can be used by any framework.

## Getting started

### Installation

`meteor add ordermind:logical-permissions`

### Usage

The main api method is `OrdermindLogicalPermissions.checkAccess()`, which checks the access for a **permission tree**. It can be called from either client or server. A permission tree is a bundle of permissions that apply to a specific action. Let's say for example that you want to restrict access for updating a user. You'd like only users with the role "admin" to be able to update any user, but users should also be able to update their own user data (or at least some of it). With the structure this package provides, these conditions could be expressed elegantly in a permission tree as such:

```javascript
{
  "OR": {
    "role": "admin",
    "flag": "is_author"
  }
}
```

Because these conditions apply only to the action "update user" you will probably want to structure the various permission trees into one single object for quick and easy lookup. I've created a local package that supports evaluation of document-level and field-level permissions on the server and route permissions on the client. I may publish that package as well at some point in the future but it's both too broad and too opinionated at the moment. For the server permissions I have created JSON files that are loaded upon `Meteor.startup()` and merged into a server-only object variable. One such JSON file could look like this:

```javascript
{
  "collections": {
    "users": {
      "create": {
        "role": "admin"
      },
      "read": {
        "OR": {
          "role": "admin",
          "flag": "is_author"
        }
      },
      "update": {
        "OR": {
          "role": "admin",
          "flag": "is_author"
        }
      },
      "delete": {
        "no_bypass": {
          "flag": "is_author"
        },
        "AND": {
          "role": "admin",
          "flag": {"NOT": "is_author"}
        }
      },
      "fields": {
        "username": {
          "read": {
            "OR": {
              "role": "admin",
              "flag": "is_author"
            }
          },
          "update": {
            "role": "admin"
          }
        },
        "old_password": {
          "update": {
            "flag": "is_author"
          }
        },
        "roles": {
          "read": {
            "role": "admin"
          },
          "update": {
            "AND": {
              "role": "admin",
              "flag": {"NOT": "is_author"}
            }
          }
        },
        "bypass_access": {
          "read": {
            "flag": "bypass_access"
          },
          "update": {
            "no_bypass": true,
            "AND": {
              "flag": "bypass_access",
              "NOT": {"flag": "is_author"}
            }
          }
        }
      }
    }
  }
}
```

If I then want to check the access for updating a user, I could for example do it this way:

```javascript
Meteor.methods({
  'checkAccessUserUpdate': function(user, document) {
    var permissions = GlobalPermissionsObject;
    var access = OrdermindLogicalPermissions.checkAccess(permissions.collections.users.update, user, document);
    return access;
  }
});
```

However, because this package purposefully is not involved in the actual storing of the permissions you are free to put them in a database or wherever you want.

## Permission types

### role

Supported values:  
- `String` with single role
- `Array` of multiple roles. This is a shorthand for `{"OR": []}`
- `Object` with a logic gate

The user object needs to have a "roles" array attached to it in order to check this permission. Otherwise it always returns false.

Examples:

```javascript
//Allow access for single role
{
  "role": "sales"
}
```

```javascript
//Allow access for multiple roles.
{
  "role": {
    "OR": ["sales", "editor"]
  }
}
```

```javascript
//Allow access for multiple roles. Shorthand for the above.
{
  "role": ["sales", "editor"]
}
```

```javascript
//Deny access for the sales role
{
  "role": {
    "NOT": "sales"
  }
}
```

```javascript
//Allow access for admin and editor but not if they are also a sales person
{
  "role": {
    "AND": {
      "OR": ["admin", "editor"],
      "NOT": "sales"
    }
  }
}
```

### flag

Supported values:
- `String` with single flag
- `Array` of multiple flags. This is a shorthand for `{"OR": []}`
- `Object` with a logic gate

Supported flags:
- **has_account** - Returns true if the evaluated user has an account. Returns false if it is an anonymous user.
- **is_author** - Returns true if the evaluated user is the author of the evaluated document and false if they are not. It tries to evaluate the properties "authorId", "userId" and "\_id" on the document, in that order of priority.
- **bypass_access** - Returns true if the evaluated user object has the property `{"bypass_access": true}` and returns false otherwise.  

Examples:

```javascript
//Allow access if the user has an account
{
  "flag": "has_account"
}
```

```javascript
//Disallow access for the author of the evaluated document
{
  "flag": {
    "NOT": "is_author"
  }
}
```

### AND

A logic AND gate returns true if all of its children return true. Otherwise it returns false.

Supported values: 
- `Array` of type values such as a list of roles or flags if it is a descendant to a type key
- `Object` containing logic gates and/or possibly one or more type keys if it is not a descendant to those type keys

Examples:

```javascript
//Allow access only if the user is both an editor and a sales person
{
  "role": {
    "AND": ["editor", "sales"]
  }
}
```

```javascript
//Allow update if the user is both a sales person and the author of the document
{
  "AND": {
    "role": "sales",
    "flag": "is_author"
  }
}
```

### NAND

A logic NAND gate returns true if one or more of its children returns false. Otherwise it returns false.

Supported values: 
- `Array` of type values such as a list of roles or flags if it is a descendant to a type key
- `Object` containing logic gates and/or possibly one or more type keys if it is not a descendant to those type keys

Examples:

```javascript
//Allow access by anyone except if the user is both an editor and a sales person
{
  "role": {
    "NAND": ["editor", "sales"]
  }
}
```

```javascript
//Allow update by anyone, but not if the user is both a sales person and the author of the document.
{
  "NAND": {
    "role": "sales",
    "flag": "is_author"
  }
}
```

### OR

A logic OR gate returns true if one or more of its children returns true. Otherwise it returns false.

Supported values: 
- `Array` of type values such as a list of roles or flags if it is a descendant to a type key
- `Object` containing logic gates and/or possibly one or more type keys if it is not a descendant to those type keys

Examples:

```javascript
//Allow access if the user is either an editor or a sales person, or both.
{
  "role": {
    "OR": ["editor", "sales"]
  }
}
```

```javascript
//Allow update if the user is either a sales person or the author of the document, or both
{
  "OR": {
    "role": "sales",
    "flag": "is_author"
  }
}
```

### NOR

A logic NOR gate returns true if all of its children returns false. Otherwise it returns false.

Supported values: 
- `Array` of type values such as a list of roles or flags if it is a descendant to a type key
- `Object` containing logic gates and/or one or more type keys if it is not a descendant to those type keys

Examples: 

```javascript
//Allow access if the user is neither an editor nor a sales person
{
  "role": {
    "NOR": ["editor", "sales"]
  }
}
```

```javascript
//Allow neither sales people nor the author of the document to update it
{
  "NOR": {
    "role": "sales",
    "flag": "is_author"
  }
}
```


### XOR

A logic XOR gate returns true if one or more of its children returns true and one or more of its children returns false. Otherwise it returns false.

Supported values: 
- `Array` of type values such as a list of roles or flags if it is a descendant to a type key
- `Object` containing logic gates and/or possibly one or more type keys if it is not a descendant to those type keys

Examples:

```javascript
//Allow access if the user is either an editor or a sales person, but not both
{
  "role": {
    "XOR": ["editor", "sales"]
  }
}
```

```javascript
//Allow either sales people or the author of the document to update it, but not if the user is both a sales person and the author
{
  "XOR": {
    "role": "sales",
    "flag": "is_author"
  }
}
```

### NOT

A logic NOT gate returns true if its child returns false, and vice versa.

Supported values:
- `String` with single type value if it is a descendant to a type key
- `Object` with either a single logic gate or a single type key if it is not a descendant to that type key

Examples:

```javascript
//Allow access for anyone except editors
{
  "role": {
    "NOT": "editor"
  }
}
```

```javascript
//Allow access for anyone except the author of the document
{
  "NOT": {
    "flag": "is_author"
  }
}
```

## Bypassing permissions

By default access is always granted if a user has the property `{"bypass_access": true}`. If you want to make exceptions you can do so by adding the property "no_bypass" to the root of a permission tree. I'm including the non-essential ancestors in my examples here to show what I mean by the root of a permission tree.

Examples:

```javascript
//Disallow access bypass for creating a customer, making it necessary to have the admin role to be able to create customers.
{
  "collections": {
    "customers": {
      "create": {
        "no_bypass": true,
        "role": "admin"
      }
    }
  }
}
```

```javascript
//Disallow deletion of one's own user even if they are a superuser
{
  "collections": {
    "users": {
      "delete": {
        "no_bypass": {
          "flag": "is_author"
        },
        "flag": {"NOT": "is_author"}
      }
    }
  }
}
```


## API

### addType(name, callback) 

Add a permission type. Realm: Anywhere.

**Parameters**

**name**: `Object`, The name of the permission type

**callback**: `Object`, The callback that evaluates the permission type



### removeType(name) 

Remove a permission type. Realm: Anywhere.

**Parameters**

**name**: `Object`, The name of the permission type



### getTypes() 

Get all defined permission types. Realm: Anywhere.

**Returns**: `Object`, permission types with the structure {name: callback, name2: callback2, ...}. This object is shallow cloned.


### setTypes(types) 

Overwrite all defined permission types. Realm: Anywhere.

**Parameters**

**types**: `Object`, permission types with the structure {name: callback, name2: callback2, ...}. This object is shallow cloned.



### addFlag(name, callback) 

Add a flag. Realm: Anywhere.

**Parameters**

**name**: `Object`, The name of the flag

**callback**: `Object`, The callback that evaluates the flag



### removeFlag(name) 

Remove a flag. Realm: Anywhere.

**Parameters**

**name**: `Object`, The name of the flag



### getFlags() 

Get all defined flags. Realm: Anywhere.

**Returns**: `Object`, flags with the structure {name: callback, name2: callback2, ...}. This object is shallow cloned.


### setFlags(flags) 

Overwrite all defined flags. Realm: Anywhere.

**Parameters**

**flags**: `Object`, flags with the structure {name: callback, name2: callback2, ...}. This object is shallow cloned.


### checkAccess(permissions, user, [document]) 

Check access for a permission tree. Realm: Anywhere.

**Parameters**

**permissions**: `Object`, The permission tree to be evaluated

**user**: `Object`, The user for which to check the access

**document** (optional): `Object`, The document for which to check the access, if relevant

**Returns**: `Boolean`, access


## Extensibility

This package has built-in support for managing permission types and flags specifically, so you can easily add new flags or even new permission types. Please refer to the API for details.

Examples:

```javascript
//Add a new flag
Meteor.startup(function () {
  "use strict";

  OrdermindLogicalPermissions.addFlag(my_flag, function() {
    //Code for evaluating the flag
  });
}); 
```

```javascript
//Add a new permission type
Meteor.startup(function () {
  "use strict";

  OrdermindLogicalPermissions.addType(my_type, function() {
    //Code for evaluating the type
  });
}); 
```
