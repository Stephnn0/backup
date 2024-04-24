export const iterateMetaObjects = (
  objects: any[],
  handleEditClick: (
    metaObjectId: string,
    objectType: string,
    objectHandle: string,
  ) => void,

  handleDeleteClick: (metaObjectId: string) => void,
) => {
  console.log("------------------------hit util----------");

  if (!Array.isArray(objects)) {
    console.error("Expected an array of objects");
    return;
  }
  const arrayOfArrays: any[] = [];
  objects.forEach((object: any) => {
    const fields = object.node && object.node.fields;
    const metaObjectId = object.node.id;

    const metaObjecthandle = object.node.handle; //
    const metaObjecttype = object.node.type; //

    if (Array.isArray(fields)) {
      const objectArray: any[] = [];

      fields.forEach((field: any) => {
        objectArray.push(field.value);
      });
      objectArray.push(
        <button
          onClick={() =>
            handleEditClick(metaObjectId, metaObjecttype, metaObjecthandle)
          }
        >
          edit
        </button>,
        <button onClick={() => handleDeleteClick(metaObjectId)}>delete</button>,
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
