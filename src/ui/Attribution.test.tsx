import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Attribution from './Attribution';

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
        render(<Attribution />, container);
    });
    
    const attributionElement = container?.firstChild as Element;

    expect(attributionElement).toBeTruthy();
});

it('renders four paragraphs', () => {
    act(() => {
        render(<Attribution />, container);
    });

    const attributionElement = container?.firstChild as Element;
    let paragraphCount = 0;
    const expected = 4;

    for(let i = 0; i < attributionElement.childNodes.length; i++) {
        if ((attributionElement.childNodes[i] as Element).tagName === 'P') {
            paragraphCount++;
        }
    }

    expect(paragraphCount).toEqual(expected);
});

it('renders each paragraph with the appropriate text', () => {
    act(() => {
        render(<Attribution />, container);
    });

    const attributionElement = container?.firstChild as Element;
    const expected = [
        '"Meditation Impromptu 01", "Meditation Impromptu 02", "Meditation Impromptu 03"',
        'Kevin MacLeod (incompetech.com)',
        'Licensed under Creative Commons: By Attribution 3.0',
        'http://creativecommons.org/licenses/by/3.0/'
    ];

    for(let i = 0; i < attributionElement.childNodes.length; i++) {
        expect((attributionElement.childNodes[i] as Element).textContent).toBe(expected[i]);
    }
});

it('renders a hyperlink in the last paragraph', () => {
    act(() => {
        render(<Attribution />, container);
    });

    const attributionElement = container?.firstChild as Element;
    const lastParagraphElement = 
        attributionElement
            .childNodes[attributionElement.childNodes.length - 1] as Element;

    expect((lastParagraphElement.firstChild as Element).tagName).toBe('A');
});

it('renders a hyperlink whose address points to the Creative Commons page', () => {
    act(() => {
        render(<Attribution />, container);
    });

    const attributionElement = container?.firstChild as Element;
    const lastParagraphElement = 
        attributionElement
            .childNodes[attributionElement.childNodes.length - 1] as Element;

    expect((lastParagraphElement.firstChild as Element).getAttribute('href'))
        .toBe('http://creativecommons.org/licenses/by/3.0/');
});