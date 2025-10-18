import { Card, Text, Group, Stack } from '@mantine/core';
import ButtonForm from '../UI/Button';
import WorkFormatBadge from '../UI/WorkFormatBadge';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store'; 


export default function VacancyCard() {
  const vacancyData = useSelector((state: RootState) => state.vacancies.selectedVacancy);

  if (!vacancyData) {
   return <p>Вакансия не выбрана</p>;
  }

    const salaryText = vacancyData.salary
    ? `${vacancyData.salary.from ?? ''}${vacancyData.salary.from && vacancyData.salary.to ? ' – ' : ''}${vacancyData.salary.to ?? ''} ${vacancyData.salary.currency ?? '₽'}`
    : 'Зарплата не указана';


  return (
    <Stack align='center' pt={60} pb={60}>
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
            {vacancyData.name}
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
              {vacancyData.experience.name ?? 'не указан'}
            </Text>
          </Group>

          <Text 
            mb={12} 
            c='gray' 
            size='sm' 
            style={{
              fontFamily: 'OpenSansRegular', 
              fontSize: '14px'
            }}
          >
            {vacancyData.employer.name}
          </Text>

          <WorkFormatBadge schedule={vacancyData.schedule}/>

          <Text size='sm' style={{fontFamily: 'OpenSansRegular', fontSize: '14px'}}>
            {vacancyData.area.name}
          </Text>


          <Group justify="apart" mt="md">
            <ButtonForm 
              onClick={() => window.open(vacancyData.alternate_url, '_blank', 'noopener,noreferrer')}
              style={{backgroundColor: 'black', color: 'white'}}>
              Откликнуться на hh.ru
            </ButtonForm>
          </Group>
        </Stack>
      </Card>

      <Stack 
        p='lg'
        style={{
          backgroundColor: 'rgb(255, 255, 255)',
          width: '659px', 
          minHeight: '248px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: 12,
          textAlign: 'left'
        }}
      >
        {vacancyData.snippet?.requirement && (
          <>
            <Text style={{ fontFamily: 'OpenSansSemiBold', fontSize: '20px' }}
            >
              Требования
            </Text>

            <Text style={{ fontFamily: 'OpenSansRegular', fontSize: '16px', textAlign: 'left' }}>
              {vacancyData.snippet.requirement}
            </Text>
          </>
        )}
        
        {vacancyData.snippet?.responsibility && (
        <>
          <Text style={{fontFamily: 'OpenSansSemiBold', fontSize: '16x'}}>
            Обязанности:
          </Text>

          <Text style={{fontFamily: 'OpenSansRegular', fontSize: '16px' }}>
            {vacancyData.snippet?.responsibility}
          </Text>
        </>
        )}

      </Stack>
    </Stack>
  );
}