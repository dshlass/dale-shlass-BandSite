//Instructions
// Given the updated mockups, add a comments section to the Bio page, which must dynamically update
// In your JavaScript, create an array that contains at least 3 objects representing sample comments
// Create a function, displayComment() that takes in one comment object as a parameter and displays it on the page using JavaScript DOM manipulation
// Create an HTML form whose click or submit event listener does the following:

//     Prevents the page from reloading when submitting a new comment
//     Constructs a new comment object
//     Pushes a new comment object to an array of comments
//     Clears all comments from the page
//     Re-renders to the page all comments from the comment array
//     Clears the input fields after submitting a new comment
//     Note: you will see this form reflected in the creative mockup as a comment box

//Deeper Dive
//To add a more realistic feel to the site, try updating the timestamp in the comments section 
//to reflect when it was posted in a more human-readable format. Using YouTube as an example, 
//a recently posted comment might display the time posted as "10 minutes ago" or "3 days ago". 
//Apply this type of timestamp to your data without hardcoding the actual message.

//Creates a Comment class that will dictate how the comments will be structured
class Comment {
  
  //Creates the values stored within each new Comment
  constructor(username, comment, date) {
    this.username = username,
    this.comment = comment,
    this.date = date
  }
  
  //Maybe use something like this to set the timestamp?
  get verifyTime() {

    //Setting variables for current date-time
    let pageDate = new Date();
    let currentYear = pageDate.getFullYear();
    let currentMonth = pageDate.getMonth() + 1;

    //Setting variables for posted date-time
    let postedDate = this.date;
    let postedYear = postedDate.getFullYear();
    let postedMonth = postedDate.getMonth() + 1;

    //Set conditionals to calculate the elapsed time
   //Checks to see if this post was posted this year or last 
    if (currentYear >  postedYear) {

      let yearDiff = currentYear - postedYear;
      //monthDiff will add 12 months to current Month and uses the difference
      //mainly used if a post was posted in december 2018 vs january 2019
      //this would equare to 1 year difference, but in reality it is 1 month.
      let monthDiff = ((yearDiff * 12) + currentMonth) - postedMonth;

      //Evaluates into years 
      if (monthDiff >= 12) {
        return `${yearDiff} years old`
      }
      //Evaluates into months
      else if (monthDiff > 1 && monthDiff < 12 )  {
        return `${monthDiff} months old`;
      }
    }

    //If the post is within this current year
    if (currentYear ===  postedYear) {
      
      //Setting variables for the differences between months, days, hours, minutes, seconds
      let monthDiff = currentMonth - postedMonth;
      let dayDiff = Math.floor(Math.abs(pageDate - postedDate) / 1000 / 60 / 60 / 24);
      let hourDiff = Math.floor(Math.abs(pageDate - postedDate) / 1000 / 60 / 60);
      let minuteDiff = Math.floor(Math.abs(pageDate - postedDate) / 1000 / 60);
      let secondDiff = Math.floor(Math.abs(pageDate - postedDate) / 1000);

      //Using 30 days as the cutoff for months old
      if (dayDiff >= 30) {
        return `${monthDiff} months ago`;
      }

      //If within the last 30 days, it is days old
      if (dayDiff > 0 && dayDiff < 30) {
        return `${dayDiff} days ago`;
      }

      //If the post is within the current day
      else if (dayDiff === 0) {
        
        //If the post was posted more than 1 hour ago display in hours
        if (secondDiff >= 36000 ) {
          return `${hourDiff} hours ago`;
        }
        
        //If the post was posted more than 1 minute ago but less than an hour ago display in minutes
        else if (secondDiff > 60 && secondDiff < 36000 ) {
          return `${minuteDiff} minutes ago`;
        }

        //If the post was posted less than a minute ago display in seconds
        else if (secondDiff > 0 && secondDiff < 60 ) {
          return `${secondDiff} seconds ago`;
        }
       
        //displays just now the newest post.
       else if (secondDiff === 0) {
          return `just now`;
        }
      }
    } 
  }

  //Render method will dictate how the HTML shows up on the page
  //Consider using the append child and text node creation
  render() {
    return `<div class='comments__posted-comment'>
      <div class='comments__img'>
        <img class='comments__img--small' src='https://www.fillmurray.com/54/54'>
      </div>
      <div class='content'>
        <div class='content__flex'>
          <p class="content__username">${this.username}</p>
          <p class="content__date">${this.verifyTime}</p>
        </div>
        <div>
          <p class='content__comment'>${this.comment}</p>
        </div>
      </div>
    </div>`
  }
}

//Array with the three sample comments from the mockup
let commentsArray = [
                      new Comment("Michael Lyons","They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVERY witnessed", new Date(2018, 11, 18)),
                      new Comment('Gary Wong', "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He's so talented! I wish I can ride like him one day so I can really enjoy myself!", new Date(2018, 11, 12)),
                      new Comment('Theodore Duncan', "How can someone be so good!!!! You can tell he lives for this and loves to do it everyday. Everytime I see him I feel insantly happy! He's definitely my favorite ever!", new Date(2018, 10, 15))
                    ];

 //Function that displays the array                    
function displayComment() {

  //Targets the div that will be the comment section
  let test = document.querySelector('.comments--posted');

  //Envokes the render method on each comment object inside of the commentsArray
  //Each render method is stored as an element of a new array called display
  //The values of display are then joined into a string and removes the ',' between them
  //This will be removed if the render method turns into the append child etc
  let display = commentsArray.map(element => element.render()).join('');

  //The display array is then inputted into the innerHTML of the target div
  test.innerHTML = display;
}

//Function that handles the addition of a new comment
function addComment(e) {
  
  //Precents the page refresh when input element (button) is clicked
  e.preventDefault();
  
  //Targets both the name and comment inputs
  let inputName = document.querySelector('.comments__input--name');
  let inputComment = document.querySelector('.comments__input--comment');

  //Reads the input values of both the name and comment inputs
  let inputNameValue = inputName.value;
  let inputCommentValue = inputComment.value;

  //Error popup when you submit a comment without either a name or comment or both
  if (!inputName.value || !inputComment.value) {
    window.setTimeout(window.alert, 10, 'Please input both your name and a comment');  
  }

  //Adds the comment
  else {
    
    let date = new Date()

    //Creates a new comment
    const comment = new Comment(inputNameValue, inputCommentValue, date);
    
    //Pushes new comment into the start of the commentsArray
    commentsArray.unshift(comment);

    //Calls a function that displays the commentsArray
    displayComment();

    //Clears the input and comment values
    inputName.value = '';
    inputComment.value = '';
  }
}

//Targets the form submit button
let submitButton = document.querySelector('.comments__submit');

//Adds an event listener to the form submit button
submitButton.addEventListener('click', addComment);

//This will display the sample comments in the commentsArray when the page loads.
displayComment();
