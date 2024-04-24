import { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";

export async function action(args: ActionFunctionArgs) {
  console.log("------delete Metaobject delete------");

  const formData = await args.request.formData();
  const objectId = formData.get("objectId") as string;
  console.log(objectId, "objectId delete");

  const { admin } = await authenticate.admin(args.request);

  try {
    const updateObject = await admin.graphql(
      `
         mutation metaobjectDelete($id: ID!) {
              metaobjectDelete(id: $id) {
             deletedId
             userErrors {
               field
                 message
              }
           }
         }
        `,
      {
        variables: {
          id: objectId,
        },
      },
    );

    if (updateObject.ok) {
      console.log(updateObject, "updateObject");
      const data = await updateObject.json();
      console.log(data, "data");

      // const {
      //   data: { metaobjectCreate },
      // } = data;

      return data;
    }
  } catch (err) {
    console.log(err, "response");

    const errorObj = err as {
      graphQLErrors: unknown[];
      message: string;
      networkStatusCode: number;
    };
    const { graphQLErrors, message, networkStatusCode } = errorObj;

    console.log(graphQLErrors, "graphQLErrors");
    console.log(message, "message");
    console.log(networkStatusCode, "message");
    return null;
  }
  return null;
}
