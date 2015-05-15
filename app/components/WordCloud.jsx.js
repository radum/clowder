'use strict';

var React = require('react/addons');

var WordCloud = React.createClass({
    componentDidMount: function() {
        var file = this.props.params.file;

        this.setState({ file: file });
    },
    getInitialState: function() {
        return {
            file: null
        };
    },
    render: function() {
        return (
            <h1>Hello there WordCloud! {this.state.file}</h1>
        );
    }
});

module.exports = WordCloud;
