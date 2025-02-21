# Automation Central de Pasajes

Automatización de pruebas de backend y frontend con Playwright para Central de Pasajes.

## Descripción

Este repositorio contiene pruebas automatizadas implementadas con [Playwright](https://playwright.dev/). Las pruebas validan el comportamiento de la aplicación, incluyendo interacciones de usuario, validaciones de UI y consumo de APIs. Además, se ha configurado un pipeline de integración continua con GitHub Actions que ejecuta las pruebas de forma automática, por ejemplo, cada lunes a las 15:00 (hora Argentina).

## Características

- **Integración Continua:** Pipeline configurado para ejecutar los tests automáticamente.
- **Reportes de Ejecución:** Generación de reportes para facilitar el análisis de resultados.
- **Paralelización:** Configuración de workers para ejecución en paralelo.

## Requisitos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- npm (o yarn)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio

2. Instala las dependencias:
   ```bash
   npm install

4. Instala las dependencias necesarias para ejecutar los navegadores (especialmente en Linux):
      ```bash
   npx playwright install-deps
   npx playwright install

## Ejecución de Pruebas
Para ejecutar todas las pruebas localmente, utiliza:

    npx playwright test


Para ejecutar solo las pruebas de UI localmente, utiliza:

    npm run test:ui

Para ejecutar solo las pruebas de UI localmente, utiliza:

    npm run test:api

Para ejecutar todas las pruebas desde el pipeline, utiliza:

    Actions/CI Workflows/Run Workflow

## Integración Continua
El proyecto incluye un pipeline de GitHub Actions configurado para ejecutar las pruebas automáticamente. Por ejemplo, se ha configurado para que se ejecute cada lunes a las 15:00 (hora Argentina), que equivale a las 18:00 UTC.

El workflow se encuentra en el archivo:
.github/workflows/schedule.yml


## Estructura del Proyecto
/web: Contiene los archivos de pruebas de la UI.
/backend: Contiene los archivos de pruebas de las APIS.
/support: Scripts de soporte, helpers, fixtures y configuración adicional.
playwright.config.ts: Archivo de configuración de Playwright.
package.json: Scripts y dependencias del proyecto.



## Imagina que ya estamos trabajando juntos y que suite de pruebas
creciera a 500 tests, ¿qué cambios harías o sugerirías en la estructura?

1. Organización por carpetas y módulos:
Tratar de mantener lo mas organizado posible los test y toda la data que se utiliza en los mismos. Si es posible considerar tener repositorios por separado para el BE y FE.

2. Fixtures y datos de prueba:
Utiliza fixtures para preparar estados comunes y datos de prueba, de forma que cada test pueda arrancar en un estado controlado. Esto ayuda a mantener la consistencia y a reducir dependencias entre pruebas. Además de implementar mocks para el front cuando los test requieran llamadas al BE que tengan mucho consumo.

3. Ejecución paralela y segmentación:
Configurar la ejecución en paralelo (usando la opción workers en Playwright) y considera segmentar los tests en distintos grupos o pipelines (por ejemplo, smoke, regresión, pruebas críticas) para optimizar tiempos y aislar problemas. Se puede aplicar el uso de los tags por test.

4. Reportes y análisis de resultados:
Con una suite grande es fundamental tener buenos reportes y registros (logs, screenshots, videos) para detectar rápidamente fallos y tendencias.

5. Mantenimiento y limpieza:
Revisar periódicamente la suite para eliminar tests obsoletos, refactorizar duplicaciones y asegurar que cada test tiene un propósito claro.


## Si hay flakiness en un test, ¿cómo lo manejarías?
Cuando me encuentro con un test que a veces falla sin razón aparente, suelo hacer lo siguiente:

1. Investigar el problema:
Primero trato de ver si el fallo ocurre siempre en las mismas condiciones o si es aleatorio. Habilito logs detallados, capturo screenshots o videos para poder reproducir el fallo y entender qué lo causa.

2. Ajustar las esperas:
Muchas veces el problema viene de que la página o algún elemento tarda en cargar. En lugar de usar tiempos fijos (por ejemplo, esperar 3 segundos), utilizo métodos como waitFor o toBeVisible para asegurarme de que el elemento esté listo antes de interactuar con él.

3. Reintentos (retries):
En ambientes de CI, configuro que los tests se reintenten un par de veces (por ejemplo, con retries: process.env.CI ? 2 : 0). Esto quiere decir que si un test falla, se vuelve a ejecutar hasta 2 veces en CI, pero no se hace en local. Esto ayuda con fallos muy intermitentes, pero es importante no abusar de esto y buscar la causa raíz.

4. Mantener cada test aislado:
Me aseguro de que cada test empiece en un estado limpio, sin datos o configuraciones heredadas de otros tests. Para eso uso fixtures y hooks como beforeEach y afterEach que me ayudan a preparar y limpiar el estado.

5. Controlar la paralelización:
A veces, cuando los tests corren en paralelo, pueden darse condiciones de carrera. Si noto que un test falla solo en modo paralelo, reviso que no esté compartiendo datos con otros tests y, de ser necesario, ajusto la configuración de workers o lo aíslo en otro grupo.

5. Revisar y refactorizar:
Si un test sigue siendo inestable, lo reviso a fondo, intento simplificarlo o dividirlo en partes más pequeñas para identificar mejor dónde está el problema.


##  Archivo .json con los datos obtenidos del happy path en las pruebas de API.
Las respuestas de las apis son guardadas en una carpeta dentro del repositorio en cada ejecución y son dejadas en un artifact con la ejecución del pipeline junto al reporte de plawright.


