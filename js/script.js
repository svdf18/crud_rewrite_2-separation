"use strict";

import {} from "./helpers.js";
import {getElementData, getMyElementData, createMyElement} from "./rest-services.js";

window.addEventListener("load", initApp);

async function initApp() {
    console.log("running");
    updateElementGrid();

    document.querySelector("#form-create-myElement").addEventListener("submit", createMyElementClicked);
}

function addEmptyElement(element) {
    const periodicTable = document.querySelector('.periodic-table');
    const emptyElementBox = document.createElement('div');
    emptyElementBox.addEventListener("click", () => showFormView(emptyElementBox));
    emptyElementBox.classList.add('empty-element');
    emptyElementBox.dataset.atomic_mass = element.atomic_mass;
    emptyElementBox.dataset.category = element.category;
    emptyElementBox.dataset.group = element.group;
    emptyElementBox.dataset.number = element.number;
    emptyElementBox.dataset.xpos = element.xpos;
    emptyElementBox.dataset.ypos = element.ypos;

    emptyElementBox.innerHTML = `
    <div class="element-number-main-view">${element.number}</div>
    <div class="element-mass-main-view">${element.atomic_mass.toFixed(2)}</div>
    `;

    emptyElementBox.style.gridColumn = element.xpos;
    emptyElementBox.style.gridRow = element.ypos;

    periodicTable.appendChild(emptyElementBox);
}

function addMyElement(myElement) {
    const periodicTable = document.querySelector('.periodic-table');
    const myElementBox = document.createElement('div');

    myElementBox.classList.add('empty-element');

    myElementBox.innerHTML = `
    <div class="element-number-main-view">${myElement.number}</div>
    <div class="element-name-main-view">${myElement.name}</div>
    <div class="element-symbol-main-view">${myElement.symbol}</div>
    <div class="element-mass-main-view">${myElement.atomicMass.toFixed(2)}</div>
    `;

    myElementBox.style.gridColumn = myElement.xpos;
    myElementBox.style.gridRow = myElement.ypos;

    periodicTable.appendChild(myElementBox);
} 

function showFormView(emptyElementBox) {
    const atomicMass = emptyElementBox.dataset.atomic_mass;
    const category = emptyElementBox.dataset.category;
    const group = emptyElementBox.dataset.group;
    const number = emptyElementBox.dataset.number;
    const xpos = emptyElementBox.dataset.xpos;
    const ypos = emptyElementBox.dataset.ypos;

    const dialog = document.querySelector("#dialog-create-myElement");
    dialog.dataset.atomic_mass = atomicMass;
    dialog.dataset.category = category;
    dialog.dataset.group = group;
    dialog.dataset.number = number;
    dialog.dataset.xpos = xpos;
    dialog.dataset.ypos = ypos;

    dialog.showModal();
}

function createMyElementClicked(event) {
    const form = event.target;

    const name = form.inputName.value;
    const symbol = form.inputSymbol.value;

    createMyElement(name, symbol)
    form.reset();
    console.log("clicked")
}   

async function updateElementGrid() {
    const elements = await getElementData();
    const myElements = await getMyElementData();
    const periodicTable = document.querySelector('.periodic-table');
  
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const matchingMyElement = myElements.find(myElement => myElement.number === element.number);
  
      if (matchingMyElement) {
        elements[i] = matchingMyElement;
        addMyElement(matchingMyElement);
        const emptyElementBox = periodicTable.querySelector(`.empty-element[data-number="${element.number}"]`);
        if (emptyElementBox) {
          periodicTable.removeChild(emptyElementBox);
        }
      } else {
        addEmptyElement(element);
      }
    }
}

export {updateElementGrid, createMyElementClicked};

