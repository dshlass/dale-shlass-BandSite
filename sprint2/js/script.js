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


//Creates a Comment class that will dictate how the comments will be structured
class Comment {
  
  //Creates the values stored within each new Comment
  constructor(username, comment, date) {
    this.username = username,
    this.comment = comment
    
    //If there is no date defined in the arguements, set the date variable to the current date
    if (date === undefined) {
      let setDate = new Date();
      this.date = `${setDate.getMonth() + 1}/${setDate.getDate()}/${setDate.getFullYear()}`;
    } else {
      this.date = date;
    }
  }

  //Render method will dictate how the HTML shows up on the page'
  render() {
    return `<div class='comments__flex-container'>
      <div class='comments__img'>
        <img class='comments__img' src='https://www.fillmurray.com/54/54'>
      </div>
      <div class='comments__content'>
        <div class='content__username-time'>
          <p>${this.username}</p>
          <p>${this.date}</p>
        </div>
        <div>
          <p class='content__comment'>${this.comment}</p>
        </div>
      </div>
    </div>`
  }
}

//Sets the current date of the page
// let date = new Date();

//Array with the three sample comments from the mockup
let commentsArray = [
                      new Comment("Michael Lyons","They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVERY witnessed", '12/18/2018'),
                      new Comment('Gary Wong', "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He's so talented! I wish I can ride like him one day so I can really enjoy myself!", '12/12/2018'),
                      new Comment('Theodore Duncan', "How can someone be so good!!!! You can tell he lives for this and loves to do it everyday. Everytime I see him I feel insantly happy! He's definitely my favorite ever!", '11/15/2018')
                    ];

 //Function that displays the array                    
function displayComment() {

  //Targets the div that will be the comment section
  let test = document.querySelector('.comments--posted');

  //Envokes the render method on each comment object inside of the commentsArray
  //Each render method is stored as an element of a new array called display
  //The values of display are then joined into a string and removes the ',' between them
  let display = commentsArray.map(element => element.render()).join('');

  //The display array is then inputted into the innerHTML of the target div
  test.innerHTML = display;

}

//Function that handles the addition of a new comment
function addComment(e) {
  
  //Precents the page refresh when input element (button) is clicked
  e.preventDefault();
  
  //Targets both the name and comment inputs
  let inputName = document.querySelector('.comments__name');
  let inputComment = document.querySelector('.comments__comment');

  //Reads the input values of both the name and comment inputs
  let inputNameValue = inputName.value;
  let inputCommentValue = inputComment.value;

  //Error popup when you submit a comment without either a name or comment or both
  if (!inputName.value || !inputComment.value) {
    window.setTimeout(window.alert, 10, 'Please input both your name and a comment');  
  }

  //Adds the comment
  else {
    
    //Creates a new comment
    const comment = new Comment(inputNameValue, inputCommentValue);
    
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
