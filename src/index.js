const { app, BrowserWindow, Menu, ipcMain, Notification } = require("electron");
const path = require("path");
const shell = require("electron").shell;
let alertValue = "";

let mainWindow;
let subWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  subWindow = new BrowserWindow({
    width: 500,
    height: 200,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const template = [
    {
      label: "Menu",
      submenu: [
        { label: "Ajust notifcation value" },
        {
          label: "CoinMarketCap",
          click() {
            shell.openExternal("https://coinmarketcap.com/");
          },
        },
        { type: "separator" },
        {
          label: "Exit",
          click() {
            app.quit();
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.loadFile(path.join(__dirname, "index.html"));
  subWindow.loadFile(path.join(__dirname, "add.html"));

  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("show-notification", (event, title, options) => {
  new Notification({ title, ...options }).show();
});

ipcMain.on('set-value', (event, value) => {
  alertValue = value;
  mainWindow.webContents.send('get-value', alertValue);
})