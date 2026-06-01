// ---------- MOVEMENTS ------------

export const servo_angle_block = {
  "type": "servo_angle_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "servo %1 angle %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "LABEL_NUM",
      "options": [
        [
          "A",
          "1"
        ],
        [
          "B",
          "2"
        ]
      ]
    },
    {
      "type": "field_number",
      "name": "ANGLE",
      "value": 0,
      "min": -90,
      "max": 90
    },
    {
      "type": "input_dummy",
      "name": "servo angle"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  // "colour": 225,
  "style": "motion_blocks"
}

export const motor_control_pwm_block = {
  "type": "motor_control_pwm_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "motor control (PWM):   L %1 R %2 %3",
  "args0": [
    {
      "type": "field_number",
      "name": "L_PWM",
      "value": 100,
      "min": -255,
      "max": 255,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "R_PWM",
      "value": 100,
      "min": -255,
      "max": 255,
      "precision": 1
    },
    {
      "type": "input_dummy",
      "name": "motor control_pwm"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  // "colour": 225,
  "style": "motion_blocks"
}

export const motor_control_vel_block = {
  "type": "motor_control_vel_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "motor control (VEL):   L %1 R %2 %3",
  "args0": [
    {
      "type": "field_number",
      "name": "L_VEL",
      "value": 3.14,
      "min": -8.00,
      "max": 8.00,
      "precision": 0.01
    },
    {
      "type": "field_number",
      "name": "R_VEL",
      "value": 3.14,
      "min": -8.00,
      "max": 8.00,
      "precision": 0.01
    },
    {
      "type": "input_dummy",
      "name": "motor control_vel"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  // "colour": 225,
  "style": "motion_blocks"
}

export const robot_control_block = {
  "type": "robot_control_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "robot control:   V %1 W %2 %3",
  "args0": [
    {
      "type": "field_number",
      "name": "LINEAR",
      "value": 0.1,
      "min": -0.3,
      "max": 0.3,
      "precision": 0.01
    },
    {
      "type": "field_number",
      "name": "ANGULAR",
      "value": 0.5,
      "min": -0.9,
      "max": 0.9,
      "precision": 0.05
    },
    {
      "type": "input_dummy",
      "name": "robot_control"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  // "colour": 225,
  "style": "motion_blocks"
}

export const stop_block = {
  "type": "stop_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "stop %1",
  "args0": [
    {
      "type": "input_dummy",
      "name": "stop_label"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  // "colour": 225,
  "style": "motion_blocks"
}


// ---------- MATHS/CONDITIONS ------------------

export const if_else_block = {
  "type": "if_else_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "if %1 do %2 else %3",
  "args0": [
    {
      "type": "input_value",
      "name": "CONDITION",
      "check": "Boolean"
    },
    {
      "type": "input_statement",
      "name": "DO"
    },
    {
      "type": "input_statement",
      "name": "ELSE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  // "colour": 225,
  "style": "logic_blocks"
}

export const compare_block = {
  "type": "compare_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "%1 %2 %3 %4",
  "args0": [
    {
      "type": "input_value",
      "name": "A",
      "check": "Number"
    },
    {
      "type": "field_dropdown",
      "name": "OPTION",
      "options": [
        [
          "equal to",
          "=="
        ],
        [
          "not equal to",
          "!="
        ],
        [
          "greater than",
          ">"
        ],
        [
          "greater or equal to",
          ">="
        ],
        [
          "less than",
          "<"
        ],
        [
          "less or equal to",
          "<="
        ]
      ]
    },
    {
      "type": "input_dummy",
      "name": "OPT"
    },
    {
      "type": "input_value",
      "name": "B",
      "check": "Number"
    }
  ],
  "output": null,
  // "colour": 225,
  "style": "logic_blocks"
}

export const integer_block = {
  "type": "integer_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "int %1 %2",
  "args0": [
    {
      "type": "field_number",
      "name": "INT",
      "value": 1,
      "min": -10000,
      "max": 10000,
      "precision": 1
    },
    {
      "type": "input_dummy",
      "name": "NUMBER"
    }
  ],
  "output": "Number",
  // "colour": 225,
  "style": "logic_blocks"
}

export const float_block = {
  "type": "float_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "float %1 %2",
  "args0": [
    {
      "type": "field_number",
      "name": "FLOAT",
      "value": 0,
      "precision": 0.001
    },
    {
      "type": "input_dummy",
      "name": "float_input"
    }
  ],
  "output": "Number",
  // "colour": 225,
  "style": "logic_blocks"
}


export const operation_block = {
  "type": "operation_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "%1 %2 %3 %4",
  "args0": [
    {
      "type": "input_value",
      "name": "FLOAT1",
      "check": "Number"
    },
    {
      "type": "field_dropdown",
      "name": "OPERATION",
      "options": [
        [
          "+",
          "+"
        ],
        [
          "-",
          "-"
        ],
        [
          "x",
          "*"
        ],
        [
          "/",
          "/"
        ],
        [
          "^",
          "^"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "name": "operation_input"
    },
    {
      "type": "input_value",
      "name": "FLOAT2",
      "check": "Number"
    }
  ],
  "output": "Number",
  // "colour": 225,
  "style": "logic_blocks"
}


export const adv_operation_block = {
  "type": "adv_operation_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "ADV_OPERATION",
      "options": [
        [
          "square root",
          "sqrt"
        ],
        [
          "absolute",
          "abs"
        ],
        [
          "toInt",
          "int"
        ],
        [
          "toFloat",
          "float"
        ],
        [
          "e^",
          "exp"
        ],
        [
          "10^",
          "10*exp"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "FLOAT",
      "check": "Number"
    }
  ],
  "output": "Number",
  // "colour": 225,
  "style": "logic_blocks"
}

export const trig_operation_block = {
  "type": "trig_operation_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "TRIG_OPERATION",
      "options": [
        [
          "sin",
          "sin"
        ],
        [
          "cos",
          "cos"
        ],
        [
          "tan",
          "tan"
        ],
        [
          "asin",
          "asin"
        ],
        [
          "acos",
          "acos"
        ],
        [
          "atan",
          "atan"
        ],
        [
          "toDegree",
          "toDeg"
        ],
        [
          "toRadians",
          "toRad"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "FLOAT",
      "check": "Number"
    }
  ],
  "output": null,
  // "colour": 225,
  "style": "logic_blocks"
}


// ---------- LOOP ------------------

export const while_block = {
  "type": "while_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "while %1 do %2",
  "args0": [
    {
      "type": "input_value",
      "name": "WHILE",
      "check": "Boolean"
    },
    {
      "type": "input_statement",
      "name": "DO"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  // "colour": 285,
  "style": "loop_blocks"
}

export const forever_block = {
  "type": "forever_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "forever %1 do %2",
  "args0": [
    {
      "type": "input_dummy",
      "name": "FOREVER"
    },
    {
      "type": "input_statement",
      "name": "DO"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  // "colour": 315,
  "style": "loop_blocks"
}

export const repeat_block = {
  "type": "repeat_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "repeat %1 %2 do %3",
  "args0": [
    {
      "type": "field_number",
      "name": "NUM_OF_REPEAT",
      "value": 0,
      "min": 0,
      "max": 20,
      "precision": 1
    },
    {
      "type": "input_dummy",
      "name": "REPEAT"
    },
    {
      "type": "input_statement",
      "name": "DO"
    }
  ],
  // "colour": 330,
  "style": "loop_blocks"
}

// ------------ SENSOR ----------------

export const read_sonar_block = {
  "type": "read_sonar_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "read sonar %1",
  "args0": [
    {
      "type": "input_dummy",
      "name": "SONAR_DISTANCE"
    }
  ],
  "output": null,
  // "colour": 165,
  "style": "sensor_blocks"
}

export const read_line_sensor_block = {
  "type": "read_line_sensor_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "read line sensor %1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "SENSOR_LABEL_NUM",
      "options": [
        [
          "A",
          "1"
        ],
        [
          "B",
          "2"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "name": "NAME"
    }
  ],
  "output": null,
  // "colour": 225,
  "style": "sensor_blocks"
}


// ----------- OUTPUTS ----------------

export const buzzer_block = {
  "type": "buzzer_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "buzzer %1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "VALUE",
      "options": [
        [
          "ON",
          "1"
        ],
        [
          "OFF",
          "0"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "name": "BUZZER"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  // "colour": 225,
  "style": "output_blocks"
}

export const rgb_led_block = {
  "type": "rgb_led_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "rgb led %1 %2 %3 %4",
  "args0": [
    {
      "type": "field_number",
      "name": "R_VAL",
      "value": 0,
      "min": 0,
      "max": 255,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "G_VAL",
      "value": 0,
      "min": 0,
      "max": 255,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "B_VAL",
      "value": 0,
      "min": 0,
      "max": 255,
      "precision": 1
    },
    {
      "type": "input_dummy",
      "name": "rgb led"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  // "colour": 225,
  "style": "output_blocks"
}


// ----------- UTILITIES ---------------

export const delay_block = {
  "type": "delay_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "delay %1 %2",
  "args0": [
    {
      "type": "field_number",
      "name": "DELAY_MS",
      "value": 1000,
      "min": 0,
      "max": 10000,
      "precision": 100
    },
    {
      "type": "input_dummy",
      "name": "delay_time"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  // "colour": 180,
  "style": "utility_blocks"
}

export const print_block = {
  "type": "print_block",
  "tooltip": "",
  "helpUrl": "",
  "message0": "print %1 %2",
  "args0": [
    {
      "type": "field_input",
      "name": "TEXT",
      "text": "enter text"
    },
    {
      "type": "input_dummy",
      "name": "PRINT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  // "colour": 330,
  "style": "utility_blocks"
}

// --------------------------------
