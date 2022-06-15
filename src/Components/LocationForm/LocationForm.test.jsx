import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LocationForm from './index';
import axios from 'axios';
import { data, GeoJsonData } from './data';
import user from '@testing-library/user-event';

import * as mockConverter from '../../Services/osmDataConverter';

jest.mock('axios');

describe('LocationForm', () => {

  it('GeoJSON data is returned when all fields pass validation', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    jest
      .spyOn(mockConverter, 'convertToGeoJsonData')
      .mockImplementation(() => GeoJsonData);

    render(<LocationForm />);

    user.type(getLeft(), '0.1');
    user.type(getBottom(), '51');
    user.type(getRight(), '0.103');
    user.type(getTop(), '51.001');

    clickSubmit();

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  it('left must be less than right', () => {
    render(<LocationForm />);

    user.type(getLeft(), '0.1');
    user.type(getBottom(), '51');
    user.type(getRight(), '0.02');
    user.type(getTop(), '51.001');

    clickSubmit();

    expect(screen.getByText('left cannot be larger than right'));
  });

});

function clickSubmit() {
  user.click(screen.getByRole('button', { name: /Submit/i }));
}

function getLeft() {
  return screen.getByRole('input', { name: /left/i });
}

function getRight() {
  return screen.getByRole('input', { name: /right/i });
}

function getBottom() {
  return screen.getByRole('input', { name: /bottom/i });
}

function getTop() {
  return screen.getByRole('input', { name: /top/i });
}
