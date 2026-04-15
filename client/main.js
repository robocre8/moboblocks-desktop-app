import {app, BrowserWindow} from "electron";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, exec, execSync } from 'node:child_process';

import * as remoteMain from '@electron/remote/main/index.js';
remoteMain.initialize();

// --- ADD THESE TWO LINES ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ---------------------------


let pyBackend; // Variable to hold the server process
function startBackend() {

  // // We need to point to the server directory
  // // '../server' moves up from 'client' into the root, then into 'server'
  // const serverPath = path.join(__dirname, '..', 'server');

  // // Define the path to the virtual env's python
  // // On Windows it's .venv/Scripts/python.exe, on Linux/Mac it's .venv/bin/python
  // const venvPath = process.platform === 'win32' 
  //   ? path.join(serverPath, '.env', 'Scripts', 'python.exe') 
  //   : path.join(serverPath, '.env', 'bin', 'python');

  // pyBackend = spawn(venvPath, [
  //   '-m', 'uvicorn', 
  //   'main:app', 
  //   '--host', '127.0.0.1', 
  //   '--port', '8000'
  // ], {
  //   cwd: serverPath, // This tells the terminal to run the command INSIDE the server folder
  //   shell: false,
  //   detached: false
  // });


  


  // // We need to point to the server directory
  // const serverPath = path.join(__dirname, 'resources');
  
  // const serverExe = process.platform === 'win32' 
  //   ? path.join(serverPath, 'mobobot_server.exe') 
  //   : path.join(serverPath, 'mobobot_server');

  // pyBackend = spawn(serverExe, {
  //   cwd: serverPath,
  //   shell: false,
  //   detached: false
  // });





  let serverPath;

  if (app.isPackaged) {
    // Path when the app is built/installed
    serverPath = path.join(process.resourcesPath, 'mobobot_server');
  } else {
    // Path during development
    serverPath = path.join(__dirname, 'resources', 'mobobot_server');
  }

  // Add .exe for Windows users
  const cmd = process.platform === 'win32' ? `${serverPath}.exe` : serverPath;

  pyBackend = spawn(cmd, ['--port', '8000'], {
    // Ensure the server runs in its own directory to find internal files
    cwd: path.dirname(cmd),
    shell: false,
    detached: false
  });





  pyBackend.stdout.on('data', (data) => {
    console.log(`Python Output: ${data}`);
  });

  pyBackend.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: "MoboBlocks Desktop",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });

  remoteMain.enable(win.webContents);

  // Load your Blockly frontend
  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  try {
    startBackend(); 
    createWindow();
  } catch (error) {
    // This catches if the Python server fails to even START
    console.error("Failed to launch MoboBlocks Backend:", error);
  }
});


function killBackend() {
  if (pyBackend) {
    console.log("Terminating backend process...");
    if (process.platform === 'win32') {
      // Force kill the process tree (/T) and force (/F)
      exec(`taskkill /pid ${pyBackend.pid} /T /F`, (err) => {
        if (err) console.error("Taskkill failed:", err);
      });
    } else {
      pyBackend.kill('SIGKILL');
    }
    pyBackend = null;
  }
}

// Triggered when all windows are closed
app.on('window-all-closed', () => {
  killBackend();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Triggered just before the app exits
app.on('will-quit', () => {
  killBackend();
});