function validarNavCriterio() {

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

     //Aplicando regra de limite de tamanho maximo e minimo
     if (!criteriosValidarCamposPreenchidos()){
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


     //Validando se ja existe as alternativas, caso ja existir deixar habilitado os demais navs(par a par e ranqueamento)
     if(alternativaValidarCamposPreenchidos()){ //Se tiver preenchidos os campos obrigatorios sera habilitado os demais navs
            //Deixando tabelasParaPar habilitado
            var navParAPar = document.getElementById('navParAPar');
            navParAPar.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
            //Deixando navTabelaResultado habilitado
            var navTabelaResultado = document.getElementById('navTabelaResultado');
            navTabelaResultado.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
     }

}

function criteriosValidarCamposPreenchidos(){

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
    if (selectedCriterios.length > 9 || selectedCriterios.length < 3){
            return false;
    }

    return true;

}