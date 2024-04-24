import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import { Button, Layout, Page } from "@shopify/polaris";
import { authenticate } from "~/shopify.server";

export async function action(args: ActionFunctionArgs) {
  console.log("------hit Definition------");
  const { admin } = await authenticate.admin(args.request);

  try {
    const shippingObject = await admin.graphql(
      `#graphql
            mutation CreateMetaobjectDefinition($definition: MetaobjectDefinitionCreateInput!) {
            metaobjectDefinitionCreate(definition: $definition) {
                metaobjectDefinition {
                name
                type
                fieldDefinitions {
                    name
                    key
                }
                }
                userErrors {
                field
                message
                code
                }
            }
            }`,
      {
        variables: {
          definition: {
            name: "One Code",
            type: "onecode",
            // access: {
            //   admin: "MERCHANT_READ",
            //   storefront: "NONE",
            // },
            fieldDefinitions: [
              {
                name: "Code A",
                key: "code_a",
                type: "json",
              },
              {
                name: "Code B",
                key: "code_b",
                type: "single_line_text_field",
              },
              {
                name: "Rule Status",
                key: "rule_status",
                type: "boolean",
              },
            ],
          },
        },
      },
    );

    if (shippingObject.ok) {
      console.log(shippingObject);
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
  }
  return null;
}

const CreateMetaObject = () => {
  const submit = useSubmit();
  const generateWebhook = () => submit({}, { replace: true, method: "POST" });
  const actionData = useActionData<typeof action>();
  console.log(actionData, "actionData");

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Form onSubmit={generateWebhook} method="POST">
            <Button submit>Create Metaobject Definition</Button>
          </Form>
        </Layout.Section>
        <Layout.Section></Layout.Section>
      </Layout>
    </Page>
  );
};

export default CreateMetaObject;
