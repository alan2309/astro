// src/pages/api/submit.js
export async function POST({ request }) {
  try {
    const body = await request.json();

    const response = await fetch(
      "https://alankrit.budibase.app/api/public/v1/tables/ta_fed2b20f67ba4c329d5e8db8c8f891da/rows",
      {
        method: "POST",
        headers: {
          "x-budibase-api-key": "YOUR_API_KEY",
          "x-budibase-app-id": "app_dev_alankrit_c3bd98059cd74ede86cc1e76398c5414",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
