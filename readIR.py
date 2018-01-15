#!/usr/bin/python
from RPi import GPIO
import urllib3

PIN = 7
GPIO.setmode(GPIO.BOARD)
GPIO.setup(PIN, GPIO.IN)

http = urllib3.PoolManager()

while True:
    GPIO.wait_for_edge(PIN, GPIO.FALLING, bouncetime = 200)
    if not GPIO.input(PIN): # workaround: wait_for_edge detects both edges
        try:
            http.request('GET', 'http://localhost:3002/v1/commands/next')
        except:
            pass