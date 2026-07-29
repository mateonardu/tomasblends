/**
 * ÚNICO archivo a editar por cliente.
 * Ningún componente debe hardcodear textos, colores, imágenes ni datos:
 * todo sale de acá.
 */

import logo from '../assets/logo-header.png'
// TODO: reemplazar con foto real de Juan (actualmente placeholder de stock).
import corteHero from '../assets/corte-hero.jpg'

// Fotos de las cards de servicios.
import fotoCorte from '../assets/corte-pelo4.png'
import fotoColor from '../assets/corte-color.png'
import fotoBalayage from '../assets/corte-pelo-2.png'
import fotoBabylights from '../assets/corte-pelo6.png'
import fotoIona from '../assets/corte-pelo5.png'
import fotoAsesoriaGeneral from '../assets/asesoria-general.jpg'
import fotoAsesoriaImagen from '../assets/asesoria-imagen.png'
import fotoPeinadoSocial from '../assets/corte-pelo.png'
import fotoPeinadoRecogido from '../assets/corte-pelo-3.png'
// TODO: no hay fotos propias de maquillaje todavía — se reutilizan fotos
// de otras cards como placeholder. Reemplazar apenas estén disponibles.
import fotoMaquillajeSocial from '../assets/corte-pelo4.png'
import fotoMaquillajeEvento from '../assets/asesoria-imagen.png'

import reel1 from '../assets/reels/reel-1.mp4'
import reel2 from '../assets/reels/reel-2.mp4'
import reel3 from '../assets/reels/reel-3.mp4'
// Frame fijo (no el primer cuadro, que en reel-1 y reel-2 arranca en negro)
// para que la miniatura muestre imagen antes de reproducir.
import reel1Poster from '../assets/reels/reel-1-poster.jpg'
import reel2Poster from '../assets/reels/reel-2-poster.jpg'

export const siteConfig = {
  marca: {
    nombre: 'Look & Arte',
    logo,
    slogan: 'Estilo y asesoría de imagen en Parque Chas.',
    heroImagen: corteHero,
    descripcionCorta:
      'Peluquería de Juan en Parque Chas. Cabello, color y asesoría de imagen personal, con la técnica como base de cada trabajo.',
  },

  tema: {
    colores: {
      primario: '#C9A84C', // dorado cálido, CTAs y acentos
      primarioHover: '#AB8F41',
      secundario: '#171310', // casi negro con base cálida: texto, bordes y superficies oscuras
      superficie: '#F5ECD7', // crema/marfil, fondo de cards y paneles claros
      fondo: '#0A0A0A', // negro profundo
      texto: '#F0EDE8', // blanco roto, texto principal sobre fondo oscuro
      acento: '#A0714F', // bronce, acento complementario
      promoBarFondo: '#050505',
      promoBarTexto: '#F0EDE8',
      exito: '#5A8F6B',
      estrellas: '#C9A84C',
      footerFondo: '#050505',
      footerTexto: '#C9C2B0',
    },
    fuenteTitulos: "'Cormorant Garamond', Georgia, serif",
    fuenteTexto: "'DM Sans', system-ui, sans-serif",
    fuenteUI: "'DM Sans', system-ui, sans-serif",
  },

  textos: {
    hero: {
      eyebrow: 'Cabello y color · Asesoría de imagen · Parque Chas',
      tituloPrincipal: 'Tu mejor versión empieza',
      tituloEnfasis: 'con el corte correcto.',
      subcopy: 'Reservá tu turno en Parque Chas.',
      ctaPrimario: 'Reservar turno →',
      disponibilidad: 'Quedan turnos esta semana',
      ratingValor: '5,0',
      ratingTexto: 'en Google · clientas y clientes de Look & Arte',
    },
    servicios: {
      titulo: 'Servicios',
      subtitulo: 'Cabello, color y asesoría de imagen. Elegí el tuyo.',
      badgeDestacado: 'El más elegido',
      cta: 'Elegir día y hora →',
    },
    reels: {
      titulo: 'Trabajos',
      subtitulo: 'Estilo, color y una mirada personal sobre la imagen.',
    },
    testimonios: {
      titulo: 'Lo que dicen los que ya pasaron por acá',
      subtitulo: 'Resultados, no promesas.',
    },
    turnos: {
      titulo: 'Reservá tu turno',
      subtitulo: 'Elegí el servicio, el día y el horario.',
      estadoVacioTitulo: 'Arrancá eligiendo un servicio',
      estadoVacioTexto:
        'Tocá una de las tarjetas de arriba y seguís acá con el día y el horario.',
      estadoVacioBoton: 'Ver servicios ↑',
    },
    ubicacion: {
      titulo: 'Horarios y ubicación',
      subtitulo: 'Turnos con hora fija, sin esperas.',
    },
  },

  // Categorías del paso 0 del wizard (PasoCategoria) y de la grilla de
  // Servicios. El id tiene que matchear el campo `categoria` de cada
  // servicio de abajo.
  categoriasServicios: [
    {
      id: 'cabello',
      nombre: 'Cabello y color',
      nombreCorto: 'Cabello y Color',
      descripcion: 'Corte, color, balayage, babylights e Iona.',
    },
    {
      id: 'imagen',
      nombre: 'Imagen y estilo personal',
      nombreCorto: 'Imagen y Estilo',
      descripcion: 'Asesoría de imagen, maquillaje y peinados.',
    },
  ],

  // Precios y duraciones en 0: no confirmados todavía.
  // TODO: confirmar con el cliente precio, duración y porcentaje de seña de cada servicio.
  servicios: [
    // Cabello y color
    {
      id: 'corte',
      categoria: 'cabello',
      nombre: 'Corte',
      descripcion: 'Corte a medida, pensado según tu forma de cara y tu día a día.',
      duracionMin: 0,
      precio: 0,
      porcentajeSena: 0,
      imagen: fotoCorte,
      destacado: false,
    },
    {
      id: 'color',
      categoria: 'cabello',
      nombre: 'Color',
      descripcion: 'Color de base o retoque de raíz, con la técnica justa para tu tono de piel.',
      duracionMin: 0,
      precio: 0,
      porcentajeSena: 0,
      imagen: fotoColor,
      destacado: false,
    },
    {
      id: 'balayage',
      categoria: 'cabello',
      nombre: 'Balayage',
      descripcion: 'Iluminación degradada y natural, aplicada a mano para un efecto de sol real.',
      duracionMin: 0,
      precio: 0,
      porcentajeSena: 0,
      imagen: fotoBalayage,
      destacado: false,
    },
    {
      id: 'babylights',
      categoria: 'cabello',
      nombre: 'Babylights',
      descripcion: 'Mechas finas y muy sutiles, para un cambio de luz sin perder naturalidad.',
      duracionMin: 0,
      precio: 0,
      porcentajeSena: 0,
      imagen: fotoBabylights,
      destacado: false,
    },
    {
      id: 'iona',
      categoria: 'cabello',
      nombre: 'Iona',
      descripcion: 'Tratamiento de coloración de última generación, cuida la fibra mientras colorea.',
      duracionMin: 0,
      precio: 0,
      porcentajeSena: 0,
      imagen: fotoIona,
      destacado: false,
    },
    // Imagen y estilo personal
    {
      id: 'asesoria-general',
      categoria: 'imagen',
      nombre: 'Asesoría general',
      descripcion: 'Diagnóstico completo de imagen: color, corte y estilo según tu forma de vida.',
      duracionMin: 0,
      precio: 0,
      porcentajeSena: 0,
      imagen: fotoAsesoriaGeneral,
      destacado: true,
    },
    {
      id: 'asesoria-imagen',
      categoria: 'imagen',
      nombre: 'Asesoría de imagen',
      descripcion: 'Trabajo personalizado sobre tu estilo: qué te favorece y por qué, sin recetas genéricas.',
      duracionMin: 0,
      precio: 0,
      porcentajeSena: 0,
      imagen: fotoAsesoriaImagen,
      destacado: false,
    },
    {
      id: 'maquillaje-social',
      categoria: 'imagen',
      nombre: 'Maquillaje social',
      descripcion: 'Maquillaje para el día a día o una salida, natural y de larga duración.',
      duracionMin: 0,
      precio: 0,
      porcentajeSena: 0,
      imagen: fotoMaquillajeSocial,
      destacado: false,
    },
    {
      id: 'maquillaje-evento',
      categoria: 'imagen',
      nombre: 'Maquillaje de evento',
      descripcion: 'Maquillaje de alta duración para fiestas, casamientos y ocasiones especiales.',
      duracionMin: 0,
      precio: 0,
      porcentajeSena: 0,
      imagen: fotoMaquillajeEvento,
      destacado: false,
    },
    {
      id: 'peinado-social',
      categoria: 'imagen',
      nombre: 'Peinado social',
      descripcion: 'Peinado prolijo y resistente para salir, adaptado a tu tipo de cabello.',
      duracionMin: 0,
      precio: 0,
      porcentajeSena: 0,
      imagen: fotoPeinadoSocial,
      destacado: false,
    },
    {
      id: 'peinado-recogido',
      categoria: 'imagen',
      nombre: 'Peinado recogido',
      descripcion: 'Recogido prolijo para eventos, pensado para durar toda la fiesta.',
      duracionMin: 0,
      precio: 0,
      porcentajeSena: 0,
      imagen: fotoPeinadoRecogido,
      destacado: false,
    },
  ],

  reels: [
    {
      video: reel1,
      thumbnail: reel1Poster,
      nombre: 'Look & Arte Estilismo',
      descripcion: 'Un look bien elegido dice mucho de quién sos.',
    },
    {
      video: reel2,
      thumbnail: reel2Poster,
      // TODO: el video muestra a "Marcelo" (estilista y coach en imagen
      // personal), no a Juan — confirmar con el cliente si corresponde
      // reemplazarlo por contenido propio.
      nombre: 'Marcelo',
      descripcion: 'Estilista y coach en imagen personal.',
    },
    {
      video: reel3,
      nombre: 'Look & Arte Estilismo',
      descripcion: 'Hay colores que llaman la atención. Y otros que transmiten personalidad.',
    },
  ],

  // TODO: reemplazar por testimonios reales de clientas y clientes de Juan.
  testimonios: [
    {
      nombre: 'Marina T.',
      texto:
        'Fui a la asesoría de imagen sin muy en claro qué quería y Juan me lo explicó todo: por qué ese corte, por qué ese color. Se nota la técnica atrás de cada decisión.',
      servicio: 'Asesoría de imagen',
    },
    {
      nombre: 'Sol R.',
      texto:
        'El balayage me quedó exactamente como lo hablamos, natural y fácil de mantener. Primera vez que un cambio de color no me generó dudas después.',
      servicio: 'Balayage',
    },
    {
      nombre: 'Camila D.',
      texto:
        'Fui por un peinado para un casamiento y terminé entendiendo mejor mi propio pelo. Atención personalizada de principio a fin.',
      servicio: 'Peinado recogido',
    },
  ],

  // TODO: confirmar horarios reales con el cliente.
  horarios: [
    { dia: 'Lunes', abre: '', cierra: '', cerrado: true },
    { dia: 'Martes', abre: '12:00', cierra: '20:00', cerrado: false },
    { dia: 'Miércoles', abre: '12:00', cierra: '20:00', cerrado: false },
    { dia: 'Jueves', abre: '12:00', cierra: '20:00', cerrado: false },
    { dia: 'Viernes', abre: '12:00', cierra: '20:00', cerrado: false },
    { dia: 'Sábado', abre: '10:00', cierra: '18:00', cerrado: false },
    { dia: 'Domingo', abre: '', cierra: '', cerrado: true },
  ],

  // TODO: confirmar dirección exacta con el cliente.
  ubicacion: {
    direccion: 'Dirección a confirmar',
    barrio: 'Parque Chas',
    ciudad: 'CABA',
    linkGoogleMaps: 'https://maps.google.com/?q=Parque+Chas+CABA',
  },

  // instagram y tiktok son opcionales: dejar en null si el cliente no tiene.
  // TODO: cargar redes sociales reales de Look & Arte Estilismo.
  redes: {
    instagram: null,
    tiktok: null,
  },

  whatsapp: {
    numero: '5491100000000', // sin "+", formato wa.me — PLACEHOLDER, reemplazar por el número real
    mensajes: {
      consultaGeneral: 'Hola, quería consultar por los servicios',
      // {servicio}, {fecha}, {hora} y {nombre} se interpolan al confirmar la reserva.
      reservaTurno:
        'Hola! Soy {nombre}. Quiero confirmar mi turno de {servicio} el {fecha} a las {hora} hs.',
    },
  },

  secciones: {
    testimonios: true,
    reels: true,
    equipo: false,
    promo: true,
  },

  promo: {
    activa: true,
    titulo: '10% OFF en tu primer turno online',
    texto: 'Reservá tu turno online y sumá el descuento en tu primera visita.',
  },

  // Barra fija de promociones, arriba del todo. Rota entre los mensajes cada
  // `rotarCadaSegundos`. El cupón es opcional: si un mensaje no lo trae, no
  // se muestra el badge ni el botón de copiar.
  promoBar: {
    activa: true,
    rotarCadaSegundos: 5,
    mensajes: [
      {
        texto: '10% OFF en tu primer corte o color, reservando online',
        cupon: 'ESTILO10',
      },
      {
        texto: 'Asesoría de imagen: cupo limitado este mes',
        cupon: 'IMAGEN15',
      },
      {
        texto: 'Reservá online y asegurá tu horario',
        cupon: null,
      },
    ],
  },

  // Crédito del desarrollador en el footer.
  creditos: {
    texto: 'Sitio desarrollado por @mateooo.dev',
    url: 'https://mateooo.dev',
  },
}
