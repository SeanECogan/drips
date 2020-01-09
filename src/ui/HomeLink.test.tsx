import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import HomeLink from './HomeLink';

let container: (HTMLDivElement | null) = null;

beforeEach(() => {
    // Setup a DOM element as a render target.
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    if (container) {
        // Cleanup on exiting.
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    }
});

it('renders', () => {
    act(() => {
        render(<HomeLink />, container);
    });

    const homeLinkElement = container?.firstChild as Element;

    expect(homeLinkElement).toBeTruthy();
});

it('renders a hyperlink', () => {
    act(() => {
        render(<HomeLink />, container);
    });
    
    const homeLinkElement = container?.firstChild as Element;
    const expected = 'A';

    expect(homeLinkElement.tagName).toBe(expected);
});

it('renders a hyperlink whose text says \'Return Home\'', () => {
    act(() => {
        render(<HomeLink />, container);
    });
    
    const homeLinkElement = container?.firstChild as Element;
    const expected = 'Return Home';

    expect(homeLinkElement.textContent).toBe(expected);
});

it('renders a link whose address points to the seanecogan homepage', () => {
    act(() => {
        render(<HomeLink />, container);
    });

    const homeLinkElement = container?.firstChild as Element;
    const expected = 'https://seanecogan.com';

    expect(homeLinkElement.getAttribute('href')).toBe(expected);
});