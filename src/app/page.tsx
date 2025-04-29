import DynamicBlock from "./blocks/DynamicBlock";

export default async function HomePage() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_STRAPI_URL;

    // Get the token from environment variables
    const apiToken = process.env.STRAPI_API_TOKEN;
  
    // Fetching data from Strapi using the fetch API
    const res = await fetch(`${backendUrl}/api/content-pages?filters[slug][$eq]=home&populate=blocks.image,blocks.button,blocks.backgroundColor,blocks.multiBoxSmall.image,blocks.multiBoxSmall.backgroundColor,blocks.multiBoxBig.image,blocks.multiBoxBig.backgroundColor,blocks.settings.backgroundColor,blocks.settings.blockPadding,blocks.textBackgroundColor`, {
        headers: {
        'Authorization': `Bearer ${apiToken}`, // Include the API token here
        },
  });
  
  const props = await res.json();

  const blocks = props?.data[0].blocks || [];

  console.log(blocks);

    return (
        <>
            {blocks.map((block:any, index:number) => {
                return (
                   <DynamicBlock 
                        key={index}
                        blockName={block.__component} 
                        blockProps={block}
                    />
                )
                
            })}
        </>
    )
}
