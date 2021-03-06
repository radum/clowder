'use strict';

var React = require('react/addons');

var Header = require('./components/Header.jsx');

var About = require('./components/About.jsx');
var Clowder = require('./components/Clowder.jsx');
var WordCloud = require('./components/WordCloud.jsx');

var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header/>
                <RouteHandler/>
            </div>
        );
    }
});

var routes = (
    <Route handler={App}>
        <Route name="about" path="about" handler={About}/>
        <Route name="wordCloud" handler={WordCloud}/>
        <DefaultRoute name="acteleron" handler={Clowder}/>
    </Route>
);

module.exports = routes;
