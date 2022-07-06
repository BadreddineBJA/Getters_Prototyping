import select from '@gizt/selector';
import { IGenericContext } from '../Interfaces/IGenericContext';

//usage of a specific context
export class getContext implements IGenericContext {
  currentContext: any;
  constructor(HWresource: string, data: any) {
    this.currentContext = select('resources.'.concat(HWresource), data);
  }

  getResource() {
    return select('resource', this.currentContext);
  }

  getConfigs() {
    return select('configs', this.currentContext);
  }

  getContext() {
    return this.currentContext;
  }

  getResourceAPI() {
    return {
      ContextAPI: {
        getConfigs: this.getConfigs.bind(this),
        getContext: this.getContext.bind(this),
        getResource: this.getResource.bind(this),
      },
    };
  }
}
