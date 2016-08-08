'use strict'

export default function(router){
    router.map({
        '/': {	
            name: 'home',		
            component: resolve => {
                require(['./views/index.vue'], resolve);
            }
        },
        /* 404路由 */
        '*': {
            component: resolve => {
                // require(['./views/index.vue'], resolve);
            }
        },
        "/line/line": {
            name: 'line',
            component: resolve => {
               require(['./views/_line/line.vue'], resolve);
            },
            auth: true
        },
        "/line/rack": {
            name: "rack",
            component: resolve => {
               require(['./views/_line/rack.vue'], resolve);
            },
            auth: true
        },
        "/line/topo": {
            name: "topo",
            component: resolve => {
               require(['./views/_line/topo.vue'], resolve);
            },
            auth: true
        },
        "/sys/user": {
            name: "user",
            component: resolve => {
               require(['./views/_sys/user.vue'], resolve);
            },
            auth: true
        },
        "/sys/device": {
            name: "device",
            component: resolve => {
               require(['./views/_sys/device.vue'], resolve);
            },
            auth: true
        },
        "/sys/base": {
            name: 'base',
            component: resolve => {
               require(['./views/_sys/base.vue'], resolve);
            },
            auth: true
        },
        "/fault/list": {
            name: "list",
            component: resolve => {
               require(['./views/_fault/list.vue'], resolve);
            },
            auth: true
        },
        "/fault/stat": {
            name: "stat",
            component: resolve => {
               require(['./views/_fault/stat.vue'], resolve);
            },
            auth: true
        },
        "/monitor/pref": {
            name: "pref",
            component: resolve => {
               require(['./views/_monitor/pref.vue'], resolve);
            },
            auth: true
        },
        "/monitor/camera": {
            name: "camera",
            component: resolve => {
               require(['./views/_monitor/camera.vue'], resolve);
            },
            auth: true
        },
        "/monitor/log": {
            name: "log",
            component: resolve => {
               require(['./views/_monitor/log.vue'], resolve);
            },
            auth: true
        },
        '/entry': {
            name: 'entry',
            component: resolve => {
                require(['./views/_entry/entry.vue'], resolve);
            }
        }
    });
}