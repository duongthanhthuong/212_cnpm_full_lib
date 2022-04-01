function door () {
    if (NPNBitKit.ButtonDoorOpen(DigitalPin.P5)) {
        open = 1
    } else {
        open = 0
    }
}
function IR () {
    if (pins.digitalReadPin(DigitalPin.P0) == 0) {
        ir = 1
    } else if (pins.digitalReadPin(DigitalPin.P0) == 1) {
        ir = 0
    }
}
function out () {
    if (pins.digitalReadPin(DigitalPin.P0) == 0) {
        flag = 1
        while (flag == 1) {
            pins.digitalWritePin(DigitalPin.P1, 1)
            if (NPNBitKit.ButtonDoorOpen(DigitalPin.P0)) {
                count_2 += count_2 - 1
                flag = 0
            }
        }
        pins.digitalWritePin(DigitalPin.P1, 0)
    } else {
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
}
function _in () {
    if (NPNBitKit.Button(DigitalPin.P2) && count_people <= 2) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(2000)
        if (open == 1) {
            basic.pause(2000)
            if (ir == 1) {
                count_people += 1
                serial.writeString("!1:PEOPLE:" + convertToText(count_people) + "#")
                serial.writeString("!1:INPEOPLE:1#")
                pins.digitalWritePin(DigitalPin.P1, 0)
            }
        }
    } else if (NPNBitKit.Button(DigitalPin.P2) && count_people > 2) {
        pins.analogWritePin(AnalogPin.P8, 1023)
        basic.pause(2000)
        pins.analogWritePin(AnalogPin.P8, 0)
    }
}
let count_2 = 0
let ir = 0
let open = 0
let count_people = 0
let flag = 0
flag = 0
count_people = 0
open = 0
ir = 0
basic.forever(function () {
    door()
    IR()
})
basic.forever(function () {
    _in()
})
