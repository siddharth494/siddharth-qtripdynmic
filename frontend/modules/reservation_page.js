import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(config.backendEndpoint + "/reservations");
    const data = await res.json();
    
    const loadAnim = document.getElementById('load');
    loadAnim.remove();

    return data;
  } catch (error) {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  if(reservations.length === 0) {
    document.getElementById('no-reservation-banner').style.display = "block";
    document.getElementById('reservation-table-parent').style.display = "none";
  }
  else {
    document.getElementById('reservation-table-parent').style.display = "block";
    document.getElementById('no-reservation-banner').style.display = "none";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

    let parent = document.getElementById('reservation-table');
    reservations.forEach((elem) => {

      const {name, date, person, adventure, adventureName, price, id, time} = elem;

      let dateString = new Date(date);
      let date1 = dateString.toLocaleDateString("en-IN");

      let timeString = new Date(time);

      let options = {
        day: 'numeric',
        month: 'long', 
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
      let time1 = timeString.toLocaleString("en-IN", options);

      let bookTime = time1.split(' at ').join(', ');

      let urlAdv = "../../adventures/detail/?adventure=" + adventure;

      let rowData = document.createElement('tr');
      rowData.innerHTML = `
      <th>${id}</th>
      <td>${name}</td>
      <td>${adventureName}</td>
      <td>${person}</td>
      <td>${date1}</td>
      <td>${price}</td>
      <td>${bookTime}</td>
      <td id=${id}>
        <a href="${urlAdv}" class="reservation-visit-button">
          Visit Adventure
        </a>
      </td>
      `;

      parent.appendChild(rowData);
    })

}

export { fetchReservations, addReservationToTable };
