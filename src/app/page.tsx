export const dynamic = 'force-static';

import DynamicBlock from "./blocks/DynamicBlock";
import { fetchHomepageData } from "@/lib/api";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const homepageData = await fetchHomepageData();

    return {
        title: homepageData?.title || 'Default Site Title',
        description: homepageData?.metaDescription || 'Default description for SEO.',
    };
}

export default async function HomePage() {

  const homepageData = await fetchHomepageData();

  const blocks = homepageData?.blocks;

  //console.log(blocks);

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