export const query = `
{
    metaobjects(type: "onecode", first: 10) {
        edges {
          node {
            id
            handle
            type
            updatedAt

            fields {
              key
              type
              value
            }
            
            definition {
              name
              id
              description
              displayNameKey
              metaobjectsCount
              fieldDefinitions{
                description
                name
                required
              }
            }
          }
        }
      }

}
`;