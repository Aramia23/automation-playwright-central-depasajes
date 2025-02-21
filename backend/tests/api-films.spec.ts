import { test, expect } from "@playwright/test";
import { getServerTiming } from "../../utils/server-timing";
import films from "../fixtures/films";

test.describe("Se verifica uso de endpoint films", () => {
  test("GET Obtener 1 film", async ({ page }) => {
    const response = await page.request.get(`/api/films/3`);
    const responseBody = await response.json();
    const serverTiming = await getServerTiming(response);

    //Asertions
    expect(response.status()).toBe(200);
    expect(responseBody.message).toEqual(films.message_ok);
    expect(responseBody.result.properties).toBeTruthy();
    expect(typeof responseBody.result.properties.created).toBe("string");
    expect(serverTiming).toBeLessThan(2); //Expresado en segundos
  });

  test("GET Obtener todos los films", async ({ page }) => {
    const response = await page.request.get(`/api/films`);
    const responseBody = await response.json();
    const serverTiming = await getServerTiming(response);

    //Asertions
    expect(response.status()).toBe(200);
    expect(responseBody.message).toEqual(films.message_ok);
    expect(responseBody.result.length).toBeGreaterThan(0);
    expect(responseBody.result[0].description).toBe(films.description);
    expect(serverTiming).toBeLessThan(2); //Expresado en segundos
  });

  test("GET Film que no existe 404", async ({ page }) => {
    const response = await page.request.get("/api/films/888");
    const responseBody = await response.json();
    const serverTiming = await getServerTiming(response);

    //Asertions
    expect(response.status()).toBe(404);
    expect(responseBody.message).toEqual(films.error_message_404);
    expect(serverTiming).toBeLessThan(2); //Expresado en segundos
  });
});
