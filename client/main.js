import {app, BrowserWindow} from "electron";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

// --- ADD THESE TWO LINES ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ---------------------------


let pyBackend; // Variable to hold the server process
function startBackend() {
 // We need to point to the server directory
  // '../server' moves up from 'client' into the root, then into 'server'
  const serverPath = path.join(__dirname, '..', 'server');

  // Define the path to the virtual env's python
  // On Windows it's .venv/Scripts/python.exe, on Linux/Mac it's .venv/bin/python
  const venvPath = process.platform === 'win32' 
    ? path.join(serverPath, '.env', 'Scripts', 'python.exe') 
    : path.join(serverPath, '.env', 'bin', 'python');

  pyBackend = spawn(venvPath, [
    '-m', 'uvicorn', 
    'main:app', 
    '--host', 'localhost', 
    '--port', '8000'
  ], {
    cwd: serverPath // This tells the terminal to run the command INSIDE the server folder
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
    width: 1200,
    height: 900,
    title: "Mobo Blocks Desktop",
    // webPreferences: {
    //   nodeIntegration: true,
    //   contextIsolation: false
    // }
  });

  // Load your Blockly frontend
  win.loadFile(path.join(__dirname, 'index.html'));
  // win.loadFile('index.html');
}

app.whenReady().then(() => {
  try {
    startBackend(); 
    createWindow();
  } catch (error) {
    // This catches if the Python server fails to even START
    console.error("Failed to launch Mobo Blocks Backend:", error);
  }
});

// CRITICAL: Kill the Python server when the Electron app closes
app.on('will-quit', () => {
  if (pyBackend) {
    pyBackend.kill();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});