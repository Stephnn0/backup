import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { Card, InlineGrid, Page } from "@shopify/polaris";
import { useEffect, useRef, useState } from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";
import ReactToPrint from "react-to-print";
import { getTemplateByTitle } from "~/models/template.server";
import { authenticate } from "~/shopify.server";
import Handlebars from "handlebars";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { admin } = await authenticate.admin(request);

  //test
  const keywords = ["email", "name"]; // Array of keywords

  // Constructing the GraphQL query dynamically based on keywords
  const queryFields = keywords.map((keyword) => `${keyword}`).join("\n");

  const response = await admin.graphql(
    `#graphql
  query {
    node(id: "gid://shopify/Order/5284366155930") {
      id
      ... on Order {
        ${queryFields}
        billingAddress {
            address1
            city
            company
            country
            firstName
            lastName
            name
            phone
            zip
        }
        confirmationNumber
        confirmed
      }
    }
  }`,
  );

  const data = await response.json();
  console.log(data, "orderbyid");
  return data;
}

export async function action({ request, params }: ActionFunctionArgs) {
  console.log(params, "params");
  //get order id from params
  //get template id from form
  // fetch template
  // extract keys
  // fetch order by id with keys
  // return template and order

  const formData = await request.formData();
  const id = formData.get("id") as string;
  const response = await getTemplateByTitle(id);

  return { response: response };
}

const Print = () => {
  const [mainTemplateId, setMainTemplateId] = useState<string | null>(null);
  const submit = useSubmit();

  //-------------------------------------------------

  useEffect(() => {
    const storedMainTemplateId = localStorage.getItem("mainTemplateId");
    if (storedMainTemplateId) {
      setMainTemplateId(storedMainTemplateId);
    }
    const formData = new FormData();
    formData.set("id", storedMainTemplateId as string);

    submit(formData, { replace: true, method: "POST" });
  }, [mainTemplateId]);

  //-------------------------------------------------

  const actionData = useActionData<typeof action>();
  console.log(actionData, "actionData");
  const html = actionData?.response?.html ?? "";
  const keys = actionData?.response?.keywords ?? "";

  const convertStringToArray = (string: string) => {
    return string.split(", ");
  };

  const stringifiedOptions = convertStringToArray(keys);

  const convertStringArrayToArray = (array: string[]) => {
    return array.map((item) => item.replace(/{{|}}/g, ""));
  };

  const outputArray = convertStringArrayToArray(stringifiedOptions);
  console.log(outputArray, "outputArray"); // Output: ['name', 'title']

  // console.log(extractedStrings); // ["name", "email"]
  //-------------------------------------------------

  const convertHtmlStringToHtml = (htmlString: any) => {
    const cleanedHtmlString2 = htmlString
      ? htmlString.replace(/\\n|\\/g, "")
      : "";

    let cleanedHtmlString = cleanedHtmlString2.trim();
    if (cleanedHtmlString.startsWith('"') && cleanedHtmlString.endsWith('"')) {
      cleanedHtmlString = cleanedHtmlString.slice(1, -1);
    }

    return cleanedHtmlString;
  };

  //-------------------------------------------------

  const convertedHtml = convertHtmlStringToHtml(html);

  const componentRef = useRef<HTMLDivElement>(null);

  //order data
  const data: any = useLoaderData();
  console.log(data, "data");

  //-------------------------------------------------

  const template = Handlebars.compile(html);

  const data2 = {
    name: "estefano",
    email: "Somewhere, TX",
    kids: [
      { name: "Jimmy", age: "12" },
      { name: "Sally", age: "4" },
    ],
  };

  return (
    <Page>
      <ui-title-bar title="Order Printer">
        <button onClick={() => {}}>View Order</button>
        <button variant="primary" onClick={() => {}}>
          Print
        </button>
      </ui-title-bar>
      <InlineGrid columns={["twoThirds", "oneThird"]}>
        <div ref={componentRef}>
          <Card>
            {convertedHtml ? (
              <LiveProvider code={convertedHtml} scope={{}}>
                {/* <LiveEditor code={convertedHtml} /> */}
                <LiveError />
                <LivePreview />
              </LiveProvider>
            ) : (
              <p>loading</p>
            )}
          </Card>
          <div dangerouslySetInnerHTML={{ __html: template(data2) }} />
        </div>
        <Card>
          <ReactToPrint
            content={() => componentRef.current}
            trigger={() => <button>Print this out!</button>}
          />
        </Card>
      </InlineGrid>
    </Page>
  );
};

export default Print;
