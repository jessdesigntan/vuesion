import anime from 'animejs';
import { onBeforeMount } from '@vue/composition-api';

export const useBackdrop = () => {
  let overlay: HTMLElement = null;

  onBeforeMount(() => {
    overlay = document.getElementById('overlay');

    if (overlay === null) {
      overlay = document.createElement('div');
      overlay.id = 'overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.zIndex = '2000';
      overlay.style.background = '#000';
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      overlay.style.transition = 'opacity 250ms linear';
      document.body.appendChild(overlay);
    }
  });

  return {
    beforeEnter(el: HTMLElement) {
      el.style.opacity = '0';

      document.getElementById('overlay').style.visibility = 'visible';
    },
    enter(el: HTMLElement, done: any) {
      document.getElementById('overlay').style.opacity = '0.5';
      document.body.style.overflow = 'hidden';

      anime({
        targets: el,
        opacity: {
          value: '1',
          duration: 500,
          elasticity: 0,
        },
        complete: done,
      });
    },
    beforeLeave(el: HTMLElement) {
      el.style.opacity = '1';
    },
    leave(el: HTMLElement, done: any) {
      const overlay: HTMLElement = document.getElementById('overlay');
      overlay.style.opacity = '0';
      document.body.style.overflow = 'initial';

      anime({
        targets: el,
        opacity: {
          value: '0',
          duration: 500,
          elasticity: 0,
        },
        complete() {
          overlay.style.visibility = 'hidden';
          done();
        },
      });
    },
  };
};
