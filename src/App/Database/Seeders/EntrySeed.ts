type Entry = {
  description: string;
  createdAt: number;
  status: 'pending' | 'inProgress' | 'finished';
};

export const entrySeeder: Entry[] = [
  {
    description: 'Quo quibusdam tempore quae quaerat. Occaecati esse praesentium eum autem ex sed dolores voluptates. Sapiente repellendus molestiae velit saepe assumenda.',
    status: 'pending',
    createdAt: Date.now(),
  },
  {
    description:
      'Dignissimos eos optio vel mollitia qui. Quis vero provident. Et corrupti minus quo voluptatem corporis illo sint nihil. Aut et nostrum dolorem omnis. Perspiciatis vitae dolor itaque voluptatem. Saepe omnis sit a et voluptatum ex maxime.',
    status: 'inProgress',
    createdAt: Date.now(),
  },
  {
    description: 'Maiores et ut est. Corrupti totam est nisi id voluptatem dolorum et. Ratione sint alias sit saepe aliquam dolore.',
    status: 'finished',
    createdAt: Date.now(),
  },
];
