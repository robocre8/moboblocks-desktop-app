# import uvicorn
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import os
# import sys
# import tempfile
# import subprocess
# import shutil

# # Global variable to track the currently running robot process
# current_robot_process = None

# # Get a writable directory (e.g., /tmp on Linux or AppData/Local/Temp on Windows)
# WRITABLE_DIR = tempfile.gettempdir()
# ROBOT_FILE_PATH = os.path.join(WRITABLE_DIR, "robot_program.py")

# # This finds where your texa_server executable is actually sitting
# if getattr(sys, 'frozen', False):
#     # If running as a bundled EXE
#     BUNDLE_DIR = sys._MEIPASS 
# else:
#     # If running in normal python mode
#     BUNDLE_DIR = os.path.dirname(os.path.abspath(__file__))

# CLIENT_LIB_SOURCE = os.path.join(BUNDLE_DIR, "texabot_client.py")
# CLIENT_LIB_DEST = os.path.join(WRITABLE_DIR, "texabot_client.py")


# app = FastAPI()


# # Enable CORS so your browser's index.html can talk to this script
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"], # Allows all origins (perfect for local desktop apps)
#     allow_credentials=True,
#     allow_methods=["*"], # Allows POST, GET, etc.
#     allow_headers=["*"],
# )
# # ------------------------

# class CodePayload(BaseModel):
#     code: str

# def stop_existing_process():
#     global current_robot_process
#     if current_robot_process and current_robot_process.poll() is None:
#         print(f"--- KILLING OLD PROCESS (PID: {current_robot_process.pid}) ---")
#         # .terminate() is gentler; .kill() is immediate
#         current_robot_process.terminate() 
#         current_robot_process.wait() # Wait for it to actually close
#         current_robot_process = None



# @app.post("/stop")
# async def stop_robot():
#     stop_existing_process()
#     return {"status": "Stopped"}



# @app.post("/code")
# async def run_robot(payload: CodePayload):
#     # 1. Ensure any old code stops running first
#     stop_existing_process()

#     # 2. Ensure the library exists in the temp folder (No duplicates check)
#     # We copy it every time to ensure it's the latest version, 
#     # but OS-level copying is nearly instant.
#     if os.path.exists(CLIENT_LIB_SOURCE):
#         shutil.copy2(CLIENT_LIB_SOURCE, CLIENT_LIB_DEST)

#     print("--- RECEIVED NEW CODE FROM BLOCKLY ---")
#     print(payload.code)
#     print("--------------------------------------")

#     with open(ROBOT_FILE_PATH, "w") as f:
#         # 1. Setup and Connection
#         f.write('from texabot_client import TexaBotClient\n')
#         f.write('import time, sys\n\n')
#         f.write('robot = TexaBotClient()\n')
        
#         # 2. Wrap the user code in a Try block
#         f.write('try:\n')
#         f.write('    robot.connect("texabot.local", 8888, 0.018)\n')
#         f.write('    robot.start_heartbeat()\n')
#         f.write('    time.sleep(1.0)\n')
        
#         # 3. Indent the user's Blockly code so it sits inside the 'try'
#         # This prepends 4 spaces to every line of the generated code
#         indented_code = "\n".join([f"    {line}" for line in payload.code.splitlines()])
#         f.write(f"{indented_code}\n")
        
#         # 4. The Safety Catch: Always runs, even if the process is killed
#         f.write('finally:\n')
#         f.write('    print("STOPPING ROBOT FOR SAFETY...")\n')
#         f.write('    try:\n')
#         f.write('        robot.stop()\n')
#         f.write('        time.sleep(0.1)\n')
#         f.write('    except:\n')
#         f.write('        pass\n')

#     # 2. Start the new process

#     python_cmd = "python" if sys.platform == "win32" else "python3"
    
#     try:
#         current_robot_process = subprocess.Popen(
#             [python_cmd, ROBOT_FILE_PATH],
#             cwd=WRITABLE_DIR
#         )
#     except FileNotFoundError:
#         return {"status": "Error", "message": "Python not found on this system."}

#     return {"status": "Running", "path": ROBOT_FILE_PATH, "pid": current_robot_process.pid}

#     # return {"status": "Received", "received_code": payload.code}




# if __name__ == "__main__":
#     uvicorn.run("main:app", host="localhost", port=8000, reload=False)






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
    stop_existing_process()

    print("--- RECEIVED NEW CODE FROM BLOCKLY ---")
    print(payload.code)
    print("--------------------------------------")

    with open("robot_program.py", "w") as f:
        # 1. Setup and Connection
        f.write('from texabot_client import TexaBotClient\n')
        f.write('import time, sys\n\n')
        f.write('robot = TexaBotClient()\n')
        
        # 2. Wrap the user code in a Try block
        f.write('try:\n')
        f.write('    robot.connect("texabot.local", 8888, 0.018)\n')
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
    # host="0.0.0.0" makes it accessible to other devices on your Wi-Fi
    uvicorn.run(app, host="localhost", port=8000)