//Mostrar nome da imagem no input
var label = document.getElementById("fileselector");
var input = document.getElementById("file-selector");

label.addEventListener("click", () => {
  input.click();
});
input.addEventListener("change", () => {
  var nome = "Selecione um arquivo...";
  var icon = `<img id="upload" src="/assets/upload.svg" alt="Fazer upload">`
  if(input.files.length > 0) nome = input.files[0].name;
  label.innerHTML = icon + nome 
})

//Dados da entidade
function populateUF() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUF();

function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");
  const ufId = event.target.value;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`;
  
  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

//Itens de Coleta
let selectedItems = [];

function handleSelectedItem(event) {
  itemLi = event.target;
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId;

    return itemFound;
  });

  if (alreadySelected >= 0) {
    selectedItems.splice(alreadySelected, 1);
  } else {
    selectedItems.push(itemId);
  }

  collectedItems.value = selectedItems;
  console.log(selectedItems);

}

const itemsToCollect = document.querySelectorAll(".items-grid li");
const collectedItems = document.querySelector("input[name=items]");

for (item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}
