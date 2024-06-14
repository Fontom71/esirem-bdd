/**
 * Effectue un appel API HTTP.
 *
 * @param {string} url - L'URL de l'API.
 * @param {string} [method="GET"] - La méthode HTTP (GET, POST, etc.).
 * @param {Object} [body=null] - Le corps de la requête, si applicable.
 * @returns {Promise<Object|null>} - La réponse JSON de l'API ou null en cas d'erreur.
 */
export async function apiCall(url, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  if (response.status === 200) {
    return response.json();
  }
  return null;
}
