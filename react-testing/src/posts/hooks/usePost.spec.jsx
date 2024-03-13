import { createReactQueryWrapper, renderHook, server, waitFor } from '@/test';
import { HttpResponse, http } from 'msw';
import { describe, expect, vi } from 'vitest';
import { usePost } from './usePost';
import { successResponse } from '../__mocks__';

describe('usePost', () => {
    test('Intercept post and assert it has correct data', async () => {
        server.use(
            http.get('https://jsonplaceholder.typicode.com/posts/*', () => {
                return HttpResponse.json(successResponse[0])
            })
        )
        const { result } = renderHook(() => usePost(5), { wrapper: createReactQueryWrapper() });

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(successResponse[0]);
    });
})