// script.js - interativo e completo com recursos consumíveis por classe

const conjuradores = ["Bardo", "Bruxo", "Clérigo", "Druida", "Feiticeiro", "Mago"];
const meioConjuradores = ["Artífice", "Paladino", "Patrulheiro"];

const dados = {};

const classes = [
  "Artífice", "Bárbaro", "Bardo", "Bruxo", "Clérigo", "Druida",
  "Feiticeiro", "Guerreiro", "Ladino", "Mago", "Monge", "Paladino", "Patrulheiro"
];

classes.forEach(classe => {
  dados[classe] = {};
  for (let nivel = 1; nivel <= 20; nivel++) {
    const prof = 2 + Math.floor((nivel - 1) / 4);
    const conjurador = conjuradores.includes(classe);
    const meioConjurador = meioConjuradores.includes(classe);

    const espacos = {};
    if (conjurador || meioConjurador) {
      for (let i = 1; i <= 9; i++) {
        const valor = Math.max(0, Math.floor((nivel - i + 1) / 2));
        if (valor > 0) espacos[`Nível ${i}`] = valor;
      }
    }

    const info = {
      "Tipo de Conjuração": conjurador ? "Completa" : meioConjurador ? "Parcial" : "Não Conjurador",
      "Bônus de Proficiência": prof,
      "Mod. de Ataque Mágico": conjurador || meioConjurador ? "Prof + Mod" : "-",
      "CD de Magia": conjurador || meioConjurador ? "8 + Prof + Mod" : "-",
      "Truques Conhecidos": conjurador ? Math.min(6, 2 + Math.floor(nivel / 4)) : 0,
      "Magias Conhecidas/Preparadas": conjurador ? nivel + 2 : meioConjurador ? "Mod + Nível" : 0,
      "Espaços de Magia": espacos
    };

    // Recursos únicos
    if (classe === "Bárbaro") info["Usos de Fúria"] = nivel >= 20 ? "Ilimitado" : Math.min(6, Math.ceil(nivel / 2));
    if (classe === "Monge") info["Pontos de Ki"] = nivel;
    if (classe === "Guerreiro") info["Surto de Ação"] = nivel >= 17 ? 3 : nivel >= 10 ? 2 : 1;
    if (classe === "Paladino") info["Imposição das Mãos"] = nivel * 5;
    if (classe === "Bruxo") {
      info["Espaços de Magia de Bruxo"] = Math.ceil(nivel / 2);
      info["Invocações Místicas"] = nivel >= 18 ? 8 : nivel >= 12 ? 6 : nivel >= 5 ? 4 : 2;
    }
    if (classe === "Bardo") info["Inspiração Bárdica"] = prof;
    if (classe === "Clérigo") info["Canalizar Divindade"] = nivel >= 6 ? 2 : 1;
    if (classe === "Feiticeiro") info["Pontos de Feitiçaria"] = nivel;
    if (classe === "Patrulheiro") info["Conjuração Parcial"] = "Sim";
    if (classe === "Artífice") info["Infusões Ativas"] = Math.floor(nivel / 2);

    dados[classe][nivel] = info;
  }
});

// Atualiza a tela com base nas seleções
const classeSelect = document.getElementById("classe");
const nivelSelect = document.getElementById("nivel");
const output = document.getElementById("output");

classeSelect.addEventListener("change", atualizar);
nivelSelect.addEventListener("change", atualizar);

function atualizar() {
  const classe = classeSelect.value;
  const nivel = nivelSelect.value;

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