const phoneSearch = () => {
    const searchField = document.getElementById("search-field").value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;

    fetch(url)
        .then((res) => res.json())
        .then((res) => getMobilePhone(res.data));
}

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
                <a  href="#" class="btn btn-primary">Details</a>
            </div>
        </div>
        `;
        phoneResult.appendChild(div);
    });
}