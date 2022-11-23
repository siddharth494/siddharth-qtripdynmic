import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  //console.log(init())
  let cities = await fetchCities();
  console.log(cities)
 
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {

  // TODO: MODULE_CITIES
   
  try{
    let response = await fetch(config.backendEndpoint+"/cities")
    let dataApi = await response.json()
    //fffff
  return dataApi
  }catch(err){
    console.log(err)
    return null
  }
  
  // 1. Fetch cities using the Backend API and return the dat

}
//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  let parentNode = document.getElementById("data");
  let cityContent = `
  <div class="col-12 col-sm-6 col-lg-3 mb-3">
        <a href="pages/adventures/?city=${id}" id =${id}>
          <div class="tile mb-4 mt-2">
            <img src="${image}" alt="${id}"/>
            <div class="tile-text text-white">
              <h5>${city}</h5>
              <p>${description}</p>
            </div>
          </div>
        </a>
  </div>`
  parentNode.innerHTML += cityContent;

  return parentNode
}

export { init, fetchCities, addCityToDOM };
