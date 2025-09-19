// public/form-handler.js
const username = process.env.db_user;        // your COUCHDB_USER
const password = process.env.db_password;     // your COUCHDB_PASSWORD
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
          window.location.href = '/'
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("⚠️ Network error. Please try again later.");
    }
  });
});