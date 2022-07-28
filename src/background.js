import 'os'
import { app, protocol, BrowserWindow, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const Store = require('electron-store')

const store = new Store()

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
Menu.setApplicationMenu(null)
let win
async function createWindow() {
  const options = {
    width: 1300,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      webSecurity: false,
      enableRemoteModule: true
    },
    frame: false,
  }
  const bounds = store.get('bounds')
  if (bounds) {
    options.x = bounds.x
    options.y = bounds.y
    options.width = bounds.width
    options.height = bounds.height
  }
  win = new BrowserWindow(options)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }
  win.on('move', () => {
    saveBoundsSoon()
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  await createWindow()
})

let saveBoundsCookie

function saveBoundsSoon() {
  if (saveBoundsCookie) clearTimeout(saveBoundsCookie);
  saveBoundsCookie = setTimeout(() => {
    saveBoundsCookie = undefined
    store.set({bounds: win.getNormalBounds()})
  }, 1000)
}

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
