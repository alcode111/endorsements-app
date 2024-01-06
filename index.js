import { initializeApp } from
"https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-30064-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const textAreaEl = document.getElementById("endorsement-textarea")
const fromInput = document.getElementById("from-input")
const toInput = document.getElementById("to-input")
const publishButton = document.getElementById("publish-btn")
const endorsementsUL = document.getElementById("endorsements-ul")

publishButton.addEventListener('click', function() {
    let userInput = {
        text: textAreaEl.value.trim(),
        from: fromInput.value.trim(),
        to: toInput.value.trim()
    }
    push(endorsementsInDB, userInput)
    clearAllInputs()
})

function clearAllInputs() {
    textAreaEl.value = ""
    fromInput.value = ""
    toInput.value = ""
}