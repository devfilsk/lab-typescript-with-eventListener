//Listener interface é uma função. para deixar a chamada do "tipo function" mais elegante
interface ListenerInterface{
    ():void
}

class EventManager{
    //objeto de eventos
    // private listeners = {
    //     //Aqui são adicionados os eventos através do método addListener
    // };

    //declarando os tipos para o o objeto
    private listeners: { [eventName:string]:Array<ListenerInterface> } = {};

    //Adiciona "escuta" para os eventos passados para o método addListener
    //callable:{():void} declara que callable é do tipo função e seu retorno é void
    addListener(eventName:string, callable: ListenerInterface){
        //Se não houver evento criado, ele recebe um array
        if(!(this.listeners[eventName] instanceof Array)){
            this.listeners[eventName] = [];
        }
        //Adiciona o evento ao final do array e listeners
        this.listeners[eventName].push(callable);
    }

    //percorre o objeto de escutas e executa cada um dos eventos
    runEvent(eventName:string){
        for(let callable of this.listeners[eventName]){
            callable();
        }
    }
}

class BoxPostList{

    static boxID = 'box-post-list';
    static EVENT_CLICK_HIDDEN_BOX_LIST = 'box-post-list-click-hidden';
    private buttonFormSelector = `#${BoxPostList.boxID}>button[type=button]`;


    constructor(private eventManager:EventManager){
        this.init();
    }

    //podendo chamar eventos para os elementos
    private init(){
        const buttonList = document.querySelector(this.buttonFormSelector);
        buttonList.addEventListener('click', () => {
            this.hiddenForm();

            //Dispara o evento do eventManager no momento em que houver um click
            this.eventManager.runEvent(BoxPostList.EVENT_CLICK_HIDDEN_BOX_LIST);

            // const boxForm = document.getElementById(BoxPostForm.boxId);
            // boxForm.removeAttribute('style');
        });
        this.eventManager.addListener(BoxPostForm.EVENT_CLICK_HIDDEN_BOX_FORM, ()=> {
            this.showForm();
        });
    }

    hiddenForm(){
        const boxList = document.getElementById(BoxPostList.boxID);
        boxList.style.display = 'none';
    }
    //mostra o formulário
    showForm(){
        const boxList = document.getElementById(BoxPostList.boxID);
        boxList.removeAttribute('style');
    }
}

class BoxPostForm{

    static boxId = 'box-post-form';
    static EVENT_CLICK_HIDDEN_BOX_FORM = 'box-post-form-click-hidden';
    private buttonListSelector = `#${BoxPostForm.boxId}>button[type=button]`;

    constructor(private eventManager:EventManager){
        this.init();
    }

    private init(){
        const buttonForm= document.querySelector(this.buttonListSelector);
        buttonForm.addEventListener('click', () => {
            this.hiddenBox();

            // const boxList = document.getElementById(BoxPostList.boxID);
            // boxList.removeAttribute('style');
            this.eventManager.runEvent(BoxPostForm.EVENT_CLICK_HIDDEN_BOX_FORM)
        });
        this.eventManager.addListener(BoxPostList.EVENT_CLICK_HIDDEN_BOX_LIST, ()=> {
            this.showBox();
        });
        //Sempre que surgir um novo evento, adiciono o mesmo no array do eventManager
        this.eventManager.addListener('outro-evento', () => {
            //Faço outra coisa
        });
    }

    //esconde o box do formulário
    hiddenBox(){
        const boxForm = document.getElementById(BoxPostForm.boxId);
        boxForm.style.display = 'none';
    }

    //Mostra o box do formulário
    showBox(){
        const boxForm = document.getElementById('box-post-form');
        boxForm.removeAttribute('style');
    }
}

const eventManager = new EventManager();
new BoxPostForm(eventManager);
new BoxPostList(eventManager);