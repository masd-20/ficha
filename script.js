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
        magiasPorCirculo: { 1: 2