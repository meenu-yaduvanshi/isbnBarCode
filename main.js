//======================================================
// https://books.google.com/ebooks?id=buc0AAAAMAAJ&dq=holmes&as_brr=4&source=webstore_bookcard
// import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';

// const axios= require('axios')
// axios.get('https://books.google.com/ebooks?id=buc0AAAAMAAJ&dq=holmes&as_brr=4&source=webstore_bookcard')
//     .then(res =>{console.log(res)})
//     .catch(err =>{console.log(err)})


// //start 
// const axios = require('axios');
// const fs = require('fs');

// // ISBN numbers ki list
// const isbnNumbers = [
//     '9780140449136',
//     '1503280780',
//     '1503290565',
//     '9780590353427',
//     '9780062315007',
//     '9780307387899'
// ];

// const booksDetails = {};

// const fetchBookDetails = async (isbn) => {
//     const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

//     try {
//         const response = await axios.get(apiUrl);

//         if (response.data.items && response.data.items.length > 0) {
//             const book = response.data.items[0].volumeInfo;
//             const title = book.title;
//             const authors = book.authors ? book.authors.join(', ') : 'No author found';

//             booksDetails[isbn] = {
//                 title: title,
//                 authors: authors
//             };
//         } else {
//             booksDetails[isbn] = {
//                 title: 'No title found',
//                 authors: 'No author found'
//             };
//         }
//     } catch (error) {
//         booksDetails[isbn] = {
//             title: 'Error',
//             authors: `Error fetching data: ${error.message}`
//         };
//     }
// };

// const fetchAllBooksDetails = async () => {
//     // Sabhi ISBN numbers ke liye fetchBookDetails call karna
//     await Promise.all(isbnNumbers.map(isbn => fetchBookDetails(isbn)));
//     // isbnNumbers.forEach(isbn => {
//     //         return fetchBookDetails(isbn)
//     //     })

//     fs.writeFile('data.json', JSON.stringify(booksDetails, null, 3), (err) => {
//         if (err) {
//             console.error('Error writing file:', err);
//         } else {
//             console.log('Data successfully written to data.json');
//         }
//     });
// };

// // Fetch aur print karna
// fetchAllBooksDetails();

//----------------------------------------Accept input from the command line in Node.js
//terminal me name likh rhe h
// const readline = require('node:readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question(`What's your name?`, name => {
//   console.log(`Hi ${name}!`);
//   rl.close();
// });

//--------------------------node me isbn number dalne pr book ki details json me store ho rhi h
const axios = require('axios');
const fs = require('fs');
const readline = require('node:readline');

// Function to fetch book details using ISBN number
const fetchBookDetails = async (isbn) => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    let bookDetails = {};

    try {
        const response = await axios.get(apiUrl);

        if (response.data.items && response.data.items.length > 0) {
            const book = response.data.items[0].volumeInfo;
            const title = book.title;
            const authors = book.authors ? book.authors.join(', ') : 'No author found';

            bookDetails = {
                title: title,
                authors: authors
            };
        } else {
            bookDetails = {
                title: 'No title found',
                authors: 'No author found'
            };
        }
    } catch (error) {
        bookDetails = {
            title: 'Error',
            authors: `Error fetching data: ${error.message}`
        };
    }

    return bookDetails;
};

// Function to save details to JSON file
const saveToFile = (isbn, details) => {
    fs.writeFile('data.json', JSON.stringify({ [isbn]: details }, null, 3), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Data successfully written to data.json');
        }
    });
};

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Ask for ISBN number
rl.question('Please enter an ISBN number: ', async (isbn) => {
    const details = await fetchBookDetails(isbn);
    saveToFile(isbn, details);
    rl.close();
});
