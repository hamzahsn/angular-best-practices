import { Unit } from './unit.model';

export interface Shipment {
  id: number;
  reference: string;
  cargo_type: string;
  status: string;
  origin: string;
  destination: string;
  planned_eta: string;
  planned_etd: string;
  cargo_units: Unit[];
}
