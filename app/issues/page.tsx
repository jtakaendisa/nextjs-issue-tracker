import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import Pagination from '../components/Pagination';
import IssuesActions from './IssueActions';
import IssueTable from './IssueTable';
import { Flex } from '@radix-ui/themes';

interface Props {
  searchParams: IssueTableSearchParams;
}

export interface IssueTableSearchParams {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

export interface IssueTableColumn {
  label: string;
  value: keyof Issue;
  className?: string;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: IssueTableColumn[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const page = +searchParams.page || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssuesActions />
      <IssueTable
        columns={columns}
        searchParams={searchParams}
        issues={issues}
      />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
