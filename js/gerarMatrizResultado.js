/* 
Gera a ultima tabela (tb_ranqueamentoOrdenado)
Tabela que contem todos os valores da coluna "Prioridade" da tabela "tb_ranqueamento"
Resulta em uma tabela com as alternativas e seus respectivos valores ordenados (e valores em %)
vetorDasPrioridades = contem os valores da coluna Prioridade da tabela "tb_ranqueamento"
vetorDasPrioridades contem valores ordenados exatamente como são apresentados na tabela "tb_ranqueamento"
*/
function gerarRanqueamentoOrdenado(vetorDasPrioridades, vetorNomeDasAlternativas){

    //Local utilizado para ser "pai" da div/tabela resultante
    var divRanqueamento = document.getElementById("divRanqueamento"); //DIV

    //Criando a tabela
    var tabela = document.createElement("TABLE");
    tabela.setAttribute("id", "tb_ranqueamentoOrdenado");
    tabela.setAttribute("border", "1");
    tabela.setAttribute("color", "black");

    //Adicionando a tabela a DIV criada (divRanqueamento)
    divRanqueamento.appendChild(tabela);

    //Criando cabecalho da tabela e primeira celula em branco
    var cabecalho = tabela.createTHead();
    var linhaCabecalho = cabecalho.insertRow(0);
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = ""; //Primera coluna vazia
    linhaCabecalho.appendChild(headerCell);

    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "Ranqueamento (%)";
    linhaCabecalho.appendChild(headerCell);

    //Criando corpo da tabela
    var tbody = tabela.createTBody()

    var vetorAlternativaValor = new Array()

    for (var i = 0 ; i < vetorDasPrioridades.length ; i++){
        vetorAlternativaValor.push({alternativa: vetorNomeDasAlternativas[i], valor: vetorDasPrioridades[i]});
    }
    
    vetorAlternativaValor.sort(function(a, b) {
        return ((a.valor > b.valor) ? -1 : ((a.valor == b.valor) ? 0 : 1));
    });
    
    for(var x = 0; x <  vetorDasPrioridades.length; x++){ // x =1 pois o primeiro item e vazio
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = vetorAlternativaValor[x].alternativa; //Acessado a celula com o nome das alternativas
        var linha = tbody.insertRow(-1);
        linha.appendChild(headerCell);
        cell = linha.insertCell(-1);
        cell.innerHTML = parseFloat(vetorAlternativaValor[x].valor/100).toFixed(3);
    }
     
}

// Efetua os calculos necessários e gera a tabela de ranqueamento
function gerarRanqueamento(){

    if(document.getElementById("tb_criterios") == null){
        alert("Necessário gerar o para par antes de exibir o ranqueamento")
        return
    }
    if(document.getElementById("tb_ranqueamento") != null){
        if(confirm("Já existe um ranquemento, deseja efetuar um novo?")){
            document.getElementById("divTabelaResultado").innerHTML = "";
        }else{
            return
        }
    }

    //Utilizado para obter os valores para os calculos
    var divTabelasParaPar = document.getElementById("tabelasParaPar"); //DIV
    
    //Local utilizado para ser "pai" da div/tabela resultante
    var tabelaResultado = document.getElementById("divTabelaResultado"); //DIV

    //Criando uma div para ficar dentro da DIV "tabelaResultado"
    var divTabelaInterna = document.createElement("div");
    divTabelaInterna.setAttribute("id", "divRanqueamento");
    var labelRanqueamento = document.createElement("h2");
    labelRanqueamento.innerHTML = "Ranqueamento";
    divTabelaInterna.appendChild(labelRanqueamento);

    //Adicionando a DIV "divRanqueamento" na DIV pai "divtabelaResultado"
    tabelaResultado.appendChild(divTabelaInterna)

    //Criando a tabela
    var tabela = document.createElement("TABLE");
    tabela.setAttribute("id", "tb_ranqueamento");
    tabela.setAttribute("border", "1");
    tabela.setAttribute("color", "black");
    
    //Adicionando a tabela a DIV criada (divRanqueamento)
    divTabelaInterna.appendChild(tabela);

     //Criando cabecalho da tabela e primeira celula em branco
     var cabecalho = tabela.createTHead();
     var linhaCabecalho = cabecalho.insertRow(0);
     var headerCell = document.createElement("TH");
     headerCell.innerHTML = "";
     linhaCabecalho.appendChild(headerCell);

     //Criando corpo da tabela
     tbody = tabela.createTBody() 

    //Obtendo a tabela criterios e adicionando cada item do cabecalho da tabela de criterios no cabecalho da Ranqueamento
    var tabelaCriterios = document.getElementById("tb_criterios");
    var cabecalhoCriterios = tabelaCriterios.rows[0] //Acessando primera linha que é a do cabecalho que contem o nome dos criterios
    for(var x = 1; x <  tabelaCriterios.rows.length; x++){ // x =1 pois o primeiro item e vazio
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = cabecalhoCriterios.cells[x].innerHTML;
        linhaCabecalho.appendChild(headerCell);
    }

    //Adicionando a ultima celula do cabecalho, contendo texto "Prioridade"
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "Prioridade";
    linhaCabecalho.appendChild(headerCell);

    //Criando segunda linha da tabela e adicionando primeira celula com nome de Pesos prioridade
    var linha = tbody.insertRow(-1);
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "Pesos prioridade";
    linha.appendChild(headerCell);

    //Obtendo o nome das ALTERNATIVAS de uma tabela de alternativa existente para ser inserido no inicio da cada linha de tabela ranqueamento
    var divPaiTabelaAlternativas = divTabelasParaPar.childNodes[1]; //1 pois é a primeira div que contem tabela alternativa
    var tabelaAlternativa = divPaiTabelaAlternativas.childNodes[1] //1 pois é a posicao da tabela dentro da div, 0 seria o H2
    var cabecalhoAlternativa = tabelaAlternativa.rows[0] //Acessando primera linha que é a do cabecalho que contem o nome da alternativa
   
    //Vetor que irá conter o nome das alternativas para ser utilizado futuramente como parametro em outra função
    var vetorNomeDasAlternativas = new Array()
    //Inserindo cada nome obtido no inicio da cada linha da nova tabela
    /* EXEMPLO:
                    |Criterio1|Criterio2|Criterio3|Prioridade
    Pesos prioridade| 
    ->  Alternativa1|
    ->  Alternativa2|
    ->  Alternativa3|
    */
    for(var x = 1; x <  tabelaAlternativa.rows.length; x++){ // x =1 pois o primeiro item e vazio
        var headerCell = document.createElement("TH");
        var linha = tbody.insertRow(-1);
        headerCell.innerHTML = cabecalhoAlternativa.cells[x].innerHTML; //Acessado a celula com o nome das alternativas
        linha.appendChild(headerCell);
        vetorNomeDasAlternativas[x-1] = cabecalhoAlternativa.cells[x].innerHTML; //Salvando em um vetor que sera passado como parametro para criação de uma tabela no final desta função
    }

    // !! ESTA MATRIZ IRA CONTER TODOS OS VALORES QUE ESTAO NA TABELA CRIADA PARA PODER SER ACESSADO FACILMENTE OS VALORES SEM NECESSIDADE DE CONVERSAO
    var matrizDaTabela = new Array(tabela.rows.length-1); // -1 pois a primera linha(posicao 0) é a do cabecalho
    for(var i = 0; i <  tabela.rows.length-1; i++){ // -1 pois a primera linha(posicao 0) é a do cabecalho
        matrizDaTabela[i] = new Array(tabela.rows[0].cells.length-2) //-2 pois deve ignorar a primeira celula que é a que contem os nomes das alternativas e a ultima que é a de resultados
    }

    // !! IMPORTANTE !!
    //Criando uma matriz que ira conter TODOS OS VETORES PRIORIDADES DE TODAS AS TABELAS
    var matrizDoVetorPrioridade = new Array();

    //Obtendo o calculoDoVetorPrioridade de cada tabela e inserindo na matriz
    for(var i = 0; i <  divTabelasParaPar.childNodes.length; i++){
        var divPaiTabela = divTabelasParaPar.childNodes[i]; //Obtendo a DIV da respectiva tabela
        var idTabela = divPaiTabela.childNodes[1].id; //1 = Posicao da tabela dentro da div
        matrizDoVetorPrioridade.push(gerarMatrizResultado(idTabela))
    }

    //Adicionando o Vetor prioridade da tabela critérios o unico que é adicionado na mesma linha na tabela
    for(var y = 0; y <  matrizDoVetorPrioridade[0].length; y++){ // 0 é o vetor priodade da tabela critérios, acessando os valores dele
        var cell = tabela.rows[1].insertCell(-1) //1 a primeira linha depois do cabecalho (linha que contem o pesos prioridade)
        cell.innerHTML = matrizDoVetorPrioridade[0][y] //Adicionando apenas o primeiro vetor
        matrizDaTabela[0][y] = matrizDoVetorPrioridade[0][y] //Salvando na matriz da tabela a primeira linha de valores que consta na tabela
    }

    //VALORES PARA TESTE
    /* TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE */
    // matrizDoVetorPrioridade[2][0] = 0.090
    // matrizDoVetorPrioridade[2][1] = 0.574
    // matrizDoVetorPrioridade[2][2] = 0.291
    // matrizDoVetorPrioridade[2][3] = 0.044

    // matrizDoVetorPrioridade[3][0] = 0.256
    // matrizDoVetorPrioridade[3][1] = 0.576
    // matrizDoVetorPrioridade[3][2] = 0.117
    // matrizDoVetorPrioridade[3][3] = 0.051
    /* TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE */

    //Adicionando os vetores na nova tabela de acordo com a regra do calculo
    //Exemplo: 
    //  CABECALHO |CRITERIO1   |CRITERIO2   |CRITERIO3   |Prioridade
    //Alternativa1|Vetor1:Item0|Vetor2:Item0|Vetor3:Item0|calculoDaPrioridade (Esse calculo e feito na repeticao depois)
    //Alternativa2|Vetor1:Item1|Vetor2:Item1|Vetor3:Item1|calculoDaPrioridade
    for(var y = 0; y <  matrizDoVetorPrioridade[1].length; y++){ // 1 ignora o vetor prioridades dos criterios e precisa saber quantos criterios
        for(var x = 1; x <  matrizDoVetorPrioridade.length; x++){ 
            var cell = tabela.rows[y+2].insertCell(-1) //y+2 pois precisa ignorar a linha do vetor prioridade da tabela criterios e precisa ignorar tambem o cabecalho da tabela
            cell.innerHTML = matrizDoVetorPrioridade[x][y] //x-y - acessando linha e depois coluna
            matrizDaTabela[y+1][x-1] = matrizDoVetorPrioridade[x][y] //+1 -1 pois precisa acessar coluna depois linha
        }
    }

    //Contem os valores que estarao presentes na coluna Prioridade da tabela
    //Utilizado para criação da tabela final de ranqueamento (Ordenada por maior %)
    var vetorDasPrioridades = new Array();

    //calculoDaPrioridade
    for(var x = 1; x <  matrizDaTabela.length; x++){ // x = 1 ignora o primeiro vetor que é o vetor prioridade 
        var calculoDaPrioridade = 0
        for(var y = 0; y <  matrizDaTabela[x].length; y++){
            calculoDaPrioridade += matrizDaTabela[x][y] * matrizDaTabela[0][y] //multiplicando pelo valor do vetor prioridade da tabela criterios
        }
        vetorDasPrioridades[x-1] = calculoDaPrioridade //-1 Pois é um novo vetor, pois o X=1 do for inicia em 1 para ignorar o primeiro vetor que é o vetor prioridade  
        var cell = tabela.rows[x+1].insertCell(-1) //+1 ignora  cabecalho da tabela
        cell.innerHTML = (calculoDaPrioridade)
    }

    gerarRanqueamentoOrdenado(vetorDasPrioridades, vetorNomeDasAlternativas) //Chama função responsavel para criar uma nova tabela com apenas o ranqueamento ordenado
}

//Responsavel por todo o calculo de normalização de uma tabela (Critérios/Alternativas)
function gerarMatrizResultado(idTabela){

    var tabelaResultado = document.getElementById("divTabelaResultado"); //DIV Pai de todas as div que contem resultados
    var tabelaFonte = document.getElementById(idTabela); //Tabela que esta tendo seus calculos efetuados
    
    //Criando uma div para ficar dentro da DIV "tabelaResultado"
    var divNovaTabelaResultado = document.createElement("div");
    divNovaTabelaResultado.setAttribute("id", "divNormalizacao_" + idTabela);
    var labelTabelaResultado = document.createElement("h2");
    labelTabelaResultado.innerHTML = "Normalização: " + tabelaFonte.parentNode.firstChild.innerHTML; //Acessando o H2 (Titulo dessa tabela) que esta presente na DIV pai desta tabela
    divNovaTabelaResultado.appendChild(labelTabelaResultado);
    tabelaResultado.appendChild(divNovaTabelaResultado);

    var matriz = obterTabelaComoMatriz(idTabela);
    for(var x = 0; x < matriz.length; x++){
        for(var y = 0; y < matriz.length; y++){
            matriz[x][y] = parseFloat(matriz[x][y]);
        }
    }

    //Primeira matriz, foi ulizado este nome devido ao exemplo
    var calculoDoVetorPrioridade = new Array(matriz.length); 

    //Criando Matriz 1
    for (var i = 0; i < matriz.length; i++) {
        calculoDoVetorPrioridade[i] = new Array(matriz.length); 
    }

    //Normalizacao Parte 1 - Matriz 1
    for(var l = 0; l < calculoDoVetorPrioridade.length; l++){
        for (var c = 0; c < calculoDoVetorPrioridade.length; c++) {
            var soma = 0.0;
            for(var i = 0; i < calculoDoVetorPrioridade.length; i++){
                soma += matriz[i][c];
            }
            calculoDoVetorPrioridade[l][c] = (matriz[l][c]/soma);
            //calculoDoVetorPrioridade[l][c] = parseFloat((matriz[l][c]/soma).toFixed(3));
        }
    }
    gerarTabelaResultado(divNovaTabelaResultado.getAttribute("id"), 1, "Calculo Do Vetor Prioridade", calculoDoVetorPrioridade)

    //Normalizacao Parte 2 - Vetor 1 - Vetor Prioridade da Matriz 1
    var vetorPrioridade = new Array(matriz.length);
    var validacao = 0;
    for(var l = 0; l < matriz.length; l++){
        var soma = 0.0;
        for (var c = 0; c < matriz.length; c++) {
            soma += calculoDoVetorPrioridade[l][c];
        }
        vetorPrioridade[l] = (soma/matriz.length);
        //vetorPrioridade[l] =  parseFloat((soma/matriz.length).toFixed(3));
        validacao += vetorPrioridade[l];
    }
    gerarTabelaResultado(divNovaTabelaResultado.getAttribute("id"), 2, "Vetor Prioridade", vetorPrioridade)

    gerarTabelaResultado(divNovaTabelaResultado.getAttribute("id"), 3, "Validação do Vetor Prioridade", validacao)

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
        for (var c = 0; c < matriz.length; c++) {
            matriz2[l][c] = matriz[l][c] * vetorPrioridade[c];
        }
    }
    gerarTabelaResultado(divNovaTabelaResultado.getAttribute("id"), 4, "Matriz 2", matriz2)

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
    gerarTabelaResultado(divNovaTabelaResultado.getAttribute("id"), 5, "Vetor 2", vetor2)

    //Normalizacao Parte 4 - Vetor 3 - Vetor resultante entre Vetor1/Vetor2
    //ESTA TABELA DEU DIFERENCA MINIMA DE VALORES!
    var vetor3 = new Array(matriz.length);

    for(var l = 0; l < matriz.length; l++){
        vetor3[l] = vetor2[l]/vetorPrioridade[l];
    }
    gerarTabelaResultado(divNovaTabelaResultado.getAttribute("id"), 6, "Vetor 3", vetor3)

    //Normalização Parte 5 - Calculando o valor normalizado de acordo com o vetor 3
    //ESTA TABELA DEU DIFERENCA MINIMA DE VALORES!
    var normalizado = 0;

    for(var l = 0; l < matriz.length; l++){
        normalizado += vetor3[l];
    }
    normalizado /= matriz.length;
    gerarTabelaResultado(divNovaTabelaResultado.getAttribute("id"), 7, "Normalizado", normalizado)

    //Gerando valor CI pela formula
    var CI = 0;
    CI = (normalizado-matriz.length)/(matriz.length-1)
    gerarTabelaResultado(divNovaTabelaResultado.getAttribute("id"), 8, "CI", CI)

    //Gerando valor CR pela formula
    var CR = 0;
    CR = CI/escalaDeSat(matriz.length);
    //CR /= 100; //Alterando o valor para %
    //CR = parseFloat((CR).toFixed(3));
    gerarTabelaResultado(divNovaTabelaResultado.getAttribute("id"), 9, "CR", CR)

    if(CR > 0.1){
        alert("Tabela: " + tabelaFonte.parentNode.firstChild.innerHTML + "\nO índice inconsistência é maior que 0,1.\nPor favor, reveja os valores atribuídos aos Critérios/Alternativas");
    }

    return vetorPrioridade
}

/*
idDivResultado = DIV que terá as tabelas adicionadas
numeroDoPasso = Cada calculo e um passo, informar em qual calculo esta atualmente
passoEfetuado = nome do calculo que foi efetuado (sera mostrado no cabecalho da tabela)
matriz = valores a serem exibidos em tabela
*/
function gerarTabelaResultado(idDivResultado, numeroDoPasso, passoEfetuado, matriz){

    var tabelaResultado = document.getElementById(idDivResultado); //DIV em que sera acrescentado a tabela gerada

    //Criando uma div para ficar dentro da DIV "tabelaResultado"
    var divTabelaInterna = document.createElement("div");
    divTabelaInterna.setAttribute("id", idDivResultado+"_Calculo_"+numeroDoPasso);
    // var nomeDoPassoEfetuado = document.createElement("h2"); //Desnecessario
    // nomeDoPassoEfetuado.innerHTML = passoEfetuado;
    // divTabelaInterna.appendChild(nomeDoPassoEfetuado);

    //Adicionando a DIV nova na DIV pai
    tabelaResultado.appendChild(divTabelaInterna)

    //Criando a tabela
    var tabela = document.createElement("TABLE");
    tabela.setAttribute("id", "tb_"+idDivResultado+"_Calculo_"+numeroDoPasso);
    tabela.setAttribute("border", "1");
    tabela.setAttribute("color", "black");

    //Adicionando a tabela a DIV criada (divRanqueamento)
    divTabelaInterna.appendChild(tabela);

    //Criando cabecalho da tabela e primeira celula em branco
    var cabecalho = tabela.createTHead();
    var linhaCabecalho = cabecalho.insertRow(0);
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = passoEfetuado;
    linhaCabecalho.appendChild(headerCell);

    //Criando corpo da tabela
    var tbody = tabela.createTBody();
    
    //Validando se a variavel informada e apenas um numero
    if(typeof(matriz) == 'number'){
        var linha = tbody.insertRow(-1);
        cell = linha.insertCell(-1);
        cell.innerHTML = matriz.toString()
        return
    }

    //Validando se é um array de duas dimencoes ou nao
    var is2dArray;

    if(matriz[0] === undefined){
        is2dArray = false;
    }else{
        is2dArray = matriz[0].constructor === Array;
    }

    //validando se é uma matriz
    if(is2dArray){
        for(var x = 0; x < matriz.length; x++){
            var linha = tbody.insertRow(-1);
            for(var y = 0; y < matriz[x].length; y++){
                cell = linha.insertCell(-1);
                cell.innerHTML = matriz[x][y];
            }
        }
    }else{
        //Se for vetor
        var linha = tbody.insertRow(-1);
        for(var x = 0; x < matriz.length; x++){
            cell = linha.insertCell(-1);
            cell.innerHTML = matriz[x];
        }
    }
    headerCell.setAttribute("colspan", tabela.rows[1].cells.length) //Alterando o cabecalho para ficar centralizado de acordo com a quantidade de celulas
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