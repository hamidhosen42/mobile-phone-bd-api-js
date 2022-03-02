// ----------------- phone search area ------------------
const phoneSearch = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value.toLowerCase();

    // display spinner
    toggleSpinner("block");


    // clear data
    searchField.value = "";
    if (searchText == "") {
        alert("Please Search the Phone Item");
        toggleSpinner("none");
    } else if (searchText.length <= 2) {
        alert("Search Item so sort. Please Search the full name");
        toggleSpinner("none");
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                if (
                    searchText === "apple" ||
                    searchText === "app" ||
                    searchText === "oppo" ||
                    searchText === "opp" ||
                    searchText === "samsung" ||
                    searchText === "sam"
                ) {
                    document.getElementById("search-error").style.display =
                        "none";
                    getMobilePhone(res.data);
                } else {
                    document.getElementById("search-error").style.display = 'block';
                }
            });
    }
};

// ----------------- spinner ------------------v
const toggleSpinner = (displayStyle) => {
    document.getElementById("spinner").style.display = displayStyle;
};



// ----------------- phone search result ------------------
const getMobilePhone = (phone) => {

    const phoneResult = document.getElementById("search-result");
    phoneResult.textContent = "";
    phone.forEach((phones, index) => {
        if (index < 20) {
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
        <div class="card border p-2 text-center shadow-lg">
            <img src="${phones.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phones.phone_name}</h5>
                <h5 class="card-title">${phones.brand}</h5>
                <button onclick="loadPhoneDetails('${phones.slug}')" class="delete-btn btn btn-primary w-50">Details</button>
            </div>
        </div>
        `;
            phoneResult.appendChild(div);
        }
    });
    toggleSpinner("none");
};

// ------------------------ single phone details  ID link--------------------
const loadPhoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then((res) => res.json())
        .then((res) => displayPhonedetails(res.data));
};

// ------------------------ single phone details --------------------
const displayPhonedetails = (phone) => {
    let text = "Sensors: ";
    const phoneDetail = document.getElementById("phone-details");
    phoneDetail.textContent = "";
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
        <h5 class="card-title text-success">Main Features</h5>
        <p class="card-text">Display Size: ${
          phone?.mainFeatures?.displaySize
            ? phone?.mainFeatures?.displaySize
            : "Not Found Display Size"
        }</p>
        <p class="card-text">Storage: ${
          phone?.mainFeatures?.storage
            ? phone?.mainFeatures?.storage
            : "Not Found Storage"
        }
        </p>
        <p class="card-text">Chip Set: ${
          phone?.mainFeatures?.chipSet
            ? phone?.mainFeatures?.chipSet
            : "Not Found Chip Set"
        }</p>
        <p class="card-text" id="demo">
        </p>
        <h5 class="card-title text-success">Others Features</h5>
        <p class="card-text">WAN: ${
          phone?.others?.WLAN ? phone?.others?.WLAN : "Not Found WAN"
        }</p>
        <p class="card-text">Bluetooth: ${
          phone?.others?.Bluetooth
            ? phone.others.Bluetooth
            : "Not Found Bluetooth"
        }</p>
        <p class="card-text">GPS: ${
          phone?.others?.GPS ? phone?.others?.GPS : "Not Found GPS"
        }</p>
        <p class="card-text">NFC: ${
          phone?.others?.NFC ? phone?.others?.NFC : "Not Found NFC"
        }</p>
        <p class="card-text">Radio: ${
          phone?.others?.Radio ? phone?.others?.Radio : "Not Found Radio"
        }</p>
        <p class="card-text">USB: ${
          phone?.others?.USB ? phone?.others?.USB : "Not Found USB"
        }</p>
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