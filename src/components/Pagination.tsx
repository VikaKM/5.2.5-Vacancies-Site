import { Pagination, Center } from '@mantine/core';

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function PaginationComponent({ 
  currentPage,
  totalPages,
  onChange 
 }: PaginationComponentProps) {
  if (totalPages <= 1) return null;

  return (
    <Center>
    <Pagination
      value={currentPage}
      onChange={onChange}
      total={10}
      withEdges      
      withControls   
      boundaries={1} 
      siblings={1}   
      className='pagination'
    />
    </Center>
  );
}
