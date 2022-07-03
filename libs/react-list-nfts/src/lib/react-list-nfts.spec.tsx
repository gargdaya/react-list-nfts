import { render } from '@testing-library/react';

import ReactListNfts from './react-list-nfts';

describe('ReactListNfts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactListNfts />);
    expect(baseElement).toBeTruthy();
  });
});
