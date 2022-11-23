
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
const param = new URLSearchParams(search)
  const cityId = param.get("city")
  
  //console.log(cityId)
  return cityId

}




//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let response = await fetch(config.backendEndpoint+`/adventures?city=${city}`)
    
    let dataApi = await response.json()
    //console.log(dataApi)
  return dataApi
  }catch(err){
    console.log(err)
    return null
  }
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let parentNode = document.getElementById("data")
 // console.log(adventures)

  for( let adv of adventures){
   const childNode = `
      <div class="col-6 col-lg-3 mb-3">
      <a href="detail/?adventure=${adv.id}" id = ${adv.id}>
        <div class="card adventure-card pb-3">
          <img src=${adv.image} class="activity-card" alt=${adv.name}/>
          <div class= "category-banner">${adv.category}</div>
          <div class="card-body  text-center d-md-flex justify-content-between text-responsive monospace">
            <h5 class="card-title">${adv.name}</h5>
            <p class="card-text h6">₹${adv.costPerHead}</p> 
          </div>
          <div class="card-body  text-center d-md-flex justify-content-between  text-responsive mb-0 pb-0 monospace">
            <h5 class="card-title">Duration</h5>
            <p class="card-text h6">₹${adv.duration}</p> 
          </div>  
        </div>
      </a>
    </div>
      `
  parentNode.innerHTML += childNode
  }
  return parentNode

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
 //console.log("list", list)

  let filteredDuration = list.filter(element => {
    return (element.duration >= low && element.duration <= high);
  })
  return filteredDuration;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
 
  let filteredCategory = [];
  console.log("list of categories",categoryList);
      list.forEach((key) =>{
      if(categoryList.includes(key.category)){
        filteredCategory.push(key);
      }
    })
  
  return filteredCategory;


}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
   console.log("list",list)
   console.log("fill",filters)

   let duration = filters["duration"].split("-")
  let low = duration[0];
  let high =  duration[1];

  let filteredList = [];

  if(filters["duration"].length > 0 && filters["category"].length > 0){
    let filteredCategories = filterByCategory(list,filters.category);
    filteredList = filterByDuration(filteredCategories,low,high)

  }
  else if(filters["duration"].length > 0){
    filteredList = filterByDuration(list,low,high)
  }
  else if(filters["category"].length > 0){
    filteredList = filterByCategory(list,filters.category);
  }
  
   else{
    filteredList = list;
    
   }
   
   return filteredList;

  

  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let savedFilters = JSON.stringify(filters);
  localStorage.setItem("filters",savedFilters);
  //console.log("saved:", savedFilters);
  return savedFilters;

}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filteredObject = JSON.parse(localStorage.getItem("filters"));
  //console.log("filtered:", filteredObject)
  return filteredObject;


  // Place holder for functionality to work in the Stubs
 
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  let parentNode = document.getElementById("category-list");
  filters["category"].forEach((category)=>{
    let childNode = `<div class="category-filter">${category}</div>`
    parentNode.innerHTML += childNode
  })
  // let newNode = document.getElementById("duration-list");
  // let childNode = `<div class="category-filter">${filters.duration}</div>`
  // newNode.innerHTML += childNode

  return parentNode;

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
