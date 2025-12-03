// Coordenadas iniciales del mapa (ej: Santiago)
const map = L.map("map").setView([-33.45, -70.66], 12);

// Capa base de OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Array de servicios (ejemplo)
const servicios = [
  {
    id: 1,
    nombre: "Veterinaria Colina",
    lat: -33.3305,
    lng: -70.6783,
    descripcion: "Urgencias 24 horas",
    url: "https://tusitio.cl/servicio/1",
  },
  {
    id: 2,
    nombre: "Tienda Pet Center",
    lat: -33.4375,
    lng: -70.65,
    descripcion: "Alimentos y accesorios",
    url: "https://tusitio.cl/servicio/2",
  },
];

// Crear un marcador por cada servicio
servicios.forEach((s) => {
  const marker = L.marker([s.lat, s.lng]).addTo(map);

  // Contenido del popup
  const popupHtml = `
    <div>
      <strong>${s.nombre}</strong><br />
      <small>${s.descripcion}</small><br />
      <a href="${s.url}" target="_blank">Ver detalle</a>
    </div>
  `;

  marker.bindPopup(popupHtml);
});
