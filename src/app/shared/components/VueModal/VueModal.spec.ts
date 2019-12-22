import { createLocalVue, mount } from '@vue/test-utils';
import VueCompositionApi from '@vue/composition-api';
import VueModal from './VueModal.vue';

const localVue = createLocalVue();

localVue.use(VueCompositionApi);

describe('VueModal.vue', () => {
  test('renders slot', async () => {
    const wrapper = mount<any>(VueModal, {
      localVue,
      slots: {
        default: '<p>TEST</p>',
      },
    });

    expect(wrapper.findAll('p')).toHaveLength(0);

    wrapper.setProps({ show: true });
    expect(wrapper.findAll('p')).toHaveLength(1);

    wrapper.setProps({ show: false });
    expect(wrapper.findAll('p')).toHaveLength(0);

    wrapper.setProps({ show: true });

    wrapper.vm.beforeEnter(wrapper.vm.$el);
    wrapper.vm.enter(wrapper.vm.$el, jest.fn());
    wrapper.vm.beforeLeave(wrapper.vm.$el);

    await wrapper.vm.leave(wrapper.vm.$el);
  });

  test('registers and unregisters scroll/click/keydown event', () => {
    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();

    const wrapper = mount<any>(VueModal, { localVue });

    wrapper.destroy();

    expect(document.addEventListener).toHaveBeenCalledTimes(3);
    expect(document.removeEventListener).toHaveBeenCalledTimes(3);
  });

  test('should close on outside click', async () => {
    const map: any = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const wrapper = mount<any>(VueModal, {
      localVue,
      slots: {
        default: '<p>TEST</p>',
      },
      propsData: {
        show: true,
      },
    });
    const paragraph = wrapper.find(`p`).element;

    wrapper.vm.$emit = jest.fn();

    await wrapper.vm.$nextTick();

    map.mousedown({ target: paragraph });
    expect(wrapper.vm.$emit).toHaveBeenCalledTimes(0);

    map.mousedown({ target: null });
    expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
  });

  test('should close on ESC press', () => {
    const map: any = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const wrapper = mount<any>(VueModal, {
      localVue,
    });

    wrapper.vm.$emit = jest.fn();

    map.keydown({ key: 'Enter' });
    expect(wrapper.vm.$emit).toHaveBeenCalledTimes(0);

    map.keydown({ key: 'Escape' });
    expect(wrapper.vm.$emit).toHaveBeenCalledTimes(0);

    wrapper.setProps({ show: true });
    map.keydown({ key: 'Escape' });
    expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
  });
});
