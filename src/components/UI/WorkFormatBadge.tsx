import { Badge } from '@mantine/core';

type WorkFormatBadgeProps = {
  schedule?: {
    id?: string;
    name?: string;
  };
};

export default function WorkFormatBadge({ schedule }: WorkFormatBadgeProps) {
  if (!schedule) return null;

  let bgColor = '';
  let textColor = '#fff';

  switch (schedule.id) {
    case 'remote':
      bgColor = 'Primary'; 
      textColor = '#fff';
      break;
    case 'fullDay':
    case 'full_day':
      bgColor = '#e9ecef'; 
      textColor = '#000';
      break;
    case 'flexible':
      bgColor = 'Black';
      textColor = '#fff';
      break;
    default:
      bgColor = '#1971c2'; 
      textColor = '#fff';
  }

  return (
    <Badge
      variant='filled'
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: 'OpenSansRegular',
        fontSize: 10,
        padding: '5px 10px',
        marginBottom: '10px'
      }}
    >
      {schedule.name}
    </Badge>
  );
}
