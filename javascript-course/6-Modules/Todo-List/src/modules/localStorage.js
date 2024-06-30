function saveToStorage(key, value) {
   return localStorage.setItem(key, JSON.stringify(value))
}

function getAllFromStorage() {
   let keys = Object.keys(localStorage);
   let items = [];

   for (let key of keys) {
      items.push(JSON.parse(localStorage.getItem(key)));
   }

   return items;
}

export {saveToStorage, getAllFromStorage};