function gerarParaPar(listaCriterios){
    
    var selectedCriterios = new Array();

    for (var i = 0; i < listaCriterios.length; i++) {
        if (listaCriterios[i].checked) {
            selectedCriterios.push(listaCriterios[i].labels[0].innerHTML);
        }
    }

    if (selectedCriterios.length > 9 || selectedCriterios.length < 3){
        alert("Selecione no máximo 9 e no mínimo 3 critérios.");
        return
    }
    
    var tipoAgrupamento = document.getElementsByName("radioClusterBairros");

    for(var i = 0; i < tipoAgrupamento.length; i++){
        if(tipoAgrupamento[i].checked){
            tipoAgrupamento = tipoAgrupamento[i].value;
        }
    }
    
    if(tipoAgrupamento != "Cluster" && tipoAgrupamento != "Bairro"){
        alert("Selecione um tipo de agrupamento!");
        return;
    }

    var tipoAgrupamentoMax;

    if(tipoAgrupamento == "Cluster"){
        tipoAgrupamentoMax = 4;
    }

    if(tipoAgrupamento == "Bairro"){
        tipoAgrupamentoMax = 9;
    }

    var listaAgrupamento = document.getElementsByName("check"+tipoAgrupamento);

    var selectedAgrupamento = new Array();

    for (var i = 0; i < listaAgrupamento.length; i++) {
        if (listaAgrupamento[i].checked) {
            selectedAgrupamento.push(listaAgrupamento[i].labels[0].innerHTML);
        }
    }

    if (selectedAgrupamento.length > tipoAgrupamentoMax || selectedAgrupamento.length < 3){
        alert("Selecione no máximo " + tipoAgrupamentoMax + " e no mínimo 3 para o agrupamento.");
        return
    }

    //Adicionar título da matriz de critérios
    gerarMatriz("criterios" , selectedCriterios);

    for(var i = 0 ; i < selectedCriterios.length; i++){
        //Adicionar título da matriz de agrupamento
        gerarMatriz(tipoAgrupamento + i, selectedAgrupamento);
    }

}