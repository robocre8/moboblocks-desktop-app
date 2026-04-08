const moboBlockDefinitions = [
  {
    "type": "move_block",
    "tooltip": "",
    "helpUrl": "",
    "message0": "MOVE %1 Direction: %2 %3 Speed (m/s): %4 %5",
    "args0": [
      {
        "type": "input_dummy",
        "name": "move_label"
      },
      {
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          [
            "forward",
            "FORWARD"
          ],
          [
            "backward",
            "BACKWARD"
          ],
          [
            "",
            ""
          ]
        ]
      },
      {
        "type": "input_dummy",
        "name": "move_direction"
      },
      {
        "type": "field_number",
        "name": "SPEED",
        "value": 0.1,
        "min": 0.0,
        "max": 0.3,
        "precision": 0.01
      },
      {
        "type": "input_dummy",
        "name": "move_speed"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225
  },

  {
    "type": "turn_block",
    "tooltip": "",
    "helpUrl": "",
    "message0": "TURN %1 Direction: %2 %3 Speed (rad/s):  %4 %5",
    "args0": [
      {
        "type": "input_dummy",
        "name": "turn_label"
      },
      {
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          [
            "left",
            "LEFT"
          ],
          [
            "right",
            "RIGHT"
          ]
        ]
      },
      {
        "type": "input_dummy",
        "name": "turn_direction"
      },
      {
        "type": "field_number",
        "name": "SPEED",
        "value": 0.5,
        "min": 0,
        "max": 0.9,
        "precision": 0.05
      },
      {
        "type": "input_dummy",
        "name": "turn_speed"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 90
  },
  
  {
    "type": "delay_block",
    "tooltip": "",
    "helpUrl": "",
    "message0": "Delay: %1 %2",
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
    "colour": 180
  },

  {
    "type": "stop_block",
    "tooltip": "",
    "helpUrl": "",
    "message0": "STOP %1",
    "args0": [
      {
        "type": "input_dummy",
        "name": "stop_label"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 0
  },

  {
    "type": "drive_block",
    "tooltip": "",
    "helpUrl": "",
    "message0": "DRIVE %1 Linear (m/s): %2 %3 Angular (rad/s): %4 %5",
    "args0": [
      {
        "type": "input_dummy",
        "name": "drive_label"
      },
      {
        "type": "field_number",
        "name": "LINEAR",
        "value": 0.1,
        "min": -0.3,
        "max": 0.3,
        "precision": 0.01
      },
      {
        "type": "input_dummy",
        "name": "drive_linear"
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
        "name": "drive_angular"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 45
  },

  {
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
    "colour": 225
  },

  {
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
    "colour": 225
  },

  {
    "type": "integer_block",
    "tooltip": "",
    "helpUrl": "",
    "message0": "Integer %1 %2",
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
    "colour": 60
  },
  
  {
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
    "colour": 285
  },

  {
    "type": "sonar_distance_read_block",
    "tooltip": "",
    "helpUrl": "",
    "message0": "READ SONAR DIST %1",
    "args0": [
      {
        "type": "input_dummy",
        "name": "SONAR_DISTANCE"
      }
    ],
    "output": null,
    "colour": 165
  },
  
  {
    "type": "print_block",
    "tooltip": "",
    "helpUrl": "",
    "message0": "PRINT %1 %2",
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
    "colour": 330
  }
                    
];

Blockly.defineBlocksWithJsonArray(moboBlockDefinitions);