var EventManager = /** @class */ (function () {
    function EventManager() {
        //objeto de eventos
        // private listeners = {
        //     //Aqui são adicionados os eventos através do método addListener
        // };
        //declarando os tipos para o o objeto
        this.listeners = {};
    }
    //Adiciona "escuta" para os eventos passados para o método addListener
    //callable:{():void} declara que callable é do tipo função e seu retorno é void
    EventManager.prototype.addListener = function (eventName, callable) {
        //Se não houver evento criado, ele recebe um array
        if (!(this.listeners[eventName] instanceof Array)) {
            this.listeners[eventName] = [];
        }
        //Adiciona o evento ao final do array e listeners
        this.listeners[eventName].push(callable);
    };
    //percorre o objeto de escutas e executa cada um dos eventos
    EventManager.prototype.runEvent = function (eventName) {
        for (var _i = 0, _a = this.listeners[eventName]; _i < _a.length; _i++) {
            var callable = _a[_i];
            callable();
        }
    };
    return EventManager;
}());
var BoxPostList = /** @class */ (function () {
    function BoxPostList(eventManager) {
        this.eventManager = eventManager;
        this.buttonFormSelector = "#" + BoxPostList.boxID + ">button[type=button]";
        this.init();
    }
    //podendo chamar eventos para os elementos
    BoxPostList.prototype.init = function () {
        var _this = this;
        var buttonList = document.querySelector(this.buttonFormSelector);
        buttonList.addEventListener('click', function () {
            _this.hiddenForm();
            //Dispara o evento do eventManager no momento em que houver um click
            _this.eventManager.runEvent(BoxPostList.EVENT_CLICK_HIDDEN_BOX_LIST);
            // const boxForm = document.getElementById(BoxPostForm.boxId);
            // boxForm.removeAttribute('style');
        });
        this.eventManager.addListener(BoxPostForm.EVENT_CLICK_HIDDEN_BOX_FORM, function () {
            _this.showForm();
        });
    };
    BoxPostList.prototype.hiddenForm = function () {
        var boxList = document.getElementById(BoxPostList.boxID);
        boxList.style.display = 'none';
    };
    //mostra o formulário
    BoxPostList.prototype.showForm = function () {
        var boxList = document.getElementById(BoxPostList.boxID);
        boxList.removeAttribute('style');
    };
    BoxPostList.boxID = 'box-post-list';
    BoxPostList.EVENT_CLICK_HIDDEN_BOX_LIST = 'box-post-list-click-hidden';
    return BoxPostList;
}());
var BoxPostForm = /** @class */ (function () {
    function BoxPostForm(eventManager) {
        this.eventManager = eventManager;
        this.buttonListSelector = "#" + BoxPostForm.boxId + ">button[type=button]";
        this.init();
    }
    BoxPostForm.prototype.init = function () {
        var _this = this;
        var buttonForm = document.querySelector(this.buttonListSelector);
        buttonForm.addEventListener('click', function () {
            _this.hiddenBox();
            // const boxList = document.getElementById(BoxPostList.boxID);
            // boxList.removeAttribute('style');
            _this.eventManager.runEvent(BoxPostForm.EVENT_CLICK_HIDDEN_BOX_FORM);
        });
        this.eventManager.addListener(BoxPostList.EVENT_CLICK_HIDDEN_BOX_LIST, function () {
            _this.showBox();
        });
        //Sempre que surgir um novo evento, adiciono o mesmo no array do eventManager
        this.eventManager.addListener('outro-evento', function () {
            //Faço outra coisa
        });
    };
    //esconde o box do formulário
    BoxPostForm.prototype.hiddenBox = function () {
        var boxForm = document.getElementById(BoxPostForm.boxId);
        boxForm.style.display = 'none';
    };
    //Mostra o box do formulário
    BoxPostForm.prototype.showBox = function () {
        var boxForm = document.getElementById('box-post-form');
        boxForm.removeAttribute('style');
    };
    BoxPostForm.boxId = 'box-post-form';
    BoxPostForm.EVENT_CLICK_HIDDEN_BOX_FORM = 'box-post-form-click-hidden';
    return BoxPostForm;
}());
var eventManager = new EventManager();
new BoxPostForm(eventManager);
new BoxPostList(eventManager);
//# sourceMappingURL=posts.js.map