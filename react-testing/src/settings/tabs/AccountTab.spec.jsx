import React from 'react'
import { render, screen, fireEvent, waitFor } from '@/test'
import { describe, expect, test, vi } from 'vitest'
import { AccountTab } from './AccountTab'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'

describe('AccountTab', () => {
	test('should match snapshot', () => {
		const { container } = render(<AccountTab />)
		expect(container.firstChild).toMatchSnapshot()
	})

	test('submitting calls console.log with expected arguments', async () => {
		const consoleSpy = vi.spyOn(console, 'log')
		render(<AccountTab />)
		fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

		// https://react-hook-form.com/advanced-usage#TestingForm
		// waitFor is needed because react-hook-form internally uses asynchronous validation handlers.
		// in order to compute the formState, it has to initially validate the form,
		// which is done asynchronously, resulting in another render.
		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith({
				values: {
					name: 'Cianca',
					username: 'dinos1337'
				}
			})
		})
	});

	test('Submitting the form with valid data', async () => {
		const consoleSpy = vi.spyOn(console, 'log');
		const { getByPlaceholderText, getByRole } = render(<AccountTab />)

		await userEvent.clear(getByPlaceholderText('name'))
		await userEvent.clear(getByPlaceholderText('username'))

		await userEvent.type(getByPlaceholderText('name'), 'Nicou')
		await userEvent.type(getByPlaceholderText('username'), 'ulmete')

		fireEvent.click(getByRole('button', { name: 'Submit' }))

		// Expectations
		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith({
				values: {
					name: 'Nicou',
					username: 'ulmete'
				}
			})
		})
	});

	test('Submitting the form with invalid data', async () => {
		const {getByPlaceholderText, getByRole, getByText} = render(<AccountTab />)
		
		await userEvent.clear(getByPlaceholderText('name'))
		await userEvent.clear(getByPlaceholderText('username'));

		await userEvent.type(getByPlaceholderText('username'), Array(51).fill("a").join(""));
	
		fireEvent.click(getByRole('button', { name: 'Submit' }))
	
		await waitFor(() => {
		  expect(getByText("Name too short")).toBeInTheDocument()
		  expect(getByText("Username too long")).toBeInTheDocument()
		})
	  })
})