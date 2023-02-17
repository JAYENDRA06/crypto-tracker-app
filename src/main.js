const notifyBtn = document.getElementById("notifyBtn");
const price = document.getElementById("price");
const targetPrice = document.getElementById("targetPrice");
let notificationCount = 0;

const BTCvalue = async () => {
  await window.myAPI
  .get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD")
  .then((data) => {
    console.log(data.USD);
    price.innerHTML= data.USD;
    // return data.USD;
    if(parseFloat(price.innerText) > 24677 && notificationCount == 0){
      console.log(price.innerText);
      window.electronAPI.showNotification("BTC crossed limit!", {
        body: "Hey! the BTC market value just exceeded your limit",
      });
      notificationCount++;
    }
  })
  .catch((error) => console.log(error));
}

BTCvalue();

setInterval(() => BTCvalue(), 10000);
notifyBtn.addEventListener("click", () => {
  console.log("nkadjskj");

  const childWindow = window.open(
    "add.html",
    "modal",
    "height=200,width=500,frame=false,modal=true,alwaysOnTop=true"
  );
});

