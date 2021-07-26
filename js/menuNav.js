function alterarParaCriterios() {

    //Ocultando botao para exibir e ocultar o calculo
    var botaoCalculo = document.getElementById("botaoCalculo");
    botaoCalculo.setAttribute("style", "display: none !important;");

    //Marcando como selecinado a nav Crirterios
    var navCriterios = document.getElementById('navCriterios');
    navCriterios.setAttribute("class", "w3-bar-item w3-button w3-theme-l5");

    //Habilitando a div de critérios
    var divCriterio = document.getElementById('divCriterio');
    divCriterio.removeAttribute("style");

    //Desabilitando todos as divs pois deve mostrar apenas os criterios
    var divAlternativa = document.getElementById('divAlternativa');
    divAlternativa.setAttribute("style", "display: none !important;");
    var tabelasParaPar = document.getElementById('tabelasParaPar');
    tabelasParaPar.setAttribute("style", "display: none !important;");
    var divTabelaResultado = document.getElementById('divTabelaResultado');
    divTabelaResultado.setAttribute("style", "display: none !important;");

    //Validando se ja existe as alternativas e a tabela do Par a Par
    if (alternativaValidarCamposPreenchidos() && document.getElementById("tb_criterios") != null) { //Se tiver preenchidos os campos obrigatorios sera habilitado os demais navs
        //Deixando navAlternativa habilitado
        var navAlternativa = document.getElementById('navAlternativa');
        navAlternativa.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
        //Deixando tabelasParaPar habilitado
        var navParAPar = document.getElementById('navParAPar');
        navParAPar.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
        //Deixando navTabelaResultado habilitado
        var navTabelaResultado = document.getElementById('navTabelaResultado');
        navTabelaResultado.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");


        //Caso houver apenas as alternativas já escolhidas ele ja deixa pre habilitado as alternativas e o Par a Par
    } else if (alternativaValidarCamposPreenchidos()) {
        //Deixando navAlternativa habilitado
        var navAlternativa = document.getElementById('navAlternativa');
        navAlternativa.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
        //Deixando tabelasParaPar habilitado
        var navParAPar = document.getElementById('navParAPar');
        navParAPar.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
    } else if (criteriosValidarCamposPreenchidos()) { //Habilita o NAV de alternativa apenas se houver o numero de criterios necessarios
        //Deixando navAlternativa habilitado 
        var navAlternativa = document.getElementById('navAlternativa');
        navAlternativa.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
    }
}

function alterarParaAlternativas() {

    //Ocultando botao para exibir e ocultar o calculo
    var botaoCalculo = document.getElementById("botaoCalculo");
    botaoCalculo.setAttribute("style", "display: none !important;");

    //Deixando nav Critérios deselecionado
    var navCriterios = document.getElementById('navCriterios');
    navCriterios.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");

    //Escondendo as divs
    var divCriterio = document.getElementById('divCriterio');
    divCriterio.setAttribute("style", "display: none !important;");
    var tabelasParaPar = document.getElementById('tabelasParaPar');
    tabelasParaPar.setAttribute("style", "display: none !important;");
    var divTabelaResultado = document.getElementById('divTabelaResultado');
    divTabelaResultado.setAttribute("style", "display: none !important;");

    //Deixando navAlternativa habilitado e selecionado
    var navAlternativa = document.getElementById('navAlternativa');
    navAlternativa.setAttribute("class", "w3-bar-item w3-button w3-theme-l5");

    //Habilitando a DIV de alternativas
    var divAlternativa = document.getElementById('divAlternativa');
    divAlternativa.removeAttribute("style");

    //Validando se o numero de checkbox selecionados esta dentro da regra
    if (!alternativaValidarCamposPreenchidos()) {
        //Enquanto não for inserido o numero de selecoes corretas, não sera possivel continuar o calculo
        var navParAPar = document.getElementById('navParAPar');
        navParAPar.setAttribute("class", "w3-hide");
        var navTabelaResultado = document.getElementById('navTabelaResultado');
        navTabelaResultado.setAttribute("class", "w3-hide");
        return
    }

    //Verifica se existe um Par a Par, caso existir deixa habilitado o botao
    if (document.getElementById("tb_criterios") != null) {
        //Deixando tabelasParaPar habilitado
        var navParAPar = document.getElementById('navParAPar');
        navParAPar.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
    }

    //Validando se existe a tabela de ranqueamento, caso existir ele deixa o botão da tabela habilitado
    if (document.getElementById("tb_criterios") != null && document.getElementById("tb_ranqueamento") != null) {
        var navTabelaResultado = document.getElementById('navTabelaResultado');
        navTabelaResultado.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
    }

}

function alterarParaParAPar() {

    //Ocultando botao para exibir e ocultar o calculo
    var botaoCalculo = document.getElementById("botaoCalculo");
    botaoCalculo.setAttribute("style", "display: none !important;");

    if (document.getElementById("tb_criterios") == null) {
        gerarParaPar();
    } else {
        //Ativar botao
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

    // //Validando se já existe um ranquemanto ativo, para poder ativar a nav do mesmo
    // if (document.getElementById("tb_ranqueamento") != null) {
    //     var navTabelaResultado = document.getElementById('navTabelaResultado');
    //     navTabelaResultado.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
    // }
}

function alterarParaRanqueamento() {

}