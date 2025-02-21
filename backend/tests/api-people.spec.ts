import { test, expect } from "@playwright/test";
import { getServerTiming } from "../../utils/server-timing";
import people from "../fixtures/people";

test.describe("Se verifica uso de endpoint people", () => {
  test("GET 1 usuario de people", async ({ page }) => {
    const response = await page.request.get(`/api/people/1`);
    const responseBody = await response.json();
    const serverTiming = await getServerTiming(response);

    //Asertions
    expect(response.status()).toBe(200);
    expect(responseBody.message).toEqual(people.message_ok);
    expect(responseBody.result.properties).toBeTruthy();
    expect(typeof responseBody.result.properties.created).toBe("string");
    expect(serverTiming).toBeLessThan(2); //Expresado en segundos
  });

  test("GETObtener todos los usuarios de people", async ({ page }) => {
    const response = await page.request.get(`/api/people`);
    const responseBody = await response.json();
    const serverTiming = await getServerTiming(response);

    //Asertions
    expect(response.status()).toBe(200);
    expect(responseBody.message).toEqual(people.message_ok);
    expect(responseBody.total_records).toBeGreaterThan(0);
    expect(responseBody.results[0].name).toBe(people.description);
    expect(serverTiming).toBeLessThan(2); //Expresado en segundos
  });

  test("GET User que no existe 404", async ({ page }) => {
    const response = await page.request.get(`/api/people/888`);
    const responseBody = await response.json();
    const serverTiming = await getServerTiming(response);

    //Asertions
    expect(response.status()).toBe(404);
    expect(responseBody.message).toEqual(people.error_message_404);
    expect(serverTiming).toBeLessThan(2); //Expresado en segundos
  });
});
