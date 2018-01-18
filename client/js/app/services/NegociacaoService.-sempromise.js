class NegociacaoService {
    obterNegociacoesDaSemana(callback) {
        // xhr = xml http request
        let xhr = new XMLHttpRequest();

        // Abrir um novo endereço (Apenas prepara, não executa)
        // Como o endereço do servidor que fornece as páginas e os dados é o mesmo, especificamos somente o complemento
        xhr.open('GET', 'negociacoes/semana');

        // Configurações do ajax
        // O ajax passa por diversos estados e podemos configurar esses diversos estados

        // Essa função é disparada sempre que houver mudança de estado (por exemplo, quando uma req é disparada)
        xhr.onreadystatechange = () => {
            // Estados da requisição:

            // 0: requisição ainda não iniciada

            // 1: conexão com o servidor estabelecida

            // 2: requisição recebida

            // 3: processando requisição

            // 4: requisição está concluída e a resposta está pronta

            // Verificamos o status pois um erro tratado pelo servidor é uma resposta pronta e requisição concluída
            // o xhr.responseText será populado caso a requisição seja concluída (com nosso resultado ou com o erro)
            //// O responseText, mesmo que seja um JSON, virá em forma de texto e necessita ser 'parseado'
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log("Obtendo as negociações do servidor...");

                    // Se der certo, chama a callback com 'err' nulo e as negociações
                    callback(
                        null, // err
                        JSON.parse(xhr.responseText).map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)) // negociacoes
                    );
                }
                else {
                    // Se der errado, chama a callback passando uma mensagem de erro
                    console.log(xhr.responseText);
                    callback("Não foi possível obter as negociações.");
                }
            }

        }

        // Envia de fato a requisição
        xhr.send();
    }
}