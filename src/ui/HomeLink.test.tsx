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
    // Cleanup on exiting.
    if (container) {
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

    expect(homeLinkElement.tagName).toBe('A');
});

it('renders a hyperlink whose text says \'Return Home\'', () => {
    act(() => {
        render(<HomeLink />, container);
    });
    
    const homeLinkElement = container?.firstChild as Element;

    expect(homeLinkElement.textContent).toBe('Return Home');
});

it('renders a link whose address points to the seanecogan homepage', () => {
    act(() => {
        render(<HomeLink />, container);
    });

    const homeLinkElement = container?.firstChild as Element;

    expect(homeLinkElement.getAttribute('href')).toBe('https://seanecogan.com');
});