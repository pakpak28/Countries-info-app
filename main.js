const countriesEl = document.getElementById("countries");
const toggleBtn = document.getElementById("toggle");
const filterBtn = document.getElementById("filter");
const regionFilters = filterBtn.querySelectorAll("li");
const searchEl = document.getElementById("search");
const filterEl = document.getElementById("filter");
// API CALL AND FETCH COUNTRIES
getCountries();

async function getCountries() {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  displayCountries(countries);
}

function displayCountries(countries) {
  countriesEl.innerHTML = "";

  countries.forEach((country) => {
    const countryEl = document.createElement("div");
    countryEl.classList.add("card");

    countryEl.innerHTML = `
            <div>
                <img src="${country.flag}" alt="${country.name}" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name}</h3>
                <p>
                    <strong>Population:</strong>
                    ${country.population}
                </p>
                <p class="country-region">
                    <strong>Region:</strong>
                    ${country.region}
                </p>
                <p>
                    <strong>Capital:</strong>
                    ${country.capital}
                </p>
            </div>
        `;

    countriesEl.appendChild(countryEl);
  });
}
////DARK THEME
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
////DROPDOWN
filterBtn.addEventListener("click", () => {
  filterBtn.classList.toggle("open");
});
///input search
searchEl.addEventListener("input", (e) => {
  const value = e.target.value;
  const countryName = document.querySelectorAll(".country-name");

  countryName.forEach((name) => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});
///Filter droplist by region
regionFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const value = filter.innerText;
    const countryRegion = document.querySelectorAll(".country-region");

    countryRegion.forEach((region) => {
      if (region.innerText.includes(value) || value === "All") {
        // .card -> .card-body -> .country-region
        region.parentElement.parentElement.style.display = "block";
      } else {
        region.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
