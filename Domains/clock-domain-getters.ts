import { IClockAPI } from '../Interfaces/IClockAPI';
import select from '@gizt/selector';
/** Clock Domain   **/
export class ClockDomainClass implements IClockAPI {
  currentContext: any;
  constructor(data: any) {
    this.currentContext = select('clock[]', data); // the return value is an Array !
  }

  /*Usage */
  getClockDomain() {
    return this.currentContext;
  }

  getClockIds() {
    return select('[].id', this.currentContext);
  }

  getClockValues() {
    return select('[].value', this.currentContext);
  }

  getClockFrequencies() {
    return select('[].frequency', this.currentContext);
  }

  getClockAPI() {
    return {
      clockAPI: {
        getClockDomain: this.getClockDomain.bind(this),
        getClockIds: this.getClockIds.bind(this),
        getClockValues: this.getClockValues.bind(this),
        getClockFrequencies: this.getClockFrequencies.bind(this),
      },
    };
  }
}
