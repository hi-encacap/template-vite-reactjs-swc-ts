import { ConfigProvider } from "antd";
import { memo, ReactNode } from "react";

interface AntdConfigProviderProps {
  children: ReactNode;
}

const AntdConfigProvider = ({ children }: AntdConfigProviderProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 8,
          colorPrimary: "#FF6A59",
          colorPrimaryHover: "#ff3c26",
          colorBorder: "#e5e7eb",
          paddingXS: 10,
          paddingSM: 16,
        },
        components: {
          Button: {
            primaryShadow: "none",
          },
          Radio: {
            wrapperMarginInlineEnd: 8,
          },
          Table: {
            headerBorderRadius: 0,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default memo(AntdConfigProvider);
