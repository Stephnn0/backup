// export async function loader({ request, params }: LoaderFunctionArgs) {
//     const { admin } = await authenticate.admin(request);
  
  
//     const keywords = ['email', 'name']; // Array of keywords
  
//     // Constructing the GraphQL query dynamically based on keywords
//     const queryFields = keywords.map((keyword) => `${keyword}`).join('\n');
  
//     const response = await admin.graphql(
//       `#graphql
//     query {
//       node(id: "gid://shopify/Order/5284366155930") {
//         id
//         ... on Order {
//           name
//           billingAddress {
//               address1
//               city
//               company
//               country
//               firstName
//               lastName
//               name
//               phone
//               zip
//           }
//           confirmationNumber
//           confirmed
//           email
//         }
//       }
//     }`,
//     );
  
//     const data = await response.json();
//     console.log(data);
//     return data;
//   }
  