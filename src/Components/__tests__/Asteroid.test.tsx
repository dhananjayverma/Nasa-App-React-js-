import React from 'react';
import {waitFor, render} from '@testing-library/react';
import axios from 'axios';
import Asteroid_Data from '../Asteroid/Asteroid';

jest.mock('axios');

describe('Asteroid_Data component', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  test('should render the asteroid details correctly', async () => {
    const mockData = {
      id: '2000433',
      name: 'Asteroid Test',
      nasa_jpl_url: 'https://www.nasa.gov/asteroid-test',
      is_potentially_hazardous_asteroid: true,
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { getByText } = render(<Asteroid_Data />);

    await waitFor(() => {
      expect(getByText(`ID: ${mockData.id}`)).toBeDefined();
      expect(getByText(`Name: ${mockData.name}`)).toBeDefined();
      expect(getByText(`NASA JPL URL: ${mockData.nasa_jpl_url}`)).toBeDefined();
      expect(getByText(`Is Potentially Hazardous Asteroid: ${mockData.is_potentially_hazardous_asteroid}`)).toBeDefined();
    });
  });

  test('should navigate back to home if there is an error', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error());

    const navigateMock = jest.fn();

    jest.mock('@react-navigation/native', () => ({
      useNavigation: () => ({
        navigate: navigateMock,
      }),
      useRoute: () => ({
        params: { AsteroidData: '123' },
      }),
      RouteProp: jest.fn(),
      NativeStackNavigationProp: jest.fn(),
    }));

    render(<Asteroid_Data />);
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('Home');
    });
  });
});