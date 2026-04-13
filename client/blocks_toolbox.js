// const blocksToolbox = {
//   "kind": "flyoutToolbox",
//   "contents": [
//     { "kind": "block", "type": "move_block" },
//     { "kind": "block", "type": "turn_block" },
//     { "kind": "block", "type": "delay_block" },
//     { "kind": "block", "type": "stop_block" },
//     { "kind": "block", "type": "drive_block" }
//   ]
// };

// math 230

export const blocksToolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Movements",
      "colour": "210",
      "contents": [
        { "kind": "block", "type": "servo_angle_block" },
        { "kind": "block", "type": "motor_control_pwm_block" },
        { "kind": "block", "type": "motor_control_vel_block" },
        { "kind": "block", "type": "robot_control_block" },
        { "kind": "block", "type": "stop_block" },
      ]
    },
    {
      "kind": "category",
      "name": "Sensors",
      "colour": "120",
      "contents": [
        { "kind": "block", "type": "read_sonar_block" },
        { "kind": "block", "type": "read_line_sensor_block" },
      ]
    },
    {
      "kind": "category",
      "name": "Outputs",
      "colour": "290",
      "contents": [
        { "kind": "block", "type": "buzzer_block" },
        { "kind": "block", "type": "rgb_led_block" },
      ]
    },
    {
      "kind": "category",
      "name": "Logic",
      "colour": "45",
      "contents": [
        { "kind": "block", "type": "if_else_block" },
        { "kind": "block", "type": "forever_block" },
        { "kind": "block", "type": "repeat_block" },
        { "kind": "block", "type": "while_block" },
        { "kind": "block", "type": "integer_block" },
        { "kind": "block", "type": "compare_block" },
      ]
    },
    {
      "kind": "category",
      "name": "Utilities",
      "colour": "180",
      "contents": [
        { "kind": "block", "type": "delay_block" },
        { "kind": "block", "type": "print_block" },
      ]
    },
  ]
};