import { app, BrowserWindow, dialog } from 'electron';
import { autoUpdater, ProgressInfo, UpdateDownloadedEvent } from 'electron-updater';

export const init = (mainWindow: BrowserWindow): void => {
  autoUpdater.autoDownload = false;
  initEvent(mainWindow);
  autoUpdater.checkForUpdates();
}

const initEvent = (mainWindow: BrowserWindow) => {
  autoUpdater.on('update-available', () => {
    mainWindow?.webContents.send('updateMessage', 'update-available');
    autoUpdater.downloadUpdate();
    dialog.showMessageBox({
      type: "info",
      title: "Update Available",
      message: "A new version is available. Downloading now...",
    });
  });

  autoUpdater.on('update-not-available', () => {
    mainWindow?.webContents.send('updateMessage', `No update available. Current version ${app.getVersion()}`);
  });

  autoUpdater.on('download-progress', (progress: ProgressInfo) => {
    mainWindow?.webContents.send('updateMessage', `
      Downloaded: ${progress.transferred}/${progress.total} - Speed: ${progress.bytesPerSecond}/s - % done: ${progress.percent}
    `);
  });

  autoUpdater.on('update-downloaded', (event: UpdateDownloadedEvent) => {
    mainWindow?.webContents.send('updateMessage', `Update downloaded. New version ${event.version}`);dialog.showMessageBox({
      type: "info",
      title: "Update Ready",
      message: "Update downloaded. Application will now restart.",
    }).then(() => {
      autoUpdater.quitAndInstall();
    });
  });

  autoUpdater.on('error', (info) => {
    mainWindow?.webContents.send('updateMessage', info.message);
  });

}
