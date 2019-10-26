import { onMounted, onBeforeUnmount, watch } from '@vue/composition-api';

export const useOutsideClickBehaviour = (ref: any) => {
  let el: HTMLElement;
  let callback: any;
  const onOutsideClick = (cb: (e: MouseEvent) => void) => (callback = cb);

  const handleDocumentClick = (e: MouseEvent) => {
    if (el && el.contains(e.target as Node) === false) {
      callback(e);
    }
  };

  watch(ref, () => (el = ref.value));

  onMounted(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('touchstart', handleDocumentClick);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleDocumentClick);
    document.removeEventListener('touchstart', handleDocumentClick);
  });

  return { onOutsideClick };
};
