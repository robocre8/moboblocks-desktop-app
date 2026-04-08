from texabot_client import TexaBotClient
import time, sys

robot = TexaBotClient()
try:
    robot.connect("texabot.local", 8888, 0.018)
    robot.start_heartbeat()
    robot.move("FORWARD", 0.1)
    time.sleep(1000 / 1000.0)
    print("hello cool")
finally:
    print("STOPPING ROBOT FOR SAFETY...")
    try:
        robot.stop() # Or your specific stop command
        time.sleep(0.1)
    except:
        pass
