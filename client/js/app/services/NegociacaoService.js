class NegociacaoService {

    constructor() {
        this._httpService = new HttpService();
    }

    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                })
                .catch(error => {
                    console.log(error);
                    reject('Não foi possível obter as negociações da semana.');
                });
        });
    }

    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                })
                .catch(error => {
                    console.log(error);
                    reject('Não foi possível obter as negociações da semana anterior.');
                });
        });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                })
                .catch(error => {
                    console.log(error);
                    reject('Não foi possível obter as negociações da semana retrasada.');
                });
        });
    }

}