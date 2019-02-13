import React from "react";
import { create } from "react-test-renderer";
import Dashboard from "../Dashboard.jsx";

describe("<Dashboard />", () => {
  it("matches snapshot", () => {
    const dashboard = create(<Dashboard />).toJSON();
    expect(dashboard).toMatchSnapshot();
  });
});
