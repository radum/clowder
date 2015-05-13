'use strict';

var app = require('app');
var path = require('path');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var dialog = require('dialog');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        'min-width': 1000,
        'min-height': 700,
        resizable: true,
        frame: false,
        show: true
    });

    // and load the index.html of the app.
    mainWindow.loadUrl(path.normalize('file://' + path.join(__dirname, '..', 'build/index.html')));

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    mainWindow.openDevTools();

    // BrowserWindow.addDevToolsExtension('./devtools/react-devtools');
});

ipc.on('application:open-file', function(event, arg) {
    var parentWindow;

    if (process.platform === 'darwin') {
        parentWindow = null;
    } else {
        parentWindow = BrowserWindow.getFocusedWindow();
    }

    dialog.showOpenDialog(parentWindow, { properties: ['openFile']}, function(filenames) {
        event.sender.send('application:open-file-reply', filenames[0]);
    });
});
