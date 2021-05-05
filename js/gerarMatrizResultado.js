function gerarMatrizResultado(){

    divTabelasParaPar = document.getElementById("tabelasParaPar");

    //Inicia I = 1 devido a primeira DIV ser a tabela de critérios
    for(var i = 1; i <  divTabelasParaPar.childNodes.length; i++){
        //Acessando uma DIV que contem todas as tabelas (cada tabela tem como pai uma DIV)
        var divAlternativaI = divTabelasParaPar.childNodes[i]; //Obtendo a DIV da respectiva tabela
        var tabelaAlternativaI = divAlternativaI.childNodes[1].id; //1 = Posicao da tabela dentro da div
    }

    var tamanhoMatriz = 0;
    var radioList = document.getElementsByName("radioAlternativas");

    for(var i = 0; i < radioList.length; i++){
        if(radioList[i].checked){
            var checkBoxList = document.getElementsByName("chkBoxAlternativa"+radioList[i].value);
            for(var y = 0; y < checkBoxList.length; y++){
                if(checkBoxList[y].checked){
                    tamanhoMatriz++;
                }
            }
            break
        }
    }



    //TESTE - TESTE - TESTE  - TESTE  - TESTE  - TESTE  - TESTE 
    //TESTE - TESTE - TESTE  - TESTE  - TESTE  - TESTE  - TESTE 

    var linhas = 4; 
    var colunas = 4; 
    var matriz = new Array(colunas); 

    for (var i = 0; i < colunas; i++) {
        matriz[i] = new Array(linhas); 
    }

    matriz[0][0] = 1.000;
	matriz[0][1] = 5.000;
	matriz[0][2] = 7.000;
	matriz[0][3] = 0.333;
	matriz[1][0] = 0.200;
	matriz[1][1] = 1.000;
	matriz[1][2] = 3.000;
	matriz[1][3] = 0.143;
	matriz[2][0] = 0.143;
	matriz[2][1] = 0.333;
	matriz[2][2] = 1.000;
	matriz[2][3] = 0.111;
	matriz[3][0] = 3.000;
	matriz[3][1] = 7.000;
	matriz[3][2] = 9.000;
	matriz[3][3] = 1.000;

    //FIM DA MATRIZ INICIAL

    var linhas = matriz.length;
    var colunas = matriz.length;
    var calculoDoVetorPrioridade = new Array(colunas); 

    //Criando Matriz 1
    for (var i = 0; i < colunas; i++) {
        calculoDoVetorPrioridade[i] = new Array(linhas); 
    }

    //Normalizacao Parte 1 - Matriz 1
    for(var l = 0; l < matriz.length; l++){
        for (var c = 0; c < matriz.length; c++) {
            var soma = 0.0;
            for(var i = 0; i < matriz.length; i++){
                soma += matriz[i][c];
            }
            calculoDoVetorPrioridade[l][c] = matriz[l][c]/soma;
        }
    }
    gerarTabela("Calculo Do Vetor Prioridade", calculoDoVetorPrioridade);

    //Normalizacao Parte 2 - Vetor 1 - Vetor Prioridade da Matriz 1
    var vetorPrioridade = new Array(matriz.length);

    for(var l = 0; l < matriz.length; l++){
        var soma = 0.0;
        for (var c = 0; c < matriz.length; c++) {
            soma += calculoDoVetorPrioridade[l][c];
        }
        vetorPrioridade[l] = soma/matriz.length;
    }
    gerarTabela("Vetor Prioridade", vetorPrioridade);

    //Normalizacao Parte 3 - Matriz 2
    //Gerando matriz resultante da multiplicação de cada célula da matriz original
    //por cada valor presente no vetor da normalizacao Parte 2
    //ESTA TABELA DEU DIFERENCA MINIMA DE VALORES!
    var linhas = matriz.length;
    var colunas = matriz.length;
    var matriz2 = new Array(colunas); 

    //Criando Matriz 2
    for (var i = 0; i < colunas; i++) {
        matriz2[i] = new Array(linhas); 
    }

    for(var l = 0; l < matriz.length; l++){
        var soma = 0.0;
        for (var c = 0; c < matriz.length; c++) {
            matriz2[l][c] = matriz[l][c] * vetorPrioridade[c];
        }
    }
    gerarTabela("Matriz 2", matriz2);

    //Normalizacao Parte 4 - Vetor 2 - Vetor Prioridade da Matriz 2
    //ESTA TABELA DEU DIFERENCA MINIMA DE VALORES!
    var vetor2 = new Array(matriz.length);

    for(var l = 0; l < matriz.length; l++){
        var soma = 0.0;
        for (var c = 0; c < matriz.length; c++) {
            soma += matriz2[l][c];
        }
        vetor2[l] = soma;
    }
    gerarTabela("Vetor 2", vetor2);

    //Normalizacao Parte 4 - Vetor 3 - Vetor resultante entre Vetor1/Vetor2
    //ESTA TABELA DEU DIFERENCA MINIMA DE VALORES!
    var vetor3 = new Array(matriz.length);

    for(var l = 0; l < matriz.length; l++){
        vetor3[l] = vetor2[l]/vetorPrioridade[l];
    }
    gerarTabela("Vetor 3", vetor3);

    //Normalização Parte 5 - Calculando o valor normalizado de acordo com o vetor 3
    //ESTA TABELA DEU DIFERENCA MINIMA DE VALORES!
    var normalizado = 0;

    for(var l = 0; l < matriz.length; l++){
        normalizado += vetor3[l];
    }
    normalizado /= matriz.length;
    gerarTabela("Normalizado", normalizado);

    //Gerando valor CI pela formula
    var CI = 0;
    CI = (normalizado-matriz.length)/(matriz.length-1)
    gerarTabela("CI", CI);

    //Gerando valor CR pela formula
    var CR = 0;
    CR = CI/escalaDeSat(matriz.length);
    gerarTabela("CR", CR);
}

function gerarTabela(tituloTabela, matriz){

    if(typeof(matriz) == 'number'){
        matriz = matriz.toString();
    }

    var is2dArray;

    if(matriz[0] === undefined){
        is2dArray = false;
    }else{
        is2dArray = matriz[0].constructor === Array;
    }

    divResultado = document.getElementById("tabelaResultado");

    var labelTituloTabela = document.createElement("h2");
    labelTituloTabela.innerHTML = tituloTabela;
    divResultado.appendChild(labelTituloTabela);

    var tabela = document.createElement("TABLE");
    tabela.setAttribute("id", "tabelaTeste");
    tabela.setAttribute("border", "1");
    tabela.setAttribute("color", "black");
    var linhaUnica = tabela.insertRow(0);
    for(var x = 0; x < matriz.length; x++){
        if(typeof(matriz) == 'string'){
            x = matriz.length-1
        }
        if(is2dArray){
            var linha = tabela.insertRow(x);
            for (var y = 0; y < matriz.length; y++) {
                var cell = linha.insertCell(-1);

                var select = document.createElement("SELECT");
                select.setAttribute("id", "teste"+x+y);
                select.setAttribute("name", "teste"+x+y);
                if(x == y){
                    //select.disabled = true;
                    //select.style.backgroundColor = "black";
                }

                var option = document.createElement("option");

                
                var t = document.createTextNode(matriz[x][y]);

                option.appendChild(t);
                select.appendChild(option);

                cell.appendChild(select);
            }
        } else{
            var cell = linhaUnica.insertCell(-1);

            var select = document.createElement("SELECT");
            select.setAttribute("id", "teste"+x);
            select.setAttribute("name", "teste"+x);
            if(x == y){
                //select.disabled = true;
                //select.style.backgroundColor = "black";
            }

            var option = document.createElement("option");

            if(Array.isArray(matriz)){
                var t = document.createTextNode(matriz[x]);
            }
            else{
                var t = document.createTextNode(matriz);
            }

            option.appendChild(t);
            select.appendChild(option);

            cell.appendChild(select);
        }
    }
    divResultado.appendChild(tabela);

}

function escalaDeSat(valor){
    switch (valor) {
        case 1:
            return 0;
        case 2:
            return 0;
        case 3:
            return 0.58;
        case 4:
            return 0.9;
        case 5:
            return 1.12;
        case 6:
            return 1.24;
        case 7:
            return 1.32;
        case 8:
            return 1.41;
        case 9:
            return 1.45;
    }
}