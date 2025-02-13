const name = new URLSearchParams(location.search).get("name");

const api_link = `https://restcountries.com/v3.1/name/${name}`;

const body = document.querySelector("body");
const mode = document.querySelector(".mode");
const loader = document.querySelector(".loader");
const coutryes = document.querySelector(".coutryes");

mode.addEventListener("click", () => {
  body.classList.toggle("night");
});

// API ma'lumotini olish funksiyasi
const getData = async (api) => {
  try {
    loader.classList.add("active");
    const req = await fetch(api);
    
    if (!req.ok) {
      throw new Error(`API error: ${req.status}`); // Xatolikni tekshirish
    }

    const data = await req.json();
    loader.classList.remove("active");
    useData(data);
  } catch (error) {
    loader.classList.remove("active");
    console.error("Xatolik:", error.message);
    coutryes.innerHTML = `<div class="error">Ma'lumot yuklashda xatolik yuz berdi: ${error.message}</div>`;
  }
};
getData(api_link);

// Ma'lumotlarni ishlovchi funksiya
const useData = (countries) => {
  if (!Array.isArray(countries) || countries.length === 0) {
    coutryes.innerHTML = `<div class="error">Ma'lumot topilmadi!</div>`;
    return;
  }

  countries.forEach((item) => {
    // Har bir element mavjudligini tekshirish
    const capital = item.capital ? item.capital[0] : "Noma'lum";
    const borders = item.borders ? item.borders.join(", ") : "Chegara yo'q";
    const continent = item.continents ? item.continents[0] : "Noma'lum";
    
    coutryes.innerHTML += ` 
      <div class="country_about">
        <div class="img">
          <a href="./index.html"><img src="${item.flags?.png || ''}" alt="Flag"></a>
        </div>
        <div class="country_info">
          <h1>${item.name?.common || "Noma'lum"}</h1>
          <div class="info_text">
            <h3><b>Native Name:</b> ${item.name?.nativeName || "Noma'lum"}</h3>
            <h3><b>Population:</b> ${item.population || "Noma'lum"}</h3>
            <h3><b>Region:</b> ${continent}</h3>
            <h3><b>Sub Region:</b> ${item.subregion || "Noma'lum"}</h3>
            <h3><b>Capital:</b> ${capital}</h3>
          </div>
          <h3><b>Border Countries:</b> ${borders}</h3>
        </div>
      </div>`;
  });
};

mode.addEventListener("click", () => {
  console.log("salom");
});
