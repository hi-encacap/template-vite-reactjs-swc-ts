import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LoadingOverlay from "./Overlay";

describe("loading overlay", () => {
  it("should render", () => {
    const { container } = render(<LoadingOverlay />);
    expect(container).toMatchSnapshot();
  });
});
