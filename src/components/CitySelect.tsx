import { Select } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { IconMapPin } from '@tabler/icons-react';
import type { RootState, AppDispatch } from '../redux/store';
import { setCity } from '../redux/filtersSlice';

export default function CitySelect() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCity = useSelector((state: RootState) => state.filters.city);

  return (
    <Select
      value={selectedCity}
      onChange={(value) => {
        dispatch(setCity(value && value !== '' ? value : 'Все города'))}}
      placeholder='Выберите город'
      data={[
        { value: '', label: 'Все города' },
        { value: 'Москва', label: 'Москва' },
        { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
      ]}
      leftSection={<IconMapPin size={16} />}
      radius='md'
      ml={7}
      mt={60}
      mb={10}
      p={0}
      size='md'
      styles={{input: {color: 'gray'}, root: {width: 269}}}
      />
  )
}
