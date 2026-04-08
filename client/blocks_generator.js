const pythonGenerator = Blockly.Python; 

// --- move_block ---
pythonGenerator.forBlock['move_block'] = function(block, generator) {
  // Use the 'name' from your JSON: "DIRECTION" and "SPEED"
  const dropdown_direction = block.getFieldValue('DIRECTION');
  const field_speed = block.getFieldValue('SPEED') || '0';
  
  return `robot.move("${dropdown_direction}", ${field_speed})\n`;
};

// --- turn_block ---
pythonGenerator.forBlock['turn_block'] = function(block, generator) {
  // Use the 'name' from your JSON: "DIRECTION" and "SPEED"
  const dropdown_direction = block.getFieldValue('DIRECTION');
  const field_speed = block.getFieldValue('SPEED') || '0';
  
  return `robot.turn("${dropdown_direction}", ${field_speed})\n`;
};

// --- delay_block ---
pythonGenerator.forBlock['delay_block'] = function(block, generator) {
  // Use the 'name' from your JSON: "DELAY_MS"
  const field_ms = block.getFieldValue('DELAY_MS') || '0';
  
  // Convert milliseconds to seconds for Python's time.sleep()
  return `time.sleep(${field_ms} / 1000.0)\n`;
};

// --- stop_block ---
pythonGenerator.forBlock['stop_block'] = function(block, generator) {
  return `robot.stop()\n`;
};

// --- turn_block ---
pythonGenerator.forBlock['drive_block'] = function(block, generator) {
  // Use the 'name' from your JSON: "LINEAR" and "ANGULAR"
  const linear_speed = block.getFieldValue('LINEAR') || '0';
  const angular_speed = block.getFieldValue('ANGULAR') || '0';
  
  return `robot.drive("${linear_speed}", ${angular_speed})\n`;
};

// --- if_else_block ---
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

// --- compare_block ---
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

// --- integer_block ---
pythonGenerator.forBlock['integer_block'] = function(block) {
  // Use 'INT' 
  const numberValue = block.getFieldValue('INT');
  
  // Return the number as a string, and use ORDER_ATOMIC 
  // because a single number can't be "broken up" by math rules.
  return [String(numberValue), pythonGenerator.ORDER_ATOMIC];
};

// --- while_block ---
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

// --- sonar_distance_read_block ---
pythonGenerator.forBlock['sonar_distance_read_block'] = function(block) {
  // We assume your python robot library has a function called get_sonar_distance()
  const code = 'robot.readSonarDistance()';
  
  // Because this is a value, we return it in an array with its priority
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

// --- print_block ---
pythonGenerator.forBlock['print_block'] = function(block) {
  // 1. Get the text from the input field named 'TEXT'
  const textValue = block.getFieldValue('TEXT');

  // 2. Generate the Python print statement
  // We use backticks and quotes to make sure it's a string in Python
  return `print("${textValue}")\n`;
};