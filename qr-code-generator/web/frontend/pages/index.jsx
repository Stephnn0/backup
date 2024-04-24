import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";
import {
  Card,
  EmptyState,
  Layout,
  Page,
  SkeletonBodyText,
} from "@shopify/polaris";


export default function HomePage() {

  const navigate = useNavigate();

  const isLoading = false;
  const isRefetching = false;
  const QRCodes = [];

  const loadingMarkup = isLoading ? (
    <Card sectioned>
      <Loading />
      <SkeletonBodyText />
    </Card>
  ) : null;

  const emptyStateMarkup = !isLoading && !QRCodes?.length ? (
    <Card sectioned>
      <EmptyState
          heading="Create unique QR codes for your prrducts"
          action={{
            content: "Create QR code",
            onAction: () => navigate("/qrcodes/new")
          }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>
          Allow customers to scan codes and buy products using their phones
        </p>
      </EmptyState>
    </Card>
  ) : null;

  return (
    <Page>
      <TitleBar 
        title="QR codes"
        primaryAction={{
          content: "Create QR code",
          onAction: () => navigate("/qrcodes/new")
        }}
       />
       <Layout>
        <Layout.Section>
          {loadingMarkup}
          {emptyStateMarkup}
        </Layout.Section>
       </Layout>
    </Page>
  )
}