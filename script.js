const div = document.getElementById('container')
const joinBtn = document.getElementById('joinBtn')
const nameInput = document.getElementById('name')

async function getData() {
    const response = await fetch("https://tinkr.tech/sdb/Daniel_Antiyoy/Antiyoy_database")
    const data = await response.json()
    return data
}

async function renderMap(div) {
    const data = await getData()
    const map = data.map
    for(const hex of map) {
        if(hex.type === "land") {
            const image = document.createElement('img')
            image.classList.add("hex")
            image.style.top = hex.y + "px"
            image.style.left = hex.x + "px"
            image.style.width = hex.width + "px"
            image.style.height = hex.height + "px"
            image.src = "images/hex_neutral.svg"
            div.appendChild(image)
            if(hex.building !== null) {
                const building_img = document.createElement("img")
                building_img.classList.add("building")
                if(hex.building === "tree") {
                    building_img.src = "images/tree.svg"
                    building_img.style.top = hex.y + "px"
                    building_img.style.left = hex.x + "px"
                    building_img.style.width = hex.width + "px"
                    building_img.style.height = hex.height + "px"
                }
                div.appendChild(building_img)
            }
        }
    }
}

setInterval(async function() {
    const tempDiv = document.createElement("div");
    await renderMap(tempDiv);
    div.replaceChildren(...tempDiv.childNodes);
}, 2000);

async function log() {
    const data = await getData()
    console.log(data)    
}
log()

async function post() {
    const resp = await fetch("https://tinkr.tech/sdb/Daniel_Antiyoy/Antiyoy_database")
    const data = await resp.json()

    const username = nameInput.value

    const response = await fetch("https://tinkr.tech/sdb/Daniel_Antiyoy/Antiyoy_database", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: "join",
            username: username 
        })
    });
    console.log(await response.text())
}

joinBtn.addEventListener('click', async function() {
    await post()
})