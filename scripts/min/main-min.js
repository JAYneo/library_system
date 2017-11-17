/* global Requests */

var bookTemplate = $('#templates .book')
var borrowerTemplate = $('#templates .borrower')
var bookTable = $('#bookTable')
var borrowerTable = $('#borrowerTable')


//library id 131
// book id 519

var libraryID = 131
var requests = new Requests(libraryID)
// var baseURL = `https://floating-woodland-64068.herokuapp.com/libraries/${libraryID}`

var dataModel = {
  // books: [],
  // borrowers: [],
}



function addBookToPage(bookData) {
  var book = bookTemplate.clone(true, true)
  book.attr('data-id', bookData.id)
  book.find('.bookTitle').text(bookData.title)
  book.find('.bookImage').attr('src', bookData.image_url)
  book.find('.bookImage').attr('alt', bookData.title)
  bookTable.append(book)
}

function addBorrowerToPage(borrowerData){
  var borrower = borrowerTemplate.clone()
  borrower.attr('data-id', borrowerData.id)
  borrower.find('.borrowerName').text(`${borrowerData.firstname} ${borrowerData.lastname}`)
  borrowerTable.append(borrower)
}

var bookPromise  = requests.getBooks().then((dataFromServer) => {
  dataModel.books = dataFromServer  
})

var borrowerPromise = requests.getBorrowers().then((dataFromServer) => {
  dataModel.borrowers = dataFromServer
})

var promises = [bookPromise, borrowerPromise]

Promise.all(promises).then(() => {
  // First add borrowers to the page
  dataModel.borrowers.forEach((borrowerData) => {
    addBorrowerToPage(borrowerData)
  })
  // Next add books to the page
  dataModel.forEach((bookData) => {
    addBookToPage(bookData)
  })
})

$('#createBookButton').on('click', () => {
  var bookData = {}

  bookData.title = $('.addBookTitle').val()
  bookData.description = $('.addBookDescription').val()
  bookData.image_url = $('.addBookImageURL').val()

  requests.createBook(bookData).then((dataFromServer) => {
    addBookToPage(dataFromServer)
    $('#addBookModal').modal('hide')
    $('#addBookForm')[0].reset()
  })
})

$('.deleteBook').on('click', (event) => {
  var item = $(event.currentTarget).parents('.book')
  var itemID = item.attr('data-id')
  requests.deleteBook({id:itemID}).then(() => {
    item.remove()
  })
})


