define([],function(){"use strict";function a(){Object.defineProperty(this,"LEVEL_NONE",{value:0,enumerable:!0}),Object.defineProperty(this,"LEVEL_ERROR",{value:1,enumerable:!0}),Object.defineProperty(this,"LEVEL_WARN",{value:2,enumerable:!0}),Object.defineProperty(this,"LEVEL_INFO",{value:3,enumerable:!0}),Object.defineProperty(this,"LEVEL_LOG",{value:4,enumerable:!0}),Object.defineProperty(this,"_METHOD_ERROR",{value:"error"}),Object.defineProperty(this,"_METHOD_WARN",{value:"warn"}),Object.defineProperty(this,"_METHOD_INFO",{value:"info"}),Object.defineProperty(this,"_METHOD_LOG",{value:"log"}),Object.defineProperty(this,"_defaultOptions",{value:{level:this.LEVEL_ERROR,writer:null}}),Object.defineProperty(this,"_options",{value:this._defaultOptions,writable:!0})}function b(a,d,e,f){var g=a;if(!(g.option("level")<d)){var h=c(g);if(null!=h){if(1==f.length&&f[0]instanceof Function){var i=f[0]();f=[i]}h[e]&&h[e].apply?h[e].apply(h,f):h[e]&&(h[e]=Function.prototype.bind.call(h[e],h),b(g,d,e,f))}}}function c(a){var b=a,c=null;return b.option("writer")?c=b.option("writer"):"undefined"!=typeof window&&void 0!==window.console?c=window.console:"undefined"!=typeof console&&(c=console),c}return a.prototype.error=function(a){b(this,this.LEVEL_ERROR,this._METHOD_ERROR,arguments)},a.prototype.info=function(a){b(this,this.LEVEL_INFO,this._METHOD_INFO,arguments)},a.prototype.warn=function(a){b(this,this.LEVEL_WARN,this._METHOD_WARN,arguments)},a.prototype.log=function(a){b(this,this.LEVEL_LOG,this._METHOD_LOG,arguments)},a.prototype.option=function(a,b){var c,d={};if(0==arguments.length){for(c in this._options)this._options.hasOwnProperty(c)&&(d[c]=this._options[c]);return d}if("string"==typeof a&&void 0===b)return void 0===this._options[a]?null:this._options[a];if("string"==typeof a)this._options[a]=b;else{var e=a;for(c in e)e.hasOwnProperty(c)&&this.option(c,e[c])}},new a});