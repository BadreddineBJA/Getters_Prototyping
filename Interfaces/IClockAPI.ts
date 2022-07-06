export interface IClockAPI {
  getClockDomain(): IClockObject[];
  getClockIds(): string[];
  getClockValues(): string[];
  getClockFrequencies(): string[];
  getClockAPI(): any; // expose the internal API.
}

export interface IClockObject {
  id: string;
  value: string;
  frequency: string;
}
