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

export const blocksToolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Movements",
      // "colour": "160",
      "categorystyle": "motion_category",
      "cssConfig": {
        "container": "mobo-category-container",
        "row": "mobo-category-row",
        "label": "mobo-category-label",
        "icon": "mobo-category-icon"
      },
      "contents": [
        { "kind": "block", "type": "drive_block" },
        { "kind": "block", "type": "turn_block" },
        { "kind": "block", "type": "drive_for_block" },
        { "kind": "block", "type": "turn_for_block" },
        { "kind": "block", "type": "stop_block" },
        { "kind": "block", "type": "set_drive_velocity_block" },
        { "kind": "block", "type": "set_turn_velocity_block" },
        { "kind": "block", "type": "motor_control_pwm_block" },
        { "kind": "block", "type": "motor_control_vel_block" },
        { "kind": "block", "type": "robot_control_block" },
      ]
    },
    {
      "kind": "category",
      "name": "Sensors",
      // "colour": "160",
      "categorystyle": "sensor_category",
      "cssConfig": {
        "container": "mobo-category-container",
        "row": "mobo-category-row",
        "label": "mobo-category-label",
        "icon": "mobo-category-icon"
      },
      "contents": [
        // { "kind": "block", "type": "read_sonar_block" },
        // { "kind": "block", "type": "read_tof_block" },
        { "kind": "block", "type": "read_distance_sensor_block" },
        { "kind": "block", "type": "set_distance_sensor_position" },
        { "kind": "block", "type": "check_distance_sensor_found_obstacle_block" },
        { "kind": "block", "type": "read_full_line_sensor_block" },
        { "kind": "block", "type": "read_line_sensor_block" },
        { "kind": "block", "type": "read_color_sensor_block" },
        { "kind": "block", "type": "set_color_detection" },
        { "kind": "block", "type": "check_color_sensor_found_color_block" },
        { "kind": "block", "type": "read_robot_dist_block" },
        { "kind": "block", "type": "read_robot_yaw_block" },
      ]
    },
    {
      "kind": "category",
      "name": "Control / IO",
      // "colour": "160",
      "categorystyle": "output_category",
      "cssConfig": {
        "container": "mobo-category-container",
        "row": "mobo-category-row",
        "label": "mobo-category-label",
        "icon": "mobo-category-icon"
      },
      "contents": [
        { "kind": "block", "type": "servo_angle_block" },
        { "kind": "block", "type": "buzzer_block" },
        { "kind": "block", "type": "rgb_led_block" },
        { "kind": "block", "type": "print_block" },
      ]
    },
    {
      "kind": "category",
      "name": "Math / Logic",
      // "colour": "210",
      "categorystyle": "logic_category",
      "cssConfig": {
        "container": "mobo-category-container",
        "row": "mobo-category-row",
        "label": "mobo-category-label",
        "icon": "mobo-category-icon"
      },
      "contents": [
        { "kind": "block", "type": "integer_block" },
        { "kind": "block", "type": "float_block" },
        { "kind": "block", "type": "operation_block" },
        { "kind": "block", "type": "lt_condition_block" },
        { "kind": "block", "type": "gt_condition_block" },
        { "kind": "block", "type": "lte_condition_block" },
        { "kind": "block", "type": "gte_condition_block" },
        { "kind": "block", "type": "eq_condition_block" },
        { "kind": "block", "type": "and_logic_block" },
        { "kind": "block", "type": "or_logic_block" },
        { "kind": "block", "type": "not_logic_block" },
      ]
    },
    {
      "kind": "category",
      "name": "Loop",
      // "colour": "210",
      "categorystyle": "loop_category",
      "cssConfig": {
        "container": "mobo-category-container",
        "row": "mobo-category-row",
        "label": "mobo-category-label",
        "icon": "mobo-category-icon"
      },
      "contents": [
        { "kind": "block", "type": "if_else_block" },
        { "kind": "block", "type": "forever_block" },
        { "kind": "block", "type": "repeat_block" },
        { "kind": "block", "type": "while_block" },
        { "kind": "block", "type": "wait_until_block" },
        { "kind": "block", "type": "delay_block" },
      ]
    },
    // {
    //   "kind": "category",
    //   "name": "Utilities",
    //   // "colour": "160",
    //   "categorystyle": "utility_category",
    //   "cssConfig": {
    //     "container": "mobo-category-container",
    //     "row": "mobo-category-row",
    //     "label": "mobo-category-label",
    //     "icon": "mobo-category-icon"
    //   },
    //   "contents": [
        
    //   ]
    // },
  ]
};