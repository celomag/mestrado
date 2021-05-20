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
            novoInput.setAttribute("id","inputAlternativa"+i+"_"+y); //i = numero da alternativa (sequencia do ratio) y = numero do imput daquele ratio
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

function gerarInputAlternativaClusterXLSX(jsonAlternativasXLSX){
    var divRatioCluster = document.getElementById("divRatioCluster")
    var radioCluster = document.getElementById("radioCluster");
    var labelRadioCluster = document.getElementById("labelAlternativaCluster");
    radioCluster.checked = true
    divRatioCluster.innerHTML = "";

    divRatioCluster.appendChild(radioCluster);
    divRatioCluster.appendChild(labelRadioCluster);

    pularLinha = document.createElement("br");
    divRatioCluster.appendChild(pularLinha);

    //Ordenando do menor cluster para o maior
    // jsonAlternativasXLSX.sort(function(a, b) {
    //     return ((a.cluster < b.cluster) ? -1 : ((a.cluster == b.cluster) ? 0 : 1));
    // });

    //Encontrando a quantidade de clusters (maior valor de cluster)
    var numeroDeClusters = Math.max.apply(Math,jsonAlternativasXLSX.map(function(o){return o.cluster;}))

    var ClusterBairro = []; //Vetor que ira conter numero do cluster e respectivos bairros

    //Criando a lista de cluster com uma lista de bairro vazia em cada
    for (var i = 0; i < numeroDeClusters; i++) {
        ClusterBairro.push({cluster: i+1, bairros: listaBairro = []});
    }

    //Adicionando cada bairro ao seu respectivo cluster
    for(var i = 0; i < jsonAlternativasXLSX.length ; i++){
        var cluster = jsonAlternativasXLSX[i].cluster
        var bairro = jsonAlternativasXLSX[i].Nome
        ClusterBairro[cluster-1].bairros.push(bairro) //-1 vetor inicia em 0
    }

    for(var y = 1; y <= ClusterBairro.length ; y++){

        var novoInput = document.createElement("input");
        novoInput.setAttribute("type", "checkbox");
        novoInput.setAttribute("id","inputAlternativa0_"+y); //0 pois o cluster sempre é o primeiro na lista de alternativas
        novoInput.setAttribute("name", "chkBoxAlternativaCluster"); //Cluster pois é o nome da alternativa que esta sendo alterada os checkboxes

        labelNovoInput = document.createElement("label");
        labelNovoInput.setAttribute("for", novoInput.id);
        labelNovoInput.innerHTML = "Cluster "+ y + " XLSX"; //Adicionado manualmente o nome "Cluster" por se tratar de ser uma funcao voltada pra cluster

        divRatioCluster.appendChild(novoInput);
        divRatioCluster.appendChild(labelNovoInput);

        pularLinha = document.createElement("br");
        divRatioCluster.appendChild(pularLinha);
    }

    mostrarClusterBairros(ClusterBairro)

}

//Metodo para teste
function mostrarClusterBairros(ClusterBairro){
    textArea = document.getElementById("textareaId")

    for(var i = 0; i < ClusterBairro.length; i++){
        textArea.value += "Cluster " + ClusterBairro[i].cluster + '\r\n';
        textArea.value += "(";
        for (var x = 0; x < ClusterBairro[i].bairros.length; x++){
            textArea.value += ClusterBairro[i].bairros[x] + ", ";
        }
        textArea.value += ")" + '\r\n';
    }
    
}