console.log("init js file")

async function buscarCliente(event) {
    event.preventDefault();

    const userId = document.getElementById("userId").value;

    if (!userId) {
        alert("Por favor, insira um ID");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3333/clients/${userId}`);
        
        if (!response.ok) {
            alert("Cliente não existente");
            throw new Error("Cliente não encontrado");
        }
        
        const data = await response.json();
        
        console.log(data);
        
        const { id, name, clientSince, appointmentHistory, loyaltyCard } = data;

        document.getElementById("member-id").textContent = id;
        document.getElementById("member-name").textContent = name;
        document.getElementById("member-since").textContent = clientSince;

        document.getElementById("no-items").className = "hidden";

        const historyItems = document.getElementById("history-items");

        console.log(historyItems);

        historyItems.innerHTML = appointmentHistory.map(item => `
            <li class="history-item-content">
                <div>
                    <span class="title-sm">${item.date}</span>
                    <p class="subtitle-sm">${item.time}</p>
                </div>

                <div>
                    <img class="icon" src="assets/Icon.svg" alt="">
                </div>
            </li>
        `).join('');
        
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
    }
}

document.querySelector('form').addEventListener('submit', buscarCliente);
