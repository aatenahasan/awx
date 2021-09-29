import React from 'react';
import { Formik } from 'formik';
import { mountWithContexts } from '../../../../testUtils/enzymeHelpers';
import ImageField from './ImageField';

describe('ImageField', () => {
  test('should not show Hub wizard button unless Hub cred selected', () => {
    const wrapper = mountWithContexts(
      <Formik
        initialValues={{
          credential: null,
          image: '',
        }}
      >
        {() => <ImageField hubCredSelected={false} isDisabled={false} />}
      </Formik>
    );
    expect(wrapper.find('MagicIcon').length).toBe(0);
  });

  test('should show Hub wizard button when Hub cred selected', () => {
    const wrapper = mountWithContexts(
      <Formik
        initialValues={{
          credential: {
            id: 1,
            name: 'Hub-Cred',
          },
          image: '',
        }}
      >
        {() => <ImageField hubCredSelected isDisabled={false} />}
      </Formik>
    );
    expect(wrapper.find('MagicIcon').length).toBe(1);
  });
});
