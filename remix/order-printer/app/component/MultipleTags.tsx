import { LegacyStack, Tag, Autocomplete } from "@shopify/polaris";
import { useState, useCallback, useMemo } from "react";

export function MultiAutocompleteExample({
  selectedOptions: parentSelectedOptions,
  setSelectedOptions: setParentSelectedOptions,
}: any) {
  const deselectedOptions = useMemo(
    () => [
      { value: "{{name}}", label: "name" },
      { value: "{{billingAddress}}", label: "billingAddress" },
      { value: "{{email}}", label: "email" },
    ],
    [],
  );
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );

      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const removeTag = useCallback(
    (tag: string) => () => {
      const options = [...parentSelectedOptions];
      options.splice(options.indexOf(tag), 1);
      setParentSelectedOptions(options);
    },
    [parentSelectedOptions, setParentSelectedOptions],
  );

  const verticalContentMarkup =
    parentSelectedOptions.length > 0 ? (
      <LegacyStack spacing="extraTight" alignment="center">
        {parentSelectedOptions.map((option: any) => {
          let tagLabel = "";
          tagLabel = option.replace("_", " ");
          tagLabel = titleCase(tagLabel);
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
              {tagLabel}
            </Tag>
          );
        })}
      </LegacyStack>
    ) : null;

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      placeholder="Vintage, cotton, summer"
      verticalContent={verticalContentMarkup}
      autoComplete="off"
    />
  );

  return (
    <div style={{ height: "325px" }}>
      <Autocomplete
        allowMultiple
        options={options}
        selected={parentSelectedOptions}
        textField={textField}
        onSelect={setParentSelectedOptions}
        listTitle="Suggested Tags"
      />
    </div>
  );

  function titleCase(string: string) {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) =>
        word[0] ? word.replace(word[0], word[0].toUpperCase()) : "",
      )
      .join("");
  }
}
