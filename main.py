def out():
    global flag, count_2
    if pins.digital_read_pin(DigitalPin.P0) == 0:
        flag = 1
        while flag == 1:
            pins.digital_write_pin(DigitalPin.P1, 1)
            if NPNBitKit.button_door_open(DigitalPin.P0):
                count_2 += count_2 - 1
                flag = 0
        pins.digital_write_pin(DigitalPin.P1, 0)
    else:
        pins.digital_write_pin(DigitalPin.P1, 0)
def _in():
    global count_people
    if NPNBitKit.button(DigitalPin.P2) and count_people <= 2:
        while NPNBitKit.button_door_open(DigitalPin.P5):
            pins.digital_write_pin(DigitalPin.P1, 1)
            if pins.digital_read_pin(DigitalPin.P0) == 0:
                count_people += 1
                serial.write_string("!1:PEOPLE:" + convert_to_text(count_people) + "#")
                serial.write_string("!1:INPEOPLE:1#")
                pins.digital_write_pin(DigitalPin.P1, 0)
    else:
        pins.analog_write_pin(AnalogPin.P8, 1023)
        basic.pause(2000)
        pins.analog_write_pin(AnalogPin.P8, 0)
count_2 = 0
count_people = 0
flag = 0
flag = 0
count_people = 0

def on_forever():
    _in()
basic.forever(on_forever)
