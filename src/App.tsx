import { memo } from "react";

const App = () => {
  const a = 1;

  console.log(a);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="">Hello from Encacap!</div>
    </div>
  );
};

export default memo(App);
