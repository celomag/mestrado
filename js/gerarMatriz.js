function gerarMatriz(nomeTabela, tituloTabela, criterios) {

    /*
    Tentando obter um elemento com o nome da tabela que esta sendo informada
    Caso obter quer dizer que já existe a tabela que esta tentando ser criada
    */
    var novaTabela = document.getElementById("div"+nomeTabela);

    //Validando se já existe a tabela a tabela informada no parametro
    //Se existir não terá como criar a mesma novamente
    if(typeof(novaTabela) != 'undefined' && novaTabela != null){
        alert("Tabela: "+nomeTabela+" já existe!");
        return;
    }

    //Criando uma DIV especifica para a tabela a ser criada
    var divTabelaInterna = document.createElement("div");
    divTabelaInterna.setAttribute("id", "div"+nomeTabela);
    var labelTituloTabela = document.createElement("h2");
    labelTituloTabela.innerHTML = tituloTabela;
    divTabelaInterna.appendChild(labelTituloTabela);

    tabelasParaPar.appendChild(divTabelaInterna); //Acessa a DIV (nome fixo, hard code nesta linha) e adicionar uma div interna para as tabelas

    //Criando a tabela de acordo com o nome fornecido
    var tabela = document.createElement("TABLE");
    tabela.setAttribute("id", "tb_"+nomeTabela);
    tabela.setAttribute("border", "1");
    tabela.setAttribute("color", "black");

    //Adicionando a tabela a div criada anteriormente
    divTabelaInterna.appendChild(tabela);

    //Criando o cabecalho da matriz e adicioando a primeira celula como vazio
    var cabecalho = tabela.createTHead();
    var linhaCabecalho = cabecalho.insertRow(0);
    var colunaCabecalho = linhaCabecalho.insertCell(-1);
    colunaCabecalho.innerHTML = "";

    //Populando o cabecalho com cada texto presente na lista de criterios
    for (var i = 0; i < criterios.length; i++){
        colunaCabecalho = linhaCabecalho.insertCell(-1);
        colunaCabecalho.innerHTML = criterios[i];
    }

    //Criando uma linha na tabela
    for (var x = 1; x <= criterios.length; x++) {

        var linha = tabela.insertRow(x);

        //Acessando cada celula(ou coluna) da linha acima
        for(var y = 1; y <= criterios.length; y++){

            //Criando um elemento select para adicionar na celula da linha acima
            var select = document.createElement("SELECT");
            select.setAttribute("id", tabela.id + "_L" + x + "_C" + y);
            select.setAttribute("onchange", "inveterValorTabela('" +  tabela.getAttribute("id") + "'," + x +"," + y + ");" );
            
            //Inserindo uma celula na linha e atribuindo o SELECT criado a esta celula
            var cell = linha.insertCell(-1);
            cell.appendChild(select);

            //Verificando se a posicao atual é a diagonal e impedindo do usuario utiliza-la
            if(x == y){
                var option = document.createElement("option");
                var t = document.createTextNode(1);
                option.appendChild(t);
                select.appendChild(option);
                select.disabled = true;
                select.style.backgroundColor = "black";
            }
            else{//Adicionando opcao de 1 ate 9 no SELECT atual
                for (var o = 1; o < 10; o++) {
                    var option = document.createElement("option");
                    option.setAttribute("value", o);
                    var t = document.createTextNode(o);
                    option.appendChild(t);
                    select.appendChild(option);
                }
            }
            /*Verificando se a posicao atual é a ultima da linha, caso for ira adicionar no inicio
            uma celula contendo o nome da respectiva linha*/
            if(y == criterios.length){
                var coluna = linha.insertCell(0);
                coluna.innerHTML = criterios[x-1]; //Vetor inicia em 0, for esta iniciando em 1 por isso a correcao
            }
            
        }

    }
    if(tabela.id == "tb_criterios"){
        inserirValorTeste("tb_criterios");
    }

}

function inserirValorTeste(nomeTabela){
    var matrizTeste = new Array(4); 
    for (var i = 0; i < 4; i++) {
        matrizTeste[i] = new Array(4); 
    }

    matrizTeste[0][0] = 1.000;
	matrizTeste[0][1] = 5.000;
	matrizTeste[0][2] = 7.000;
	matrizTeste[0][3] = 0.333;
	matrizTeste[1][0] = 0.200;
	matrizTeste[1][1] = 1.000;
	matrizTeste[1][2] = 3.000;
	matrizTeste[1][3] = 0.143;
	matrizTeste[2][0] = 0.143;
	matrizTeste[2][1] = 0.333;
	matrizTeste[2][2] = 1.000;
	matrizTeste[2][3] = 0.111;
	matrizTeste[3][0] = 3.000;
	matrizTeste[3][1] = 7.000;
	matrizTeste[3][2] = 9.000;
	matrizTeste[3][3] = 1.000;

    var tabela = document.getElementById(nomeTabela);
    //var options = celula.getElementsByTagName("option");

    for(var x = 0; x < 4; x++){
        for(var y = 0; y < 4; y++){
            var celula = tabela.rows[x+1].cells[y+1];
            var select = celula.getElementsByTagName("select")[0]; //[0] pois só há 1 unico select na lista    
            var option = document.createElement("option");
            option.setAttribute("value", matrizTeste[x][y]);
            var t = document.createTextNode(matrizTeste[x][y]);
            option.appendChild(t);
            option.selected = true;
            option.disabled = true;
            select.add(option, 0);
        }
    }

}