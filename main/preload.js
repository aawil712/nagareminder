const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  navigate: (destination) => ipcRenderer.send('navigate', destination),
  saveTodos: (todos) => ipcRenderer.send('save-todos', todos),
  getTodos: () => ipcRenderer.sendSync('get-todos'),
  saveTimerSettings: (settings) => ipcRenderer.send('save-timer-settings', settings),
  getTimerSettings: () => ipcRenderer.sendSync('get-timer-settings')
}); 