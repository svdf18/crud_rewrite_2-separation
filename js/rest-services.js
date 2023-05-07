"use strict"

import {updateElementGrid} from "./script.js"
import {prepareElementData} from "./helpers.js"

const endpoint = "https://periodic-table-json-default-rtdb.europe-west1.firebasedatabase.app/";

async function getElementData() {
    const response = await fetch(`${endpoint}/elements.json`);
    const elementData = await response.json();
    const elements = prepareElementData(elementData);
    return elements;
}

async function getMyElementData() {
    const response = await fetch (`${endpoint}/myElements.json`);
    const myElementData = await response.json();
    const myElements = prepareElementData(myElementData);
    return myElements;
}

async function createMyElement(name, symbol) {
    const atomicMass = parseInt(document.querySelector("#dialog-create-myElement").dataset.atomic_mass);
    const category = (document.querySelector("#dialog-create-myElement").dataset.category);
    const group = parseInt(document.querySelector("#dialog-create-myElement").dataset.group);
    const number  = parseInt(document.querySelector("#dialog-create-myElement").dataset.number);
    const xpos = parseInt(document.querySelector("#dialog-create-myElement").dataset.xpos);
    const ypos = parseInt(document.querySelector("#dialog-create-myElement").dataset.ypos);
    const newMyElement = { 
        atomicMass,
        category,
        group, 
        name,
        number, 
        symbol, 
        xpos, 
        ypos 
        };
    const json = JSON.stringify(newMyElement); 
    const response = await fetch(`${endpoint}/myElements.json`, {
        method: "POST",
        body: json
    });
    if (response.ok) {
        console.log("New myElement succesfully added to Firebase 🔥");
        updateElementGrid();
    }
}

export {getElementData, getMyElementData, createMyElement}