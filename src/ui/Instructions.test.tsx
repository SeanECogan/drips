import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Instructions from './Instructions';

let container: (HTMLDivElement | null) = null;

beforeEach(() => {
    // Setup a DOM element as a render target.
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // Cleanup on exiting.
    if (container) {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    }
});

it('renders', () => {
    act(() => {
        render(<Instructions />, container);
    });

    const instructionsElement = container?.firstChild as Element;

    expect(instructionsElement).toBeTruthy();
});

it('renders a div', () => {
    act(() => {
        render(<Instructions />, container);
    });

    const instructionsElement = container?.firstChild as Element;
    const expected = 'DIV';

    expect(instructionsElement.tagName).toBe(expected);
});

it('renders the correct instructions text in the div', () => {
    act(() => {
        render(<Instructions />, container);
    });

    const instructionsElement = container?.firstChild as Element;
    const expected = 'Click or tap anywhere to create a ripple.';

    expect(instructionsElement.textContent).toBe(expected);
});