//Desabilita os checkbox das alternativas que não estão com o radio "pai" selecionado
function filtrarAlternativasRadio(radioName) {

    //Por ter sido efetuado a mudança de radio todas elas são limpas, por isso deve ser validado novamente se as NAV's devem ser exibidas
    //Enquanto não for inserido o numero de selecoes corretas, não sera possivel continuar o calculo
    var navParAPar = document.getElementById('navParAPar');
    navParAPar.setAttribute("class", "w3-hide");
    var navTabelaResultado = document.getElementById('navTabelaResultado');
    navTabelaResultado.setAttribute("class", "w3-hide");

    //Verificando a existencia de um Par a Par já efetuado
    if (document.getElementById("tb_criterios") != null) {
        if (confirm("Já existe um Par a Par, esta ação irá excluir o Par a Par atual e você deverá gerar um novo.\n")) {
            document.getElementById("tabelasParaPar").innerHTML = "";
            document.getElementById("divTabelaResultado").innerHTML = "";
        }
        //Invertendo a ação do usuário, pois o mesmo cancelou a mudança de radio
        else {
            var radioElementList = document.getElementsByName(radioName);
            for (var i = 0; i < radioElementList.length; i++) {
                if (radioElementList[i].checked) {
                    //Obtem o radio que esta selecionado e a deseleciona deixando a anterior a mudança selecionada
                    radioSelecionado = radioElementList[i].value;
                    if (radioSelecionado == "Cluster") {
                        var cluster = document.getElementById("radioCluster");
                        cluster.checked = false;
                        var bairro = document.getElementById("radioBairro");
                        bairro.checked = true;
                    } else {
                        var cluster = document.getElementById("radioCluster");
                        cluster.checked = true;
                        var bairro = document.getElementById("radioBairro");
                        bairro.checked = false;
                    }
                    
                    //Habilitando novamente as NAV's pois o usuario cancelou a mudança
                    var navParAPar = document.getElementById('navParAPar');
                    navParAPar.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");
                    var navTabelaResultado = document.getElementById('navTabelaResultado');
                    navTabelaResultado.setAttribute("class", "w3-bar-item w3-button w3-hide-small w3-hover-white");

                    return;
                }
            }
        }
    }

    //DIV que contem a tabela critérios
    var divcriterios = document.getElementById("divcriterios");

    //Obtem uma lista de radios de acordo o o atributo name presente nele
    var radioElementList = document.getElementsByName(radioName);
    for (var i = 0; i < radioElementList.length; i++) {
        if (radioElementList[i].checked) {
            //Obtem o radio que esta selecionado, para ter seus "filhos" ativados
            radioSelecionado = radioElementList[i].value;

            //Exibindo a DIV que esta junto com o radio selecionado que contem os checkboxes
            var divCheckBoxDaRadioCluster = document.getElementById("divCheckBoxDaRadio" + radioSelecionado);
            divCheckBoxDaRadioCluster.removeAttribute("style");

            //Lista de todos os checkBox pertencentes ao radio obtido acima
            var listaFilhos = document.getElementsByName("chkBoxAlternativa" + radioSelecionado);
            for (var y = 0; y < listaFilhos.length; y++) {
                listaFilhos[y].removeAttribute("disabled");
            }
            var radioAnterior = document.getElementById("radioAnteriorAlternativa");
            radioAnterior.setAttribute("value", "radio" + radioElementList[i].value);
        }
        else {
            radioNaoSelecionado = radioElementList[i].value;
            //Lista de todos os checkBox pertencentes ao radio obtido acima
            var listaFilhos = document.getElementsByName("chkBoxAlternativa" + radioNaoSelecionado);
            for (var y = 0; y < listaFilhos.length; y++) {
                listaFilhos[y].checked = false;
                listaFilhos[y].disabled = true;
            }
            //Escondendo  a DIV que esta junto com o radio deselecionado que contem os checkboxes inativos
            var divCheckBoxDaRadioCluster = document.getElementById("divCheckBoxDaRadio" + radioNaoSelecionado);
            divCheckBoxDaRadioCluster.setAttribute("style", "display: none !important;");
        }
    }

}