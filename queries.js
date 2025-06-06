// node insert_books.js  or npm install mongodb



//Task 2  


// [
//   {
//     "title": "Fishers eye",
//     "author": "Leer Lee",
//     "genre": "Fiction",
//     "published_year": 1960,
//     "price": 5,
//     "in_stock": true,
//     "pages": 360,
//     "publisher": "J. B. Lippincott & Co."
//   },
//   {
//     "title": "Jayden Mind",
//     "author": "George Orwell",
//     "genre": "Dystopian",
//     "published_year": 1949,
//     "price": 10,
//     "in_stock": true,
//     "pages": 328,
//     "publisher": "Secker & Warburg"
//   }
// ...
// ]


// (a) Finding books with specific genre 
{ "genre": "Fiction" }


// (b) Finding books published after a certain year
{ "published_year": { "$gt": 1950 } }


// (c) ..books by a specific book author
{ "author": "George Orwell" }


// (d) Update the price of a specific book
   // filter first
{ "title": "The Alchemist" }
          // then
// Update (in Compass's Update tab):
{ "$set": { "price": 12.99 } }


//  Delete a book by its title
       //in the Delete Document tab in Compass.
    { "title": "Jayden Mind" }




/////// TASK 3 ///////

// (a) query to find books that are both in stock and published after 2010
{ "in_stock": true, "published_year": { "$gt": 2010 } }

// (b)  Use projection to return only the title, author, and price fields in your queries
    // on the filter bar write
    {}

    // then in the project section enter:
{ "title": 1, "author": 1, "price": 1, "_id": 0 }
               // "_id": 0 will remove the ObjectId from the results hennce a cleaner output.



// (c) Implement sorting to display books by price (both ascending and descending)
   //by price ascending
   Filter: {}

    Sort:
    { "price": 1 }


  // by price descending
  Filter: {}

  Sort: 
  { "price": -1 }



 // Using limit and skip for pagination (5 books per page)
First page (skip 0, limit 5)
Filter: {}     Options: Limit: 5
Skip: 0

Second page (skip 5, limit 5)
Filter: {}       Options: Limit: 5
Skip: 5


// (a)
Navigating to books collection then clicking the "Aggregation" tab then using "Add Stage" to input each step like $group, $match, $project.

// (b) Creating a compound index on `author` and `published_year`

{
  $group: {
    _id: "$author",
    book_count: { $sum: 1 }
  }
}
 // then

 {
  $sort: { book_count: -1 }
}

{
  $limit: 1
}



// (b)

{
  $group: {
    _id: {
      $concat: [
        { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
        "s"
      ]
    },
    count: { $sum: 1 }
  }
}

// output "1950s": 3 books | "1980s": 1 book




///////TASK 5////////

1. Create an index on the title field

Go to the books collection.

Click on the "Indexes" tab.

Click "Create Index".

In the "Index Fields" section:

Field: title

Type: Ascending (1)

Click "Create Index".

2. Create a compound index on author and published_year
Repeat the same steps like i done above :

Field 1: author → Ascending (1)

Field 2: published_year → Ascending (1)

{ "author": "George Orwell", "published_year": 1945 }
3. Use explain() to check performance improvements
Unfortunately, MongoDB Compass doesn't allow full explain() analysis like the shell or driver code, but here's what you can do:

Option 1: View execution stats (in Compass)
In the Query bar, after running a filter (e.g., { "title": "The Hobbit" }), click "Explain Plan".

It shows whether an index was used (check for IXSCAN).

Option 2: In the shell (optional)
If you want to see the execution plan in the shell, run:

js
Copy
Edit
db.books.find({ title: "The Hobbit" }).explain("executionStats")

