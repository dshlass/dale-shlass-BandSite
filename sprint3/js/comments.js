/**
 * urlHandler function
 * -> takes in the endpoint from the user (where they want to call the API)
 * -> returns the built url to be used in the http requests
 */

function urlHandler(endpoint) {
  const apiKey = '03fb12d9-f603-41d6-940a-e909d577dbb3';
  return `https://project-1-api.herokuapp.com/${endpoint}?api_key=${apiKey}`
}

//This is the main array that holds all the comments
let commentsArray = []

//Creates a Comment class that will dictate how the comments will be structured
class Comment {
  
  //Creates the values stored within each new Comment
  constructor(name, comment, date, id, likes) {
    this.name = name,
    this.comment = comment,
    this.date = new Date(date),
    this.id = id,
    this.likes = likes
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
    postedComment.id = this.id;
    
    //Adds the button visibility when you hover over parent div
    postedComment.addEventListener('mouseenter', hoverEnter);
    postedComment.addEventListener('mouseleave', hoverExit);

    //function called when each a mouse enters the comment div
    //background color of the buttons change when hovered 
    function hoverEnter() {
      deleteButton.classList.toggle('content__delete--hover');
      deleteButton.addEventListener('mouseenter', () => {
        deleteButton.style.backgroundColor = '#0065AD';
      });
      deleteButton.addEventListener('mouseleave', () => {
        deleteButton.style.backgroundColor = '';
      });
    }

    //function called when each a mouse exits the comment div
    function hoverExit() {
      deleteButton.classList.toggle('content__delete--hover');
    }

    //Creates a delete button and assignes the deleteComments function to it
    let deleteButton = document.createElement('button');
    deleteButton.className = "buttons content__delete";
    deleteButton.addEventListener('click', deleteComments);

    //wrapper for the like and delete button
    let likeDeleteWrapper = document.createElement('div');
    likeDeleteWrapper.className = "comments__bottom-wrapper";

    //Creates a delete button and assignes the deleteComments function to it
    let likeButton = document.createElement('button');
    likeButton.className = "buttons content__like";
    likeButton.addEventListener('click', likeComments);
    
    //Like counter element
    let likeCounter = document.createElement('p');
    likeCounter.className = "content__like-counter";

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
    
    //First sibling appended
    commentImgWrapper.appendChild(commentImg);
    
    //Second sibling appended with their children
    contentWrapper.appendChild(contentFlex);
    contentWrapper.appendChild(contentCommentWrapper);
    contentWrapper.appendChild(likeDeleteWrapper);
    
    //First child appended and the username value from the object set as the innerHTML
    contentFlex.appendChild(contentUsername);
    contentUsername.innerHTML = this.name;
    
    //First child appended and the timeStamp value from the object set as the innerHTML
    contentFlex.appendChild(contentDate);
    contentDate.innerHTML = this.timeStamp;

    //Second child appended and the comment value from the object set as the innerHTML
    contentCommentWrapper.appendChild(contentComment);
    contentComment.innerHTML = this.comment;

    //Thurd child appended with the like button, like counter and delete button
    likeDeleteWrapper.appendChild(likeButton);
    likeButton.innerHTML = 'Like';

    //Like counter appended and the like value from the object set as the innerHTML
    likeDeleteWrapper.appendChild(likeCounter);
    likeCounter.innerHTML = `${this.likes}`;
    
    //Delete button appended and the like value from the object set as the innerHTML
    likeDeleteWrapper.appendChild(deleteButton);
    deleteButton.innerHTML = 'Delete';

    //Outtermost div is returned for use
    return postedComment;
  }   //End of the render() method
} //End of the Comment Class


  /**
 * buildComments function
 * -> the commentsArray is sorted using the sortArray function
 * -> each comment in the commentArray is rendered and appended to the commentArea
 */

let buildComments = () => {
  //error handling
  if (commentsArray !== undefined){
      
      sortFunction(commentsArray)

    commentsArray.forEach(element => {
        commentArea.append(element.render());
    });
  }

} 

  /**
 * displayComment function
 * -> clears the input of the commentArea
 * -> addes the passed in comment to the commentArray
 * -> displays the array with buildComments function
 */

 //Function that displays the array                    
let displayComment = (comment) => {
  
  commentArea.innerHTML = ' ';
  
  commentsArray.unshift(comment);

  buildComments();
}  
//End of the displayComment function                    
  

  /**
 * addComment function
 * -> when called, if there is no value inside either the name or comment there will be a popup alert to the user.
 * -> the name and comment is stored inside the body of the request
 * -> the request returns the created comment from the server
 * -> the returned comment in instantiates a new comment object
 * -> the new comment object is passed as an object to a displayComment function
 * -> when the comments are submitted, the input for the name and comment clear 
 */

//Function that handles the addition of a new comment
let addComment = (event) => {
  
  event.preventDefault();

  let request = 'comments';
  url = urlHandler(request);

  let inputName = event.target.name;
  let inputComment = event.target.comment;

  if (!inputName.value || !inputComment.value) {

    if (!inputComment.value){
      window.alert('You must submit a comment!');  
    }
    else window.alert('You must submit a name!'); 
    
  }
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

      if (axiosResponse.status === 200) {
        let element = axiosResponse.data;
      
        const comment = new Comment(element.name, element.comment, element.timestamp, element.id, element.likes);

        displayComment(comment);
      }
      else throw new Error("Could not add new comment. Please refresh the page and try again");

    }).catch(err => console.log(err));

    inputName.value = '';
    inputComment.value = '';

  }  
} //End of new comment function

/**
 * sortFunction function
 * -> sorts the received data by timestamp
 * -> a conditional was implimented to determine the index at which they were posted to the server
 *    becuase the sort function defaults to the alphabetical order if the values are the same
 */

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

/**
 * getComments function
 * -> initiated as soon as the page loads
 * -> the data is stored and sorted by the sortFunction function
 * -> each index of the sorted array instantiates a new comment object and pushes it to the commentsArray array
 * -> displays the array with buildComments function
 */

function getComments() {
  
  let request = 'comments';
  url = urlHandler(request);
  
  axios({
    method: 'get',
    url: url
  }).then(axiosResponse => {
      
    if (axiosResponse.status === 200) {
        
      let initialData = axiosResponse.data; 
      sortFunction(initialData)

      initialData.forEach(element => {
        const comment = new Comment(element.name, element.comment, element.timestamp, element.id, element.likes);
        commentsArray.push(comment);
      })

      buildComments();
    }
    else throw new Error('There are no comments. Please add a comment.')
    
  }).catch(err => console.log(err));
};

/**
 * deleteComment function
 * -> prevents the page from reloading
 * -> identifies the id of the targets great ancestor element (div with class comments__posted-comment)
 * -> inputs the id into the request url and builds the request URL for axios
 * -> Axios DELETE request
 * -> the commentsArray loops through and compares the id of the div with the id of the comment
 *    and the index of the position within the commentsArray is returned.
 * -> the comment matching that comment id is removed from the commentsArray
 * -> Clears the display div
 * -> re-displays the array with buildComments function
 */

let deleteComments = (element) => {

  event.preventDefault();

  let id = element.target.parentElement.parentElement.parentElement.id;
  let request = `comments/${id}`;
  url = urlHandler(request);

  axios({
    method: 'delete',
    url: url
  }).then(axiosResponse => {

    if(axiosResponse.status === 200) {
      let findObj = commentsArray.find(comment => comment.id === id);
          
      let pos = commentsArray.indexOf(findObj);

      commentsArray.splice(pos, 1)
          
      commentArea.innerHTML = ' ';

      buildComments();
    }
    else throw new Error ('Could not delete this comment. Refresh the page and try again.')

    }).catch(err => console.log(err));
}

/**
 * likeComments function
 * -> identifies the id of the targets great ancestor element (div with class comments__posted-comment)
 * -> inputs the id into the request url and builds the request URL for axios
 * -> Axios PUT request
 * -> If we receive an object from the server, add one to the like count. When the page refreshes it should automatically be updated.
 */

let likeComments = (element) => {

  element.preventDefault();

  let id = element.target.parentElement.parentElement.parentElement.id;
  let request = `comments/${id}/like`;
  url = urlHandler(request);

  axios({
    method: 'put',
    url: url
  }).then(axiosResponse => {

    if(axiosResponse.status === 200) {
      let likeCounter = element.target.nextSibling;
      likeCounter.innerHTML = Number(likeCounter.innerHTML) + 1;
    }
    else throw new Error('Could not find this comment. Refresh the page and try again.')
  }

  ).catch(err => console.log(err));

}

//Targets the form submit button and adds a submit event listener
let submitButton = document.querySelector('.comments__form');
submitButton.addEventListener('submit', addComment);

//Targets the div that will be the comment section
let commentArea = document.querySelector('.comments--posted');

//Comments are loaded as soon as the page loads
getComments();


