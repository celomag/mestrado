function validarNavAlternativa(checkBox) {

    if (document.getElementById("tb_criterios") != null) {
        if (confirm("Já existe um Par a Par, esta ação irá excluir o Par a Par atual e você deverá gerar um novo.\n")) {
            document.getElementById("tabelasParaPar").innerHTML = "";
            document.getElementById("divTabelaResultado").innerHTML = "";
            var navTabelaResultado = document.getElementById('navTabelaResultado');
            navTabelaResultado.setAttribute("class", "w3-hide");
        }
        //Invertendo a ação do usuário, pois o mesmo cancelou a mudança de estado
        else if (checkBox.checked) {
            checkBox.checked = false;
        } else {
            checkBox.checked = true;
        }
    }

    //Validando se o numero de checkbox selecionados esta dentro da regra
    if (!alternativaValidarCamposPreenchidos()) {
        //Enquanto não for inserido o numero de selecoes corretas, não sera possivel continuar o calculo
        var navParAPar = document.getElementById('navParAPar');
        navParAPar.setAttribute("class", "w3-hide");
        var navTabelaResultado = document.getElementById('navTabelaResultado');
        navTabelaResultado.setAttribute("class", "w3-hide");
        return
    }

        //Deixando tabelasParaPar habilitado
        var navParAPar = document.getElementById('navParAPar');
        navParAPar.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");

    //Deixando tabelasParaPar habilitado
    var navParAPar = document.getElementById('navParAPar');
    navParAPar.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
}

function alternativaValidarCamposPreenchidos() {

    // ALTERNATIVAS

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
        return false;
    }

    return true;
}