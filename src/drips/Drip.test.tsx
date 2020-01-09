import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Drip from './Drip';

jest.useFakeTimers();

let container: HTMLDivElement | null = null;

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
    const dripId = 1;
    const dripXPos = 0;
    const dripYPos = 0;
    const dripOnDripRemoval = () => {};

    act(() => {
        render(<Drip
            id={dripId}
            xPos={dripXPos}
            yPos={dripYPos}
            onDripRemoval={dripOnDripRemoval} />, container);
    });

    const dripElement = container?.firstChild as Element;

    expect(dripElement).toBeTruthy();
});

it('renders a div', () => {
    const dripId = 1;
    const dripXPos = 0;
    const dripYPos = 0;
    const dripOnDripRemoval = () => {};

    act(() => {
        render(<Drip
            id={dripId}
            xPos={dripXPos}
            yPos={dripYPos}
            onDripRemoval={dripOnDripRemoval} />, container);
    });

    const dripElement = container?.firstChild as Element;
    const expected = 'DIV';

    expect(dripElement.tagName).toBe(expected);
});

it('renders three \'ripple\' divs inside the main div', () => {
    const dripId = 1;
    const dripXPos = 0;
    const dripYPos = 0;
    const dripOnDripRemoval = () => {};

    act(() => {
        render(<Drip
            id={dripId}
            xPos={dripXPos}
            yPos={dripYPos}
            onDripRemoval={dripOnDripRemoval} />, container);
    });

    const dripElement = container?.firstChild as Element;
    let rippleDivCount = 0;
    const expected = 3;

    for(let i = 0; i < dripElement.childNodes.length; i++) {
        if((dripElement.childNodes[i] as Element).tagName === 'DIV') {
            rippleDivCount++;
        }
    }

    expect(rippleDivCount).toBe(expected);
});

it('removes itself after 4.2 seconds', () => {
    const dripId = 1;
    const dripXPos = 0;
    const dripYPos = 0;
    const dripOnDripRemoval = jest.fn();
    
    act(() => {
        render(<Drip
            id={dripId}
            xPos={dripXPos}
            yPos={dripYPos}
            onDripRemoval={dripOnDripRemoval} />, container);
    });

    act(() => {
        jest.advanceTimersByTime(4199);
    });

    expect(dripOnDripRemoval).not.toHaveBeenCalled();

    act(() => {
        jest.advanceTimersByTime(2);
    });
    
    expect(dripOnDripRemoval).toHaveBeenCalled();
});