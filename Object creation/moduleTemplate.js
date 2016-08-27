/*Шаблон открытия модуль*/

<!--Сценарий для создания пространства имен-->

var App = App || {};

App.define = function (namespace) {
    var parts = namespace.split('.');
    var parent = App;
    var i;

    // убираем начальный префикс, если это имя глобальной переменной
    if (parts[0] == 'App') {
        parts = parts.slice(1);
    }
    // если в глобальном объекте нет свойства - создать его.
    for (i = 0; i < parts.length; i++) {
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {}
        }
        parent = parent[parts[i]];

    }
    // возвращаем ссылку на новосозданный объект, чтобы можно было сделать чейнинг (сразу присвоить или выполнить с объектом какое-то действие)
    return parent;
};

// Определяем пространство имен
App.define('main.calc');
//инициализируем объект используя немедленно вызываемую функцию
App.main.calc=(function () {
    //закрытые члены
    var x;
    function _setX(val) {
        x=val;
    }
    return{
        // Открытый доступ к определенным методам
        setX:_setX
    }
}());