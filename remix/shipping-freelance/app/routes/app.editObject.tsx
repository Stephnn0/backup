import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useParams, useSubmit } from "@remix-run/react";
import { Button, Layout, Page } from "@shopify/polaris";
import React from "react";
import { authenticate } from "~/shopify.server";

export async function action(args: ActionFunctionArgs) {
  console.log("------hit Metaobject update------");
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
          id: "gid://shopify/Metaobject/41748496538",

          metaobject: {
            fields: [
              {
                key: "code_a",
                value: JSON.stringify({ test: "new" }),
              },
              {
                key: "code_b",
                value: "new",
              },
              {
                key: "rule_status",
                value: "false",
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

const EditObject = () => {
  const params = useParams();

  const submit = useSubmit();
  const update = () => submit({}, { replace: true, method: "POST" });
  const actionData = useActionData<typeof action>();
  console.log(actionData, "actionData");

  console.log(params);
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Form onSubmit={update} method="PUT">
            <Button submit>UPDATE</Button>
          </Form>
        </Layout.Section>
        <Layout.Section></Layout.Section>
      </Layout>
    </Page>
  );
};

export default EditObject;
