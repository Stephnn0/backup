import { Decimal } from "@prisma/client/runtime/library";
import type {
  RunInput,
  FunctionRunResult,
  Value,
  Discount,
  FixedAmount
} from "../generated/api";
import {
  //  DiscountApplicationStrategy,
} from "../generated/api";

const EMPTY_DISCOUNT: FunctionRunResult = {
  discounts: [{message: "123", targets: [], value: {
    fixedAmount: 29.99 as unknown as FixedAmount 
  } }],
  // Value

};
const DISCOUNT_100: FunctionRunResult = {
  discounts: [{message: "123", targets: [], value: {
    fixedAmount: 29.99 as unknown as FixedAmount 
  } }],
};
const DISCOUNT_50: FunctionRunResult = {
  discounts: [{message: "123", targets: [], value: {
    fixedAmount: 29.99 as unknown as FixedAmount 
  } }],
};

const DISCOUNT_10: FunctionRunResult = {
  discounts: [],
};


type Configuration = {};

export function run(input: RunInput): FunctionRunResult {
  console.log("--------------SHIPPING FUNCTION RUNNING----------------")

  // const configuration: Configuration = JSON.parse(
  //   input?.discountNode?.metafield?.value ?? "{}"
  // );

  const discountValue = input?.discountNode?.metafield?.value;
  console.log(discountValue, 'discountValue')
  //check if product has a discount? or maybe order?

  switch (discountValue) {
    case "100":
      return DISCOUNT_100;
    case "20":
      return DISCOUNT_50;
    case "10":
      return DISCOUNT_10;
    default:
      return EMPTY_DISCOUNT;
  }
};