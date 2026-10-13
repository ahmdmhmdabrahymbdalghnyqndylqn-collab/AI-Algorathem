
function showPage(page) {
  const home = document.getElementById("homePage");
  const predict = document.getElementById("predictPage");

  const homeNav = document.getElementById("homeNav");
  const predictNav = document.getElementById("predictNav");

  home.classList.toggle("hidden", page !== "home");
  predict.classList.toggle("hidden", page !== "predict");

  homeNav.classList.toggle("active", page === "home");
  predictNav.classList.toggle("active", page === "predict");

  window.scrollTo(0, 0);
}

document.getElementById("predictBtn").addEventListener("click", async function () {
  const studied = document.getElementById("studied").value;
  const project = document.getElementById("project").value;

  const button = document.getElementById("predictBtn");
  const result = document.getElementById("result");
  const resultBox = document.getElementById("resultBox");

  button.disabled = true;
  button.textContent = "Analyzing...";

  try {
    const response = await fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ studied, project })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || "Prediction failed");
    }

    const prediction = String(data.prediction);

    result.textContent = prediction;
    resultBox.classList.remove("hidden");

    resultBox.classList.toggle(
      "fail",
      prediction.toLowerCase() === "fail"
    );

  } catch (error) {
    result.textContent = "Error: " + error.message;
    resultBox.classList.remove("hidden");
    resultBox.classList.add("fail");
  } finally {
    button.disabled = false;
    button.textContent = "✨ Predict Result";
  }
});
