import { Card, Text, Group, Stack } from '@mantine/core';
import ButtonForm from './UI/Button';
import WorkFormatBadge from './UI/WorkFormatBadge';

type VacancyCardProps = {
  title: string;
  salary?: { from?: number; to?: number; currency?: string };
  experience?: string;
  company?: string;
  city?: string;
  schedule?: { id?: string; name?: string };
}

export default function VacancyCard({
  title,
  salary,
  experience, 
  company,
  city,
  schedule,
} : VacancyCardProps) {
    const salaryText = salary
    ? `${salary.from ?? ''}${salary.from && salary.to ? ' – ' : ''}${salary.to ?? ''} ${salary.currency ?? '₽'}`
    : 'Зарплата не указана';

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
          {title}
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
            {experience ?? 'не указан'}
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
          {company}
        </Text>

        <WorkFormatBadge schedule={schedule}/>

        <Text size='sm' style={{fontFamily: 'OpenSansRegular', fontSize: '14px'}}>
          {city}
        </Text>


        <Group justify="apart" mt="md">
          <ButtonForm style={{backgroundColor: 'black', color: 'white'}}>
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
