import { render } from '@testing-library/react';

import File from './file';

describe('File', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<File />);
        expect(baseElement).toBeTruthy();
    });
});
