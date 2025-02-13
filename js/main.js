const api_link = "https://restcountries.com/v3.1/all";

const contires = document.querySelector(".contires");
const select = document.querySelector("select");
const input = document.querySelector(".input");
const inputt = document.querySelector("input");
const region = document.querySelector("#region");
const body = document.querySelector("body");
const mode = document.querySelector(".mode");
const loader = document.querySelector(".loader");

var datas;

const getData = async (api) => {
  loader.classList.add("active");
  const req = await fetch(api);
  const data = await req.json();
  datas = data;
  useData(datas);
  loader.classList.remove("active");
};

getData(api_link);

const useData = (data) => {
  contires.innerHTML = "";
  data.forEach((item) => {
    contires.innerHTML += `<a href="./country.html?name=${item.name.common}" >
    <div class="country">
    <div>
      <img
        src="${item.flags.png}"
        alt="flag"
        // height="160px"
      />
      <h3>${item.name.common.slice(0, 15)}</h3>
      <p><span> Population:&nbsp;&nbsp;</span>${item.population}</p>
      <p class="regions">
        <span> Region: &nbsp; &nbsp; &nbsp; &nbsp; </span> ${item.region}
      </p>
      <p>
        <span> Capital: &nbsp; &nbsp; &nbsp; &nbsp; </span> ${item.capital}
      </p>
    </div>
  </div>
    </a>`;
  });
};

inputt.addEventListener("input", () => {
  contires.innerHTML = "";
  const searchCountry = inputt.value.trim().toLowerCase();
  contires.childNodes.forEach((country) => {
    if (
      !country
        .querySelector("h3")
        .textContent.toLowerCase()
        .includes(searchCountry)
    ) {
      country.classList.add("hidden");
    } else {
      country.classList.remove("hidden");
    }
  });
});

region.addEventListener("change", () => {
  const regionEl = region.value.trim().toLowerCase();
  console.log();

  if (regionEl == "all") {
    useData(datas);
  } else {
    const newData = datas.filter((item) => {
      return item.region.toLowerCase() == regionEl;
    });
    useData(newData);
  }

  inputt.value = "";
});

mode.addEventListener("click", () => {
  body.classList.toggle("night");
});
