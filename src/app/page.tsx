import DynamicBlock from "./blocks/DynamicBlock";
import { fetchHomepageData } from "@/lib/api";

export default async function HomePage() {

  const blocks = await fetchHomepageData();

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
