import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import os
import sys

# Global variable to track the currently running robot process
current_robot_process = None

app = FastAPI()


# Enable CORS so your browser's index.html can talk to this script
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins (perfect for local desktop apps)
    allow_credentials=True,
    allow_methods=["*"], # Allows POST, GET, etc.
    allow_headers=["*"],
)


class CodePayload(BaseModel):
    code: str


def stop_existing_process():
    global current_robot_process
    
    # 1. Kill via the Python reference
    if current_robot_process:
        try:
            current_robot_process.kill()
            current_robot_process.wait(timeout=0.5)
        except:
            pass
        current_robot_process = None

    # 2. SYSTEM-LEVEL CLEANUP (The "Fail-Safe")
    # This finds ANY process running robot_program.py and kills it
    try:
        if sys.platform == "win32":
            # Windows: Kill by image name if you can, or use taskkill
            subprocess.run(
                'wmic process where "commandline like \'%robot_program.py%\'" delete', 
                shell=True, 
                capture_output=True
            )
        else:
            # Linux: Use pkill with the full command line pattern
            subprocess.run(["pkill", "-9", "-f", "robot_program.py"], capture_output=True)
    except Exception as e:
        print(f"System cleanup error: {e}")


@app.post("/code")
async def run_robot(payload: CodePayload):
    # 1. Ensure any old code stops running first
    stop_existing_process()

    print("--- RECEIVED NEW CODE FROM BLOCKLY ---")
    print(payload.code)
    print("--------------------------------------")

    with open("robot_program.py", "w") as f:
        # 1. Setup and Connection
        f.write('from mobobot_client import MoboBotClient\n')
        f.write('import time, sys\n\n')
        f.write('robot = MoboBotClient()\n')
        
        # 2. Wrap the user code in a Try block
        f.write('try:\n')
        f.write('    robot.connect("mobobot.local", 8888, 0.018)\n')
        f.write('    robot.start_heartbeat()\n')
        f.write('    time.sleep(1.0)\n')
        
        # 3. Indent the user's Blockly code so it sits inside the 'try'
        # This prepends 4 spaces to every line of the generated code
        indented_code = "\n".join([f"    {line}" for line in payload.code.splitlines()])
        f.write(f"{indented_code}\n")
        
        # 4. The Safety Catch: Always runs, even if the process is killed
        f.write('finally:\n')
        f.write('    print("STOPPING ROBOT FOR SAFETY...")\n')
        f.write('    try:\n')
        f.write('        robot.stop()\n')
        f.write('        time.sleep(0.1)\n')
        f.write('    except:\n')
        f.write('        pass\n')

    # 2. Start the new process

    global current_robot_process
    # sys.executable automatically handles Windows vs Linux AND 
    # ensures the robot program uses your .venv libraries.
    current_robot_process = subprocess.Popen([sys.executable, "robot_program.py"])

    # return {"status": "Running", "pid": current_robot_process.pid}

    return {"status": "Received", "received_code": payload.code}


@app.post("/stop")
async def stop_robot():
    stop_existing_process()
    return {"status": "Stopped"}  
    

if __name__ == "__main__":
    stop_existing_process()
    uvicorn.run(app, host="127.0.0.1", port=8000)