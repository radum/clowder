'use strict';

var React = require('react');

var router = require('./router');
var webUtil = require('./utils/WebUtil');

webUtil.addLiveReload();

router.run(Handler => React.render(<Handler/>, document.body));
