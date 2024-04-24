export function getMetaobjectByHandleQuery(objectType: string, objectHandle: string): string {
    return `
    {
      metaobjectByHandle(handle: {
        type: "${objectType}",
        handle: "${objectHandle}"
      }) {
        displayName
        title: field(key: "title") { value }
        description: field(key: "description") { value },
        creative: field(key: "creative") { value }
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
    }`;
  }
  

  export const getByHandle = `
  {
    metaobjectByHandle(handle: {
      type: "onecode",
      handle: "onecode-xsllxbs5"
    }) {
      displayName
      title: field(key: "title") { value }
      description: field(key: "description") { value },
      creative: field(key: "creative") { value }
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
  }`;
  