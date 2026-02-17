/**
 * MDX component registry — these components are available in all MDX guide files.
 *
 * In your .mdx files you can write:
 *   <CodeBlock code="..." language="js" explanation="..." />
 *   <Term id="api">API</Term>
 *   <ELI5Toggle code={...} explanation={...} />
 *   <Callout variant="tip">...</Callout>
 *   <Callout variant="denise-says">...</Callout>
 */

import CodeBlock from "@/components/CodeBlock";
import GlossaryTooltip from "@/components/GlossaryTooltip";
import ELI5Toggle from "@/components/ELI5Toggle";
import Callout from "@/components/Callout";

// All custom components available in MDX files
export const mdxComponents = {
  CodeBlock,
  Term: GlossaryTooltip,
  ELI5Toggle,
  Callout,
};
