const notifyBtn = document.getElementById("notifyBtn");
const price = document.getElementById("price");
const targetPrice = document.getElementById("targetPrice");
let notificationCount = 0;

const BTCvalue = async () => {
  await window.myAPI
  .get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD")
  .then((data) => {
    console.log(data.USD);
    let comparePriceValue = -1;
    if(targetPrice.innerText != "Choose a target price"){
      comparePriceValue = parseFloat(targetPrice.innerText.replace(/[$,]+/g,""));
    }
    const mainValue = price.innerText.replace(/[$,]+/g,"");
    price.innerText= '$'+ data.USD.toLocaleString();
    if(parseFloat(mainValue) > comparePriceValue && notificationCount == 0 && comparePriceValue != -1){
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
  const webPreferences = {
    nodeIntegration: true,
    preload: path.join(__dirname, "preload.js")
  };

  // console.log(JSON.stringify(webPreferences));

  const preloadPath = path.join(__dirname, 'preload.js');
  // console.log(preloadPath);

  const childWindow = window.open(
    "add.html",
    "modal",
    // `height=200,width=500,frame=false,modal=true,alwaysOnTop=true,popup=true,webPreferences={nodeIntegration=true,preload=${preloadPath}}`,
    `height=200,width=500,frame=false,modal=true,alwaysOnTop=true,popup=true,webPreferences=${webPreferences}`,
  );
});

function callback(value) {
  targetPrice.innerText = '$'+ parseFloat(value).toLocaleString();
}

window.electronAPI.getValue('get-value', callback);

// ipcRenderer.on('get-value', (event, value) => {
//   console.log(value);
// })