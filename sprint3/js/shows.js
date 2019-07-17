const apiKey = '03fb12d9-f603-41d6-940a-e909d577dbb3';

function urlHandler(endpoint) {
  return `https://project-1-api.herokuapp.com/${endpoint}?api_key=${apiKey}`
}

let showsArray = [];

//Creates a Comment class that will dictate how the comments will be structured
class Show {
  
  //Creates the values stored within each new Comment
  constructor(id, place, location, date) {
    this.id = id,
    this.place = place,
    this.location = location,
    this.date = date.toLowerCase()
  }

  get convertDate() {
    // let date = new Date();
    let pattern = /[0-9]+/;
    let str = this.date;
    let match = str.match(pattern);
    return str.replace(pattern, ' ').replace("  ", " ") + " " + match[0];

    //mon may 21 = 2018
    //sat june 16 = 2018
    //fri june 23 = 2017
    //tue june 26 = 2018
    //wed june 27 = 2018
    //fri june 29 = 2018

  }

  //This method handles the DOM manipulation for new comments created in the class 
  render() {

    //Creates all of the HTML elements and assignes classnames
    //Outmost div wrapper of each show
    let postedShow = document.createElement('div');
    postedShow.className = "shows__tour-wrapper";
    postedShow.id = this.id;

    //Date
    let showDateLabel = document.createElement('p');
    showDateLabel.className = 'shows__tour-label';
    showDateLabel.innerHTML = `Date`

    let showDate = document.createElement('p');
    showDate.className = 'shows__tour-date';
    showDate.innerHTML = `${this.convertDate}`


    //Venue
    let showVenueLabel = document.createElement('p');
    showVenueLabel.className = 'shows__tour-label';
    showVenueLabel.innerHTML = `Venue`

    
    let showVenue = document.createElement('p');
    showVenue.className = 'shows__tour-venue';
    showVenue.innerHTML = `${this.place}`


    //Location
    let showLocationLabel = document.createElement('p');
    showLocationLabel.className = 'shows__tour-label';
    showLocationLabel.innerHTML = `Location`

    
    let showLocation = document.createElement('p');
    showLocation.className = 'shows__tour-location';
    showLocation.innerHTML = `${this.location}`

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

//Function that builds the shows
//For each element within the commentsArray Append the Comment Area with the rendered method of the each comment.
let buildShows = () => {
  //error handling
  if (showsArea !== undefined){
      // sortFunction(commentsArray)

    showsArray.forEach(element => {
        showsArea.append(element.render());
    });
  }

} 

 //Function that displays the array                    
// let displayComment = (comment) => {
  
//   showsArea.innerHTML = ' ';
  
//   commentsArray.unshift(comment);

//   buildComments();
// }  
//End of the displayComment function                    

//Sort by Date
function sortFunction(input) {

    input.sort((a,b) => {

      if (a.timestamp === b.timestamp) {
        return (input.indexOf(a) - input.indexOf(b))
      } else {
          return (b.timestamp-a.timestamp)
      }
    }
  )
}


function getShows() {
  
  let request = 'showdates';
  url = urlHandler(request);
  axios.get(url).then(axiosResponse => {

      let initialData = axiosResponse.data;
      console.log(initialData);
      // sortFunction(initialData)

      initialData.forEach(element => {
        const show = new Show(element.id, element.place, element.location, element.date);
        showsArray.push(show);
      })

      buildShows();

    }).catch(err => console.log(err));

};

//Targets the div that will be the comment section
let showsArea = document.querySelector('.shows__content');


getShows();



// let pattern = /[0-9]+/;

// str = 'MON 21 MAY';

/**
 *  let match = newStr.match(pattern);
 * let total = newStr.replace(pattern, ' ').replace("  ", " ") + " " + match[0];
 * 
 */
