const searchField = document.querySelector("#search");
const searchResults = document.querySelector("#search_results");
const modal = document.querySelector(".modal");
const modal_content = document.querySelector(".modal_content");

// fuction to fetch and format json data
getMatches = async val => {
  const res = await fetch("./index.json");
  const data = await res.json();

  let matches = data.filter(({ city, state }) => {
    const regex = new RegExp(`^${val}`, "gi");
    return city.match(regex) || state.match(regex);
  });
  if (val.length === 0) {
    matches = [];
  }

  displaySearch(matches);

  // get results from the dom to be displaye in the modal
  const lis = document.querySelectorAll("li");
  for (let li of lis) {
    li.addEventListener("click", e => {
      modal.classList.add("visible");
      modal_content.innerHTML = li.innerHTML;
    });
  }

  // event listener for closing the modal
  document.addEventListener("click", e => {
    if (e.target.classList[0] == "modal") {
      modal.classList.remove("visible");
    }
  });
};

// function to output out html in the ul element
const displaySearch = filteredMatches => {
  let matches = [];
  matches = filteredMatches.map(
    ({ city, state, population, growth_from_2000_to_2013 }) => {
      return `
      <li>
          <span class="col">
            <span>City: ${city},</span>
            <span>State: ${state},</span>
          </span>
          <span class="col">
            <span>Population: ${Number(population).toLocaleString()},</span>
            <span>Growth %: <span class =${
              growth_from_2000_to_2013.startsWith("-") ? "red" : "green"
            }>${growth_from_2000_to_2013}</span></span>
          </span>
          </li>
        `;
    }
  );
  searchResults.innerHTML = matches.join("");
};

searchField.addEventListener("keyup", () => getMatches(searchField.value));
