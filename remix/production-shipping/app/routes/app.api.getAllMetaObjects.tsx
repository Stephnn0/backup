import { LoaderFunctionArgs } from "@remix-run/node";
import { query } from "~/graphql/GetAllMetaObjects";
import { apiVersion, authenticate } from "~/shopify.server";

export async function loader(args: LoaderFunctionArgs) {
  console.log("-----hit get all Metaobjects--------");
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
      // console.log(data, "data");
      // console.log(data.locations, "data");

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
