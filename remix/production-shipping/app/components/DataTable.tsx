import { Link, Page, DataTable, Card } from "@shopify/polaris";

export function DataTableLinkExample({ rows }: any) {
  return (
    <Card>
      <DataTable
        columnContentTypes={["text", "text", "text", "text"]}
        headings={["Code A", "Code B", "Status", "Update", "Delete"]}
        rows={rows}
      />
    </Card>
  );
}
