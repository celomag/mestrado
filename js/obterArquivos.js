function obterCriterios(){
    var arquivoCriterios = JSON.parse(criterios);
    var objetoCriterios = arquivoCriterios[0];
    console.log(objetoCriterios);
    return objetoCriterios;
}

function obterAlternativas(){
    var arquivoAgrupamento = JSON.parse(alternativas);
    var objetoAgrupamento = arquivoAgrupamento[0];
    console.log(objetoAgrupamento);
    return objetoAgrupamento;
}