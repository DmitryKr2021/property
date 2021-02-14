document.addEventListener('DOMContentLoaded', function () {

   //Показать еще карточки
   const viewMore = document.querySelector('.view-more');
   viewMore.addEventListener('click', () => {
      let newCards = document.querySelectorAll('.card-hidden');
      for (let elem of newCards) {
         elem.classList.remove('card-hidden');
      }
   });


   //Расцветка таблицы
   const cells = document.querySelectorAll('.tr>td');
   let chooseDist = new Set(); //выбранные расстояния до метро

   for (let cell of cells) {
      cell.onmouseover = function () {
         if (this.getAttribute('back') == 'medium') {
            this.setAttribute('back', 'dark');
         } else {
            this.setAttribute('back', 'light');
         }
      };

      cell.onmouseout = function () {
         if (this.getAttribute('back') == 'dark') {
            this.setAttribute('back', 'medium');
         } else {
            this.setAttribute('back', 'no');
         }
      };

      cell.onmouseup = function () {
         if (this.getAttribute('back') == 'dark') {
            this.setAttribute('back', 'light');
            chooseDist.delete('any');
            chooseDist.delete(this.getAttribute('distance'));
         } else {
            this.setAttribute('back', 'dark');
            chooseDist.delete('any');
            chooseDist.add(this.getAttribute('distance'));
         }

         if (this.getAttribute('distance') == 'any') {
            chooseDist.clear();
            chooseDist.add('any');
         }
         //Активируем кнопку применения фильтров, если выбрано 
         if (chooseDate !== undefined) {
            filtersUse.removeAttribute('disabled');
         }
         //  }

         if (this.classList.contains('bottom')) {
            let td_top = document.querySelectorAll('.top');
            for (cell of td_top) {
               cell.setAttribute('back', 'no');
            }
         }

         if (this.classList.contains('top')) {
            let td_bottom = document.querySelector('.bottom');
            td_bottom.setAttribute('back', 'no');
         }
      };
   }

   //Показать/скрыть опции
   const title_ = document.querySelectorAll('.choose__title');
   for (let elem of title_) {
      elem.onclick = function () {
         let img_ = this.querySelector('.chevron');
         img_.classList.toggle('img-scale');
         let hide_ = this.nextElementSibling;
         hide_.classList.toggle('to-hide-active');
      };
   }

   //Дополнительные опции показать/скрыть
   const show = document.querySelector('.show');
   let hidden = document.querySelectorAll('.hidden');
   show.onclick = function () {
      for (let hid of hidden) {
         hid.classList.remove('hidden');
      }
      show.classList.add('hidden');
   };

   const toHid = document.querySelector('#p');
   toHid.onclick = function () {
      for (let hid1 of hidden) {
         hid1.classList.add('hidden');
      }
      show.classList.remove('hidden');
   };

   //Фильтры
   let cards = document.querySelectorAll('.card');
   const filtersUse = document.querySelector('.filters__use');
   let chooseDate; //Выбранный срок сдачи
   let deadlines = document.querySelectorAll('.choose__label');//псевдомассив сроков сдачи
   let dead_line = Array.from(deadlines); //преобразуем в обычный массив
   let pos; //номер срока сдачи из списка

   //Дезактивируем кнопку применения фильтров, если ничего не выбрано
   if ((chooseDate == undefined) || chooseDist.size == 0) {
      filtersUse.setAttribute('disabled', 'disabled');
   }
   //Активируем кнопку применения фильтров, если выбрано
   //for (dl of deadlines) {
   for (dl of dead_line) {
      dl.onclick = function () {
         chooseDate = this.getAttribute('deadline');
         pos = dead_line.indexOf(this);
         if (chooseDist.size !== 0) {
         filtersUse.removeAttribute('disabled');
         }
      };
   }

   //Применяем фильтры
   filtersUse.onclick = function () {
      //Убираем боковую панель фильтров нв узком экране 
      filters.classList.remove('filters_active');
      const menu_btn = document.querySelector('.menu-btn');
      menu_btn.checked = false;

      for (let card__ of cards) {
         card__.classList.remove('hidden');
      }

      for (let card_ of cards) {
         const dist = card_.getAttribute('distance');
         const date_ = card_.getAttribute('deadline');

         if (chooseDate == 'any')
            if (chooseDist.has('any')) {}
         else {
            if (!chooseDist.has(dist)) {
               card_.classList.add('hidden');
            }
         } else {
            if (chooseDist.has('any')) {
               if (date_ !== chooseDate) {
                  card_.classList.add('hidden');
               }
            } else {
               if (!chooseDist.has(dist) || (date_ !== chooseDate)) {
                  card_.classList.add('hidden');
               }
            }
         }
      }
   };
   //Сброс фильтров
   const filtersReset = document.querySelector('.filters__reset');
   filtersReset.onclick = function() {
      //Убираем боковую панель фильтров нв узком экране 
      filters.classList.remove('filters_active');

      for (let card__ of cards) {
         card__.classList.remove('hidden');
      }
      chooseDist.clear();
      filtersUse.setAttribute('disabled', 'disabled');
      for (let cell of cells) {
         cell.setAttribute('back', 'no');
      }
      chooseDate = undefined;
      let radio_ = document.querySelectorAll('[type="radio"]');  
      radio_[pos].checked = false;  

      let check = document.querySelectorAll('[type="checkbox"]');
      for (let ck of check) {
         ck.checked = false;
      }
   };
   //Выезд бокового меню
   const sendv = document.querySelector('.sendvich');
   const filters = document.querySelector('.filters');
   sendv.onclick = function() {
      filters.classList.toggle('filters_active');
   }
});


