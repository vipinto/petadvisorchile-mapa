// ------------------
// MAPA
// ------------------
const map = L.map("map").setView([-33.45, -70.66], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// ------------------
// BASE LOCAL DE SERVICIOS
// (agrega todos los que quieras)
// ------------------
const servicios = [
  {
    id: 1,
    placeId: "vet-colina-001",                 // ID para vincular con Adalo
    nombre: "Veterinaria Colina",
    lat: -33.3305,
    lng: -70.6783,
    descripcion: "Urgencias 24 horas",
  },
  {
    id: 2,
    placeId: "tienda-petcenter-001",
    nombre: "Tienda Pet Center",
    lat: -33.4375,
    lng: -70.65,
    descripcion: "Alimentos y accesorios",
  },
  // … agrega más servicios
];

// ------------------
// PINTAR MARCADORES
// ------------------
const markers = [];

servicios.forEach((s) => {
  if (!s.lat || !s.lng) return;

  const marker = L.marker([s.lat, s.lng]).addTo(map);

  markers.push(marker);

  // Cuando el usuario toca un marker:
  marker.on("click", () => {
    const placeId = s.placeId;

    console.log("Marker clickeado, placeId:", placeId);

    // Enviar SOLO el placeId a Adalo a través del WebView
    try {
      if (window && window.postMessage) {
        window.postMessage(placeId, "*");
      }
    } catch (e) {
      console.error("Error enviando placeId a Adalo:", e);
    }
  });
});

// Ajustar el mapa para ver todos los puntos
if (markers.length > 0) {
  const group = L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.2));
}
