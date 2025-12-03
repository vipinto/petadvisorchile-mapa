// Datos del mapa
const map = L.map("map").setView([-33.45, -70.66], 11);

// Fondo del mapa
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// BASE DE DATOS LOCAL CON PLACE ID
const servicios = [
  {
    id: 1,
    placeId: "vet-colina-001",      // ← dato oculto
    nombre: "Veterinaria Colina",
    lat: -33.3305,
    lng: -70.6783,
    descripcion: "Urgencias 24 horas",
    url: "https://ejemplo.cl/servicio/1"
  },
  {
    id: 2,
    placeId: "tienda-centro-001",
    nombre: "Tienda Pet Center",
    lat: -33.4375,
    lng: -70.65,
    descripcion: "Alimentos y accesorios",
    url: "https://ejemplo.cl/servicio/2"
  }
];

// MOSTRAR SERVICIOS EN EL MAPA
servicios.forEach((s) => {
  const marker = L.marker([s.lat, s.lng]).addTo(map);

  const popupHtml = `
    <div>
      <strong>${s.nombre}</strong><br>
      <small>${s.descripcion}</small><br>
      <a href="${s.url}" target="_blank">Ver más</a>
    </div>
  `;

  marker.bindPopup(popupHtml);

  // EJEMPLO: cuando se haga click al marcador, imprimes el placeId
  marker.on("click", () => {
    console.log("PLACE ID:", s.placeId);

    // Aquí puedes enviar a Adalo
    // window.postMessage(s.placeId);
  });
});
