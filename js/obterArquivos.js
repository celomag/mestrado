function obterCriterios(){
    var arquivoCriterios = JSON.parse(criterios);
    var objetoCriterios = arquivoCriterios[0];
    return objetoCriterios;
}

function obterAlternativas(){
    var arquivoAgrupamento = JSON.parse(alternativas);
    var objetoAgrupamento = arquivoAgrupamento[0];
    return objetoAgrupamento;
}