import { useActionData, useFetcher, useSubmit } from "@remix-run/react";
import { Layout, Page } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { DataTableLinkExample } from "~/components/DataTable";
import { EmptyStateExample } from "~/components/EmptyStateCart";
import { MediaCart } from "~/components/MediaCart";
import { ModalExample } from "~/components/ModalUpdateObject";
import { iterateMetaObjects } from "~/utils/iterateMetaObjects";
import { getByHandle } from "./app.getMetaobject";
import { apiVersion, authenticate } from "~/shopify.server";
import { ActionFunctionArgs } from "@remix-run/node";
import { getMetaobjectByHandleQuery } from "~/graphql/updateMetaObject";
import { ModalCreateObject } from "~/components/ModalCreateObject";
import { SkeletonExample } from "~/components/SkeletonTable";

type Props = {};

export async function action(args: ActionFunctionArgs) {
  console.log("-----get by handle--------");

  const formData = await args.request.formData();
  const objectId = formData.get("objectId") as string;
  const objectType = formData.get("objectType") as string;
  const objectHandle = formData.get("objectHandle") as string;

  const getByHandleQuery = getMetaobjectByHandleQuery(objectType, objectHandle);

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
        body: getByHandleQuery,
      },
    );

    if (response.ok) {
      console.log("-----hit getbyhandle-------");

      const data = await response.json();
      // console.log(data, "data");
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

//-------------------------HOME--------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------

const Home = (props: Props) => {
  const [active, setActive] = useState(false);
  const [activeCreate, setActiveCreate] = useState(false);

  const fetcher = useFetcher();
  const submit = useSubmit();

  //------------------------FETCH ALL METAOBJECT---------------------

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data == null) {
      fetcher.load("/app/api/getAllMetaobjects");
    }
  }, [fetcher]);

  //------------------------EDIT METAOBJECT---------------------

  const handleEditClick = (
    metaObjectId: string,
    objectType: string,
    objectHandle: string,
  ) => {
    localStorage.setItem("objectId", metaObjectId);
    localStorage.setItem("objectType", objectType);
    localStorage.setItem("objectHandle", objectHandle);
    setActive(true);

    submit(
      {
        objectId: metaObjectId,
        objectType: objectType,
        objectHandle: objectHandle,
      },
      {
        //replace: true,
        // navigate: false,
        // action: "/app/api/singleMetaObject",
        method: "POST",
      },
    );
  };

  //------------------------DELETE METAOBJECT---------------------

  const handleDeleteClick = (metaObjectId: string) => {
    submit(
      {
        objectId: metaObjectId,
      },
      {
        action: "/app/api/deleteMetaObject",
        method: "DELETE",
        navigate: false,
        replace: true,
      },
    );
  };

  // transform array of objects to array of arrays
  let arrayData: any[] | undefined = [];
  if (fetcher.data !== undefined) {
    arrayData = iterateMetaObjects(
      fetcher.data as any,
      handleEditClick,
      handleDeleteClick,
    );
  }

  // transform booleans to active/desactive
  arrayData = arrayData!.map((innerArray) =>
    innerArray.map((value: any) =>
      typeof value === "string"
        ? value === "true"
          ? "active"
          : value === "false"
            ? "deactivate"
            : value
        : value,
    ),
  );

  // show only number count of codes A
  function replaceObjectWithLength(array: any) {
    return array.map((internalArray: any) => {
      return internalArray.map((element: any) => {
        // Check if the element is a string and matches the specified format
        if (typeof element === "string" && element.startsWith('{"codes":')) {
          // Parse the JSON string to an object
          const obj = JSON.parse(element);
          // Replace the object string with the length of the 'codes' array
          return obj.codes.length;
        }
        return element;
      });
    });
  }

  const updatedArrayOfArrays = replaceObjectWithLength(arrayData);

  const handleChange = useCallback(
    () => setActive((prevActive) => !prevActive),
    [],
  );

  const handleChangeCreate = useCallback(
    () => setActiveCreate((prevActive) => !prevActive),
    [],
  );

  //------------------------SINGLE METAOBJECT BY HANDLE---------------------
  const singleMetaObject: any = useActionData();
  console.log(singleMetaObject, "singleMetaObject");

  return (
    <Page>
      <ui-title-bar title="Just One Code">
        <button variant="primary" onClick={handleChangeCreate}>
          Create Code Rule
        </button>
      </ui-title-bar>
      <Layout>
        <Layout.Section>
          <MediaCart />
        </Layout.Section>
        <br />
        <Layout.Section>
          {fetcher.data !== undefined ? (
            <DataTableLinkExample rows={updatedArrayOfArrays} />
          ) : (
            <SkeletonExample />
          )}
        </Layout.Section>
        <br />
        <Layout.Section>
          <EmptyStateExample />
        </Layout.Section>
      </Layout>
      <ModalExample
        active={active}
        handleChange={handleChange}
        singleMetaObject={singleMetaObject}
      />
      <ModalCreateObject
        active={activeCreate}
        handleChange={handleChangeCreate}
      />
    </Page>
  );
};

export default Home;
