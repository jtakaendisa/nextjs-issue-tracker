import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';

const IssuesActions = () => {
  return (
    <Flex mb="5" justify="between">
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
      <IssueStatusFilter />
    </Flex>
  );
};

export default IssuesActions;
