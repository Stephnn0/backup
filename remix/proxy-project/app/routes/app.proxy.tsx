import { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/react";
import { Page } from "@shopify/polaris";
import React from "react";
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

  const { session, admin, storefront } =
    await authenticate.public.appProxy(request);
  if (session) {
    console.log(session);
  }
  //---------------------------------------------------------
  //---------------------------------------------------------
  //---------------------------------------------------------

  //   const response = await admin!.graphql(
  //     `#graphql
  //     mutation populateProduct($input: ProductInput!) {
  //       productCreate(input: $input) {
  //         product {
  //           id
  //         }
  //       }
  //     }`,
  //     { variables: { input: { title: "Product Name" } } },
  //   );
  //   console.log(response, "response");

  //   const productData = await response.json();
  //   return json({ data: productData.data });
  //---------------------------------------------------------
  //---------------------------------------------------------
  //---------------------------------------------------------

  const response = await fetch(
    `https://${session?.shop}/admin/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/graphql",
        "X-Shopify-Access-Token": session?.accessToken!,
      },
      body: query,
    },
  );

  if (response.ok) {
    console.log("----res------");
    const data = await response.json();
    console.log(data, "data");

    return json({
      data: data.data,
    });
  }

  //---------------------------------------------------------
  //---------------------------------------------------------
  //---------------------------------------------------------

  //   const response = await storefront!.graphql(
  //     `#graphql
  //   query products {
  //     products(first: 3) {
  //       edges {
  //         node {
  //           id
  //           title
  //         }
  //       }
  //     }
  //   }`,
  //   );

  //   if (response) {
  //     console.log("storefront response");
  //     return json(await response.json());
  //   }

  return null;
};

const Proxy = () => {
  return <Page>Proxy</Page>;
};

export default Proxy;
