function populateUFs() {
    const UfSelect = document.querySelector('select[name=uf]')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() )
    .then(states => {

        for(const state of states) {
            UfSelect.innerHTML += '<option value="${state.id}">${state.nome}</option>'
        }

    })
}

poupulateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("select[name=state]")


    const ufvalue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.option[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disable = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {

        for(const city of cities) {
            citySelect.innerHTML += "<option value="${city.id}">${city.nome}</option>"
        }

        citySelect.disable = false

    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener('change', getCities)


// Itens de coleta
// pegar todos os li´s

const itemsToCollect = document.querySelector(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se existem itens selecionados, se sim
    // pagar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    // se já estiver selecionado
    if(alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado
        // adicionar à seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escolhido com os itens selecionados
    collectedItems.value = selectedItems
}