// GET
//https://project-1-api.herokuapp.com/register
// api_key: e0eea5f0-0f8c-4b54-9fc4-ff50843766d4

// {
//   "api_key": "03fb12d9-f603-41d6-940a-e909d577dbb3"
// }


// https://project-1-api.herokuapp.com/comments?api_key=03fb12d9-f603-41d6-940a-e909d577dbb3

// [
//   {
//     "name": "Micheal Lyons",
//     "comment": "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of acconcert I have EVER witnessed.",
//     "id": "e2327cf7-f1e8-4720-b8b8-e880f22f36dd",
//     "likes": 0,
//     "timestamp": 1530744338878
//   },
//   {
//     "name": "Gary Wong",
//     "comment": "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
//     "id": "b33018fa-c05e-4058-b949-2c81a3960a7f",
//     "likes": 0,
//     "timestamp": 1530744338878
//   },
//   {
//     "name": "Theodore Duncan",
//     "comment": "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!",
//     "id": "aa44885b-e521-49b0-8f85-7e23e0835f61",
//     "likes": 0,
//     "timestamp": 1530744138878
//   }
// ]


// [
//   {
//     "id": 0,
//     "date": "MON 21 MAY",
//     "place": "Montebello Rockfest",
//     "location": "Montebello, QC, Canada"
//   },
//   {
//     "id": "9af8de33-fb01-4171-af55-fbf9c96ffc42",
//     "date": "SAT JUN 16",
//     "place": "Coral Sky Ampitheatre",
//     "location": "West Palm Beach, FL, United States"
//   },
//   {
//     "id": "919dbd1c-6fb5-4225-953f-81d303dd72be",
//     "date": "FRI JUN 23",
//     "place": "MidFlorida Credit Union Ampitheatre",
//     "location": "Tampa, FL, United States"
//   },
//   {
//     "id": "37b1869a-ee29-477e-8903-2c0f39995103",
//     "date": "TUE JUN 26",
//     "place": "Bold Sphere Music at Champions Square",
//     "location": "New Orleans, LA, United States"
//   },
//   {
//     "id": "40366069-2bc7-498c-bc95-4333483d2bd8",
//     "date": "WED JUN 27",
//     "place": "Starplex Pavillion",
//     "location": "Dallas, TX, United States"
//   },
//   {
//     "id": "938fe8a6-86b2-4042-9ce0-132a7921eb10",
//     "date": "FRI JUN 29",
//     "place": "The Cynthia Woods Mitchell Pavillion",
//     "location": "Dallas, TX, United States"
//   }
// ]


// `POST /comments`
// - Creates a new comment
// - Will return a 400 error code if both 'name' and 'comment' are not included
// - If successful, it will return the `comment` JSON object that was created

// #### Required Request Headers
// ```Content-Type: application/json```

// #### POST Body Example
// ```json
// {
// 	"name": "Nigel",
// 	"comment": "What a cool site"
// }
// ```

//https://project-1-api.herokuapp.com/comments/?api_key=03fb12d9-f603-41d6-940a-e909d577dbb3

// body: 
// {
// 	"name": "new Name",
// 	"comment": "Test Comment"
// }

// req
// {
//     "name": "new Name",
//     "comment": "Test Comment",
//     "id": "038207c5-dda9-4e0e-9bc3-ff23697b9fa9",
//     "likes": 0,
//     "timestamp": 1563216527769
// }