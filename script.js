const dados = {
  "Bardo": {
    "1": {
      "Tipo de Conjuração": "Completa",
      "Bônus de Proficiência": 2,
      "Mod. de Ataque Mágico": "Prof + Car",
      "CD de Magia": "8 + Prof + Car",
      "Truques Conhecidos": 2,
      "Magias Conhecidas/Preparadas": 4,
      "Espaços de Magia": { "Nível 1": 2 }
    },
    "2": {
      "Tipo de Conjuração": "Completa",
      "Bônus de Proficiência": 2,
      "Mod. de Ataque Mágico": "Prof + Car",
      "CD de Magia": "8 + Prof + Car",
      "Truques Conhecidos": 2,
      "Magias Conhecidas/Preparadas": 5,
      "Espaços de Magia": { "Nível 1": 3 }
    }
  },
  "Clérigo": {
    "1": {
      "Tipo de Conjuração": "Completa",
      "Bônus de Proficiência": 2,
      "Mod. de Ataque Mágico": "Prof + Sab",
      "CD de Magia": "8 + Prof + Sab",
      "Truques Conhecidos": 3,
      "Magias Conhecidas/Preparadas": "Sab + Nível",
      "Espaços de Magia": { "Nível 1": 2 }
    }
  }
};

document.getElementById("classe").addEventListener("change", atualizar);
document.getElementById("nivel").addEventListener("change", atualizar);

function atualizar() {
  const classe = document.getElementById("classe").value;
  const nivel = document.getElementById("nivel").value;
  const output = document.getElementById("output");

  if (classe && nivel && dados[classe] && dados[classe][nivel]) {
    const info = dados[classe][nivel];
    let html = "<ul>";
    for (const chave in info) {
      if (typeof info[chave] === "object") {
        html += `<li><strong>${chave}:</strong><ul>`;
        for (const sub in info[chave]) {
          html += `<li>${sub}: ${info[chave][sub]}</li>`;
        }
        html += "</ul></li>";
      } else {
        html += `<li><strong>${chave}:</strong> ${info[chave]}</li>`;
      }
    }
    html += "</ul>";
    output.innerHTML = html;
  } else {
    output.innerHTML = "<p>Selecione uma classe e nível válidos.</p>";
  }
}
