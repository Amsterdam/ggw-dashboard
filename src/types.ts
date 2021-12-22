/**
 * All types definition
 */

export interface Gwb {
  code: string;
  display?: string;
  gebiedType?: string;
  naam: string;
  vollcode?: string;
  volledige_code?: string;
  geometrie?: any;
}

export interface StdType {
  indicatorDefinitieId: string;
  gemiddelde: number;
  jaar: number;
  standaardafwijking: number;
}

export interface MetaType {
  indicatorDefinitieId?: string;
  kleurenpalet: number | undefined;
  labelKort: string | undefined;
  variabele: string;
  definitie: string;
  bron: string;
}

export type ConfigEnirched = { indicatorDefinitieId: string; labelKort: string; kleurenpalet: number };

export type Config = { indicatorDefinitieId: string };

export type ConfigList = { indicatorDefinitieId: string; label: string }[];

export type Cijfers = {
  gebied: Gwb;
  meta: MetaType;
  cijfers: any[];
  recent: any | undefined;
  label?: string;
  showInLegend?: boolean;
  index?: number;
};
