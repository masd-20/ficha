// Dados sobre as classes e seus atributos chave de conjuração e recursos
const infoClasses = {
    'barbaro': { conjurador: false, recursos: { furia: { maxBasePorNivel: [0, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6], tipoRecuperacao: 'longo' } } },
    'bardo': { conjurador: true, atributoConjuração: 'carisma', recursos: {} }, // Inspiração Bardica pode ser mais complexa
    'clerigo': { conjurador: true, atributoConjuração: 'sabedoria', recursos: { canalizarDivindade: { maxBasePorNivel: [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3], tipoRecuperacao: 'curto' } } },
    'druida': { conjurador: true, atributoConjuração: 'sabedoria', recursos: {} }, // Forma Selvagem tem regras específicas
    'guerreiro': { conjurador: false, recursos: { surtoAcao: { maxBasePorNivel: [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], tipoRecuperacao: 'curto' } } },
    'monge': { conjurador: false, kiBasePorNivel: [0, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], recursos: { ki: { tipoRecuperacao: 'longo' } } },
    'paladino': { conjurador: true, atributoConjuração: 'carisma', recursos: { canalizarDivindadePaladino: { maxBasePorNivel: [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3], tipoRecuperacao: 'curto' }, imposicaoMaos: { maxBasePorNivel: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100], tipoRecuperacao: 'longo' } } },
    'patrulheiro': { conjurador: true, atributoConjuração: 'sabedoria', recursos: {} }, // Foco do Caçador, etc. podem ser rastreados individualmente se necessário
    'ladino': { conjurador: false, recursos: { pontosAstucia: { maxBasePorNivel: [0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11], tipoRecuperacao: 'curto' } } },
    'feiticeiro': { conjurador: true, atributoConjuração: 'carisma', recursos: {} }, // Pontos de Feitiçaria e Metamagias são complexos
    'mago': { conjurador: true, atributoConjuração: 'inteligencia', recursos: {} } // Recuperação Arcana é por descanso curto
};

let bonusProficiencia = 2; // Valor inicial

function calcularModificador(atributo) {
    return Math.floor((atributo - 10) / 2);
}

function atualizarModificadores() {
    const atributos = {
        forca: parseInt(document.getElementById('forca').value),
        destreza: parseInt(document.getElementById('destreza').value),
        constituicao: parseInt(document.getElementById('constituicao').value),
        inteligencia: parseInt(document.getElementById('inteligencia').value),
        sabedoria: parseInt(document.getElementById('sabedoria').value),
        carisma: parseInt(document.getElementById('carisma').value)
    };

    for (const atributo in atributos) {
        const modificador = calcularModificador(atributos[atributo]);
        document.getElementById(`mod-${atributo}`).textContent = `(<span class="math-inline">\{modificador \>\= 0 ? '\+' \: ''\}</span>{modificador})`;
    }

    atualizarCDMagia();
    atualizarModAtaqueMagia();
    atualizarRecursosVisuais(); // Atualiza a visibilidade dos recursos
}

function atualizarProficiencia() {
    const nivel = parseInt(document.getElementById('nivel').value);
    if (nivel >= 1 && nivel <= 4) bonusProficiencia = 2;
    else if (nivel >= 5 && nivel <= 8) bonusProficiencia = 3;
    else if (nivel >= 9 && nivel <= 12) bonusProficiencia = 4;
    else if (nivel >= 13 && nivel <= 16) bonusProficiencia = 5;
    else if (nivel >= 17 && nivel <= 20) bonusProficiencia = 6;

    atualizarCDMagia();
    atualizarModAtaqueMagia();
    atualizarRecursosMaximos(); // Atualiza o valor máximo dos recursos
}

function atualizarInfoClasse() {
    const classeSelecionada = document.getElementById('classe').value;
    const infoClasse = infoClasses[classeSelecionada];

    // Esconde todas as seções de recursos por padrão
    document.querySelectorAll('#habilidades > div[id^="recursos-"]').forEach(div => {
        div.style.display = 'none';
    });

    // Mostra as seções de recursos da classe selecionada
    if (infoClasse && infoClasse.recursos) {
        for (const recurso in infoClasse.recursos) {
            const divRecurso = document.getElementById(`recursos-${recurso.replace(/([A-Z])/g, '-$1').toLowerCase()}`); // Converte camelCase para kebab-case
            if (divRecurso) {
                divRecurso.style.display = 'block';
                atualizarRecursosMaximos(recurso);
            }
        }
    }

    // Lógica específica para Ki do Monge (já existia)
    const recursosMongeDiv = document.getElementById('recursos-monge');
    if (infoClasse && infoClasse.kiBasePorNivel) {
        recursosMongeDiv.style.display = 'block';
        atualizarRecursosMaximos('ki');
    }

    // Controle da seção de Magias para Conjuradores (já existia)
    const infoConjuradorDiv = document.getElementById('info-conjurador');
    if (infoClasse && infoClasse.conjurador === true && infoClasse.atributoConjuração) {
        infoConjuradorDiv.style.display = 'block';
        document.getElementById('atributo-conjuração').textContent = obterNomeAtributo(infoClasse.atributoConjuração);
        atualizarCDMagia();
        atualizarModAtaqueMagia();
    } else {
        infoConjuradorDiv.style.display = 'none';
    }
}

function obterNomeAtributo(atributo) {
    switch (atributo) {
        case 'forca': return 'Força';
        case 'destreza': return 'Destreza';
        case 'constituicao': return 'Constituição';
        case 'inteligencia': return 'Inteligência';
        case 'sabedoria': return 'Sabedoria';
        case 'carisma': return 'Carisma';
        default: return '';
    }
}

function atualizarCDMagia() {
    const classeSelecionada = document.getElementById('classe').value;
    const infoClasse = infoClasses[classeSelecionada];

    if (infoClasse && infoClasse.conjurador && infoClasse.atributoConjuração) {
        const atributoChave = parseInt(document.getElementById(infoClasse.atributoConjuração).value);
        const modificadorAtributo = calcularModificador(atributoChave);
        const cdMagia = 8 + bonusProficiencia + modificadorAtributo;
        document.getElementById('cd-magia').textContent = cdMagia;
    } else {
        document.getElementById('cd-magia').textContent = '';
    }
}

function atualizarModAtaqueMagia() {
    const classeSelecionada = document.getElementById('classe').value;
    const infoClasse = infoClasses[classeSelecionada];

    if (infoClasse && info