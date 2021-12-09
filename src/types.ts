/**
 * All types definition
 */

export interface Gwb {
  code?: string
  display: string
  gebiedType: string
  naam: string
  vollcode?: string
}

export interface StdType {
  indicatorDefinitieId: string
  gemiddelde: number
  jaar: number
  standaardafwijking: number
}
  
export interface MetaType {
  indicatorDefinitieId: string
  kleurenpalet: number
}
  

export type ConfigEnirched = { indicatorDefinitieId: string; labelKort: string };

export type Config = {indicatorDefinitieId: string}; 