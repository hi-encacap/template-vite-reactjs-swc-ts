interface NotFoundContentProps {
  loading?: boolean;
}

const NotFoundContent = ({ loading }: NotFoundContentProps) => {
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && <div>No Options</div>}
    </div>
  );
};

export default NotFoundContent;
