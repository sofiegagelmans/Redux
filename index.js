import store from "./redux/store";
import { setValue, increment, decrement } from "./redux/counter";
import { getCocktails } from "./redux/cocktails";

/*** COUNTER ZONE ***/

// UITLEZEN VAN DATA

function updateCounterValue() {
  const { counter } = store.getState().counterState;
  document.getElementById("counter").innerText = counter;
  document.getElementById("counterfield").value = counter;
}

updateCounterValue();

// ELKE KEER DAT DE STORE AANGEPAST WORDT

store.subscribe(updateCounterValue);

// UITSTUREN VAN ACTIES OM ZO ONRECHTSTREEKS DATA TE MANIPULEREN

document.getElementById("inc").onclick = () => store.dispatch(increment());
document.getElementById("dec").onclick = () => store.dispatch(decrement());
document.getElementById("counterfield").oninput = (e) =>
  store.dispatch(setValue(parseInt(e.target.value)));

/*** COCKTAIL ZONE ***/

document.getElementById("form").onsubmit = (e) => {
  e.preventDefault();
  store.dispatch(getCocktails(document.querySelector("#form input").value));
  document.querySelector("#form input").value = "";
};

function cocktailRender() {
  const { ingredient, loading, cocktails } = store.getState().cocktailState;
  document.getElementById("titel").innerText = ingredient;
  if (loading) {
    document.getElementById("loading").style.display = "block";
  } else {
    document.getElementById("loading").style.display = "none";
  }
  if (cocktails) {
    document.getElementById("grid").innerHTML = cocktails
      .map((cocktail) => `<li>${cocktail.strDrink}</li>`)
      .join("");
  } else {
    document.getElementById("grid").style.display = "none";
  }
}

cocktailRender();

store.subscribe(cocktailRender);
