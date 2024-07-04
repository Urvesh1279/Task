function updateChart() {
  const data = JSON.parse(localStorage.getItem("data"));

  const labels = data.map((entry) => new Date(entry.datetime).toLocaleString());
  const temperatures = data.map((entry) => entry.temperature);

  const ctx = document.getElementById("dataChart").getContext("2d");
  
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Temperature over Time",
          data: temperatures,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 1,
        }
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "minute",
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
