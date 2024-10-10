const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

require('electron-reload')(path.join(__dirname), {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
});

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        icon: path.join(__dirname, 'img/icons/icon_yetunes.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        }
    });

    win.loadFile('index.html');
    win.maximize();
}

ipcMain.on('minimize', (event) => {
    BrowserWindow.fromWebContents(event.sender).minimize();
});

ipcMain.on('maximize', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window.isMaximized()) {
        window.restore();
    } else {
        window.maximize();
    }
});

ipcMain.on('close', (event) => {
    BrowserWindow.fromWebContents(event.sender).close();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
