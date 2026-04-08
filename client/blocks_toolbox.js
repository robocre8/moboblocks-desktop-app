// const moboBlocksToolbox = {
//   "kind": "flyoutToolbox",
//   "contents": [
//     { "kind": "block", "type": "move_block" },
//     { "kind": "block", "type": "turn_block" },
//     { "kind": "block", "type": "delay_block" },
//     { "kind": "block", "type": "stop_block" },
//     { "kind": "block", "type": "drive_block" }
//   ]
// };

const moboBlocksToolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Logic",
      "colour": "210",
      "contents": [
        { "kind": "block", "type": "integer_block" },
        { "kind": "block", "type": "compare_block" },
        { "kind": "block", "type": "if_else_block" },
        { "kind": "block", "type": "while_block" },
      ]
    },
    {
      "kind": "category",
      "name": "Movement",
      "colour": "160",
      "contents": [
        { "kind": "block", "type": "move_block" },
        { "kind": "block", "type": "turn_block" },
        { "kind": "block", "type": "drive_block" },
        { "kind": "block", "type": "stop_block" },
        { "kind": "block", "type": "delay_block" },
      ]
    },
    {
      "kind": "category",
      "name": "Sensor",
      "colour": "160",
      "contents": [
        { "kind": "block", "type": "sonar_distance_read_block" },
      ]
    },
    {
      "kind": "category",
      "name": "Others",
      "colour": "160",
      "contents": [
        { "kind": "block", "type": "delay_block" },
        { "kind": "block", "type": "print_block" },
      ]
    },
  ]
};