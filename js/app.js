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
        Swal.fire({
            text: 'Please input a phone name first',
            icon: 'warning',
        });
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));
    }
}

// Display phones
const displaySearchResult = phones => {
    // console.log(phones);
    const productContainer = document.getElementById('phones');
    // productContainer.innerHTML = '';
    productContainer.textContent = '';
    if (phones.length == 0) {
        Swal.fire({
            text: 'No result found!',
            icon: 'error',
        });
    }
    const arr = phones;
    arr?.map(phone => {
        let { slug, image, phone_name } = phone;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card shadow-none">
            <img src="${image}" />
            <p class="text-center mb-1 mt-3">${phone_name}</p>
            <button onclick="singleProduct('${slug}')" class="btn btn-primary details-btn" data-bs-toggle="modal" data-bs-target="#single">Details</button>
        </div>`;

        productContainer.appendChild(div);
    });
}

// Call API and Display Details
const singleProduct = async (id) => {
    // Show Preloader
    document.querySelector('.loading').style.display = 'flex';
    document.querySelector('.loading').style.opacity = '1';

    // Call API
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    const { name, image, releaseDate, mainFeatures } = data.data;

    // Display Details
    document.querySelector('.modal-title').innerText = name;
    document.querySelector('.modal-body img').src = image;
    document.getElementById('release-date').innerText = 'Released: ' + releaseDate;
    document.getElementById('chipset').innerText = 'Chipset: ' + mainFeatures.chipSet;
    document.getElementById('display-size').innerText = 'Display Size: ' + mainFeatures.displaySize;
    document.getElementById('memory').innerText = 'Memory: ' + mainFeatures.memory;
    document.getElementById('storage').innerText = 'Storage: ' + mainFeatures.storage;
    document.getElementById('sensors').innerText = 'Sensors: ' + mainFeatures.sensors;

    // Hide Preloader
    document.querySelector('.loading').style.opacity = '0';
    setTimeout(function () {
        document.querySelector('.loading').style.display = 'none';
    }, 500);
}