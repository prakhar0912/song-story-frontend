const electron = require('electron');
const url = require('url')
const path = require('path')

const { app, BrowserWindow, Menu } = electron;

let mainWindow;


let appReady = () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

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






app.on('ready', appReady);
