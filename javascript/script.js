"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter/";
const display = document.getElementById("section-display");
const form = document.getElementById("section-form");
const table = document.getElementById("scooters-table");
let listOfPlayers;
//תצוגת המספר הנבחר באינפוטים
document.getElementById("points").addEventListener("input", (event) => {
    const value = event.target.value;
    document.getElementById("labelPoints").textContent = value;
});
document.getElementById("twoPercent").addEventListener("input", (event) => {
    const value = event.target.value;
    document.getElementById("labelTwo").textContent = value;
});
document.getElementById("threePercent").addEventListener("input", (event) => {
    const value = event.target.value;
    document.getElementById("labelThree").textContent = value;
});
//כפתור החיפוש
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const newSearch = {
        position: document.getElementById("position").value,
        points: Number(document.getElementById("points").value),
        twoPercent: Number(document.getElementById("twoPercent").value),
        threePercent: Number(document.getElementById("threePercent").value)
    };
    listOfPlayers = yield searchPlayers(newSearch);
    displayTable(listOfPlayers);
}));
//תצוגה לטבלה
function displayTable(listOfPlayers) {
    return __awaiter(this, void 0, void 0, function* () {
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
        listOfPlayers.forEach((player, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${player.playerName}</td>
                <td>${player.position}</td>
                <td>${player.points}</td>
                <td>${player.twoPercent}</td>
                <td>${player.threePercent}</td>

                <td class="actions">
                    <button onclick="addPlayer(${index})">add ${player.playerName} to Current Team</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    });
}
function addPlayer(index) {
    let newPlayer = listOfPlayers[index];
    let position = newPlayer.position;
    let relevantDiv = document.getElementById(position);
    if (relevantDiv == null) {
        alert("no player in this position");
    }
    else {
        relevantDiv.innerHTML = `
    <p> ${newPlayer.playerName} </p>
    <p> ${newPlayer.position} </p>
    <p> ${newPlayer.points} </p>
    <p> ${newPlayer.twoPercent} </p>
    <p> ${newPlayer.threePercent} </p> 
    `;
    }
}
//post methode
function searchPlayers(newSearch) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSearch)
        });
        const rez = yield response.json();
        return rez;
    });
}
