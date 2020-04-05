import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron'
import url from 'url'
import path from 'path'

app.allowRendererProcessReuse = true

let MAIN_WIN: Electron.BrowserWindow | null;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
function createWindow() {
  // Create the browser window.
  MAIN_WIN = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 1000,
    minHeight: 800,
    icon: __dirname + '/favicon.ico',
    backgroundColor: '#f2f2f2',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
      devTools: process.env.NODE_ENV === "production" ? false : true
    }
  });
  MAIN_WIN.loadURL(`file://${__dirname}/index.html`);
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