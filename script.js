// ------------------
// MAPA BÁSICO
// ------------------
const map = L.map("map").setView([-33.45, -70.66], 11);

// Fondo estable de OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Parámetro ?tipo= de la URL (veterinarias, rescates, etc.)
const params = new URLSearchParams(window.location.search);
const tipoFiltro = params.get("tipo"); // ej: ?tipo=veterinarias

// ------------------
// BASE DE DATOS LOCAL (puedes pegar aquí todos tus servicios)
// ------------------
const servicios = [
  {
    id: 1,
    placeId: "vet-colina-001",           // ID que usarás en Adalo
    nombre: "Veterinaria Colina",
    lat: -33.3305,
    lng: -70.6783,
    telefono: "+56 9 1234 5678",
    tipo: "veterinarias",
  },
  {
    id: 2,
    placeId: "tienda-centro-001",
    nombre: "Tienda Pet Center",
    lat: -33.4375,
    lng: -70.65,
    telefono: "+56 2 2345 6789",
    tipo: "tiendas",
  },
  {
    id: 3,
    placeId: "parque-bicentenario-001",
    nombre: "Parque para Perros Bicentenario",
    lat: -33.399,
    lng: -70.604,
    telefono: "",
    tipo: "parques",
  },
  // 👉 acá sigues agregando: rescates, adiestradores, hoteles, etc.
];

// Para ajustar el mapa a todos los puntos visibles
const markers = [];

// ------------------
// PINTAR LOS SERVICIOS EN EL MAPA
// ------------------
servicios.forEach((s) => {
  // Filtro por tipo si viene en la URL
  if (tipoFiltro && s.tipo !== tipoFiltro) return;

  // Si no tiene coordenadas, lo saltamos
  if (!s.lat || !s.lng) return;

  const marker = L.marker([s.lat, s.lng]).addTo(map);

  // Popup: aquí solo mostramos info básica
  const popupHtml = `
    <div>
      <strong>${s.nombre}</strong><br>
      <small>${s.telefono ? "Tel: " + s.telefono : ""}</small><br>
      <!--
        Link con placeId:
        luego, desde Adalo, puedes usar este placeId para seleccionar el ítem
        de la Simple List si decides capturar la URL o abrir una ficha.
      -->
      <small>Place ID: ${s.placeId}</small>
    </div>
  `;

  marker.bindPopup(popupHtml);
  markers.push(marker);
});

// Ajustar el mapa para que se vean todos los marcadores del tipo actual
if (markers.length > 0) {
  const group = L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.2));
}
