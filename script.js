function calcularModificador(atributo) {
    return Math.floor((atributo - 10) / 2);
}

function atualizarModificadores() {
    const forca = parseInt(document.getElementById('forca').value);
    const destreza = parseInt(document.getElementById('destreza').value);
    const constituicao = parseInt(document.getElementById('constituicao').value);
    const inteligencia = parseInt(document.getElementById('inteligencia').value);
    const sabedoria = parseInt(document.getElementById('sabedoria').value);
    const carisma = parseInt(document.getElementById('carisma').value);

    document.getElementById('mod-forca').textContent = `(${calcularModificador(forca)})`;
    document.getElementById('mod-destreza').textContent = `(${calcularModificador(destreza)})`;
    document.getElementById('mod-constituicao').textContent = `(${calcularModificador(constituicao)})`;
    document.getElementById('mod-inteligencia').textContent = `(${calcularModificador(inteligencia)})`;
    document.getElementById('mod-sabedoria').textContent = `(${calcularModificador(sabedoria)})`;
    document.getElementById('mod-carisma').textContent = `(${calcularModificador(carisma)})`;
}

// Adiciona um ouvinte de evento para cada campo de atributo para atualizar o modificador ao mudar o valor
document.getElementById('forca').addEventListener('input', atualizarModificadores);
document.getElementById('destreza').addEventListener('input', atualizarModificadores);
document.getElementById('constituicao').addEventListener('input', atualizarModificadores);
document.getElementById('inteligencia').addEventListener('input', atualizarModificadores);
document.getElementById('sabedoria').addEventListener('input', atualizarModificadores);
document.getElementById('carisma').addEventListener('input', atualizarModificadores);

// Chama a função uma vez no carregamento da página para exibir os modificadores iniciais
atualizarModificadores();

// Aqui podemos adicionar mais lógica JavaScript no futuro