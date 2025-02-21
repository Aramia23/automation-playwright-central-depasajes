import { test, expect } from "@playwright/test";
import { getServerTiming } from "../../utils/server-timing";
import {data, schema} from "../fixtures/films";
import Ajv from 'ajv';
import fs from 'fs';

const ajv = new Ajv();
const validate = ajv.compile(schema);

test.describe("Se verifica uso de endpoint films", () => {
  test("GET Obtener 1 film", async ({ page }) => {
    const response = await page.request.get(`/api/films/3`);
    const responseBody = await response.json();
    const serverTiming = await getServerTiming(response);


    //Asertions
    const valid = validate(data);
    expect(valid).toBe(true);
    expect(response.status()).toBe(200);
    expect(responseBody.message).toEqual(data.message_ok);
    expect(responseBody.result.properties).toBeTruthy();
    expect(serverTiming).toBeLessThan(2); //Expresado en segundos

  // Se escribe el JSON a un archivo en el directorio actual
  fs.writeFileSync('backend-responses/response-api-film.json', JSON.stringify(responseBody, null, 2));
  });

  test("GET Obtener todos los films", async ({ page }) => {
    const response = await page.request.get(`/api/films`);
    const responseBody = await response.json();
    const serverTiming = await getServerTiming(response);

    //Asertions
    expect(response.status()).toBe(200);
    expect(responseBody.message).toEqual(data.message_ok);
    expect(responseBody.result.length).toBeGreaterThan(0);
    expect(responseBody.result[0].description).toBe(data.description);
    expect(serverTiming).toBeLessThan(2); //Expresado en segundos
  });

  test("GET Film que no existe 404", async ({ page }) => {
    const response = await page.request.get("/api/films/888");
    const responseBody = await response.json();

    //Asertions
    expect(response.status()).toBe(404);
    expect(responseBody.message).toEqual(data.error_message_404);
  });
});
