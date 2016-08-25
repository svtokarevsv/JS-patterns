// Исолированное пространство имен

// Шаблон изолированного пространства имен предоставляет каждому модулю окружение, изолированное от других модулей
function App() {
    // преобразовываем аргументы в массив
    var args = Array.prototype.slice.call(arguments);

    // функция обратного вызова, берем ее с конца аргументов, тк она всегда в конце будет
    var callback = args.pop();

    // имена модулей могут передаться как через запятую, так и в массиве, поэтому делаем проверку, в конце получаем массив
    var modules = (args[0] && typeof args[0] == 'string') ? args : args[0];

    // переменная для будущих итераций
    var i;

    // проверка, была ли функция вызвана через new
    if (!(this instanceof App)) {
        return new App(modules, callback);
    }

    //  простые свойства
    this.version = '1.0.0';
    this.productName = 'Isolated Namespace sample';

    //  если в значение modules передано значение * или никакое значение, то необходимо подключить все модули
    if (!modules || modules === '*') {
        modules = [];
        for (i in App.modules) {
            if (App.modules.hasOwnProperty(i)) {
                modules.push(i);
            }
        }
    }
    // инициализация всех необходимых модулей

    for (i = 0; i < modules.length; i++) {
        // каждый модуль представлен функцией
        App.modules[modules[i]](this);
    }
    callback(this);
}

// определение модулей.
App.modules = {}

// Модуль для работы с DOM
App.modules.dom = function (box) {
    box.getElement = function (e) { document.write("call to getElement with param " + e + "<br/>"); }
    box.create = function (e) { document.write("call to create with param " + e + "<br/>"); }
    box.setStyle = function () { document.write("call to getStyle<br/>"); }
    box.getStyle = function () { document.write("call to setStyle<br/>"); }
}

// Модуль для обратоки событий
App.modules.events = function (box) {
    box.addListener = function (elem, event) { document.write("call to addListener<br/>"); }
    box.removeListener = function (elem, event) { document.write("call to removeListener<br/>"); }
}

// Модуль для отправки AJAX запросов
App.modules.ajax = function (box) {
    box.sendRequest = function (data) { document.write("call to sendRequest with param " + data + "<br/>"); }
}

// Примеры инициализации пространств имен

// создание пространства имен, которое использует все модули ajax, events и dom
App(function (box) {
    var e = box.getElement("div1");
    box.addListener(e, "click");

    box.sendRequest("hello world");

    alert(box.productName + " " + box.version);
});
// создание пространства имен, которое использует модуль ajax
App("ajax", function (box) {
    box.sendRequest("request");
});