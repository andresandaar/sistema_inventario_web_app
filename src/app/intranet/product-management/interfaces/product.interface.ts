

export interface Product {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  estado: Estado;
  nombre_laboratorio: string;
}

export enum Estado {
  Activo = 'Activo',
  Inactivo = 'Inactivo',
}
