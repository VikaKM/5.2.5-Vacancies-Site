import { useState } from 'react';
import { Stack, Text, Group, Badge, CloseButton } from '@mantine/core';
import ButtonForm from './UI/Button';
import InputForm from './UI/Input';  

export default function SkillsForm() {
  const [skills, setSkills] = useState<string[]>(['TypeScript', 'React', 'Redux']);
  const [inputValue, setInputValue] = useState('');

  const addSkill = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setInputValue('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <Stack 
      gap="sm" 
      p={0} 
      ml={7} 
      mr={0} 
      style={{ 
        background: '#fff', 
        borderRadius: 12, 
        overflow: 'visible'
      }}
    >
      <Text 
        size='md' 
        ta='left' 
        mt={7} 
        style={{
          fontFamily: 'OpenSansSemiBold', 
          fontSize: '14px'
        }}
      >
        Ключевые навыки
      </Text>

      {/* Ввод + кнопка */}
      <Group gap="sm" wrap='nowrap' mb={10}>
        <InputForm
          placeholder='Навык'
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setInputValue(e.currentTarget.value)}
          style={{ width: 227, height: 30 }}
        />
        <ButtonForm 
          onClick={addSkill}
          mt={5} 
          p={0} 
          style={{
            backgroundColor: '#8cb4ff',
            color: 'white',
            width: 28,
            height: 28,
            fontSize: '25px'
          }}
        >
          +
        </ButtonForm>
      </Group>

      {/* Вывод добавленных навыков */}
      <Group gap='xs' wrap='wrap'>
        {skills.map((skill) => (
          <Badge
            key={skill}
            color='black'
            variant='light'
            rightSection={
              <CloseButton 
                size={16} 
                onClick={() => removeSkill(skill)} />
            }
            styles={{ 
              root: { 
                width: 103, 
                height: 24, 
                textTransform: 'none', 
                textAlign: 'center', 
                justifyContent: 'center' 
              }
            }}
            style={{
              fontFamily: 'OpenSansRegular', 
              fontSize: '12px'
            }}
          >
            {skill}
          </Badge>
        ))}
      </Group>
    </Stack>
  );
}
