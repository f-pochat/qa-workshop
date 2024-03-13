import { createReactQueryWrapper, renderHook } from '@/test';
import { describe, expect, vi } from 'vitest';
import { usePost } from './usePost';

const mockUseQuery = vi.fn();
vi.mock('@tanstack/react-query', () => ({
    useQuery: (...args) => mockUseQuery(...args),
}));
describe('usePost Args', () => {
    test('Intercept post and pass extra arguments to usePost', async () => {
        renderHook(() => usePost(5, { enabled: true}), { wrapper: createReactQueryWrapper() });

        expect(mockUseQuery).toHaveBeenCalledWith({
            queryKey: ['post', 5],
            queryFn: expect.any(Function),
            enabled: true,
        });
    });
})