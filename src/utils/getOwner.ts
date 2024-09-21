const getOwner = (repositoryUrl: string) => {
  if (!repositoryUrl) return '';
  const split = repositoryUrl.split('/');
  return split[split.length - 2];
};

export default getOwner;