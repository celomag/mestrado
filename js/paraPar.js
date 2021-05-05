function gerarParaPar(listaCriterios){ //Devera de ser informado OBRIGATORIAMENTE a lista de criterios
    
    //Criando uma nova lista com apenas os valores selecionados
    var selectedCriterios = new Array();

    //Percorrendo a lista original e verificando os valores selecionados
    //Ao encontrar adiciona na lista de apenas valores selecionados
    for (var i = 0; i < listaCriterios.length; i++) {
        if (listaCriterios[i].checked) {
            selectedCriterios.push(listaCriterios[i].labels[0].innerHTML);
        }
    }

    //Aplicando regra de limite de tamanho maximo e minimo
    if (selectedCriterios.length > 9 || selectedCriterios.length < 3){
        alert("Selecione no máximo 9 e no mínimo 3 critérios.");
        return
    }
    
    //Obtendo a lista de radio pertencentes a mesmo grupo de radio
    //HARDCODE, obtem os radios de acordo com o atributo NAME dos mesmos
    //Caso alterado o atributo name dos radios devera ser alterado o parametro abaixo
    var tipoAgrupamento = document.getElementsByName("radioAlternativas");

    //Verificando a lista qual dos radios esta selecionado para ser trabalho
    for(var i = 0; i < tipoAgrupamento.length; i++){
        if(tipoAgrupamento[i].checked){
            tipoAgrupamento = tipoAgrupamento[i].value;
        }
    }

    //Validando se pelo menos um dos radios foi selecionado
    if(typeof(tipoAgrupamento) != 'string'){
        alert("Selecione um tipo de alternativa!");
        return;
    }

    //Efetuando validacao de acordo com o tipo de radio selecionado
    var tipoAgrupamentoMax;

    if(tipoAgrupamento == "Cluster"){
        tipoAgrupamentoMax = 4;
    }

    if(tipoAgrupamento == "Bairro"){
        tipoAgrupamentoMax = 9;
    }

    //Obtendo lista de todos os checkBox que sao pertencentes ao radio obtido anteriormente
    //HARDCODE, Obtem os checkbox de acordo com um padrao chkBoxAlternativa + TipoDoAgrupamento
    //Caso alterado o atributo name das checkbox de alternativas deverá ser alterado este caminho
    var listaAgrupamento = document.getElementsByName("chkBoxAlternativa"+tipoAgrupamento);

    var selectedAgrupamento = new Array();

    //Percorrendo todos os checkbox do radio e adicionado a uma nova lista apenas os selecionados
    for (var i = 0; i < listaAgrupamento.length; i++) {
        if (listaAgrupamento[i].checked) {
            selectedAgrupamento.push(listaAgrupamento[i].labels[0].innerHTML);
        }
    }

    //Validando se o numero de checkbox selecionados esta dentro da regra
    if (selectedAgrupamento.length > tipoAgrupamentoMax || selectedAgrupamento.length < 3){
        alert("Selecione no máximo " + tipoAgrupamentoMax + " e no mínimo 3 para a alternativa.");
        return
    }

    //Gerando uma tabela de acordo com o nome informado e lista de dados
    gerarMatriz("criterios" , "Critérios", selectedCriterios);

    //Gerando matriz de agrupamento de acordo com o numero de criterios informados
    for(var i = 0 ; i < selectedCriterios.length; i++){
        gerarMatriz(tipoAgrupamento + i, selectedCriterios[i], selectedAgrupamento);
    }
    
    //Desabilitando as checkbox das radios após gerar o paraPar
    // var radioList = document.getElementsByName("radioAlternativas");
    // for(var i = 0; i < radioList.length; i++){
    //     var checkBoxList = document.getElementsByName("chkBoxAlternativa"+radioList[i].value);
    //     for(var y = 0; y < checkBoxList.length; y++){
    //         checkBoxList[y].disabled = true;
    //     }
    // }

}