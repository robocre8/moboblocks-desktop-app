import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import os

# Global variable to track the currently running robot process
current_robot_process = None

app = FastAPI()

# Enable CORS so your browser's index.html can talk to this script
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodePayload(BaseModel):
    code: str

def stop_existing_process():
    global current_robot_process
    if current_robot_process and current_robot_process.poll() is None:
        print(f"--- KILLING OLD PROCESS (PID: {current_robot_process.pid}) ---")
        # .terminate() is gentler; .kill() is immediate
        current_robot_process.terminate() 
        current_robot_process.wait() # Wait for it to actually close
        current_robot_process = None

@app.post("/code")
async def run_robot(payload: CodePayload):
    # 1. Ensure any old code stops running first
    # stop_existing_process()

    print("--- RECEIVED NEW CODE FROM BLOCKLY ---")
    print(payload.code)
    print("--------------------------------------")

    # with open("robot_program.py", "w") as f:
    #     # 1. Setup and Connection
    #     f.write('from texabot_client import TexaBotClient\n')
    #     f.write('import time, sys\n\n')
    #     f.write('robot = TexaBotClient()\n')
        
    #     # 2. Wrap the user code in a Try block
    #     f.write('try:\n')
    #     f.write('    robot.connect("texabot.local", 8888, 0.018)\n')
    #     f.write('    robot.start_heartbeat()\n')
    #     f.write('    time.sleep(1.0)\n')
        
    #     # 3. Indent the user's Blockly code so it sits inside the 'try'
    #     # This prepends 4 spaces to every line of the generated code
    #     indented_code = "\n".join([f"    {line}" for line in payload.code.splitlines()])
    #     f.write(f"{indented_code}\n")
        
    #     # 4. The Safety Catch: Always runs, even if the process is killed
    #     f.write('finally:\n')
    #     f.write('    print("STOPPING ROBOT FOR SAFETY...")\n')
    #     f.write('    try:\n')
    #     f.write('        robot.stop() # Or your specific stop command\n')
    #     f.write('        time.sleep(0.1)\n')
    #     f.write('    except:\n')
    #     f.write('        pass\n')

    # # 2. Start the new process
    # global current_robot_process
    # # Use "python" if you are on Windows, "python3" for Linux/Mac
    # current_robot_process = subprocess.Popen(["python3", "robot_program.py"])
    
    # return {"status": "Running", "pid": current_robot_process.pid}

    return {"status": "Received", "received_code": payload.code}

    
    

if __name__ == "__main__":
    # host="0.0.0.0" makes it accessible to other devices on your Wi-Fi
    uvicorn.run(app, host="localhost", port=8000)