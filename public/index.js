const form = document.getElementById("form");
const input = document.querySelector("#url");
const linkWrapper = document.querySelector(".link-wrapper");
const errorDiv = document.querySelector(".error");
const shortenedLink = document.querySelector(".short-link");
const submitButton = document.querySelector("#submit-btn");
const copyButton = document.querySelector(".copy-btn");

const domain = window.location.origin;

const setLoading = (loading) => {
  submitButton.disabled = loading;
  submitButton.classList.toggle("loading", loading);
};

const showError = (message) => {
  input.classList.add("invalid");
  errorDiv.textContent = message;
};

const clearError = () => {
  input.classList.remove("invalid");
  errorDiv.textContent = "";
};

const handleSubmit = async () => {
  clearError();
  linkWrapper.classList.remove("visible");

  const url = input.value.trim();
  if (!url) {
    showError("Enter a URL to shorten.");
    input.focus();
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(`${domain}/link`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ url }),
    });

    const result = await response.json();

    if (!response.ok || result.type === "failure") {
      showError(
        result.message
          ? `${result.message}. Please try another link.`
          : "We could not shorten that link. Please try again."
      );
      return;
    }

    shortenedLink.href = result.message;
    shortenedLink.textContent = result.message;
    shortenedLink.title = `Open ${result.message}`;
    linkWrapper.classList.add("visible");
    copyButton.textContent = "Copy";
  } catch (_error) {
    showError("The server is unavailable. Please try again.");
  } finally {
    setLoading(false);
  }
};

copyButton.addEventListener("click", async () => {
  const link = shortenedLink.href;
  if (!link || link === "#") return;

  try {
    await navigator.clipboard.writeText(link);
    copyButton.textContent = "Copied!";
    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1600);
  } catch (_error) {
    window.prompt("Copy this link:", link);
  }
});

input.addEventListener("input", clearError);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSubmit();
});
