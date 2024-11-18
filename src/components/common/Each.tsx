import { Children } from "react";

interface EachProps {
  render: any;
  of: any[];
}

export const Each = ({ render, of }:EachProps) => 
  <>
    {Children.toArray(
      of.map((item, index) => render(item, index))
    )}
  </>
;