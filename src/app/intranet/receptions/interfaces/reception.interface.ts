export interface Reception {
  fecha_hora: Date;
  numero_factura: string;
  proveedor_id: number;
}
export interface ReceptionAll {
  id: number;
  fecha_hora: Date;
  numero_factura: string;
  proveedor_id: number;
  proveedor: Proveedor;
  itemsReception: ItemsReception[];
}

interface Proveedor {
  nombre_contacto: string;
}

export interface ItemsReception {
  id: number;
  cantidad: number;
  lote: string;
  registro_invima: string;
  fecha_vencimiento: Date;
  estado_presentacion_producto: string;
  producto_id: number;
  recepcion_id: number;
  producto: Producto;
};

 interface Producto {
  nombre: string;
}

