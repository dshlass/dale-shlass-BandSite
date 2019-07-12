//Creates a Comment class that will dictate how the comments will be structured
class Comment {
  
  //Creates the values stored within each new Comment
  constructor(username, comment, date) {
    this.username = username,
    this.comment = comment,
    this.date = date
  }
  
  //Creates a new key with the name timeStamp which generates the dynamic times of the post.
  get timeStamp() {

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
      else if (!dayDiff) {
        
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
        else if (!secondDiff) {
          return `just now`;
        }
      }
    } //End of If the post is within this current year
  } //End of the timestamp getter

  //This method handles the DOM manipulation for new comments created in the class 
  render() {

    //Creates all of the HTML elements and assignes classnames
    //Outmost div wrapper of each Comment
    let postedComment = document.createElement('div');
    postedComment.className = "comments__posted-comment";

    //Image wrapper
    let commentImgWrapper = document.createElement('div');
    commentImgWrapper.className = 'comments__img';
    
    //Image element 
    let commentImg = document.createElement('img');
    commentImg.className = 'comments__img--small';
    
    //Content container
    let contentWrapper = document.createElement('div');
    contentWrapper.className = 'content';
    
    //Content flex-container
    let contentFlex = document.createElement('div');
    contentFlex.className = 'content__flex';

    //Username
    let contentUsername = document.createElement('p');
    contentUsername.className = 'content__username';

    //Date
    let contentDate = document.createElement('p');
    contentDate.className = 'content__date';

    //Unclassed div that acts as the comment wrapper
    let contentCommentWrapper = document.createElement('div');
    let contentComment = document.createElement('p');
    contentComment.className = 'content__comment';

    //Appending all direct children of the Outtermost div first
    postedComment.appendChild(commentImgWrapper);
    postedComment.appendChild(contentWrapper);

    //First sibling appended
    commentImgWrapper.appendChild(commentImg);
    commentImg.src = 'https://www.fillmurray.com/54/54';
    
    //Second sibling appended with their children
    contentWrapper.appendChild(contentFlex);
    contentWrapper.appendChild(contentCommentWrapper);

    //First child appended and the username value from the object set as the innerHTML
    contentFlex.appendChild(contentUsername);
    contentUsername.innerHTML = this.username;
    
    //First child appended and the timeStamp value from the object set as the innerHTML
    contentFlex.appendChild(contentDate);
    contentDate.innerHTML = this.timeStamp;
    
    //Second child appended and the comment value from the object set as the innerHTML
    contentCommentWrapper.appendChild(contentComment);
    contentComment.innerHTML = this.comment;

    //Outtermost div is returned for use
    return postedComment;
  }   //End of the render() method
} //End of the Comment Class

//For each element within the commentsArray Append the Comment Area with the rendered method of the each comment.
let buildComments = () => {
  //error handling
  if (commentsArray !== undefined){
    commentsArray.forEach(element => {
        commentArea.appendChild(element.render());
    });
  }

} 

 //Function that displays the array                    
let displayComment = (comment) => {
  
  //Clears the displayed area
  commentArea.innerHTML = ' ';
  
  //Pushes new comment into the start of the commentsArray
  commentsArray.unshift(comment);

  //Builds the comment section
  buildComments();
}  
//End of the displayComment function                    


//Function that handles the addition of a new comment
let addComment = (event) => {
  
  //Prevents the page refresh when input element (button) is clicked
  event.preventDefault();
  
  //Targets both the name and comment inputs
  let inputName = event.target.name;
  let inputComment = event.target.comment;

  //Error popup when you submit with the comment box empty
  if (!inputName.value || !inputComment.value) {
    
    if (!inputComment.value){
      window.alert('You must submit a comment!');  
    }
    else window.alert('You must submit a name!'); 
    
  }
  
  //Creates a the new comment
  else {
    let date = new Date()

    //Creates a new comment
    const comment = new Comment(inputName.value, inputComment.value, date);

    //Calls a function that displays the commentsArray
    displayComment(comment);

    //Clears the input and comment values
    inputName.value = '';
    inputComment.value = '';
  }  
} //End of new comment function

//Array with the three sample comments from the mockup. 
//Each index of the array creates a new instance of the Comment object (declared above)
let commentsArray = [
                      new Comment("Michael Lyons","They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVERY witnessed", new Date(2018, 11, 18)),
                      new Comment('Gary Wong', "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He's so talented! I wish I can ride like him one day so I can really enjoy myself!", new Date(2018, 11, 12)),
                      new Comment('Theodore Duncan', "How can someone be so good!!!! You can tell he lives for this and loves to do it everyday. Everytime I see him I feel insantly happy! He's definitely my favorite ever!", new Date(2018, 10, 15))
                    ];

//Targets the form submit button
let submitButton = document.querySelector('.comments__form');

//Adds an event listener to the form submit button
submitButton.addEventListener('submit', addComment);

//Targets the div that will be the comment section
let commentArea = document.querySelector('.comments--posted');

//Builds the comment section
buildComments();
