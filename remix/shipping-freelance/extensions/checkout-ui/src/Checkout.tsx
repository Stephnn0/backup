import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  useTotalShippingAmount,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();

  return (
    <Banner title="checkout-ui">
      {translate("welcome", { target: extension.target })}
    </Banner>
  );
}
