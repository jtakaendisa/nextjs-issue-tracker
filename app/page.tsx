import Pagination from './components/Pagination';

interface Props {
  searchParams: {
    page: string;
  };
}

export default function Home({ searchParams: { page } }: Props) {
  return <Pagination itemCount={100} pageSize={10} currentPage={+page} />;
}
