/**
 * Datos de prueba coherentes con src/config/site.config.js (Tomás Blends).
 * Uso: npm run seed
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Los 2 servicios de siteConfig.servicios. El nombre tiene que matchear
// exacto: Turnos.jsx reconcilia el servicio elegido en las cards (id
// string del config) con su equivalente real de acá por `nombre`, y si
// no encuentra coincidencia limpia la selección.
const SERVICIOS = [
  {
    nombre: 'Corte & Blend',
    descripcion: 'Corte con degradé personalizado, ajustado a tu forma de cara y tu estilo de vida.',
    duracionMin: 45,
    precio: 16000,
    porcentajeSena: 30,
  },
  {
    nombre: 'Asesoría de imagen',
    descripcion: 'Análisis de estilo personalizado: definimos corte, color y estética según tu cara y tu forma de vida.',
    duracionMin: 90,
    precio: 45000,
    porcentajeSena: 50,
  },
];

// siteConfig.horarios, con diaSemana 0=domingo a 6=sábado.
const HORARIOS = [
  { diaSemana: 0, abre: '', cierra: '', cerrado: true }, // domingo
  { diaSemana: 1, abre: '', cierra: '', cerrado: true }, // lunes
  { diaSemana: 2, abre: '12:00', cierra: '20:00', cerrado: false }, // martes
  { diaSemana: 3, abre: '12:00', cierra: '20:00', cerrado: false }, // miércoles
  { diaSemana: 4, abre: '12:00', cierra: '20:00', cerrado: false }, // jueves
  { diaSemana: 5, abre: '12:00', cierra: '20:00', cerrado: false }, // viernes
  { diaSemana: 6, abre: '10:00', cierra: '18:00', cerrado: false }, // sábado
];

/**
 * Próxima fecha futura que caiga en el día de semana pedido (0=domingo).
 * Nunca devuelve hoy, siempre al menos mañana.
 */
function proximoDia(diaSemana) {
  const fecha = new Date();
  fecha.setHours(0, 0, 0, 0);
  const delta = (diaSemana - fecha.getDay() + 7) % 7 || 7;
  fecha.setDate(fecha.getDate() + delta);
  return fecha;
}

/** Suma minutos a una hora "HH:MM" y devuelve "HH:MM". */
function sumarMinutos(hhmm, minutos) {
  const [h, m] = hhmm.split(':').map(Number);
  const total = h * 60 + m + minutos;
  const hh = String(Math.floor(total / 60)).padStart(2, '0');
  const mm = String(total % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}

async function main() {
  // Orden de borrado: primero Turno, que referencia a Servicio.
  await prisma.turno.deleteMany();
  await prisma.bloqueo.deleteMany();
  await prisma.horarioSemana.deleteMany();
  await prisma.servicio.deleteMany();

  const servicios = [];
  for (const data of SERVICIOS) {
    servicios.push(await prisma.servicio.create({ data }));
  }

  await prisma.horarioSemana.createMany({ data: HORARIOS });

  // 3 turnos confirmados en fechas futuras, en días que el local abre.
  const ejemplos = [
    {
      servicio: servicios[0], // Corte & Blend
      diaSemana: 2, // martes
      horaInicio: '14:00',
      nombreCliente: 'Franco L.',
      telefonoCliente: '+54 9 11 5555-1111',
      emailCliente: 'franco.l@example.com',
    },
    {
      servicio: servicios[1], // Asesoría de imagen
      diaSemana: 5, // viernes
      horaInicio: '16:00',
      nombreCliente: 'Ignacio P.',
      telefonoCliente: '+54 9 11 5555-2222',
      emailCliente: null,
    },
    {
      servicio: servicios[0], // Corte & Blend
      diaSemana: 6, // sábado
      horaInicio: '11:00',
      nombreCliente: 'Bruno S.',
      telefonoCliente: '+54 9 11 5555-3333',
      emailCliente: 'bruno.s@example.com',
    },
  ];

  for (const { servicio, diaSemana, horaInicio, ...cliente } of ejemplos) {
    await prisma.turno.create({
      data: {
        servicioId: servicio.id,
        fecha: proximoDia(diaSemana),
        horaInicio,
        horaFin: sumarMinutos(horaInicio, servicio.duracionMin),
        ...cliente,
        montoTotal: servicio.precio,
        montoSena: Math.round((servicio.precio * servicio.porcentajeSena) / 100),
        estado: 'confirmado',
      },
    });
  }

  console.log(`✅ Seed completo: ${servicios.length} servicios, ${HORARIOS.length} horarios, ${ejemplos.length} turnos`);
}

main()
  .catch((error) => {
    console.error('❌ Error en seed:', error.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
