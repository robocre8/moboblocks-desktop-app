//---------------------------------------------------------
//        BLOCKS PYTHON GENERATORS
//---------------------------------------------------------

const pythonGenerator = Blockly.Python;

// ----------------------- MOVEMENTS -------------------------
pythonGenerator.forBlock['robot_control_block'] = function(block, generator) {
  const linear_speed = block.getFieldValue('LINEAR') || '0';
  const angular_speed = block.getFieldValue('ANGULAR') || '0';
  
  return `robot.writeRobotVel(${linear_speed}, ${angular_speed})\n`;
};

pythonGenerator.forBlock['servo_angle_block'] = function(block, generator) {

  const label_num = block.getFieldValue('LABEL_NUM');
  const angle = block.getFieldValue('ANGLE') || '0';
  
  return `robot.writeServo${label_num}Angle(${angle})\n`;
};

pythonGenerator.forBlock['motor_control_pwm_block'] = function(block, generator) {

  const l_pwm = block.getFieldValue('L_PWM') || '0';
  const r_pwm = block.getFieldValue('R_PWM') || '0';
  
  return `robot.writeMotorPwm(${l_pwm}, ${r_pwm})\n`;
};

pythonGenerator.forBlock['motor_control_vel_block'] = function(block, generator) {

  const l_vel = block.getFieldValue('L_VEL') || '0.0';
  const r_vel = block.getFieldValue('R_VEL') || '0.0';
  
  return `robot.writeMotorVel(${l_vel}, ${r_vel})\n`;
};

pythonGenerator.forBlock['stop_block'] = function(block, generator) {
  return `robot.stop()\n`;
};

// ----------------------- MATHS/CONDITION -------------------------

pythonGenerator.forBlock['if_else_block'] = function(block, generator) {
  // 1. Get the condition (the block plugged into the side)
  const condition = generator.valueToCode(block, 'CONDITION', pythonGenerator.ORDER_NONE) || 'False';
  
  // 2. Get the blocks inside the 'do' pocket
  const branchDo = generator.statementToCode(block, 'DO');
  
  // 3. Get the blocks inside the 'else' pocket
  const branchElse = generator.statementToCode(block, 'ELSE');
  
  // 4. Construct the Python code
  let code = `if ${condition}:\n${branchDo || '  pass\n'}`;
  
  // Only add 'else' if it actually has code, otherwise it looks cleaner
  if (branchElse) {
    code += `else:\n${branchElse}`;
  }
  
  return code;
};

pythonGenerator.forBlock['compare_block'] = function(block, generator) {
  // 1. Get code for Input A and Input B
  const value_a = generator.valueToCode(block, 'A', pythonGenerator.ORDER_ATOMIC) || '0';
  const value_b = generator.valueToCode(block, 'B', pythonGenerator.ORDER_ATOMIC) || '0';
  
  // 2. Get the operator from the dropdown
  const operator = block.getFieldValue('OPTION');
  
  // 3. Combine them into the Python comparison string
  const code = `${value_a} ${operator} ${value_b}`;
  
  // 4. Return as a value (with its priority level)
  return [code, pythonGenerator.ORDER_RELATIONAL];
};

pythonGenerator.forBlock['integer_block'] = function(block) {
  // Use 'INT' 
  const numberValue = block.getFieldValue('INT');
  
  // Return the number as a string, and use ORDER_ATOMIC 
  // because a single number can't be "broken up" by math rules.
  return [String(numberValue), pythonGenerator.ORDER_ATOMIC];
};

pythonGenerator.forBlock['float_block'] = function(block) {
  const numberValue = block.getFieldValue('FLOAT');
  
  // Return the number as a string, and use ORDER_ATOMIC 
  // because a single number can't be "broken up" by math rules.
  return [String(numberValue), pythonGenerator.ORDER_ATOMIC];
};

pythonGenerator.forBlock['operation_block'] = function(block, generator) {
  // 1. Get code for Input A and Input B
  const value_a = generator.valueToCode(block, 'FLOAT1', pythonGenerator.ORDER_ATOMIC) || '0.0';
  const value_b = generator.valueToCode(block, 'FLOAT2', pythonGenerator.ORDER_ATOMIC) || '0.0';
  
  // 2. Get the operator from the dropdown
  const operator = block.getFieldValue('OPERATION');
  
  // 3. Combine them into the Python comparison string
  const code = `${value_a} ${operator} ${value_b}`;
  
  // 4. Return as a value (with its priority level)
  return [code, pythonGenerator.ORDER_RELATIONAL];
};


pythonGenerator.forBlock['adv_operation_block'] = function(block, generator) {
  // 1. Get code for Input A and Input B
  const value = generator.valueToCode(block, 'FLOAT', pythonGenerator.ORDER_ATOMIC) || '0.0';
  
  // 2. Get the operator from the dropdown
  const operator = block.getFieldValue('ADV_OPERATION');
  
  // 3. Combine them into the Python comparison string
  const code = `${operator}(${value})`;
  
  // 4. Return as a value (with its priority level)
  return [code, pythonGenerator.ORDER_RELATIONAL];
};


pythonGenerator.forBlock['trig_operation_block'] = function(block, generator) {
  const value = generator.valueToCode(block, 'FLOAT', pythonGenerator.ORDER_ATOMIC) || '0.0';
  
  // 2. Get the operator from the dropdown
  const operator = block.getFieldValue('TRIG_OPERATION');
  
  // 3. Combine them into the Python comparison string
  const code = `${operator}(${value})`;
  
  // 4. Return as a value (with its priority level)
  return [code, pythonGenerator.ORDER_RELATIONAL];
};


// ----------------------- MATHS/CONDITION -------------------------

pythonGenerator.forBlock['while_block'] = function(block, generator) {
  // 1. Get the condition (like 'distance < 10')
  const condition = generator.valueToCode(block, 'WHILE', pythonGenerator.ORDER_NONE) || 'True';
  
  // 2. Get the blocks stacked inside the 'do' pocket
  let branch = generator.statementToCode(block, 'DO');
  
  // 3. Python needs 'pass' if the loop is empty to avoid a syntax error
  branch = branch || '  pass\n';
  
  // 4. Return the while loop string
  return `while ${condition}:\n${branch}`;
};

pythonGenerator.forBlock['forever_block'] = function(block, generator) {
  // 1. Get the blocks stacked inside the 'do' pocket
  let branch = generator.statementToCode(block, 'DO');
  
  // 2. Python needs 'pass' if the loop is empty to avoid a syntax error
  branch = branch || '  pass\n';
  
  // 4. Return the while loop string
  return `while True:\n${branch}`;
};

pythonGenerator.forBlock['repeat_block'] = function(block, generator) {

  const num_of_repeat = block.getFieldValue('NUM_OF_REPEAT') || '0';
  
  // 1. Get the blocks stacked inside the 'do' pocket
  let branch = generator.statementToCode(block, 'DO');
  
  // 2. Python needs 'pass' if the loop is empty to avoid a syntax error
  branch = branch || '  pass\n';
  
  // 4. Return the while loop string
  return `for _ in range(${num_of_repeat}):\n${branch}`;
};


// -------------------- SENSOR --------------------------

pythonGenerator.forBlock['read_sonar_block'] = function(block) {
  const code = 'robot.readSonar()';
  
  // Because this is a value, we return it in an array with its priority
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator.forBlock['read_line_sensor_block'] = function(block) {

  const sensor_label_num = block.getFieldValue('SENSOR_LABEL_NUM');
  const code = `robot.readLineSensor${sensor_label_num}()`;
  
  // Because this is a value, we return it in an array with its priority
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};


// ------------------- OUTPUT --------------------------

pythonGenerator.forBlock['buzzer_block'] = function(block, generator) {
  const value = block.getFieldValue('VALUE');
  
  return `robot.writeBuzzer(${value})\n`;
};

pythonGenerator.forBlock['rgb_led_block'] = function(block, generator) {
  const r_val = block.getFieldValue('R_VAL');
  const g_val = block.getFieldValue('G_VAL');
  const b_val = block.getFieldValue('B_VAL');
  
  return `robot.writeRGB(${r_val}, ${g_val}, ${b_val})\n`;
};


// ------------------- UTILITIES -------------------------

pythonGenerator.forBlock['print_block'] = function(block) {
  // 1. Get the text from the input field named 'TEXT'
  const textValue = block.getFieldValue('TEXT');

  // 2. Generate the Python print statement
  // We use backticks and quotes to make sure it's a string in Python
  return `print("${textValue}")\n`;
};

pythonGenerator.forBlock['delay_block'] = function(block, generator) {
  const field_ms = block.getFieldValue('DELAY_MS') || '0';
  
  // Convert milliseconds to seconds for Python's time.sleep()
  return `time.sleep(${field_ms} / 1000.0)\n`;
};

//---------------------------------------------------------

export {pythonGenerator};