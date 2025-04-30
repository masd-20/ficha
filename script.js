const CLASSES_INFO = {
    'barbaro': {
        conjurador: false,
        habilidades: [{ nome: 'Fúria', descricao: 'Entra em fúria em combate...', recurso: 'furia', maxBasePorNivel: [0, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6] }],
        consumiveis: []
    },
    'bardo': {
        conjurador: true,
        atributoConjuração: 'carisma',
        habilidades: [{ nome: 'Inspiração Bardica', descricao: 'Pode inspirar outros...' }],
        magiasPorCirculo: { 1: 2, 2: 0 },
        consumiveis: []
    },
    'clerigo': {
        conjurador: true,
        atributoConjuração: 'sabedoria',
        habilidades: [{ nome: 'Canalizar Divindade', descricao: 'Invoca o poder divino...', recurso: 'canalizarDivindade', maxBasePorNivel: [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3] }],
        magiasPorCirculo: { 1: 2, 2: 0 },
        consumiveis: []
    },
    'druida': {
        conjurador: true,
        atributoConjuração: 'sabedoria',
        habilidades: [{ nome: 'Forma Selvagem', descricao: 'Transforma-se em animais...' }],
        magiasPorCirculo: { 1: 2, 2: 0 },
        consumiveis: []
    },
    'guerreiro': {
        conjurador: false,
        habilidades: [
            { nome: 'Surto de Ação', descricao: 'Realiza uma ação extra...', recurso: 'surtoAcao', maxBasePorNivel: [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3] },
            { nome: 'Segundo Fôlego', descricao: 'Recupera pontos de vida...', recurso: 'segundoFolego', maxBasePorNivel: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] }
        ],
        consumiveis: []
    },
    'monge': {
        conjurador: false,
        habilidades: [
            { nome: 'Ki', descricao: 'Energia espiritual para habilidades...', recurso: 'ki', maxBasePorNivel: [0, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
        ],
        consumiveis: []
    },
    'paladino': {
        conjurador: true,
        atributoConjuração: 'carisma',
        habilidades: [{ nome: 'Imposição de Mãos', descricao: 'Cura com toque divino...', recurso: 'canalizarDivindadePaladino', maxBasePorNivel: [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3] }],
        magiasPorCirculo: { 1: 2, 2: 0 },
        consumiveis: []
    },
    'patrulheiro': {
        conjurador: true,
        atributoConjuração: 'sabedoria',
        habilidades: [{ nome: 'Companheiro Animal', descricao: 'Um fiel aliado animal...' }],
        magiasPorCirculo: { 1: 2, 2: 0 },
        consumiveis: []
    },
    'ladino': {
        conjurador: false,
        habilidades: [{ nome: 'Pontos de Astúcia', descricao: 'Usados para habilidades ladinas...', recurso: 'pontosAstucia', maxBasePorNivel: [0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11] }],
        consumiveis: []
    },
    'feiticeiro': {
        conjurador: true,
        atributoConjuração: 'carisma',
        habilidades: [{ nome: 'Pontos de Feitiçaria', descricao: 'Usados para metamagias...', recurso: 'pontosFeiticaria', maxBasePorNivel: [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11] }],
        magiasPorCirculo: { 1: 2, 2: 0 },
        consumiveis: []
    },
    'mago': {
        conjurador: true,
        atributoConjuração: 'inteligencia',
        habilidades: [{ nome: 'Recuperação Arcana', descricao: 'Recupera espaços de magia em descanso curto...' }],
        magiasPorCirculo: { 1: 2, 2: 0 },
        consumiveis: []
    }
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
        if (modificadorSpan) {
            modificadorSpan.textContent = `(<span class="math-inline">\{modificador \>\= 0 ? '\+' \: ''\}</span>{modificador})`;
        }
    });
    atualizarPericias();
    atualizarInfoClasse(); // Garante que as informações da classe sejam atualizadas
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
        if (valorPericiaSpan) {
            valorPericiaSpan.textContent = `<span class="math-inline">\{valorTotal \>\= 0 ? '\+' \: ''\}</span>{valorTotal}`;
        }
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
    const atributoConjuração = infoClasse ? infoClasse.atributoConjuração : null;

    if (atributoConjuração) {
        const valorAtributo = parseInt(document.getElementById(atributoConjuração).value) || 10;
        const modificadorAtributo = calcularModificador(valorAtributo);
        const bonusProf = getBonusProficiencia();
        const bonusUsuario = parseInt(document.getElementById('bonus-cd').value) || 0;
        const cdBase = 8 + modificadorAtributo + bonusProf + bonusUsuario; // Correção: bônus do usuário deve ser somado
        document.getElementById('cd-magia-base').textContent = 8 + modificadorAtributo + bonusProf;
        document.getElementById('cd-magia-total').textContent = cdBase;
    } else {
        document.getElementById('cd-magia-base').textContent = '';
        document.getElementById('cd-magia-total').textContent = '';
    }
}

function atualizarModAtaqueMagia() {
    const classeSelecionada = document.getElementById('classe').value;
    const infoClasse = CLASSES_INFO[classeSelecionada];
    const atributoConjuração = infoClasse ? infoClasse.atributoConjuração : null;

    if (atributoConjuração) {
        const valorAtributo = parseInt(document.getElementById(atributoConjuração).value) || 10;
        const modificadorAtributo = calcularModificador(valorAtributo);
        const bonusProf = getBonusProficiencia();
        const bonusUsuario = parseInt(document.getElementById('bonus-ataque-magia').value) || 0;
        const ataqueBase = modificadorAtributo + bonusProf + bonusUsuario; // Correção: bônus do usuário deve ser somado
        document.getElementById('mod-ataque-magia-base').textContent = `<span class="math-inline">\{modificadorAtributo \+ bonusProf \>\= 0 ? '\+' \: ''\}</span>{modificadorAtributo + bonusProf}`;
        document.getElementById('mod-ataque-magia-total').textContent = `<span class="math-inline">\{ataqueBase \>\= 0 ? '\+' \: ''\}</span>{ataqueBase}`;
    } else {
        document.getElementById('mod-ataque-magia-base').textContent = '';
        document.getElementById('mod-ataque-magia-total').textContent = '';
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
            divCirculo.innerHTML = `<strong>Círculo <span class="math-inline">\{circulo\}\:</strong\> <input type\="number" value\="</span>{quantidade}" size="2"> espaços`;
            magiasPorCirculoDiv.appendChild(divCirculo);
        }
    } else {
        magiasPorCirculoDiv.innerHTML = '';
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
                divConsumivel.innerHTML = `<label><span class="math-inline">\{consumivel\.nome\}\:</label\> <input type\="number" value\="</span>{consumivel.quantidade || 0}" size="2">`;
                consumiveisDiv.appendChild(divConsumivel);
            });
        }
    } else {
        // Exibe as habilidades com recurso como consumíveis
        if (infoClasse && infoClasse.habilidades) {
            infoClasse.habilidades.forEach(habilidade => {
                if (habilidade.recurso) {
                    const divConsumivel = document.createElement('div');
                    divConsumivel.classList.add('recurso-item');
                    const maxBase = habilidade.maxBasePorNivel[nivelPersonagem] || 0;
                    divConsumivel.innerHTML = `<label>${habilidade.nome}:</label>
                                               <div class="recurso-controls