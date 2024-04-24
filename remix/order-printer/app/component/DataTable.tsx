import { Link, Page, DataTable, Card } from "@shopify/polaris";

export function DataTableLinkExample({ rows }: any) {
  return (
    <Card>
      <DataTable
        columnContentTypes={["text", "text", "text", "text", "text"]}
        headings={["Order", "Date", "Place by", "Fulfillment status", "Total"]}
        rows={rows}
      />
    </Card>
  );
}
