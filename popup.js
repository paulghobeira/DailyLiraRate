document.addEventListener("DOMContentLoaded", function(event) {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '-' + mm + '-' + yyyy;
  document.getElementById("popupDate").innerHTML = today;
  
  document.getElementById("marketTab").addEventListener("click", function(){ShowTab(1)});
  document.getElementById("sayrafaTab").addEventListener("click", function(){ShowTab(2)});
  document.getElementById("transferTab").addEventListener("click", function(){ShowTab(3)});
  document.getElementById("bankTab").addEventListener("click", function(){ShowTab(4)});
  document.getElementById("officialTab").addEventListener("click", function(){ShowTab(5)});
  
  GetToken()
    .then(data => fetchAsync(data))
    .catch(reason => console.log(reason.message));
});

async function fetchAsync(token) {
  const response = await fetch("https://www.lbpprice.com/api/LBP/latest", {
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    });

    let data = await response.json();

    document.getElementById("loader").classList.add("d-none");

    document.getElementById('marketRateBuy').innerHTML = "<div class='tab-inner-content-title'>Buy</div> <div class='tab-inner-content-subtitle'>1 USD at " + data["marketSell"].toLocaleString() + ' LBP</div>';
    document.getElementById('marketRateSell').innerHTML = "<div class='tab-inner-content-title'>Sell</div> <div class='tab-inner-content-subtitle'>1 USD at " + data["marketBuy"].toLocaleString() + ' LBP</div>';
    document.getElementById('sayrafaRate').innerHTML = "<div class='tab-inner-content-title'>Rate</div> <div class='tab-inner-content-subtitle'>1 USD at " + data["exchange"].toLocaleString() + ' LBP</div>';
    document.getElementById('transferRate').innerHTML = "<div class='tab-inner-content-title'>Rate</div> <div class='tab-inner-content-subtitle'>1 USD at " + data["transfer"].toLocaleString() + ' LBP</div>';
    document.getElementById('bankRate').innerHTML = "<div class='tab-inner-content-title'>Rate</div> <div class='tab-inner-content-subtitle'>1 USD at " + data["bank"].toLocaleString() + ' LBP</div>';
    document.getElementById('officialRate').innerHTML = "<div class='tab-inner-content-title'>Rate</div> <div class='tab-inner-content-subtitle'>1 USD at " + data["official"].toLocaleString() + ' LBP</div>';   
    
    ShowTab(1);
}

async function GetToken() {
  const response = await fetch("https://www.lbpprice.com/api/auth/user/login", {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    body: `{"secret": "Zhy6nzsmUOydMzHWKrayRGlRyV_333"}`,
    });

    let data = await response.json();

    return data["token"];
}

function ShowTab(index)
{
  var tabChanged = false;
  var clickedTab, clickedTabContent;

  switch (index)
  {
    case 2:
      clickedTab = document.getElementById("sayrafaTab");
      clickedTabContent = document.getElementById("sayrafaContent");
      break;
    case 3:
      clickedTab = document.getElementById("transferTab");
      clickedTabContent = document.getElementById("transferContent");
      break;
    case 4: 
      clickedTab = document.getElementById("bankTab");
      clickedTabContent = document.getElementById("bankContent");
      break;
    case 5: 
      clickedTab = document.getElementById("officialTab");
      clickedTabContent = document.getElementById("officialContent");
      break;
    default: 
      clickedTab = document.getElementById("marketTab");
      clickedTabContent = document.getElementById("marketContent");
      break;
  } 

  if(!(clickedTab.classList.contains("active-tab"))) 
    tabChanged = true;

  if(tabChanged) {
    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("active-tab");
    }
  
    const tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
      tabContent[i].classList.remove("active-tab-content");
    }

    clickedTab.classList.add("active-tab");
    clickedTabContent.classList.add("active-tab-content");
  }
  
}