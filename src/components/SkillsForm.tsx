import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { setSkills as setSkillsAction } from '../redux/filtersSlice';
import { Stack, Text, Group, Badge, CloseButton } from '@mantine/core';
import ButtonForm from './UI/Button';
import InputForm from './UI/Input';

export default function SkillsForm() {
  const dispatch = useDispatch<AppDispatch>();

  const reduxSkills = useSelector((state: RootState) => state.filters.skills);

  const [skills, setSkills] = useState<string[]>(reduxSkills);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setSkills(reduxSkills);
  }, [reduxSkills]);

  const addSkill = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || skills.includes(trimmed)) return;

    const newSkills = [...skills, trimmed];
    setSkills(newSkills);
    dispatch(setSkillsAction(newSkills));
    setInputValue('');
  };

  const removeSkill = (skill: string) => {
    const newSkills = skills.filter(s => s !== skill);
    setSkills(newSkills);
    dispatch(setSkillsAction(newSkills));
  };

  return (
    <Stack
      gap="sm"
      p={0}
      ml={7}
      mr={0}
      style={{ background: '#fff', borderRadius: 12, overflow: 'visible' }}
    >
      <Text
        size="md"
        ta="left"
        mt={7}
        style={{ fontFamily: 'OpenSansSemiBold', fontSize: '14px' }}
      >
        Ключевые навыки
      </Text>

      <Group gap="sm" wrap="nowrap" mb={10}>
        <InputForm
          placeholder="Навык"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
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
            fontSize: '25px',
          }}
        >
          +
        </ButtonForm>
      </Group>

      <Group gap="xs" wrap="wrap">
        {skills.map(skill => (
          <Badge
            key={`badge-${skill}`}
            color="black"
            variant="light"
            rightSection={<CloseButton size={16} onClick={() => removeSkill(skill)} />}
            styles={{
              root: {
                width: 103,
                height: 24,
                textTransform: 'none',
                textAlign: 'center',
                justifyContent: 'center',
              },
            }}
            style={{ fontFamily: 'OpenSansRegular', fontSize: '12px' }}
          >
            {skill}
          </Badge>
        ))}
      </Group>
    </Stack>
  );
}
