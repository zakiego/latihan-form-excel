export const getServerSideProps = () => {
  return {
    redirect: {
      destination: "/form",
      permanent: false,
    },
    props: {},
  };
};

const Index = () => {
  return <div />;
};

export default Index;
