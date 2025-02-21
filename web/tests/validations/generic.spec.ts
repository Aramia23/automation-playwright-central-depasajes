import { test } from "@playwright/test";
import HomePage from "../../support/pages/home";

let home: HomePage;

test.beforeEach("Open and check Title", async ({ page }) => {
  home = new HomePage(page);
  await home.goto();
  await home.form.getSectionTitle();
});

test.describe("Validaciones esperadas para controlar errores funcionales", () => {
  test("Mensajes de error al intentar enviar formulario en blanco", async () => {
    //Seleccionamos el radio ida y vuelta y hacemos click en Buscar para que se desplieguen todos los mensajes de error
    await home.form.selectRadioIdaVuelta();
    await home.form.clikcOnBtnBuscar();

    //Verificamos visibilidad,color y texto de mensajes de error
    await home.form.verifyErrorDestino();
    await home.form.verifyErrorOrigen();
    await home.form.verifyErrorFechaIda();
    await home.form.verifyErrorFechaVuelta();
  });

  test("Búsqueda que no arroja resultado en origen", async () => {
    //Verificamos que el formulario esta visible
    await home.form.getForm();

    //Escribimos en origen
    await home.form.fillOrigen("invalid");

    //Verificamos mensaje mostrado
    await home.form.getNoResultMessaje();
  });

  test("Búsqueda con caracteres especiales en origen", async () => {
    //Verificamos que el formulario esta visible
    await home.form.getForm();

    //Escribimos en origen
    await home.form.fillOrigen("h@@##∞");

    //Verificamos mensaje mostrado
    await home.form.getNoResultMessaje();
  });

  test("Búsqueda que no arroja resultado en destino", async () => {
    //Verificamos que el formulario esta visible
    await home.form.getForm();

    //Escribimos en origen
    await home.form.fillDestino("invalid");

    //Verificamos mensaje mostrado
    await home.form.getNoResultMessaje();
  });

  test("Búsqueda con caracteres especiales en destino", async () => {
    //Verificamos que el formulario esta visible
    await home.form.getForm();

    //Escribimos en origen
    await home.form.fillDestino("h@@##∞");

    //Verificamos mensaje mostrado
    await home.form.getNoResultMessaje();
  });
});
