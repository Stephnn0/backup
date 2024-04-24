import { apiVersion, authenticate } from "~/shopify.server";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { getByHandle } from "~/graphql/GetMetaObjectByHandle";

export async function action(args: ActionFunctionArgs) {
  console.log("-----get by handle separate route--------");
  console.log("-----get by handle separate route--------");
  console.log("-----get by handle separate route--------");

  const formData = await args.request.formData();
  // console.log(formData, "formData");

  const objectId = formData.get("objectId") as string;

  // console.log(objectId, "objectId");

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
        body: getByHandle,
      },
    );

    if (response.ok) {
      console.log("-----hit getbyhandle-------");

      const data = await response.json();
      console.log(data, "data");
      console.log(data.locations, "data");

      //metaobjectbyhandle
      const {
        data: { metaobjectByHandle },
      } = data;
      return json({ data: metaobjectByHandle });
    }
  } catch (err) {
    console.log(err, "error objects");
  }

  return null;
}
