//Desabilita os checkbox das alternativas que não estão com o radio "pai" selecionado
function filtrarAlternativasRadio(radioName){

    //DIV que contem a tabela critérios
    var divcriterios = document.getElementById("divcriterios");

    //Validando se já existe a div obtida
    //Se existir deverá limpar as tabelas para mudar a alternativa
    if(typeof(divcriterios) != 'undefined' && divcriterios != null){
        if (confirm('Mudar a alternativa irá excluir as tabelas existentes, deseja continuar?')) {
            //DIV que contem todas as tabelas/divs das tabelas
            document.getElementById("tabelasParaPar").innerHTML = '';
        } else {
            var radioAnterior = document.getElementById("radioAnteriorAlternativa");
            var radioElementList = document.getElementsByName(radioName);
            for(var i = 0; i < radioElementList.length; i++){
                if(radioElementList[i].id == radioAnterior.value || radioAnterior.value == ''){
                    radioElementList[i].checked = true;
                    return;
                }
            }
        }
    }

    //Obtem uma lista de radios de acordo o o atributo name presente nele
    var radioElementList = document.getElementsByName(radioName);
    for(var i = 0; i < radioElementList.length; i++){
        if(radioElementList[i].checked){
            //Obtem o radio que esta selecionado, para ter seus "filhos" ativados
            radioSelecionado = radioElementList[i].value;
            //Lista de todos os checkBox pertencentes ao radio obtido acima
            var listaFilhos = document.getElementsByName("chkBoxAlternativa"+radioSelecionado);
            for(var y = 0; y < listaFilhos.length; y++){
                listaFilhos[y].removeAttribute("disabled");
            }
            var radioAnterior = document.getElementById("radioAnteriorAlternativa");
            radioAnterior.setAttribute("value", "radio"+radioElementList[i].value);
        }
        else {
            radioNaoSelecionado = radioElementList[i].value;
            //Lista de todos os checkBox pertencentes ao radio obtido acima
            var listaFilhos = document.getElementsByName("chkBoxAlternativa"+radioNaoSelecionado);
            for(var y = 0; y < listaFilhos.length; y++){
                listaFilhos[y].checked = false;
                listaFilhos[y].disabled = true;
            }
        }
    }

}