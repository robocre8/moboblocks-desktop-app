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
  float_block,
  operation_block,
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
  adv_operation_block,
  trig_operation_block
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
  float_block,
  operation_block,
  adv_operation_block,
  trig_operation_block,

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

const MoboTheme = Blockly.Theme.defineTheme('mobo_theme', {
    'base': Blockly.Themes.Classic,
    'blockStyles': {
        'motion_blocks':   { 'colourPrimary': '#8cc9fc' },
        'sensor_blocks':   { 'colourPrimary': '#80d4cc' },
        'output_blocks':   { 'colourPrimary': '#fea8a8' },
        'logic_blocks':    { 'colourPrimary': '#D1C4E9' },
        'loop_blocks':  { 'colourPrimary': '#C8E6C9' },
        'utility_blocks':  { 'colourPrimary': '#fdd353' }
    },
    'categoryStyles': {
        'motion_category':   { 'colour': '#8cc9fc' },
        'sensor_category':   { 'colour': '#80d4cc' },
        'output_category':   { 'colour': '#fea8a8' },
        'logic_category':    { 'colour': '#D1C4E9' },
        'loop_category':  { 'colour': '#C8E6C9' },
        'utility_category':  { 'colour': '#fdd353' }
    },
    'componentStyles': {
        'workspaceBackgroundColour': '#F9F9F9', // Light grey background like Scratch
        'toolboxBackgroundColour': '#FFFFFF',
        'toolboxTextColour': '#575E75',
        'flyoutBackgroundColour': '#F9F9F9',
        'scrollbarColour': '#CCCCCC',
        'insertionMarkerColour': '#000000',
        'insertionMarkerOpacity': 0.1,
        'fieldTextColor': '#333333',
        'dropdownPlaceholderColour': '#333333'
    }
});

const workspace = Blockly.inject('blocklyDiv', { 
    toolbox: blocksToolbox,
    readOnly: false,
    trashcan: true,           // Shows the trashcan in the corner
    
    // --- ADD SCROLLING HERE ---
    renderer: 'zelos', // 'zelos' is the renderer that emulates Scratch
    theme: MoboTheme, // Provides brighter, Scratch-like colors
    
    move: {
        scrollbars: true,
        drag: true,
        wheel: true
    },
    grid: {
      spacing: 25,         // Comfortable distance between dots/lines
      length: 3,           // Makes them subtle dots instead of long lines
      colour: '#ccc',      // Light grey
      snap: true           // Helps keep blocks organized and aligned
    },
    zoom: {
      controls: true,      // Essential for "infinite" feel
      wheel: true,         // Allows fast navigation
      startScale: 0.75,
      maxScale: 2,
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

function showFeedback(message) {
  const toast = document.getElementById('status-toast');
  toast.innerText = message;
  toast.className = "toast-visible";
  
  // Hide it automatically after 3 seconds
  setTimeout(() => {
    toast.className = "toast-hidden";
  }, 3000);
}

async function sendBlocks(event) {
  if (event) event.preventDefault(); 

  // 1. CRITICAL: Force close any active input fields or dropdowns before moving focus
  if (typeof Blockly !== 'undefined') {
    if (Blockly.WidgetDiv) Blockly.WidgetDiv.hide();
    if (Blockly.DropDownDiv) Blockly.DropDownDiv.hideWithoutAnimation();
  }
  
  // Explicitly remove browser focus from whatever field you are editing
  if (document.activeElement) {
    document.activeElement.blur();
  }
  
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
      showFeedback("CODE SENT SUCCESSFULLY");
    }
  } catch (error) {
    console.error("Detailed Error:", error);
  }
}


async function stop(event) {
  if (event) event.preventDefault();

  // Force close inputs here as well just in case they hit emergency stop while typing
  if (typeof Blockly !== 'undefined' && Blockly.WidgetDiv) {
    Blockly.WidgetDiv.hide();
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/stop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "code": "cool" })
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Robot Stop Signal:", result.status);
      showFeedback("STOP COMMAND SENT");
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