//% color=#0fbc11 icon="\uf013"
//% block="Robit"
namespace robit {
    let Sensor_de_Linha_Esquerdo_Pin = AnalogPin.P0
let Sensor_de_Linha_Central_Pin = AnalogPin.P1
    let Sensor_de_Linha_direito_Pin = AnalogPin.P2


      export enum Motors {
        //% block="M1"
        M1 = 0x1,
        //% block="M2"
        M2 = 0x2,
        //% block="M3"
        M3 = 0x3,
        //% block="M4"
        M4 = 0x4
    }

    export enum Steppers {
        STEP1 = 0x1,
        STEP2 = 0x2
    }



       function stopMotor(index: number) {
        setPwm((index - 1) * 2, 0, 0)
        setPwm((index - 1) * 2 + 1, 0, 0)
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
	 * get Ultrasonic
	 * @param Seguidor_de_Linha, eg: 3
	*/
    //% blockId=Sensor_ultrassônico
block="Ultrassônico|pin %pin"
    //% weight=10
    export function Ultrasonic(trig: echo): number {
        let trig = DigitalPin.P12
        switch (echo) {
            case 1: pin = DigitalPin.P8
                break;
            case 2: pin = DigitalPin.P13
                break;
            case 3: pin = DigitalPin.P14
                break;
            case 4: pin = DigitalPin.P15
                break;
        }

        // send pulse
        pins.setPull(pin, PinPullMode.PullNone);
        pins.digitalWritePin(pin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(pin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(pin, 0);

        // read pulse
        let d = pins.pulseIn(pin, PulseValue.High, 23000);  // 8 / 340 = 
        return d * 5 / 3 / 58;
    }
	    /**
	 * init Seguidor de Linha
	 * @param Seguidor_de_Linha; eg: 1
	*/
    //% blockId=robo_seguidor_de_linha block="init seguidor de linha|pin %seguelinha"
    //% weight=10
    export function init_Seguidor_de_Linha(Esquerdo:  Direito): void {
        switch (esquerdo) {
            case 1:
                Seguidor_de_Linha_esquerdo_Pin = DigitalPin.P0
                Seguidor_de_Linha_Centro_Pin = DigitalPin.P1
                Seguidor_de_Linha_Direito_Pin = DigitalPin.P2

                break;
            case 2:
                Seguidor_de_Linha_esquerdo_Pin = AnalogPin.P0
                Seguidor_de_Linha_Centto_Pin = AnalogPin.P1              
                Seguidor_de_Linha_Direito_Pin = AnalogPin.P2
               break;

        }
    }


    /**
	 * Sensor de Linha Esquerdo
	*/
    //% blockId=sensor_seguidor_de_linha_esquerdo block="Sensor Esquerdo digitalpin"
    //% weight=10
    export function seguidor_de_linha_esquerdo(): number {
        let i = 0
        if (pins.digitalReadPin(seguidor_de_linha_esquerdo_Pin) == 1) {
            i = 1
        } else i = 0
        return i
    }


    /**
	 * Sensor de Linha Direito
	*/
    //% blockId=sensor_de_linha_direito block="right line follow digitalpin"
    //% weight=10
    export function sensor_de_linha_direito (): number {
        let i = 0
        if (pins.digitalReadPin(sensor_de_linha_direito_Pin) == 1) {
            i = 1
        } else i = 0
        return i
    }


}