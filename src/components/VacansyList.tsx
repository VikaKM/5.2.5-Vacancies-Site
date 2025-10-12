import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVacancies } from '../redux/vacanciesSlice';
import type { RootState, AppDispatch } from '../redux/store';
import { Container, Stack, Loader, Text } from '@mantine/core';
import VacancyCard from './VacancyCard'
import PaginationComponent from './Pagination'

export default function VacancyList() {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  
  const vacancies = useSelector((state: RootState) => state.vacancies.vacancies);
  const status = useSelector((state: RootState) => state.vacancies.status);
  const error = useSelector((state: RootState) => state.vacancies.error);
  const totalPages = useSelector((state: RootState) => state.vacancies.pages); 
  const cityFilter = useSelector((state: RootState) => state.filters.city);

  const loading = status === 'loading';

  useEffect(() => {
    dispatch(fetchVacancies({
      page: currentPage - 1, city: cityFilter === 'Все города' ? undefined : cityFilter 
    }));
  }, [dispatch, currentPage, cityFilter]);

  if (loading) return <Loader data-testid='loader'/>;
  if (error) return <Text c="red">Ошибка: {error}</Text>;

  if (!vacancies.length) return (
    <Text ta="center" style={{fontFamily: 'OpenSansRegular', fontSize: '14px'}}>
      Вакансий не найдено для выбранного города
    </Text>
  )
  
  return (
    <Container size='md' mt={0}>
      <Stack gap='lg' align='flex-end' mb={20}>
        {vacancies.map((vacancy) => (
          <VacancyCard 
            key={vacancy.id} 
            title={vacancy.name}
            salary={vacancy.salary ?? undefined}
            experience={vacancy.experience?.name}
            company={vacancy.employer?.name}
            city={vacancy.area?.name}
            schedule={vacancy.schedule}
          />
        ))}
      </Stack>
      
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages} 
        onChange={setCurrentPage}
      />
    </Container>
  )
}
