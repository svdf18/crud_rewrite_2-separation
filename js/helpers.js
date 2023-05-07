function prepareElementData(dataObject) {
    const elementDataArray = [];
    for (const key in dataObject) {
      const element = dataObject[key];
      element.id = key;
      elementDataArray.push(element);
    }
  
    return elementDataArray;
}

export {prepareElementData}