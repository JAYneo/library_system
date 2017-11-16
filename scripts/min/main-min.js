 var bookTemplate = $('#templates .book')
 var bookTable = $('#bookTable')


//library id 131
// book id 519

var libraryID = 131
var baseURL = `https://floating-woodland-64068.herokuapp.com/libraries/${libraryID}`

function addBookToPage(bookData) {
  var book = bookTemplate.clone()
  book.attr('data-id', bookData.id)
  book.find('.bookTitle').text(bookData.title)
  book.find('.bookImage').attr('src', bookData.image_url)
  book.find('.bookImage').attr('alt', bookData.title)
  bookTable.append(book)
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


