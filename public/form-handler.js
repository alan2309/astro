// public/form-handler.js
const username = "2c7af6e0-01f5-48c8-b54c-3d3216099cbc";        // your COUCHDB_USER
const password = "5e7d59b5-0de8-415a-a5d2-d3a1b000c754";     // your COUCHDB_PASSWORD
const auth = btoa(`${username}:${password}`);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("internshipForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop page reload

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("Submitting data:", data); // ✅ see what’s going out

    try {
      const response = await fetch(
        "/api",
        {
          method: "POST",
          headers: {
           "Content-Type": "application/json",
           "Authorization": `Basic ${auth}`
           },
          body: JSON.stringify({
    _id: new Date().toISOString(), // unique id
    ...data,                       // all your form fields
  }),
        }
      );

      if (!response.ok) {
         const text = await response.text();
  console.error("API Error:", text);
  alert("❌ Failed: " + text);
        
      } else {
        console.log("Form submitted successfully!");
        alert("✅ Application submitted successfully!");
        form.reset();
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("⚠️ Network error. Please try again later.");
    }
  });
});