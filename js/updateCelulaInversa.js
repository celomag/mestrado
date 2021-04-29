function updateCelulaInversa(param) {
			var selectOrigem = document.getElementById(param.id);
			var valorOrigem = selectOrigem[selectOrigem.selectedIndex].value;
			var posicaoLC = selectOrigem.getAttribute("name");
			var linha = posicaoLC.charAt(1);
			var coluna = posicaoLC.charAt(3);

			var obterTbNome = selectOrigem.id.substring(0, selectOrigem.id.length-4);

			var selectDestino = document.getElementById(obterTbNome + "L" + coluna + "C" + linha);

			for (i = 0; i < selectDestino.length; ++i){
				if (selectOrigem.options[i].disabled) {
					selectOrigem.remove(i);
				}
				if (selectDestino.options[i].disabled) {
					selectDestino.remove(i);
				}
				if (selectDestino.options[i].value == 1/valorOrigem){
					selectDestino.options[i].selected = true;
					return //BUG DE COR, CORRIGIR
				}
				if(i+1 == selectDestino.length){
					var option = document.createElement("option");

					var valorCalculado = 1/valorOrigem;
					var valorCalculado = parseFloat(valorCalculado.toFixed(3));

					var t = document.createTextNode(valorCalculado);
					option.disabled = true;
					option.selected = true;
					option.appendChild(t);

					//option.style.color = "#004d1a";
					//option.style.backgroundColor = "#33cc33";

					selectDestino.prepend(option);
					
					selectDestino.style.color = "#004d1a";
					selectDestino.style.backgroundColor = "#33cc33";

					selectOrigem.style.color = "#002966";
					selectOrigem.style.backgroundColor = "#66a3ff";
					return
				}
			}

		}