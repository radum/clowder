'use strict';

var ipc = require('ipc');

var React = require('react/addons');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var Clowder = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    componentDidMount: function () {
        ipc.on('application:open-file-reply', function(filename) {
            console.log(filename);
        });
    },
    showFileOpenDialog: function() {
        ipc.send('application:open-file');

        // ipc.send('application:open-file', function(files) {
        //     console.log('files');
        // });
    },
    render: function () {
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
