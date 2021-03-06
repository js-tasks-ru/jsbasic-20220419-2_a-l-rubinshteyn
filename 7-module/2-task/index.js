import createElement from '../../assets/lib/create-element.js';

export default class Modal {
 

  constructor() {
    this.elem = createElement(`
     <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>

      <div class="modal__body">
      </div>
    </div>

  </div>`);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    document.querySelector('.modal__close').addEventListener('click', this.close);
    document.addEventListener('keydown', this.close);

  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').innerText = title;
  }

  setBody(bodyElement) {
    let body = this.elem.querySelector('.modal__body');
    body.innerHTML = '';
    body.append(bodyElement);
  }

  close(ev) {

    if (ev && ev instanceof KeyboardEvent && ev.code !== 'Escape') return;

    document.body.classList.remove('is-modal-open');

    let modal = document.querySelector('.modal');

    //похоже тест запускает вызов close подряд дважды, поэтому получаю всегда ошибку modal null в этом месте
    if (modal !== null) modal.remove();
  
    document.removeEventListener('keydown', close);
  }
}
