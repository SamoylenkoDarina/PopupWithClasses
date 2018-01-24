class Popup {
   constructor(title, text, color) {
       this.color = color;
       this.text = text;
       this.title = title;
       this.togglePopup = this.togglePopup.bind(this);
       this.createPopup();
   }
   createPopup() {
       let popupElement = document.createElement('div');
       popupElement.classList.add('popup');
       popupElement.classList.add('backdrop');       

       let popupCont = document.createElement('div');
       popupCont.classList.add('popup-content');
       popupCont.style.background = this.color;
       popupElement.appendChild(popupCont);

       let popupTitle = document.createElement('div');
       popupTitle.classList.add('popup-title');
       popupCont.appendChild(popupTitle);

       let h2Element = document.createElement('h2');
       h2Element.innerText = this.title;
       popupTitle.appendChild(h2Element);

       let popupBody = document.createElement('div');
       popupBody.classList.add('popup-body');
       popupBody.innerText = this.text;
       popupCont.appendChild(popupBody);

       let popupActions = document.createElement('div');
       popupActions.classList.add('popup-actions');
       popupCont.appendChild(popupActions);

       let closeBtn = document.createElement('button');
       closeBtn.classList.add('green-btn');
       closeBtn.innerText = 'close me, please';
       popupActions.appendChild(closeBtn);

       let body = document.querySelector('body');
       body.appendChild(popupElement);

       this.popupElement = popupElement; 
       closeBtn.addEventListener('click', this.togglePopup);
       popupElement.addEventListener('click', this.togglePopup);
       
   }
   togglePopup(e) {
       e.preventDefault();
       if(event.target.className.indexOf('green-btn') !== -1 || event.target.className.indexOf('openPopupBtn') !== -1 || event.target.className.indexOf('backdrop') !== -1) {
            event.stopPropagation();
            this.popupElement.classList.toggle('active')  
        } 
   }
}

class PopupCreator {
    constructor(formId) {
        this.form = document.querySelector('#popup-form');
        this.processFormSubmit = this.processFormSubmit.bind(this);
        this.form.addEventListener('submit', this.processFormSubmit);
        console.log(this.form);
    }
    processFormSubmit(e) {
        e.preventDefault();
        this.collectPopupData(e);
        if (!this.formData.popupTitle || !this.formData.popupText || !this.formData.popupColor || !this.formData.popupBtnName) {
            alert('Введите все данные!');
            return;
        }
        this.createPopup();
        this.createPopupBtn();
        console.log(this.formData);    
    }
    collectPopupData(e) {
        this.formData = {};
        let formElements = e.target.elements;
        for (let i = 0; i < formElements.length; i++) {
            let formElement = formElements[i];
            if (formElement.name) {
                this.formData[formElement.name] = formElement.value;
            }
        }
    }
    createPopup() {
        this.popup = new Popup (this.formData.popupTitle, this.formData.popupText, this.formData.popupColor);
    }
    createPopupBtn() {
        if (this.openBtn) {
            this.openBtn.removeEventListener('click', this.popup.togglePopup);
            this.openBtn.remove();
        }
        this.openBtn = document.createElement('button');           
        this.openBtn.addEventListener('click', this.popup.togglePopup);
        this.openBtn.classList.add('openPopupBtn');
        this.form.appendChild(this.openBtn);
        this.openBtn.innerText = this.formData.popupBtnName; 
    }
}

let newPopup = new PopupCreator('popup-form');