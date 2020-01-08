import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import AudioControls from './AudioControls';

let container: (HTMLDivElement | null) = null;

beforeEach(() => {
    // Setup a DOM element as a render target.
    container = document.createElement('div');
    document.body.appendChild(container);

    // Setup fake HTMLMediaElement operations.
    window.HTMLMediaElement.prototype.play = async () => {};
    window.HTMLMediaElement.prototype.pause = async () => {};
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
        render(<AudioControls />, container);
    });

    const audioControlsElement = container?.firstChild as Element;

    expect(audioControlsElement).toBeTruthy();
});

it('renders a div', () => {
    act(() => {
        render(<AudioControls />, container);
    });

    const audioControlsElement = container?.firstChild as Element;
    const expected = 'DIV';

    expect(audioControlsElement.tagName).toBe(expected);
});

it('renders a div with two paragraphs', () => {
    act(() => {
        render(<AudioControls />, container);
    });

    const audioControlsElement = container?.firstChild as Element;
    let paragraphCount = 0;
    const expected = 2;

    for(let i = 0; i < audioControlsElement.childNodes.length; i++) {
        if ((audioControlsElement.childNodes[i] as Element).tagName === 'P') {
            paragraphCount++;
        }
    }

    expect(paragraphCount).toBe(expected);
});

it('renders the correct text in the first paragraph of the div', () => {
    act(() => {
        render(<AudioControls />, container);
    });

    const audioControlsElement = container?.firstChild as Element;
    const firstParagraphElement = audioControlsElement.childNodes[0] as Element;
    const expected = 'Background Music';

    expect(firstParagraphElement.textContent).toBe(expected);
});

it('renders three icons in the second paragraph of the div', () => {
    act(() => {
        render(<AudioControls />, container);
    });

    const audioControlsElement = container?.firstChild as Element;
    const secondParagraphElement = audioControlsElement.childNodes[1] as Element;
    let iconCount = 0;
    const expected = 3;

    for(let i = 0; i < secondParagraphElement.childNodes.length; i++) {
        if((secondParagraphElement.childNodes[i] as Element).tagName == 'I') {
            iconCount++;
        }
    }

    expect(iconCount).toBe(expected);
});

it('renders a skip previous icon, a play arrow icon, and a skip next icon in the second paragraph of the div by default', () => {
    act(() => {
        render(<AudioControls />, container);
    });

    const audioControlsElement = container?.firstChild as Element;
    const secondParagraphElement = audioControlsElement.childNodes[1] as Element;
    const expected = [
        'skip_previous',
        'play_arrow',
        'skip_next'
    ];

    for(let i = 0; i < secondParagraphElement.childNodes.length; i++) {
        const currentIconElement = secondParagraphElement.childNodes[i] as Element;

        expect(currentIconElement.textContent).toBe(expected[i]);
    }
});

it('sets the second icon to the pause icon when the skip previous icon is clicked', () => {
    act(() => {
        render(<AudioControls />, container);
    });

    const audioControlsElement = container?.firstChild as Element;
    const iconParagraphElement = audioControlsElement.childNodes[1] as Element;
    const skipPreviousIconElement = iconParagraphElement.childNodes[0] as Element;
    const pausePlayIconElement = iconParagraphElement.childNodes[1] as Element;
    const expected = 'pause';

    act(() => {
        skipPreviousIconElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(pausePlayIconElement.textContent).toBe(expected);
});

it('pauses the current audio file and plays the previous one when the skip previous icon is clicked', () => {
    act(() => {
        render(<AudioControls />, container);
    });

    const audioControlsElement = container?.firstChild as Element;
    const iconParagraphElement = audioControlsElement.childNodes[1] as Element;
    const skipPreviousIconElement = iconParagraphElement.childNodes[0] as Element;

    const pauseSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'pause');
    const playSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'play');

    act(() => {
        skipPreviousIconElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(pauseSpy).toHaveBeenCalled();
    expect(playSpy).toHaveBeenCalled();
});

it('toggles the second icon between play arrow and pause each time it is clicked', () => {
    act(() => {
        render(<AudioControls />, container);
    });

    const audioControlsElement = container?.firstChild as Element;
    const iconParagraphElement = audioControlsElement.childNodes[1] as Element;
    const pausePlayIconElement = iconParagraphElement.childNodes[1] as Element;
    const playArrowIconExpected = 'play_arrow';

    expect(pausePlayIconElement.textContent).toBe(playArrowIconExpected);

    act(() => {
        pausePlayIconElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const pauseIconExpected = 'pause';

    expect(pausePlayIconElement.textContent).toBe(pauseIconExpected);

    act(() => {
        pausePlayIconElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(pausePlayIconElement.textContent).toBe(playArrowIconExpected);
});

it('plays the current audio file when the play arrow icon is clicked, and pauses the current audio file when the pause icon is clicked', () => {
    act(() => {
        render(<AudioControls />, container);
    });

    const audioControlsElement = container?.firstChild as Element;
    const iconParagraphElement = audioControlsElement.childNodes[1] as Element;
    const pausePlayIconElement = iconParagraphElement.childNodes[1] as Element;

    const playSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'play');

    act(() => {
        pausePlayIconElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(playSpy).toHaveBeenCalled();

    const pauseSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'pause');

    act(() => {
        pausePlayIconElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(pauseSpy).toHaveBeenCalled();
});

it('sets the second icon to the pause icon when the skip next icon is clicked', () => {
    act(() => {
        render(<AudioControls />, container);
    });

    const audioControlsElement = container?.firstChild as Element;
    const iconParagraphElement = audioControlsElement.childNodes[1] as Element;
    const pausePlayIconElement = iconParagraphElement.childNodes[1] as Element;
    const skipNextIconElement = iconParagraphElement.childNodes[2] as Element;
    const expected = 'pause';

    act(() => {
        skipNextIconElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(pausePlayIconElement.textContent).toBe(expected);
});

it('pauses the current audio file and plays the next one when the skip next icon is clicked', () => {
    act(() => {
        render(<AudioControls />, container);
    });

    const audioControlsElement = container?.firstChild as Element;
    const iconParagraphElement = audioControlsElement.childNodes[1] as Element;
    const skipNextIconElement = iconParagraphElement.childNodes[2] as Element;

    const pauseSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'pause');
    const playSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'play');

    act(() => {
        skipNextIconElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(pauseSpy).toHaveBeenCalled();
    expect(playSpy).toHaveBeenCalled();
});