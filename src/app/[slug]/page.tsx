import DynamicBlock from "../blocks/DynamicBlock";
import { fetchDynamicPageData } from "@/lib/api";

export default async function Page({ params }: { params: { slug: string } }) {

  const blocks = await fetchDynamicPageData(params.slug);

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