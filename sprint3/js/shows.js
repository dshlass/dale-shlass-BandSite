/**
 * urlHandler function
 * -> takes in the endpoint from the user (where they want to call the API)
 * -> returns the built url to be used in the http requests
 */

function urlHandler(endpoint) {
  const apiKey = '03fb12d9-f603-41d6-940a-e909d577dbb3';
  return `https://project-1-api.herokuapp.com/${endpoint}?api_key=${apiKey}`
}

//This is the main array that holds all the shows
let showsArray = [];

//Creates a Show class that will dictate how the shows will be structured
class Show {
  
  //Creates the values stored within each new show
  constructor(id, place, location, date) {
    this.id = id,
    this.place = place,
    this.location = location,
    this.date = date.toLowerCase()
  }

  //Rearranges dates to all be the same (first datapoint is MON 21 MAY instead of MON MAY 21)
  get convertDate() {
    let pattern = /[0-9]+/;
    let normalizedDate = this.date;
    let match = normalizedDate.match(pattern);
    return normalizedDate.replace(pattern, ' ').replace("  ", " ") + " " + match[0];
  }

  //This method handles the DOM manipulation for new shows created in the class 
  render() {

    //Creates all of the HTML elements and assignes classnames
    //Outmost div wrapper of each show
    let postedShow = document.createElement('div');
    postedShow.className = "shows__tour-wrapper";
    postedShow.id = this.id;

    //Date Label
    let showDateLabel = document.createElement('p');
    showDateLabel.className = 'shows__tour-label';
    showDateLabel.innerHTML = `Date`

    //Date
    let showDate = document.createElement('p');
    showDate.className = 'shows__tour-date';
    showDate.innerHTML = `${this.convertDate}`

    //Venue Label
    let showVenueLabel = document.createElement('p');
    showVenueLabel.className = 'shows__tour-label';
    showVenueLabel.innerHTML = `Venue`

    //Venue 
    let showVenue = document.createElement('p');
    showVenue.className = 'shows__tour-venue';
    showVenue.innerHTML = `${this.place}`

    //Location Label
    let showLocationLabel = document.createElement('p');
    showLocationLabel.className = 'shows__tour-label';
    showLocationLabel.innerHTML = `Location`

    //Location
    let showLocation = document.createElement('p');
    showLocation.className = 'shows__tour-location';
    showLocation.innerHTML = `${this.location}`

    //Buy tickets button
    let buyTickets = document.createElement('button');
    buyTickets.className = "shows__submit";
    buyTickets.innerHTML = `Buy Tickets`

    //Appending all direct children of the Outtermost div first
    postedShow.appendChild(showDateLabel);
    postedShow.appendChild(showDate);
    postedShow.appendChild(showVenueLabel);
    postedShow.appendChild(showVenue);
    postedShow.appendChild(showLocationLabel);
    postedShow.appendChild(showLocation);
    postedShow.appendChild(buyTickets);

    //Outtermost div is returned for use
    return postedShow;
  }   //End of the render() method
} //End of the Show Class

  /**
 * buildShows function
 * -> each comment in the showsArray is rendered and appended to the showsArea
 */
 
 let buildShows = () => {
  
  if (showsArea !== undefined){
    showsArray.forEach(element => {
        showsArea.append(element.render());
    });
  }

} 

/**
 * getShows function
 * 
 * -> initiated as soon as the page loads
 * -> each index of the received object instantiates a new show object and pushes it to the showsArray array
 * -> displays the array with buildShows function
 */

function getShows() {
  
  let request = 'showdates';
  url = urlHandler(request);

  axios({
    method: 'get',
    url: url
  }).then(axiosResponse => {

    if (axiosResponse.status === 200) {
      
      let initialData = axiosResponse.data;
      
      initialData.forEach(element => {
        const show = new Show(element.id, element.place, element.location, element.date);
        showsArray.push(show);
      })

      buildShows();
    }
    else throw new Error('There are no shows to be displayed. The band is not on tour');

  }).catch(err => console.log(err));
};

//Targets the div that will be the shows section
let showsArea = document.querySelector('.shows__content');

//Shows are loaded as soon as the page loads
getShows();
