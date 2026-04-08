async function moboBlockSendCode(event) {
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
  // // 1. Generate the code from the blocks
  // // This uses the generator stubs we just fixed
  // const code = pythonGenerator.workspaceToCode(workspace);

  // if (!code || code.trim() === "") {
  //     alert("Workspace is empty! Add some blocks first.");
  //     return;
  // }
  
  // // Log it so you can debug the output locally
  // console.log("Sending the following code to robot:\n", code);
  
  // // 2. Define your Robot's IP and Endpoint
  // // Make sure your FastAPI server is running on this IP!
  // const server_endpoint = "http://localhost:8000/code"; 

  // try {
  //   const response = await fetch(server_endpoint, {
  //     method: "POST",
  //     headers: { 
  //       "Content-Type": "application/json" 
  //     },
  //     // We wrap the code string in a JSON object to match the FastAPI Pydantic model
  //     body: JSON.stringify({ "code": code })
  //   });

  //   // if (!response.ok) {
  //   //   throw new Error(`Server responded with ${response.status}`);
  //   // }

  //   // const result = await response.json();
  //   // console.log("status:", result.status);
  //   // alert("Code sent successfully! Status: " + result.status);
  //   return false;

  // } catch (error) {
  //   console.error("Failed to Send Code:", error);
  //   alert("ERROR: Failed to Send Code:! Check if the FastAPI server is running.");
  // }
}


function clearMoboBlocks() {
    if (confirm("Are you sure you want to clear all blocks?")) {
        workspace.clear();
        console.log("Cleared");
    }
}