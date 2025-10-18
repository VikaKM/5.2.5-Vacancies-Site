import {  Container, Grid, Stack, Group, Title, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import ButtonForm from './UI/Button';
import InputSearch from './UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setSearchText } from '../redux/filtersSlice';
import type { AppDispatch, RootState } from '../redux/store';

export default function SearchSection() {
  
  const dispatch = useDispatch<AppDispatch>();
  const currentSearch = useSelector((state: RootState) => state.filters.searchText);

  const [localSearch, setLocalSearch] = useState(currentSearch || '');

  const handleSearch = () => {
    dispatch(setSearchText(localSearch.trim()));
  };


  return (
    <Container size='lg' pt='xl' pb={20}>
      <Grid align='center'>
         {/* Левый title*/}
        <Grid.Col span={6}>
          <Stack gap={4}  align='flex-start'>
            <Title order={2} style={{fontFamily: 'OpenSansExstraBold', fontSize: '26px'}}>
              Список вакансий
            </Title>
            <Text c='gray' style={{fontFamily: 'OpenSansMedium', fontSize: '16px'}}>
              по профессии Frontend-разработчик
            </Text>
          </Stack>
        </Grid.Col>

          {/* правый блок с поиском */}
          <Grid.Col span={6}>
            <Group gap='sm' align='flex-end' wrap='nowrap'>
            <InputSearch 
              placeholder='Должность или название вакансии'
              leftSection={<IconSearch size={16}/>}
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{ width: 403, flex: 1}}
              styles={{
                input: {backgroundColor: '#f8f9fa'}
              }}
            >
            </InputSearch>

            <ButtonForm 
              onClick={handleSearch}
              style={{ 
                fontFamily: 'OpenSansMedium', 
                color: '#fff', 
                width: '93px'
              }}
            >
              Найти
            </ButtonForm>

            </Group>
          </Grid.Col>
      </Grid>
    </Container>
  )
}

