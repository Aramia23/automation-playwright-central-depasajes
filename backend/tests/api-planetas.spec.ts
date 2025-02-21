import { test, expect } from "@playwright/test";
import { getServerTiming } from "../../utils/server-timing";
import {data, schema} from "../fixtures/planeta";
import Ajv from 'ajv';

const ajv = new Ajv();
const validate = ajv.compile(schema);

test.describe("Se verifica uso de endpoint planetas", () => {
  test("GET Obtener 1 planeta", async ({ page }) => {
    const response = await page.request.get(`/api/planets/3`);
    const responseBody = await response.json();
    const serverTiming = await getServerTiming(response);
    console.log(responseBody)

    //Asertions
    const valid = validate(data);
    expect(valid).toBe(true);
    expect(response.status()).toBe(200);
    expect(responseBody.message).toEqual(data.message_ok);
    expect(responseBody.result.properties).toBeTruthy();
    expect(serverTiming).toBeLessThan(2); //Expresado en segundos
  });

  test("GET Obtener todos los planetas", async ({ page }) => {
    const response = await page.request.get(`/api/planets`);
    const responseBody = await response.json();
    const serverTiming = await getServerTiming(response);

    //Asertions
    expect(response.status()).toBe(200);
    expect(responseBody.message).toEqual(data.message_ok);
    expect(responseBody.total_records).toBeGreaterThan(0);
    expect(responseBody.results[0].name).toBe(data.description);
    expect(serverTiming).toBeLessThan(2); //Expresado en segundos
  });

  test("GET Planeta que no existe 404", async ({ page }) => {
    const response = await page.request.get(`/api/planets/888`);
    const responseBody = await response.json();

    //Asertions
    expect(response.status()).toBe(404);
    expect(responseBody.messsage).toEqual(data.error_message_404);
  });
});
