// 1. Use the global require for Electron-specific modules
const remote = window.require('@electron/remote');
const { dialog } = remote;

// 2. Use the global require for Node modules
const fs = window.require('fs');

//---------------------------------------------------------
//        BLOCKS FUNCTIONS
//---------------------------------------------------------

async function sendBlocks(event) {
  if (event) event.preventDefault(); 
  
  try {
    const code = pythonGenerator.workspaceToCode(workspace);
    console.log("Generated Code:", code);

    const response = await fetch("http://127.0.0.1:8000/code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "code": code })
    });

    if (response.ok) {
      console.log("Code Sent Successfully");
      alert("CODE SENT SUCCESSFULLY");
    }
  } catch (error) {
    console.error("Detailed Error:", error);
  }
}


async function stop(event) {
  if (event) event.preventDefault();

  try {
    const response = await fetch("http://127.0.0.1:8000/stop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "code": "cool" })
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Robot Stop Signal:", result.status);
      alert("STOP COMMAND SENT");
    }
    
  } catch (error) {
    console.error("Failed to stop robot:", error);
  }
}


function clearBlocks() {
  if (confirm("Are you sure you want to clear all blocks?")) {
    workspace.clear();
    console.log("Cleared");
  }
}

async function saveBlocks() {
  const { filePath } = await dialog.showSaveDialog({
    title: 'Save MoboBlocks Project',
    defaultPath: 'test_program.json',
    filters: [{ name: 'MoboBlocks Files', extensions: ['json'] }]
  });

  if (filePath) {
    const state = Blockly.serialization.workspaces.save(workspace);
    const data = JSON.stringify(state, null, 2); // Prettify the JSON
    fs.writeFileSync(filePath, data);
    console.log("Saved to:", filePath);
  }
}

async function openBlocks() {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'MoboBlocks Files', extensions: ['json'] }]
  });

  if (filePaths && filePaths.length > 0) {
    const data = fs.readFileSync(filePaths[0], 'utf8');
    const json = JSON.parse(data);
    
    // Clear the current workspace before loading the new one
    workspace.clear();
    Blockly.serialization.workspaces.load(json, workspace);
    console.log("Loaded:", filePaths[0]);
  }
}


document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn-id');
    const stopBtn = document.getElementById('stop-btn-id');
    const clearBtn = document.getElementById('clear-btn-id');
    const saveBtn = document.getElementById('save-btn-id');
    const openBtn = document.getElementById('open-btn-id');

    if (sendBtn) {
        sendBtn.addEventListener('click', (event) => {
            sendBlocks(event);
        });
    }

    if (stopBtn) {
        stopBtn.addEventListener('click', (event) => {
            stop(event);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            clearBlocks(); 
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveBlocks(); 
        });
    }

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            openBlocks();
        });
    }

});