
const loginBtn = document.querySelector(".btn");
const loginPage = document.getElementById("loginpage");
const withdrawPage = document.getElementById("withdrawpage");
const lastPage = document.querySelector(".last");
const tradePage = document.querySelector(".tradework");
const tradeBtn = document.getElementById("trade");

let chartInstance = null;

loginBtn.addEventListener("click", () => {
  loginPage.style.display = "none";
  withdrawPage.style.display = "block";
  drawChart("withdrawTrade");
});


document.querySelector("#withdrawpage button").addEventListener("click", () => {
  withdrawPage.style.display = "none";
  lastPage.style.display = "block";
  drawChart("lastTrade");
});


tradeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginPage.style.display = "none";
  withdrawPage.style.display = "none";
  lastPage.style.display = "none";
  tradePage.style.display = "block";
  drawChart("livetrade");
});

async function drawChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  if (chartInstance) chartInstance.destroy();

  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
  );
  const data = await res.json();

  const labels = data.prices.map(p => {
    const t = new Date(p[0]);
    return t.getHours() + ":" + String(t.getMinutes()).padStart(2, "0");
  });

  const values = data.prices.map(p => p[1]); 

  chartInstance = new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "BTC Price (USD)",
        data: values,
        borderColor: "#00ff66",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#ffffff" }
        }
      },
      scales: {
        x: {
          ticks: { color: "#ffffff" },
          grid: {
            color: "rgba(255,255,255,0.85)", // 🔥 zyada white
            lineWidth: 1.6                  // 🔥 thodi moti
          }
        },
        y: {
          ticks: { color: "#ffffff" },
          grid: {
            color: "rgba(255,255,255,0.85)", // 🔥 zyada white
            lineWidth: 1.6                  // 🔥 thodi moti
          }
        }
      }
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  drawChart("homeTrade");
});
