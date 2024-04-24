import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Layout, Page } from "@shopify/polaris";
import { Link } from "@remix-run/react";
import { DataTableLinkExample } from "~/component/DataTable";
import { apiVersion, authenticate } from "~/shopify.server";

const query = `
{
  orders(first: 10) {
    edges {
      node {
        id
        name
        customer {
            displayName
        }
        createdAt
        displayFulfillmentStatus
        subtotalPrice
      }
    }
  }
}`;

export async function loader(args: LoaderFunctionArgs) {
  console.log("-----------testing loader hit-------------");
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
      console.log("-----------testing loader response hit-------------");

      const data = await response.json();
      console.log(data, "data");
      console.log(data.products, "data");

      const {
        data: {
          orders: { edges },
        },
      } = data;
      return edges;
    }
  } catch (err) {
    console.log("-----------testing action catch hit-------------");
    console.log(err, "err response");

    const errorObj = err as {
      graphQLErrors: unknown[];
      message: string;
      networkStatusCode: number;
    };

    const { graphQLErrors, message, networkStatusCode } = errorObj;

    console.log(graphQLErrors, "graphQLErrors");
    console.log(message, "message");
    console.log(networkStatusCode, "networkStatusCode");
  }

  return null;
}
const Orders = () => {
  const data: any = useLoaderData();
  console.log(data, "data");

  // Transforming fetched data into an array of arrays format
  const transformedRows = data.map((edge: any) => {
    const {
      node: {
        name,
        createdAt,
        customer,
        displayFulfillmentStatus,
        subtotalPrice,
      },
    } = edge;
    return [
      <Link to={`/app/print/${name}`}>{name}</Link>,
      new Date(createdAt).toLocaleDateString(),
      customer.displayName, // Placeholder for "Place by"
      displayFulfillmentStatus, // Placeholder for "Payment Status"
      `$${subtotalPrice}`, // Placeholder for "Total"
    ];
  });

  return (
    <Page>
      <ui-title-bar title="Order Printer">
        <button variant="primary" onClick={() => {}}>
          Manage Templates
        </button>
      </ui-title-bar>
      <Layout>
        <Layout.Section>
          <DataTableLinkExample rows={transformedRows} />
        </Layout.Section>
        <Layout.Section></Layout.Section>
      </Layout>
    </Page>
  );
};

export default Orders;
