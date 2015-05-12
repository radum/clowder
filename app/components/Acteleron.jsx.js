'use strict';

var React = require('react/addons');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var Acteleron = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function () {
        return (
            <a href="#/about" className="waves-effect waves-light btn-large demo">About</a>
        );
    }
});

module.exports = Acteleron;
