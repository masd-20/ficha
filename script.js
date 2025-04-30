const CLASSES_INFO = {
    'barbaro': { conjurador: false, habilidades: [{ nome: 'Fúria', descricao: 'Entra em fúria em combate...' }] },
    'bardo': { conjurador: true, atributoConjuração: 'carisma', habilidades: [{ nome: 'Inspiração Bardica', descricao: 'Pode inspirar outros...' }] },
    'clerigo': { conjurador: true, atributoConjuração: 'sabedoria', habilidades: [{ nome: 'Canalizar Divindade', descricao: 'Invoca o poder divino...' }] },
    'druida': { conjurador: true, atributoConjuração: 'sabedoria', habilidades: [{ nome: 'Forma Selvagem', descricao: 'Transforma-se em animais...' }] },
    'guerreiro': { conjurador: false, habilidades: [{ nome: 'Surto de Ação', descricao: 'Realiza uma ação extra...' }, { nome: 'Segundo Fôlego', descricao: 'Recupera pontos de vida...' }] },
    'monge': { conjurador: false, habilidades: [{ nome: 'Artes Marciais', descricao: 'Golpes desarmados aprimorados...' }, { nome: 'Ki', descricao: 'Energia espiritual para habilidades...' }] },
    'paladino': { conjurador: true, atributoConjuração: 'carisma', habilidades: [{ nome: 'Imposição de Mãos', descricao: 'Cura com toque divino...' }, { nome: 'Golpe Divino', descricao: 'Adiciona dano radiante...' }] },
    'patrulheiro': { conjurador: true, atributoConjuração: 'sabedoria', habilidades: [{ nome: 'Inimigo Favorecido', descricao: 'Bônus contra certos tipos de criaturas...' }, { nome: 'Explorador Nato', descricao: 'Habilidade em terrenos selvagens...' }] },
    'ladino': { conjurador: false, habilidades: [{ nome: 'Ataque Furtivo', descricao: 'Dano extra em ataques sorrateiros...' }, { nome: 'Ação Bônus Astuta', descricao: 'Ações bônus adicionais...' }] },
    'feiticeiro': { conjurador: true, atributoConjuração: 'carisma', habilidades: [{ nome: 'Metamagias', descricao: 'Modifica seus truques e magias...' }, { nome: 'Fonte de Magia', descricao: 'Pontos de feitiçaria...' }] },
    'mago': { conjurador: true, atributoConjuração: 'inteligencia', habilidades: [{ nome: 'Recuperação Arcana', descricao: 'Recupera espaços de magia em descanso curto...' }] }
};

const ATRIBUTOS = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
const PERICIAS_INFO = {
    'acrobacia': 'destreza', 'adestramento-animais': 'sabedoria', 'arcanismo': 'inteligencia', 'atletismo': 'forca',
    'atuacao': 'carisma', 'enganacao': 'carisma', 'furtividade': 'destreza', 'historia': 'inteligencia',
    'intimidacao': 'carisma', 'intuicao': 'sabedoria', 'investigacao': 'inteligencia', 'medicina': 'sabedoria',
    'natureza': 'inteligencia', 'percepcao': 'sabedoria', 'persuasao': 'carisma', 'prestidigitacao': 'destreza',
    'religiao': 'inteligencia', 'sobrevivencia': 'sabedoria', 'sigilo': 'destreza'
};

let nivelPersonagem = 1;

function calcularModificador(atributo) {
    return Math.floor((atributo - 10) / 2);
}

function getBonusProficiencia() {
    if (nivelPersonagem >= 1 && nivelPersonagem <= 4) return 2;
    if (nivelPersonagem >= 5 && nivelPersonagem <= 8) return 3;
    if (nivelPersonagem >= 9 && nivelPersonagem <= 12) return 4;
    if (nivelPersonagem >= 13 && nivelPersonagem <= 16) return 5;
    if (nivelPersonagem >= 17 && nivelPersonagem <= 20) return 6;
    return 0;
}

function atualizarModificadores() {
    ATRIBUTOS.forEach(atributo => {
        const valorAtributo = parseInt(document.getElementById(atributo).value);
        const modificador = calcularModificador(valorAtributo);
        const modificadorSpan = document.querySelector(`.modificador[data-atributo="${atributo}"]`);
        modificadorSpan.textContent = `(${modificador >= 0 ? '+' : ''}${modificador})`;
    });
    atualizarInfoClasse();
    atualizarPericias();
}

function atualizarPericias() {
    const bonusProf = getBonusProficiencia();
    for (const pericia in PERICIAS_INFO) {
        const atributoBase = PERICIAS_INFO[pericia];
        const valorAtributo = parseInt(document.getElementById(atributoBase).value);
        const modificadorAtributo = calcularModificador(valorAtributo);
        const proficiente = document.getElementById(`pericia-${pericia}`).checked;
        const valorTotal = modificadorAtributo + (proficiente ? bonusProf : 0);
        const valorPericiaSpan = document.querySelector(`.valor-pericia[data-pericia="${pericia}"]`);
        valorPericiaSpan.textContent = `${valorTotal >= 0 ? '+' : ''}${valorTotal}`;
    }
}

function atualizarInfoClasse() {
    const classeSelecionada = document.getElementById('classe').value;
    const infoClasse = CLASSES_INFO[classeSelecionada];
    const habilidadesDiv = document.getElementById('habilidades');
    const magiasDiv = document.getElementById('magias');
    const infoConjuradorDiv = document.getElementById('info-conjurador');
    const atributoConjuraçãoSpan = document.getElementById('atributo-conjuração');
    const cdMagiaSpan = document.getElementById('cd-magia');
    const modAtaqueMagiaSpan = document.getElementById('mod-ataque-magia');

    habilidadesDiv.innerHTML = '';
    magiasDiv.style.display = 'none';

    if (infoClasse) {
        if (infoClasse.habilidades && infoClasse.habilidades.length > 0) {
            const h3 = document.createElement('h3');
            h3.textContent = 'Habilidades de Classe';
            habilidadesDiv.appendChild(h3);
            infoClasse.habilidades.forEach(habilidade => {
                const p = document.createElement('p');
                p.textContent = `${habilidade.nome}: ${habilidade.descricao}`;
                habilidadesDiv.appendChild(p);
            });
        }

        if (infoClasse.conjurador) {
            magiasDiv.style.display = 'block';
            atributoConjuraçãoSpan.textContent = infoClasse.atributoConjuração.charAt(0).toUpperCase() + infoClasse.atributoConjuração.slice(1);
            const atributoValor = parseInt(document.getElementById(infoClasse.atributoConjuração).value);
            const modificadorAtributo = calcularModificador(atributoValor);
            const bonusProf = getBonusProficiencia();
            cdMagiaSpan.textContent = 8 + bonusProf + modificadorAtributo;
            modAtaqueMagiaSpan.textContent = `${modificadorAtributo + bonusProf >= 0 ? '+' : ''}${modificadorAtributo + bonusProf}`;
        }
    }
}

function atualizarFicha() {
    nivelPersonagem = parseInt(document.getElementById('nivel').value);
    atualizarModificadores();
    atualizarInfoClasse();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const classeSelect = document.getElementById('classe');
    for (const classe in CLASSES_INFO) {
        const option = document.createElement('option');
        option.value = classe;
        option.textContent = classe.charAt(0).toUpperCase() + classe.slice(1);
        classeSelect.appendChild(option);
    }
    atualizarFicha();
});