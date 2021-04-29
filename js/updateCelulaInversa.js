function updateCelulaInversa(param) { //Passado como parametro a celula que deve ter o seu inverso alterado
			var selectOrigem = document.getElementById(param.id); //Obtendo o SELECT a ser trabalhado
			var valorOrigem = selectOrigem[selectOrigem.selectedIndex].value; //Obtendo o valor do option "selecionado" no SELECT
			var posicaoLC = selectOrigem.getAttribute("name"); //Obtendo a linha e coluna no parametro name do SELECT
			var linha = posicaoLC.charAt(1); //Obtendo do ID da celula a posicao da linha
			var coluna = posicaoLC.charAt(3); //Obtendo do ID da celula a posicao da coluna

			//Toda tabela tem um padrao de tb_NomeDaTabelaL1C1 (L1C1 sendo a posicao da celula)
			//Removendo o L1C1 do nome para poder obter o nome de qual tabela que esta celula esta presente
			var obterTbNome = selectOrigem.id.substring(0, selectOrigem.id.length-4);
			
			//Encontrando a celula destino de acordo com o nome da tabela + a posicao invertida do SELECT origem
			var selectDestino = document.getElementById(obterTbNome + "L" + coluna + "C" + linha);

			//Verificando se existe alguma opcao desabilitada no select (tanto origem quanto destino)
			//Se existir quer dizer que é resquicio de um calculo anterior, por isso deve ser removida
			if (selectOrigem.options[0].disabled) {
				selectOrigem.remove(0);
			}
			if (selectDestino.options[0].disabled) {
				selectDestino.remove(0);
			}

			//Criando o OPTION de resultado para ser atribuido ao SELECT destino
			var option = document.createElement("option");
			var valorCalculado = 1/valorOrigem;
			var valorCalculado = parseFloat(valorCalculado.toFixed(3)); //Limitando caracteres de resultado em centena

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