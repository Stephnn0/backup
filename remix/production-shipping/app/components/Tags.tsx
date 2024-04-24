import { useState, useCallback } from "react";
import {
  Tag,
  BlockStack,
  Card,
  TextField,
  Button,
  InlineGrid,
} from "@shopify/polaris";

export function TagsComponent({ selectedTags, addTag, removeTag }: any) {
  const [newTag, setNewTag] = useState("");

  const handleTextFieldChange = useCallback((newValue: any) => {
    setNewTag(newValue);
  }, []);

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      addTag(newTag.trim());
      setNewTag(""); // Clear the text field after adding the tag
    }
  };

  const handleRemoveTag = (tag: any) => {
    removeTag(tag);
  };

  const tagMarkup = selectedTags.map((option: any) => (
    <Tag size="large" key={option} onRemove={() => handleRemoveTag(option)}>
      {option}
    </Tag>
  ));

  return (
    <BlockStack gap="100">
      <p>Code A</p>
      <Card>{tagMarkup}</Card>
      <br />
      <InlineGrid columns={["twoThirds", "oneHalf"]}>
        <TextField
          label=""
          autoComplete="off"
          value={newTag}
          onChange={handleTextFieldChange}
        />
        <Button variant="primary" onClick={handleAddTag}>
          Add Code
        </Button>
      </InlineGrid>
      <br />
    </BlockStack>
  );
}
