import { test } from "@playwright/test";
import { getTodayDateDay, getTomorrowDateDay } from "../../../utils/dates";
import HomePage from "../../support/pages/home";

let home: HomePage;

test.beforeEach("Open and check Title", async ({ page }) => {
  home = new HomePage(page);
  await home.goto();
  await home.form.getSectionTitle();
  //Verificamos que el formulario esta visible
  await home.form.getForm();
});

test.describe("Se verifica búsqueda exitosa viajes nacionales", () => {
  test("Búsqueda exitosa 1 pasajero viaje nacional", async () => {
    //Seleccionamos Destino
    await home.form.selectDestino("TUC");

    //Seleccionamos Origen
    await home.form.selectOrigen("BUE");

    //Seleccionamos fecha de ida
    const today = await getTomorrowDateDay();
    await home.form.selectFechaIda(today);

    //Presionamos Buscar
    await home.form.clikcOnBtnBuscar();

    //Verificamos que la búsqueda arrojó resultados
    await home.form.verifyResultPage();
  });

  test("Búsqueda sin resultados 1 pasajero viaje nacional solo ida", async () => {
    //Seleccionamos Destino
    await home.form.selectDestino("OBE");

    //Seleccionamos Origen
    await home.form.selectOrigen("BAR");

    //Seleccionamos fecha de ida
    const today = await getTodayDateDay();
    await home.form.selectFechaIda(today);

    //Presionamos Buscar
    await home.form.clikcOnBtnBuscar();

    //Verificamos cartel de error por no encontrar resultados.
    await home.form.getModalDialog();
  });
  test("Búsqueda exitosa 1 pasajero viaje nacional ida y vuelta", async () => {
    //Seleccionamos Destino
    await home.form.selectDestino("TUC");

    //Seleccionamos Origen
    await home.form.selectOrigen("BUE");

    //Seleccionamos radio Ida y Vuelta
    await home.form.selectRadioIdaVuelta();

    //Seleccionamos fecha de ida
    const today = await getTomorrowDateDay();
    await home.form.selectFechaIda(today);

    //Seleccionamos fecha de vuelta
    const tomorrow = await getTomorrowDateDay();
    await home.form.selectFechaVuelta(tomorrow);

    //Presionamos Buscar
    await home.form.clikcOnBtnBuscar();

    //Verificamos que la búsqueda arrojó resultados
    await home.form.verifyResultPage();
  });

  test("Búsqueda sin resultados 1 pasajero viaje nacional ida y vuelta", async () => {
    //Seleccionamos Destino
    await home.form.selectDestino("OBE");

    //Seleccionamos Origen
    await home.form.selectOrigen("BAR");

    //Seleccionamos radio Ida y Vuelta
    await home.form.selectRadioIdaVuelta();

    //Seleccionamos fecha de ida
    const today = await getTodayDateDay();
    await home.form.selectFechaIda(today);

    //Seleccionamos vuelta
    const vuelta = await getTodayDateDay();
    await home.form.selectFechaVuelta(vuelta);

    //Presionamos Buscar
    await home.form.clikcOnBtnBuscar();

    //Verificamos cartel de error por no encontrar resultados.
    await home.form.getModalDialog();
  });
});
