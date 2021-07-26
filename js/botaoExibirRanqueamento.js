function exibirCalculosRanqueamento() {
    var divCalculo = document.getElementById("divCalculo");
    if (document.getElementById("divCalculo") != null) {

        var style = divCalculo.getAttribute("style")
        var botaoCalculo = document.getElementById("botaoCalculo");
        botaoCalculo.setAttribute("value", "Clique para ocultar os cálculos");

        if (style == null) {
            divCalculo.setAttribute("style", "display: none !important;");
            botaoCalculo.setAttribute("value", "Clique para exibir os cálculos");
        } else {
            divCalculo.removeAttribute("style");
            botaoCalculo.setAttribute("value", "Clique para ocultar os cálculos");
            
        }

    }
    
}