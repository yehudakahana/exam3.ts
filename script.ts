const BASE_URL :string = "https://nbaserver-q21u.onrender.com/api/filter/";

const display = document.getElementById("section-display") as HTMLElement;
const form = document.getElementById("section-form") as HTMLElement;
const table = document.getElementById("scooters-table") as HTMLElement;
 let listOfPlayers :players[];

 
interface players {
    position: string;
    twoPercent: number;
    threePercent: number;
    points: number;
    playerName?: string;

}


//תצוגת המספר הנבחר באינפוטים
document.getElementById("points")!.addEventListener("input", (event) => {
    const value = (event.target as HTMLInputElement).value;
    (document.getElementById("labelPoints") as HTMLInputElement).textContent = value ;
})

document.getElementById("twoPercent")!.addEventListener("input", (event) => {
    const value = (event.target as HTMLInputElement).value;
    (document.getElementById("labelTwo") as HTMLInputElement).textContent = `${value}% `;
});

document.getElementById("threePercent")!.addEventListener("input", (event) => {
    const value = (event.target as HTMLInputElement).value;
    (document.getElementById("labelThree") as HTMLInputElement).textContent = `${value}% `;

});

 
 //כפתור החיפוש
 form.addEventListener("submit", async(event) => {
    event.preventDefault();
    const newSearch = {
        position: (document.getElementById("position") as HTMLInputElement).value,
        points: Number((document.getElementById("points") as HTMLInputElement).value,),
        twoPercent: Number((document.getElementById("twoPercent") as HTMLInputElement).value),
        threePercent: Number((document.getElementById("threePercent") as HTMLInputElement).value)
    }
    listOfPlayers = await searchPlayers(newSearch);
    displayTable(listOfPlayers);
})


//תצוגה לטבלה
async function displayTable(listOfPlayers:players[]): Promise<void> {
        const tbody = document.getElementById('tbody') as HTMLTableElement;
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
    }
    


//השמה של שחקן  בקבוצה בפוזיציה המתאימה לו
function addPlayer(index: number) {
    let newPlayer : players = listOfPlayers[index];
    let position : string = newPlayer.position;
    let relevantDiv = document.getElementById(position);
    if(relevantDiv == null){
        return
    }

    else{
    relevantDiv.innerHTML = `
    <p> ${newPlayer.position} </p>
    <p> ${newPlayer.playerName} </p>
    <p>threePercent: ${newPlayer.threePercent}%</p> 
    <p>twoPercent: ${newPlayer.twoPercent}% </p>
    <p>points: ${newPlayer.points} </p>

    `
    }
}





//post methode
async function searchPlayers  (newSearch : players): Promise<players[]>{
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSearch)
    })
    const rez : players[] = await response.json();
    return rez;

}


