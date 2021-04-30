function obterCriterios(){
    var arquivoCriterios = JSON.parse(criterios);
    var objetoCriterios = arquivoCriterios[0];
    console.log(objetoCriterios);
    return objetoCriterios;
}

function obterAgrupamentos(){
    var arquivoAgrupamento = JSON.parse(agrupamento);
    var objetoAgrupamento = arquivoAgrupamento[0];
    console.log(objetoAgrupamento);
    return objetoAgrupamento;
}