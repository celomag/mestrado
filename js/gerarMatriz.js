function gerarMatriz(nomeTabela, criterios) {
    
    /*
    Tentando obter um elemento com o nome da tabela que esta sendo informada
    Caso obter quer dizer que já existe a tabela que esta tentando ser criada
    */
    var novaTabela = document.getElementById("div"+nomeTabela);

    //Validando se já existe a tabela a tabela informada no parametro
    //Se existir não terá como criar a mesma novamente
    if(typeof(novaTabela) != 'undefined' && novaTabela != null){
        alert("DIV com nome: "+nomeTabela+" já existe!");
        return;
    }

    //Criando uma DIV especifica para a tabela a ser criada
    var divTabelaInterna = document.createElement("div");
    divTabelaInterna.setAttribute("id", "div"+nomeTabela);
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
            select.setAttribute("id", tabela.id + "L" + x + "C" + y);
            select.setAttribute("name", "L" + x + "C" + y);
            select.setAttribute("onchange", "updateCelulaInversa(" + select.getAttribute("id") + ")" );
            
            //Inserindo uma celula na linha e atribuindo o SELECT criado a esta celula
            var cell = linha.insertCell(-1);
            cell.appendChild(select);

            //Verificando se a posicao atual é a diagonal e impedindo do usuario utiliza-la
            if(x == y){
                var option = document.createElement("option");
                var t = document.createTextNode(1);
                option.appendChild(t);
                document.getElementById(select.getAttribute("id")).appendChild(option);
                document.getElementById(select.getAttribute("id")).disabled = true;
                document.getElementById(select.getAttribute("id")).style.backgroundColor = "black";
            }
            else{//Adicionando opcao de 1 ate 9 no SELECT atual
                for (var o = 1; o < 10; o++) {
                    var option = document.createElement("option");
                    option.setAttribute("value", o);
                    var t = document.createTextNode(o);
                    option.appendChild(t);
                    document.getElementById(select.getAttribute("id")).appendChild(option);
                }
            }
            /*Verificando se a posicao atual é a ultima da linha, caso for ira adicionar no inicio
            uma celula contendo o nome da respectiva linha*/
            if(y == criterios.length){
                var coluna = linha.insertCell(0);
                console.log(criterios[x-1]); //Vetor inicia em 0, for esta iniciando em 1 por isso a correcao
                coluna.innerHTML = criterios[x-1]; //Vetor inicia em 0, for esta iniciando em 1 por isso a correcao
            }
            
        }

    }

}