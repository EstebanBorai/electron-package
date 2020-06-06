import path from 'path';
import { BrowserWindow, app } from 'electron';

enum OperativeSystem {
  MacOS = 'darwin',
  Linux = 'linux',
  Windows = 'win32'
};

enum Environment {
  Production = 'PRODUCTION',
  Staging = 'STAGING',
  Development = 'DEV'
};

function fromNodeEnvironment(): Environment {
  switch (process.env.NODE_ENV) {
    case 'DEV':
      return Environment.Development;
    case 'STAGING':
      return Environment.Staging;
    case 'PRODUCTION':
      return Environment.Production;
    default:
      throw new Error(`Unrecognized environment ${process.env.NODE_ENV}!`);
  }
}

function fromProcessPlatform(): OperativeSystem {
  switch (process.platform) {
    case 'darwin':
      return OperativeSystem.MacOS;
    case 'linux':
      return OperativeSystem.Linux;
    case 'win32':
      return OperativeSystem.Windows;
    default:
      throw new Error(`Platform ${process.platform} is not supported!`);
  }
}

class Application {
  private browserWindow: BrowserWindow | undefined;
  private currentPlatform: OperativeSystem;
  private environment: Environment;

  constructor() {
    this.browserWindow = undefined;
    this.currentPlatform = fromProcessPlatform();
    this.environment = fromNodeEnvironment();
  }

  public start(): void {
    app.on('ready', () => {
      this.browserWindow = this.makeBrowserWindow();
    });

    app.on('window-all-closed', () => {
      if (this.currentPlatform !== OperativeSystem.MacOS) {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with ⌘ + Q
        app.quit();
      }
    });
  }

  private makeBrowserWindow(): BrowserWindow {
    let browserWindow: BrowserWindow;

    if (this.environment === Environment.Development) {
      browserWindow = new BrowserWindow({
        width: 1281,
        height: 800,
        minWidth: 1281,
        minHeight: 800,
        webPreferences: {
          nodeIntegration: true
        }
      });
    } else {
      browserWindow = new BrowserWindow({
        width: 1281,
        height: 800,
        minWidth: 1281,
        minHeight: 800,
        webPreferences: {
          nodeIntegration: true
        },
        titleBarStyle: 'hidden',
        show: false
      });
    }

    if (this.currentPlatform === OperativeSystem.Windows) {
      browserWindow.once('ready-to-show', () => {
        browserWindow.show();
      });
    }

    if (this.environment === Environment.Development) {
      browserWindow.loadURL('http://localhost:8080/');
    } else {
      browserWindow.loadURL(`file://${path.join(__dirname, '../bundle/index.html')}`);
    }

    browserWindow.on('closed', () => {
      this.browserWindow = undefined;
    });

    return browserWindow;
  }
}

export default Application;