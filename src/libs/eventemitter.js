'use strict'

var EventEmitter2 = require('eventemitter2').EventEmitter2;
var globalBus = new EventEmitter2({
	//
	// set this to `true` to use wildcards. It defaults to `false`.
	//
	wildcard: true,

	//
	// the delimiter used to segment namespaces, defaults to `.`.
	//
	delimiter: '::', 

	//
	// set this to `true` if you want to emit the newListener event. The default value is `true`.
	//
	newListener: false, 

	//
	// the maximum amount of listeners that can be assigned to an event, default 10.
	//
	maxListeners: 20
});

var eventBus = new EventEmitter2({
	//
	// set this to `true` to use wildcards. It defaults to `false`.
	//
	wildcard: true,

	//
	// the delimiter used to segment namespaces, defaults to `.`.
	//
	delimiter: '::', 

	//
	// set this to `true` if you want to emit the newListener event. The default value is `true`.
	//
	newListener: false, 

	//
	// the maximum amount of listeners that can be assigned to an event, default 10.
	//
	maxListeners: 50
});

module.exports = {
	globalBus: globalBus,
	eventBus: eventBus
};

// class EventProxy {
// 	publish (event, greeting) {
// 		eventBus.emit(event, greeting);
// 	}
// }

// window.GlobalEventProxy = new EventProxy();