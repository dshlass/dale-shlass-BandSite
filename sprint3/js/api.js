const apiKey = '03fb12d9-f603-41d6-940a-e909d577dbb3';

let submitButton = document.querySelector('.comments__form');
submitButton.addEventListener('submit', putComments);



let commentArea = document.querySelector('.comments--posted');

function urlHandler(endpoint) {
  return `https://project-1-api.herokuapp.com/${endpoint}?api_key=${apiKey}`
}

let commentsArray = [];

// console.log(urlHandler('comments'))

//Sorting Function Try to get this working!!!
// let sortArray = array => {
//   //   array.sort(function(a, b){
//   //     return b.timestamp-a.timestamp;
//   // }) 
//   // console.log(array);
// }


function getComments() {
  let request = 'comments';
  url = urlHandler(request);
  axios.get(url).then(axiosResponse => {
      commentsArray = axiosResponse.data;
      // let y =  sortArray(commentsArray);
      // sortArray(commentsArray);
      // console.log(commentsArray);
        let x = commentsArray.sort((a,b) => {
          return b.timestamp-a.timestamp;
        })

        buildComments(x);

        //Add functaionality to the delete button when the comments render
        let deleteButton = document.querySelectorAll('.comments__delete');
        console.log(deleteButton)


deleteButton.forEach(element => (element.addEventListener('click', deleteComments)));
    }).catch(err => console.log(err));
};


// };

//Rename to buildComments
function buildComments(array) {
    array.forEach(element => {
      
      let postedComment = document.createElement('div');
      postedComment.className = "comments__posted-comment";

      let testButton = document.createElement('button');
      testButton.className = "button comments__submit comments__delete";

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
    contentUsername.innerHTML = element.name;
    
    //First child appended and the timeStamp value from the object set as the innerHTML
    contentFlex.appendChild(contentDate);
    // contentDate.innerHTML = element.timeStamp;
    
    //Second child appended and the comment value from the object set as the innerHTML
    contentCommentWrapper.appendChild(contentComment);
    contentComment.innerHTML = element.comment;

    commentArea.appendChild(postedComment);
    });
    
      // console.log(commentsArray);
};


function putComments() {
// let addComment = (event) => {
  
  //Prevents the page refresh when input element (button) is clicked
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
    // let date = new Date()
  
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
        console.log(axiosResponse)
        let newcomment = axiosResponse.data;
        commentsArray.push(newcomment)
        
        commentArea.innerHTML = ' ';

        let x = commentsArray.sort((a,b) => {
          return b.timestamp-a.timestamp;
        })

        buildComments(x);
        
        }).catch(err => console.log(err));

    //Clears the input and comment values
    inputName.value = '';
    inputComment.value = '';
  }  
} //End of new comment function


//Function to search for ID

// function searchID(input) {

// }

// let deleteButton = document.querySelectorAll('.comments__delete');
// console.log(deleteButton)
let deleteComments = () => {

      // let request = `comments/${id}`;
      // url = urlHandler(request);

      console.log('hello world')
      //   axios({
      //   method: 'delete',
      //   url: url
      // }).then(axiosResponse => {
      //   console.log(axiosResponse)});
}


getComments();

