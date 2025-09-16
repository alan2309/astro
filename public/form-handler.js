// public/form-handler.js
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
        "https://alankrit.budibase.app/api/public/v1/tables/ta_fed2b20f67ba4c329d5e8db8c8f891da/rows",
        {
          method: "POST",
          headers: {
            "x-budibase-api-key":
              "0c2500b4e159e99f1928067da0d0e543-e4b733982f65315dde5f87303257c33f56eed788e6258a9ddeb898d1e6dc9ce1323ce4a2af97c05089",
            "Content-Type": "application/json",
            "x-budibase-app-id":
              "app_dev_alankrit_c3bd98059cd74ede86cc1e76398c5414",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Form submitted successfully!");
        alert("✅ Application submitted successfully!");
        form.reset();
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        alert("❌ Failed to submit. Check console for details.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("⚠️ Network error. Please try again later.");
    }
  });
});
