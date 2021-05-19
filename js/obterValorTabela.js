function obterTabelaComoMatriz(nomeTabela){
    var tabela = document.getElementById(nomeTabela);
    //-1 pois a tabela tem cabecalho
    var tamanhoMatriz = tabela.rows.length-1;
    var matriz = new Array(tamanhoMatriz); 
    for (var i = 0; i < tamanhoMatriz; i++) {
        matriz[i] = new Array(tamanhoMatriz); 
    }

    for(var x = 0; x < tamanhoMatriz; x++){
        for(var y = 0; y < tamanhoMatriz; y++){
            var celula = tabela.rows[x+1].cells[y+1]; //+1 para pular o cabecalho da tabela
            var options = celula.getElementsByTagName("option");
            for(i = 0; i < options.length; i++){
                if(options[i].selected){
                    matriz[x][y] = options[i].value;
                }
            }
        }
    }

    return matriz;
}

//Obtem o valor presente de um OPTION dentro de uma tabela (OPTION esta dentro de um SELECT)
function obterValorOptionTabela(nomeTabela, l, c){
    var tabela = document.getElementById(nomeTabela);
    var celula = tabela.rows[l].cells[c];
    var options = celula.getElementsByTagName("option");
    for(i = 0; i < options.length; i++){
        if(options[i].selected){
            return options[i].value;
        }
    }
}

function inveterValorTabela(nomeTabela, linha, coluna){
    valorOrigem = obterValorOptionTabela(nomeTabela, linha, coluna);

    var optionResultado = document.createElement("option");
    optionResultado.selected = true;
    optionResultado.disabled = true;

    var valorCalculado = 1/valorOrigem;
    var valorCalculado = parseFloat(valorCalculado.toFixed(3)); //Limitando caracteres de resultado em centena
    var textNode = document.createTextNode(valorCalculado);
    optionResultado.appendChild(textNode);
    
    var tabela = document.getElementById(nomeTabela);
    var celula = tabela.rows[coluna].cells[linha];
    var select = celula.getElementsByTagName("select")[0]; //[0] pois só há 1 unico select na lista
    var options = celula.getElementsByTagName("option");

    if(options[0].disabled){ //Verifica se o primeiro item da lista de options é um disabled(valor de um calculo anterior)
        select.remove(0);
        select.add(optionResultado, 0);
        return;
    }
    select.add(optionResultado, 0);
}