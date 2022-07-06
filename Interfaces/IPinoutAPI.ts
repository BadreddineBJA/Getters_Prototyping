export interface IPinoutAPI {
  getPinoutDomain(): IPinout;
  getPins(): number[];
  getSignalNames(): string[];
  getPinoutAPI(): any; // exposes the internal API.
}

export interface Pad {
  port: string;
  pin: number;
}

export interface Function {
  type: string;
  id: string;
}

export interface Signal {
  instance: string;
  cfg_name: string;
  type: string;
  name: string;
  pad: Pad;
  function: Function;
}

export interface IPinout {
  signals: Signal[];
}
