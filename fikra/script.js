// Limiter le nombre de ressources à 10
function limitResourceCount() {
    const resourceInput = document.getElementById('resource-count');
    if (resourceInput.value > 10) {
        resourceInput.value = 10;
    }
}

// Générer les inputs pour chaque ressource selon le nombre de ressources sélectionné
function generateResourceInputs() {
    const resourceCount = document.getElementById('resource-count').value;
    const resourcesDiv = document.getElementById('resources-inputs');
    resourcesDiv.innerHTML = '';  // Clear existing inputs

    for (let i = 0; i < resourceCount; i++) {
        const resourceInput = document.createElement('div');
        resourceInput.className = 'resource-box';
        resourceInput.innerHTML = `
            <h3>Ressource ${i + 1}</h3> 
            <label>Quantité Nécessaire de la ressource:</label>
            
            <input type="number" class="lot-price" value="0" min="0">
            <label>Quantité du Lot :</label>
            <select class="lot-quantity">
                <option value="1">1</option>
                <option value="10">10</option>
                <option value="100">100</option>
            </select>
            <label>Prix du Lot:</label>
           <input type="number" class="needed-quantity" value="0" min="0">
            
        `;
        resourcesDiv.appendChild(resourceInput);
    }
}

// Calculer le prix du craft, le bénéfice et le ratio
function calculateProfit() {
    const lotPrices = document.querySelectorAll('.lot-price');
    const lotQuantities = document.querySelectorAll('.lot-quantity');
    const neededQuantities = document.querySelectorAll('.needed-quantity');

    let totalCraftCost = 0;

    // Calculer le prix total du craft
    for (let i = 0; i < lotPrices.length; i++) {
        const pricePerLot = parseFloat(lotPrices[i].value);
        const lotQuantity = parseFloat(lotQuantities[i].value);
        const neededQuantity = parseFloat(neededQuantities[i].value);
        const resourceCost = (neededQuantity / lotQuantity) * pricePerLot;
        totalCraftCost += resourceCost;
    }

    // Afficher le prix total du craft
    document.getElementById('total-craft-cost').textContent = `Prix du Craft: ${totalCraftCost.toFixed(2)} Kamas`;

    // Récupérer le prix de vente
    const sellingPrice = parseFloat(document.getElementById('selling-price').value);

    // Calculer et afficher le bénéfice
    const profit = sellingPrice - totalCraftCost;
    document.getElementById('profit').textContent = `Bénéfice: ${profit.toFixed(2)} Kamas`;

    // Calculer et afficher le ratio
    const ratio = sellingPrice / totalCraftCost;
    document.getElementById('ratio').textContent = `Ratio (Prix Vente / Prix Craft): ${ratio.toFixed(2)}`;
}
