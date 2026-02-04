const loginBtn = document.querySelector(".btn");

const usernameInput = document.querySelector('#loginpage input[type="text"]');
const passwordInput = document.querySelector('#loginpage input[type="password"]');

const loginPage = document.getElementById("loginpage");
const withdrawPage = document.getElementById("withdrawpage");
const lastPage = document.querySelector(".last");

loginBtn.addEventListener("click", () => { 
  if (usernameInput.value && passwordInput.value) {
    loginPage.style.display = "none";
    withdrawPage.style.display = "block";
  } else {
    alert("Please fill username and password");
  }
});


const transferBtn = document.querySelector("#withdrawpage button");

transferBtn.addEventListener("click", () => {
  withdrawPage.style.display = "none";
  lastPage.style.display = "block";
});


const trade = document.getElementById("trade");
const tradework = document.querySelector(".tradework");

const loading = document.querySelector(".whilefetch")

let tradeLoaded = false;



trade.addEventListener("click",(e)=>{
   loginPage.style.display = "none";
  withdrawPage.style.display = "none";
  lastPage.style.display = "none";
  tradework.style.display = "block";


  e.preventDefault();
   
if (!tradeLoaded) {

    tradeLoaded = true;
    loading.style.display = "block";
        trading();
  }

})



  async function trading () {
    const api = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1");
    const response = await api.json();

    console.log(response);

  loading.style.display = "none";

    let prices = response.prices;

    let labels = prices.map((item)=>{
const time = new Date(item[0]);

return time.getHours()+":"+ time.getMinutes();
  })

  const value = prices.map(item=>item[1]);
  
 
new Chart (document.getElementById("livetrade"), {

  type:"line",

  data: {
    labels : labels,
    datasets : [{

      label: "BTC Price (USD)",
      data:value,
      borderColor:"lime",
      borderWidth:2,
      tension:0.4,
    }]
  },
  options: {
    responsive:true,
    scales: {
      y:{beginAtZero:false}
    }
  }
});
  }

