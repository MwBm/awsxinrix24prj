document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("userInput");
  const formatField = document.getElementById("format");
  const submitButton = document.getElementById("submitButton");
  const outputParagraph = document.getElementById("output");

  async function handleSubmit(event) {
    event.preventDefault();

    const userInput = inputField.value.trim();
    const responseFormat = formatField.value;

    if (userInput) {
      outputParagraph.textContent = "Processing...";
      outputParagraph.classList.remove("hidden");

      try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        const currentUrl = tabs[0]?.url;

        const response = await fetch("http://127.0.0.1:5000/converse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_message: userInput,
            web_name: currentUrl,
            format: responseFormat,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          const errorMessage = data.error || "Request failed";
          outputParagraph.textContent = "Error: " + errorMessage;
          return;
        }

        if (!data.response) {
          outputParagraph.textContent = "Error: Empty response from server";
          return;
        }

        outputParagraph.textContent = "Response: " + data.response;
      } catch (error) {
        outputParagraph.textContent = "Error sending data to Flask: " + error;
      }
    } else {
      outputParagraph.classList.add("hidden");
    }

    inputField.value = "";
  }

  submitButton.addEventListener("click", handleSubmit);
});