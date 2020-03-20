/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojexpparser","ojs/ojcore-base"],function(n,r){"use strict";
// under MIT License
return function(r){var e=new n;this.createEvaluator=function(n){var t;try{t=e.parse(n)}catch(r){s(r,n)}var u=r?r.globalScope:null;return{evaluate:function(r){var e,c=r;u&&(c=r.concat([u]));try{e=o(t,c)}catch(r){s(r,n)}return e}}};var t={"||":function(n,r){return n||r()},"&&":function(n,r){return n&&r()},"|":function(n,r){return n|r},"^":function(n,r){return n^r},"&":function(n,r){return n&r},"==":function(n,r){return n==r},"!=":function(n,r){return n!=r},"===":function(n,r){return n===r},"!==":function(n,r){return n!==r},"<":function(n,r){return n<r},">":function(n,r){return n>r},"<=":function(n,r){return n<=r},">=":function(n,r){return n>=r},"<<":function(n,r){return n<<r},">>":function(n,r){return n>>r},">>>":function(n,r){return n>>>r},"+":function(n,r){return n+r},"-":function(n,r){return n-r},"*":function(n,r){return n*r},"/":function(n,r){return n/r},"%":function(n,r){return n%r}},u={"-":function(n){return-n},"+":function(n){return n},"~":function(n){return~n},"!":function(n){return!n}};function o(n,r){switch(n.type){case 1:return function(n,r){var e=i(n,r);if(e)return e[r];f("Variable "+r+" is undefined")}(r,n.name);case 2:return a(n,r)[1];case 3:return n.value;case 4:var e,p,l;switch(n.callee.type){case 1:l=function(n,r){var e=i(n,r);if(e)return[e,e[r]];f("Variable "+r+" is undefined")}(r,n.callee.name);break;case 2:l=a(n.callee,r);break;default:p=o(n.callee,r)}return p||(e=l[0],p=l[1]),"function"!=typeof p&&f("Expression is not a function"),p.apply(e,c(n.arguments,r));case 5:return u[n.operator](o(n.argument,r));case 6:return"="===n.operator?function(n,r,e){switch(n.type){case 1:var t=n.name,u=i(r,t);u||f("Cannot assign value to undefined variable "+t),u[t]=e;break;case 2:var c=n.computed?o(n.property,r):n.property.name;a(n,r)[0][c]=e;break;default:f("Expression of type: "+n.type+" not supported for assignment")}return e}(n.left,r,o(n.right,r)):t[n.operator](o(n.left,r),o(n.right,r));case 7:return t[n.operator](o(n.left,r),function(){return o(n.right,r)});case 8:return o(n.test,r)?o(n.consequent,r):o(n.alternate,r);case 9:return c(n.elements,r);case 10:return function(n,r){return n.properties.reduce(function(n,e){return n[e.key]=o(e.value,r),n},{})}(n,r);case 11:return function(n,r){return function(){var e=arguments,t=n.arguments.reduce(function(n,r,t){return n[r.name]=e[t],n},{});t.this=this;try{var u=o(n.body,[t].concat(r));if(n.return)return u}catch(r){s(r,n.expr)}}}(n,r);case 12:return function(n,r){var e=o(n.callee,r);return e instanceof Function||f("Node of type "+n.callee.type+" is not evaluated into a constructor"),new(Function.prototype.bind.apply(e,[null].concat(c(n.arguments,r))))}(n,r);default:f("Unsupported expression type: "+n.type)}}function c(n,r){return n.map(function(n){return o(n,r)})}function a(n,r){var e=o(n.object,r);return n.computed?[e,e[o(n.property,r)]]:[e,e[n.property.name]]}function i(n,r){for(var e=0;e<n.length;e++){var t=n[e];if(t instanceof Object&&r in t)return t}return null}function f(n){throw new Error(n)}function s(n,r){throw new Error(n.message+' in expression "'+r+'"')}}});