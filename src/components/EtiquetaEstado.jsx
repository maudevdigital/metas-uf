import '../styles/etiquetas.css';

const ESTADOS = {
  cumplida: { texto: 'Cumplida', clase: 'etiqueta-cumplida' },
  'al-dia': { texto: 'Al día', clase: 'etiqueta-al-dia' },
  atrasada: { texto: 'Atrasada', clase: 'etiqueta-atrasada' },
  vencida: { texto: 'Vencida', clase: 'etiqueta-vencida' },
};

export default function EtiquetaEstado({ estado }) {
  const { texto, clase } = ESTADOS[estado];

  return <span className={`etiqueta ${clase}`}>{texto}</span>;
}
