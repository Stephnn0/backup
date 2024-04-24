import { DataTable, Card } from "@shopify/polaris";

export function TemplateTable({ rows }: any) {
  return (
    <Card>
      <DataTable
        columnContentTypes={["text"]}
        headings={["Template", "Print by Default"]}
        rows={rows}
      />
    </Card>
  );
}
