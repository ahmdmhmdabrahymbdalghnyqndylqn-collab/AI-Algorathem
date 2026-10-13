document.getElementById("predictBtn").addEventListener("click", async function () {
    
    const studied = document.getElementById("studied").value;
    const project = document.getElementById("project").value;

    const result = document.getElementById("result");
    result.textContent = "Predicting...";

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studied: studied,
                project: project
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Prediction failed");
        }

        result.textContent = "Prediction: " + data.prediction;

    } catch (error) {
        result.textContent = "Error: " + error.message;
    }

});