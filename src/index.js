const { app, BrowserWindow, Menu, ipcMain, Notification } = require("electron");
const path = require("path");
const shell = require("electron").shell;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
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

  mainWindow.webContents.openDevTools();
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
