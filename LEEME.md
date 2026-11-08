# POMGT · Sitio web ES / EN

Sube el contenido de esta carpeta a la raíz de **https://www.pomgt.com**.

## Estructura
```
index.html, modulos.html, beneficios.html, industrias.html, precios.html, contacto.html, 404.html → español (raíz)
modulos/*.html → 9 páginas de módulo (ES)
en/index.html, en/modules.html, en/benefits.html, en/industries.html, en/pricing.html, en/contact.html, en/404.html → inglés (EE. UU.)
en/modules/*.html → 9 páginas de módulo (EN)
galeria-imagenes.html → galería interna (noindex) con cada imagen, su archivo y su descripción
assets/css/styles.css → una sola hoja de estilos para ES y EN
assets/js/main.js → navbar, menú de módulos, animaciones de scroll, contadores, carga diferida de imágenes
assets/img/es|en/*.svg → ilustraciones animadas sin bordes ni fondos (tipografía IBM Plex Sans incrustada)
assets/img/og/*.png → imagen para compartir (Open Graph / Twitter) por página, 1200×630
assets/brand/ → logo y favicons extraídos de la plataforma
assets/fonts/ → IBM Plex Sans
sitemap.xml → índice de sitemaps · sitemap-es.xml y sitemap-en.xml (hreflang es / es-MX / en / en-US / x-default + imágenes)
mapa-del-sitio.html, en/sitemap.html → mapa del sitio en HTML (enlazado desde el pie de cada página)
robots.txt, site.webmanifest, favicon.ico, .htaccess (redirección pomgt.com → www.pomgt.com, HTTPS, 404 por idioma, caché)
```

## SEO en cada página
title y description únicos, keywords, canonical, hreflang es / es-MX / en / en-US / x-default, Open Graph y Twitter Card con imagen propia, JSON-LD (Organization, WebSite, WebPage, BreadcrumbList, SoftwareApplication y según la página FAQPage, ItemList, Product/Offer, ContactPage), breadcrumbs, un solo H1, alt descriptivo en cada imagen y sitemap de imágenes.

## Precios
Esencial **USD 49 / mes** · Profesional **USD 299 / mes** · Enterprise **a la medida**. Todos con botón *Solicitar demo*. Los límites de usuarios y máquinas son sugeridos; edítalos en `build_site.py → PLANS` o directamente en `precios.html` / `en/pricing.html` (y su JSON-LD).

## Antes de publicar
- `contacto@pomgt.com` es un marcador; cambia el correo y, si usas un servicio de formularios, el `action` del `<form>` en `contacto.html` y `en/contact.html`.
- Configura el servidor para mostrar `404.html` (y `en/404.html`). En Apache/LiteSpeed ya lo hace `.htaccess`.
- Dominio canónico: **https://www.pomgt.com** (con www). Redirige `pomgt.com` → `www.pomgt.com` con 301 (incluido en `.htaccess`; en Netlify, Vercel o Cloudflare configúralo en el panel).
- En Google Search Console y Bing Webmaster Tools registra la propiedad `https://www.pomgt.com` y envía `https://www.pomgt.com/sitemap.xml`.
- Datos de las ilustraciones ficticios. Empresa de ejemplo: *Forja Norte* (planta de autopartes). Clientes: Motriz Autopartes, Ejes del Pacífico, Hidráulica Sonora, Frenos Sierra, Tecnoforja Bajío, Carrocerías Delta, Ensambles Norte. Productos: soporte de motor SM-220, eje de transmisión, mangueta delantera, carcasa de aluminio, brida de acero, polea de cigüeñal. Máquinas: centro de maquinado CNC-08, torno CNC TC-02, celda de soldadura robótica SR-02, cabina de pintura PT-03, prensa hidráulica PH-05, estación CMM MI-01, estación de empaque EM-01.

## Imágenes por página y sección


### Plataforma (inicio) · `index.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · Gestiona tus órdenes de producción de principio a fin. | `pomgt-hero-gestion-ordenes-produccion.svg` | `pomgt-hero-production-order-management.svg` | POMGT: orden de producción con avance, pedido del cliente, máquina produciendo, display de operador en tablet y gráficas de producción |
| Un solo flujo, del pedido al producto terminado. | `pomgt-flujo-cliente-pedido-orden-producto.svg` | `pomgt-flow-customer-order-production-finished-goods.svg` | Flujo de POMGT: cliente, pedido, orden de producción, ruta y máquinas, producto terminado |
| El centro de control de tu manufactura. | `pomgt-tablero-control-produccion.svg` | `pomgt-production-control-dashboard.svg` | Dashboard de producción de POMGT con KPIs, producción semanal, estado de órdenes y actividad reciente |
| Monitorea toda tu área de producción en un mapa 2D. | `pomgt-mapa-planta-2d-maquinas.svg` | `pomgt-plant-floor-2d-map-machines.svg` | Mapa de planta 2D con estados de máquinas y flujo de producción |
| Planifica, ejecuta y cierra cada orden. | `pomgt-gestion-ordenes-produccion.svg` | `pomgt-production-order-management.svg` | Módulo de órdenes de producción con lista, avance y operaciones |
| Displays de producción para tus operadores. | `pomgt-display-operador-tablet.svg` | `pomgt-operator-display-tablet.svg` | Display de operador en tablet con paso, materiales y firma |
| Cada orden, documentada y firmada. | `pomgt-orden-produccion-pdf-firmas.svg` | `pomgt-production-order-pdf-signatures.svg` | Orden de producción en PDF con secuencia de fabricación y firmas |
| Qué materiales lleva cada producto. | `pomgt-estructura-fabricacion-arbol-materiales.svg` | `pomgt-bill-of-materials-tree.svg` | Estructura de fabricación con materiales, cantidades y merma |
| Qué pasos y máquinas sigue cada producto. | `pomgt-rutas-fabricacion-secuencia.svg` | `pomgt-manufacturing-routing-sequence.svg` | Ruta de fabricación con secuencia de pasos y detalle del paso |
| No importa lo que fabriques, el sistema se moldea a TU producción. | `pomgt-se-adapta-a-tu-produccion.svg` | `pomgt-adapts-to-your-production.svg` | Rutas de fabricación para autopartes, muebles, piezas metálicas y alimentos |
| Display de operador | `pomgt-orden-produccion-pdf-trazabilidad.svg` | `pomgt-production-order-pdf-traceability.svg` | Documentos y órdenes PDF |
| Rutas de fabricación | `pomgt-estructura-fabricacion-materiales.svg` | `pomgt-bill-of-materials-structure.svg` | Estructuras de fabricación |
| Estructuras de fabricación | `pomgt-catalogo-materiales-inventario.svg` | `pomgt-materials-inventory-catalog.svg` | Productos y materiales |
| Productos y materiales | `pomgt-pedidos-ordenes-produccion.svg` | `pomgt-sales-orders-production-orders.svg` | Clientes y pedidos |
| Monitor en planta, tablet para operadores, celular para ti. | `pomgt-monitoreo-multi-dispositivo.svg` | `pomgt-multi-device-monitoring.svg` | POMGT en monitor, tablet y celular |

### Módulos · `modulos.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · Nueve módulos, un solo sistema. | `pomgt-gestion-ordenes-produccion.svg` | `pomgt-production-order-management.svg` | Órdenes de producción de POMGT con avance, operaciones y materiales |
| Operación y monitoreo | `pomgt-tablero-control-produccion.svg` | `pomgt-production-control-dashboard.svg` | Dashboard de producción |
| Órdenes de producción | `pomgt-mapa-planta-2d-maquinas.svg` | `pomgt-plant-floor-2d-map-machines.svg` | Mapa de planta |
| Mapa de planta | `pomgt-display-operador-tablet.svg` | `pomgt-operator-display-tablet.svg` | Display de operador |
| Display de operador | `pomgt-orden-produccion-pdf-trazabilidad.svg` | `pomgt-production-order-pdf-traceability.svg` | Documentos y órdenes PDF |
| Ingeniería y catálogo | `pomgt-rutas-fabricacion-secuencia.svg` | `pomgt-manufacturing-routing-sequence.svg` | Rutas de fabricación |
| Rutas de fabricación | `pomgt-estructura-fabricacion-materiales.svg` | `pomgt-bill-of-materials-structure.svg` | Estructuras de fabricación |
| Estructuras de fabricación | `pomgt-catalogo-materiales-inventario.svg` | `pomgt-materials-inventory-catalog.svg` | Productos y materiales |
| Ventas | `pomgt-pedidos-ordenes-produccion.svg` | `pomgt-sales-orders-production-orders.svg` | Clientes y pedidos |

### Tu planta en una sola pantalla, en tiempo real. · `modulos/dashboard-de-produccion.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · Tu planta en una sola pantalla, en tiempo real. | `pomgt-dashboard-indicadores-produccion.svg` | `pomgt-dashboard-production-kpis.svg` | Indicadores del dashboard de producción de POMGT: producción activa, OPs programadas, atrasadas, bloqueadas, producción completada y capacidad utilizada |
| Producido contra planeado, día por día. | `pomgt-dashboard-produccion-semanal.svg` | `pomgt-dashboard-weekly-production.svg` | Gráfica de producción semanal producidas contra planeadas |
| Sabe qué máquinas están al límite. | `pomgt-dashboard-capacidad-maquinas.svg` | `pomgt-dashboard-machine-capacity.svg` | Utilización de capacidad y capacidad por máquina |
| Lo urgente aparece antes de que sea tarde. | `pomgt-dashboard-vencimientos-alertas.svg` | `pomgt-dashboard-due-dates-alerts.svg` | Próximos vencimientos y alertas de producción |
| Funciona mejor conectado. | `pomgt-gestion-ordenes-produccion.svg` | `pomgt-production-order-management.svg` | Órdenes de producción |
| Órdenes de producción | `pomgt-mapa-planta-2d-maquinas.svg` | `pomgt-plant-floor-2d-map-machines.svg` | Mapa de planta |
| Mapa de planta | `pomgt-display-operador-tablet.svg` | `pomgt-operator-display-tablet.svg` | Display de operador |

### Cada orden, cada paso, bajo control. · `modulos/ordenes-de-produccion.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · Cada orden, cada paso, bajo control. | `pomgt-gestion-ordenes-produccion.svg` | `pomgt-production-order-management.svg` | Módulo de producción de POMGT con lista de órdenes, avance, operaciones y KPIs de la orden |
| Mira el flujo de órdenes como prefieras. | `pomgt-produccion-kanban-ordenes.svg` | `pomgt-production-orders-kanban.svg` | Tablero Kanban de órdenes de producción por estado |
| Todo lo de la orden en un vistazo. | `pomgt-orden-produccion-indicadores.svg` | `pomgt-production-order-kpis.svg` | Indicadores de la orden de producción: avance, cantidad, operaciones, materiales y costo real |
| Avance real por operación y por máquina. | `pomgt-orden-produccion-operaciones.svg` | `pomgt-production-order-operations.svg` | Avance por operación de una orden de producción |
| Funciona mejor conectado. | `pomgt-display-operador-tablet.svg` | `pomgt-operator-display-tablet.svg` | Display de operador |
| Display de operador | `pomgt-rutas-fabricacion-secuencia.svg` | `pomgt-manufacturing-routing-sequence.svg` | Rutas de fabricación |
| Rutas de fabricación | `pomgt-orden-produccion-pdf-trazabilidad.svg` | `pomgt-production-order-pdf-traceability.svg` | Documentos y órdenes PDF |

### Toda tu planta, en vivo desde un monitor. · `modulos/mapa-de-planta.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · Toda tu planta, en vivo desde un monitor. | `pomgt-mapa-planta-2d-maquinas.svg` | `pomgt-plant-floor-2d-map-machines.svg` | Mapa de planta 2D de POMGT con máquinas produciendo, en cola, en preparación, mantenimiento y flujo de producción |
| Siete estados, un color para cada uno. | `pomgt-mapa-planta-estados-maquinas.svg` | `pomgt-plant-map-machine-status.svg` | Estados de las máquinas en el mapa de planta |
| Sigue cada orden a través de sus máquinas. | `pomgt-mapa-planta-ordenes-por-fila.svg` | `pomgt-plant-map-orders-by-row.svg` | Vista de filas por orden con los pasos de cada orden por máquina |
| Lo que pasa en cada máquina, al momento. | `pomgt-mapa-planta-maquina-en-vivo.svg` | `pomgt-plant-map-live-machine.svg` | Detalle en vivo de una máquina con cantidad producida y órdenes asignadas |
| Funciona mejor conectado. | `pomgt-tablero-control-produccion.svg` | `pomgt-production-control-dashboard.svg` | Dashboard de producción |
| Dashboard de producción | `pomgt-display-operador-tablet.svg` | `pomgt-operator-display-tablet.svg` | Display de operador |
| Display de operador | `pomgt-rutas-fabricacion-secuencia.svg` | `pomgt-manufacturing-routing-sequence.svg` | Rutas de fabricación |

### Tus operadores producen desde una tablet. · `modulos/display-de-operador.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · Tus operadores producen desde una tablet. | `pomgt-display-operador-tablet.svg` | `pomgt-operator-display-tablet.svg` | Display de operador de POMGT en tablet con paso actual, cantidad producida y materiales listos |
| Antes de producir, se verifica el material. | `pomgt-display-operador-materiales-verificados.svg` | `pomgt-operator-display-materials-verified.svg` | Verificación de materiales del paso en el display de operador |
| Firmar y continuar. Así de simple. | `pomgt-display-operador-firma-registros.svg` | `pomgt-operator-display-signature-log.svg` | Registros del paso y firma del operador para continuar |
| Funciona mejor conectado. | `pomgt-gestion-ordenes-produccion.svg` | `pomgt-production-order-management.svg` | Órdenes de producción |
| Órdenes de producción | `pomgt-mapa-planta-2d-maquinas.svg` | `pomgt-plant-floor-2d-map-machines.svg` | Mapa de planta |
| Mapa de planta | `pomgt-orden-produccion-pdf-trazabilidad.svg` | `pomgt-production-order-pdf-traceability.svg` | Documentos y órdenes PDF |

### La orden completa, en un PDF listo para firmar. · `modulos/documentos-y-ordenes-pdf.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · La orden completa, en un PDF listo para firmar. | `pomgt-orden-produccion-pdf-trazabilidad.svg` | `pomgt-production-order-pdf-traceability.svg` | Orden de producción en PDF generada por POMGT con trazabilidad y firma del operador |
| Cada paso con su hora y su firma. | `pomgt-orden-produccion-pdf-firmas.svg` | `pomgt-production-order-pdf-signatures.svg` | Secuencia de fabricación en el PDF con inicio, fin y firma por paso |
| Cada archivo, ligado a lo que corresponde. | `pomgt-documentos-organizados-por-orden.svg` | `pomgt-documents-organized-by-order.svg` | Documentos organizados por orden de producción, pedido y cliente |
| La historia completa de cada orden. | `pomgt-trazabilidad-actividad-orden.svg` | `pomgt-order-activity-traceability.svg` | Historial de actividad de una orden de producción |
| Funciona mejor conectado. | `pomgt-gestion-ordenes-produccion.svg` | `pomgt-production-order-management.svg` | Órdenes de producción |
| Órdenes de producción | `pomgt-display-operador-tablet.svg` | `pomgt-operator-display-tablet.svg` | Display de operador |
| Display de operador | `pomgt-pedidos-ordenes-produccion.svg` | `pomgt-sales-orders-production-orders.svg` | Clientes y pedidos |

### Define cómo se fabrica cada producto. · `modulos/rutas-de-fabricacion.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · Define cómo se fabrica cada producto. | `pomgt-ruta-fabricacion-pasos-maquinas.svg` | `pomgt-routing-steps-machines.svg` | Ruta de fabricación con seis pasos, máquinas, tiempos de setup y tiempo de ciclo estimado |
| Pasos numerados, versión activa. | `pomgt-rutas-fabricacion-secuencia.svg` | `pomgt-manufacturing-routing-sequence.svg` | Secuencia de fabricación con pasos, versión y detalle del paso |
| Cada paso sabe qué tipo de material usa. | `pomgt-ruta-fabricacion-tipos-materiales.svg` | `pomgt-routing-step-material-types.svg` | Detalle del paso con tipos de materiales usados |
| Funciona mejor conectado. | `pomgt-estructura-fabricacion-materiales.svg` | `pomgt-bill-of-materials-structure.svg` | Estructuras de fabricación |
| Estructuras de fabricación | `pomgt-gestion-ordenes-produccion.svg` | `pomgt-production-order-management.svg` | Órdenes de producción |
| Órdenes de producción | `pomgt-mapa-planta-2d-maquinas.svg` | `pomgt-plant-floor-2d-map-machines.svg` | Mapa de planta |

### Lo que lleva cada producto, definido una sola vez. · `modulos/estructuras-de-fabricacion.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · Lo que lleva cada producto, definido una sola vez. | `pomgt-estructura-fabricacion-arbol-materiales.svg` | `pomgt-bill-of-materials-tree.svg` | Estructura de fabricación de un soporte de motor con siete materiales, tipo, cantidad y merma |
| Materiales, subensambles, consumibles y empaques. | `pomgt-estructura-fabricacion-materiales.svg` | `pomgt-bill-of-materials-structure.svg` | Estructura de fabricación con materiales, versión activa y costo estimado |
| Costo estimado y control de cambios. | `pomgt-estructura-fabricacion-costos-versiones.svg` | `pomgt-bill-of-materials-cost-versions.svg` | Costo por tipo de material y versiones de la estructura |
| Funciona mejor conectado. | `pomgt-rutas-fabricacion-secuencia.svg` | `pomgt-manufacturing-routing-sequence.svg` | Rutas de fabricación |
| Rutas de fabricación | `pomgt-catalogo-materiales-inventario.svg` | `pomgt-materials-inventory-catalog.svg` | Productos y materiales |
| Productos y materiales | `pomgt-gestion-ordenes-produccion.svg` | `pomgt-production-order-management.svg` | Órdenes de producción |

### Tu catálogo y tu inventario, conectados a producción. · `modulos/productos-y-materiales.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · Tu catálogo y tu inventario, conectados a producción. | `pomgt-catalogo-materiales-inventario.svg` | `pomgt-materials-inventory-catalog.svg` | Catálogo de materiales de POMGT con especificaciones, estructuras donde se usa y existencia |
| Existencias a la vista, faltantes antes de que paren la planta. | `pomgt-materiales-existencias-inventario.svg` | `pomgt-materials-stock-inventory.svg` | Inventario de materiales con existencia y nivel contra mínimo |
| La ficha maestra de cada producto. | `pomgt-producto-especificaciones-tecnicas.svg` | `pomgt-product-technical-specifications.svg` | Ficha de producto con especificaciones técnicas y contadores |
| Un solo catálogo para ventas e ingeniería. | `pomgt-catalogo-productos.svg` | `pomgt-product-catalog.svg` | Catálogo de productos con contadores y especificaciones |
| Funciona mejor conectado. | `pomgt-estructura-fabricacion-materiales.svg` | `pomgt-bill-of-materials-structure.svg` | Estructuras de fabricación |
| Estructuras de fabricación | `pomgt-pedidos-ordenes-produccion.svg` | `pomgt-sales-orders-production-orders.svg` | Clientes y pedidos |
| Clientes y pedidos | `pomgt-rutas-fabricacion-secuencia.svg` | `pomgt-manufacturing-routing-sequence.svg` | Rutas de fabricación |

### Del pedido del cliente a la orden de producción. · `modulos/clientes-y-pedidos.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · Del pedido del cliente a la orden de producción. | `pomgt-pedido-lineas-ordenes-produccion.svg` | `pomgt-sales-order-lines-production-orders.svg` | Pedido de cliente con sus líneas ligadas a órdenes de producción y su avance |
| Todo lo de cada cliente en su ficha. | `pomgt-cliente-indicadores-contactos.svg` | `pomgt-customer-kpis-contacts.svg` | Ficha de cliente con indicadores, información general, contactos y direcciones |
| Cada pedido sabe cuánto lleva. | `pomgt-pedidos-ordenes-produccion.svg` | `pomgt-sales-orders-production-orders.svg` | Pedido conectado a sus órdenes de producción con avance |
| Tu cartera completa, ordenada. | `pomgt-registro-clientes.svg` | `pomgt-customer-records.svg` | Registro de clientes con lista, contadores y contactos |
| Funciona mejor conectado. | `pomgt-gestion-ordenes-produccion.svg` | `pomgt-production-order-management.svg` | Órdenes de producción |
| Órdenes de producción | `pomgt-catalogo-materiales-inventario.svg` | `pomgt-materials-inventory-catalog.svg` | Productos y materiales |
| Productos y materiales | `pomgt-orden-produccion-pdf-trazabilidad.svg` | `pomgt-production-order-pdf-traceability.svg` | Documentos y órdenes PDF |

### Beneficios · `beneficios.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · Menos llamadas a planta. Más producción entregada a tiempo. | `pomgt-monitoreo-multi-dispositivo.svg` | `pomgt-multi-device-monitoring.svg` | POMGT en monitor de planta, tablet de operador y celular |
| Menos llamadas a planta. Más producción entregada a tiempo. | `pomgt-resultados-indicadores.svg` | `pomgt-results-kpis.svg` | Indicadores de ejemplo: entregas a tiempo, trazabilidad, tiempo de planeación y capacidad utilizada |
| Decide con números, no con suposiciones. | `pomgt-dashboard-indicadores-produccion.svg` | `pomgt-dashboard-production-kpis.svg` | Indicadores del dashboard para dirección |
| Prioriza y programa sin hojas de cálculo. | `pomgt-produccion-kanban-ordenes.svg` | `pomgt-production-orders-kanban.svg` | Kanban de órdenes para planeación |
| Instrucciones claras en su tablet. | `pomgt-display-operador-firma-registros.svg` | `pomgt-operator-display-signature-log.svg` | Display de operador con registros y firma |
| Respuestas al cliente en segundos. | `pomgt-pedido-lineas-ordenes-produccion.svg` | `pomgt-sales-order-lines-production-orders.svg` | Pedido ligado a órdenes de producción para ventas |
| La historia de cada orden, con evidencia. | `pomgt-trazabilidad-actividad-orden.svg` | `pomgt-order-activity-traceability.svg` | Historial de actividad de una orden de producción |
| Tu proceso, no el nuestro. | `pomgt-se-adapta-a-tu-produccion.svg` | `pomgt-adapts-to-your-production.svg` | Rutas para distintos tipos de manufactura |

### Industrias · `industrias.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · No importa lo que fabriques, POMGT se moldea a TU producción. | `pomgt-se-adapta-a-tu-produccion.svg` | `pomgt-adapts-to-your-production.svg` | Rutas de fabricación de POMGT para automotriz, muebles, piezas metálicas y alimentos |
| Tus pasos, tus máquinas, tu orden. | `pomgt-ruta-fabricacion-pasos-maquinas.svg` | `pomgt-routing-steps-machines.svg` | Ruta de fabricación con pasos y máquinas de un soporte de motor |
| Lo que lleva cada producto, sin adivinar. | `pomgt-estructura-fabricacion-arbol-materiales.svg` | `pomgt-bill-of-materials-tree.svg` | Estructura de fabricación con materiales, cantidades y merma |
| Tu piso de producción, tal como es. | `pomgt-mapa-planta-estados-maquinas.svg` | `pomgt-plant-map-machine-status.svg` | Estados de máquinas en el mapa de planta |

### Precios · `precios.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · Un plan para cada tamaño de planta. | `pomgt-dashboard-indicadores-produccion.svg` | `pomgt-dashboard-production-kpis.svg` | Indicadores de producción de POMGT: producción activa, OPs programadas, capacidad y alertas |

### Contacto · `contacto.html`

| Sección | Archivo ES (`assets/img/es/`) | Archivo EN (`assets/img/en/`) | Qué muestra |
|---|---|---|---|
| Hero (fondo) · Hablemos de tu producción. | `pomgt-display-operador-tablet.svg` | `pomgt-operator-display-tablet.svg` | Display de operador de POMGT en tablet con paso, materiales y firma |

## Formulario de demo (modal) · EmailJS + Supabase
- `assets/js/leads.js` abre el formulario como **modal** (`<dialog>`) desde cualquier botón *Solicitar demo / Request a demo / Contacto*; en `contacto.html` y `en/contact.html` el mismo formulario aparece dentro de la página. Desde `precios.html` el plan elegido se preselecciona y el lead se guarda con `source = 'cotizador'`. También se abre con `#demo` en la URL (ej. `https://www.pomgt.com/#demo`).
- Cada envío: **1)** inserta en Supabase `public.contact_leads` (full_name, company, email, phone, process_problem, current_impact, industry, quote_summary, lang, page_url, source) y **2)** envía el correo con EmailJS (`service_mr6qhfy`, `template_y4y0gl8`; variables `title, nombre, empresa, correo, telefono, producto, cantidad, entrega, descripcion, reply_to`). Si cualquiera de los dos funciona, el usuario ve la confirmación.
- **Pendiente:** pega tu *Public Key* de EmailJS en `assets/js/leads.js → CONFIG.emailjs.publicKey` (EmailJS › Account › General). Sin ella solo se guarda en Supabase.
- En EmailJS › Account › Security puedes limitar los envíos a `www.pomgt.com`.
- Supabase: la tabla debe permitir `INSERT` al rol `anon` (ya verificado) y **no** `SELECT`, para que nadie pueda leer los leads con la llave pública.
- Anti-spam: campo trampa oculto y tiempo mínimo de llenado.

## Transiciones
Transiciones entre páginas (View Transitions), revelado escalonado al hacer scroll, barra de progreso de lectura, botón “volver arriba”, menú móvil animado, FAQ con apertura suave, parallax suave del hero en escritorio. Todo se desactiva con *Reducir movimiento* del sistema operativo.
