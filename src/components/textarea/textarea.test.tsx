// Generated with util/create-component.js
import React from 'react';
import { render } from '@testing-library/react';

import input from './textarea';
import { inputProps } from './textarea.types';

describe('Test Component', () => {
    let props: inputProps;

    beforeEach(() => {
        props = {
            foo: 'bar',
        };
    });

    const renderComponent = () => render(<input {...props} />);

    it('should render foo text correctly', () => {
        props.foo = 'harvey was here';
        const { getByTestId } = renderComponent();

        const component = getByTestId('input');

        expect(component).toHaveTextContent('harvey was here');
    });
});
