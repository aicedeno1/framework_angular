# 🔬 PLOS Article Searcher

Buscador de artículos científicos usando la API de PLOS (Public Library of Science).

## 📋 Características

- ✅ Búsqueda de artículos por palabras clave
- ✅ Tabla de resultados con columnas: #, Título, Journal, Fecha, DOI
- ✅ Enlaces directos a los artículos (DOI)
- ✅ Paginación configurable (5, 10, 20, 50 artículos por página)
- ✅ Exportación a CSV
- ✅ Exportación a PDF
- ✅ Diseño responsivo y moderno

## 🚀 Instalación

### Prerrequisitos

Necesitas tener instalado:
- **Node.js** (versión 18 o superior): [Descargar aquí](https://nodejs.org/)
- **npm** (viene incluido con Node.js)

### Pasos de Instalación

1. **Verifica que Node.js esté instalado:**
   ```bash
   node --version
   npm --version
   ```

2. **Instala las dependencias del proyecto:**
   ```bash
   npm install
   ```

3. **Instala Angular CLI globalmente (si no lo tienes):**
   ```bash
   npm install -g @angular/cli
   ```

## 🎮 Uso

### Ejecutar la aplicación en modo desarrollo

```bash
npm start
```

o

```bash
ng serve
```

La aplicación estará disponible en: `http://localhost:4200/`

### Compilar para producción

```bash
ng build
```

Los archivos compilados estarán en la carpeta `dist/`

## 📖 Cómo usar la aplicación

1. **Buscar artículos:**
   - Escribe un término de búsqueda en el campo de texto (ej: "cancer", "climate change", "covid")
   - Presiona "Buscar" o Enter

2. **Navegar por los resultados:**
   - Usa los botones "Anterior" y "Siguiente" para navegar entre páginas
   - Cambia el número de artículos por página usando el selector

3. **Exportar resultados:**
   - **CSV:** Haz clic en "Exportar a CSV" para descargar los resultados de la página actual
   - **PDF:** Haz clic en "Exportar a PDF" para generar un documento PDF con los resultados

4. **Acceder a los artículos:**
   - Haz clic en cualquier DOI en la tabla para abrir el artículo en una nueva pestaña

## 🛠️ Tecnologías utilizadas

- **Angular 17** - Framework principal
- **TypeScript** - Lenguaje de programación
- **RxJS** - Programación reactiva
- **jsPDF** - Generación de PDFs
- **jsPDF-AutoTable** - Tablas en PDF
- **PLOS Search API** - Fuente de datos

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── models/
│   │   └── article.model.ts      # Interfaces de datos
│   ├── services/
│   │   └── plos.service.ts       # Servicio de API
│   ├── app.component.ts          # Componente principal
│   ├── app.component.html        # Template HTML
│   ├── app.component.css         # Estilos del componente
│   └── app.module.ts             # Módulo principal
├── styles.css                     # Estilos globales
├── index.html                     # HTML principal
└── main.ts                        # Punto de entrada

```

## 🌐 API de PLOS

Esta aplicación utiliza la API pública de PLOS:
- **Endpoint:** `https://api.plos.org/search`
- **Documentación:** [PLOS Search API](http://api.plos.org/)

### Ejemplo de consulta:
```
https://api.plos.org/search?q=title:cancer&start=0&rows=10&wt=json
```

## 🎨 Características de la UI

- Diseño moderno con gradientes
- Tabla responsiva
- Animaciones suaves en botones
- Indicadores de carga
- Mensajes de error amigables
- Colores profesionales

## 📝 Notas

- La API de PLOS puede tener límites de tasa. Si encuentras errores, espera unos momentos antes de volver a intentar.
- Los DOI enlazan directamente a los artículos en el sitio web de PLOS.
- La exportación a CSV incluye caracteres UTF-8 BOM para compatibilidad con Excel.

## 🐛 Solución de problemas

**Error: "ng: command not found"**
- Instala Angular CLI: `npm install -g @angular/cli`

**Error al instalar dependencias:**
- Elimina `node_modules` y `package-lock.json`
- Ejecuta: `npm install` nuevamente

**El servidor no inicia:**
- Verifica que el puerto 4200 no esté en uso
- Intenta con otro puerto: `ng serve --port 4300`

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

---

Desarrollado con ❤️ usando Angular
