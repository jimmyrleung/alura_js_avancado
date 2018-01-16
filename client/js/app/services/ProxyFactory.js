class ProxyFactory {
    /**
     * 
     * @param {*} objeto Objeto a ser colocado dentro do proxy
     * @param {*} props Propriedades que queremos interceptar
     * @param {*} acao Ação que queremos executar
     */
    static create(objeto, props, acao) {
        return new Proxy(objeto, {
            get: function (target, prop, receiver) {

                if (props.includes(prop) && ProxyFactory.isFunction(target[prop])) {

                    return function () {
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }
                // Se não for uma função, faz o caminho natural
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                if (props.includes(prop)) {
                    target[prop] = value;
                    acao(target);
                }

                return Reflect.set(target, prop, value, receiver);
            }
        });
    };

    static isFunction(func) {
        return typeof (func) == typeof (Function);
    };
}