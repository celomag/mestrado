function validarNavCriterio(checkBox) {

    // var navParAPar = document.getElementById('navParAPar');
    // navParAPar.setAttribute("class", "w3-hide");
    // var navTabelaResultado = document.getElementById('navTabelaResultado');
    // navTabelaResultado.setAttribute("class", "w3-hide");

    //Caso houver mudança de criterio, as tabelas Par a Par e de resultado serão limpas
    //Validando se já existe a tabela Par a Par para limpa-la
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

    //Aplicando regra de limite de tamanho maximo e minimo
    if (!criteriosValidarCamposPreenchidos()) {
        //Desabilitando todas as navs enquanto não houver o numero de criterios corretos
        var navAlternativa = document.getElementById('navAlternativa');
        navAlternativa.setAttribute("class", "w3-hide");
        var navParAPar = document.getElementById('navParAPar');
        navParAPar.setAttribute("class", "w3-hide");
        var navTabelaResultado = document.getElementById('navTabelaResultado');
        navTabelaResultado.setAttribute("class", "w3-hide");
        return
    }

    //Deixando navAlternativa habilitado
    var navAlternativa = document.getElementById('navAlternativa');
    navAlternativa.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");

    //Validando se ja existe as alternativas e um Par a Par, caso ja existir deixar habilitado os demais navs(par a par e ranqueamento)
    if (alternativaValidarCamposPreenchidos()) { //Se tiver preenchidos os campos obrigatorios sera habilitado os demais navs
        //Deixando tabelasParaPar habilitado
        var navParAPar = document.getElementById('navParAPar');
        navParAPar.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");

        if (document.getElementById("tb_criterios") != null) {
            //Deixando navTabelaResultado habilitado
            var navTabelaResultado = document.getElementById('navTabelaResultado');
            navTabelaResultado.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
        }

    }

}

function criteriosValidarCamposPreenchidos() {

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
        return false;
    }

    return true;

}