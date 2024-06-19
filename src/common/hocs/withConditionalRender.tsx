import { ComponentType } from "react";

type BaseProps<T> = {
  name: string;
  convertValue?: (value: T) => T;
};

const withConditionalRender = <C, K extends BaseProps<C>>(
  Component: ComponentType<BaseProps<C>>,
  propKey: keyof K,
): ((props: K) => JSX.Element | null) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    if (!props[propKey]) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default withConditionalRender;
