// const apiKey = '03fb12d9-f603-41d6-940a-e909d577dbb3';
const apiKey = '4829e293-a170-49f3-891e-ca8148648efe';

function urlHandler(endpoint) {
  return `https://project-1-api.herokuapp.com/${endpoint}?api_key=${apiKey}`
}

let commentsArray = []
//Old
//start with an array of objects with three variables
//create a new comment object
//push the new object to the commentArea array
//display the commentArea array

//New
//Get the comments
//create a new comment object for each comment received
//push each comment to a comment array
//display the commentArea array



//Creates a Comment class that will dictate how the comments will be structured
class Comment {
  
  //Creates the values stored within each new Comment
  constructor(name, comment, date, id) {
    this.name = name,
    this.comment = comment,
    this.date = date,
    this.id = id
    // this.img = img
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

      let testButton = document.createElement('button');
      testButton.className = "button comments__submit comments__delete";
      testButton.addEventListener('click', deleteComments);

    //Image wrapper
    let commentImgWrapper = document.createElement('div');
    commentImgWrapper.className = 'comments__img';
    
    //Image element 
    let commentImg = document.createElement('img');
    commentImg.className = 'comments__img--posted';
    
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
        postedComment.appendChild(testButton);


    //First sibling appended
    commentImgWrapper.appendChild(commentImg);
    // commentImg.src = `${this.img}`;
    
    //Second sibling appended with their children
    contentWrapper.appendChild(contentFlex);
    contentWrapper.appendChild(contentCommentWrapper);

    //First child appended and the username value from the object set as the innerHTML
    contentFlex.appendChild(contentUsername);
    contentUsername.innerHTML = this.name;
    
    //First child appended and the timeStamp value from the object set as the innerHTML
    contentFlex.appendChild(contentDate);
    // contentDate.innerHTML = this.timeStamp;
    
    //Second child appended and the comment value from the object set as the innerHTML
    contentCommentWrapper.appendChild(contentComment);
    contentComment.innerHTML = this.comment;

    //Outtermost div is returned for use
    return postedComment;
  }   //End of the render() method
} //End of the Comment Class


//Function that builds the comments
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
  
  commentArea.innerHTML = ' ';
  
  commentsArray.unshift(comment);

  buildComments();
}  
//End of the displayComment function                    


//Function that handles the addition of a new comment
let addComment = (event) => {
  
  event.preventDefault();

  let request = 'comments';
  url = urlHandler(request);

  
  //Targets both the name and comment inputs and the image
  let inputName = event.target.name;
  let inputComment = event.target.comment;
  // let inputImg = document.querySelector('.comments__img--large').src;

  //Error popup when you submit with the comment box empty
  if (!inputName.value || !inputComment.value) {

    if (!inputComment.value){
      window.alert('You must submit a comment!');  
    }
    else window.alert('You must submit a name!'); 
    
  }
  
  //Creates creates a new comment object with the current date timestamp
  else {

    let body = {
      name: `${inputName.value}`,
      comment: `${inputComment.value}`
    };

      axios({
        method: 'post',
        url: url,
        contentType: 'application/json',
        data: body
      }).then(axiosResponse => {
        
        let element = axiosResponse.data;
        
        const comment = new Comment(element.name, element.comment, element.timestamp, element.id);
        
        displayComment(comment)

        
        }).catch(err => console.log(err));

    //Clears the input and comment values
    inputName.value = '';
    inputComment.value = '';
  }  
} //End of new comment function



function getComments() {
  let request = 'comments';
  url = urlHandler(request);
  axios.get(url).then(axiosResponse => {

      let initialData = axiosResponse.data;

      //Sorts the innitial data received by timestamp and pushes to array
      let sortedArray = initialData.sort((a,b) => {
          return a.timestamp-b.timestamp;
      })

      sortedArray.forEach(element => {
          const comment = new Comment(element.name, element.comment, element.timestamp, element.id);
          commentsArray.unshift(comment);
      })

        buildComments();

        //Add functaionality to the delete button when the comments render
      // let deleteButton = document.querySelectorAll('.comments__delete');
      // deleteButton.forEach(element => (element.addEventListener('click', deleteComments)));
    }).catch(err => console.log(err));
};


//Targets the form submit button and adds a submit event listener
let submitButton = document.querySelector('.comments__form');
submitButton.addEventListener('submit', addComment);

//Targets the div that will be the comment section
let commentArea = document.querySelector('.comments--posted');

let deleteComments = (element) => {

      // let request = `comments/${id}`;
      // url = urlHandler(request);
    
      console.log(element.target.parentElement)
      //   axios({
      //   method: 'delete',
      //   url: url
      // }).then(axiosResponse => {
      //   console.log(axiosResponse)});
}


//create an empty input with the id of the element
//use the id of the input to pass into the delete comments function
//call the removecomments to target that comment


getComments();


