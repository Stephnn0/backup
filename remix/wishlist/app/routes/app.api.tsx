import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { Layout, Page } from "@shopify/polaris";
import { apiVersion, authenticate } from "~/shopify.server";

export const query = `
{
    products(first: 5){
        edges{
            node{
                id
                handle
                title
                description
            }
        }
        pageInfo {
            hasNextPage
        }
    }
}
`;

export const action: ActionFunction = async ({ request, params }) => {
  console.log("----------hit app proxy----------");
  console.log("----------hit----------");

  const { session, admin } = await authenticate.public.appProxy(request);
  if (session) {
    console.log(session);
  }
  const response = await admin!.graphql(
    `#graphql
    mutation populateProduct($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
        }
      }
    }`,
    { variables: { input: { title: "Product Name" } } },
  );
  console.log(response, "response");

  const productData = await response.json();
  return json({ data: productData.data });

  // const response = await fetch(
  //   `https://${session?.shop}/admin/api/${apiVersion}/graphql.json`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/graphql",
  //       "X-Shopify-Access-Token": session?.accessToken!,
  //     },
  //     body: query,
  //   },
  // );

  // if (response.ok) {
  //   console.log("----res------");
  //   const data = await response.json();
  //   console.log(data, "data");

  //   return json({
  //     data: data.data,
  //   });
  // }

  // return null;

  //   // return json({ hello: "hello from remix", headers: headers });
};

export default function Api() {
  return (
    <Page>
      <Layout>
        <h1>hello worlds</h1>
      </Layout>
    </Page>
  );
}
