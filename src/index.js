/** @jsx jsx */
import * as components from "@mdxp/components";
import Deck from "@mdxp/core";
import ReactDOM from "react-dom";
import { jsx } from "theme-ui";
import MDXPresentation from "./presentation.mdx";

ReactDOM.render(
  <Deck components={components}>
    <MDXPresentation />
  </Deck>,
  document.getElementById("root")
);
