import subprocess
import os
import signal

class RobotRunner:
    def __init__(self):
        self.process = None

    def execute(self, code_string):
        self.stop() # Kill any existing program before starting a new one
        
        with open("temp_user_code.py", "w") as f:
            # Automatic imports so the client doesn't have to
            f.write("import time\nimport robot_hardware as robot\n\n")
            f.write(code_string)
        
        self.process = subprocess.Popen(["python3", "temp_user_code.py"])
        return "Started"

    def stop(self):
        if self.process and self.process.poll() is None:
            self.process.terminate() # or .kill()
            self.process = None