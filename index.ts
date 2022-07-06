import * as data from './data.json';
import Handlebars from 'handlebars';
import { ClockDomainClass } from './Domains/clock-domain-getters';
import { PinoutDomainClass } from './Domains/pinout-domain-getters';
import { getContext } from './Domains/generic-context-getters';

/*************************************************************************** /
/** Usage of a Class By Domain / With Getters API by Domain (CLOCK/PINOUT)  **/
/*****************************************************************************/
console.log('[0] Register Handlebars helpers');

Handlebars.registerHelper('get_myctx', (options) => {
  var CRC_CTX = {
    infos: { init_type: 'enabled', label: 'ppp_label' },
    services: [],
    irq: 'disabled',
    configs: [],
    id: '::Device:STM32 HAL Code Gen:CRC Init',
    resource: 'CRC',
  };

  var fn = options.fn;
  var ret = '';
  var ctx = {
    _myctx: CRC_CTX,
  };
  ret = ret + fn(ctx);
  return ret;
});

Handlebars.registerHelper('toJSON', function (obj) {
  return JSON.stringify(obj, null, 3);
});

Handlebars.registerHelper('exec', (func) => {
  if (typeof func == 'function') func = func.call(this);
  return func;
});

Handlebars.registerHelper('addConfigLC', function (str) {
  if (str && typeof str === 'string') {
    return '_' + str.toLowerCase();
  }
  return '';
});

Handlebars.registerHelper('lowercase', function (str) {
  if (str && typeof str === 'string') {
    return str.toLowerCase();
  }
  return '';
});

console.log('[1] Init Contexts');
var ClockDomainInstance = new ClockDomainClass(data).getClockAPI();
var pinoutDomainInstance = new PinoutDomainClass(data).getPinoutAPI();
var getContextInst = new getContext('crc', data).getResourceAPI();

console.log('[2] Test Template Getters');
/** Template Getters (usage of Clock API / Pinout API) **/
const template_func_getters_proto = Handlebars.compile(
  `
  *** CLOCK region ***
 
  {{#with clockAPI.getClockDomain}} {{{toJSON this}}} {{/with}}
  {{#each clockAPI.getClockIds}} << {{this}} >> {{/each}}
  {{#each clockAPI.getClockValues}} << {{this}} >> {{/each}}
  {{#each clockAPI.getClockFrequencies}} << {{this}} >> {{/each}}

  *** PINOUT region ***

  {{#with pinoutAPI.getPinoutDomain}} {{log this}} {{/with}}

  {{#each pinoutAPI.getPinoutDomain}}
  {{#each this.signals}} {{this.name}} {{/each}}
  {{/each}}
  {{#each pinoutAPI.getPins}} << {{this}} >> {{/each}}
  {{#each pinoutAPI.getSignalNames}} << {{this}} >> {{/each}}

  *** Instance Context region ***
  
  {{#get_myctx}}
  {{#with _myctx}}

  RESOURCE: {{this.resource}}

  {{/with}}
  {{/get_myctx}}
  `
);

const renderedTemplate = template_func_getters_proto({
  ...ClockDomainInstance,
  ...pinoutDomainInstance,
});

console.log('[4] Template output');
console.log(renderedTemplate);

// Specific getContext
const resources_template_func = Handlebars.compile(
  `
{{#with ContextAPI}} 
{{toJSON this}}
{{#with getContext}} {{log this}} {{/with}}
{{#with getConfigs}} {{log this}} {{/with}}
{{#with getCfgName}} {{log this}} {{/with}}
{{#with getResource}} {{log this}} {{/with}}
{{#with getCRC_InitTypeDef}} {{log this}} {{/with}}

******** Region Test access for nested Context ********

{{#with getConfigs}}
*** this can replace handlebars ../Path access ***
{{@root.ContextAPI.getResource}}
{{/with}}

{{/with}}
`
);

const output_template = resources_template_func({
  ...getContextInst,
});

console.log('[5] Specific Context output Template');
console.log(output_template);
