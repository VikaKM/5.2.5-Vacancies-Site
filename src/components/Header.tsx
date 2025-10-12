import { AppShell, Group, Text, Image, Anchor, ActionIcon, Center } from '@mantine/core';
import { IconCircle, IconUser } from '@tabler/icons-react';
import logo from '../assets/logo-hh.png';

export default function Header() {

  return (
    <AppShell.Header h={60} px='sm'>
        <Group 
          gap={6} 
          align='center' 
          pos='absolute' 
          left={16} 
          top='50%' 
          style={{transform: 'translateY(-50%)'}}
        >
          {/* логотип */}
          <Image 
            src={logo}
            alt='Логотип'
            w={30}
            radius='md'  
          >
          </Image>    
          <Text fw={700} style={{fontFamily: 'OpenSansSemiBold'}}>
            .FrontEnd
          </Text>
        </Group>

          {/* центральный блок */}
          <Center h='100%'>
            <Group gap='lg' align='center' style={{fontFamily: 'OpenSansMedium' }}>
            {/* ссылка на вакансии */}

            <Group gap={6} align='center'>
              <Anchor href='/page' underline='hover' c='black' style={{fontSize: '14px'}}>
                Вакансии FE
              </Anchor>
              <ActionIcon variant='filled' c='blue' radius='xl' size={10} style={{ padding: 0 }}>
                <IconCircle size={14} color='white'/>
              </ActionIcon>
            </Group>

            {/* ссылка на обо мне */}
            <Group gap={6} align='center'>
              <ActionIcon variant='transparent' c='gray' radius='xl' w={24} style={{border: '1px solid gray'}}>
                <IconUser size={18} />
              </ActionIcon>
              <Anchor href='/about' underline='hover' c='gray' style={{fontSize: '14px'}}>
                Обо мне
              </Anchor>
            </Group>
            </Group>
          </Center>

    </AppShell.Header>
  )
}

