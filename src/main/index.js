'use strict'

import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import { basicConfig } from './config.js'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
       * Initial window options
       */
    Menu.setApplicationMenu(null)
    mainWindow = new BrowserWindow(basicConfig)
    mainWindow.loadURL(winURL)
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    // 注册页
    let registerWindow
    ipcMain.on('add-register-window', () => {
        registerWindow = new BrowserWindow({
            ...basicConfig, ...{
                height: 550,
                width: 600,
                parent: mainWindow,
                modal: true
            }
        })
        registerWindow.loadURL(`${winURL}#register`)
        registerWindow.once('ready-to-show', () => {
            registerWindow.show()
        })
        registerWindow.on('closed', () => {
            registerWindow = null
        })
    })
    ipcMain.on('close-register-window', () => {
        registerWindow.close()
    })

    // 商品页面
    let productWindow
    ipcMain.on('add-product-window', () => {
        productWindow = new BrowserWindow({
            ...basicConfig, ... {
                height: 550,
                width: 600,
                parent: mainWindow
            }
        })
        productWindow.loadURL(`${winURL}#product`)
        productWindow.once('ready-to-show', () => {
            productWindow.show()
        })
        productWindow.on('closed', () => {
            productWindow = null
        })
    })
    ipcMain.on('close-product-window', () => {
        productWindow.close()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
