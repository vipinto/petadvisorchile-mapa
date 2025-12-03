// -------------------------
// BASE DE DATOS LOCAL
// -------------------------
const servicios = [
  {
    id: 1,
    placeId: "vet-colina-001", // ID que usarás en Adalo
    nombre: "Veterinaria Colina",
    lat: -33.3305,
    lng: -70.6783,
    telefono: "+56 9 1234 5678",
    tipo: "veterinarias",
  },
  // Aquí puedes agregar más servicios si quieres:
  // {
  //   id: 2,
  //   placeId: "otro-lugar-001",
  //   nombre: "Otro Lugar",
  //   lat: -33.45,
  //   lng: -70.66,
  //   telefono: "+56 9 2222 3333",
  //   tipo: "tiendas",
  // },
];

// -------------------------
// INICIALIZAR MAPA
// -------------------------

// Si hay servicios, centra el mapa en el primero.
// Si no, usa un centro por defecto (Santiago).
const centroLat = servicios.length ? servicios[0].lat : -33.45;
const centroLng = servicios.length ? servicios[0].lng : -70.66;

const map = L.map("map").setView([centroLat, centroLng], 13);

// Fondo de mapa (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// -------------------------
// PINTAR MARCADORES
// -------------------------

servicios.forEach((servicio) => {
  if (typeof servicio.lat !== "number" || typeof servicio.lng !== "number") {
    return; // Si falta lat/lng, saltamos este servicio
  }

  const marker = L.marker([servicio.lat, servicio.lng]).addTo(map);

  // Contenido del popup
  const popupHtml = `
    <div style="font-size:14px;">
      <strong>${servicio.nombre}</strong><br/>
      <span><b>Teléfono:</b> ${servicio.telefono || "No registrado"}</span><br/>
      <span><b>Tipo:</b> ${servicio.tipo || "Sin tipo"}</span><br/>
      <span style="font-size:11px; color:#666;">
        ID Adalo: ${servicio.placeId || "N/A"}
      </span>
    </div>
  `;

  marker.bindPopup(popupHtml);
});
