export interface IGenericContext {
  getResource(): string;
  getConfigs(): IResourceConfig[];
  getContext(): any;
  getResourceAPI(): any; // expose the internal API.
}

export interface CRCPolynomial {
  value: string;
  size: number;
}

export interface CRCInitTypeDef {
  DefaultPolynomialUse: boolean;
  DefaultInitValueUse: boolean;
  CRC_Polynomial: CRCPolynomial;
  InputDataFormat: string;
  InputDataInversionMode: string;
  OutputDataInversionMode: boolean;
  InitValue?: number;
}

export interface IResourceConfig {
  cfg_name: string;
  CRC_InitTypeDef: CRCInitTypeDef;
  services: any[];
}
