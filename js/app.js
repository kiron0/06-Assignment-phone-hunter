// add event listener on enter button
document.getElementById('search-field').addEventListener("keypress", function (event) {
    if (event.key == 'Enter') {
      document.getElementById('search-btn').click()
    };
  });

const loadPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    searchField.value = '';
    if (searchText == '') {
        alert('Please input phone name first')
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));
    }
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML = '';
    searchResult.textContent = '';
    if (phones.length == 0) {
        alert('no result found');
    }
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadPhoneDetail(${phone.slug})" class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand: ${phone.brand}</p>
             </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}