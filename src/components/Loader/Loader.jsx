import { Spinner } from '@nextui-org/spinner';

export const Loader = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Spinner
        label="Loading..."
        size="lg"
        color="secondary"
        labelColor="secondary"
      />
    </div>
  );
};
