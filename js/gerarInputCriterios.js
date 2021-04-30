//divPai = Div onde deveria ser adicionado os inputs criados
//listaInputs = Lista JSON dos criterios;
function gerarInputCriterios(divPai, jsonCriterios){

    for(var i = 0; i < jsonCriterios.criterios.length; i++){

        labelCriterio = document.createElement("label");
        labelCriterio.innerHTML = jsonCriterios.criterios[i].titulo;
        labelCriterio.setAttribute("id", "labelCriterios"+i);
        labelCriterio.setAttribute("class", "grupoCriterio");

        divPai.appendChild(labelCriterio);

        pularLinha = document.createElement("br");
        divPai.appendChild(pularLinha);

        for(var y = 0; y < jsonCriterios.criterios[i].listaOpcoes.length; y++){
            var novoInput = document.createElement("input");
            novoInput.setAttribute("type", "checkbox");
            novoInput.setAttribute("id","inputCriterio"+i+"_"+y);
            novoInput.setAttribute("name", "chkBoxCriterio");

            labelNovoInput = document.createElement("label");
            labelNovoInput.setAttribute("for", novoInput.id);
            labelNovoInput.innerHTML = jsonCriterios.criterios[i].listaOpcoes[y];

            divPai.appendChild(novoInput);
            divPai.appendChild(labelNovoInput);

            pularLinha = document.createElement("br");
            divPai.appendChild(pularLinha);
        }
        pularLinha = document.createElement("br");
        divPai.appendChild(pularLinha);
    }

}