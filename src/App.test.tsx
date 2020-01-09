import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from './App';

jest.useFakeTimers();

let container: (HTMLDivElement | null) = null;

beforeEach(() => {
    // Setup a DOM element as a render target.
    container = document.createElement('div');
    document.body.appendChild(container);

    // Setup fake HTMLMediaElement operations.
    window.HTMLMediaElement.prototype.load = async () => {};
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
        render(<App />, container);
    });

    const appElement = container?.firstChild as Element;

    expect(appElement).toBeTruthy();
});

it('renders a div', () => {
    act(() => {
        render(<App />, container);
    });

    const appElement = container?.firstChild as Element;
    const expected = 'DIV';

    expect(appElement.tagName).toBe(expected);
});

it('renders four child components by default', () => {
    act(() => {
        render(<App />, container);
    });

    const appElement = container?.firstChild as Element;
    const expected = [
        'A', // Top-level node of the HomeLink component.
        'DIV', // Top-level node of the Instructions component.
        'DIV', // Top-level node of the AudioControls component.
        'DIV' // Top-level node of the Attribution component.
    ];

    for (let i = 0; i < appElement.childNodes.length; i++) {
        const childNodeElement = appElement.childNodes[i] as Element;

        expect(childNodeElement.tagName).toBe(expected[i]);
    }
});

it('adds a new Drip component when the mouse is clicked in the application body', () => {
    act(() => {
        render(<App />, container);
    });

    const appElement = container?.firstChild as Element;
    const noDripsChildNodeCountExpected = 4;

    expect(appElement.childNodes.length).toBe(noDripsChildNodeCountExpected);

    const htmlElement = document.childNodes[1] as Element;
    const addedDripChildNodeCountExpected = 5;

    act(() => {
        htmlElement.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(appElement.childNodes.length).toBe(addedDripChildNodeCountExpected);

    const newDripElement = appElement.childNodes[addedDripChildNodeCountExpected - 1] as Element;
    const newDripTagNameExpected = 'DIV';

    expect(newDripElement.tagName).toBe(newDripTagNameExpected);
});

it('does not add a new Drip component when the mouse is clicked on one of the UI components', () => {
    act(() => {
        render(<App />, container);
    });

    const appElement = container?.firstChild as Element;
    const expected = 4;

    expect(appElement.childNodes.length).toEqual(expected);

    const homeLinkElement = appElement.firstChild as Element;

    act(() => {
        homeLinkElement.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(appElement.childNodes.length).toBe(expected);
});

it('adds a new Drip component when the mouse is clicked on an existing Drip component', () => {
    act(() => {
        render(<App />, container);
    });

    const appElement = container?.firstChild as Element;
    const noDripsChildNodeCountExpected = 4;

    expect(appElement.childNodes.length).toBe(noDripsChildNodeCountExpected);

    const htmlElement = document.childNodes[1] as Element;
    const oneDripChildNodeCountExpected = 5;

    act(() => {
        htmlElement.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(appElement.childNodes.length).toBe(oneDripChildNodeCountExpected);

    const dripElement = appElement.childNodes[oneDripChildNodeCountExpected - 1].firstChild as Element;
    const twoDripsChildNodeCountExpected = 6;

    act(() => {
        dripElement.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(appElement.childNodes.length).toBe(twoDripsChildNodeCountExpected);
});

it('removes a Drip component 4.2 seconds after it has been added', () => {
    act(() => {
        render(<App />, container);
    });

    const appElement = container?.firstChild as Element;
    const noDripsChildNodeCountExpected = 4;

    expect(appElement.childNodes.length).toBe(noDripsChildNodeCountExpected);

    const htmlElement = document.childNodes[1] as Element;
    const addedDripChildNodeCountExpected = 5;

    act(() => {
        htmlElement.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(appElement.childNodes.length).toBe(addedDripChildNodeCountExpected);

    act(() => {
        jest.advanceTimersByTime(4199);
    });

    expect(appElement.childNodes.length).toBe(addedDripChildNodeCountExpected);

    act(() => {
        jest.advanceTimersByTime(2);
    });

    expect(appElement.childNodes.length).toBe(noDripsChildNodeCountExpected);
});