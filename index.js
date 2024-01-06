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
    if (userInput.text !== "" && userInput.from !== "" && userInput.to !== "") {
        push(endorsementsInDB, userInput)
        clearAllInputs()
    } else {
        alert("Veuillez compléter toutes les entrées")
    }
})

onValue(endorsementsInDB, function(snapshot) {
    let endorsementsArray = snapshot.val() ? 
    Object.entries(snapshot.val()) : 
    [{key: "noItems", value: "No endorsements... yet" }]

    endorsementsArray.reverse()

    clearEndorsementsUl()

    for(let i = 0; i < endorsementsArray.length; i++) {
        let currentEndorsement = endorsementsArray[i]

        if (currentEndorsement.key !== "noItems") {
            let currentEndorsementID = endorsementsArray[i][0]
            let currentEndorsementValue = endorsementsArray[i][1]
            appendEndorsementLiToEndorsementsUl(currentEndorsementValue, currentEndorsementID)
        } else {
            endorsementsUL.innerHTML = `<i style="color: #8F8F8F;">${currentEndorsement.value}</i>`
        }
    }
})

function appendEndorsementLiToEndorsementsUl(endorsementValue, endorsementID) {
    let newEndorsementLi = document.createElement("li")

    let toDiv = document.createElement("div")
    toDiv.textContent = "To " + endorsementValue.to
    toDiv.style.fontSize = "14px"
    toDiv.style.fontWeight = "bold"
    toDiv.style.margin = "8px 0"
    newEndorsementLi.append(toDiv)

    let textDiv = document.createElement("div")
    textDiv.textContent = endorsementValue.text
    newEndorsementLi.append(textDiv)

    let fromDiv = document.createElement("div")
    fromDiv.textContent = "From " + endorsementValue.from
    fromDiv.style.fontSize = "14px"
    fromDiv.style.fontWeight = "bold"
    fromDiv.style.margin = "8px 0"
    newEndorsementLi.append(fromDiv)

    endorsementsUL.append(newEndorsementLi)

    newEndorsementLi.addEventListener('dblclick', function() {
        let endorsementExactLocationInDB = ref(database, `endorsements/${endorsementID}`)
        remove(endorsementExactLocationInDB)
    })
}

function clearEndorsementsUl() {
    endorsementsUL.innerHTML = ""
}

function clearAllInputs() {
    textAreaEl.value = ""
    fromInput.value = ""
    toInput.value = ""
}