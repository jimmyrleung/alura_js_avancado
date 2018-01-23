class NegociacaoController {

    constructor() {
        // Simulando um jQuery
        let $ = document.querySelector.bind(document);

        // Obtendo os campos da tela
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

        // Fazendo os bindings
        // Criamos uma associação entre um modelo, uma view e as ações que acionarão a atualização da view
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
        );

        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')), 'texto'
        );
    }

    esvazia() {
        this._listaNegociacoes.esvazia();
    }

    adiciona(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = 'Negociação adicionada com sucesso';

        this._limpaFormulario();
    }

    importaNegociacoes() {
        let negociacaoService = new NegociacaoService();

        // Colocamos as promises na ordem que devem ser executadas
        // precisa ser a chamada da promise e não somente a função
        Promise.all([
            negociacaoService.obterNegociacoesDaSemana(),
            negociacaoService.obterNegociacoesDaSemanaAnterior(),
            negociacaoService.obterNegociacoesDaSemanaRetrasada()
        ]).then((arrayDeArraysDeNegociacoes) => { // Recebemos Um array com 3 arrays dentro (um pra cada promise resolvida)
            arrayDeArraysDeNegociacoes
                .reduce((arrayDeNegociacoes, array) => arrayDeNegociacoes.concat(array), []) // Utilizamos a reduce para concatenar os 3 arrays em um só
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

            this._mensagem.texto = 'Negociações importadas com sucesso';

        });
        //.catch(error => this._mensagem.texto = error);
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    ordena(coluna) {
        if (this._ordemAtual === coluna) {
            this._listaNegociacoes.inverteOrdem();
        }
        else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}