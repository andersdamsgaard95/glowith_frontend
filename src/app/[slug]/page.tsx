import DynamicBlock from "../blocks/DynamicBlock";

export default async function Page({ params }: { params: { slug: string } }) {
  const apiToken = process.env.STRAPI_API_TOKEN;
  const res = await fetch(
    `${process.env.BACKEND_STRAPI_URL}/api/content-pages?filters[slug][$eq]=${params.slug}&populate=blocks.image,blocks.button,blocks.backgroundColor`,
    {
      headers: { Authorization: `Bearer ${apiToken}` },
      cache: "no-store", // Prevent caching issues
    }
  );

  const pageData = await res.json();

  const blocks = pageData?.data[0].blocks || [];

  if (!pageData) {
    return <p>Page not found</p>; // This will show a simple message (or use a custom 404 page)
  }

  return (
    <>
        {blocks.map((block:any) => {
            return (
                <DynamicBlock 
                    key={block.id}
                    blockName={block.__component} 
                    blockProps={block}
                /> 
            )
        })}
    </>
  );
}