import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { Button, Layout, Page } from "@shopify/polaris";
import { DataTableLinkExample } from "~/components/DataTable";
import { apiVersion, authenticate } from "~/shopify.server";
import { Link } from "@remix-run/react";
import { useCallback, useState } from "react";
import { ModalExample } from "~/components/ModalUpdateObject";
import { useRouteData } from "~/hooks/useRouteData";

export const getByHandle = `
{
  metaobjectByHandle(handle: {
    type: "onecode",
    handle: "onecode-xsllxbs5"
  }) {
    displayName
    title: field(key: "title") { value }
    description: field(key: "description") { value },
    creative: field(key: "creative") { value }
    definition {
      name
      id
      description
      displayNameKey
      metaobjectsCount
      fieldDefinitions{
        description
        name
        required
      }
    }
  }
}`;

export const query = `
{
    metaobjects(type: "onecode", first: 10) {
        edges {
          node {
            id
            handle
            type
            updatedAt

            fields {
              key
              type
              value
            }
            
            definition {
              name
              id
              description
              displayNameKey
              metaobjectsCount
              fieldDefinitions{
                description
                name
                required
              }
            }
          }
        }
      }

}
`;

export async function action(args: ActionFunctionArgs) {
  console.log("-----get by handle--------");

  const formData = await args.request.formData();
  console.log(formData, "formData");

  const objectId = formData.get("objectId") as string;

  console.log(objectId, "objectId");

  const { session } = await authenticate.admin(args.request);
  const { shop, accessToken } = session;

  try {
    const response = await fetch(
      `
    https://${shop}/admin/api/${apiVersion}/graphql.json
    `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/graphql",
          "X-Shopify-Access-Token": accessToken!,
        },
        body: getByHandle,
      },
    );

    if (response.ok) {
      console.log("-----hit getbyhandle-------");

      const data = await response.json();
      console.log(data, "data");
      console.log(data.locations, "data");

      //metaobjectbyhandle
      const {
        data: { metaobjectByHandle },
      } = data;
      return metaobjectByHandle;
    }
  } catch (err) {
    console.log(err, "error objects");
  }

  return null;
}

export async function loader(args: LoaderFunctionArgs) {
  console.log("-----hit--------");
  const { session } = await authenticate.admin(args.request);
  const { shop, accessToken } = session;

  try {
    const response = await fetch(
      `https://${shop}/admin/api/${apiVersion}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/graphql",
          "X-Shopify-Access-Token": accessToken!,
        },
        body: query,
      },
    );

    if (response.ok) {
      console.log("-----hit--------");

      const data = await response.json();
      console.log(data, "data");
      console.log(data.locations, "data");

      //metaobjectbyhandle
      // const {
      //   data: { metaobjectByHandle },
      // } = data;
      // return metaobjectByHandle;

      //allmetaobjects
      const {
        data: {
          metaobjects: { edges },
        },
      } = data;
      return edges;
    }
  } catch (Err) {
    console.log(Err, "error objects");
  }

  return null;
}

const GetObjects = () => {
  const metaobjects: any = useLoaderData();
  console.log(metaobjects, "metaobjects");

  const data = useRouteData("/app/test");

  console.log(data, "test data");

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
      // const metaObjectType = object.node.type; //
      // const metaObjectHandle = object.node.handle; //

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
          <button onClick={() => handleEditClick(metaObjectId)}>edit</button>,
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

  console.log(metaObjecthandle, "metaObjecthandle new");
  console.log(metaObjecttype, "metaObjecthandle new");

  const handleEditClick = (metaObjectId: string) => {
    localStorage.setItem("objectId", metaObjectId);
    setActive(true);
    submit({ objectId: metaObjectId }, { replace: true, method: "POST" });
  };

  //-------------------------------------------------

  const [active, setActive] = useState(false);

  const handleChange = useCallback(
    () => setActive((prevActive) => !prevActive),
    [],
  );

  //-------------------------------------------------
  //-------------------------------------------------
  //-------------------------------------------------

  const res = iterateMetaObjects(metaobjects);
  console.log(res, "res");

  //-------------------------------------------------
  //-------------------------------------------------
  //-------------------------------------------------

  const submit = useSubmit();

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <DataTableLinkExample rows={res} />
          {/* <Form onSubmit={handleSubmit} method="POST"> */}
          <ModalExample active={active} handleChange={handleChange} />
          {/* </Form> */}
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default GetObjects;
