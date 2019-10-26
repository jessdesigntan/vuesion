<template>
  <transition @beforeEnter="beforeEnter" @enter="enter" @beforeLeave="beforeLeave" @leave="leave">
    <div :class="[$style.vueModal, fitContent ? $style.fitContent : '']" v-if="show" :aria-modal="show" ref="modal">
      <slot />
    </div>
  </transition>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api';
import { useOutsideClickBehaviour } from '@shared/composables/use-outside-click-behaviour';
import { useKeyDownBehavior } from '@shared/composables/use-keydown-behaviour';
import { useBackdrop } from '@shared/composables/use-backdrop';

export default createComponent({
  name: 'VueModal',
  props: {
    show: Boolean,
    fitContent: Boolean,
  },
  setup(props, { emit }) {
    const modal = ref(null);
    const { onOutsideClick } = useOutsideClickBehaviour(modal);
    const { onKeyDown } = useKeyDownBehavior();
    const onClose = () => emit('close');

    onOutsideClick(() => onClose());
    onKeyDown((e) => {
      if (e.key === 'Escape' && props.show === true) {
        onClose();
      }
    });

    return {
      modal,
      ...useBackdrop(),
    };
  },
});
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.vueModal {
  position: fixed;
  top: $space-8;
  left: $space-8;
  bottom: $space-8;
  right: $space-8;
  background: $modal-bg;
  z-index: $modal-index;
  box-shadow: $modal-shadow;
  padding: $modal-padding;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  @include mediaMin(tabletPortrait) {
    max-width: $modal-max-width;
    max-height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    right: unset;
    bottom: unset;
    transform: translate(-50%, -50%);
  }
}

.fitContent {
  padding: 0;
  overflow-y: hidden;
  bottom: initial;
}
</style>
