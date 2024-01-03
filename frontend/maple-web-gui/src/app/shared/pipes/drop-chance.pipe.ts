import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropChance'
})
export class DropChancePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    // double chance = dropChance / (double) 1000000 * (double) 100 * (!boss ? player.getDropRate() : player.getBossDropRate());
    // chance = Math.min(chance, 100.0);
    // // Format chance to two decimal places
    // chance = Math.round(chance * 100.0) / 100.0;
    const chance = Math.min(value / 1000000 * 100 * 1, 100);
    return `${Math.round(chance * 100.0) / 100.0}%`;
  }

}
