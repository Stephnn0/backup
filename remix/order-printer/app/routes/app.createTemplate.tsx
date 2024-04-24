import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import {
  Button,
  Card,
  Grid,
  Layout,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import { FormEvent, useEffect, useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { themes } from "prism-react-renderer";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { createTemplate2 } from "~/models/template.server";
import { MultiAutocompleteExample } from "~/component/MultipleTags";
import Handlebars from "handlebars";

export async function action(args: ActionFunctionArgs) {
  const formData = await args.request.formData();
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  const keywords = formData.get("keywords") as string;
  console.log(keywords, "keywords");
  console.log(typeof keywords, "keywords");

  try {
    console.log("-------hit------");

    const res = await createTemplate2({
      title: title,
      html: code,
      keywords: keywords,
    });
    console.log(res);
    return json({ response: "Template Created Successfully" });
  } catch (err) {
    console.log(err, "prisma error");
  }
  return null;
}
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

const CreateTemplate = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([""]);
  console.log("selectedOptions", selectedOptions);

  useEffect(() => {
    // Update the code template whenever selectedOptions change
    const selectedWords = selectedOptions.join(", ");
    const newCode = `<div>Selected words: ${selectedWords}</div>`;
    setCode(newCode);
  }, [selectedOptions]);

  const loading = useNavigation();
  const isLoading =
    ["loading", "submitting"].includes(loading.state) &&
    loading.formMethod === "POST";

  const navigate = useNavigate();
  const [code, setCode] = useState("<div>hello world</div>");
  const [title, setTitle] = useState("");
  const [codeChanged, setCodeChanged] = useState(false); // State variable to track if code has changed

  const navigateBack = (to: any) => {
    navigate(-1);
  };

  const handleChange = (newCode: any) => {
    setCode(newCode);
  };

  const actionData = useActionData<typeof action>();

  const submit = useSubmit();

  //------------------------------------------------------------------------
  const submitTemplate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const html = JSON.stringify(code);

    const convertArrayToString = (array: string[]) => {
      return array.join(", ");
    };

    // Example usage
    const stringifiedOptions = convertArrayToString(selectedOptions);
    console.log(stringifiedOptions, "stringifiedOptions");

    formData.set("title", title);
    formData.set("code", html);
    formData.set("keywords", stringifiedOptions);

    try {
      await submit(formData, { replace: true, method: "POST" });
    } catch (err) {
      console.log(err);
    }
  };
  //------------------------------------------------------------------------
  //------------------------------------------------------------------------

  const hbr = `
<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
"{{kids.length}} kids:</p>" +
"<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>
`;

  const template = Handlebars.compile(hbr);

  const data = {
    name: "estefano",
    hometown: "Somewhere, TX",
    kids: [
      { name: "Jimmy", age: "12" },
      { name: "Sally", age: "4" },
    ],
  };

  return (
    <Page>
      <Form onSubmit={submitTemplate} method="post">
        <ui-title-bar title="Create Template">
          <button variant="primary">Go Back</button>
        </ui-title-bar>
        <LiveProvider theme={themes.github} code={code} scope={{}}>
          <Layout>
            <Layout.Section>
              <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                <Grid.Cell>
                  <MultiAutocompleteExample
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                  />

                  <Card>
                    <LiveError />
                    <LivePreview />
                  </Card>
                  <br />

                  <Button variant="primary" loading={isLoading} submit>
                    Create Template
                  </Button>
                </Grid.Cell>
                <Grid.Cell>
                  <Card>
                    <TextField
                      id="title"
                      name="title"
                      value={title}
                      onChange={(value) => setTitle(value)}
                      label="Title"
                      autoComplete="off"
                    />
                    <br />
                    <p>Code</p>
                    <br />

                    <div
                      style={{
                        minHeight: "300px",
                        maxHeight: "300px",
                        overflowY: "auto",
                      }}
                    >
                      <LiveEditor
                        code={code}
                        style={{
                          minHeight: "300px",
                          overflowY: "auto",
                          // backgroundColor: "black",
                        }}
                        onChange={handleChange}
                      />
                    </div>
                  </Card>
                </Grid.Cell>
              </Grid>
            </Layout.Section>
            <Layout.Section>
              <div dangerouslySetInnerHTML={{ __html: template(data) }} />
            </Layout.Section>
          </Layout>
        </LiveProvider>
      </Form>
    </Page>
  );
};

export default CreateTemplate;
