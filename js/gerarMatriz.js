function gerarMatriz(nomeTabela, criterios) {
    
    var novaTabela = document.getElementById("div"+nomeTabela);

    if(typeof(novaTabela) != 'undefined' && novaTabela != null){
        alert("DIV com nome: "+nomeTabela+" já existe!");
        return;
    }

    var divTabelaInterna = document.createElement("div");
    divTabelaInterna.setAttribute("id", "div"+nomeTabela);
    tabelaCriteriosPrincipal.appendChild(divTabelaInterna);

    var tabela = document.createElement("TABLE");
    tabela.setAttribute("id", "tb_"+nomeTabela);
    tabela.setAttribute("border", "1");
    tabela.setAttribute("color", "black");

    divTabelaInterna.appendChild(tabela);

    var cabecalho = tabela.createTHead();
    var linhaCabecalho = cabecalho.insertRow(0);
    var colunaCabecalho = linhaCabecalho.insertCell(-1);
    colunaCabecalho.innerHTML = "";

    for (var i = 0; i < criterios.length; i++){
        colunaCabecalho = linhaCabecalho.insertCell(-1);
        colunaCabecalho.innerHTML = criterios[i];
    }

    for (var x = 1; x <= criterios.length; x++) {

        var linha = tabela.insertRow(x);

        for(var y = 1; y <= criterios.length; y++){

            var select = document.createElement("SELECT");
            select.setAttribute("id", tabela.id + "L" + x + "C" + y);
            select.setAttribute("name", "L" + x + "C" + y);
            select.setAttribute("onchange", "updateCelulaInversa(" + select.getAttribute("id") + ")" );
            
            var cell = linha.insertCell(-1);
            cell.appendChild(select);

            if(x == y){
                var option = document.createElement("option");
                var t = document.createTextNode(1);
                option.appendChild(t);
                document.getElementById(select.getAttribute("id")).appendChild(option);
                document.getElementById(select.getAttribute("id")).disabled = true;
                document.getElementById(select.getAttribute("id")).style.backgroundColor = "black";
            }
            else{
                for (var o = 1; o < 10; o++) {
                    var option = document.createElement("option");
                    option.setAttribute("value", o);
                    var t = document.createTextNode(o);
                    option.appendChild(t);
                    document.getElementById(select.getAttribute("id")).appendChild(option);
                }
            }

            if(y == criterios.length){
                var coluna = linha.insertCell(0);
                console.log(criterios[x-1]);
                coluna.innerHTML = criterios[x-1]; //Vetor inicia em 0, for esta iniciando em 1
            }
            
        }

    }

}