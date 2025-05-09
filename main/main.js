const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();

let mainWindow;
let splashWindow;

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 600,
    height: 600,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  splashWindow.loadFile(path.join(__dirname, '../views/splash.html'));
  
  splashWindow.on('closed', () => {
    splashWindow = null;
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    minWidth: 600,
    minHeight: 600,
    maxWidth: 600,
    maxHeight: 600,
    show: false,
    resizable: false,
    autoHideMenuBar: true, // Hides the menu bar
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../assets/Logo.png')
  });

  mainWindow.loadFile(path.join(__dirname, '../views/welcome.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    if (splashWindow) {
      setTimeout(() => {
        splashWindow.close();
        mainWindow.show();
      }, 2000); // Show splash for 2 seconds
    } else {
      mainWindow.show();
    }
  });
}

app.on('ready', () => {
  createSplashWindow();
  createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// IPC handlers for navigation
ipcMain.on('navigate', (event, destination) => {
  mainWindow.loadFile(path.join(__dirname, `../views/${destination}.html`));
});

// IPC handlers for todos
ipcMain.on('save-todos', (event, todos) => {
  store.set('todos', todos);
});

ipcMain.on('get-todos', (event) => {
  const todos = store.get('todos') || [];
  event.returnValue = todos;
});

// IPC handlers for timer settings
ipcMain.on('save-timer-settings', (event, settings) => {
  store.set('timer-settings', settings);
});

ipcMain.on('get-timer-settings', (event) => {
  const settings = store.get('timer-settings') || {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false
  };
  event.returnValue = settings;
}); 