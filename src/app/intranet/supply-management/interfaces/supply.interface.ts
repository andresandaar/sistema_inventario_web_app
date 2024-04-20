

export interface Supply {
  id: string;
  tipo_identidicacion: TipoIdentificacion;
  numero_identificacion: string;
  nombre_razon_social: string;
  direccion: string;
  nombre_contacto: string;
  celular_contacto: string;
}

export enum TipoIdentificacion {
  Cedula = 'Cedula',
  NIT = 'NIT',
  Cedula_de_extranjeria = 'Cedula de Extranjería',
  NIT_de_extranjeria = 'NIT de Extranjería',
}
