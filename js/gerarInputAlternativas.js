//divPai = Div onde deveria ser adicionado os inputs criados
//listaInputs = Lista JSON das alternativas;
function gerarInputAlternativas(divPai, jsonAlternativas){

    divCorpoAlternativa = divPai

    for(var i = 0; i < jsonAlternativas.alternativas.length; i++){
        //Criando uma div para ficar dentro da DIV "tabelaResultado"
        //Esta div devera conter todos os checkbox
        var divNova = document.createElement("div");
        divNova.setAttribute("id", "divRatio"+jsonAlternativas.alternativas[i].titulo);
        
        //Adicionando a DIV "divNova" na DIV pai "divCorpoAlternativa"
        divCorpoAlternativa.appendChild(divNova)
        
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

        divNova.appendChild(tipoAlternativa);
        divNova.appendChild(labelAlternativa);

        pularLinha = document.createElement("br");
        divNova.appendChild(pularLinha);

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

            divNova.appendChild(novoInput);
            divNova.appendChild(labelNovoInput);

            pularLinha = document.createElement("br");
            divNova.appendChild(pularLinha);
        }

        pularLinha = document.createElement("br");
        divNova.appendChild(pularLinha);

    }

}