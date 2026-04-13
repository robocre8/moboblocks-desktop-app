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

async function blocksSendCode(event) {
  if (event) event.preventDefault(); 
  
  try {
    const code = pythonGenerator.workspaceToCode(workspace);
    console.log("Generated Code:", code);

    const response = await fetch("http://localhost:8000/code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "code": code })
    });

    if (response.ok) {
      console.log("Code Sent Successfully");
      // alert("Code Sent Successfully");
    }
  } catch (error) {
    console.error("Detailed Error:", error);
  }
}
// document.getElementById('send-btn').addEventListener('click', (event) => {
//     blocksSendCode(event);
// });


function clearBlocks() {
    if (confirm("Are you sure you want to clear all blocks?")) {
        workspace.clear();
        console.log("Cleared");
    }
}
// document.getElementById('clear-btn').addEventListener('click', () => {
//     clearBlocks(); 
// });


document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn-id');
    const clearBtn = document.getElementById('clear-btn-id');

    if (sendBtn) {
        sendBtn.addEventListener('click', (event) => {
            blocksSendCode(event);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            clearBlocks(); 
        });
    }
});