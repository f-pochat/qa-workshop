// Task 2: test the Post component.
// Acceptance criteria
// 1) Include at least one snapshot.
// 2) The copy to clipboard functionality must be fully tested.

import React from 'react';
import { describe, it, expect } from 'vitest';
import { fireEvent, getByTestId, render, waitFor } from '@testing-library/react';
import { Post } from './Post';
import { MemoryRouter } from 'react-router-dom';
import { usePost } from './hooks';
import { successResponse } from './__mocks__';
import userEvent from '@testing-library/user-event';
import { useToast } from '@/components/ui/use-toast';

vi.mock('./hooks/usePost', () => ({
    usePost: vi.fn()
}))

vi.mock('../components/button', () => ({
    Button: <div></div>
}))


const mockClipboard = vi.fn(() => Promise.resolve());
Object.assign(navigator, {
    clipboard: {
        writeText: mockClipboard
    }
});

describe('Post', () => {
    it('renders correctly', () => {
        usePost.mockReturnValue({
            status: 'success',
            data: successResponse[0]
        })

        const { container } = render(<Post />, { wrapper: MemoryRouter });
        expect(container).toMatchSnapshot();
    });

    it('Test clipboard', async () => {
        const { container } = render(<Post />, { wrapper: MemoryRouter });

        const shareButton = container.querySelector("svg[id='copyIcon']")
        await userEvent.click(shareButton);
        expect(mockClipboard).toHaveBeenCalledWith(expect.stringContaining('http://localhost'));
    });
});
