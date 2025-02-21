import {
  formId,
  radioIdaId,
  radioIdaVueltaId,
  pickerFechaIdaId,
  pickerFechaVueltaId,
  selectPasajerosId,
  btnBuscar,
  errorOrigen,
  errorDestino,
  errorFechaIda,
  errorFechaVuelta,
  campoDropdown,
  noResultMessage,
  selectResults,
  selectPadOrigen,
  selectPadDestino,
  modalDialog,
  dropDowns
} from "../selectors/search-form";
import { expect, type Locator, type Page } from "@playwright/test";

class Form {
  private page: Page;
  private form: Locator;
  private title: Locator;
  private combo_origen: Locator;
  private combo_destino: Locator;
  private radio_ida: Locator;
  private radio_idavuelta: Locator;
  private picker_fechaida: Locator;
  private picker_fechavuelta: Locator;
  private select_pasajeros: Locator;
  private btn_buscar: Locator;
  private error_origen: Locator;
  private error_destino: Locator;
  private error_fechaida: Locator;
  private error_fechavuelta: Locator;
  private result_message: Locator;
  private modal_dialog: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator(formId);
    this.title = page.getByRole("heading", { level: 1 });
    this.combo_origen = page.getByRole("combobox", {
      name: /desde dónde viajás/i
    });
    this.combo_destino = page.getByRole("combobox", {
      name: /hacia dónde viajás/i
    });
    this.radio_ida = page.locator(radioIdaId);
    this.radio_idavuelta = page.locator(radioIdaVueltaId);
    this.picker_fechaida = page.locator(pickerFechaIdaId);
    this.picker_fechavuelta = page.locator(pickerFechaVueltaId);
    this.select_pasajeros = page.locator(selectPasajerosId);
    this.btn_buscar = page.locator(btnBuscar);
    this.error_origen = page.locator(errorOrigen);
    this.error_destino = page.locator(errorDestino);
    this.error_fechaida = page.locator(errorFechaIda);
    this.error_fechavuelta = page.locator(errorFechaVuelta);
    this.result_message = page.locator(noResultMessage);
    this.modal_dialog = page
      .locator(modalDialog)
      .filter({ hasText: "¡Ups! No encontramos opciones" })
      .first();
  }

  async getSectionTitle() {
    await expect(this.title).toBeVisible();
    await expect(this.title).toHaveText(/Buscá tu pasaje en micro/);
  }

  async getModalDialog() {
    await expect(this.modal_dialog).toBeVisible({ timeout: 5000 });
    await expect(this.modal_dialog).toHaveText(/¡Ups!/);
  }

  async clikcOnBtnBuscar() {
    await this.btn_buscar.click();
  }

  async selectRadioIdaVuelta() {
    await this.radio_idavuelta.check();
    await expect(this.radio_idavuelta).toBeChecked();
  }

  async verifyErrorOrigen() {
    await expect(this.error_origen).toBeVisible();
    const color = await this.error_origen.evaluate(
      el => getComputedStyle(el).color
    );
    expect(color).toBe("rgb(255, 255, 255)");
    await expect(this.error_origen).toHaveText(
      /Completá el Origen de tu viaje/
    );
  }

  async verifyErrorDestino() {
    await expect(this.error_destino).toBeVisible();
    const color = await this.error_destino.evaluate(
      el => getComputedStyle(el).color
    );
    expect(color).toBe("rgb(255, 255, 255)");
    await expect(this.error_destino).toHaveText(
      /Completá el Destino de tu viaje/
    );
  }

  async verifyErrorFechaIda() {
    await expect(this.error_fechaida).toBeVisible();
    const color = await this.error_fechaida.evaluate(
      el => getComputedStyle(el).color
    );
    expect(color).toBe("rgb(255, 255, 255)");
    await expect(this.error_fechaida).toHaveText(/Completá la fecha/);
  }

  async verifyErrorFechaVuelta() {
    await expect(this.error_fechaida).toBeVisible();
    const color = await this.error_fechavuelta.evaluate(
      el => getComputedStyle(el).color
    );
    expect(color).toBe("rgb(255, 255, 255)");
    await expect(this.error_fechavuelta).toHaveText(/Completá la fecha/);
  }

  async getForm() {
    await expect(this.form).toBeVisible();
  }

  async getNoResultMessaje() {
    await expect(this.result_message).toBeVisible();
    await expect(this.result_message).toHaveText(
      /No se encontraron resultados/
    );
  }

  async fillOrigen(texto: string) {
    await this.combo_origen.click();

    // Buscar todos los contenedores abiertos de select2 y elegir el primero
    const selectDropdowns = this.combo_origen.page().locator(dropDowns);
    const selectDropdown = selectDropdowns.first();

    await selectDropdown.waitFor({ state: "visible", timeout: 5000 });

    // Localizar el campo de búsqueda dentro del dropdown
    const inputField = this.combo_origen.page().locator(campoDropdown);

    await inputField.waitFor({ state: "visible", timeout: 5000 });

    // Llenar el campo con el texto
    await inputField.fill(texto);
  }

  async fillDestino(texto: string) {
    await this.combo_destino.click(); // Clic en el combo

    // Buscar todos los contenedores abiertos de select2 y elegir el primero
    const selectDropdowns = this.combo_destino.page().locator(dropDowns);
    const selectDropdown = selectDropdowns.first();

    await selectDropdown.waitFor({ state: "visible", timeout: 5000 });

    // Localizar el campo de búsqueda dentro del dropdown
    const inputField = this.combo_destino.page().locator(campoDropdown);

    await inputField.waitFor({ state: "visible", timeout: 5000 });

    // Llenar el campo con el texto
    await inputField.fill(texto);
  }

  async selectOrigen(texto: string) {
    //Seleccionamos Origen
    await this.fillOrigen(texto);
    const firstResult = this.page.locator(selectResults).first();
    await firstResult.waitFor({ state: "visible", timeout: 5000 });
    await firstResult.click();
    //Vericamos la selección
    const selectedValue = this.page.locator(selectPadOrigen);
    await expect(selectedValue).toBeVisible();
    await expect(selectedValue).toContainText(texto);
  }

  async selectDestino(texto: string) {
    //Seleccionamos el destino
    await this.fillDestino(texto);
    const firstResult = this.page.locator(selectResults).first();
    await firstResult.waitFor({ state: "visible", timeout: 5000 });
    await firstResult.click();
    //Verificamos la selección
    const selectedValue = this.page.locator(selectPadDestino);
    await expect(selectedValue).toBeVisible();
    await expect(selectedValue).toContainText(texto);
  }

  async selectFechaIda(day: string) {
    const dayNumber = day;

    //Seleccionamos una fecha valida
    await this.picker_fechaida.click();
    const dayCell = this.page
      .locator(`.day.valid:has-text("${dayNumber}")`)
      .first();
    await dayCell.waitFor({ state: "visible", timeout: 5000 });
    await dayCell.click();
  }

  async verifyResultPage() {
    // Selecciona todos los elementos de resultado dentro del contenedor
    await this.page.waitForSelector("#servicios .card", { timeout: 5000 });
    const resultados = this.page.locator("#servicios .card");

    // Verifica que haya al menos 1 resultado
    const count = await resultados.count();
    expect(count).toBeGreaterThan(0);

    //Verificamos el primer elemento
    const primerResultado = resultados.first();
    const horaElemento = primerResultado.locator(".horario .hora").first();
    await horaElemento.waitFor({ state: "visible", timeout: 5000 });
    await expect(horaElemento).toBeVisible();
  }

  async selectFechaVuelta(day: string) {
    const dayNumber = day;

    await this.picker_fechavuelta.click();

    const returnPicker = this.page
      .locator(".date-picker-wrapper.single-date")
      .nth(1);
    await returnPicker.waitFor({ state: "visible", timeout: 5000 });

    await this.page.waitForTimeout(500);

    // Busca la celda del día "22" dentro del datepicker de vuelta
    const dayCell = returnPicker
      .locator(`.day.valid:has-text("${dayNumber}")`)
      .first();

    // Si sigue oculto, fuerza el click (aunque lo ideal es que esté visible)
    await dayCell.click({ force: true });
  }
  async verifyNoResultPage() {
    // Selecciona todos los elementos de resultado dentro del contenedor
    await this.page.waitForSelector("#servicios .card", { timeout: 5000 });
    const resultados = this.page.locator("#servicios .card");

    // Verifica que haya al menos 1 resultado
    const count = await resultados.count();
    expect(count).toBeGreaterThan(0);

    //Verificamos el primer elemento
    const primerResultado = resultados.first();
    const horaElemento = primerResultado.locator(".horario .hora").first();
    await horaElemento.waitFor({ state: "visible", timeout: 5000 });
    await expect(horaElemento).toBeVisible();
  }
}

export default Form;
