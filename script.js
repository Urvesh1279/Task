// Globally hold data
let dataList = [];

// Target form clear button
let clearButton;

// Initially load data
document.addEventListener("DOMContentLoaded", () => {
  const data = localStorage.getItem("data");
  if (data) {
    showTab("add-data");
    dataList.push(...JSON.parse(data));
    updateDataList();
  }

  clearButton = document.getElementById("form-clear-btn");

  clearButton.addEventListener("click", clearList);
});

// Toggle the screen based on the id
function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");

  // Load Chart on button click
  if (tabId === "view-data") {
    updateChart();
  }
}

// Submit and save the form data in the Localstorage
function addData(event) {
  event.preventDefault();

  // Get data from the Event
  const datetime = new Date(event.target.datetime.value);
  const temperature = parseFloat(event.target.temperature.value);

  // Validate date
  if (datetime > new Date()) {
    alert("Datetime must be in the past");
    return;
  }

  // Validate Temp
  if (temperature < -50 || temperature > 50) {
    alert("Temperature must be between -50 and 50 °C");
    return;
  }

  dataList.push({ datetime, temperature });

  localStorage.setItem("data", JSON.stringify(dataList));

  updateDataList();
}

// Render the saved list
function updateDataList() {
  const dataListElem = document.getElementById("dataList");
  dataListElem.innerHTML = "";
  
  dataList.forEach((data) => {
    const li = document.createElement("li");
    li.textContent = `Datetime: ${new Date(
      data.datetime
    ).toLocaleDateString()}, Temperature: ${data.temperature} °C`;
    dataListElem.appendChild(li);
  });
}

// Clear the list
const clearList = () => {
  dataList = [];
  localStorage.setItem("data", dataList);
  updateDataList();
};
