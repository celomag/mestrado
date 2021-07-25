function gerarParaPar() { //Devera de ser informado OBRIGATORIAMENTE a lista de criterios

    if (document.getElementById("tb_criterios") != null) {
        if (confirm("Já existe um para par, deseja efetuar um novo?\nCaso cancelado será mantido o Par a Par feito anteriormente.")) {
            document.getElementById("tabelasParaPar").innerHTML = "";
            document.getElementById("divTabelaResultado").innerHTML = "";
        } else {
            //Marcando como selecinado a nav navParAPar
            var navParAPar = document.getElementById('navParAPar');
            navParAPar.setAttribute("class", "w3-bar-item w3-button w3-theme-l5");

            //Habilitando a div tabelasParaPar
            var tabelasParaPar = document.getElementById('tabelasParaPar');
            tabelasParaPar.removeAttribute("style");

            //Desabilitando todos as divs pois deve mostrar apenas as tabelas par a par
            var divCriterio = document.getElementById('divCriterio');
            divCriterio.setAttribute("style", "display: none !important;");
            var divAlternativa = document.getElementById('divAlternativa');
            divAlternativa.setAttribute("style", "display: none !important;");
            var divTabelaResultado = document.getElementById('divTabelaResultado');
            divTabelaResultado.setAttribute("style", "display: none !important;");

            //Deixando todas as navs habilitadas mas não selecionadas
            var navCriterios = document.getElementById('navCriterios');
            navCriterios.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
            var navAlternativa = document.getElementById('navAlternativa');
            navAlternativa.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");

            //Validando se já existe um ranquemanto ativo, para poder ativar a nav do mesmo
            if(document.getElementById("tb_ranqueamento") != null){
                var navTabelaResultado = document.getElementById('navTabelaResultado');
                navTabelaResultado.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
            }

            return
        }
    }

    //Marcando como selecinado a nav navParAPar
    var navParAPar = document.getElementById('navParAPar');
    navParAPar.setAttribute("class", "w3-bar-item w3-button w3-theme-l5");

    //Habilitando a div tabelasParaPar
    var tabelasParaPar = document.getElementById('tabelasParaPar');
    tabelasParaPar.removeAttribute("style");

    //Desabilitando todos as divs pois deve mostrar apenas as tabelas par a par
    var divCriterio = document.getElementById('divCriterio');
    divCriterio.setAttribute("style", "display: none !important;");
    var divAlternativa = document.getElementById('divAlternativa');
    divAlternativa.setAttribute("style", "display: none !important;");
    var divTabelaResultado = document.getElementById('divTabelaResultado');
    divTabelaResultado.setAttribute("style", "display: none !important;");

    //Deixando todas as navs habilitadas mas não selecionadas
    var navCriterios = document.getElementById('navCriterios');
    navCriterios.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
    var navAlternativa = document.getElementById('navAlternativa');
    navAlternativa.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
    var navTabelaResultado = document.getElementById('navTabelaResultado');
    navTabelaResultado.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");

    //Obtendo listra de criterios de acordo com o name presente nos checkbox de critério
    var listaCriterios = document.getElementsByName('chkBoxCriterio')

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
    if (selectedCriterios.length > 9 || selectedCriterios.length < 3) {
        alert("Selecione no máximo 9 e no mínimo 3 critérios.");
        return
    }

    //Obtendo a lista de radio pertencentes a mesmo grupo de radio
    //HARDCODE, obtem os radios de acordo com o atributo NAME dos mesmos
    //Caso alterado o atributo name dos radios devera ser alterado o parametro abaixo
    var tipoAgrupamento = document.getElementsByName("radioAlternativas");

    //Verificando a lista qual dos radios esta selecionado para ser trabalho
    for (var i = 0; i < tipoAgrupamento.length; i++) {
        if (tipoAgrupamento[i].checked) {
            tipoAgrupamento = tipoAgrupamento[i].value;
        }
    }

    //Validando se pelo menos um dos radios foi selecionado
    if (typeof (tipoAgrupamento) != 'string') {
        alert("Selecione um tipo de alternativa!");
        return;
    }

    //Efetuando validacao de acordo com o tipo de radio selecionado
    var tipoAgrupamentoMax;

    if (tipoAgrupamento == "Cluster") {
        tipoAgrupamentoMax = 4;
    }

    if (tipoAgrupamento == "Bairro") {
        tipoAgrupamentoMax = 9;
    }

    //Obtendo lista de todos os checkBox que sao pertencentes ao radio obtido anteriormente
    //HARDCODE, Obtem os checkbox de acordo com um padrao chkBoxAlternativa + TipoDoAgrupamento
    //Caso alterado o atributo name das checkbox de alternativas deverá ser alterado este caminho
    var listaAgrupamento = document.getElementsByName("chkBoxAlternativa" + tipoAgrupamento);

    var selectedAgrupamento = new Array();

    //Percorrendo todos os checkbox do radio e adicionado a uma nova lista apenas os selecionados
    for (var i = 0; i < listaAgrupamento.length; i++) {
        if (listaAgrupamento[i].checked) {
            selectedAgrupamento.push(listaAgrupamento[i].labels[0].innerHTML);
        }
    }

    //Validando se o numero de checkbox selecionados esta dentro da regra
    if (selectedAgrupamento.length > tipoAgrupamentoMax || selectedAgrupamento.length < 3) {
        alert("Selecione no máximo " + tipoAgrupamentoMax + " e no mínimo 3 para a alternativa.");
        return
    }

    //Gerando uma tabela de acordo com o nome informado e lista de dados
    gerarMatriz("criterios", "Critérios", selectedCriterios);

    //Gerando matriz de agrupamento de acordo com o numero de criterios informados
    for (var i = 0; i < selectedCriterios.length; i++) {
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