import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Checkbox, Layout, Link, Page } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { TemplateTable } from "~/component/TemplateTable";
import { getAllTemplates } from "~/models/template.server";

export async function loader(args: LoaderFunctionArgs) {
  console.log("-----hit templates------");
  const response = await getAllTemplates();
  console.log(response, "response");

  return response;
}

const Templates = () => {
  const data: any = useLoaderData();
  console.log(data, "data");

  const [mainTemplateId, setMainTemplateId] = useState<string | null>(null);

  //main template
  console.log(mainTemplateId, "mainTemplateId");

  const toggleMainTemplate = (templateId: string) => {
    if (templateId === mainTemplateId) {
      setMainTemplateId(null);
      localStorage.removeItem("mainTemplateId");
    } else {
      setMainTemplateId(templateId);
      localStorage.setItem("mainTemplateId", templateId);
    }
  };

  const transformedRows = data.map((edge: any) => {
    const { title } = edge;

    return [
      <Link
        removeUnderline
        url={`https://www.example.com/${title}`}
        key={title}
      >
        {title}
      </Link>,
      <Checkbox
        onChange={() => toggleMainTemplate(title)}
        checked={title === mainTemplateId}
        label=""
      />,

      //   new Date(createdAt).toLocaleDateString(),
    ];
  });
  console.log(transformedRows, "transformedRows");

  const [checked, setChecked] = useState(false);
  const handleChange = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    [],
  );

  return (
    <Page>
      <ui-title-bar title="Order Printer">
        <button variant="primary" onClick={() => {}}>
          Manage Templates
        </button>
      </ui-title-bar>
      <Layout>
        <Layout.Section>
          <Checkbox label="" checked={checked} onChange={handleChange} />
          <TemplateTable rows={transformedRows} />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Templates;
