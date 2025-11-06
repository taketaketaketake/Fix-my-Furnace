import { d as createComponent, r as renderTemplate, k as defineScriptVars, m as maybeRenderHead } from './astro/server_Biyn9gVN.mjs';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$ServiceAreasSection = createComponent(async ($$result, $$props, $$slots) => {
  const MAPBOX_TOKEN = "pk.eyJ1IjoidGFrZS1kZXRyb2l0LXRlY2giLCJhIjoiY21oYms0ODh4MGZpZDJqb2FmcjVkcW1taSJ9.CIimHYrJ3F2r1bJNgREdGA";
  return renderTemplate(_a || (_a = __template(["", '<section class="relative bg-gradient-to-br from-red-50 via-white to-orange-50 py-20 px-6 md:px-10"> <div class="max-w-7xl mx-auto"> <!-- Header --> <div class="text-center mb-12"> <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">\nWe <span class="text-red-600">Service All of Michigan</span> </h2> <p class="text-lg md:text-xl font-semibold text-gray-700 max-w-3xl mx-auto">\nFrom Detroit to Grand Rapids, Ann Arbor to Flint — if there’s a furnace in Michigan, we’ll fix it.\n</p> </div> <!-- Layout --> <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"> <!-- Map --> <div class="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-200"> <div id="map" class="w-full h-full"></div> </div> <!-- City List --> <div class="flex flex-col justify-center"> <h3 class="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-red-600 pl-3">\nFeatured Service Areas\n</h3> <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-lg font-semibold text-gray-800"> ', ` </ul> <p class="text-gray-600 mt-8 text-base md:text-lg">
Can't find your city listed? Don't worry — our network of licensed technicians and trusted partners covers every corner of Michigan.
<span class="font-bold text-red-600">Call today</span> to get your local tech scheduled.
</p> </div> </div> </div> <!-- Lucide (UMD) --> <script type="module" src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script> <!-- Mapbox GL JS + CSS (inline so they survive SSR) --> <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script> <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet"> <!-- Map + Lucide init – token is injected safely --> <script>(function(){`, `
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  
    if (typeof window !== 'undefined' && MAPBOX_TOKEN) {
      mapboxgl.accessToken = MAPBOX_TOKEN;
  
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-84.5, 44.3],
        zoom: 6.2,
        interactive: false
      });
  
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  
      map.on('load', async () => {
        try {
          // === 1. Michigan State Fill ===
          const stateResp = await fetch('https://raw.githubusercontent.com/glynnbird/usstatesgeojson/master/mi_michigan.geojson');
          if (!stateResp.ok) throw new Error('State failed');
          const stateData = await stateResp.json();
  
          map.addSource('michigan-state', { type: 'geojson', data: stateData });
          map.addLayer({
            id: 'michigan-fill',
            type: 'fill',
            source: 'michigan-state',
            paint: { 'fill-color': '#ef4444', 'fill-opacity': 0.06 }
          });
  
          // === 2. Michigan Counties – FIXED ===
          let countyData = null;
          try {
            const resp = await fetch('https://raw.githubusercontent.com/PublicaMundi/Municipalities/master/geojson/usa/michigan-counties.geojson');
            if (!resp.ok) throw new Error('Counties 404');
            const rawData = await resp.json();
  
            countyData = {
              ...rawData,
              features: rawData.features.map((f, i) => ({
                ...f,
                id: i,  // ← NUMBER ID (critical!)
                properties: {
                  ...f.properties,
                  NAME: f.properties?.NAME || \`County \${i + 1}\`
                }
              }))
            };
          } catch (e) {
            console.warn('Counties failed:', e);
          }
  
          if (countyData && countyData.features?.length > 0) {
            map.addSource('michigan-counties', { type: 'geojson', data: countyData });
  
            // Wait for source to load, THEN add layers
            map.on('sourcedata', function(e) {
              if (e.sourceId === 'michigan-counties' && e.isSourceLoaded) {
                if (!map.getLayer('county-borders')) {
                  map.addLayer({
                    id: 'county-borders',
                    type: 'line',
                    source: 'michigan-counties',
                    paint: {
                      'line-color': '#dc2626',
                      'line-width': 1.8,
                      'line-opacity': 0.95
                    }
                  });
  
                  map.addLayer({
                    id: 'county-hover',
                    type: 'fill',
                    source: 'michigan-counties',
                    paint: {
                      'fill-color': '#dc2626',
                      'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.2, 0]
                    }
                  });
                }
              }
            });
  
            // Hover logic (now works)
            let hoveredId = null;
            map.on('mousemove', 'county-borders', (e) => {
              if (e.features.length > 0) {
                const feature = e.features[0];
                if (hoveredId !== null) {
                  map.setFeatureState({ source: 'michigan-counties', id: hoveredId }, { hover: false });
                }
                hoveredId = feature.id;
                map.setFeatureState({ source: 'michigan-counties', id: hoveredId }, { hover: true });
                map.getCanvas().style.cursor = 'pointer';
              }
            });
  
            map.on('mouseleave', 'county-borders', () => {
              if (hoveredId !== null) {
                map.setFeatureState({ source: 'michigan-counties', id: hoveredId }, { hover: false });
              }
              hoveredId = null;
              map.getCanvas().style.cursor = '';
            });
          }
  
          // === 3. City Markers ===
          const cities = [
            { name: 'Detroit', coords: [-83.0458, 42.3314] },
            { name: 'Ann Arbor', coords: [-83.7430, 42.2808] },
            { name: 'Grand Rapids', coords: [-85.6681, 42.9634] },
            { name: 'Lansing', coords: [-84.5555, 42.7325] },
            { name: 'Flint', coords: [-83.6875, 43.0125] },
            { name: 'Kalamazoo', coords: [-85.5872, 42.2917] },
            { name: 'Traverse City', coords: [-85.6206, 44.7631] },
            { name: 'Saginaw', coords: [-83.9508, 43.4195] }
          ];
  
          cities.forEach(city => {
            const el = document.createElement('div');
            el.className = 'w-8 h-8 bg-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center';
            el.innerHTML = \`<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>\`;
            new mapboxgl.Marker(el)
              .setLngLat(city.coords)
              .setPopup(new mapboxgl.Popup({ offset: 30 }).setHTML(\`<strong class="text-red-600">\${city.name}</strong>\`))
              .addTo(map);
          });
  
        } catch (e) {
          console.error('Map failed:', e);
        }
      });
  
      window.addEventListener('resize', () => map.resize());
    }
  })();</script> </section>`], ["", '<section class="relative bg-gradient-to-br from-red-50 via-white to-orange-50 py-20 px-6 md:px-10"> <div class="max-w-7xl mx-auto"> <!-- Header --> <div class="text-center mb-12"> <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">\nWe <span class="text-red-600">Service All of Michigan</span> </h2> <p class="text-lg md:text-xl font-semibold text-gray-700 max-w-3xl mx-auto">\nFrom Detroit to Grand Rapids, Ann Arbor to Flint — if there’s a furnace in Michigan, we’ll fix it.\n</p> </div> <!-- Layout --> <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"> <!-- Map --> <div class="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-200"> <div id="map" class="w-full h-full"></div> </div> <!-- City List --> <div class="flex flex-col justify-center"> <h3 class="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-red-600 pl-3">\nFeatured Service Areas\n</h3> <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-lg font-semibold text-gray-800"> ', ` </ul> <p class="text-gray-600 mt-8 text-base md:text-lg">
Can't find your city listed? Don't worry — our network of licensed technicians and trusted partners covers every corner of Michigan.
<span class="font-bold text-red-600">Call today</span> to get your local tech scheduled.
</p> </div> </div> </div> <!-- Lucide (UMD) --> <script type="module" src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script> <!-- Mapbox GL JS + CSS (inline so they survive SSR) --> <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script> <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet"> <!-- Map + Lucide init – token is injected safely --> <script>(function(){`, `
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  
    if (typeof window !== 'undefined' && MAPBOX_TOKEN) {
      mapboxgl.accessToken = MAPBOX_TOKEN;
  
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-84.5, 44.3],
        zoom: 6.2,
        interactive: false
      });
  
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  
      map.on('load', async () => {
        try {
          // === 1. Michigan State Fill ===
          const stateResp = await fetch('https://raw.githubusercontent.com/glynnbird/usstatesgeojson/master/mi_michigan.geojson');
          if (!stateResp.ok) throw new Error('State failed');
          const stateData = await stateResp.json();
  
          map.addSource('michigan-state', { type: 'geojson', data: stateData });
          map.addLayer({
            id: 'michigan-fill',
            type: 'fill',
            source: 'michigan-state',
            paint: { 'fill-color': '#ef4444', 'fill-opacity': 0.06 }
          });
  
          // === 2. Michigan Counties – FIXED ===
          let countyData = null;
          try {
            const resp = await fetch('https://raw.githubusercontent.com/PublicaMundi/Municipalities/master/geojson/usa/michigan-counties.geojson');
            if (!resp.ok) throw new Error('Counties 404');
            const rawData = await resp.json();
  
            countyData = {
              ...rawData,
              features: rawData.features.map((f, i) => ({
                ...f,
                id: i,  // ← NUMBER ID (critical!)
                properties: {
                  ...f.properties,
                  NAME: f.properties?.NAME || \\\`County \\\${i + 1}\\\`
                }
              }))
            };
          } catch (e) {
            console.warn('Counties failed:', e);
          }
  
          if (countyData && countyData.features?.length > 0) {
            map.addSource('michigan-counties', { type: 'geojson', data: countyData });
  
            // Wait for source to load, THEN add layers
            map.on('sourcedata', function(e) {
              if (e.sourceId === 'michigan-counties' && e.isSourceLoaded) {
                if (!map.getLayer('county-borders')) {
                  map.addLayer({
                    id: 'county-borders',
                    type: 'line',
                    source: 'michigan-counties',
                    paint: {
                      'line-color': '#dc2626',
                      'line-width': 1.8,
                      'line-opacity': 0.95
                    }
                  });
  
                  map.addLayer({
                    id: 'county-hover',
                    type: 'fill',
                    source: 'michigan-counties',
                    paint: {
                      'fill-color': '#dc2626',
                      'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.2, 0]
                    }
                  });
                }
              }
            });
  
            // Hover logic (now works)
            let hoveredId = null;
            map.on('mousemove', 'county-borders', (e) => {
              if (e.features.length > 0) {
                const feature = e.features[0];
                if (hoveredId !== null) {
                  map.setFeatureState({ source: 'michigan-counties', id: hoveredId }, { hover: false });
                }
                hoveredId = feature.id;
                map.setFeatureState({ source: 'michigan-counties', id: hoveredId }, { hover: true });
                map.getCanvas().style.cursor = 'pointer';
              }
            });
  
            map.on('mouseleave', 'county-borders', () => {
              if (hoveredId !== null) {
                map.setFeatureState({ source: 'michigan-counties', id: hoveredId }, { hover: false });
              }
              hoveredId = null;
              map.getCanvas().style.cursor = '';
            });
          }
  
          // === 3. City Markers ===
          const cities = [
            { name: 'Detroit', coords: [-83.0458, 42.3314] },
            { name: 'Ann Arbor', coords: [-83.7430, 42.2808] },
            { name: 'Grand Rapids', coords: [-85.6681, 42.9634] },
            { name: 'Lansing', coords: [-84.5555, 42.7325] },
            { name: 'Flint', coords: [-83.6875, 43.0125] },
            { name: 'Kalamazoo', coords: [-85.5872, 42.2917] },
            { name: 'Traverse City', coords: [-85.6206, 44.7631] },
            { name: 'Saginaw', coords: [-83.9508, 43.4195] }
          ];
  
          cities.forEach(city => {
            const el = document.createElement('div');
            el.className = 'w-8 h-8 bg-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center';
            el.innerHTML = \\\`<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>\\\`;
            new mapboxgl.Marker(el)
              .setLngLat(city.coords)
              .setPopup(new mapboxgl.Popup({ offset: 30 }).setHTML(\\\`<strong class="text-red-600">\\\${city.name}</strong>\\\`))
              .addTo(map);
          });
  
        } catch (e) {
          console.error('Map failed:', e);
        }
      });
  
      window.addEventListener('resize', () => map.resize());
    }
  })();</script> </section>`])), maybeRenderHead(), [
    "Detroit Metro",
    "Ann Arbor",
    "Flint",
    "Grand Rapids",
    "Lansing",
    "Kalamazoo",
    "Traverse City",
    "Saginaw"
  ].map((city) => renderTemplate`<li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-5 h-5 text-red-600"></i> ${city} </li>`), defineScriptVars({ MAPBOX_TOKEN }));
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/components/ServiceAreasSection.astro", void 0);

export { $$ServiceAreasSection as $ };
