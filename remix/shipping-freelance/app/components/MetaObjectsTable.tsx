import { useFetcher, useSubmit } from "@remix-run/react";
import { DataTable, Card } from "@shopify/polaris";
import { useEffect } from "react";

const rows = [
  ["Emerald Silk Gown", "$875.00", 124689, 140, "$122,500.00"],
  ["Mauve Cashmere Scarf", "$230.00", 124533, 83, "$19,090.00"],
];

export function MetaObjectsTable() {
  const fetcher = useFetcher();
  const submit = useSubmit();

  console.log(fetcher, "fechetr");

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data == null) {
      fetcher.load("/app/api/getAllMetaobjects");
    }
  }, [fetcher]);

  console.log(fetcher.data, "dusdus");

  //-----------ARRAY OF OBJECTS TO ARRAY OF ARRAYS---
  //-------------------------------------------------
  //-------------------------------------------------

  let metaObjecthandle;
  let metaObjecttype;

  const iterateMetaObjects = (objects: any[]) => {
    if (!Array.isArray(objects)) {
      console.error("Expected an array of objects");
      return;
    }
    const arrayOfArrays: any[] = [];
    objects.forEach((object: any) => {
      const fields = object.node && object.node.fields;
      const metaObjectId = object.node.id; //
      const metaObjectType = object.node.type; //
      const metaObjectHandle = object.node.handle; //

      metaObjecthandle = object.node.handle; //
      metaObjecttype = object.node.type; //

      console.log(metaObjecthandle, "metaObjecthandle");
      console.log(metaObjecttype, "metaObjecthandle");

      console.log(object.node.id, "id");

      if (Array.isArray(fields)) {
        const objectArray: any[] = [];

        fields.forEach((field: any) => {
          objectArray.push(field.value);
        });
        objectArray.push(
          // <Link to={`/app/${"editObject"}`}>
          // <Link to={`/app/${metaObjectId}`}>
          <button onClick={() => {}}>edit</button>,
          // </Link>,
        );

        arrayOfArrays.push(objectArray);
      } else {
        console.error(
          "Invalid or missing 'fields' property in the object:",
          object,
        );
      }
    });
    return arrayOfArrays;
  };
  //-------------------------------------------------
  //-------------------------------------------------
  //-------------------------------------------------

  return (
    <Card>
      <DataTable
        columnContentTypes={["text", "text", "text", "text"]}
        headings={["Status", "Code A", "Code B", "Actions"]}
        rows={rows}
      />
    </Card>
  );
}
