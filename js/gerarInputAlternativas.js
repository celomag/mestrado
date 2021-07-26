//divPai = Div onde deveria ser adicionado os inputs criados
//listaInputs = Lista JSON das alternativas;
function gerarInputAlternativas(divPai, jsonAlternativas) {

    divCorpoAlternativa = divPai

    for (var i = 0; i < jsonAlternativas.alternativas.length; i++) {
        //Criando uma div para ficar dentro da DIV "tabelaResultado"
        //Esta div devera conter todos os checkbox
        var divNova = document.createElement("div");
        divNova.setAttribute("id", "divRatio" + jsonAlternativas.alternativas[i].titulo);

        //Adicionando a DIV "divNova" na DIV pai "divCorpoAlternativa"
        divCorpoAlternativa.appendChild(divNova)

        var tipoAlternativa = document.createElement("input");
        tipoAlternativa.setAttribute("type", "radio");
        tipoAlternativa.setAttribute("id", "radio" + jsonAlternativas.alternativas[i].titulo);
        tipoAlternativa.setAttribute("value", jsonAlternativas.alternativas[i].titulo);
        tipoAlternativa.setAttribute("name", "radioAlternativas");
        if (i == 0) { //Deixa pré habilitado o primeiro radio
            tipoAlternativa.checked = true;
        }
        tipoAlternativa.setAttribute("onChange", "filtrarAlternativasRadio('" + tipoAlternativa.name + "');");

        labelAlternativa = document.createElement("label");
        labelAlternativa.innerHTML = tipoAlternativa.value;
        labelAlternativa.setAttribute("id", "labelAlternativa" + jsonAlternativas.alternativas[i].titulo);
        labelAlternativa.setAttribute("class", "grupoAlternativa");
        labelAlternativa.setAttribute("for", tipoAlternativa.id);

        divNova.appendChild(tipoAlternativa);
        divNova.appendChild(labelAlternativa);

        pularLinha = document.createElement("br");
        divNova.appendChild(pularLinha);

        //DIV contendo apenas os checkbox
        var divPaiDasCheckBox = document.createElement("div");
        divPaiDasCheckBox.setAttribute("id", "divCheckBoxDaRadio" + jsonAlternativas.alternativas[i].titulo);
        divNova.appendChild(divPaiDasCheckBox);

        for (var y = 0; y < jsonAlternativas.alternativas[i].listaOpcoes.length; y++) {

            var novoInput = document.createElement("input");
            novoInput.setAttribute("type", "checkbox");
            novoInput.setAttribute("id", "inputAlternativa" + i + "_" + y); //i = numero da alternativa (sequencia do ratio) y = numero do imput daquele ratio
            novoInput.setAttribute("name", "chkBoxAlternativa" + jsonAlternativas.alternativas[i].titulo);
            novoInput.setAttribute("onclick", "validarNavAlternativa(" + novoInput.getAttribute("id") + ");");

            if (i != 0) { //Deixa pré desabilitado por nao ser pertencente ao primeiro radio
                novoInput.disabled = true;
            }

            labelNovoInput = document.createElement("label");
            labelNovoInput.setAttribute("for", novoInput.id);
            labelNovoInput.innerHTML = jsonAlternativas.alternativas[i].listaOpcoes[y];

            divPaiDasCheckBox.appendChild(novoInput);
            divPaiDasCheckBox.appendChild(labelNovoInput);

            pularLinha = document.createElement("br");
            divPaiDasCheckBox.appendChild(pularLinha);
        }

        pularLinha = document.createElement("br");
        divPaiDasCheckBox.appendChild(pularLinha);

    }

    //Escondendo  a DIV que ja vem desabilitada por padrão
    var divCheckBoxDaRadioCluster = document.getElementById("divCheckBoxDaRadioBairro"); //HARDCODE utilizando o nome da DIV diretamente
    divCheckBoxDaRadioCluster.setAttribute("style", "display: none !important;");

}

function gerarInputAlternativaClusterXLSX(jsonAlternativasXLSX) {

    if (typeof jsonAlternativasXLSX[0].Bairro === 'undefined') {
        alert("Arquivo com cabeçalho incorreto!\nEsperado cabeçalho com valor: Bairro\nAVISO: O cabeçalho DEVE de ser escrito EXATAMENTE como informado acima.")
        return
    }

    if (typeof jsonAlternativasXLSX[0].cluster === 'undefined') {
        alert("Arquivo com cabeçalho incorreto!\nEsperado cabeçalho com valor: cluster\nAVISO: O cabeçalho DEVE de ser escrito EXATAMENTE como informado acima.")
        return
    }

    var divRatioCluster = document.getElementById("divRatioCluster")
    var radioCluster = document.getElementById("radioCluster");
    var labelRadioCluster = document.getElementById("labelAlternativaCluster");
    radioCluster.checked = true
    divRatioCluster.innerHTML = "";

    divRatioCluster.appendChild(radioCluster);
    divRatioCluster.appendChild(labelRadioCluster);

    pularLinha = document.createElement("br");
    divRatioCluster.appendChild(pularLinha);

    //DIV contendo apenas os checkbox
    var divPaiDasCheckBox = document.createElement("div");
    divPaiDasCheckBox.setAttribute("id", "divCheckBoxDaRadioCluster");
    divRatioCluster.appendChild(divPaiDasCheckBox);

    //Ordenando do menor cluster para o maior
    // jsonAlternativasXLSX.sort(function(a, b) {
    //     return ((a.cluster < b.cluster) ? -1 : ((a.cluster == b.cluster) ? 0 : 1));
    // });

    //Encontrando a quantidade de clusters (maior valor de cluster)
    var numeroDeClusters = Math.max.apply(Math, jsonAlternativasXLSX.map(function (o) { return o.cluster; }))

    var ClusterBairro = []; //Vetor que ira conter numero do cluster e respectivos bairros

    //Criando a lista de cluster com uma lista de bairro vazia em cada
    for (var i = 0; i < numeroDeClusters; i++) {
        ClusterBairro.push({ cluster: i + 1, bairros: listaBairro = [] });
    }

    //Adicionando cada bairro ao seu respectivo cluster
    for (var i = 0; i < jsonAlternativasXLSX.length; i++) {
        var cluster = jsonAlternativasXLSX[i].cluster
        var bairro = jsonAlternativasXLSX[i].Bairro
        ClusterBairro[cluster - 1].bairros.push(bairro) //-1 vetor inicia em 0
    }

    for (var y = 1; y <= ClusterBairro.length; y++) {

        var novoInput = document.createElement("input");
        novoInput.setAttribute("type", "checkbox");
        novoInput.setAttribute("id", "inputAlternativa0_" + y); //0 pois o cluster sempre é o primeiro na lista de alternativas
        novoInput.setAttribute("name", "chkBoxAlternativaCluster"); //Cluster pois é o nome da alternativa que esta sendo alterada os checkboxes
        novoInput.setAttribute("onclick", "validarNavAlternativa(" + novoInput.getAttribute("id") + ");");

        labelNovoInput = document.createElement("label");
        labelNovoInput.setAttribute("for", novoInput.id);
        labelNovoInput.innerHTML = "Cluster " + y; //Adicionado manualmente o nome "Cluster" por se tratar de ser uma funcao voltada pra cluster

        divPaiDasCheckBox.appendChild(novoInput);
        divPaiDasCheckBox.appendChild(labelNovoInput);

        pularLinha = document.createElement("br");
        divPaiDasCheckBox.appendChild(pularLinha);
    }

    mostrarClusterBairros(ClusterBairro)

}

//Metodo para teste
//Adicionando os valores dos Clusters e seus respesctivos bairros em um textArea
function mostrarClusterBairros(ClusterBairro) {
    var textArea = document.getElementById("textareaId")
    textArea.value = null;
    for (var i = 0; i < ClusterBairro.length; i++) {
        textArea.value += "Cluster " + ClusterBairro[i].cluster + '\r\n';
        textArea.value += "(";
        for (var x = 0; x < ClusterBairro[i].bairros.length; x++) {
            if ((x + 1) != ClusterBairro[i].bairros.length) {
                textArea.value += ClusterBairro[i].bairros[x] + ", ";
            } else {
                textArea.value += ClusterBairro[i].bairros[x];
            }
        }
        textArea.value += ")";
        if ((i + 1) != ClusterBairro.length) {
            textArea.value += '\n\n';
        }
    }

}