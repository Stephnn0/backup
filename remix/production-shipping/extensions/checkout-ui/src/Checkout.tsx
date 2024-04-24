import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  useSubscription,
  useDiscountCodes,
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useState } from "react";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();

  const subs = useDiscountCodes();
  console.log(subs, "subs");
  console.log("testing ----");
  const { extension } = useApi();

  //-------------------------------------

  const [data, setData] = useState();
  const { query } = useApi();

  const { shop } = useApi();

  useEffect(() => {
    console.log("-----------hit hit----------");

    query(
      `query ($first: Int!) {
        metaobjects(type: "onecode", first: $first) {
          edges {
            node {
              id
              handle
              type
              updatedAt
            }
          }   
        }
      }`,
      {
        variables: { first: 5, type: "onecode" },
      },
    )
      .then(({ data, errors }) => {
        setData(data as unknown as any);
        console.log("-----------hit err----------");

        console.log(data, "data");
        console.log(errors, "errors");
      })
      .catch(console.error);
  }, [query]);

  console.log(data, "storefornt api data");

  return (
    <Banner title="checkout-ui">
      {translate("welcome", { target: extension.target })}
    </Banner>
  );
}
