'use strict'

import sock from './sockjs.js';
import stomp from './stomp.js';

let IXW = {};
let AjaxHT = new Map();
let SocketHT = new Map();

function _baseFailFn(data){
	console.log(data);
}

IXW.ajax = (name, params, cbFn, failFn) => {
	$.ajax({
		url: '/path/to/file',
		type: 'default GET (Other values: POST)',
		dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		data: params,
	})
	.done(function(data) {
		cbFn(data);
	})
	.fail(function(data) {
		if (failFn && typeof(failFn) === Function)
			return failFn(data.err);
		_baseFailFn(data);
	})
	.always(function(data) {
		console.log("complete");
	});
};

// function _subscribe(client, arr) {
// 	client.subscribe('/topic/greetings', function(greeting){
//     	GlobalEventProxy.publish('/topic/greetings', greeting);
//     });
// }

IXW.websocket = (arr) => {
	let ws = new SockJS(TCM_BaseUrl);
	let client = Stomp.over(ws);
	client.connect({}, function(frame) {
        _subscribe();
    }, function(err) {
    	if (failFn && typeof(failFn) === Function)
    		return failFn(data.err);
		_baseFailFn(data);
    });
    return client;
};

exports.ajax = IXW.ajax;

exports.websocket = IXW.websocket;