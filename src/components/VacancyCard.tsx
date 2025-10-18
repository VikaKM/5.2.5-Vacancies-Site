import { Card, Text, Group, Stack } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import ButtonForm from './UI/Button';
import WorkFormatBadge from './UI/WorkFormatBadge';
import { setSelectedVacancy } from '../redux/vacanciesSlice';
import { useDispatch } from 'react-redux';
import type { Vacancy } from '../redux/vacanciesSlice';

type VacancyCardProps = {
  vacancy: Vacancy;
}

export default function VacancyCard({vacancy} : VacancyCardProps) {
    const salaryText = vacancy.salary
    ? `${vacancy.salary.from ?? ''}${vacancy.salary.from && vacancy.salary.to ? ' – ' : ''}${vacancy.salary.to ?? ''} ${vacancy.salary.currency ?? '₽'}`
    : 'Зарплата не указана';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedVacancy(vacancy));
    navigate(`/vacancies/${vacancy.id}`);
  };


  return (
    <Card 
      shadow='sm' 
      padding='lg' 
      radius='md' 
      withBorder 
      style={{ 
        width: '659px', 
        minHeight: '248px' 
        }}
    >
      <Stack align='flex-start' gap={0}>

        <Text 
          mb={4} 
          c='#364FC7' 
          style={{
            fontFamily: 'OpenSansSemiBold', 
            fontSize: '20px', 
            textAlign: 'left'
          }}
        >
          {vacancy.name}
        </Text>
        
        <Group 
          wrap='nowrap' 
          mb={20} 
          style={{
            fontFamily: 'OpenSansRegular', 
            fontSize: '16px'
          }}
        >
          <Text c='black' size="sm">
            {salaryText}
          </Text>
          <Text c='gray' size="sm">
            {vacancy.experience.name ?? 'не указан'}
          </Text>
        </Group>

        <Text 
          mb={12} 
          c='gray' 
          style={{
            fontFamily: 'OpenSansRegular', 
            fontSize: '14px'
          }}
        >
          {vacancy.employer.name}
        </Text>

        <WorkFormatBadge schedule={vacancy.schedule}/>

        <Text style={{fontFamily: 'OpenSansRegular', fontSize: '14px'}}>
          {vacancy.area.name}
        </Text>


        <Group justify="apart" mt="md">
          <ButtonForm 
            onClick={handleClick}
            style={{backgroundColor: 'black', color: 'white'}}
          >
            Смотреть вакансию
          </ButtonForm>

          <ButtonForm style={{backgroundColor: '#e9ecef', color: 'black'}}>
            Откликнуться
          </ButtonForm>
        </Group>
      </Stack>
    </Card>
  );
}
