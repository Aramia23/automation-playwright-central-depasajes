async function getServerTiming(apiResponse) {
  const response = apiResponse;
  const headers = response.headers();
  const serverTiming = headers["server-timing"];

  // Extraer el valor "rtt"
  const match = serverTiming?.match(/rtt=(\d+)/);
  if (!match) {
    throw new Error("No se encontró el valor rtt en el header server-timing");
  }
  const rttMicroseconds = parseInt(match[1], 10);
  // Convertir microsegundos a segundos
  const rttSeconds = rttMicroseconds / 1_000_000;
  return rttSeconds;
}

export { getServerTiming };
