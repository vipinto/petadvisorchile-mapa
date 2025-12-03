// ------------------
// CONFIG (mantén aquí tu APP_ID, COLLECTION_ID, API_KEY)
// ------------------
const APP_ID = "7522455b-4cce-421b-b4c2-d8f633640e50";
const COLLECTION_ID = "t_759e49a9054b4f60a1b674a6cd110353";
const API_KEY = "0165hqnms9f8e2w8z36wpvxef"; // pon la misma que ya usabas

// Leer parámetro ?tipo= de la URL
const params = new URLSearchParams(window.location.search);
const tipoFiltro = params.get("tipo"); // veterinaria, rescate, etc.

// ------------------
// MAPA
// ------------------
const map = L.map("map").setView([-33.45, -70.66], 11);

// Fondo del mapa (por ahora, OSM clásico)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Para ajustar el zoom a todos los puntos
const markers = [];

// ------------------
// Cargar datos desde Adalo
// ------------------
fetch(`https://api.adalo.com/v0/apps/${APP_ID}/collections/${COLLECTION_ID}/records`, {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    const servicios = data.records;

    servicios.forEach((s) => {
      // Debe tener coordenadas
      if (!s.latitud || !s.longitud) return;

      // Si hay filtro ?tipo= y este registro no coincide, lo saltamos
      if (tipoFiltro && s.tipo !== tipoFiltro) return;

      const marker = L.marker([s.latitud, s.longitud]).addTo(map);

      const popupHtml = `
        <div>
          <strong>${s.nombre}</strong><br>
          <small>Tel: ${s.telefono || "No disponible"}</small>
        </div>
      `;

      marker.bindPopup(popupHtml);
      markers.push(marker);
    });

    // Ajustar el mapa para que se vean todos los markers
    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.2));
    }
  })
  .catch((err) => console.error("Error cargando datos desde Adalo:", err));
