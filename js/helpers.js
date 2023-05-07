function prepareElementData(dataObject) {
    const elementDataArray = [];
    for (const key in dataObject) {
      const element = dataObject[key];
      element.id = key;
      elementDataArray.push(element);
    }
  
    return elementDataArray;
}

function checkInputValues() {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error-message");

  inputNameValue = capitalizeFirstLetter(inputNameValue.trim());
  inputSymbolValue = capitalizeFirstLetter(inputSymbolValue.trim());

  errorDiv.textContent = "";

  if (inputNameValue === dialog.dataset.name && inputSymbolValue === dialog.dataset.symbol) {
  const closeDialog = document.querySelector("#dialog-create-myElement");
  
  createMyElement(inputNameValue, inputSymbolValue)

  console.log(inputNameValue, inputSymbolValue)
  closeDialog.close();
  } else if (inputNameValue !== dialog.dataset.name && inputSymbolValue === dialog.dataset.symbol) {
  errorDiv.textContent = "Name incorrect!";
  inputName.value = "";
  inputName.focus();
  } else if (inputNameValue === dialog.dataset.name && inputSymbolValue !== dialog.dataset.symbol) {
  errorDiv.textContent = "Symbol incorrect!";
  inputSymbol.value = "";
  inputSymbol.focus();
  } else if (inputNameValue !== dialog.dataset.name && inputSymbolValue !== dialog.dataset.symbol) {
  errorDiv.textContent = "Both incorrect!";
  inputName.value = "";
  inputSymbol.value = "";
  inputName.focus();
  }
  }
  
  document.querySelector("#create-my-element-button").addEventListener("click", checkInputValues);

  function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


export {prepareElementData}