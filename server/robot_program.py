from texabot_client import TexaBotClient
import time, sys

robot = TexaBotClient()
try:
    robot.connect("texabot.local", 8888, 0.018)
    robot.start_heartbeat()
    time.sleep(1.0)
    robot.writeBuzzer(1)
finally:
    print("STOPPING ROBOT FOR SAFETY...")
    try:
        robot.stop()
        time.sleep(0.1)
    except:
        pass
