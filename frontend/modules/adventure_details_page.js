import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  return search.split("=")[1];
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const url =
      config.backendEndpoint + "/adventures/detail?adventure=" + adventureId;
    let res = await fetch(url);
    const result = await res.json();

    const loadAnim = document.getElementById('load');
    loadAnim.remove();

    return result;
    
  } catch (error) {
    console.error(error);
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure);
  const name = adventure.name;
  const subtitle = adventure.subtitle;
  const imageArr = adventure.images;
  const content = adventure.content;

  document.getElementById("adventure-name").textContent = name;
  document.getElementById("adventure-subtitle").textContent = subtitle;
  let imageParent = document.getElementById("photo-gallery");
  imageArr.forEach((source) => {
    let imageDiv = document.createElement("div");
    imageDiv.innerHTML = `<img src="${source}" alt="Adventure Detail Images" class="activity-card-image">`;

    imageParent.appendChild(imageDiv);
  });
  document.getElementById("adventure-content").textContent = content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const imageParent = document.getElementById("photo-gallery");
  imageParent.innerHTML = ``;
  
  imageParent.classList.add("carousel", "slide");
  imageParent.setAttribute('data-bs-ride', "carousel");
  imageParent.setAttribute('data-interval', "2000");

  let indicatorsDiv = document.createElement("div");
  indicatorsDiv.setAttribute("class", "carousel-indicators");
  indicatorsDiv.innerHTML = `
  <button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="2" aria-label="Slide 3"></button>
  `;

  let innerCarousel = document.createElement('div');
  innerCarousel.setAttribute('class', 'carousel-inner')
  for(let i = 0; i < images.length; i++){
    let imageDiv = document.createElement("div");
    imageDiv.classList.add('carousel-item');
    imageDiv.innerHTML = `<img src="${images[i]}" alt="Adventure Detail Images" class="activity-card-image">`;
    if(i === 0) imageDiv.classList.add("active");

    innerCarousel.appendChild(imageDiv);
  }

  let prevBtn = document.createElement('button');
  prevBtn.setAttribute("class", "carousel-control-prev");
  prevBtn.setAttribute("type", "button");
  prevBtn.setAttribute("data-bs-target", "#photo-gallery");
  prevBtn.setAttribute("data-bs-slide", "prev");

  let nextBtn = document.createElement('button');
  nextBtn.setAttribute("class", "carousel-control-next");
  nextBtn.setAttribute("type", "button");
  nextBtn.setAttribute("data-bs-target", "#photo-gallery");
  nextBtn.setAttribute("data-bs-slide", "next");

  prevBtn.innerHTML = `
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
  `

  nextBtn.innerHTML = `
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
  `

  imageParent.append(indicatorsDiv, innerCarousel, prevBtn, nextBtn);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available) {
    document.getElementById('reservation-panel-available').style.display = "block";
    document.getElementById('reservation-panel-sold-out').style.display = "none";

    const costPerHead = adventure.costPerHead;
    document.getElementById('reservation-person-cost').textContent = costPerHead;
  } 
  else {
    document.getElementById('reservation-panel-sold-out').style.display = "block";
    document.getElementById('reservation-panel-available').style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const costPerHead = adventure.costPerHead;
  document.getElementById('reservation-cost').textContent = costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById('myForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements["name"].value;
    const date = form.elements["date"].value;
    const person = form.elements["person"].value;
    const postURL = config.backendEndpoint + "/reservations/new";
    fetch(postURL, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        date: date,
        person: person,
        adventure: adventure.id
      }),
      headers: {'Content-Type': 'application/json; charset=UTF-8'}
    })
    .then(res => res.json())
    .then(data => {
      alert('Success');
      document.location.reload()  // reload the page after posting object 
    })
    .catch(err => alert('Error'));
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved) document.getElementById('reserved-banner').style.display = "block";
  else document.getElementById('reserved-banner').style.display = "none"
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
