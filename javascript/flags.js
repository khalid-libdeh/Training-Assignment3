let currentCountries =[];
let allContries=[];
async function getCountry() {
    const api= "https://restcountries.com/v3.1/all";
    // Storing response
    const response = await fetch(api);
    // Storing data in form of JSON
    let data = await response.json();
    let value= await JSON.stringify(data);
    currentCountries=[];
    for(let i=0; i<data.length;i++){
        insertCountry(data[i])
        currentCountries.push(data[i]);
        allContries.push(data[i]);
    }

    console.log(value);

    //show(data);

}
getCountry();
function insertCountry(country){
    let container = document.getElementById('add-countries');
    let cardElement= document.createElement("div");
    cardElement.classList.add('col')
    let cardString =`<div class="card">
                <img src=${country['flags']['svg']} class="card-img-top img-fluid  object-fit-cover " alt="...">
                <div class="card-body">
                    <h4 class="card-title"><b>${country['name']['common']}: </b></h4>
                    <div class="card-text"><b>Population: </b>${country['population']}</div>
                    <div class="card-text"><b>Region: </b>${country['region']} </div>
                    <div class="card-text"><b>Capital: </b>${country['capital']}</div>
                </div>
            </div>`;
    cardElement.innerHTML = cardString;
    container.append(cardElement);
}

async function searchCountries(){
    let name =document.getElementById('search').value;
    window.localStorage.setItem('search',name);
    if(name ===""){
        getCountry();
        return;
    }
    let drop = document.getElementById('drop-down');
    const api= "https://restcountries.com/v3.1/name/"+name;
    const response = await fetch(api);
    let data = await response.json();
    document.getElementById('add-countries').innerHTML='';
    for(let i=0; i<data.length; i++){
        if(data[i]['region'].includes(drop.value)) {
            currentCountries[i] = data[i];
            insertCountry(data[i]);
        }else if(drop.innerText=="No filter" || drop.innerText=="Filter by Region")
            insertCountry(currentCountries[i]);

    }

}

function filter(){
    let drop = document.getElementById('drop-down');
    let searchText =document.getElementById('search');
    window.localStorage.setItem('filter',drop.innerText);
    document.getElementById('add-countries').innerHTML='';
    for(let i=0; i<currentCountries.length;i++){
        if((currentCountries[i]['region'].includes(drop.innerText)&& currentCountries[i]['name']['common'].includes(searchText.value))){
            insertCountry(currentCountries[i]);
        }else if(drop.innerText.includes("No filter") || drop.innerText.includes("Filter by Region"))
            insertCountry(currentCountries[i]);


    }
}


function showRegion(item) {
   let dropDown= document.getElementById("drop-down");
      dropDown.innerText = item.innerText;
      filter();
}

function toggleDark(){
    let bodyDark = document.body;
    let headerDark = document.getElementsByTagName('header');
    bodyDark.classList.toggle("dark");

}