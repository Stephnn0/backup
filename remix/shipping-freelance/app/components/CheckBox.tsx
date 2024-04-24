import { Checkbox } from "@shopify/polaris";
import { useState, useCallback } from "react";

export function CheckboxExample({ checked, onChange }: any) {
  return <Checkbox label="Code Status" checked={checked} onChange={onChange} />;
}
