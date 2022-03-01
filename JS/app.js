const phoneSearch = () => {
    const searchField = document.getElementById("search-field").value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;

    fetch(url)
        .then((res) => res.json())
        .then((res) => getMobilePhone(res.data));
};

// getMobilePhone(res.data[0])
const getMobilePhone = (phone) => {
    // console.log(phone.length);
    // console.log(phone);

    const phoneResult = document.getElementById("search-result");
    phone.forEach((phones) => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card border p-2 text-center">
            <img src="${phones.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phones.phone_name}</h5>
                <h5 class="card-title">${phones.brand}</h5>
                <button onclick="loadPhoneDetails('${phones.slug}')" class="delete-btn btn btn-primary w-50">Details</button>
            </div>
        </div>
        `;
        phoneResult.appendChild(div);
    });
};

const loadPhoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then((res) => res.json())
        .then((res) => displayPhonedetails(res.data));
};

const displayPhonedetails = (phone) => {
    let text = "Sensors: ";
    const phoneDetail = document.getElementById("phone-details");
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <img src="${
      phone.image
    }" class="card-img-top" style=" height: 500px" alt="...">
    <div class="card-body">
        <h6 class="card-title">Name: ${phone.name}</h6>
        <h6 class="card-title">Brand: ${phone.brand}</h6>
        <p class="card-text">${
          phone.releaseDate ? phone.releaseDate : "No Release Date Found"
        }</p>
        <h6 class="card-title">Main Features</h6>
        <p class="card-text">Display Size: ${
          phone.mainFeatures.displaySize
            ? phone.mainFeatures.displaySize
            : "Not Found Display Size"
        }</p>
        <p class="card-text">Storage: ${
          phone.mainFeatures.storage
            ? phone.mainFeatures.storage
            : "Not Found Storage"
        }
        </p>
        <p class="card-text">Chip Set: ${
          phone.mainFeatures.chipSet
            ? phone.mainFeatures.chipSet
            : "Not Found Chip Set"
        }</p>
        <p class="card-text" id="demo">
        </p>
        
        <p class="card-text ">
         </p>
    </div>
    `;
    phoneDetail.appendChild(div);

    for (let i = 0; i < phone.mainFeatures.sensors.length; i++) {
        if (i == 0) {
            text += phone.mainFeatures.sensors[0];
        } else {
            myFunction(phone.mainFeatures.sensors[i]);
        }
    }
    document.getElementById("demo").innerHTML = text;

    function myFunction(item) {
        text += "," + item;
    }
};