async function blocksSendCode(event) {
  // This is the "magic" line that stops the reload
  if (event) event.preventDefault(); 

  // const code = pythonGenerator.workspaceToCode(workspace);
  
  try {
    // 3. Generate Code
    const code = Blockly.Python.workspaceToCode(workspace);
    console.log("Generated Code:", code);

    // 4. The Fetch Request
    const response = await fetch("http://localhost:8000/code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "code": code })
    });

    if (response.ok) {
      console.log("Fetch successful!");
    }
  } catch (error) {
    // This catches network errors so the page doesn't refresh on failure
    console.error("Detailed Error:", error);
  }
}


function clearBlocks() {
    if (confirm("Are you sure you want to clear all blocks?")) {
        workspace.clear();
        console.log("Cleared");
    }
}