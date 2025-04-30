document.getElementById("class").addEventListener("change", function () {
    const classe = this.value;
    const container = document.getElementById("class-resources");
    container.innerHTML = "";

    const recursosPorClasse = {
        "Artífice": ["Infusões Preparadas", "Espaços de Magia"],
        "Bárbaro": ["Usos de Fúria"],
        "Bardo": ["Espaços de Magia", "Inspirações Bárdicas"],
        "Bruxo": ["Espaços de Magia de Bruxo", "Invocações"],
        "Clérigo": ["Espaços de Magia", "Canalizar Divindade"],
        "Druida": ["Espaços de Magia", "Transformação Selvagem"],
        "Feiticeiro": ["Espaços de Magia", "Pontos de Feitiçaria"],
        "Guerreiro": ["Surto de Ação", "Manobras (se aplicável)"],
        "Ladino": ["Truques (se Arcano)", "Recursos Especiais"],
        "Mago": ["Espaços de Magia", "Arcano Recuperado"],
        "Monge": ["Pontos de Ki"],
        "Paladino": ["Espaços de Magia", "Imposição das Mãos"],
        "Patrulheiro": ["Espaços de Magia", "Truques (se aplicável)"]
    };

    const recursos = recursosPorClasse[classe] || [];

    recursos.forEach(recurso => {
        const label = document.createElement("label");
        label.textContent = recurso + ":";
        const input = document.createElement("input");
        input.type = "number";
        input.min = 0;
        input.placeholder = recurso;
        container.appendChild(label);
        container.appendChild(input);
    });
});
