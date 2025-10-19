import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setCity, setSkills, setSearchText } from '../redux/filtersSlice';
import { fetchVacancies } from '../redux/vacanciesSlice';
import type { RootState, AppDispatch } from '../redux/store';
import { Container, Stack, Loader, Text } from '@mantine/core';
import VacancyCard from './VacancyCard';
import PaginationComponent from './Pagination';

export default function VacancyList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(0);

  const vacancies = useSelector((state: RootState) => state.vacancies.vacancies);
  const status = useSelector((state: RootState) => state.vacancies.status);
  const error = useSelector((state: RootState) => state.vacancies.error);
  const totalPages = useSelector((state: RootState) => state.vacancies.pages);

  const cityFilter = useSelector((state: RootState) => state.filters.city);
  const userSkills = useSelector((state: RootState) => state.filters.skills);
  const searchText = useSelector((state: RootState) => state.filters.searchText);

  const loading = status === 'loading';

  useEffect(() => {
    const city = searchParams.get('city') ?? 'Все города';
    const search = searchParams.get('search') ?? '';
    const skillsParam = searchParams.get('skills') ?? '';

    dispatch(setCity(city));
    dispatch(setSearchText(search));
    dispatch(setSkills(skillsParam ? skillsParam.split(',') : []));
  }, [searchParams, dispatch]);


  useEffect(() => {
    const params: Record<string, string> = {};
    if (cityFilter && cityFilter !== 'Все города') params.city = cityFilter;
    if (searchText) params.search = searchText;
    if (userSkills.length) params.skills = userSkills.join(',');

    setSearchParams(params, { replace: true });
  }, [cityFilter, searchText, userSkills, setSearchParams]);

  useEffect(() => {
    setCurrentPage(0);
  }, [cityFilter, searchText, userSkills]);

  useEffect(() => {
    dispatch(
      fetchVacancies({
        page: currentPage,
        city: cityFilter === 'Все города' ? undefined : cityFilter,
        skills: userSkills,
        searchText: searchText || undefined,
      })
    );
  }, [dispatch, currentPage, cityFilter, userSkills, searchText]);

  // --- Рендер
  if (loading) return <Loader data-testid="loader" />;

  if (error)
    return (
      <Text c="red">Ошибка: {error}</Text>
    );

  if (!vacancies.length)
    return (
      <Text ta="center" style={{ fontFamily: 'OpenSansRegular', fontSize: '14px' }}>
        Вакансий не найдено
      </Text>
    );

  return (
    <Container size="md" mt={0}>
      <Stack gap="lg" align="flex-end" mb={20}>
        {vacancies.map((v) => (
          <VacancyCard key={v.id} vacancy={v} />
        ))}
      </Stack>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      />
    </Container>
  );
}
