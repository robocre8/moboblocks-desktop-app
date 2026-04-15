// 1. Use the global require for Electron-specific modules
const remote = window.require('@electron/remote');
const { dialog } = remote;

// 2. Use the global require for Node modules
const fs = window.require('fs');

import {blocksToolbox} from './blocks_toolbox.js';
import {
  if_else_block,
  forever_block,
  repeat_block,
  while_block,
  compare_block,
  integer_block,
  servo_angle_block,
  motor_control_pwm_block,
  motor_control_vel_block,
  robot_control_block,
  stop_block,
  read_sonar_block,
  read_line_sensor_block,
  buzzer_block,
  rgb_led_block,
  delay_block,
  print_block
} from './blocks_definitions.js';







//---------------------------------------------------------
//        BLOCKS DEFINITIONS
//---------------------------------------------------------

const blocksDefinitions = [
  if_else_block,
  forever_block,
  repeat_block,
  while_block,
  compare_block,
  integer_block,

  servo_angle_block,
  motor_control_pwm_block,
  motor_control_vel_block,
  robot_control_block,
  stop_block,

  read_sonar_block,
  read_line_sensor_block,

  buzzer_block,
  rgb_led_block,
  
  delay_block,
  print_block,              
];

Blockly.defineBlocksWithJsonArray(blocksDefinitions);

//---------------------------------------------------------







//---------------------------------------------------------
//        BLOCKS PYTHON GENERATORS
//---------------------------------------------------------

import { pythonGenerator } from './blocks_generator.js';

//--------------------------------------------------------







//---------------------------------------------------------
//        BLOCKS WORKSPACE
//---------------------------------------------------------

const workspace = Blockly.inject('blocklyDiv', { 
    toolbox: blocksToolbox,
    theme: Blockly.Themes.Modern,
    trashcan: true,           // Shows the trashcan in the corner
    
    // --- ADD SCROLLING HERE ---
    move: {
        scrollbars: {
            vertical: true,
            horizontal: true
        },
        drag: true,           // Allows clicking and dragging the background to pan
        wheel: true           // Allows using the mouse wheel to scroll/zoom
    },
    zoom: {
        controls: true,       // Shows +/- zoom buttons
        wheel: true,          // Zoom with mouse wheel
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
    }
});

window.addEventListener('resize', () => {
  Blockly.svgResize(workspace);
});

//------------------------------------------------------








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
    title: 'Save TexaBlocks Project',
    defaultPath: 'my_robot_program.json',
    filters: [{ name: 'TexaBlocks Files', extensions: ['json', 'texa'] }]
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
    filters: [{ name: 'TexaBlocks Files', extensions: ['json', 'texa'] }]
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