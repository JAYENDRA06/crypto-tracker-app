const axios = require('axios');
const path = require("path");
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  showNotification: (title, options) => {
    ipcRenderer.send("show-notification", title, options);
  },
  setValue: (value) => ipcRenderer.send('set-value',  value),
  getValue: (channel, callback) => {
    ipcRenderer.on(channel, (event, value) => callback(value));
  }
});

contextBridge.exposeInMainWorld('path', path);
contextBridge.exposeInMainWorld('__dirname', __dirname);

contextBridge.exposeInMainWorld('myAPI', {
  get: async (url) => {
    const response = await axios.get(url);
    return response.data;
  },
});

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
