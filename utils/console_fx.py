
import sys
import time
import random

GLYPHS = ["▌", "▀", "■", "▖", "▘", "▙", "▛"]

def holo_print(text, delay=0.015):
    for c in text:
        sys.stdout.write(c)
        sys.stdout.flush()
        time.sleep(delay)
    print()

def pulse(label, duration=1.2):
    end = time.time() + duration
    while time.time() < end:
        sys.stdout.write(f"\r⧖ {label} {random.choice(GLYPHS)}")
        sys.stdout.flush()
        time.sleep(0.08)
    print("\r", end="")

def stage(title):
    print("\n" + "═" * 70)
    print(f"⟢ {title.upper()}")
    print("═" * 70)
