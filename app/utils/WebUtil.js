'use strict';

var WebUtil = {
    addLiveReload: function() {
        if (process.env.NODE_ENV === 'development') {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');

            script.type = 'text/javascript';
            script.src = 'http://localhost:35729/livereload.js';
            head.appendChild(script);
        }
    }
};

module.exports = WebUtil;
