// import { MenuItemConstructorOptions } from "electron";

import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron'
const url = require('url')
const path = require('path')

let MAIN_WIN: Electron.BrowserWindow | null;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
  // Create the browser window.
  MAIN_WIN = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: __dirname + '/favicon.ico',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
      devTools: process.env.NODE_ENV === "production" ? false : true
    }
  });
  MAIN_WIN.loadURL(
    url.format({
      pathname: path.join(__dirname, "/index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // const startUrl = process.env.NODE_ENV === 'development' ?
  //   url.format({
  //     pathname: path.join(__dirname, "../public/index.html"),
  //     protocol: "file:",
  //     slashes: true
  //   }) :
  //   url.format({
  //     pathname: path.join(__dirname, "../dist/index.html"),
  //     protocol: "file:",
  //     slashes: true
  //   })

  // MAIN_WIN.loadURL(startUrl)
  // Open the DevTools.
  // MAIN_WIN.openDevTools();
  MAIN_WIN.on('closed', function () {
    MAIN_WIN = null;
  });
  const MAIN_MENU = Menu.buildFromTemplate(MAIN_WIN_TEMPLATE)
  Menu.setApplicationMenu(MAIN_MENU)
}

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
app.on('ready', createWindow);

app.on("activate", () => {
  if (MAIN_WIN === null) {
    createWindow();
  }
});

let MAIN_WIN_TEMPLATE: MenuItemConstructorOptions[] = [
  {
    label: '文件',
    submenu: [
      {
        role: 'quit',
        label: '关闭',
        // darwin 表示 mac 操作系统
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click: function () {
          app.quit()
        }
      }
    ]
  },
  {
    label: '编辑',
    submenu: [
      {
        role: 'togglefullscreen',
        label: '打开/关闭全屏模式'
      },
      {
        role: 'zoomIn',
        label: '主页面放大10%'
      },
      {
        role: 'zoomOut',
        label: '主页面缩小10%'
      },
      {
        role: 'resetZoom',
        label: '重置主页面为初始大小'
      }
    ]
  }
]
if (process.platform == 'darwin') {
  MAIN_WIN_TEMPLATE.unshift({})
}
//  use to debug in development mode
if (process.env.NODE_ENV !== 'production') {
  MAIN_WIN_TEMPLATE.push({
    label: '开发者工具',
    submenu: [
      {
        role: 'toggleDevTools',
        label: '打开/关闭控制台',
        accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
      },
      {
        role: 'reload',
        label: '重载窗口'
      },
      {
        role: 'forceReload',
        label: '强行重载窗口'
      }
    ]
  })
}