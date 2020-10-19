const electron = require('electron');
const url = require('url')
const path = require('path')
var { PythonShell } = require('python-shell');
let pyshell = new PythonShell(__dirname + '/server/run.py')

const { app, BrowserWindow, Menu } = electron;

let mainWindow;


let appReady = () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('close', function (e) {
        console.log('close')
        pyshell.kill('SIGINT')
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
}




let mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit()
                }
            }
        ]
    }
]

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: "Dev",
        submenu: [
            {
                label: 'Tools',
                accelerator: process.platform == 'darwin' ? 'Command+K' : 'Ctrl+K',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }

            }
        ]
    })
}

// app.on('window-all-closed', function () {
//     console.log('window-all-closed')
//     pyshell.kill('SIGINT')
//     pyshell.childProcess.kill('SIGINT')
//     app.quit();
// });

// app.on('will-quit', function () {
//     // This is a good place to add tests insuring the app is still
//     // responsive and all windows are closed.
//     console.log('will-quit')
//     pyshell.kill('SIGINT')
//     pyshell.childProcess.kill('SIGINT')
//     console.log("will-quit");
//     mainWindow = null;
// });


// pyshell.end(function (err, code, signal) {
//     console.log("herre");
//     pyshell.kill('SIGINT')
//     pyshell.childProcess.kill('SIGINT')
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log('The exit code was: ' + code);
//         console.log('The exit signal was: ' + signal);
//         console.log('finished');
//     }
// });



app.on('ready', appReady);
