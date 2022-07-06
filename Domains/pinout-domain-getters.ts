import { IPinoutAPI } from '../Interfaces/IPinoutAPI';
import select from '@gizt/selector';
/** Pinout Domain  **/
export class PinoutDomainClass implements IPinoutAPI {
  currentContext: any;
  constructor(data) {
    this.currentContext = select('pinout[]', data);
  }

  getPinoutDomain() {
    return this.currentContext;
  }

  getPins() {
    return select('[].signals[].pad.pin', this.currentContext);
  }

  getSignalNames() {
    return select('[].signals[].name', this.currentContext);
  }

  getPinoutAPI() {
    return {
      pinoutAPI: {
        getPinoutDomain: this.getPinoutDomain.bind(this),
        getPins: this.getPins.bind(this),
        getSignalNames: this.getSignalNames.bind(this),
      },
    };
  }
}
