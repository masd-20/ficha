const CLASSES_INFO = {
    'barbaro': { conjurador: false, habilidades: [{ nome: 'Fúria', descricao: 'Entra em fúria em combate...', recursos: { furia: { maxBasePorNivel: [0, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6] } } } ], consumiveis: [] },
    'bardo': { conjurador: true, atributoConjuração: 'carisma', habilidades: [{ nome: 'Inspiração Bardica', descricao: 'Pode inspirar outros...' }], magiasPorCirculo: { 1: 2, 2: 0 }, consumiveis: [] },
    'clerigo': { conjurador: true, atributoConjuração: 'sabedoria', habilidades: [{ nome: 'Canalizar Divindade', descricao: 'Invoca o poder divino...', recursos: { canalizarDivindade: { maxBasePorNivel: [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3] } } }], magiasPorCirculo: { 1: 2, 2: 0 }, consumiveis: [] },
    'druida': { conjurador: true, atributoConjuração: 'sabedoria', habilidades: [{ nome: 'Forma Selvagem', descricao: 'Transforma-se em animais...' }], magiasPorCirculo: { 1: 2, 2: 0 }, consumiveis: [] },
    'guerreiro': { conjurador: false, habilidades: [{ nome: 'Surto de Ação', descricao: 'Realiza uma ação extra...', recursos: { surtoAcao: { maxBasePorNivel: [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3] } } }, { nome: 'Segundo Fôlego', descricao: 'Recupera pontos de vida...' }], consumiveis: [] },
    'monge': { conjurador: false, habilidades: [{ nome: 'Artes Marciais', descricao: 'Golpes desarmados aprimorados...', recursos: { ki: { maxBasePorNivel: [0, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] } } }, { nome: 'Ki', descricao: 'Energia espiritual para habilidades...' }], consumiveis: [] },
    'paladino': { conjurador: true, atributoConjuração: 'carisma', habilidades: [{ nome: 'Imposição de Mãos', descricao: 'Cura com toque divino...', recursos: { canalizarDivindadePaladino: { maxBasePorNivel: [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3] } } }, { nome: 'Golpe Divino', descricao: 'Adiciona dano radiante...' }], magiasPorCirculo: { 1: 2, 2: 0 }, consumiveis: [] },
    'patrulheiro': { conjurador: true, atributoConjuração: 'sabedoria', habilidades: [{ nome: 'Inimigo Favorecido', descricao: 'Bônus contra certos tipos de criaturas...' }, { nome: 'Explorador Nato', descricao: 'Habilidade em terrenos selvagens...' }], magiasPorCirculo: { 1: 2, 2: 0 }, consumiveis: [] },
    'ladino': { conjurador: false, habilidades: [{ nome: 'Ataque Furtivo', descricao: 'Dano extra em ataques sorrateiros...', recursos: { pontosAstucia: { maxBasePorNivel: [0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11] } } }, { nome: 'Ação Bônus Astuta', descricao: 'Ações bônus adicionais...' }], consumiveis: [] },
    'feiticeiro': { conjurador: true, atributoConjuração: 'carisma', habilidades: [{ nome: 'Metamagias', descricao: 'Modifica seus truques e magias...' }, { nome: 'Fonte de Magia', descricao: 'Pontos de feitiçaria...' }], magiasPorCirculo: { 1: 2, 2: 0 }, consumiveis: [] },
    'mago': { conjurador: true, atributoConjuração: 'inteligencia', habilidades: [{ nome: 'Recuperação Arcana', descricao: 'Recupera espaços de magia em descanso curto...' }], magiasPorCirculo: { 1: 2, 2: 0 }, consumiveis: [] }
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

function atualizarCA() {
    const caBase = parseInt(document.getElementById('ca-base').value) || 10;
    const bonusCA = parseInt(document.getElementById('bonus-ca').value) || 0;
    document.getElementById('ca-total').textContent = caBase + bonusCA;
}

function validarHP() {
    const hpAtualInput = document.getElementById('hp-atual');
    const hpMax = parseInt(document.getElementById('hp-max').value) || 1;
    let hpAtual = parseInt(hpAtualInput.value) || 0;

    if (hpAtual > hpMax) {
        hpAtualInput.value = hpMax;
    } else if (hpAtual < 0) {
        hpAtualInput.value = 0;
    }
}

function alterarHP(delta) {
    const hpAtualInput = document.getElementById('hp-atual');
    const hpMax = parseInt(document.getElementById('hp-max').value) || 1;
    let hpAtual = parseInt(hpAtualInput.value) || 0;
    hpAtual += delta;

    if (hpAtual > hpMax) {
        hpAtualInput.value = hpMax;
    } else if (hpAtual < 0) {
        hpAtualInput.value = 0;
    } else {
        hpAtualInput.value = hpAtual;
    }
}

function atualizarCDMagia() {
    const classeSelecionada = document.getElementById('classe').value;
    const infoClasse = CLASSES_INFO[classeSelecionada];
    const cdMagiaBaseSpan = document.getElementById('cd-magia-base');
    const atributoConjuração = infoClasse ? infoClasse.atributoConjuração : null;

    if (atributoConjuração) {
        const modificadorAtributo = calcularModificador(parseInt(document.getElementById(atributoConjuração).value));
        const bonusProf = getBonusProficiencia();
        cdMagiaBaseSpan.textContent = 8 + bonusProf + modificadorAtributo;
    } else {
        cdMagiaBaseSpan.textContent = '';
    }
}

function atualizarModAtaqueMagia() {
    const classeSelecionada = document.getElementById('classe').value;
    const infoClasse = CLASSES_INFO[classeSelecionada];
    const modAtaqueMagiaBaseSpan = document.getElementById('mod-ataque-magia-base');
    const atributoConjuração = infoClasse ? infoClasse.atributoConjuração : null;
    const bonusAtaqueMagia = parseInt(document.getElementById('bonus-ataque-magia').value) || 0;

    if (atributoConjuração) {
        const modificadorAtributo = calcularModificador(parseInt(document.getElementById(atributoConjuração).value));
        const bonusProf = getBonusProficiencia();
        modAtaqueMagiaBaseSpan.textContent = `${modificadorAtributo + bonusProf >= 0 ? '+' : ''}${modificadorAtributo + bonusProf + bonusAtaqueMagia}`;
    } else {
        modAtaqueMagiaBaseSpan.textContent = '';
    }
}

function exibirMagiasPorCirculo() {
    const classeSelecionada = document.getElementById('classe').value;
    const infoClasse = CLASSES_INFO[classeSelecionada];
    const magiasPorCirculoDiv = document.getElementById('magias-por-circulo');
    magiasPorCirculoDiv.innerHTML = '<h3>Magias por Círculo</h3>'; // Limpa o conteúdo anterior

    if (infoClasse && infoClasse.magiasPorCirculo) {
        for (const circulo in infoClasse.magiasPorCirculo) {
            const quantidade = infoClasse.magiasPorCirculo[circulo];
            const divCirculo = document.createElement('div');
            divCirculo.innerHTML = `<strong>Círculo ${circulo}:</strong> <input type="number" value="${quantidade}" size="2"> espaços`;
            magiasPorCirculoDiv.appendChild(divCirculo);
        }
    }
}

function exibirConsumiveis() {
    const classeSelecionada = document.getElementById('classe').value;
    const infoClasse = CLASSES_INFO[classeSelecionada];
    const consumiveisDiv = document.getElementById('consumiveis');
    consumiveisDiv.innerHTML = '<h3>Consumíveis</h3>'; // Limpa o conteúdo anterior

    if (infoClasse && infoClasse.consumiveis) {
        if (infoClasse.consumiveis.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'Nenhum consumível definido para esta classe.';
            consumiveisDiv.appendChild(p);
        } else {
            infoClasse.consumiveis.forEach(consumivel => {
                const divConsumivel = document.createElement('div');
                divConsumivel.innerHTML = `<label>${consumivel.nome}:</label> <input type="number" value="${consumivel.quantidade || 0}" size="2">`;
                consumiveisDiv.appendChild(divConsumivel);
            });
        }
    } else {
        const p = document.createElement('p');
        p.textContent = 'Nenhum consumível definido para esta classe.';
        consumiveisDiv.appendChild(p);
    }
}

function atualizarInfoClasse() {
    const classeSelecionada = document.getElementById('classe').value;
    const infoClasse = CLASSES_INFO[classeSelecionada];
    const habilidadesDiv = document.getElementById('habilidades');
    const magiasDiv = document.getElementById('magias');
    const infoConjuradorDiv = document.getElementById('info-conjurador');
    const atributoConjuraçãoSpan = document.getElementById('atributo-conjuração');

    habilidadesDiv.innerHTML = '';
    magiasDiv.style.display = 'none';

    if (infoClasse) {
        if (infoClasse.habilidades && infoClasse.habilidades.length > 0) {
            const h3 = document.createElement('h3');
            h3.textContent = 'Habilidades de Classe';
            habilidadesDiv.appendChild(h3);
            infoClasse.habilidades.forEach(habilidade => {
                const p = document.createElement('p');
                let textoHabilidade = `${habilidade.nome}: ${habilidade.descricao}`;
                if (habilidade.recursos) {
                    for (const recursoNome in habilidade.recursos) {
                        const recurso = habilidade.recursos[recursoNome];
                        const maxBase = recurso.maxBasePorNivel[nivelPersonagem] || 0;
                        textoHabilidade += ` (Máximo de ${recursoNome}: <span id="${recursoNome}-max">${maxBase}</span>)`;
                        // Para controlar o uso, precisaríamos adicionar inputs e botões aqui
                    }
                }
                p.innerHTML = textoHabilidade;
                habilidadesDiv.appendChild(p);
            });
        }

        if (infoClasse.conjurador) {
            magiasDiv.style.display = 'block';
            atributoConjuraçãoSpan.textContent = infoClasse.atributoConjuração.charAt(0).toUpperCase() + infoClasse.atributoConjuração.slice(1);
            atualizarCDMagia();
            atualizarModAtaqueMagia();
            exibirMagiasPorCirculo();
        } else {
            magiasDiv.style.display = 'none';
        }
        exibirConsumiveis();
    }
}

function atualizarFicha() {
    nivelPersonagem = parseInt(document.getElementById('nivel').value);
    atualizarModificadores();
    atualizarInfoClasse();
    atualizarCDMagia();
    atualizarModAtaqueMagia();
}

document.addEventListener('DOMContentLoaded', () => {
    const classeSelect = document.getElementById('classe');
    for (const classe in CLASSES_INFO) {
        const option = document.createElement('option');
        option.value = classe;
        option.textContent = classe.charAt(0).toUpperCase() + classe.slice(1);
        classeSelect.appendChild(option);
    }
    atualizarFicha();
    atualizarCA(); // Garante que a CA seja calculada no carregamento
});