//divPai = Div onde deveria ser adicionado os inputs criados
//listaInputs = Lista JSON dos criterios;
function gerarInputCriterios(divPai, jsonCriterios){

    for(var i = 0; i < jsonCriterios.criterios.length; i++){

        var divCriterio = document.createElement("div");
        divCriterio.setAttribute("id", "divCriterios"+i);

        divPai.appendChild(divCriterio);

        var labelCriterio = document.createElement("h3");
        labelCriterio.innerHTML = jsonCriterios.criterios[i].titulo;
        labelCriterio.setAttribute("id", "labelCriterios"+i);
        labelCriterio.setAttribute("class", "grupoCriterio");

        divCriterio.appendChild(labelCriterio);

        var pularLinha = document.createElement("br");
        divCriterio.appendChild(pularLinha);

        for(var y = 0; y < jsonCriterios.criterios[i].listaOpcoes.length; y++){

            li = document.createElement("li");
            divInput = document.createElement("div");
            divInput.setAttribute("id","divInputCriterio"+i+"_"+y);

            var novoInput = document.createElement("input");
            novoInput.setAttribute("type", "checkbox");
            novoInput.setAttribute("id","inputCriterio"+i+"_"+y);
            novoInput.setAttribute("name", "chkBoxCriterio");
            novoInput.setAttribute("onclick", "validarNavCriterio();");

            labelNovoInput = document.createElement("label");
            labelNovoInput.setAttribute("for", novoInput.id);
            labelNovoInput.innerHTML = jsonCriterios.criterios[i].listaOpcoes[y];

            divInput.appendChild(novoInput);
            divInput.appendChild(labelNovoInput);

            pularLinha = document.createElement("br");
            divInput.appendChild(pularLinha);
            divCriterio.appendChild(divInput);
            
        }
        // pularLinha = document.createElement("br");
        // divCriterio.appendChild(pularLinha);
    }

}

function adicionarCriterioPersonalizado(){

    //Input que contem o texto inserido pelo usuario
    var textoNovoCriterio = document.getElementById("inputCriterioPersonalizado");

    //Validação de se esta em branco o campo
    if(textoNovoCriterio.value.trim().length < 3){
        alert("Favor informar um critério com no mínimo 3 caracteres.");
        return
    }

    //DIV pai
    var divCorpoCriterio = document.getElementById('corpoCriterio');

    //Numero total de grupos de criterios existentes
    var totalGruposDeCriterios = document.getElementsByClassName("grupoCriterio").length;

    //Tentando obter a DIV dos criterios personalizados
    var divCriterioPersonalizado = divCorpoCriterio.lastChild;

    //Verificando se a DIV de criterios personalizados existe
    if(divCriterioPersonalizado.getAttribute("name") != "criteriosPersonalizados"){
        divCriterioPersonalizado = document.createElement("div");
        divCriterioPersonalizado.setAttribute("id", "divCriterios" + totalGruposDeCriterios);
        divCriterioPersonalizado.setAttribute("name", "criteriosPersonalizados");
        divCorpoCriterio.appendChild(divCriterioPersonalizado)

        var labelNovoCriterio = document.createElement("h3");
        labelNovoCriterio.innerHTML = "Critérios Personalizados";
        labelNovoCriterio.setAttribute("id", "labelCriterios" + totalGruposDeCriterios);
        labelNovoCriterio.setAttribute("class", "grupoCriterio");
        divCriterioPersonalizado.appendChild(labelNovoCriterio);
    
        pularLinha = document.createElement("br");
        divCriterioPersonalizado.appendChild(pularLinha);
    } else {
        /*
        Se já existe a DIV então ela esta sendo contada no total 
        (a contagem das div inicia em 0, mas o .length inicia em 1, 
        por isso deve de ter a correção de -1)
        */
        totalGruposDeCriterios -= 1;
    }

    //INPUT
   //Contador do numero de checkboxes que existem dentro desta DIV
    var qntidadeDeChkBoxCriterio = divCriterioPersonalizado.childNodes.length-2 // -2 = Ignora o label cabecalho e a quebra de linha
    var divNovoInput = document.createElement("div");
    divNovoInput.setAttribute("id", "divCriterios" + totalGruposDeCriterios + "_" + qntidadeDeChkBoxCriterio);

    var novoInput = document.createElement("input");
    novoInput.setAttribute("type", "checkbox");
    novoInput.setAttribute("id","divInputCriterio" + totalGruposDeCriterios + "_" + qntidadeDeChkBoxCriterio);
    novoInput.setAttribute("name", "chkBoxCriterio");
    novoInput.setAttribute("onclick", "validarNavCriterio();");
   
    labelNovoInput = document.createElement("label");
    labelNovoInput.setAttribute("for", novoInput.id);
    labelNovoInput.innerHTML = textoNovoCriterio.value.trim();

    divNovoInput.appendChild(novoInput);
    divNovoInput.appendChild(labelNovoInput);
    divCriterioPersonalizado.appendChild(divNovoInput);

    textoNovoCriterio.value = '';

}