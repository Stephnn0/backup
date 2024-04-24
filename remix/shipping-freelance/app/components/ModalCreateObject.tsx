import {
  Button,
  Frame,
  Modal,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import { Form, useSubmit } from "@remix-run/react";
import { TagsComponent } from "./Tags";
import { CheckboxExample } from "./CheckBox";
import { useCallback, useState } from "react";

export function ModalCreateObject({ active, handleChange }: any) {
  const submit = useSubmit();

  const createMetaObject = () => {
    const listCodesA = JSON.stringify({ codes: selectedTags });

    submit(
      { valueCodeB: valueCodeB, listCodesA: listCodesA, status: checkedString },
      {
        replace: true,
        method: "POST",
        navigate: false,
        action: "/app/api/createMetaObject",
      },
    );
  };

  //----------------------------------------------------code B

  const [valueCodeB, setValueCodeB] = useState("");

  const handleChangeCodeB = useCallback(
    (newValue: string) => setValueCodeB(newValue),
    [],
  );

  //----------------------------------------------------tags

  const [selectedTags, setSelectedTags] = useState(["Rustic"]);

  console.log(selectedTags, "selectedTags");

  const addTag = (tag: any) => {
    setSelectedTags((previousTags) => [...previousTags, tag]);
  };

  const removeTag = (tag: any) => {
    setSelectedTags((previousTags) =>
      previousTags.filter((previousTag) => previousTag !== tag),
    );
  };

  //----------------------------------------------------checkbox

  const [checked, setChecked] = useState(false);
  const [checkedString, setCheckedString] = useState("false");

  const handleChangeCheckBod = (newChecked: any) => {
    setChecked(newChecked);
    setCheckedString(newChecked ? "true" : "false");
  };

  return (
    <div style={{ height: "500px" }}>
      <Frame>
        <Modal
          // activator={activator}
          open={active}
          onClose={handleChange}
          title="Create Object"
          primaryAction={{
            content: "Create",
            onAction: createMetaObject,
          }}
        >
          <Modal.Section>
            <TextContainer>
              <Form onSubmit={createMetaObject} method="PUT">
                <TagsComponent
                  selectedTags={selectedTags}
                  addTag={addTag}
                  removeTag={removeTag}
                />
                <TextField
                  value={valueCodeB}
                  onChange={handleChangeCodeB}
                  label="Code B"
                  autoComplete="off"
                />
                <div>
                  <CheckboxExample
                    checked={checked}
                    onChange={handleChangeCheckBod}
                  />
                  {checked ? (
                    <p>Code will be Active</p>
                  ) : (
                    <p>Code will be Disabled</p>
                  )}
                </div>
              </Form>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}
