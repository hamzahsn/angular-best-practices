export interface Unit {
  id: number;
  shipment_id: number;
  payload: number;
  dimension_x: number;
  dimension_y: number;
  dimension_z: number;
  stackable: true;
  dangerous: false;
  created_at: string;
  updated_at: string;
}
