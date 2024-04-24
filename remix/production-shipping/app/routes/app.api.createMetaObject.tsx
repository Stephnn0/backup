import { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";

export async function action(args: ActionFunctionArgs) {
  console.log("------Create Metaobject------");

  const formData = await args.request.formData();
  const valueCodeB = formData.get("valueCodeB") as string;
  const listCodesA = formData.get("listCodesA") as string;
  const status = formData.get("status") as string;

  console.log(valueCodeB, listCodesA, status, "create form values");

  const { admin } = await authenticate.admin(args.request);

  try {
    const createObject = await admin.graphql(
      ` mutation metaobjectCreate($metaobject: MetaobjectCreateInput!) {
        metaobjectCreate(metaobject: $metaobject) {
          metaobject {
          type
          handle
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
          metaobject: {
            type: "onecode",
            fields: [
              {
                key: "code_a",
                value: listCodesA,
              },
              {
                key: "code_b",
                value: valueCodeB,
              },
              {
                key: "rule_status",
                value: status,
              },
            ],
          },
        },
      },
    );

    if (createObject.ok) {
      console.log(createObject, "createObject");
      const data = await createObject.json();
      console.log(data, "data");

      const {
        data: { metaobjectCreate },
      } = data;

      return metaobjectCreate;
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
