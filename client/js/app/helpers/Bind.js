class Bind {
    /**
     * 
     * @param {*} model
     * @param {*} view 
     * @param {*} props rest param (semelhante ao spread operator) q nos permite passar de 1 a 'n' parametros
     */
    constructor(model, view, ...props) {
        // O nosso bind cria um proxy
        let proxy = ProxyFactory.create(model, props, model => view.update(model));

        // N primeira instancia já pedimos uma atualização para a view
        view.update(model);

        // Note que um construtor de BIND devolve um objeto do tipo PROXY - Em js isso é permitido
        return proxy;
    }
}