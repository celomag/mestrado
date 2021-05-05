//divPai = Div onde deveria ser adicionado os inputs criados
//listaInputs = Lista JSON das alternativas;
function gerarInputAlternativas(divPai, jsonAlternativas){

    for(var i = 0; i < jsonAlternativas.alternativas.length; i++){
        var tipoAlternativa = document.createElement("input");
        tipoAlternativa.setAttribute("type", "radio");
        tipoAlternativa.setAttribute("id", "radio"+jsonAlternativas.alternativas[i].titulo);
        tipoAlternativa.setAttribute("value", jsonAlternativas.alternativas[i].titulo);
        tipoAlternativa.setAttribute("name", "radioAlternativas");
        if(i == 0){ //Deixa pré habilitado o primeiro radio
            tipoAlternativa.checked = true;
        }
        tipoAlternativa.setAttribute("onChange", "filtrarAlternativasRadio('"+ tipoAlternativa.name +"');");

        labelAlternativa = document.createElement("label");
        labelAlternativa.innerHTML = tipoAlternativa.value;
        labelAlternativa.setAttribute("id", "labelAlternativa"+jsonAlternativas.alternativas[i].titulo);
        labelAlternativa.setAttribute("class", "grupoAlternativa");
        labelAlternativa.setAttribute("for", tipoAlternativa.id);

        divPai.appendChild(tipoAlternativa);
        divPai.appendChild(labelAlternativa);

        pularLinha = document.createElement("br");
        divPai.appendChild(pularLinha);

        for(var y = 0; y < jsonAlternativas.alternativas[i].listaOpcoes.length ; y++){

            var novoInput = document.createElement("input");
            novoInput.setAttribute("type", "checkbox");
            novoInput.setAttribute("id","inputAlternativa"+i+"_"+y);
            novoInput.setAttribute("name", "chkBoxAlternativa"+jsonAlternativas.alternativas[i].titulo);
            if(i != 0){ //Deixa pré desabilitado por nao ser pertencente ao primeiro radio
                novoInput.disabled = true;
            }

            labelNovoInput = document.createElement("label");
            labelNovoInput.setAttribute("for", novoInput.id);
            labelNovoInput.innerHTML = jsonAlternativas.alternativas[i].listaOpcoes[y];

            divPai.appendChild(novoInput);
            divPai.appendChild(labelNovoInput);

            pularLinha = document.createElement("br");
            divPai.appendChild(pularLinha);
        }

        pularLinha = document.createElement("br");
        divPai.appendChild(pularLinha);

    }

}