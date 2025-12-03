// ID de tu app y colección de Adalo
const APP_ID = "7522455b-4cce-421b-b4c2-d8f633640e50";
const COLLECTION_ID = "t_759e49a9054b4f60a1b67a46cd110353";

// API Key de Adalo (ojo: es privada)
const API_KEY = "Bearer 0165hqnms9f8e2w8z36wpvxef";

// Crear mapa centrado donde quieras
const map = L.map("map").setView([-33.45, -70.66], 11);

// Tile minimalista (puedes cambiarlo)
L.tileLayer("https://stamen-tiles.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png", {
  maxZoom: 20,
  attribution: "&copy; OpenStreetMap contributors & Stamen Design",
}).addTo(map);


// Leer servicios desde Adalo
fetch(`https://api.adalo.com/v2/apps/${APP_ID}/collections/${COLLECTION_ID}/records`, {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    const servicios = data.records;

    servicios.forEach((s) => {
      if (!s.lat || !s.lng) return;

      const marker = L.marker([s.lat, s.lng]).addTo(map);

      const popupHtml = `
        <div>
          <strong>${s.nombre}</strong><br />
          <small>${s.descripcion || ""}</small><br />
          ${
            s.url
              ? `<a href="${s.url}" target="_blank">Ver detalle</a>`
              : ""
          }
        </div>
      `;

      marker.bindPopup(popupHtml);
    });
  })
  .catch((err) => console.error("Error cargando Adalo:", err));
