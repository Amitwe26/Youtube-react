export const storageService = {
    loadFromStorage,
    saveToStorage,
    saveSession,
    loadSession
}
function loadFromStorage(key) {
    var json = localStorage.getItem(key)
    var value = JSON.parse(json)
    return value;
}
function saveToStorage(key, value) {
    var json = JSON.stringify(value);
    localStorage.setItem(key, json)
}

function saveSession(key, value) {
    const val = JSON.stringify(value)
    sessionStorage.setItem(key, val);

}

function loadSession(key, defaultValue = null) {
    var value = sessionStorage.getItem(key);
    if (!value) return defaultValue
    else return JSON.parse(value);
}