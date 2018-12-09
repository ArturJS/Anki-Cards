import { shallowMount } from '@vue/test-utils';
import Form from '../Form';

jest.mock('../utils', () => ({
  getChildren: children => `getChildren( ${JSON.stringify(children, null, 2)} )`
}));

describe('Check <Form/>', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Form, {
      slots: {
        default: 'Test children'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
