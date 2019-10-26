import { onMounted, onBeforeUnmount } from '@vue/composition-api';

export const useKeyDownBehavior = () => {
  let callback: any;
  const onKeyDown = (cb: (e: KeyboardEvent) => void) => (callback = cb);

  const handleDocumentKeyPress = (e: KeyboardEvent) => {
      callback(e);
  };

  onMounted(() => {
    document.addEventListener('keydown', handleDocumentKeyPress);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleDocumentKeyPress);
  });

  return { onKeyDown };
};
