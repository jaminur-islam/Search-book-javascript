//  result found function [multi time using]
const ResultFound = (id, property) => {
  const noResult = document.getElementById(id)
  noResult.style.display = property;
}
// button add Event listener
document.getElementById('button').addEventListener('click', async () => {
  // capture input value
  const inputField = document.getElementById('input-field');
  const inputText = inputField.value;

  //Clear input field
  inputField.value = '';
  // remove noresult found message 
  ResultFound('result', 'none')
  // remove total search value
  ResultFound('total-search-value', 'none')
  // remove displayBook content
  const displayContainer = document.getElementById('displaybook')
  displayContainer.textContent = '';

  // condition
  if (inputText === '') {
    alert('Plz Write a book name...')
    return;
  }
  // Add spiners
  ResultFound('spiners', 'block')
  // hand clients site error
  try {
    // Call API
    const url = `https://openlibrary.org/search.json?q=${inputText}`;
    const res = await fetch(url);
    const data = await res.json();

    // set total books found result
    const totalLen = document.getElementById('total');
    totalLen.innerText = data.numFound;

    // Call function
    displayInformation(data.docs)

  } catch (er) {
    // remove spiners
    ResultFound('spiners', 'none')
  }
})
// displayInformation function
const displayInformation = (booksData) => {
  console.log(booksData.length);
  if (booksData.length === 0 || booksData === null) {
    //add  No result found Message
    ResultFound('result', 'block');
    // remove spiners
    ResultFound('spiners', 'none')

  } else {
    // remove No result found Message
    ResultFound('result', 'none')
  }

  // show total search value
  ResultFound('total-search-value', 'block')

  // select displayBook tag 
  const displayContainer = document.getElementById('displaybook')
  displayContainer.textContent = '';
  // Arrray ForEaching
  booksData.slice(0, 18).forEach(singleBook => {
    //Create a div tag
    const div = document.createElement('div');
    div.className = 'col mb-5';
    div.innerHTML = `
    <div class="text-center border-0 ">
    <img width="180" height="220" src="https://covers.openlibrary.org/b/id/${singleBook.cover_i ? singleBook.cover_i: ''}-M.jpg" class="mx-auto" alt="...">
    <div class="mt-2">
      <h5 class="card-title m-0 fw-bold text-primary">${singleBook.title}</h5>
      <p class=" m-0 fw-bold"> Author-Name : ${singleBook.author_name ? singleBook.author_name[0]: 'Unknown author'}</p>
      <p class=" m-0 fw-bold"> first-publist-Year : ${singleBook.first_publish_year ? singleBook.first_publish_year: 'Unknown Year'}</p>
      <p class=" m-0 fw-bold"> Publisher : ${singleBook. publisher[0] ? singleBook.publisher[0] : 'Unknow publisher'}</p>
    </div>
     <button class="btn-primary p-1 w-50 mt-1 mx-auto rounded">More Details</button>
  </div>`
    displayContainer.appendChild(div);
    // Remove spiners
    ResultFound('spiners', 'none')
  })
}