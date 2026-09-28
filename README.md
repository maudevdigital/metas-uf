# Metas UF

Aplicación web para seguir metas de ahorro expresadas en UF cuando el ahorro se hace en pesos.

Taller Evaluado 2 — Desarrollo Web y Móvil, segundo semestre 2026.

## Integrantes

| Nombre | Usuario GitHub |
|---|---|
| _(completar)_ | _(completar)_ |
| _(completar)_ | _(completar)_ |

## Problemática

Muchas metas de ahorro en Chile se fijan en UF (el pie de un departamento, un arriendo, la matrícula de un
magíster), pero la mayoría de las personas ahorra en pesos. Como la UF sube todos los días, el mismo monto en
pesos equivale a menos UF con el tiempo, y la meta se aleja sin que se note.

Ejemplo: 200 UF costaban $7.683.834 el 01-01-2025 y $8.208.164 el 28-09-2026. Quien ahorró la primera cifra en
pesos quedó $524.330 corto.

Metas UF convierte cada abono a la UF **del día en que se hizo** y muestra el avance real hacia la meta.

## Usuarios objetivo

Estudiantes y personas jóvenes que ahorran en pesos (cuenta vista, cuenta corriente, depósito en pesos) para un
objetivo que se cobra en UF.

## Funcionalidades principales

- Crear metas de ahorro con un objetivo en UF y una fecha límite.
- Registrar abonos en pesos, convertidos a UF según la fecha del abono.
- Ver el avance de cada meta y cuánto falta, en UF y en pesos.
- Proyectar cuándo se cumplirá la meta al ritmo actual.
- Consultar el valor de la UF de hoy y su evolución reciente.

## Tecnologías

React 19, Vite, React Router, Bootstrap 5, CSS propio, Fetch API y localStorage. No hay backend.

## Cómo ejecutar

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

La aplicación queda en http://localhost:5173.

## Estructura

```
src/
├── components/   piezas reutilizables de la interfaz (Navbar, Footer, ...)
├── pages/        una vista por ruta (Inicio, NuevaMeta, DetalleMeta, NoEncontrada)
├── styles/       theme.css: paleta, tipografías y ajustes sobre Bootstrap
├── App.jsx       rutas de la aplicación
└── main.jsx      punto de entrada
public/
└── logo.svg      logo y favicon
```

| Ruta | Vista |
|---|---|
| `/` | Mis metas |
| `/metas/nueva` | Formulario de nueva meta |
| `/metas/:id` | Detalle de una meta |

## API pública: mindicador.cl

- **Documentación:** https://mindicador.cl
- **Autenticación:** no requiere clave. Permite llamadas desde el navegador (CORS).
- **Método:** GET.

| Endpoint | Uso en la aplicación |
|---|---|
| `https://mindicador.cl/api/uf` | Valor de hoy y gráfico de los últimos 31 días |
| `https://mindicador.cl/api/uf/{dd-mm-aaaa}` | UF de la fecha de cada abono |

**Justificación:** sin el valor de la UF de cada fecha no es posible calcular cuánto avanza un abono hecho en
pesos. La API es la base del cálculo, no un complemento visual.

**Datos que se usan:** de cada elemento de `serie`, solo `fecha` (recortada a AAAA-MM-DD) y `valor` (pesos por UF).

**Si la API falla:**

| Situación | Mensaje |
|---|---|
| Sin conexión o más de 10 s sin respuesta | "No hay conexión con mindicador.cl." |
| La API responde con error | "mindicador.cl no pudo entregar el valor de la UF." |
| La fecha no tiene valor | "No hay valor de la UF para esa fecha." |

**Uso:** no requiere clave. La app consulta una vez al cargar y una vez por cada abono. La UF futura solo
existe hasta el día 9 del mes siguiente. Se da crédito a mindicador.cl en el pie de página.


## Uso de Inteligencia Artificial

| Herramienta | Propósito | Consulta representativa | Resultado | Modificación humana | Aprendizaje |
|---|---|---|---|---|---|
| Claude Code | Estructura inicial del proyecto | "Limpia la plantilla de Vite y arma la estructura base con rutas, Bootstrap y la paleta del Figma" | Carpetas, rutas, Navbar, Footer y `theme.css` | _(completar)_ | _(completar)_ |
| Claude Code | Servicio de la API y hook | "Crea el servicio de mindicador.cl y un hook con estados de carga y error" | `mindicador.js`, `useUF.js` y `formato.js`, probados contra la API | _(completar)_ | _(completar)_ |


## Limitaciones conocidas

- Los datos se guardan en el navegador (localStorage): no se comparten entre dispositivos.
- La UF futura solo se conoce hasta el día 9 del mes siguiente; las proyecciones usan la UF de hoy y son aproximadas.
