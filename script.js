// ------------------
// CONFIG
// ------------------
const APP_ID = "7522455b-4cce-421b-b4c2-d8f633640e50";
const COLLECTION_ID = "t_759e49a9054b4f60a1b674a6cd110353";
const API_KEY = "016shqnms9f8e2w8z36wpvxef"; // ⚠️ No exponer en repos públicos

// ------------------
// MAPA
// ------------------
const map = L.map("map").setView([-33.45, -70.66], 11);

// Estilo minimalista tipo Waze
const map = L.map("map").setView([-33.45, -70.66], 11);

// FONDO DEL MAPA (cámbialo por este)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);


// ------------------
// Cargar datos dinámicos desde Adalo
// ------------------
fetch(`https://api.adalo.com/v0/apps/${APP_ID}/collections/${COLLECTION_ID}/records`, {
  headers: {
    Authorization: `Bearer ${API_KEY}`
  }
})
  .then(res => res.json())
  .then(data => {
    const servicios = data.records;

    servicios.forEach(s => {
      // Validar que tenga coordenadas
      if (!s.latitud || !s.longitud) return;

      // Crear marker
      const marker = L.marker([s.latitud, s.longitud]).addTo(map);

      // Popup
      const popupHtml = `
        <div>
          <strong>${s.nombre}</strong><br>
          <small>Tel: ${s.telefono || "No disponible"}</small><br>
          Lat: ${s.latitud}, Lng: ${s.longitud}
        </div>
      `;

      marker.bindPopup(popupHtml);
    });
  })
  .catch(err => console.error("Error cargando datos desde Adalo:", err));
