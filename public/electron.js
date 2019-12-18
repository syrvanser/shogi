const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
//const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');



let mainWindow;
function createWindow() {

    Menu.setApplicationMenu(null);

    mainWindow = new BrowserWindow({
        width: 900, height: 680, 'minHeight': 300, 'minWidth': 600, webPreferences: {
            nodeIntegration: true,
        }
    });

    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );


    if (isDev) {
        mainWindow.webContents.openDevTools()
        //installExtension(REACT_DEVELOPER_TOOLS)
        //.then((name) => console.log(`Added Extension:  ${name}`))
        //.catch((err) => console.log('An error occurred: ', err));

    }
    mainWindow.on('closed', () => (mainWindow = null));

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

const fesaPlayers = [];
const cheerio = require('cheerio');
const request = require('request');
request({
    url: 'http://www.shogi.net/fesa/index.php?mid=5',
    encoding: 'latin1'
}, (error, response, html) => {

    if (!error && response.statusCode === 200) {
        let $ = cheerio.load(html);
        $('#content p table tbody').children().each(function (i, element) {
            if ($(this).children().length >= 7) {
                let surname = $(this).children()[1].children[0].children[0].data;
                let name = $(this).children()[2].children[0].children[0].data;
                let grade = (($(this).children()[3].children[0] === undefined ? "" : $(this).children()[3].children[0].data));
                if ($(this).children().length === 8) {
                    grade = (($(this).children()[4].children[0] === undefined ? "" : $(this).children()[4].children[0].data));
                }
                let elo = $(this).children().length === 8 ? $(this).children()[5].children[0].data : $(this).children()[4].children[0].data;
                let player = {
                    name: name + " " + surname,
                    grade: grade,
                    elo: parseInt(elo)
                };
                fesaPlayers.push(player);
            }
        });


    }

    if (fesaPlayers.length !== 0) {
        let data = { timestamp: new Date(), players: fesaPlayers };
        fs.writeFile('data.json', JSON.stringify(data), function (err) { });
        ipcMain.on('window-ready', () => mainWindow.webContents.send("fesa-players", fesaPlayers));
    }
});

