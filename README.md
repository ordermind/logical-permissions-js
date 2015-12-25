# logical-permissions

This is a generic library that provides support for object-based permissions with logic gates such as AND and OR. You can register any kind of permission types such as roles and flags. The idea with this library is to be an ultra-flexible foundation that can be used by any framework.

## Getting started

### Installation

`npm install logical-permissions`

### Usage

The main api method is [`LogicalPermissions::checkAccess()`](#checkaccess), which checks the access for a **permission tree**. A permission tree is a bundle of permissions that apply to a specific action. Let's say for example that you want to restrict access for updating a user. You'd like only users with the role "admin" to be able to update any user, but users should also be able to update their own user data (or at least some of it). With the structure this package provides, these conditions could be expressed elegantly in a permission tree as such:

```javascript
{
  'OR': {
    'role': 'admin',
    'flag': 'is_author'
  }
}
```

In this example `role` and `flag` are the evaluated permission types. For this example to work you will need to register the permission types 'role' and 'flag' so that the class knows which callbacks are responsible for evaluating the respective permission types. You can do that with [`LogicalPermissions::addType()`](#addtype).

### Bypassing permissions
This packages also supports rules for bypassing permissions completely for superusers. In order to use this functionality you need to register a callback with [`LogicalPermissions::setBypassCallback()`](#setbypasscallback). The registered callback will run on every permission check and if it returns `true`, access will automatically be granted. If you want to make exceptions you can do so by adding `'no_bypass': true` to the first level of a permission tree. You can even use permissions as conditions for `no_bypass`.

Examples: 

```javascript
//Disallow access bypassing
{
  'no_bypass': true,
  'role': 'editor'
}
```

```javascript
//Disallow access bypassing only if the user is an admin
{
  'no_bypass': {
    'role': 'admin'
  },
  'role': 'editor'
}
```

## Logic gates

Currently supported logic gates are [AND](#and), [NAND](#nand), [OR](#or), [NOR](#nor), [XOR](#xor) and [NOT](#not). You can put logic gates anywhere in a permission tree and nest them to your heart's content. All logic gates support an object or array as their value, except the NOT gate which has special rules. If an object of values does not have a logic gate as their key, an OR gate will be assumed. The same rule applies for an array of values.

### AND

A logic AND gate returns true if all of its children return true. Otherwise it returns false.

Examples:

```javascript
//Allow access only if the user is both an editor and a sales person
{
  'role': {
    'AND': ['editor', 'sales']
  }
}
```

```javascript
//Allow access if the user is both a sales person and the author of the document
{
  'AND': {
    'role': 'sales',
    'flag': 'is_author'
  }
}
```

### NAND

A logic NAND gate returns true if one or more of its children returns false. Otherwise it returns false.

Examples:

```javascript
//Allow access by anyone except if the user is both an editor and a sales person
{
  'role': {
    'NAND': ['editor', 'sales']
  }
}
```

```javascript
//Allow access by anyone, but not if the user is both a sales person and the author of the document.
{
  'NAND': {
    'role': 'sales',
    'flag': 'is_author'
  }
}
```

### OR

A logic OR gate returns true if one or more of its children returns true. Otherwise it returns false.

Examples:

```javascript
//Allow access if the user is either an editor or a sales person, or both.
{
  'role': {
    'OR': ['editor', 'sales']
  }
}
```

```javascript
//Allow access if the user is either a sales person or the author of the document, or both
{
  'OR': {
    'role': 'sales',
    'flag': 'is_author'
  }
}
```

### NOR

A logic NOR gate returns true if all of its children returns false. Otherwise it returns false.

Examples: 

```javascript
//Allow access if the user is neither an editor nor a sales person
{
  'role': {
    'NOR': ['editor', 'sales']
  }
}
```

```javascript
//Allow neither sales people nor the author of the document to access it
{
  'NOR': {
    'role': 'sales',
    'flag': 'is_author'
  }
}
```


### XOR

A logic XOR gate returns true if one or more of its children returns true and one or more of its children returns false. Otherwise it returns false. An XOR gate requires a minimum of two elements in its value array or object.

Examples:

```javascript
//Allow access if the user is either an editor or a sales person, but not both
{
  'role': {
    'XOR': ['editor', 'sales']
  }
}
```

```javascript
//Allow either sales people or the author of the document to access it, but not if the user is both a sales person and the author
{
  'XOR': {
    'role': 'sales',
    'flag': 'is_author'
  }
}
```

### NOT

A logic NOT gate returns true if its child returns false, and vice versa. The NOT gate is special in that it supports either a string or an object with a single element as its value.

Examples:

```javascript
//Allow access for anyone except editors
{
  'role': {
    'NOT': 'editor'
  }
}
```

```javascript
//Allow access for anyone except the author of the document
{
  'NOT': {
    'flag': 'is_author'
  }
}
```


## API Documentation
