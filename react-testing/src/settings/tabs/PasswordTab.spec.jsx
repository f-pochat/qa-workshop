import React from 'react'
import { render, screen, fireEvent, waitFor, renderHook } from '@/test'
import { describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { PasswordTab } from '.';
import { useToast } from '@/components/ui/use-toast';

const mockToast = vi.fn()
vi.mock('@/components/ui/use-toast', () => ({
    useToast: vi.fn(() => ({
        toast: mockToast
    })),
}));



describe('Passwords Card', () => {
    test('should match snapshot', () => {
        const { container } = render(<PasswordTab />)
        expect(container.firstChild).toMatchSnapshot();
    })

    test('Submitting passwords, toast is called', async () => {
        const { getByPlaceholderText, getByRole } = render(<PasswordTab />);

        await userEvent.type(getByPlaceholderText('Current Password'), 'nicou')
        await userEvent.type(getByPlaceholderText('New Password'), 'Nicou1234!')
        await userEvent.type(getByPlaceholderText('Repeat Password'), 'Nicou1234!')

        fireEvent.click(getByRole('button', { name: "Submit" }))

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith({
                title: "Success",
                text: "Password changed"
            });
        });
    });

    test('Submitting same current and new password', async () => {
        const { getByText, getByRole, getByPlaceholderText } = render(<PasswordTab />);

        await userEvent.type(getByPlaceholderText('Current Password'), 'nicou')
        await userEvent.type(getByPlaceholderText('New Password'), 'nicou')
        await userEvent.type(getByPlaceholderText('Repeat Password'), 'Nicou1234!')

        fireEvent.click(getByRole('button', { name: "Submit" }))

        await waitFor(() => {
            expect(getByText("New password must be different from current password")).toBeInTheDocument()
            expect(getByText("Passwords must match")).toBeInTheDocument()
        })
    });
})