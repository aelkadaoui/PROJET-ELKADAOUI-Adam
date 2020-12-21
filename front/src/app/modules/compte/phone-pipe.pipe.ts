import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'phonePipe'
})
export class PhonePipePipe implements PipeTransform {

    transform(value: string, indicatif: string, numTelephone: string): string {
        numTelephone = numTelephone.charAt(0) === '0' ? numTelephone.substring(1) : '' + numTelephone;
        value = indicatif + ' ' + numTelephone;
        return value;
    }

}
