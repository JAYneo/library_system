var bookTemplate = $('#templates .book')
var borrowerTemplate = $('#templates .borrower')
var bookTable = $('#bookTable')
var borrowerTable = $('#borrowerTable')


//library id 131
// book id 519

var libraryID = 131
var baseURL = `https://floating-woodland-64068.herokuapp.com/libraries/${libraryID}`

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
  borrower.find('.borrowerFirstName').text(borrowerData.firstname)
  borrower.find('.borrowerLastName').text(borrowerData.lastname)
  borrowerTable.append(borrower)
}

var getBooksRequest = $.ajax({
  type: 'GET',
  url: `${baseURL}/books`,
})

getBooksRequest.done( (dataFromServer) => {
  dataFromServer.forEach((bookData) => {
    addBookToPage(bookData)
  })
})

var getBorrowerRequest = $.ajax({
  type: 'GET',
  url: `${baseURL}/borrowers`,
})

getBorrowerRequest.done((dataFromServer) => {
  dataFromServer.forEach((borrowerData) => {
    addBorrowerToPage(borrowerData)
  })
})

bookTable.on('click', '.deleteBook', function(event) {
  var item = $(event.currentTarget).parents('.book')
  var itemID = item.attr('data-id')
  var deleteBook = $.ajax({
    type: 'DELETE',
    url: `${baseURL}/books/${itemID}`,
  })
  deleteBook.done(function() {
    item.remove()
  })
})

$('#createBookButton').on('click', () => {
  var bookData = {}

  bookData.title = $('.addBookTitle').val()
  bookData.description = $('.addBookDescription').val()
  bookData.image_url = $('.addBookImageURL').val()

  var createBookRequest = $.ajax({
    type:'POST',
    url: baseURL + '/books',
    data: {
      book: bookData
    }
  })

  createBookRequest.done((dataFromServer) => {
    addBookToPage(dataFromServer)
    $('#addBookModal').modal('hide')
    $('#addBookForm')[0].reset()
  })

})

// bookTable.on('click', '.deleteBook', (event) => {
//   console.log("inside deleteBook click")
//   var item = $(event.currentTarget).parents('.book')
//   var itemID = item.attr('data-id')
//   var deleteBook = $.ajax({
//     type: 'DELETE',
//     url: `${baseURL}/books/${itemID}`,
//   })
// deleteBook.done( () => {
//   item.remove()
//  })
// })


