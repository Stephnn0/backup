import { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";

export async function action(args: ActionFunctionArgs) {
  console.log("------update Metaobject update------");
  const { admin } = await authenticate.admin(args.request);

  try {
    const updateObject = await admin.graphql(
      `
         mutation metaobjectUpdate($id: ID!, $metaobject: MetaobjectUpdateInput!) {
          metaobjectUpdate(id: $id, metaobject: $metaobject) {
           metaobject {
             # Metaobject fields
             id
             fields {
               key
               value
             }
           }
           userErrors {
             field
             message
           }
          }
         }
      `,
      {
        variables: {
          id: "gid://shopify/Metaobject/41748529306",

          metaobject: {
            fields: [
              {
                key: "code_a",
                value: JSON.stringify({ test: "suarez" }),
              },
              {
                key: "code_b",
                value: "suarez",
              },
              {
                key: "rule_status",
                value: "true",
              },
            ],
          },
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
