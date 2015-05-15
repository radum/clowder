'use strict';

var ipc = require('ipc');
var remote = require('remote');
var dialog = remote.require('dialog');

var React = require('react/addons');
var Router = require('react-router');

var Clowder = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    mixins: [Router.Navigation],
    componentDidMount: function() {
        ipc.on('application:open-file-reply', function(filename) {
            console.log(filename);
        });
    },
    showFileOpenDialog: function() {
        // no need for thse anymore
        // ipc.send('application:open-file');

        var _this = this;

        dialog.showOpenDialog({properties: ['openFile']}, function(filename) {
            console.log(filename);
            _this.transitionTo('wordCloud', {file: filename});
        });
    },
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div className="section">
                            <h5>Please load a data file</h5>
                        </div>
                        <div className="divider"></div>

                        <a href="#" className="waves-effect waves-light btn-large demo" onClick={this.showFileOpenDialog}>Browse ...</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Clowder;
