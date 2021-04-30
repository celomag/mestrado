//divPai = Div onde deveria ser adicionado os inputs criados
//radioPai = Caso a selecao deva pertencer a algum radio, informar o radio
//type = Tipo do input
//nome = sera utilizado para criacao do id/value/name do input
//listaInputs = Lista dos inputs a serem criados, ex: ['Rio de Janeiro', 'Curitiba', 'Sao Paulo'];
function gerarInput(divPai, radioPai, type, nome, listaInputs){

    listaInputs = ['Rio de Janeiro', 'Curitiba', 'Sao Paulo'];

    //Verificando a lista qual dos radios esta selecionado para ser trabalho
    for(var i = 0; i < radioPai.length; i++){
        if(radioPai[i].checked){
            radioPai = radioPai[i].value;
        }
    }

    var labelTitulo = document.createElement("label");
    labelTitulo.setAttribute("class", "labelTitulo");
    labelTitulo.innerHTML = radioPai;

    divPai.appendChild(labelTitulo);

    for(var i = 0; i<listaInputs.length; i++){
        var novoInput = document.createElement("input");
        novoInput.setAttribute("type", type);

        var novoLabel = document.createElement("label");
        
        //Verifica se existe um radio para as checkbox a serem criadas
        //Se existir ele vai atribuir cada checkbox como pertencentes a um só radio
        if(typeof(radioPai) != 'undefined' && radioPai != null){
            novoInput.setAttribute("id", radioPai+i);
            novoInput.setAttribute("value", radioPai+i);
            novoInput.setAttribute("name", type+radioPai);
            novoLabel.setAttribute("for", radioPai+i);
            novoLabel.innerHTML = listaInputs[i];
        } else{ 
            //Quando é uma lista de checkbox porem sem pertencer a nenhum radio
            //por isto precisa de um nome para vincular todos os checkbox para esta mesma lista
            novoInput.setAttribute("id", nome+i);
            novoInput.setAttribute("value", nome+i);
            novoInput.setAttribute("name", nome);
            novoLabel.setAttribute("for", nome+i);
            novoLabel.innerHTML = listaInputs[i];
        }
        divPai.appendChild(novoInput);
        divPai.appendChild(novoLabel);
    }

}