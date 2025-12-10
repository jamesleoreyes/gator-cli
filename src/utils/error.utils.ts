function handleInvalidArgs(args: string[]) {
  console.log(`${args.join(', ')} ${args.length === 1 ? 'is' : 'are'} required`);
  process.exit(0);
};

export { handleInvalidArgs };
