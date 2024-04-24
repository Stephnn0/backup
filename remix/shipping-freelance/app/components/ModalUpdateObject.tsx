import {
  Button,
  Frame,
  Modal,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { Form, useFetcher, useSubmit } from "@remix-run/react";
import { TagsComponent } from "./Tags";

export function ModalExample({ active, handleChange, singleMetaObject }: any) {
  const submit = useSubmit();

  //-----------------------------------------------------
  const getValues = () => {
    if (!singleMetaObject) {
      console.error("singleMetaObject is undefined");
      return;
    }

    const { fields } = singleMetaObject;

    console.log("fields:", fields);
    return { fields };
  };

  const fields = getValues();
  console.log("codes list A:", fields?.fields[0].value);
  const codeAlist = fields?.fields[0].value;

  function extractArrayFromJSON(codeAlist: any) {
    try {
      // Attempt to parse the JSON string
      const jsonObject = JSON.parse(codeAlist);

      // Check if the parsed object has the 'codes' property and it's an array
      if (jsonObject && Array.isArray(jsonObject.codes)) {
        return jsonObject.codes;
      } else {
        console.error('Invalid JSON structure or missing "codes" array');
        return null;
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }
  let array;

  array = codeAlist ? extractArrayFromJSON(codeAlist) : [];

  console.log(array, "codeAlist");

  console.log("code B:", fields?.fields[1].value);
  console.log("status code:", fields?.fields[2].value);

  //-----------------------------------------------------

  const updateMetaObject = () =>
    submit(
      { objectId: "metaObjectId" },
      {
        replace: true,
        method: "PUT",
        navigate: false,
        action: "/app/api/updateMetaobject",
      },
    );

  //----------------------------------------------------tags

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const array = codeAlist ? extractArrayFromJSON(codeAlist) : [];
    setSelectedTags(array);
  }, [codeAlist]);

  const addTag = (tag: any) => {
    setSelectedTags((previousTags: any): any => [...previousTags, tag]);
  };

  const removeTag = (tag: any) => {
    setSelectedTags((previousTags: any) =>
      previousTags.filter((previousTag: any) => previousTag !== tag),
    );
  };

  return (
    <div style={{ height: "500px" }}>
      <Frame>
        <Modal
          // activator={activator}
          open={active}
          onClose={handleChange}
          title="Edit Metaobject"
          primaryAction={{
            content: "Update",
            onAction: handleChange,
          }}
          secondaryActions={[
            {
              content: "Learn more",
              onAction: handleChange,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <Form onSubmit={updateMetaObject} method="PUT">
                <TagsComponent
                  selectedTags={selectedTags}
                  addTag={addTag}
                  removeTag={removeTag}
                />

                <TextField label="Code B" autoComplete="off" />
              </Form>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}
