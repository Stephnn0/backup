import {
  SkeletonPage,
  Layout,
  LegacyCard,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText,
} from "@shopify/polaris";
import React from "react";

export function SkeletonExample() {
  return (
    <>
      <Layout>
        <Layout.Section variant="oneThird">
          <LegacyCard subdued>
            <LegacyCard.Section>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </LegacyCard.Section>
            <LegacyCard.Section>
              <SkeletonBodyText lines={2} />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </>
  );
}
