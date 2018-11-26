class EventManager{
    private listeners = {
        //Aqui são adicionados os eventos através do método addListener
    };

    //Adiciona "escuta" para os eventos passados para o método addListener
    addListener(eventName, callable){
        //Se não houver evento criado, ele recebe um array
        if(!(this.listeners[eventName] instanceof Array)){
            this.listeners[eventName] = [];
        }
        //Adiciona o evento ao final do array e listeners
        this.listeners[eventName].push(callable);
    }

    //percorre o objeto de escutas e executa cada um dos eventos
    runEvent(eventName){
        for(let callable of this.listeners[eventName]){
            callable();
        }
    }
}

class BoxPostList{

    static boxID = 'box-post-list';
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
            this.eventManager.runEvent('box-post-list-click-hidden');

            // const boxForm = document.getElementById(BoxPostForm.boxId);
            // boxForm.removeAttribute('style');
        })
        this.eventManager.addListener('box-post-form-click-hidden', ()=> {
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
            this.eventManager.runEvent('box-post-form-click-hidden')
        });
        this.eventManager.addListener('box-post-list-click-hidden', ()=> {
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