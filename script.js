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
const PERICIAS_INFO = { /* ... */ };

let nivelPersonagem = 1;

function calcularModificador(atributo) {
    return Math.floor((atributo - 10) / 2);
}

function getBonusProficiencia() { /* ... */ }
function atualizarModificadores() { /* ... */ }
function atualizarPericias() { /* ... */ }

function atualizarCA() {
    const caBase = parseInt(document.getElementById('ca-base').value) || 10;
    const bonusCA = parseInt(document.getElementById('bonus-ca').value) || 0;
    document.getElementById('ca-total').textContent = caBase + bonusCA;
}

function validarHP() { /* ... */ }
function alterarHP(delta) { /* ... */ }

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

    if (atributoConjuração) {
        const modificadorAtributo = calcularModificador