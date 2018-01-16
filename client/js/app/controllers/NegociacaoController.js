class NegociacaoController {

    constructor() {
        // Simulando um jQuery
        let $ = document.querySelector.bind(document);

        // Obtendo os campos da tela
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        // Fazendo os bindings
        // Criamos uma associação entre um modelo, uma view e as ações que acionarão a atualização da view
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia'
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

        // Padrão 'Error First'
        negociacaoService.obterNegociacoesDaSemana((err, negociacoes) => {
            if (err) {
                this._mensagem.texto = err;
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

            this._mensagem.texto = "Negociações importadas com sucesso.";
        });
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
}